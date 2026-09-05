"use client";

import { useState } from "react";
import Link from "next/link";
import EnrollmentCheckout from "@/components/EnrollmentCheckout";

export default function CourseDetailClient({ 
  course, 
  paymentQrImage 
}: { 
  course: any, 
  paymentQrImage: string | null 
}) {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <main className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 bg-bg-primary overflow-hidden">
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-text-main">
                  {course.title}
                </h1>
                <p className="text-lg text-text-muted mb-8 max-w-xl leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-hover !text-white rounded-md font-bold shadow-[0_4px_20px_rgba(0,82,204,0.35)] transition-all"
                  >
                    Enroll Now
                  </button>
                  <a
                    href="https://meet.google.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-bg-card hover:bg-bg-card-hover border border-border-medium hover:border-brand-blue text-text-main rounded-md font-bold transition-all"
                  >
                    Join Live Google Meet Demo
                  </a>
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
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#10B981]"></div>
                      <div className="flex flex-col">
                        <div className="text-sm font-bold text-text-main">Starts {course.startDateText}</div>
                        <div className="text-xs text-text-muted">Only {course.availableSeats} seats remaining</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUBNAV STICKY BAR */}
        <div className="sticky top-[80px] z-40 bg-bg-secondary/90 backdrop-blur-md border-y border-border-subtle">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <ul className="flex items-center gap-8 overflow-x-auto whitespace-nowrap py-4">
              <li><a href="#overview" className="text-sm font-bold text-brand-blue border-b-2 border-brand-blue pb-4">Overview</a></li>
              {course.modules?.length > 0 && <li><a href="#curriculum" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors pb-4">Syllabus</a></li>}
              {course.tools?.length > 0 && <li><a href="#tools" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors pb-4">Tools Stack</a></li>}
              {course.instructor && <li><a href="#instructor" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors pb-4">Instructor</a></li>}
            </ul>
          </div>
        </div>

        {/* PAGE WRAPPER */}
        <div className="py-16 bg-bg-primary">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 items-start">
              
              {/* Main Content */}
              <div className="flex flex-col gap-16">
                
                {/* OVERVIEW SECTION */}
                <div id="overview" className="scroll-mt-32">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h2 className="text-3xl font-extrabold text-text-main">What You Will Master</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.highlights?.map((highlight: string, i: number) => (
                      <div key={i} className="flex gap-4 p-6 bg-bg-secondary border border-border-subtle rounded-xl hover:border-brand-blue hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <div className="flex-shrink-0 w-12 h-12 bg-brand-blue-soft text-brand-blue rounded-lg flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div>
                          <div className="font-bold text-text-main mb-1">{highlight}</div>
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
                            <div className="flex items-center gap-4">
                              <span className="px-3 py-1 bg-brand-blue-soft text-brand-blue text-xs font-extrabold tracking-wider rounded-full">
                                {module.weekLabel}
                              </span>
                              <span className="font-bold text-text-main text-lg">{module.title}</span>
                            </div>
                            <div className="text-text-muted">▼</div>
                          </div>
                          <div className="px-6 pb-6 pt-2 border-t border-border-subtle ml-6 mr-6">
                            <div className="flex flex-col gap-3 mt-4">
                              {module.lessons.map((lesson: string, j: number) => (
                                <div key={j} className="text-sm text-text-muted flex gap-2">
                                  <span className="text-brand-blue">•</span> {lesson}
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
                    <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                      <div 
                        className="prose dark:prose-invert prose-brand max-w-none 
                                   prose-headings:font-extrabold prose-headings:text-text-main prose-headings:tracking-tight 
                                   prose-p:text-text-muted prose-p:leading-relaxed 
                                   prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                                   prose-strong:text-text-main prose-strong:font-bold
                                   prose-ul:text-text-muted prose-li:marker:text-brand-blue"
                        dangerouslySetInnerHTML={{ __html: course.detailedDescription }} 
                      />
                    </div>
                  </div>
                )}


                {/* TOOLS SECTION */}
                {course.tools?.length > 0 && (
                  <div id="tools" className="scroll-mt-32">
                    <h2 className="text-3xl font-extrabold text-text-main mb-8">Tools &amp; Frameworks Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {course.tools.map((tool: any, i: number) => (
                        <div key={i} className="p-6 bg-bg-secondary border border-border-subtle rounded-xl text-center hover:border-brand-blue hover:-translate-y-1 transition-all">
                          <div className="text-3xl mb-3">{tool.icon}</div>
                          <div className="font-bold text-text-main text-sm mb-1">{tool.name}</div>
                          <div className="text-xs text-text-muted">{tool.description}</div>
                        </div>
                      ))}
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

                  <div className="flex items-center justify-between p-4 bg-brand-blue-soft border border-border-accent rounded-xl mb-6">
                    <div className="flex flex-col">
                      <div className="text-sm font-bold text-brand-blue">Free Demo Classroom</div>
                      <div className="text-xs text-text-muted">Direct Google Meet Access</div>
                    </div>
                    <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-brand-blue !text-white text-xs font-bold rounded hover:bg-brand-blue-hover transition-colors">
                      Join Live &rarr;
                    </a>
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
                      <span className="font-bold text-red-500">Only {course.availableSeats} Left</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue-hover !text-white rounded-lg font-bold shadow-[0_4px_20px_rgba(0,82,204,0.35)] transition-all"
                    >
                      Enroll Now
                    </button>
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

      {showCheckout && (
        <EnrollmentCheckout 
          courseId={course.id}
          courseTitle={course.title}
          coursePrice={course.price}
          qrImageUrl={paymentQrImage}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
