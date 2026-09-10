"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

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

type ProjectPayload = {
  title: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  category: string;
  technologies: string[];
  client?: string | null;
  liveUrl?: string | null;
  published: boolean;
};

export async function createProject(data: ProjectPayload) {
  await requireAdmin();
  const res = await prisma.project.create({ data });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  return res;
}

export async function updateProject(id: string, data: Partial<ProjectPayload>) {
  await requireAdmin();
  const res = await prisma.project.update({
    where: { id },
    data,
  });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  return res;
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}
