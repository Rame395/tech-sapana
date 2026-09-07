"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Plus, X, Trash2, GripVertical } from "lucide-react";
import Link from "next/link";
import { createCourse, updateCourse } from "@/app/actions/course";
import ImageUploader from "@/components/ImageUploader";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Tab = 'basic' | 'overview' | 'syllabus' | 'tools';

export default function CourseForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('basic');

  // Basic Info state
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
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
  const [published, setPublished] = useState(initialData?.published || false);

  // Overview state
  const [description, setDescription] = useState(initialData?.description || "");
  const [detailedDescription, setDetailedDescription] = useState(initialData?.detailedDescription || "");
  const [iconName, setIconName] = useState(initialData?.iconName || "BookOpen");
  const initialHighlights = initialData?.highlights ? [...initialData.highlights] : ["", "", ""];
  const [highlights, setHighlights] = useState(initialHighlights);

  // Syllabus & Tools state
  const [modules, setModules] = useState<{ weekLabel: string; title: string; lessons: string[]; order: number }[]>(
    initialData?.modules?.map((m: any) => ({ weekLabel: m.weekLabel, title: m.title, lessons: m.lessons, order: m.order })) || []
  );
  const [tools, setTools] = useState<{ icon: string; name: string; description: string; order: number }[]>(
    initialData?.tools?.map((t: any) => ({ icon: t.icon, name: t.name, description: t.description, order: t.order })) || []
  );

  // Handlers for Highlights
  const handleHighlightChange = (index: number, val: string) => {
    const newHl = [...highlights];
    newHl[index] = val;
    setHighlights(newHl);
  };
  const addHighlight = () => setHighlights([...highlights, ""]);
  const removeHighlight = (index: number) => {
    const newHl = [...highlights];
    newHl.splice(index, 1);
    setHighlights(newHl);
  };

  // Handlers for Modules
  const addModule = () => {
    setModules([...modules, { weekLabel: `WEEK ${String(modules.length + 1).padStart(2, '0')}`, title: "", lessons: [""], order: modules.length }]);
  };
  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };
  const updateModule = (index: number, field: string, value: any) => {
    const newMods = [...modules];
    (newMods[index] as any)[field] = value;
    setModules(newMods);
  };
  const addLessonToModule = (modIndex: number) => {
    const newMods = [...modules];
    newMods[modIndex].lessons.push("");
    setModules(newMods);
  };
  const updateLessonInModule = (modIndex: number, lessonIndex: number, value: string) => {
    const newMods = [...modules];
    newMods[modIndex].lessons[lessonIndex] = value;
    setModules(newMods);
  };
  const removeLessonFromModule = (modIndex: number, lessonIndex: number) => {
    const newMods = [...modules];
    newMods[modIndex].lessons.splice(lessonIndex, 1);
    setModules(newMods);
  };

  // Handlers for Tools
  const addTool = () => {
    setTools([...tools, { icon: "FaToolbox", name: "", description: "", order: tools.length }]);
  };
  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };
  const updateTool = (index: number, field: string, value: string) => {
    const newTools = [...tools];
    (newTools[index] as any)[field] = value;
    setTools(newTools);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Clean up empty data
    const cleanModules = modules.map((m, i) => ({ ...m, order: i, lessons: m.lessons.filter(l => l.trim() !== "") })).filter(m => m.title.trim() !== "");
    const cleanTools = tools.map((t, i) => ({ ...t, order: i })).filter(t => t.name.trim() !== "");
    const cleanHighlights = highlights.filter(h => h.trim() !== "");

    const data = { 
      title, slug, description, 
      price: Number(price), originalPrice: originalPrice ? Number(originalPrice) : null,
      imageUrl: imageUrl || null,
      badgeText1: badgeText1 || null, badge1Style, badgeText2: badgeText2 || null,
      startDateText: startDateText || null, scheduleText: scheduleText || null,
      classTiming: classTiming || null, availableSeats: Number(availableSeats),
      iconName, detailedDescription: detailedDescription || null,
      highlights: cleanHighlights,
      published,
      modules: cleanModules,
      tools: cleanTools
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

  const TabButton = ({ id, label }: { id: Tab, label: string }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${activeTab === id ? "border-blue-500 text-blue-400" : "border-transparent text-white/50 hover:text-white"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-4xl pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/courses" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{initialData ? "Edit Course" : "Add New Course"}</h2>
          <p className="text-white/50 text-sm">Configure the public course details and schedule.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-white/10 px-4 bg-black/20 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <TabButton id="basic" label="Basic Info" />
          <TabButton id="overview" label="Overview" />
          <TabButton id="syllabus" label="Syllabus" />
          <TabButton id="tools" label="Tools Stack" />
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          
          {/* TAB 1: BASIC INFO */}
          <div className={activeTab === 'basic' ? 'space-y-6 block' : 'hidden'}>
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Start Date Text</label>
                <input type="text" value={startDateText} onChange={e => setStartDateText(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Starts This Wednesday" />
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Current Price (NPR)</label>
                <input required type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Original Price (Crossed out)</label>
                <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Optional" />
              </div>
            </div>
          </div>

          {/* TAB 2: OVERVIEW */}
          <div className={activeTab === 'overview' ? 'space-y-8 block' : 'hidden'}>
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Short Description (Card View)</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Course details..."></textarea>
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
            
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase mb-2">Homepage Icon (Lucide Icon Name)</label>
              <input type="text" value={iconName} onChange={e => setIconName(e.target.value)} className="w-full md:w-1/2 bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Bot, Code2, Monitor" />
            </div>

            <div className="border border-white/10 rounded-xl overflow-hidden">
              <label className="block text-xs font-bold text-white/80 bg-[#121A42] px-4 py-3 border-b border-white/10 uppercase">Detailed Course Content (Rich Text)</label>
              <ReactQuill 
                theme="snow" 
                value={detailedDescription} 
                onChange={setDetailedDescription} 
                className="bg-white text-black min-h-[300px]"
              />
            </div>
          </div>

          {/* TAB 3: SYLLABUS */}
          <div className={activeTab === 'syllabus' ? 'space-y-6 block' : 'hidden'}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-white/60">Build the weekly modules and lessons for this course.</p>
              <button type="button" onClick={addModule} className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded-xl font-bold flex items-center gap-2 transition-colors">
                <Plus size={16} /> Add Module
              </button>
            </div>

            <div className="space-y-6">
              {modules.length === 0 && <p className="text-center text-white/30 py-8 border border-dashed border-white/10 rounded-xl">No modules added yet.</p>}
              
              {modules.map((mod, mIndex) => (
                <div key={mIndex} className="bg-black/20 border border-white/10 rounded-xl p-6 relative">
                  <button type="button" onClick={() => removeModule(mIndex)} className="absolute top-4 right-4 text-red-400/50 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="grid md:grid-cols-4 gap-4 mb-4 pr-8">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold text-white/60 uppercase mb-2">Label</label>
                      <input type="text" value={mod.weekLabel} onChange={e => updateModule(mIndex, 'weekLabel', e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. WEEK 01" />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-white/60 uppercase mb-2">Module Title</label>
                      <input type="text" value={mod.title} onChange={e => updateModule(mIndex, 'title', e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Foundations of AI" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-white/60 uppercase mb-2">Lessons (Bullet Points)</label>
                    <div className="space-y-2">
                      {mod.lessons.map((lesson, lIndex) => (
                        <div key={lIndex} className="flex gap-2 items-center">
                          <GripVertical size={14} className="text-white/20" />
                          <input type="text" value={lesson} onChange={e => updateLessonInModule(mIndex, lIndex, e.target.value)} className="flex-grow bg-[#0F1535] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" placeholder="Lesson detail..." />
                          <button type="button" onClick={() => removeLessonFromModule(mIndex, lIndex)} className="text-red-400 hover:text-red-300 p-1">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addLessonToModule(mIndex)} className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold pl-6">
                        <Plus size={14} /> Add Lesson
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TAB 4: TOOLS */}
          <div className={activeTab === 'tools' ? 'space-y-6 block' : 'hidden'}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-white/60">Add the tech stack students will learn in this course.</p>
              <button type="button" onClick={addTool} className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded-xl font-bold flex items-center gap-2 transition-colors">
                <Plus size={16} /> Add Tool
              </button>
            </div>

            <div className="space-y-4">
              {tools.length === 0 && <p className="text-center text-white/30 py-8 border border-dashed border-white/10 rounded-xl">No tools added yet.</p>}
              
              {tools.map((tool, tIndex) => (
                <div key={tIndex} className="flex flex-col md:flex-row gap-4 items-start bg-black/20 border border-white/10 rounded-xl p-4">
                  <div className="w-full md:w-1/4">
                    <label className="block text-[10px] font-bold text-white/60 uppercase mb-1">React Icon Name</label>
                    <input type="text" value={tool.icon} onChange={e => updateTool(tIndex, 'icon', e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" placeholder="e.g. SiReact" />
                    <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-[10px] text-blue-400 mt-1 block hover:underline">Find icons</a>
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-[10px] font-bold text-white/60 uppercase mb-1">Tool Name</label>
                    <input type="text" value={tool.name} onChange={e => updateTool(tIndex, 'name', e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" placeholder="e.g. React.js" />
                  </div>
                  <div className="w-full md:flex-grow flex items-start gap-2">
                    <div className="flex-grow">
                      <label className="block text-[10px] font-bold text-white/60 uppercase mb-1">Short Description</label>
                      <input type="text" value={tool.description} onChange={e => updateTool(tIndex, 'description', e.target.value)} className="w-full bg-[#0F1535] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" placeholder="e.g. For building user interfaces" />
                    </div>
                    <button type="button" onClick={() => removeTool(tIndex)} className="mt-6 text-red-400/50 hover:text-red-400 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT FOOTER */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-10 mt-10 border-t border-white/10 gap-6">
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
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 !text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={18} /> {loading ? "Saving..." : "Save Course"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
