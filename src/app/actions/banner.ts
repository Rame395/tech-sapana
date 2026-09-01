"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPromoBanner() {
  const banner = await prisma.promoBanner.findUnique({
    where: { id: "default" }
  });
  
  if (!banner) {
    // Return default values if not created yet
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    
    return {
      id: "default",
      isActive: false,
      badgeText: "LIMITED TIME OFFER",
      title: "20% OFF THE WEEKEND CRASH COURSE.",
      targetDate: defaultDate,
      buttonText: "Enroll Now",
      buttonLink: "/courses",
      marqueeIsActive: true,
      marqueeText: "A leading tech institution in Nepal guiding students to global success",
      updatedAt: new Date()
    };
  }
  
  return banner;
}

export async function updatePromoBanner(data: {
  isActive: boolean;
  badgeText: string;
  title: string;
  targetDate: Date;
  buttonText: string;
  buttonLink: string;
  marqueeIsActive: boolean;
  marqueeText: string;
}) {
  await prisma.promoBanner.upsert({
    where: { id: "default" },
    update: data,
    create: {
      id: "default",
      ...data
    }
  });
  
  revalidatePath("/");
  revalidatePath("/courses");
  revalidatePath("/admin/banner");
}
