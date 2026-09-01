"use client";

import { useEffect, useState } from "react";
import { getPromoBanner, updatePromoBanner } from "@/app/actions/banner";
import { Save } from "lucide-react";
import toast from "react-hot-toast";

export default function BannerSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [badgeText, setBadgeText] = useState("LIMITED TIME OFFER");
  const [title, setTitle] = useState("20% OFF THE WEEKEND CRASH COURSE.");
  const [targetDate, setTargetDate] = useState("");
  const [buttonText, setButtonText] = useState("Enroll Now");
  const [buttonLink, setButtonLink] = useState("/courses");
  
  // Marquee states
  const [marqueeIsActive, setMarqueeIsActive] = useState(true);
  const [marqueeText, setMarqueeText] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getPromoBanner();
      setIsActive(data.isActive);
      setBadgeText(data.badgeText);
      setTitle(data.title);
      setButtonText(data.buttonText);
      setButtonLink(data.buttonLink);
      setMarqueeIsActive(data.marqueeIsActive ?? true);
      setMarqueeText(data.marqueeText || "A leading tech institution in Nepal guiding students to global success");
      
      if (data.targetDate) {
        // Convert to local datetime string for input
        const d = new Date(data.targetDate);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        setTargetDate(d.toISOString().slice(0, 16));
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await updatePromoBanner({
        isActive,
        badgeText,
        title,
        targetDate: new Date(targetDate),
        buttonText,
        buttonLink,
        marqueeIsActive,
        marqueeText
      });
      toast.success("Settings updated successfully!");
    } catch (err) {
      toast.error("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white p-8">Loading settings...</div>;

  return (
    <div className="w-full max-w-4xl p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Banner & Marquee Settings</h2>
        <p className="text-white/50 text-sm">Configure the live countdown banner and the scrolling text marquee.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* PROMO BANNER SECTION */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden p-8 shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 mb-6">Countdown Promo Banner</h3>
          
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="relative flex items-center">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="sr-only" id="toggle" />
              <label htmlFor="toggle" className={`block w-14 h-8 rounded-full cursor-pointer transition-colors ${isActive ? "bg-blue-600" : "bg-white/10"}`}>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isActive ? "transform translate-x-6" : ""}`}></div>
              </label>
            </div>
            <div>
              <div className="text-white font-bold">Enable Promo Banner</div>
              <div className="text-white/50 text-xs">Turn this on to display the countdown banner below the Hero.</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Pill Badge Text</label>
              <input required type="text" value={badgeText} onChange={e => setBadgeText(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Countdown Target Date & Time</label>
              <input required type="datetime-local" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/60 uppercase mb-2">Main Headline</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 pb-2">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Button Text</label>
              <input required type="text" value={buttonText} onChange={e => setButtonText(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Button Link</label>
              <input required type="text" value={buttonLink} onChange={e => setButtonLink(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* MARQUEE SECTION */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden p-8 shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 mb-6">Scrolling Marquee</h3>
          
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="relative flex items-center">
              <input type="checkbox" checked={marqueeIsActive} onChange={(e) => setMarqueeIsActive(e.target.checked)} className="sr-only" id="marqueeToggle" />
              <label htmlFor="marqueeToggle" className={`block w-14 h-8 rounded-full cursor-pointer transition-colors ${marqueeIsActive ? "bg-blue-600" : "bg-white/10"}`}>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${marqueeIsActive ? "transform translate-x-6" : ""}`}></div>
              </label>
            </div>
            <div>
              <div className="text-white font-bold">Enable Scrolling Marquee</div>
              <div className="text-white/50 text-xs">Turn this on to display the sliding text bar globally under the hero.</div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/60 uppercase mb-2">Marquee Text</label>
            <input required type="text" value={marqueeText} onChange={e => setMarqueeText(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. A leading tech institution in Nepal..." />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={saving}
            className="px-8 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} /> {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
