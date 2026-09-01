import CourseForm from "../CourseForm";

export default function NewCoursePage() {
  return (
    <div className="py-2">
      <div className="text-white/50 text-xs font-semibold mb-6">Pages / Courses / New</div>
      <CourseForm />
    </div>
  );
}