import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { getReadingTime } from "../page";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
  });
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.title,
    robots: {
      index: !post.noIndex,
      follow: !post.noIndex,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || "",
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
  });
  
  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    image: post.featuredImage ? [post.featuredImage] : [],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "TechSapana",
    },
    description: post.metaDescription || "",
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-main pt-[8.5rem] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="w-full max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-hover hover:underline mb-10 font-semibold transition-colors">
          <ArrowLeft size={16} />
          Back to all posts
        </Link>
        
        <header className="mb-12 text-center">
          {post.category && (
            <div className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-4">
              {post.category}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-[800] tracking-tight leading-[1.2] mb-6 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {post.featuredImage && (
          <div className="relative w-full aspect-[21/9] max-h-[450px] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-border-subtle bg-bg-secondary">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-[800] prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-3xl prose-img:shadow-2xl prose-p:leading-[1.8] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 break-words"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/&nbsp;/g, ' ') }}
        />
      </article>
    </main>
  );
}
