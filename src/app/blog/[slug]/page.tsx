import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { getReadingTime } from "../page";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
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
        
        <header className="mb-12 text-center md:text-left">
          {post.category && (
            <div className="text-brand-blue font-bold tracking-wider uppercase text-xs mb-4">
              {post.category}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-[800] tracking-tight leading-[1.1] mb-6 text-text-main">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium text-text-muted">
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
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-blue hover:prose-a:text-brand-blue-hover prose-img:rounded-2xl prose-img:shadow-lg prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
