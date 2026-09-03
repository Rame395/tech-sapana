import BlogForm from "../BlogForm";
import { getPostById } from "@/app/actions/blog";
import { notFound } from "next/navigation";

export default async function EditBlogPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
