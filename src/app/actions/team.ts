"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Leadership Profile ---

export async function getLeadershipProfile() {
  let profile = await prisma.leadershipProfile.findUnique({
    where: { id: "default" },
  });

  if (!profile) {
    profile = await prisma.leadershipProfile.create({
      data: {
        id: "default",
      },
    });
  }
  return profile;
}

export async function updateLeadershipProfile(data: {
  name: string;
  role: string;
  quoteHeading: string;
  quoteBody: string;
  image: string | null;
}) {
  const profile = await prisma.leadershipProfile.upsert({
    where: { id: "default" },
    update: data,
    create: {
      id: "default",
      ...data,
    },
  });

  revalidatePath("/about");
  revalidatePath("/admin/team");
  return profile;
}

// --- Team Members ---

export async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createTeamMember(data: {
  name: string;
  badge: string;
  description: string;
  order: number;
}) {
  const member = await prisma.teamMember.create({
    data,
  });

  revalidatePath("/about");
  revalidatePath("/admin/team");
  return member;
}

export async function updateTeamMember(
  id: string,
  data: {
    name?: string;
    badge?: string;
    description?: string;
    order?: number;
  }
) {
  const member = await prisma.teamMember.update({
    where: { id },
    data,
  });

  revalidatePath("/about");
  revalidatePath("/admin/team");
  return member;
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/about");
  revalidatePath("/admin/team");
}
