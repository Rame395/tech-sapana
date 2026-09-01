"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedPosts() {
  return await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
  });
}

export async function createPost(data: any) {
  const post = await prisma.post.create({
    data: {
      ...data,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return post;
}

export async function updatePost(id: string, data: any) {
  const post = await prisma.post.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return post;
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
