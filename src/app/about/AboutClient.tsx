"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type LeadershipProfile = {
  id: string;
  name: string;
  role: string;
  quoteHeading: string;
  quoteBody: string;
  image: string | null;
};

type TeamMember = {
  id: string;
  name: string;
  badge: string;
  description: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const methodologyStages = [
  {
    id: 1,
    tag: "STAGE 01 OF 05",
    title: "Discover & Understand",
    desc: "Before choosing tools or writing code, we analyze your commercial model, customer pain points, workflows, and exact conversion goals.",
    points: [
      "In-depth stakeholder & workflow interview",
      "User journey mapping & functional scope lock",
      "Measurable success metrics & timeline lock"
    ]
  },
  {
    id: 2,
    tag: "STAGE 02 OF 05",
    title: "Wireframing & UI Design",
    desc: "We translate your business goals into intuitive user flows and high-fidelity interfaces that your customers will actually love using.",
    points: [
      "Low-fidelity structural wireframing",
      "High-fidelity UI/UX design & prototyping",
      "Design system & component library creation"
    ]
  },
  {
    id: 3,
    tag: "STAGE 03 OF 05",
    title: "Engineering & Development",
    desc: "Our engineers build your product using modern, scalable architectures designed for speed, security, and long-term maintainability.",
    points: [
      "Frontend & Backend agile development",
      "API integrations & database architecture",
      "Continuous testing & code review"
    ]
  },
  {
    id: 4,
    tag: "STAGE 04 OF 05",
    title: "QA & Launch",
    desc: "We rigorously test every feature across devices and environments before deploying your product safely to the live servers.",
    points: [
      "Cross-device & performance testing",
      "Security audit & vulnerability checks",
      "Zero-downtime production deployment"
    ]
  },
  {
    id: 5,
    tag: "STAGE 05 OF 05",
    title: "Growth & Maintenance",
    desc: "We don't disappear after launch. We provide ongoing support, monitor performance, and iterate based on real user feedback.",
    points: [
      "Server monitoring & uptime management",
      "Iterative feature development",
      "Ongoing technical support & maintenance"
    ]
  }
];

export default function AboutClient({ 
  leadershipProfile, 
  teamMembers,
  stats = []
}: { 
  leadershipProfile: LeadershipProfile;
  teamMembers: TeamMember[];
  stats?: any[];
}) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-[#0B1121] text-gray-900 dark:text-white pb-20 overflow-hidden">
        {/* ==========================================================================
       1. HERO SECTION (CLEAN + MOTION)
       ========================================================================== */}
        <section className="pt-[7.5rem] md:pt-[10rem] pb-20 relative border-b border-gray-200 dark:border-white/10">
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(circle at center top, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center top, black 30%, transparent 80%)",
          }}></div>
          
          <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp} className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
                  ABOUT TECHSAPANA
                </motion.div>
                <motion.h1 variants={fadeInUp} className="text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-[800] tracking-tight leading-[1.15] text-gray-900 dark:text-white mb-6">
                  We Engineer Websites & Software That <span className="text-blue-700 dark:text-blue-500">Actually Perform.</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                  We don't just write code. We diagnose commercial bottlenecks,
                  understand workflows, and engineer high-impact digital
                  products for Nepal, the USA, and Australia.
                </motion.p>
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 !text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                    Start Your Project
                  </Link>
                  <a href="#why-us" className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold py-3.5 px-8 rounded-xl transition-colors border border-transparent dark:border-white/10">
                    Why TechSapana
                  </a>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden flex flex-col h-full"
              >
                <div className="bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-white/5 px-6 py-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  </div>
                  <div className="text-xs font-bold text-green-700 dark:text-green-400 flex items-center gap-2 bg-green-100 dark:bg-green-500/10 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> System Status: Active
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 text-center">
                        <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}<span className="text-blue-600">{stat.symbol}</span></div>
                        <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.title}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto bg-gray-900 dark:bg-black/50 text-gray-300 font-mono text-sm p-4 rounded-xl border border-gray-800 dark:border-white/10 flex justify-between items-center">
                    <code>git checkout production && npm run deploy</code>
                    <span className="text-green-400 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Live</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       2. WHY TECHSAPANA (CLEAN + MOTION)
       ========================================================================== */}
        <section className="py-24 relative" id="why-us">
          <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left mb-12"
            >
              <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
                WHY TECHSAPANA
              </div>
              <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-6">
                A Technology Partner, Not Just a <span className="text-blue-600 dark:text-blue-500">Development Agency.</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                When you work with TechSapana, you're not simply handing a
                project to a developer and waiting for the final delivery. We
                understand the business behind your technology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-stretch">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] lg:h-auto"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="TechSapana software engineers collaborating"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <div className="text-white font-bold text-xl mb-1">Engineering Lab</div>
                    <div className="text-blue-400 text-xs font-bold tracking-widest uppercase">KATHMANDU • GLOBAL REACH</div>
                  </div>
                  <div className="bg-blue-600 !text-white font-black text-xl w-12 h-12 rounded-xl flex items-center justify-center">TS</div>
                </div>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-2 lg:gap-3 justify-between"
              >
                {[
                  { tag: "01", title: "Business Understanding", desc: "We focus on what your business actually needs to operate and scale, not just what technology can do." },
                  { tag: "02", title: "Modern Development", desc: "We use modern tools, frameworks, and development practices to build reliable, high-speed digital products." },
                  { tag: "03", title: "Clear Communication", desc: "You stay informed throughout the project, with defined milestones, weekly demos, and transparent progress." },
                  { tag: "04", title: "Practical Solutions", desc: "We avoid unnecessary complexity and focus on clean solutions that create real, measurable business value." },
                  { tag: "05", title: "Long-Term Thinking & Nepal to the World", desc: "We build with the future in mind, engineering software from Nepal with the quality expected by international clients." },
                ].map((point, idx) => (
                  <motion.div variants={fadeInUp} key={idx} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl p-3 md:p-4 flex gap-3 md:gap-4 items-start hover:border-blue-200 dark:hover:border-blue-500/50 transition-colors group">
                    <span className="text-xl md:text-2xl font-black text-gray-200 dark:text-white/10 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors mt-0.5">{point.tag}</span>
                    <div>
                      <h4 className="text-base font-extrabold text-gray-900 dark:text-white mb-0.5">{point.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-snug">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       3. OUR METHODOLOGY (CLEAN + MOTION)
       ========================================================================== */}
        <section className="py-24 bg-gray-50 dark:bg-black/20 border-y border-gray-200 dark:border-white/5" id="approach">
          <div className="w-full max-w-[1240px] mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
                OUR METHODOLOGY
              </div>
              <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-6">
                From Idea to <span className="text-blue-600 dark:text-blue-500">Reality.</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
                A proven 5-step roadmap built to ensure zero surprises and
                measurable business results.
              </p>
            </motion.div>

            <div className="flex overflow-x-auto gap-3 pb-4 justify-start md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-8">
              {["Discover", "Design", "Develop", "Launch", "Grow"].map((step, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveStage(idx)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 ${
                    activeStage === idx 
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border-transparent"
                      : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  0{idx + 1} — {step}
                </button>
              ))}
            </div>

            <motion.div 
              key={activeStage}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-white/5 border border-blue-100 dark:border-white/10 rounded-3xl p-8 md:p-12 text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-xl"
            >
              <div>
                <div className="text-blue-600 dark:text-blue-400 font-extrabold tracking-widest uppercase text-sm mb-3">
                  {methodologyStages[activeStage].tag}
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  {methodologyStages[activeStage].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {methodologyStages[activeStage].desc}
                </p>
              </div>

              <div className="space-y-4">
                {methodologyStages[activeStage].points.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg shrink-0 mt-1">
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-[1.05rem] leading-tight pt-1">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================================================
       4. COMPACT CEO SPOTLIGHT (CLEAN + MOTION)
       ========================================================================== */}
        <section className="py-24" id="leadership">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.5fr] shadow-xl dark:shadow-2xl relative"
            >
              <div className="h-[300px] md:h-auto relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {leadershipProfile.image ? (
                  <Image
                    src={leadershipProfile.image}
                    alt={leadershipProfile.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 dark:text-gray-600 font-medium">Image Placeholder</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white dark:from-[#0F172A] via-white/80 dark:via-[#0F172A]/60 to-transparent"></div>
              </div>

              <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
                <div className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 w-fit">Leadership Vision</div>
                <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] text-gray-900 dark:text-white tracking-tight leading-[1.2] mb-6 uppercase">
                  {leadershipProfile.quoteHeading.split(" ").slice(0, -2).join(" ")} <span className="text-blue-600 dark:text-blue-400">{leadershipProfile.quoteHeading.split(" ").slice(-2).join(" ")}</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg italic leading-relaxed mb-8">
                  {leadershipProfile.quoteBody}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-200 dark:border-white/10 pt-6">
                  <div>
                    <div className="text-gray-900 dark:text-white font-black text-xl mb-1 uppercase">{leadershipProfile.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest">{leadershipProfile.role}</div>
                  </div>
                  <Link href="/contact" className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 !text-white dark:!text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors shadow-lg text-center">
                    Talk to Our Team
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================================================
       5. CORE TEAM STREAM (CLEAN + MOTION)
       ========================================================================== */}
        <section className="py-24 bg-gray-50 dark:bg-black/20 border-t border-gray-200 dark:border-white/5" id="team">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
                OUR TEAM
              </div>
              <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-6">The <span className="text-blue-600 dark:text-blue-500">Builders.</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Direct access to dedicated software architects, UX designers,
                and technology professionals.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, idx) => (
                <motion.div 
                  variants={fadeInUp}
                  key={member.id} 
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <div className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-colors text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-6">
                    {member.badge}
                  </div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-3">{member.name}</div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================================================
       6. FINAL CONVERSION CTA (CLEAN + MOTION)
       ========================================================================== */}
      <section id="contact" className="py-24 relative overflow-hidden bg-white dark:bg-bg-primary">
        <div className="w-full max-w-[1000px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 dark:from-transparent dark:to-transparent dark:bg-[#0A132B] dark:border-blue-900/30 rounded-[2rem] p-12 md:p-16 text-center shadow-xl dark:shadow-2xl relative overflow-hidden"
          >
            {/* Soft Radial Glow (Dark Mode Only) */}
            <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-[1.75rem] md:text-[2.25rem] font-[800] text-gray-900 dark:text-white mb-4 tracking-tight">
                Have a Complex Software Requirement?
              </h2>
              <p className="text-gray-600 dark:text-[#94A3B8] text-base md:text-lg mb-10 leading-relaxed font-medium">
                Let's discuss your technical scope, database architecture, and project timeline with our engineering leads.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="mailto:contact@techsapana.com"
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 !text-white rounded-xl font-semibold text-sm md:text-base shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20 transition-all duration-300"
                >
                  Request Software Scoping
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 !text-white dark:bg-[#121B2F] dark:hover:bg-[#1A2642] border border-transparent dark:border-white/5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300"
                >
                  Talk via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </>
  );
}
