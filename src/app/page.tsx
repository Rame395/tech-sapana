"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PromoBanner from "@/components/PromoBanner";
import MarqueeBanner from "@/components/MarqueeBanner";
import FaqSection from "@/components/FaqSection";
import { ShaderBackground } from "@/components/ui/hero-shader";
import FloatingTechIcons from "@/components/ui/FloatingTechIcons";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as any } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      badge: "📡 Live Systems",
      title: "Client Software & Web Engineering",
      subtitle: "Kathmandu Development Studio",
    },
    {
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
      badge: "🤝 Client Partners",
      title: "Architecture & UX Strategy Sessions",
      subtitle: "Serving Nepal, USA & Australia",
    },
    {
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      badge: "🏢 TechSapana HQ",
      title: "Engineering & AI Innovation Lab",
      subtitle: "High-Performance Dedicated Teams",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-main">
      {/* RESTORED HERO SECTION (WITH TIGHTER TYPOGRAPHY AND ANIMATED SHADER) */}
      <section className="relative min-h-[92vh] flex items-center pt-[6rem] pb-[3.5rem] overflow-hidden border-b border-border-subtle bg-[#0B1121]">
        {/* Animated Shader Background */}
        <ShaderBackground />
        
        {/* Floating Anti-Gravity Tech Icons */}
        <FloatingTechIcons />
        
        {/* Subtle Background Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at center top, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle at center top, black 30%, transparent 80%)",
          }}
        />

        <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center text-center lg:text-left">
            {/* Hero Left Content */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center lg:justify-start items-center gap-[0.75rem] mb-[1.25rem]">
                <span className="inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.1em] uppercase !text-blue-200 bg-blue-500/20 px-[0.9rem] py-[0.3rem] rounded-full border border-blue-400/30 backdrop-blur-md">
                  WEB • SOFTWARE • AI SOLUTIONS
                </span>
                <span className="text-[0.85rem] font-semibold !text-blue-200 tracking-tight">
                  Turning Dreams Into Digital Reality
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-[clamp(2.25rem,4vw,3.5rem)] font-[750] leading-[1.15] tracking-[-0.02em] mb-[1.25rem] !text-white drop-shadow-md">
                We Build Websites &amp; Software That Move Your Business Forward.
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-[1.05rem] md:text-[1.125rem] !text-gray-100 leading-[1.65] mb-[2.5rem] max-w-[560px] mx-auto lg:mx-0 drop-shadow-sm">
                From high-converting websites to custom enterprise platforms,
                TechSapana designs and delivers digital products engineered for
                real revenue growth.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center lg:justify-start items-center gap-[1rem]">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-[0.5rem] text-[0.9rem] font-bold px-[1.5rem] py-[0.8rem] rounded-md bg-blue-600 hover:bg-blue-500 !text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-[1px]"
                >
                  Start Your Project
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center gap-[0.5rem] text-[0.9rem] font-bold px-[1.5rem] py-[0.8rem] rounded-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 !text-white shadow-sm transition-all hover:-translate-y-[1px] backdrop-blur-md"
                >
                  Learn More About Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Right Visual Slider Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-bg-secondary border border-border-medium rounded-[20px] p-[0.85rem] shadow-[0_20px_50px_rgba(0,0,0,0.15),0_0_40px_rgba(0,82,204,0.12)] relative overflow-hidden"
            >
              <div className="absolute top-[1.25rem] right-[1.25rem] z-30 bg-[#07090E]/85 border border-border-medium backdrop-blur-[10px] px-[0.85rem] py-[0.4rem] rounded-full flex items-center gap-[0.45rem] text-[0.785rem] font-bold text-white shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_0_3px_rgba(16,185,129,0.25)]"></span>
                Web &amp; Software Engineers
              </div>

              <div className="relative rounded-[14px] overflow-hidden aspect-[4/3] bg-black">
                <div
                  className="flex w-full h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, idx) => (
                    <div key={idx} className="min-w-full h-full relative">
                      <Image
                        src={slide.img}
                        alt="Engineering team"
                        fill
                        className="object-cover"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#07090E]/20 to-[#07090E]/85 pointer-events-none"></div>

                      <div className="absolute bottom-[1.25rem] left-[1.25rem] right-[1.25rem] flex flex-col gap-[0.35rem] z-20">
                        <span className="self-start bg-[#0052CC]/85 backdrop-blur-[8px] text-white text-[0.725rem] font-extrabold uppercase tracking-[0.08em] px-[0.65rem] py-[0.25rem] rounded-full">
                          {slide.badge}
                        </span>
                        <div className="text-[1.05rem] font-bold text-white">
                          {slide.title}
                        </div>
                        <div className="text-[0.825rem] text-[#CBD5E1]">
                          {slide.subtitle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-[0.85rem] px-[0.5rem]">
                <div className="flex items-center gap-[0.5rem]">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-[4px] rounded-[2px] transition-all duration-300 ${
                        currentSlide === i ? "w-[42px] bg-brand-blue" : "w-[24px] bg-border-medium hover:bg-border-accent"
                      }`}
                    ></button>
                  ))}
                </div>
                <div className="flex items-center gap-[0.4rem]">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="w-[32px] h-[32px] rounded-full bg-bg-card border border-border-subtle hover:border-brand-blue hover:bg-brand-blue-soft text-text-main flex items-center justify-center transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="w-[32px] h-[32px] rounded-full bg-bg-card border border-border-subtle hover:border-brand-blue hover:bg-brand-blue-soft text-text-main flex items-center justify-center transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <MarqueeBanner />
      
      <div className="w-full max-w-[1240px] mx-auto px-6 mt-8">
        <PromoBanner />
      </div>

      {/* CLEANER METRICS SHOWCASE */}
      <section className="py-20 relative bg-bg-primary border-b border-border-subtle">
        <div className="w-full max-w-[1240px] mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { num: "50", sym: "+", title: "Projects Engineered", desc: "Custom web & software platforms" },
              { num: "30", sym: "+", title: "Businesses Empowered", desc: "SMEs and fast-scaling enterprises" },
              { num: "3", sym: "+", title: "Global Markets", desc: "Active engagements in NP, US & AU" },
              { num: "99.9", sym: "%", title: "Reliability", desc: "Continuous uptime & deployments" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative group overflow-hidden bg-white dark:bg-[#0B132B] border border-gray-200/80 dark:border-white/5 rounded-[1.5rem] p-8 flex flex-col justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative z-10 text-[3rem] font-[800] tracking-tighter mb-2 flex items-baseline justify-center gap-1 text-gray-900 dark:text-white">
                  {metric.num}
                  <span className="text-blue-600 dark:text-blue-500 text-[2.5rem]">{metric.sym}</span>
                </div>
                <div className="relative z-10 text-[1.1rem] font-bold text-gray-800 dark:text-gray-100 mb-2 tracking-tight">
                  {metric.title}
                </div>
                <div className="relative z-10 text-[0.9rem] font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-[90%] mx-auto">
                  {metric.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

          {/* BUILT IN NEPAL SECTION (UPGRADED) */}
      <section id="about" className="py-24 bg-bg-primary border-b border-border-subtle overflow-hidden">
        <div className="w-full max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[2.5rem] md:text-[3.25rem] font-[800] text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
                Built in Nepal.<br />
                <span className="text-blue-600 dark:text-blue-500">Thinking Globally.</span>
              </h2>
              <div className="flex flex-col gap-6 text-gray-600 dark:text-gray-300 text-[1.05rem] md:text-[1.125rem] mb-10 leading-[1.7]">
                <p>
                  TechSapana is a technology and software development company focused on transforming commercial concepts into reliable, high-performance digital products.
                </p>
                <p>
                  We combine human-centered UI/UX design with robust software engineering to help companies elevate their digital footprint while maintaining international delivery standards for clients across Australia, the USA, and worldwide.
                </p>
              </div>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-[2px]"
              >
                Let's discuss your project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-[1px] rounded-[2rem] bg-gradient-to-br from-gray-200 to-transparent dark:from-white/10 dark:to-transparent"
            >
              <div className="bg-white dark:bg-[#0B132B] rounded-[2rem] p-10 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                
                <h3 className="text-[1.5rem] font-bold text-gray-900 dark:text-white mb-8 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  Global Delivery Operations
                </h3>
                
                <ul className="flex flex-col gap-8 relative z-10">
                  <li className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <span className="text-blue-600 font-bold text-[0.8rem] group-hover:text-white transition-colors">NP</span>
                    </div>
                    <div>
                      <h4 className="text-[1.1rem] font-bold text-gray-900 dark:text-white mb-1.5">Kathmandu HQ</h4>
                      <p className="text-[0.95rem] text-gray-500 dark:text-gray-400 leading-relaxed">
                        Core engineering, design, and product management operations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50 group-hover:scale-110 transition-all duration-300 overflow-hidden relative">
                       <span className="text-xl relative z-10 group-hover:scale-125 transition-transform duration-300">🌍</span>
                    </div>
                    <div>
                      <h4 className="text-[1.1rem] font-bold text-gray-900 dark:text-white mb-1.5">International Standards</h4>
                      <p className="text-[0.95rem] text-gray-500 dark:text-gray-400 leading-relaxed">
                        Agile remote-first workflow aligning with US and Australian business hours.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLEAN COURSES SECTION */}
      <section id="courses" className="py-24 bg-bg-primary border-b border-border-subtle">
        <div className="w-full max-w-[1240px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4 tracking-tight">
              Learn Technology.<br/>Build the Future.
            </h2>
            <p className="text-lg text-text-muted">
              Practical courses designed to help students, professionals, and business owners use modern technology confidently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-card border border-border-subtle hover:border-brand-blue/40 rounded-3xl p-10 transition-colors group"
            >
              <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full mb-6">Online & Kathmandu</div>
              <h3 className="text-2xl font-bold text-text-main mb-4 tracking-tight group-hover:text-brand-blue transition-colors">
                AI for Life & Business
              </h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                Learn how to use modern AI tools for productivity, research, content, automation, and everyday business tasks with hands-on practice.
              </p>
              <Link href="/courses" className="font-semibold text-text-main hover:text-brand-blue transition-colors flex items-center gap-2">
                Explore Course →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-bg-card border border-border-subtle hover:border-brand-blue/40 rounded-3xl p-10 transition-colors group"
            >
              <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full mb-6">Hybrid Workshop</div>
              <h3 className="text-2xl font-bold text-text-main mb-4 tracking-tight group-hover:text-brand-blue transition-colors">
                Modern Web Development
              </h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                Hands-on frontend and backend training teaching you how to build, deploy, and scale modern web applications from scratch.
              </p>
              <Link href="/courses" className="font-semibold text-text-main hover:text-brand-blue transition-colors flex items-center gap-2">
                Explore Course →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <FaqSection />

      {/* FINAL CTA SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden bg-bg-primary">
        <div className="w-full max-w-[1240px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-blue rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Have a software idea?
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed font-medium">
                Tell us what you're building. We'll help you turn the idea into a practical, scalable digital product.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="mailto:contact@techsapana.com"
                  className="px-8 py-4 bg-white text-brand-blue rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  Start Your Project
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}