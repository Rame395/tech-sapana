import { getCourses } from "@/app/actions/course";
import CourseFilterClient from "@/components/CourseFilterClient";

export default async function Courses() {
  const allCourses = await getCourses();
  const publishedCourses = allCourses.filter(c => c.published);

  return (
    <>
      <main className="min-h-screen bg-bg-primary">
        <section className="pt-[7.5rem] md:pt-[9rem] pb-12 relative flex flex-col items-center text-center">
          <div className="w-full max-w-[1240px] mx-auto px-6 flex flex-col items-center">
            <div className="inline-flex items-center justify-center bg-[#EBF4FF] dark:bg-[#0B132B] border border-[#BFDBFE] dark:border-[#1E3A8A] text-[#1D4ED8] dark:text-[#3B82F6] text-[0.65rem] md:text-[0.75rem] font-extrabold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
              TECHSAPANA EDUCATION VERTICAL
            </div>
            
            <h1 className="text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-[800] tracking-tight leading-[1.15] text-gray-900 dark:text-white mb-4">
              Practical Technology. <span className="text-[#0052CC] dark:text-[#0052CC]">Transparent Pricing.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              Hands-on programs taught by active software engineers. Test
              drive any course through our free live Google Meet demo classes
              before enrolling.
            </p>
          </div>
        </section>

        <CourseFilterClient courses={publishedCourses} />
      </main>
    </>
  );
}
