"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProject(id: string) {
  return await prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(data: any) {
  const res = await prisma.project.create({ data });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  return res;
}

export async function updateProject(id: string, data: any) {
  const res = await prisma.project.update({
    where: { id },
    data,
  });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  return res;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}
