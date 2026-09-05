"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCourseDetails(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: "asc" }
        },
        tools: {
          orderBy: { order: "asc" }
        },
        instructor: true
      }
    });
    return course;
  } catch (error) {
    console.error("Error fetching course details:", error);
    return null;
  }
}

export async function getGlobalSettingsForCheckout() {
  try {
    const settings = await prisma.globalSettings.findUnique({
      where: { id: "default" }
    });
    return {
      paymentQrImage: settings?.paymentQrImage || null
    };
  } catch (error) {
    console.error("Error fetching global settings:", error);
    return { paymentQrImage: null };
  }
}
