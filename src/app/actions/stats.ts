"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStats() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { order: "asc" },
      where: { published: true }
    });
    
    // If no stats exist, return defaults
    if (stats.length === 0) {
      return [
        { id: "1", value: "50", symbol: "+", title: "Projects Engineered", desc: "Custom web & software platforms", order: 0, published: true, createdAt: new Date(), updatedAt: new Date() },
        { id: "2", value: "30", symbol: "+", title: "Businesses Empowered", desc: "SMEs and fast-scaling enterprises", order: 1, published: true, createdAt: new Date(), updatedAt: new Date() },
        { id: "3", value: "3", symbol: "+", title: "Global Markets", desc: "Active engagements in NP, US & AU", order: 2, published: true, createdAt: new Date(), updatedAt: new Date() },
        { id: "4", value: "99.9", symbol: "%", title: "Reliability", desc: "Continuous uptime & deployments", order: 3, published: true, createdAt: new Date(), updatedAt: new Date() },
      ];
    }
    
    return stats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return fallback on error (like if prisma client isn't generated yet)
    return [
      { id: "1", value: "50", symbol: "+", title: "Projects Engineered", desc: "Custom web & software platforms", order: 0, published: true, createdAt: new Date(), updatedAt: new Date() },
      { id: "2", value: "30", symbol: "+", title: "Businesses Empowered", desc: "SMEs and fast-scaling enterprises", order: 1, published: true, createdAt: new Date(), updatedAt: new Date() },
      { id: "3", value: "3", symbol: "+", title: "Global Markets", desc: "Active engagements in NP, US & AU", order: 2, published: true, createdAt: new Date(), updatedAt: new Date() },
      { id: "4", value: "99.9", symbol: "%", title: "Reliability", desc: "Continuous uptime & deployments", order: 3, published: true, createdAt: new Date(), updatedAt: new Date() },
    ];
  }
}

export async function getAllStatsAdmin() {
  try {
    return await prisma.stat.findMany({
      orderBy: { order: "asc" }
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return [];
  }
}

export async function createStat(data: { value: string; symbol: string; title: string; desc: string; order: number; published: boolean }) {
  try {
    await prisma.stat.create({
      data
    });
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/stats");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create stat" };
  }
}

export async function updateStat(id: string, data: { value: string; symbol: string; title: string; desc: string; order: number; published: boolean }) {
  try {
    await prisma.stat.update({
      where: { id },
      data
    });
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/stats");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update stat" };
  }
}

export async function deleteStat(id: string) {
  try {
    await prisma.stat.delete({
      where: { id }
    });
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/stats");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete stat" };
  }
}
