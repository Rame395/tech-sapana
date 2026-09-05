"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createEnrollment(data: {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  paymentScreenshotUrl?: string;
}) {
  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        courseId: data.courseId,
        paymentScreenshotUrl: data.paymentScreenshotUrl,
      },
    });
    
    // Optionally trigger an email to admin here
    
    revalidatePath("/admin/enrollments");
    return { success: true, id: enrollment.id };
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return { success: false, error: "Failed to enroll" };
  }
}

export async function getEnrollments() {
  try {
    return await prisma.enrollment.findMany({
      include: {
        course: { select: { title: true } }
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return [];
  }
}

export async function updateEnrollmentStatus(id: string, status: string) {
  try {
    await prisma.enrollment.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/enrollments");
    return { success: true };
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
