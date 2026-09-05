"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { createCourse, updateCourse } from "@/app/actions/course";
import ImageUploader from "@/components/ImageUploader";

export default function CourseForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [originalPrice, setOriginalPrice] = useState(initialData?.originalPrice || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [badgeText1, setBadgeText1] = useState(initialData?.badgeText1 || "");
  const [badge1Style, setBadge1Style] = useState(initialData?.badge1Style || "red");
  const [badgeText2, setBadgeText2] = useState(initialData?.badgeText2 || "");
  const [startDateText, setStartDateText] = useState(initialData?.startDateText || "");
  const [scheduleText, setScheduleText] = useState(initialData?.scheduleText || "");
  const [classTiming, setClassTiming] = useState(initialData?.classTiming || "");
  const [availableSeats, setAvailableSeats] = useState(initialData?.availableSeats || 20);
  
  const initialHighlights = initialData?.highlights ? [...initialData.highlights] : ["", "", ""];
  const [highlights, setHighlights] = useState(initialHighlights);
  
  const [published, setPublished] = useState(initialData?.published || false);

  const handleHighlightChange = (index: number, val: string) => {
    const newHl = [...highlights];
    newHl[index] = val;
    setHighlights(newHl);
  };

  const addHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const removeHighlight = (index: number) => {
    const newHl = [...highlights];
    newHl.splice(index, 1);
    setHighlights(newHl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = { 
      title, 
      slug, 
      description, 
      price: Number(price), 
      originalPrice: originalPrice ? Number(originalPrice) : null,
      imageUrl: imageUrl || null,
      badgeText1: badgeText1 || null,
      badge1Style,
      badgeText2: badgeText2 || null,
      startDateText: startDateText || null,
      scheduleText: scheduleText || null,
      classTiming: classTiming || null,
      availableSeats: Number(availableSeats),
      highlights: highlights.filter(h => h.trim() !== ""),
      published 
    };
    
    try {
      if (initialData?.id) {
        await updateCourse(initialData.id, data);
        toast.success("Course updated successfully!");
      } else {
        await createCourse(data);
        toast.success("Course added successfully!");
      }
      router.push("/admin/courses");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/courses" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{initialData ? "Edit Course" : "Add New Course"}</h2>
          <p className="text-white/50 text-sm">Configure the public course details and schedule.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-white/60 uppercase mb-2">Cover Image</label>
            <ImageUploader value={imageUrl} onChange={setImageUrl} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Course Title</label>
              <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. AI for Life & Business" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">URL Slug</label>
              <input required type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. ai-for-life" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Badge 1 (Top Left, e.g. ⚡ Starting This Week)</label>
              <div className="flex gap-2">
                <input type="text" value={badgeText1} onChange={e => setBadgeText1(e.target.value)} className="flex-grow bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Optional" />
                <select value={badge1Style} onChange={e => setBadge1Style(e.target.value)} className="w-32 bg-[#0F1535] border border-white/10 rounded-xl px-2 py-3 text-white focus:outline-none focus:border-blue-500">
                  <option value="red">Red</option>
                  <option value="gold">Gold (Top Pick)</option>
                  <option value="blue">Blue (Upcoming)</option>
                </select>
              </div>
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Badge 2 (Top Right)</label>
              <input type="text" value={badgeText2} onChange={e => setBadgeText2(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Optional" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/60 uppercase mb-2">Description</label>
            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Course details..."></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Start Date Text</label>
              <input type="text" value={startDateText} onChange={e => setStartDateText(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Starts This Wednesday (Sep 03)" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Schedule Text</label>
              <input type="text" value={scheduleText} onChange={e => setScheduleText(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Mon, Wed, Fri" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Class Timing</label>
              <input type="text" value={classTiming} onChange={e => setClassTiming(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. 7:00 PM - 8:30 PM NPT" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Available Seats</label>
              <input type="number" value={availableSeats} onChange={e => setAvailableSeats(Number(e.target.value))} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-white/60 uppercase">Curriculum Highlights (Bullet Points)</label>
              <button type="button" onClick={addHighlight} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold">
                <Plus size={14} /> Add Point
              </button>
            </div>
            <div className="space-y-3">
              {highlights.map((hl, idx) => (
                <div key={idx} className="flex gap-2">
                  <input type="text" value={hl} onChange={e => handleHighlightChange(idx, e.target.value)} className="flex-grow bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm" placeholder={`Point ${idx + 1}...`} />
                  <button type="button" onClick={() => removeHighlight(idx)} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-3 rounded-xl transition-colors">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-white/10">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Current Price (NPR)</label>
              <input required type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Original Price (Crossed out)</label>
              <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Optional" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="sr-only" />
                <div className={`block w-14 h-8 rounded-full transition-colors ${published ? "bg-blue-600" : "bg-white/10"}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${published ? "transform translate-x-6" : ""}`}></div>
              </div>
              <div className="ml-3">
                <div className="text-white font-semibold">Publish Course</div>
                <div className="text-white/50 text-xs">If unchecked, it remains a draft.</div>
              </div>
            </label>

            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 !text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} /> {loading ? "Saving..." : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
