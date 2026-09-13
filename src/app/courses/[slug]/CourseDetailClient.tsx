"use client";

import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { SiGooglegemini, SiReact, SiNextdotjs, SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss, SiNodedotjs, SiTailwindcss, SiGithub, SiFigma, SiVercel, SiPrisma, SiPostgresql, SiDocker } from "react-icons/si";
import { FaToolbox, FaRobot, FaBrain, FaCode, FaAws } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";

const iconMap = {
  TbBrandOpenai, SiGooglegemini, SiReact, SiNextdotjs, SiPython, SiJavascript, 
  SiTypescript, SiHtml5, SiCss, SiNodedotjs, SiTailwindcss, SiGithub, 
  SiFigma, SiVercel, SiPrisma, SiPostgresql, SiDocker,
  FaToolbox, FaRobot, FaBrain, FaCode, FaAws
};

export default function CourseDetailClient({ 
  course, 
  paymentQrImage 
}: { 
  course: any, 
  paymentQrImage: string | null 
}) {
  return (
    <>
      <main className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative pt-[130px] pb-16 bg-bg-primary overflow-hidden">
          <div className="w-full max-w-[1240px] mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-semibold text-text-muted mb-8">
              <Link href="/courses" className="hover:text-text-main transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-text-main">{course.title}</span>
            </div>

            {/* Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {course.badgeText1 && (
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-brand-blue mb-4 bg-brand-blue-soft px-3 py-1.5 rounded-full border border-border-accent">
                    {course.badgeText1}
                  </div>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-text-main break-words">
                  {course.title}
                </h1>
                
                {course.reviewCount && course.reviewCount > 0 ? (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex text-[#FFB800] text-lg">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < Math.floor(course.rating || 5) ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-text-main">
                      {course.rating?.toFixed(1)} <span className="text-text-muted font-medium">({course.reviewCount} verified ratings)</span>
                    </div>
                  </div>
                ) : null}

                <p className="text-lg text-text-muted mb-8 max-w-xl leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link 
                    href={`/checkout/${course.id}`}
                    className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-hover !text-white rounded-md font-bold shadow-[0_4px_20px_rgba(0,82,204,0.35)] transition-all"
                  >
                    {course.availableSeats > 0 ? "Enroll Now" : "Join Waitlist"}
                  </Link>
                </div>
              </div>

              {/* Hero Banner Frame */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border-medium aspect-[4/3] bg-black group">
                  <img
                    src={course.imageUrl || "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=900&q=80"}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating Badge */}
                  {course.startDateText && (
                    <div className="absolute bottom-4 right-4 bg-bg-card/90 backdrop-blur-md border border-border-subtle p-3 rounded-lg shadow-lg flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px] ${course.availableSeats > 0 ? 'bg-green-500 shadow-green-500' : 'bg-yellow-500 shadow-yellow-500'}`}></div>
                      <div className="flex flex-col">
                        <div className="text-sm font-bold text-text-main">Starts {course.startDateText}</div>
                        <div className="text-xs text-text-muted">
                          {course.availableSeats > 0 ? `Only ${course.availableSeats} seats remaining` : "Waitlist Open"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUBNAV STICKY BAR */}
        <div className="bg-bg-secondary/90 backdrop-blur-md border-y border-border-subtle">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <ul className="flex items-center gap-8 overflow-x-auto whitespace-nowrap py-4">
              <li><a href="#overview" className="text-sm font-bold text-brand-blue border-b-2 border-brand-blue pb-4">Overview</a></li>
              {course.modules?.length > 0 && <li><a href="#curriculum" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors pb-4">Syllabus</a></li>}
              {course.tools?.length > 0 && <li><a href="#tools" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors pb-4">Tools Stack</a></li>}
              {course.instructor && <li><a href="#instructor" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors pb-4">Instructor</a></li>}
              {course.reviews?.length > 0 && <li><a href="#reviews" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors pb-4">Reviews</a></li>}
            </ul>
          </div>
        </div>

        {/* PAGE WRAPPER */}
        <div className="py-16 bg-bg-primary">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 items-start">
              
              {/* Main Content */}
              <div className="flex flex-col gap-16 min-w-0">
                
                {/* OVERVIEW SECTION */}
                <div id="overview" className="scroll-mt-32">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h2 className="text-3xl font-extrabold text-text-main break-words">What You Will Master</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.highlights?.map((highlight: string, i: number) => (
                      <div key={i} className="flex gap-4 p-6 bg-bg-secondary border border-border-subtle rounded-xl hover:border-brand-blue hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <div className="flex-shrink-0 w-12 h-12 bg-brand-blue-soft text-brand-blue rounded-lg flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-text-main mb-1 break-words">{highlight}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CURRICULUM SECTION */}
                {course.modules?.length > 0 && (
                  <div id="curriculum" className="scroll-mt-32">
                    <h2 className="text-3xl font-extrabold text-text-main mb-8">Program Syllabus</h2>
                    <div className="flex flex-col gap-4">
                      {course.modules.map((module: any, i: number) => (
                        <div key={i} className="bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden group">
                          <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-bg-card-hover transition-colors">
                            <div className="flex items-center gap-4 min-w-0">
                              <span className="shrink-0 px-3 py-1 bg-brand-blue-soft text-brand-blue text-xs font-extrabold tracking-wider rounded-full">
                                {module.weekLabel}
                              </span>
                              <span className="font-bold text-text-main text-lg break-words truncate whitespace-normal">{module.title}</span>
                            </div>
                            <div className="text-text-muted shrink-0 ml-4">▼</div>
                          </div>
                          <div className="px-6 pb-6 pt-2 border-t border-border-subtle ml-6 mr-6">
                            <div className="flex flex-col gap-3 mt-4">
                              {module.lessons.map((lesson: string, j: number) => (
                                <div key={j} className="text-base text-gray-800 dark:text-gray-200 font-medium flex gap-2 break-words leading-relaxed">
                                  <span className="text-brand-blue shrink-0 mt-0.5">•</span> 
                                  <span className="whitespace-pre-wrap">{lesson}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DETAILED CONTENT (RICH TEXT) SECTION */}
                {course.detailedDescription && (
                  <div id="details" className="scroll-mt-32">
                    <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden">
                      <div 
                        className="prose dark:prose-invert prose-brand max-w-none break-words
                                   [&_*]:!bg-transparent text-gray-800 dark:text-gray-200 text-base md:text-lg leading-[1.8]
                                   [&_h1]:!text-text-main [&_h2]:!text-text-main [&_h3]:!text-text-main [&_h4]:!text-text-main [&_h5]:!text-text-main [&_h6]:!text-text-main
                                   [&_strong]:!text-text-main [&_b]:!text-text-main
                                   [&_a]:!text-brand-blue
                                   [&_pre]:!whitespace-pre-wrap [&_pre]:!break-words [&_code]:!break-words
                                   prose-headings:font-extrabold prose-headings:tracking-tight 
                                   prose-a:no-underline hover:prose-a:underline
                                   prose-li:marker:text-brand-blue"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.detailedDescription ?? '') }} 
                      />
                    </div>
                  </div>
                )}


                {/* TOOLS SECTION */}
                {course.tools?.length > 0 && (
                  <div id="tools" className="scroll-mt-32">
                    <h2 className="text-3xl font-extrabold text-text-main mb-8">Tools &amp; Frameworks Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {course.tools.map((tool: any, i: number) => {
                        // Dynamically map icon strings to actual React components. Fallback to FaToolbox.
                        const IconComponent = (iconMap as any)[tool.icon] || (iconMap as any)["FaToolbox"];
                        return (
                          <div key={i} className="p-6 bg-bg-secondary border border-border-subtle rounded-xl text-center hover:border-brand-blue hover:-translate-y-1 transition-all">
                            <div className="text-3xl mb-3 text-brand-blue flex justify-center"><IconComponent /></div>
                            <div className="font-bold text-text-main text-sm mb-1">{tool.name}</div>
                            <div className="text-xs text-text-muted">{tool.description}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* INSTRUCTOR SECTION */}
                {course.instructor && (
                  <div id="instructor" className="scroll-mt-32">
                    <h2 className="text-3xl font-extrabold text-text-main mb-8">Lead Instructor &amp; Mentor</h2>
                    <div className="flex flex-col md:flex-row gap-8 p-8 bg-bg-secondary border border-border-subtle rounded-xl">
                      <div className="flex flex-col justify-center">
                        <div className="text-xl font-bold text-text-main mb-1">{course.instructor.name}</div>
                        <div className="text-sm font-semibold text-brand-blue mb-4">{course.instructor.badge}</div>
                        <p className="text-text-muted text-sm leading-relaxed">
                          {course.instructor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* REVIEWS SECTION */}
                {course.reviews?.length > 0 && (
                  <div id="reviews" className="scroll-mt-32">
                    <h2 className="text-3xl font-extrabold text-text-main mb-8">What Our Alumni Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {course.reviews.map((review: any, i: number) => (
                        <div key={i} className="p-6 bg-bg-secondary border border-border-subtle rounded-xl flex flex-col gap-4">
                          <div className="flex text-[#FFB800] text-sm">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <span key={idx}>{idx < review.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <p className="text-text-muted italic text-sm leading-relaxed flex-grow">"{review.comment}"</p>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-blue-soft text-brand-blue flex items-center justify-center font-bold text-xs uppercase">
                              {review.studentName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-text-main text-sm">{review.studentName}</div>
                              <div className="text-xs text-brand-blue font-semibold">Verified Graduate</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SIDEBAR WRAPPER */}
              <aside className="sticky top-[160px] flex flex-col gap-6">
                
                {/* Enroll Action Panel */}
                <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-end mb-6 pb-6 border-b border-border-subtle">
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Cohort Tuition</div>
                      <div className="text-3xl font-extrabold text-text-main">NPR {course.price.toLocaleString()}</div>
                    </div>
                    {course.originalPrice && (
                      <div className="text-sm font-semibold text-text-muted line-through">NPR {course.originalPrice.toLocaleString()}</div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Start Date:</span>
                      <span className="font-bold text-text-main">{course.startDateText || "TBD"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Schedule:</span>
                      <span className="font-bold text-text-main">{course.scheduleText || "TBD"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Class Timing:</span>
                      <span className="font-bold text-text-main">{course.classTiming || "TBD"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Remaining Seats:</span>
                      <span className={`font-bold ${course.availableSeats > 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                        {course.availableSeats > 0 ? `Only ${course.availableSeats} Left` : "Waitlist Open"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link 
                      href={`/checkout/${course.id}`}
                      className={`w-full text-center py-3.5 !text-white rounded-lg font-bold shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all inline-block ${course.availableSeats > 0 ? 'bg-brand-blue hover:bg-brand-blue-hover shadow-[0_4px_20px_rgba(0,82,204,0.35)]' : 'bg-yellow-600 hover:bg-yellow-700'}`}
                    >
                      {course.availableSeats > 0 ? "Enroll Now" : "Join Waitlist"}
                    </Link>
                  </div>
                </div>

                {/* Perks Box */}
                <div className="bg-bg-primary border border-border-subtle rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm font-semibold text-text-main">
                    <svg className="text-green-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>100% Practical Capstone Project</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-text-main">
                    <svg className="text-green-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Certificate of Completion Included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-text-main">
                    <svg className="text-green-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Direct Mentorship from Engineers</span>
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
