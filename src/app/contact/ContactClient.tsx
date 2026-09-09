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
            className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
              Connect With Us
            </div>
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-[800] tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-6">
              Let’s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Meaningful.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
              Ready to transform your ideas into reality? Our world-class engineering team is here to help you scale.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm">
              <a href={globalSettings?.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={globalSettings?.twitterUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" className="dark:fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={globalSettings?.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={globalSettings?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="url(#instagram-gradient-2)"><defs><linearGradient id="instagram-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433" /><stop offset="25%" stopColor="#e6683c" /><stop offset="50%" stopColor="#dc2743" /><stop offset="75%" stopColor="#cc2366" /><stop offset="100%" stopColor="#bc1888" /></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={globalSettings?.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href={globalSettings?.githubUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#181717" className="dark:fill-white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            </div>
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
