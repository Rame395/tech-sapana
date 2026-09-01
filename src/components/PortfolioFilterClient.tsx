"use client";

import { useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  category: string;
  technologies: string[];
  client: string | null;
  liveUrl: string | null;
};

export default function PortfolioFilterClient({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const tabs = [
    { id: "all", label: `All Projects (${projects.length})` },
    { id: "ecommerce", label: "🛒 E-Commerce & Retail" },
    { id: "hospitality", label: "🏨 Hospitality & Tourism" },
    { id: "management", label: "📊 Management Systems (ERP)" },
    { id: "health", label: "🏥 Healthcare & Medical" },
    { id: "ai", label: "🤖 AI & Automation" },
  ];

  return (
    <>
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-bg-primary/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm py-3 mb-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {filteredProjects.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500 dark:text-gray-400 font-bold bg-gray-50 dark:bg-[#0B1121] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                No projects found in this category.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white dark:bg-[#0B1121] border border-gray-200 dark:border-[#1E3A8A] rounded-2xl flex flex-col shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden group" 
                >
                  <div className="relative h-[300px] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img
                      src={project.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 dark:from-[#0B1121] via-gray-900/20 to-transparent"></div>
                    
                    {project.videoUrl && (
                      <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
                      </a>
                    )}

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-black/80 text-white border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md capitalize">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow relative z-10 bg-white dark:bg-[#0B1121]">
                    {project.client && (
                      <div className="text-blue-600 dark:text-blue-500 font-extrabold tracking-widest uppercase text-xs mb-2">
                        {project.client}
                      </div>
                    )}
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 leading-tight">{project.title}</h3>
                    <p className="text-gray-600 dark:text-[#94A3B8] text-base leading-relaxed mb-6 flex-grow">{project.description}</p>

                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-gray-100 dark:bg-[#0F172A] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 text-xs font-bold px-3 py-1.5 rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.liveUrl && (
                      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 font-bold hover:text-blue-800 dark:hover:text-blue-400 transition-colors">
                          <ExternalLink className="w-5 h-5" /> View Live Project
                        </a>
                      </div>
                    )}
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
