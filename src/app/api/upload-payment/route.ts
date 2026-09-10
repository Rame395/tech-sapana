import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

// This endpoint is for CUSTOMER payment screenshot uploads (public, no admin auth required).
// It is intentionally separate from /api/upload which requires admin auth.
// Rate limiting should be enforced at the reverse-proxy level (nginx/cloudflare).

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAGIC_BYTES: Record<string, number[][]> = {
  "image/jpeg": [[0xFF, 0xD8, 0xFF]],
  "image/png": [[0x89, 0x50, 0x4E, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]],
};

function verifyMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const signatures = MAGIC_BYTES[mimeType];
  if (!signatures) return false;
  return signatures.some((sig) => sig.every((byte, i) => buffer[i] === byte));
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // Strict file size limit (2MB — screenshots don't need to be large)
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 2MB limit." }, { status: 400 });
    }

    // MIME type allowlist
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, and WebP images are allowed." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Magic byte verification — prevents disguised executable uploads
    if (!verifyMagicBytes(buffer, file.type)) {
      return NextResponse.json({ error: "File content does not match declared type." }, { status: 400 });
    }

    // Secure randomized filename — no user input in filename
    const ext = file.type === "image/jpeg" ? ".jpg"
              : file.type === "image/png" ? ".png"
              : ".webp";
    const filename = `payment-${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;

    // Store in a separate payments directory
    const uploadDir = path.resolve(process.cwd(), "public", "uploads", "payments");
    const filePath = path.resolve(uploadDir, filename);

    // Path traversal guard
    if (!filePath.startsWith(uploadDir)) {
      return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/payments/${filename}`,
    });
  } catch (error) {
    console.error("Error saving payment screenshot:", error);
    return NextResponse.json({ error: "Failed to save file." }, { status: 500 });
  }
}
