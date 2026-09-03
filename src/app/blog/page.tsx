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
  const text = htmlContent.replace(/<[^>]*>?/gm, " ").replace(/&nbsp;/g, " ");
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
          <h1 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] mb-6 tracking-tight text-gray-900 dark:text-white leading-[1.2]">
            Our <span className="text-blue-600 dark:text-blue-500">Blog</span>
          </h1>
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
                className="group flex flex-col bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                {post.featuredImage ? (
                  <div className="relative h-48 w-full overflow-hidden shrink-0 border-b border-gray-100 dark:border-white/5">
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md text-gray-900 dark:text-white text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {post.category}
                      </div>
                    )}
                  </div>
                ) : (
                  post.category && (
                    <div className="px-6 pt-6 pb-2 shrink-0">
                      <div className="inline-block bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] font-extrabold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full shadow-sm">
                        {post.category}
                      </div>
                    </div>
                  )
                )}
                
                <div className={`px-6 pb-6 flex flex-col flex-grow ${!post.featuredImage && !post.category ? 'pt-6' : ''}`}>
                  <h2 className="text-xl md:text-2xl font-[800] mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight tracking-tight mt-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {post.metaDescription || getExcerpt(post.content)}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-white/10 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-blue-500" />
                      <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-blue-500" />
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
