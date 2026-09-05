"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCourses() {
  return prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createCourse(data: { 
  title: string; 
  slug: string; 
  description: string; 
  price: number; 
  originalPrice?: number | null;
  imageUrl?: string | null;
  badgeText1?: string | null;
  badge1Style?: string | null;
  badgeText2?: string | null;
  startDateText?: string | null;
  scheduleText?: string | null;
  classTiming?: string | null;
  availableSeats?: number | null;
  syllabusUrl?: string | null;
  highlights?: string[];
  published: boolean; 
}) {
  await prisma.course.create({ data });
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
}

export async function updateCourse(id: string, data: { 
  title: string; 
  slug: string; 
  description: string; 
  price: number;
  originalPrice?: number | null;
  imageUrl?: string | null;
  badgeText1?: string | null;
  badge1Style?: string | null;
  badgeText2?: string | null;
  startDateText?: string | null;
  scheduleText?: string | null;
  classTiming?: string | null;
  availableSeats?: number | null;
  syllabusUrl?: string | null;
  highlights?: string[];
  published: boolean; 
}) {
  await prisma.course.update({
    where: { id },
    data,
  });
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
}
