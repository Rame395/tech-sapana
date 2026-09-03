"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/app/actions/blog";
import ImageUploader from "@/components/ImageUploader";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function BlogForm({ post }: { post?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    status: post?.status || "DRAFT",
    category: post?.category || "",
    featuredImage: post?.featuredImage || "",
    focusKeyword: post?.focusKeyword || "",
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
    noIndex: post?.noIndex || false,
  });

  const [seoScore, setSeoScore] = useState({
    score: 0,
    messages: [] as string[]
  });

  // Simple SEO analysis logic
  useEffect(() => {
    if (!formData.focusKeyword) {
      setSeoScore({ score: 0, messages: ["Set a Focus Keyword to get real-time SEO scoring."] });
      return;
    }

    const keyword = formData.focusKeyword.toLowerCase();
    let score = 0;
    const msgs = [];

    // Title Check
    const titleToCheck = formData.metaTitle || formData.title;
    if (titleToCheck.toLowerCase().includes(keyword)) {
      score += 30;
      msgs.push("✅ Focus keyword found in SEO Title.");
    } else {
      msgs.push("❌ Focus keyword missing from SEO Title.");
    }

    // Meta Description Check
    if (formData.metaDescription.toLowerCase().includes(keyword)) {
      score += 30;
      msgs.push("Focus keyword found in Meta Description.");
    } else {
      msgs.push("❌ Focus keyword missing from Meta Description.");
    }

    // Content Check (Simple word match)
    if (formData.content.toLowerCase().includes(keyword)) {
      score += 30;
      msgs.push("✅ Focus keyword found in content.");
    } else {
      msgs.push("❌ Focus keyword missing from content.");
    }

    // Length checks
    if (formData.content.length > 300) {
      score += 10;
    } else {
      msgs.push("⚠️ Content is too short.");
    }

    setSeoScore({ score, messages: msgs });
  }, [formData.focusKeyword, formData.metaTitle, formData.title, formData.metaDescription, formData.content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Auto-generate slug if empty
    let finalSlug = formData.slug;
    if (!finalSlug) {
      finalSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    try {
      if (post) {
        await updatePost(post.id, { ...formData, slug: finalSlug });
      } else {
        await createPost({ ...formData, slug: finalSlug });
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert("Error saving post. Make sure slug is unique.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score === 0) return "text-gray-400";
    if (score < 50) return "text-red-500";
    if (score < 80) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[1400px] mx-auto text-white pb-24">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="text-gray-400 hover:text-white transition-colors">&larr; Back to Posts</Link>
          <h1 className="text-2xl font-bold font-serif text-white">{post ? "Edit Post" : "Create New Post"}</h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 !text-white px-8 py-2.5 rounded-md font-bold transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Post"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0f172a] rounded-xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Post Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-[#1e293b] border border-gray-700 rounded-md text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  placeholder="leave-blank-to-auto-generate"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full p-3 bg-[#1e293b] border border-gray-700 rounded-md text-gray-400 font-mono text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                <div className="bg-white rounded-md overflow-hidden text-black h-[500px]">
                  <ReactQuill 
                    theme="snow" 
                    value={formData.content} 
                    onChange={(val) => setFormData({ ...formData, content: val })} 
                    className="h-[450px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">SEO Optimization</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Focus Keyword</label>
                <input
                  type="text"
                  placeholder=""
                  value={formData.focusKeyword}
                  onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                  className="w-full p-3 bg-[#1e293b] border border-gray-700 rounded-md text-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Meta Title</label>
                <input
                  type="text"
                  placeholder="Defaults to Post Title if blank"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full p-3 bg-[#1e293b] border border-gray-700 rounded-md text-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full p-3 bg-[#1e293b] border border-blue-600 rounded-md text-white focus:ring-1 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-5 border border-gray-700 flex flex-col items-center justify-center min-h-[120px] text-center">
              {formData.focusKeyword ? (
                <div className="w-full text-left">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-700 pb-2">
                    <span className="font-bold text-white">SEO Score</span>
                    <span className={`text-2xl font-bold ${getScoreColor(seoScore.score)}`}>
                      {seoScore.score}/100
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {seoScore.messages.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 mb-2">!</div>
                  <h4 className="font-bold text-white mb-1">Set a Focus Keyword</h4>
                  <p className="text-gray-400 text-sm">Enter a focus keyword to get real-time SEO scoring.</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] rounded-xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Publishing</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 bg-[#1e293b] border border-gray-700 rounded-md text-white focus:ring-1 focus:ring-blue-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Technology"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-[#1e293b] border border-gray-700 rounded-md text-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 !text-white py-3 rounded-md font-bold transition-colors mt-2"
              >
                {loading ? "Saving..." : "Save Post"}
              </button>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Featured Image</h2>
            <div className="bg-[#1e293b] p-4 rounded-md border border-dashed border-gray-600 text-center">
              <ImageUploader 
                onChange={(url: string) => setFormData({ ...formData, featuredImage: url })}
                value={formData.featuredImage}
              />
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Advanced SEO</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.noIndex}
                onChange={(e) => setFormData({ ...formData, noIndex: e.target.checked })}
                className="w-5 h-5 rounded bg-[#1e293b] border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-300 font-medium">No Index (Hide from Google)</span>
            </label>
          </div>
        </div>

      </div>
    </form>
  );
}
