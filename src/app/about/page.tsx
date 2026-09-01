import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <>
      <main className="min-h-screen bg-bg-primary text-text-main pb-20">
        {/* ==========================================================================
       1. HERO SECTION
       ========================================================================== */}
        <section className="pt-[7.5rem] md:pt-[9rem] pb-16 relative border-b border-gray-200 dark:border-white/10">
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: "linear-gradient(to right, var(--color-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid-line) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(circle at center top, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center top, black 30%, transparent 80%)",
          }}></div>
          
          <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center bg-[#EBF4FF] dark:bg-[#0B132B] border border-[#BFDBFE] dark:border-[#1E3A8A] text-[#1D4ED8] dark:text-[#3B82F6] text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
                  ABOUT TECHSAPANA
                </div>
                <h1 className="text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-[800] tracking-tight leading-[1.15] text-gray-900 dark:text-white mb-6">
                  We Engineer Websites & Software That <span className="text-[#0052CC] dark:text-[#0052CC]">Actually Perform.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-[#94A3B8] leading-relaxed mb-8 max-w-xl">
                  We don't just write code. We diagnose commercial bottlenecks,
                  understand workflows, and engineer high-impact digital
                  products for Nepal, the USA, and Australia.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                    Start Your Project
                  </button>
                  <a href="#why-us" className="bg-gray-100 hover:bg-gray-200 dark:bg-[#0F172A] dark:hover:bg-[#1E293B] text-gray-900 dark:text-white font-bold py-3.5 px-8 rounded-xl transition-colors border border-transparent dark:border-white/10">
                    Why TechSapana
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0B1121] border border-blue-200 dark:border-[#1E3A8A] rounded-2xl shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-full">
                <div className="bg-gray-50 dark:bg-[#0F172A] border-b border-gray-200 dark:border-[#1E3A8A] px-6 py-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  </div>
                  <div className="text-xs font-bold text-green-600 dark:text-[#34D399] flex items-center gap-2 bg-green-100 dark:bg-[#064E3B] px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> System Status: Active
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-[#0B1536] p-4 rounded-xl border border-gray-100 dark:border-[#1E3A8A]/50 text-center">
                      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">5<span className="text-blue-600">+</span></div>
                      <div className="text-xs font-bold text-gray-500 dark:text-[#94A3B8] uppercase tracking-wider">Years Operating</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0B1536] p-4 rounded-xl border border-gray-100 dark:border-[#1E3A8A]/50 text-center">
                      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">100<span className="text-blue-600">+</span></div>
                      <div className="text-xs font-bold text-gray-500 dark:text-[#94A3B8] uppercase tracking-wider">Audited Projects</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0B1536] p-4 rounded-xl border border-gray-100 dark:border-[#1E3A8A]/50 text-center">
                      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">3<span className="text-blue-600">+</span></div>
                      <div className="text-xs font-bold text-gray-500 dark:text-[#94A3B8] uppercase tracking-wider">Core Markets</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0B1536] p-4 rounded-xl border border-gray-100 dark:border-[#1E3A8A]/50 text-center">
                      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">99.9<span className="text-blue-600">%</span></div>
                      <div className="text-xs font-bold text-gray-500 dark:text-[#94A3B8] uppercase tracking-wider">Reliability Rate</div>
                    </div>
                  </div>

                  <div className="mt-auto bg-gray-900 dark:bg-[#020617] text-gray-300 font-mono text-sm p-4 rounded-xl border border-gray-700 dark:border-white/10 flex justify-between items-center">
                    <code>git checkout production && npm run deploy</code>
                    <span className="text-green-400 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       2. WHY TECHSAPANA (EQUAL HEIGHT: LEFT IMAGE = RIGHT 5 POINTS)
       ========================================================================== */}
        <section className="py-24" id="why-us">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="text-center md:text-left mb-12">
              <div className="inline-flex items-center justify-center bg-[#EBF4FF] dark:bg-[#0B132B] border border-[#BFDBFE] dark:border-[#1E3A8A] text-[#1D4ED8] dark:text-[#3B82F6] text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
                WHY TECHSAPANA
              </div>
              <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-4">
                A Technology Partner, Not Just a Development Vendor.
              </h2>
              <p className="text-lg text-gray-600 dark:text-[#94A3B8] max-w-3xl leading-relaxed">
                When you work with TechSapana, you're not simply handing a
                project to a developer and waiting for the final delivery. We
                understand the business behind your technology.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
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
                  <div className="bg-blue-600 text-white font-black text-xl w-12 h-12 rounded-xl flex items-center justify-center">TS</div>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-between">
                {[
                  { tag: "01", title: "Business Understanding", desc: "We focus on what your business actually needs to operate and scale, not just what technology can do." },
                  { tag: "02", title: "Modern Development", desc: "We use modern tools, frameworks, and development practices to build reliable, high-speed digital products." },
                  { tag: "03", title: "Clear Communication", desc: "You stay informed throughout the project, with defined milestones, weekly demos, and transparent progress." },
                  { tag: "04", title: "Practical Solutions", desc: "We avoid unnecessary complexity and focus on clean solutions that create real, measurable business value." },
                  { tag: "05", title: "Long-Term Thinking & Nepal to the World", desc: "We build with the future in mind, engineering software from Nepal with the quality expected by international clients." },
                ].map((point, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0B1121] border border-gray-100 dark:border-white/5 rounded-xl p-5 flex gap-5 items-start hover:border-blue-200 dark:hover:border-[#1E3A8A] transition-colors group">
                    <span className="text-2xl font-black text-gray-200 dark:text-white/10 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">{point.tag}</span>
                    <div>
                      <h4 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1">{point.title}</h4>
                      <p className="text-gray-600 dark:text-[#94A3B8] text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       3. OUR METHODOLOGY (FAST TABS)
       ========================================================================== */}
        <section className="py-24 bg-gray-50 dark:bg-[#0B1121] border-y border-gray-200 dark:border-white/10" id="approach">
          <div className="w-full max-w-[1240px] mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center bg-[#EBF4FF] dark:bg-[#0B132B] border border-[#BFDBFE] dark:border-[#1E3A8A] text-[#1D4ED8] dark:text-[#3B82F6] text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
              OUR METHODOLOGY
            </div>
            <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-4">
              From Idea to Reality.
            </h2>
            <p className="text-lg text-gray-600 dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-12">
              A proven 5-step roadmap built to ensure zero surprises and
              measurable business results.
            </p>

            <div className="flex overflow-x-auto gap-3 pb-4 justify-start md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-8">
              <button className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border-transparent">
                01 — Discover
              </button>
              <button className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 bg-white dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-transparent hover:border-gray-300 dark:hover:border-blue-800 hover:text-gray-900 dark:hover:text-blue-400">
                02 — Design
              </button>
              <button className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 bg-white dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-transparent hover:border-gray-300 dark:hover:border-blue-800 hover:text-gray-900 dark:hover:text-blue-400">
                03 — Develop
              </button>
              <button className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 bg-white dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-transparent hover:border-gray-300 dark:hover:border-blue-800 hover:text-gray-900 dark:hover:text-blue-400">
                04 — Launch
              </button>
              <button className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 bg-white dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-transparent hover:border-gray-300 dark:hover:border-blue-800 hover:text-gray-900 dark:hover:text-blue-400">
                05 — Grow
              </button>
            </div>

            <div className="bg-white dark:bg-[#0F172A] border border-blue-100 dark:border-[#1E3A8A] rounded-3xl p-8 md:p-12 text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-xl">
              <div>
                <div className="text-blue-600 dark:text-blue-500 font-extrabold tracking-widest uppercase text-sm mb-3">
                  STAGE 01 OF 05
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  Discover & Understand
                </h3>
                <p className="text-gray-600 dark:text-[#94A3B8] text-lg leading-relaxed">
                  Before choosing tools or writing code, we analyze your
                  commercial model, customer pain points, workflows, and exact
                  conversion goals.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "In-depth stakeholder & workflow interview",
                  "User journey mapping & functional scope lock",
                  "Measurable success metrics & timeline lock"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-500 p-2 rounded-lg shrink-0 mt-1">
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-[1.05rem] leading-tight pt-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       4. COMPACT CEO SPOTLIGHT (CONCISE & PROPORTIONATE)
       ========================================================================== */}
        <section className="py-24" id="leadership">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="bg-[#0B1121] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.5fr] shadow-2xl relative border border-[#1E3A8A]">
              <div className="h-[300px] md:h-auto relative">
                <img
                  src="1B720A1B-0D7A-4049-861C-AB2B0F57851C.jpg"
                  alt="Krish Jung Thapa, CEO of TechSapana"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B1121] via-[#0B1121]/60 to-transparent"></div>
              </div>

              <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
                <div className="inline-block bg-[#1E3A8A] text-[#60A5FA] text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 w-fit">Leadership Vision</div>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
                  AS LONG AS YOU DON'T START... <span className="text-blue-500">JUST START.</span>
                </h2>
                <p className="text-[#94A3B8] text-lg italic leading-relaxed mb-8">
                  "A great digital product isn't simply about writing code. It
                  begins with understanding the problem. Whether you need a
                  high-converting website, custom software, or an AI workflow,
                  our job is to turn that idea into something people can
                  actually use."
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-6">
                  <div>
                    <div className="text-white font-black text-xl mb-1">KRISH JUNG THAPA</div>
                    <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">CEO & FOUNDER | TECHSAPANA</div>
                  </div>
                  <button className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors">
                    Talk to Our Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       5. CORE TEAM STREAM (CLEAN TILES)
       ========================================================================== */}
        <section className="py-24 bg-gray-50 dark:bg-[#0B1121] border-t border-gray-200 dark:border-white/10" id="team">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center bg-[#EBF4FF] dark:bg-[#0B132B] border border-[#BFDBFE] dark:border-[#1E3A8A] text-[#1D4ED8] dark:text-[#3B82F6] text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
                OUR TEAM
              </div>
              <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-[800] tracking-tight leading-[1.2] text-gray-900 dark:text-white mb-4">The Builders.</h2>
              <p className="text-lg text-gray-600 dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                Direct access to dedicated software architects, UX designers,
                and technology professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { badge: "Backend & Cloud", name: "Engineering Lead", desc: "Directs scalable backend frameworks, cloud server infrastructure, and security compliance." },
                { badge: "Interface & UX", name: "Product Design Lead", desc: "Focuses on clean layout design, user journey mapping, and friction-free interface experiences." },
                { badge: "AI Solutions", name: "Automation Specialist", desc: "Architects business automations, intelligent API workflows, and leads hands-on practical courses." }
              ].map((member, idx) => (
                <div key={idx} className="bg-white dark:bg-bg-primary border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1">
                  <div className="bg-gray-100 dark:bg-[#0F172A] text-gray-600 dark:text-[#94A3B8] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-6">
                    {member.badge}
                  </div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-3">{member.name}</div>
                  <p className="text-gray-600 dark:text-[#94A3B8] leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
       6. FINAL CONVERSION CTA
       ========================================================================== */}
        <section className="py-24">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden border border-blue-500/50">
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }}></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Have an Idea? Let's Turn It Into Reality.
                </h2>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                  Whether you need a modern business website, custom software, or
                  an AI workflow, our team is ready.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-white hover:bg-gray-100 text-blue-700 font-black py-4 px-8 rounded-xl transition-colors shadow-lg">Start Your Project</button>
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold py-4 px-8 rounded-xl transition-colors"
                  >
                    Talk to Our Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal - Legacy style removed, keeping hidden overlay logic empty or simplified if unused currently */}
    </>
  );
}
