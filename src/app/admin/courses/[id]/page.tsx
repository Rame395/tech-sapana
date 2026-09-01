import { prisma } from "@/lib/prisma";
import CourseForm from "../CourseForm";
import { notFound } from "next/navigation";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const course = await prisma.course.findUnique({
    where: { id }
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="py-2">
      <div className="text-white/50 text-xs font-semibold mb-6">Pages / Courses / Edit</div>
      <CourseForm initialData={course} />
    </div>
  );
}