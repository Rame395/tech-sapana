import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export function getExcerpt(htmlContent: string, length: number = 130) {
  if (!htmlContent) return "";
  const text = htmlContent.replace(/<[^>]*>?/gm, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= length) return text;
  return text.substring(0, text.lastIndexOf(" ", length)) + "...";
}

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
        <div className="flex flex-col items-center text-center mb-16 gap-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-brand-blue font-bold text-xs uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Insights & Updates
          </div>
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] text-gray-900 dark:text-white mb-2 tracking-tight leading-[1.2]">
            Latest from our <span className="text-blue-600 dark:text-blue-500">Blog.</span>
          </h2>
          <p className="text-lg text-text-muted leading-relaxed mb-4">
            Insights on engineering, design, and building scalable tech products.
          </p>
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
                    {post.metaDescription || getExcerpt(post.content)}
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

        <div className="mt-16 flex justify-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 !text-white bg-blue-600 hover:bg-blue-700 px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:-translate-y-1"
          >
            View all articles
            <ArrowRight size={18} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </section>
  );
}
