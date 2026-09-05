"use client";

import { useState } from "react";
import { updateLeadershipProfile } from "@/app/actions/team";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import Image from "next/image";

type LeadershipProfile = {
  id: string;
  name: string;
  role: string;
  quoteHeading: string;
  quoteBody: string;
  image: string | null;
};

export default function LeadershipForm({ profile: initialProfile }: { profile: LeadershipProfile }) {
  const [profile, setProfile] = useState<LeadershipProfile>(initialProfile);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setProfile({ ...profile, image: data.url });
        toast.success("Image uploaded", { id: toastId });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateLeadershipProfile({
        name: profile.name,
        role: profile.role,
        quoteHeading: profile.quoteHeading,
        quoteBody: profile.quoteBody,
        image: profile.image,
      });
      setProfile(updated);
      toast.success("Leadership profile updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Leadership Vision (CEO Spotlight)</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Role Title</label>
            <input
              type="text"
              required
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Quote Heading</label>
          <input
            type="text"
            required
            value={profile.quoteHeading}
            onChange={(e) => setProfile({ ...profile, quoteHeading: e.target.value })}
            className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Quote Body</label>
          <textarea
            required
            rows={4}
            value={profile.quoteBody}
            onChange={(e) => setProfile({ ...profile, quoteBody: e.target.value })}
            className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">CEO Image URL</label>
          <div className="flex gap-4 items-center">
            {profile.image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white/10">
                <Image src={profile.image} alt={profile.name} fill className="object-cover" />
              </div>
            )}
            <div className="flex-grow flex gap-2">
              <input
                type="text"
                value={profile.image || ""}
                onChange={(e) => setProfile({ ...profile, image: e.target.value })}
                className="flex-grow bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <label className="bg-[#0F172A] border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center transition-colors">
                <Upload size={18} />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Save Leadership Vision
          </button>
        </div>
      </form>
    </div>
  );
}
