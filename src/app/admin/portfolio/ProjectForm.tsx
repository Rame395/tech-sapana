"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/app/actions/portfolio";
import ImageUploader from "@/components/ImageUploader";

export default function ProjectForm({ project }: { project?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);
  const [newTech, setNewTech] = useState("");

  const addTech = () => {
    if (newTech.trim()) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      category: formData.get("category"),
      client: formData.get("client"),
      liveUrl: formData.get("liveUrl"),
      videoUrl: formData.get("videoUrl"),
      published: formData.get("published") === "true",
      imageUrl,
      technologies,
    };

    try {
      if (project?.id) {
        await updateProject(project.id, data);
      } else {
        await createProject(data);
      }
      router.push("/admin/portfolio");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Title</label>
          <input type="text" name="title" defaultValue={project?.title} required className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="Project Name" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Slug</label>
          <input type="text" name="slug" defaultValue={project?.slug} required className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="project-slug-url" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Category</label>
          <select name="category" defaultValue={project?.category || "ecommerce"} className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all">
            <option value="ecommerce">E-Commerce & Retail</option>
            <option value="hospitality">Hospitality & Tourism</option>
            <option value="management">Management Systems (ERP)</option>
            <option value="health">Healthcare & Medical</option>
            <option value="ai">AI & Automation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Description</label>
          <textarea name="description" defaultValue={project?.description} rows={4} required className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="Describe the project..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Project Image</label>
          <ImageUploader value={imageUrl} onChange={setImageUrl} />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 space-y-4">
        <h3 className="text-lg font-black text-white border-b border-white/10 pb-3">Additional Info</h3>
        
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Client / Company Name</label>
          <input type="text" name="client" defaultValue={project?.client} className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="e.g. Acme Corp" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Live URL (Optional)</label>
          <input type="text" name="liveUrl" defaultValue={project?.liveUrl} className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Video Walkthrough URL (Optional)</label>
          <input type="text" name="videoUrl" defaultValue={project?.videoUrl} className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="https://youtube.com/..." />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Technologies Used</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              value={newTech} 
              onChange={e => setNewTech(e.target.value)} 
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTech())}
              placeholder="e.g. Next.js" 
              className="flex-1 px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" 
            />
            <button type="button" onClick={addTech} className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-6 py-2 rounded-xl font-bold hover:bg-blue-600/40 transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <div key={i} className="flex items-center gap-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm font-bold">
                {tech}
                <button type="button" onClick={() => removeTech(i)} className="text-blue-300 hover:text-white ml-1 transition-colors">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="published" value="true" defaultChecked={project?.published} className="w-5 h-5 rounded border-white/20 bg-[#0F1535] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#0F1535]" />
            <span className="text-sm font-bold text-white">Publish Project (Visible to public)</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
        <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 !text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-600/30 transition-all">
          {loading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
