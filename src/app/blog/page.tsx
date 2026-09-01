import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | TechSapana",
  description: "Read our latest articles on software engineering, UI/UX design, and technology trends.",
};

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

export default async function BlogIndexPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-bg-primary text-text-main pt-[8.5rem] pb-24">
      <div className="w-full max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Blog</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Insights, tutorials, and updates from the TechSapana engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
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
                  <h2 className="text-xl font-bold mb-3 text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-text-muted text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {post.metaDescription || getExcerpt(post.content)}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-text-muted pt-4 border-t border-border-subtle mt-auto">
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
          
          {posts.length === 0 && (
            <div className="col-span-full text-center py-24 bg-bg-card border border-border-subtle rounded-3xl">
              <p className="text-text-muted">No blog posts published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
