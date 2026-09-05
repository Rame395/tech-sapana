"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  return await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getPublishedServices() {
  return await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function createService(data: {
  title: string;
  description: string;
  imageUrl?: string;
  iconName?: string;
  points: string;
  published: boolean;
  order: number;
}) {
  const service = await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || null,
      iconName: data.iconName || null,
      points: data.points,
      published: data.published,
      order: data.order,
    },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return service;
}

export async function updateService(
  id: string,
  data: {
    title?: string;
    description?: string;
    imageUrl?: string;
    iconName?: string;
    points?: string;
    published?: boolean;
    order?: number;
  }
) {
  const service = await prisma.service.update({
    where: { id },
    data,
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return service;
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/admin/services");
}
