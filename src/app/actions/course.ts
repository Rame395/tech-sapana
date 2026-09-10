"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getCourses() {
  return prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });
}

type CoursePayload = {
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
  detailedDescription?: string | null;
  iconName?: string | null;
  highlights?: string[];
  published: boolean;
  modules?: { weekLabel: string; title: string; lessons: string[]; order: number }[];
  tools?: { icon: string; name: string; description: string; order: number }[];
};

export async function createCourse(data: CoursePayload) {
  await requireAdmin();
  const { modules, tools, ...courseData } = data;
  
  await prisma.course.create({ 
    data: {
      ...courseData,
      modules: {
        create: modules || []
      },
      tools: {
        create: tools || []
      }
    } 
  });
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
}

export async function updateCourse(id: string, data: CoursePayload) {
  await requireAdmin();
  const { modules, tools, ...courseData } = data;

  await prisma.$transaction([
    prisma.courseModule.deleteMany({ where: { courseId: id } }),
    prisma.courseTool.deleteMany({ where: { courseId: id } }),
    prisma.course.update({
      where: { id },
      data: {
        ...courseData,
        modules: {
          create: modules || []
        },
        tools: {
          create: tools || []
        }
      },
    })
  ]);

  revalidatePath("/courses");
  revalidatePath("/admin/courses");
}

export async function deleteCourse(id: string) {
  await requireAdmin();
  await prisma.course.delete({ where: { id } });
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
}
