import { getCourses } from "@/app/actions/course";
import CourseList from "./CourseList";

export default async function AdminCoursesPage() {
  const courses = await getCourses();
  
  return (
    <div className="py-2">
      <div className="text-white/50 text-xs font-semibold mb-6">Pages / Courses</div>
      <CourseList initialCourses={courses} />
    </div>
  );
}
