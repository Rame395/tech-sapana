"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateHeroSection } from "@/app/actions/hero";
import { Plus, Trash2, GripVertical, Save, CheckCircle } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

export default function HeroForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    badgeText: initialData.badgeText || "",
    badgeSubText: initialData.badgeSubText || "",
    heading: initialData.heading || "",
    description: initialData.description || "",
    primaryBtnText: initialData.primaryBtnText || "",
    primaryBtnLink: initialData.primaryBtnLink || "",
    secondaryBtnText: initialData.secondaryBtnText || "",
    secondaryBtnLink: initialData.secondaryBtnLink || "",
    sliderBadge: initialData.sliderBadge || "",
  });

  const [slides, setSlides] = useState<any[]>(
    typeof initialData.slides === "string" 
      ? JSON.parse(initialData.slides) 
      : (initialData.slides || [])
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    const result = await updateHeroSection({
      ...formData,
      slides: JSON.parse(JSON.stringify(slides)),
    });

    if (result.success) {
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert(result.error || "Something went wrong.");
    }
    
    setIsSubmitting(false);
  };

  const addSlide = () => {
    setSlides([...slides, { img: "", badge: "", title: "", subtitle: "" }]);
  };

  const removeSlide = (index: number) => {
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    setSlides(newSlides);
  };

  const updateSlide = (index: number, field: string, value: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Left Content Settings */}
      <div className="bg-[#0B132B] border border-white/10 shadow-2xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Left Content Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Badge Main Text</label>
            <input
              type="text"
              value={formData.badgeText}
              onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
              className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. WEB • SOFTWARE • AI SOLUTIONS"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Badge Sub Text</label>
            <input
              type="text"
              value={formData.badgeSubText}
              onChange={(e) => setFormData({ ...formData, badgeSubText: e.target.value })}
              className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. Turning Dreams Into Digital Reality"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">Main Heading</label>
          <textarea
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            rows={2}
            placeholder="Main H1 heading..."
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            rows={3}
            placeholder="Subheading paragraph..."
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-black/20 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-gray-300">Primary Button (Blue)</h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Text</label>
              <input
                type="text"
                value={formData.primaryBtnText}
                onChange={(e) => setFormData({ ...formData, primaryBtnText: e.target.value })}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
              <input
                type="text"
                value={formData.primaryBtnLink}
                onChange={(e) => setFormData({ ...formData, primaryBtnLink: e.target.value })}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-black/20 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-gray-300">Secondary Button (Outline)</h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Text</label>
              <input
                type="text"
                value={formData.secondaryBtnText}
                onChange={(e) => setFormData({ ...formData, secondaryBtnText: e.target.value })}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
              <input
                type="text"
                value={formData.secondaryBtnLink}
                onChange={(e) => setFormData({ ...formData, secondaryBtnLink: e.target.value })}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Slider Settings */}
      <div className="bg-[#0B132B] border border-white/10 shadow-2xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Visual Slider Content</h2>
          <button
            type="button"
            onClick={addSlide}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-md transition-colors text-sm font-semibold"
          >
            <Plus size={16} /> Add Slide
          </button>
        </div>
        
        <div className="mb-8 p-4 rounded-lg bg-black/20 border border-white/5">
          <label className="block text-sm font-medium text-gray-400 mb-1">Slider Top Floating Badge</label>
          <input
            type="text"
            value={formData.sliderBadge}
            onChange={(e) => setFormData({ ...formData, sliderBadge: e.target.value })}
            className="w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g. Web & Software Engineers"
          />
        </div>

        <div className="space-y-6">
          {slides.map((slide, index) => (
            <div key={index} className="flex gap-4 items-start p-5 rounded-lg border border-[#30363D] bg-[#0d1117] relative">
              <div className="mt-2 text-gray-600 cursor-grab">
                <GripVertical size={20} />
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Slide Image</label>
                  <ImageUploader 
                    value={slide.img} 
                    onChange={(url) => updateSlide(index, "img", url)} 
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Mini Badge</label>
                    <input
                      type="text"
                      value={slide.badge}
                      onChange={(e) => updateSlide(index, "badge", e.target.value)}
                      className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g. 📡 Live Systems"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => updateSlide(index, "title", e.target.value)}
                      className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1.5 text-sm text-white font-bold focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g. Client Software & Web Engineering"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) => updateSlide(index, "subtitle", e.target.value)}
                      className="w-full bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1.5 text-sm text-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g. Kathmandu Development Studio"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeSlide(index)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
                title="Remove Slide"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          {slides.length === 0 && (
            <div className="text-center py-10 border border-dashed border-[#30363D] rounded-lg text-gray-500">
              No slides added yet. Click "Add Slide" to begin.
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        {success && (
          <span className="text-green-400 flex items-center gap-2 font-medium">
            <CheckCircle size={18} /> Settings saved successfully!
          </span>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:hover:bg-blue-600 !text-white font-bold rounded-lg transition-colors"
        >
          {isSubmitting ? "Saving..." : <><Save size={18} /> Save Hero Section</>}
        </button>
      </div>
    </form>
  );
}
