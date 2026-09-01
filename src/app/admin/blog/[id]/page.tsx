import BlogForm from "../BlogForm";
import { getPostById } from "@/app/actions/blog";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="p-6">
      <BlogForm post={post} />
    </div>
  );
}
