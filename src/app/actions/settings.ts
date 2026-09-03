"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getGlobalSettings() {
  let settings = await prisma.globalSettings.findUnique({
    where: { id: "default" }
  });

  if (!settings) {
    settings = await prisma.globalSettings.create({
      data: { id: "default" }
    });
  }

  return settings;
}

export async function updateGlobalSettings(formData: FormData) {
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;
  const operatingHours = formData.get("operatingHours") as string;
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;

  await prisma.globalSettings.upsert({
    where: { id: "default" },
    update: {
      phone,
      address,
      email,
      operatingHours,
      metaTitle,
      metaDescription,
    },
    create: {
      id: "default",
      phone,
      address,
      email,
      operatingHours,
      metaTitle,
      metaDescription,
    },
  });

  revalidatePath("/", "layout");
}

export async function resetAdminPassword(formData: FormData) {
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" }
  });

  if (!admin) {
    throw new Error("No admin user found in database");
  }

  await prisma.user.update({
    where: { id: admin.id },
    data: { password: hashedPassword }
  });
}
