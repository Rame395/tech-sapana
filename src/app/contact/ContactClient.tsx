"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { type GlobalSettings } from "@prisma/client";

const regions = {
  nepal: {
    name: "Nepal Hub",
    flag: "🇳🇵",
    title: "Primary Development Lab",
    address: "Baluwatar, Kathmandu 44600, Nepal",
    phone: "+977 1-4000000",
    email: "contact@techsapana.com.np",
    whatsapp: "+9779800000000",
    hours: "Sun – Fri (9:00 AM – 6:00 PM NPT)",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.368369049448!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjIiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1650000000000!5m2!1sen!2snp"
  },
  usa: {
    name: "United States",
    flag: "🇺🇸",
    title: "US Client Relations",
    address: "123 Tech Avenue, San Francisco, CA 94105",
    phone: "+1 (555) 000-0000",
    email: "usa@techsapana.com",
    whatsapp: "10000000000",
    hours: "Mon – Fri (9:00 AM – 5:00 PM PST)",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284218395!2d-122.3975765!3d37.7904797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806203099955%3A0x6a0f673f8fb25875!2s123%20Tech%20Avenue%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
  },
  aus: {
    name: "Australia",
    flag: "🇦🇺",
    title: "APAC Consultation",
    address: "456 Innovation Drive, Sydney, NSW 2000",
    phone: "+61 2 0000 0000",
    email: "aus@techsapana.com",
    whatsapp: "61000000000",
    hours: "Mon – Fri (9:00 AM – 5:00 PM AEST)",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.42841311097!2d151.2069902!3d-33.8688197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401a8b0001%3A0x6b12ae401a8b0001!2sSydney%20NSW%202000%2C%20Australia!5e0!3m2!1sen!2sau!4v1650000000000!5m2!1sen!2sau"
  }
};

type RegionKey = keyof typeof regions;

export default function ContactClient({ globalSettings }: { globalSettings?: GlobalSettings | null }) {
  // Override Nepal hub with global settings if available
  const currentRegions = {
    ...regions,
    nepal: {
      ...regions.nepal,
      phone: globalSettings?.phone || regions.nepal.phone,
      address: globalSettings?.address || regions.nepal.address,
      email: globalSettings?.email || regions.nepal.email,
      hours: globalSettings?.operatingHours || regions.nepal.hours,
    }
  };

  const [activeRegion, setActiveRegion] = useState<RegionKey>("nepal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWaMenu, setShowWaMenu] = useState(false);

  const activeData = currentRegions[activeRegion];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {showWaMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl mb-4 overflow-hidden w-64"
            >
              <div className="px-4 py-3 bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-white/5 text-sm font-semibold text-gray-900 dark:text-white">
                Select Region WhatsApp
              </div>
              <div className="flex flex-col">
                {(Object.keys(currentRegions) as RegionKey[]).map((key) => (
                  <a
                    key={key}
                    href={`https://wa.me/${currentRegions[key].whatsapp}?text=Hello%20TechSapana%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
                    onClick={() => setShowWaMenu(false)}
                  >
                    <span className="text-xl">{currentRegions[key].flag}</span>
                    {currentRegions[key].name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowWaMenu(!showWaMenu)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/30"
          aria-label="Open WhatsApp Chat"
        >
          {showWaMenu ? <ChevronDown size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      <main className="min-h-screen bg-bg-primary text-text-main pt-[8.5rem] pb-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden h-[600px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-70"></div>
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
              GLOBAL INQUIRIES
            </div>
            <h1 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-[800] tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-6">
              Let’s Build Something <span className="text-blue-600 dark:text-blue-500">Meaningful.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Select your preferred region below to connect with our local engineering and consultation teams.
            </p>
          </div>

          {/* Region Toggle */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {(Object.keys(currentRegions) as RegionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveRegion(key)}
                className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeRegion === key
                    ? "text-white shadow-md"
                    : "bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A374A] border border-gray-200 dark:border-white/10"
                }`}
              >
                {activeRegion === key && (
                  <motion.div
                    layoutId="activeRegion"
                    className="absolute inset-0 bg-blue-600 dark:bg-blue-600 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="text-lg">{currentRegions[key].flag}</span>
                {currentRegions[key].name}
              </button>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            
            {/* Left: Contact Form */}
            <motion.div
              key={activeRegion + "-form"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-xl"
            >
              <h2 className="text-2xl font-[800] text-gray-900 dark:text-white mb-2 tracking-tight">
                Book Free Consultation
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                Direct scheduling with our {activeData.name} leadership.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name *</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Business Email *</label>
                    <input
                      type="email"
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                      placeholder={activeData.phone}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Service Required *</label>
                    <select className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow appearance-none">
                      <option className="text-gray-900">Website Development</option>
                      <option className="text-gray-900">Custom Software & ERP</option>
                      <option className="text-gray-900">AI Solutions & Automation</option>
                      <option className="text-gray-900">Training & Courses</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Project Scope & Requirements *</label>
                  <textarea
                    rows={4}
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow resize-none"
                    placeholder="Tell us what you're building..."
                    required
                  ></textarea>
                </div>

                {isSubmitted ? (
                  <div className="w-full py-4 px-6 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 rounded-xl font-semibold flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} />
                    Consultation Request Sent!
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 !text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-600/20"
                  >
                    {isSubmitting ? "Sending..." : "Confirm Free Consultation"}
                    {!isSubmitting && <Send size={18} />}
                  </button>
                )}
              </form>
            </motion.div>

            {/* Right: Office Info & Map */}
            <motion.div
              key={activeRegion + "-info"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-xl flex flex-col gap-6">
                <div>
                  <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3">
                    {activeData.flag} {activeData.title}
                  </div>
                  <h3 className="text-2xl font-[800] text-gray-900 dark:text-white tracking-tight">
                    {activeData.name} Office
                  </h3>
                </div>

                <div className="h-px w-full bg-gray-100 dark:bg-white/10"></div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">Address</div>
                      <div className="text-sm leading-relaxed">{activeData.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">Phone / WhatsApp</div>
                      <div className="text-sm">{activeData.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">Email Support</div>
                      <div className="text-sm">{activeData.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">Operating Hours</div>
                      <div className="text-sm">{activeData.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-[300px] md:h-[400px] bg-gray-200 dark:bg-[#1E293B] rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 relative">
                {/* Overlay to prevent scroll-trapping */}
                <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
                <iframe
                  src={activeData.mapSrc}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}
