"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "STEP 1",
    title: "Discovery & Consultation",
    desc: "We trace your current business workflow bottlenecks and document explicit feature goals."
  },
  {
    step: "STEP 2",
    title: "Wireframing & Design",
    desc: "Our UX designers create interactive visual layout mockups matching your exact brand requirements."
  },
  {
    step: "STEP 3",
    title: "Development & QA",
    desc: "We write clean, modular software components and verify integration paths across devices."
  },
  {
    step: "STEP 4",
    title: "Launch & Support",
    desc: "We configure production servers, finalize SEO setups, and provide constant technical maintenance."
  }
];

export default function MethodologySection() {
  return (
    <section className="py-24 bg-bg-primary border-b border-border-subtle relative overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-[800] text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.2]">
            Our Development <span className="text-blue-600 dark:text-blue-500">Methodology</span>
          </h2>
          <p className="text-[1.05rem] md:text-[1.125rem] text-gray-600 dark:text-gray-400 leading-relaxed">
            A systematic operational framework ensuring projects are structured correctly and launched on schedule.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-blue-100 dark:bg-blue-900/30 transform md:-translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              // isEven (idx 0, Step 1) -> row-reverse (Content Right)
              // isOdd (idx 1, Step 2) -> row (Content Left)
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[28px] md:left-1/2 w-4 h-4 bg-white dark:bg-[#0B132B] border-4 border-blue-500 rounded-full transform -translate-x-1/2 z-10 mt-6 md:mt-0 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"></div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-[60px] md:pl-0 ${isEven ? "md:pl-16" : "md:pr-16"} mt-2 md:mt-0`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-white dark:bg-[#0B132B] border border-gray-200/80 dark:border-white/5 rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:border-blue-500/30 transition-colors"
                    >
                      <div className="text-blue-600 dark:text-blue-500 text-[0.75rem] font-bold tracking-widest uppercase mb-3">
                        {step.step}
                      </div>
                      <h3 className="text-[1.35rem] font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[0.95rem]">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
