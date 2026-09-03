"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getHeroSection() {
  try {
    let hero = await prisma.heroSection.findUnique({
      where: { id: "default" },
    });

    if (!hero) {
      hero = await prisma.heroSection.create({
        data: {
          id: "default",
          badgeText: "WEB • SOFTWARE • AI SOLUTIONS",
          badgeSubText: "Turning Dreams Into Digital Reality",
          heading: "We Build Websites & Software That Move Your Business Forward.",
          description: "From high-converting websites to custom enterprise platforms, TechSapana designs and delivers digital products engineered for real revenue growth.",
          primaryBtnText: "Start Your Project",
          primaryBtnLink: "#contact",
          secondaryBtnText: "Learn More About Us",
          secondaryBtnLink: "#about",
          sliderBadge: "Web & Software Engineers",
          slides: [
            {
              img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
              badge: "📡 Live Systems",
              title: "Client Software & Web Engineering",
              subtitle: "Kathmandu Development Studio",
            },
            {
              img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
              badge: "🤝 Client Partners",
              title: "Architecture & UX Strategy Sessions",
              subtitle: "Serving Nepal, USA & Australia",
            },
            {
              img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
              badge: "🏢 TechSapana HQ",
              title: "Engineering & AI Innovation Lab",
              subtitle: "High-Performance Dedicated Teams",
            }
          ]
        },
      });
    }

    return hero;
  } catch (error) {
    console.error("Failed to fetch hero section:", error);
    return null;
  }
}

export async function updateHeroSection(data: any) {
  try {
    const updated = await prisma.heroSection.update({
      where: { id: "default" },
      data,
    });
    
    revalidatePath("/");
    revalidatePath("/admin/hero");
    
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update hero section:", error);
    return { success: false, error: "Failed to update hero section." };
  }
}
