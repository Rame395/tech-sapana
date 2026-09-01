import { getPosts, deletePost } from "@/app/actions/blog";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AdminBlogList() {
  const posts = await getPosts();

  async function handleDelete(id: string) {
    "use server";
    await deletePost(id);
    revalidatePath("/admin/blog");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-bold transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-[#1A2235] rounded-xl shadow-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-semibold text-white/50">Post Title</th>
              <th className="p-4 font-semibold text-white/50">Status</th>
              <th className="p-4 font-semibold text-white/50">Category</th>
              <th className="p-4 font-semibold text-white/50">Date</th>
              <th className="p-4 font-semibold text-white/50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">
                  {post.title}
                  {post.noIndex && <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">NoIndex</span>}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    post.status === "PUBLISHED" 
                      ? "bg-green-500/20 text-green-400 border-green-500/30" 
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-white/70">{post.category || "Uncategorized"}</td>
                <td className="p-4 text-white/70">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right flex justify-end gap-4">
                  <Link href={`/admin/blog/${post.id}`} className="text-blue-400 hover:text-blue-300 font-medium">Edit</Link>
                  <form action={async () => { "use server"; await handleDelete(post.id); }}>
                    <button type="submit" className="text-red-400 hover:text-red-300 font-medium">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-white/50">
                  No blog posts found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
