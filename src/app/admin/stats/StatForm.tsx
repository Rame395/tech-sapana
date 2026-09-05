"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStat, updateStat } from "@/app/actions/stats";
import { Save } from "lucide-react";

type Stat = {
  id?: string;
  value: string;
  symbol: string;
  title: string;
  desc: string;
  order: number;
  published: boolean;
};

export default function StatForm({ initialData }: { initialData?: Stat }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Stat>(
    initialData || {
      value: "",
      symbol: "+",
      title: "",
      desc: "",
      order: 0,
      published: true,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        await updateStat(initialData.id, formData);
      } else {
        await createStat(formData);
      }
      router.push("/admin/stats");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save stat");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">
          {initialData ? "Edit Stat" : "Create New Stat"}
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-300 font-bold">Status:</label>
          <select
            value={formData.published ? "true" : "false"}
            onChange={(e) => setFormData({ ...formData, published: e.target.value === "true" })}
            className="bg-[#0F1535] border border-white/10 text-white rounded-lg px-3 py-1 outline-none focus:border-blue-500"
          >
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Value (e.g. 50, 99.9)</label>
          <input
            required
            type="text"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className="w-full bg-[#0F1535]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="50"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">Symbol (e.g. +, %)</label>
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
            className="w-full bg-[#0F1535]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="+"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-300 mb-2">Title (e.g. Projects Engineered)</label>
        <input
          required
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-[#0F1535]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Projects Engineered"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-300 mb-2">Subtext / Description</label>
        <input
          required
          type="text"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          className="w-full bg-[#0F1535]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Custom web & software platforms"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-300 mb-2">Display Order</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
          className="w-full md:w-1/3 bg-[#0F1535]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : <><Save size={18} /> Save Stat</>}
        </button>
      </div>
    </form>
  );
}
