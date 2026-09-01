import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export function getReadingTime(htmlContent: string) {
  if (!htmlContent) return 1;
  const text = htmlContent.replace(/<[^>]*>?/gm, " ");
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default async function HomeBlogSection() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  const recentPosts = posts;

  if (recentPosts.length === 0) return null;

  return (
    <section className="py-24 bg-bg-primary border-b border-border-subtle relative overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4 tracking-tight">
              Latest from our Blog
            </h2>
            <p className="text-lg text-text-muted">
              Insights on engineering, design, and building scalable tech products.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-blue-hover transition-colors"
          >
            View all articles <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => {
            const readingTime = getReadingTime(post.content);
            return (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                className="group flex flex-col bg-bg-card border border-border-subtle rounded-3xl overflow-hidden hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300"
              >
                {post.featuredImage && (
                  <div className="relative h-52 w-full overflow-hidden shrink-0 border-b border-border-subtle">
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md text-text-main text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {post.category}
                      </div>
                    )}
                  </div>
                )}
                <div className="p-7 flex flex-col flex-grow">
                  {!post.featuredImage && post.category && (
                     <div className="text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
                       {post.category}
                     </div>
                  )}
                  <h3 className="text-xl font-bold mb-3 text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {post.metaDescription || "Click to read this full article on our blog."}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs font-medium text-text-muted pt-4 border-t border-border-subtle mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
