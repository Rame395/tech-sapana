"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getFaqs(onlyPublished = false) {
  return await prisma.faq.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export async function getFaq(id: string) {
  return await prisma.faq.findUnique({
    where: { id },
  });
}

export async function createFaq(data: { question: string; answer: string; published: boolean }) {
  const highestOrder = await prisma.faq.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  
  const res = await prisma.faq.create({
    data: {
      ...data,
      order: highestOrder ? highestOrder.order + 1 : 0,
    },
  });
  
  revalidatePath("/");
  revalidatePath("/admin/faq");
  return res;
}

export async function updateFaq(id: string, data: { question: string; answer: string; published: boolean }) {
  const res = await prisma.faq.update({
    where: { id },
    data,
  });
  
  revalidatePath("/");
  revalidatePath("/admin/faq");
  return res;
}

export async function deleteFaq(id: string) {
  await prisma.faq.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin/faq");
}

export async function reorderFaqs(updates: { id: string; order: number }[]) {
  // Use a transaction to update all orders
  await prisma.$transaction(
    updates.map((update) =>
      prisma.faq.update({
        where: { id: update.id },
        data: { order: update.order },
      })
    )
  );
  
  revalidatePath("/");
  revalidatePath("/admin/faq");
}
