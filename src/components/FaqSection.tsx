"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { getFaqs } from "@/app/actions/faq";

export default function FaqSection() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getFaqs(true).then(data => setFaqs(data));
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!mounted || !faqs || faqs.length === 0) return null;

  // Generate JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-24 bg-bg-primary border-t border-border-subtle relative z-10" id="faq">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-[#EBF4FF] dark:bg-[#0B132B] border border-[#BFDBFE] dark:border-[#1E3A8A] text-[#1D4ED8] dark:text-[#3B82F6] text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
            HAVE QUESTIONS?
          </div>
          <h2 className="text-[2rem] md:text-[2.75rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our services, methodologies, and technical stack.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? "bg-white dark:bg-[#0F172A] border-blue-200 dark:border-[#1E3A8A] shadow-lg dark:shadow-[0_10px_30px_rgba(37,99,235,0.1)]" 
                    : "bg-gray-50/50 dark:bg-[#0B1121]/50 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <h3 className={`font-bold text-lg transition-colors ${isOpen ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"}`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" : "bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-white/50"}`}>
                    {isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0 pb-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-[#94A3B8] leading-relaxed text-[1.05rem]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
