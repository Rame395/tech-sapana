"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Check, Video } from "lucide-react";

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  imageUrl: string | null;
  badgeText1: string | null;
  badge1Style: string | null;
  badgeText2: string | null;
  startDateText: string | null;
  scheduleText: string | null;
  highlights: string[];
};

export default function CourseFilterClient({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const getBadge1Classes = (style?: string | null) => {
    switch (style) {
      case "gold":
        return "bg-amber-100 text-amber-700 dark:bg-[#2F2207] dark:text-[#FBBF24] border border-amber-200 dark:border-[#5C430B]";
      case "blue":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
      case "red":
      default:
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-800";
    }
  };

  const getFilteredCourses = () => {
    if (activeTab === "all") return courses;
    if (activeTab === "this-week") return courses.filter(c => c.badge1Style === "red");
    if (activeTab === "top-picks") return courses.filter(c => c.badge1Style === "gold");
    if (activeTab === "upcoming") return courses.filter(c => c.badge1Style === "blue");
    
    // Keyword based for the others since there is no category field yet
    if (activeTab === "ai") return courses.filter(c => c.title.toLowerCase().includes("ai") || c.title.toLowerCase().includes("data"));
    if (activeTab === "dev") return courses.filter(c => c.title.toLowerCase().includes("engineering") || c.title.toLowerCase().includes("stack") || c.title.toLowerCase().includes("web"));
    if (activeTab === "design") return courses.filter(c => c.title.toLowerCase().includes("design") || c.title.toLowerCase().includes("ui") || c.title.toLowerCase().includes("ux"));
    
    return courses;
  };

  const filteredCourses = getFilteredCourses();

  const tabs = [
    { id: "all", label: `All Programs (${courses.length})` },
    { id: "this-week", label: "⚡ Starting This Week" },
    { id: "top-picks", label: "⭐ Top Picks" },
    { id: "upcoming", label: "📅 Upcoming Cohorts" },
    { id: "ai", label: "Applied AI & Automation" },
    { id: "dev", label: "Software & Web Engineering" },
    { id: "design", label: "UI/UX & Product Design" },
  ];

  return (
    <>
      {/* BEAUTIFIED FILTER STRIP */}
      <div className="sticky top-[80px] z-40 bg-white/80 dark:bg-bg-primary/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm py-3 mb-12">
        <div className="w-full max-w-[1240px] mx-auto px-6">
          <div className="flex overflow-x-auto gap-3 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border-transparent"
                    : "bg-gray-100 dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 border border-transparent hover:border-gray-300 dark:hover:border-blue-800 hover:text-gray-900 dark:hover:text-blue-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-spacing pb-24">
        <div className="w-full max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all" id="courseGrid">
            {filteredCourses.length === 0 ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-gray-500 dark:text-gray-400 font-bold bg-gray-50 dark:bg-[#0B1121] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                No courses found in this category.
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white dark:bg-[#0B1121] border border-blue-200 dark:border-[#1E3A8A] rounded-2xl flex flex-col shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group" 
                >
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img
                      src={course.imageUrl || "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=700&q=80"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 dark:from-[#0B1121] via-gray-900/20 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      {course.badgeText1 ? (
                        <span className={`text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md flex items-center gap-1.5 ${getBadge1Classes(course.badge1Style)}`}>
                          {course.badge1Style === "gold" && (
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                          )}
                          {course.badgeText1.replace("⭐ ", "")}
                        </span>
                      ) : <span></span>}
                      {course.badgeText2 && (
                        <span className="bg-black/80 text-white border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                          {course.badgeText2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative z-10 bg-white dark:bg-[#0B1121]">
                    <h3 className="text-[1.35rem] font-extrabold text-gray-900 dark:text-white mb-2.5 leading-[1.3]">{course.title}</h3>
                    <p className="text-gray-600 dark:text-[#94A3B8] text-[0.9rem] leading-[1.6] mb-6">{course.description}</p>

                    <div className="bg-blue-50/80 dark:bg-[#0F172A] border border-blue-200 dark:border-[#1E3A8A] rounded-xl p-4 space-y-3 mb-5">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="text-blue-600 dark:text-blue-500 w-4 h-4 flex-shrink-0" />
                        <span className="font-bold text-gray-900 dark:text-white">{course.startDateText || "TBD"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="text-blue-600 dark:text-blue-500 w-4 h-4 flex-shrink-0" />
                        <span className="font-bold text-gray-900 dark:text-white">{course.scheduleText || "TBD"}</span>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-gray-200 dark:border-white/10 mb-5"></div>

                    <div className="space-y-3.5 mb-8">
                      {course.highlights?.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-[0.85rem]">
                          <Check className="text-blue-600 dark:text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={3} />
                          <span className="font-semibold text-gray-700 dark:text-white leading-tight">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-white/5 rounded-xl p-4 flex justify-between items-center mb-5">
                        <div>
                          <div className="text-[0.7rem] font-bold text-gray-500 dark:text-[#64748B] uppercase tracking-widest mb-1">Program Tuition</div>
                          {course.originalPrice && (
                            <div className="text-sm font-semibold text-gray-400 dark:text-[#64748B] line-through">
                              NPR {course.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <div className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
                          NPR {course.price.toLocaleString()} <span className="text-blue-600 dark:text-blue-500 text-sm font-bold">/ cohort</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-green-200 dark:border-[#064E3B] bg-green-50 dark:bg-[#022C22] hover:bg-green-100 dark:hover:bg-[#064E3B] text-green-700 dark:text-[#34D399] font-bold py-3.5 rounded-xl transition-colors text-[0.95rem]">
                          <Video className="w-[1.15rem] h-[1.15rem]" /> Meet Link
                        </a>
                        <Link href={`/courses/${course.slug}`} className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 !text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-blue-600/30 text-[0.95rem]">
                          Enroll Cohort
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
