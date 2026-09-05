"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, ShieldCheck, Database, Cloud, 
  BarChart, Layers, Bot, Code, 
  CheckCircle2, X, ArrowRight,
  Server, Smartphone, Globe, Code2, Monitor, Cpu
} from "lucide-react";
import Link from "next/link";
import React from "react";

// Helper to resolve icon by string name from DB
const resolveIcon = (name: string | null) => {
  if (!name) return <Server size={20} />;
  switch (name.toLowerCase()) {
    case "database": return <Database size={20} />;
    case "cloud": return <Cloud size={20} />;
    case "barchart": return <BarChart size={20} />;
    case "layers": return <Layers size={20} />;
    case "bot": return <Bot size={20} />;
    case "code": return <Code size={20} />;
    case "code2": return <Code2 size={20} />;
    case "smartphone": return <Smartphone size={20} />;
    case "globe": return <Globe size={20} />;
    case "monitor": return <Monitor size={20} />;
    case "cpu": return <Cpu size={20} />;
    case "shieldcheck": return <ShieldCheck size={20} />;
    default: return <Server size={20} />;
  }
};

const defaultCapabilities = {
  dashboards: {
    id: "dashboards",
    title: "Enterprise Dashboards & Portals",
    icon: <BarChart size={20} />,
    desc: "Consolidate operations, live tracking, and user analytics into lightning-fast web apps. Built with role-based access control and high-frequency data refresh rates.",
    points: [
      "Role-based user permission matrices",
      "Sub-second data grid rendering & reporting",
      "Exportable PDF/Excel reporting modules"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
  },
  erp: {
    id: "erp",
    title: "Custom ERP & CRM Systems",
    icon: <Layers size={20} />,
    desc: "Move away from bloated, expensive enterprise software. We build tailored ERP systems that perfectly match your operational workflow without unnecessary overhead.",
    points: [
      "Inventory & supply chain tracking",
      "Custom sales pipelines & invoicing",
      "Secure employee management portals"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
  },
  automation: {
    id: "automation",
    title: "AI & Workflow Bridges",
    icon: <Bot size={20} />,
    desc: "Automate repetitive administrative tasks using custom AI integrations and API bridges that connect your disparate software systems.",
    points: [
      "OpenAI & LLM custom integrations",
      "Third-party API bridging (Stripe, Twilio, etc.)",
      "Automated data synchronization"
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  },
  cloud: {
    id: "cloud",
    title: "Cloud Infrastructure Setup",
    icon: <Cloud size={20} />,
    desc: "We deploy and manage scalable, highly-available cloud architectures on AWS, Google Cloud, and Vercel to ensure your app never goes down.",
    points: [
      "Docker containerization & Kubernetes",
      "Automated CI/CD deployment pipelines",
      "Global CDN edge caching"
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
  }
};

type Capability = {
  id: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  points: string[];
  image: string;
};

type DynamicService = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  iconName: string | null;
  points: string; // JSON string
};

export default function ServicesClient({ dynamicServices }: { dynamicServices: DynamicService[] }) {
  // Merge dynamic services into the default capabilities
  const mergedCapabilities: Record<string, Capability> = { ...defaultCapabilities };

  dynamicServices.forEach((service) => {
    let parsedPoints = [];
    try {
      parsedPoints = JSON.parse(service.points);
      if (!Array.isArray(parsedPoints)) parsedPoints = [service.points];
    } catch {
      parsedPoints = [service.points];
    }

    mergedCapabilities[service.id] = {
      id: service.id,
      title: service.title,
      icon: resolveIcon(service.iconName),
      desc: service.description,
      points: parsedPoints,
      image: service.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
    };
  });

  const capabilityKeys = Object.keys(mergedCapabilities);
  const [activeCap, setActiveCap] = useState<string>(capabilityKeys[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeData = mergedCapabilities[activeCap] || mergedCapabilities[capabilityKeys[0]];

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <main className="min-h-screen bg-bg-primary text-text-main pt-[8.5rem] pb-24 overflow-hidden">
        
        {/* ==========================================================================
            HERO SECTION
            ========================================================================== */}
        <section className="relative pb-24 border-b border-gray-200 dark:border-white/10">
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden h-[600px]">
            <div className="absolute top-0 right-0 w-full max-w-[800px] h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-70"></div>
          </div>

          <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
                  CORE ENGINEERING SERVICE
                </div>
                <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-[800] tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-6">
                  Custom Software That <span className="text-blue-600 dark:text-blue-500">Fits Your Workflow.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                  No bloated off-the-shelf templates. We engineer secure web applications, automated ERP systems, and management portals tailored precisely around how your business functions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 !text-white font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
                  >
                    Scope Your Software <Code size={18} />
                  </button>
                  <a 
                    href="#capabilities" 
                    className="px-8 py-4 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#2A374A] text-gray-900 dark:text-white font-bold transition-all flex items-center gap-2"
                  >
                    Explore Capabilities
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="bg-gray-50 dark:bg-black/40 border-b border-gray-200 dark:border-white/5 px-4 py-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-gray-500 bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full">
                    https://app.yourcompany.com
                  </div>
                  <div className="w-10"></div>
                </div>
                <div className="relative h-[300px] sm:h-[400px]">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
                    alt="Custom software dashboard preview"
                    className="absolute inset-0 w-full h-full object-cover object-left-top opacity-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-end">
                    <div className="text-white text-xs font-mono font-semibold flex flex-col gap-1">
                      <span className="flex items-center gap-2"><Terminal size={14} className="text-green-400"/> STATUS: 200 OK</span>
                      <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-blue-400"/> SECURE SSL</span>
                    </div>
                    <div className="text-green-400 text-xs font-bold flex items-center gap-2 bg-green-900/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-500/30">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Live System Active
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================================================
            INTERACTIVE CAPABILITIES
            ========================================================================== */}
        <section className="pt-24 pb-24 relative" id="capabilities">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
                ENGINEERING MODULES
              </div>
              <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-6">
                What We Can Build <span className="text-blue-600 dark:text-blue-500">For You.</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Click through our core development modules below to inspect our technical delivery focus.
              </p>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {capabilityKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCap(key)}
                  className={`relative px-5 py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                    activeCap === key
                      ? "text-blue-700 dark:text-blue-400 shadow-sm"
                      : "bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A374A] border border-gray-200 dark:border-white/10"
                  }`}
                >
                  {activeCap === key && (
                    <motion.div
                      layoutId="activeCapBg"
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={activeCap === key ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}>
                    {mergedCapabilities[key].icon}
                  </span>
                  {mergedCapabilities[key].title.split(" ")[0]} {mergedCapabilities[key].title.split(" ")[1]}
                </button>
              ))}
            </div>

            {/* Display Board */}
            <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCap}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2"
                >
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-800 shadow-sm">
                      {activeData.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-[800] text-gray-900 dark:text-white mb-4 tracking-tight">
                      {activeData.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                      {activeData.desc}
                    </p>
                    <div className="flex flex-col gap-4">
                      {activeData.points.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-blue-600 dark:text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-[300px] lg:min-h-full border-l border-gray-200 dark:border-white/10">
                    <img 
                      src={activeData.image} 
                      alt={activeData.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#0F172A] via-transparent to-transparent w-16"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ==========================================================================
            ENTERPRISE SECURITY
            ========================================================================== */}
        <section className="py-24 bg-gray-50 dark:bg-[#0B1121] border-y border-gray-200 dark:border-white/10">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 h-[400px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80"
                  alt="Secure Server Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center justify-between">
                     <div className="flex items-center gap-3 text-white">
                        <Database size={20} className="text-blue-400"/>
                        <span className="font-mono text-sm font-bold">DB_ENCRYPTED</span>
                     </div>
                     <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                   </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
                  ENTERPRISE SECURITY
                </div>
                <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-6">
                  Engineered for Scale & Absolute <span className="text-blue-600 dark:text-blue-500">Security.</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                  We architect bulletproof backends and database systems with encrypted data-at-rest, automated backups, and rigorous API rate-limiting to protect your commercial data.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Node.js & Python", "PostgreSQL", "AWS / Cloudflare", "OAuth 2.0 Security"].map((tech) => (
                    <span key={tech} className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================================================
            FINAL CTA
            ========================================================================== */}
        <section className="pt-32 pb-10">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 rounded-[2.5rem] p-12 md:p-20 text-center shadow-[0_20px_80px_rgba(37,99,235,0.25)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] tracking-tight leading-[1.2] text-white mb-6">
                  Have a Complex <span className="text-blue-400">Software Requirement?</span>
                </h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed font-medium">
                  Let’s discuss your technical scope, database architecture, and project timeline with our engineering leads.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 rounded-xl bg-white text-blue-700 hover:bg-gray-50 font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Request Software Scoping <ArrowRight size={18} />
                  </button>
                  <a 
                    href="https://wa.me/9779800000000" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl bg-blue-800/40 border border-blue-400/30 hover:bg-blue-800/60 !text-white font-bold transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                  >
                    Talk via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================================================
          MODAL
          ========================================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 z-10"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Code className="text-blue-600" />
                  Custom Software Scoping
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Inquiry Received</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you! Our engineering lead will reach out within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleModalSubmit} className="flex flex-col gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Business Email *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@company.com"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Software Requirement *</label>
                      <textarea 
                        rows={4} 
                        required 
                        placeholder="Describe your software requirement or workflow..."
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 !text-white rounded-xl font-bold transition-all disabled:opacity-70 mt-2 shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Scoping Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
