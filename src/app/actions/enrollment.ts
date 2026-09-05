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
    // 1. Basic Validation
    if (!data.name || !data.email || !data.phone || !data.courseId) {
      return { success: false, error: "Missing required fields." };
    }

    // 2. Regex Validation (Server-side)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Invalid email format." };
    }

    const phoneRegex = /^\+[0-9]{8,15}$/;
    if (!phoneRegex.test(data.phone)) {
      return { success: false, error: "Invalid phone number format." };
    }

    // 3. Duplicate Prevention
    const existing = await prisma.enrollment.findFirst({
      where: {
        email: data.email,
        courseId: data.courseId,
        status: "PENDING"
      }
    });

    if (existing) {
      return { success: false, error: "You already have a pending enrollment for this course." };
    }

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
    await prisma.$transaction(async (tx) => {
      // Fetch the current enrollment to know its old status
      const enrollment = await tx.enrollment.findUnique({
        where: { id },
        include: { course: true }
      });
      
      if (!enrollment) throw new Error("Enrollment not found");
      
      // Update the enrollment status
      await tx.enrollment.update({
        where: { id },
        data: { status },
      });
      
      // Seat management logic
      if (enrollment.status !== "VERIFIED" && status === "VERIFIED") {
        // Decrement seat
        if (enrollment.course.availableSeats && enrollment.course.availableSeats > 0) {
          await tx.course.update({
            where: { id: enrollment.courseId },
            data: { availableSeats: enrollment.course.availableSeats - 1 }
          });
        }
      } else if (enrollment.status === "VERIFIED" && status !== "VERIFIED") {
        // Increment seat back if un-verified
        if (enrollment.course.availableSeats !== null) {
          await tx.course.update({
            where: { id: enrollment.courseId },
            data: { availableSeats: enrollment.course.availableSeats + 1 }
          });
        }
      }
    });

    revalidatePath("/admin/enrollments");
    return { success: true };
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
