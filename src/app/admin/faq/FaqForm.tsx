"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFaq, updateFaq } from "@/app/actions/faq";
import toast from "react-hot-toast";

export default function FaqForm({ faq }: { faq?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      published: formData.get("published") === "true",
    };

    try {
      if (faq?.id) {
        await updateFaq(faq.id, data);
      } else {
        await createFaq(data);
      }
      toast.success("FAQ saved!");
      router.push("/admin/faq");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Question</label>
          <input type="text" name="question" defaultValue={faq?.question} required className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="e.g. How long does a project take?" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Answer</label>
          <textarea name="answer" defaultValue={faq?.answer} rows={6} required className="w-full px-4 py-3 bg-[#0F1535]/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-500" placeholder="Provide a detailed answer here..." />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="published" value="true" defaultChecked={faq ? faq.published : true} className="w-5 h-5 rounded border-white/20 bg-[#0F1535] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#0F1535]" />
            <span className="text-sm font-bold text-white">Publish FAQ</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
        <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 !text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-600/30 transition-all">
          {loading ? "Saving..." : "Save FAQ"}
        </button>
      </div>
    </form>
  );
}
