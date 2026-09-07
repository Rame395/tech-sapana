"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, User, Briefcase, FileText } from "lucide-react";
import { type GlobalSettings } from "@prisma/client";

export default function ContactClient({ globalSettings }: { globalSettings?: GlobalSettings | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fallback data if DB settings are empty
  const contactInfo = {
    address: globalSettings?.address || "Baluwatar, Kathmandu 44600, Nepal",
    phone: globalSettings?.phone || "+977 1-4000000",
    email: globalSettings?.email || "contact@techsapana.com",
    hours: globalSettings?.operatingHours || "Sun – Fri (9:00 AM – 6:00 PM NPT)",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.368369049448!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjIiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1650000000000!5m2!1sen!2snp",
    whatsapp: globalSettings?.phone?.replace(/[^0-9]/g, '') || "9779800000000"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const infoCards = [
    { icon: <MapPin size={24} />, title: "Visit Us", content: contactInfo.address },
    { icon: <Phone size={24} />, title: "Call Us", content: contactInfo.phone },
    { icon: <Mail size={24} />, title: "Email Us", content: contactInfo.email },
    { icon: <Clock size={24} />, title: "Operating Hours", content: contactInfo.hours },
  ];

  return (
    <>
      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20TechSapana%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all duration-300"
          aria-label="Open WhatsApp Chat"
        >
          <MessageCircle size={32} />
        </a>
      </div>

      <main className="min-h-screen bg-bg-primary text-text-main pt-[8.5rem] pb-24 relative overflow-hidden">
        {/* Glow Effects (Light mode friendly opacity) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
              Connect With Us
            </div>
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-[800] tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-6">
              Let’s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Meaningful.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Our world-class engineering team is here to help you scale.
            </p>
          </motion.div>

          {/* 4 Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {infoCards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#1E293B] shadow-md dark:shadow-none transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{card.title}</h3>
                <p className="text-gray-900 dark:text-white font-medium">{card.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16 items-start">
            
            {/* Left: Premium Contact Form (Takes 3 columns) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden"
            >
              {/* Form subtle inner glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

              <h2 className="text-3xl font-[800] text-gray-900 dark:text-white mb-2 tracking-tight">
                Send a Message
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Ramesh Shahi"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email Input */}
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="ramesh@company.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Input */}
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="+977 9800000000"
                        required
                      />
                    </div>
                  </div>

                  {/* Service Select */}
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Interested In</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                        <Briefcase size={18} />
                      </div>
                      <select className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer">
                        <option className="text-gray-900">Website Development</option>
                        <option className="text-gray-900">Custom Software & ERP</option>
                        <option className="text-gray-900">AI Solutions & Automation</option>
                        <option className="text-gray-900">Training & Courses</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Project Details</label>
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-gray-400 dark:text-gray-500">
                      <FileText size={18} />
                    </div>
                    <textarea
                      rows={5}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="Tell us about your goals, timeline, and budget..."
                      required
                    ></textarea>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full py-4 px-6 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 rounded-xl font-semibold flex items-center justify-center gap-2 mt-4"
                  >
                    <CheckCircle2 size={20} />
                    Message Sent Successfully!
                  </motion.div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold tracking-wide shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-70 group"
                  >
                    {isSubmitting ? "Processing..." : "Send Message"}
                    {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                )}
              </form>
            </motion.div>

            {/* Right: Map (Takes 2 columns) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2 flex flex-col gap-8 h-full"
            >
              <div className="w-full h-[400px] lg:h-full min-h-[500px] bg-gray-200 dark:bg-[#1E293B] rounded-[2rem] overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 relative p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-gray-100 dark:bg-black/20">
                  {/* Overlay to prevent scroll-trapping */}
                  <div className="absolute inset-0 z-10 pointer-events-none rounded-[1.5rem] ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
                  <iframe
                    src={contactInfo.mapSrc}
                    className="w-full h-full border-0 dark:filter dark:grayscale dark:invert dark:contrast-125 dark:opacity-80 dark:mix-blend-screen"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}
