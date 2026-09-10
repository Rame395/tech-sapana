import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

// Allowed MIME types with magic byte verification
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAGIC_BYTES: Record<string, number[][]> = {
  "image/jpeg": [[0xFF, 0xD8, 0xFF]],
  "image/png": [[0x89, 0x50, 0x4E, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]], // RIFF header
};

function verifyMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const signatures = MAGIC_BYTES[mimeType];
  if (!signatures) return false;
  return signatures.some((sig) =>
    sig.every((byte, i) => buffer[i] === byte)
  );
}

export async function POST(req: Request) {
  try {
    // ✅ SECURITY: Require authenticated admin session
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // ✅ SECURITY: File size limit (5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 });
    }

    // ✅ SECURITY: MIME type allowlist check
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP allowed." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ SECURITY: Magic byte verification (prevents disguised executables)
    if (!verifyMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { error: "File content does not match declared type." },
        { status: 400 }
      );
    }

    // ✅ SECURITY: Strict filename sanitization + random prefix to prevent enumeration
    const ext = file.type === "image/jpeg" ? ".jpg"
              : file.type === "image/png" ? ".png"
              : ".webp";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;

    // ✅ SECURITY: Path traversal prevention - only write to uploads dir
    const uploadDir = path.resolve(process.cwd(), "public", "uploads");
    const filePath = path.resolve(uploadDir, filename);
    if (!filePath.startsWith(uploadDir)) {
      return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Failed to save file." }, { status: 500 });
  }
}
