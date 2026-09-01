"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteCourse } from "@/app/actions/course";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter } from "next/navigation";

export default function CourseList({ initialCourses }: { initialCourses: any[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCourse(deleteId);
      setCourses(courses.filter(c => c.id !== deleteId));
      toast.success("Course deleted successfully!");
      router.refresh();
    } catch (e) {
      toast.error("Failed to delete course.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Course Management</h2>
          <p className="text-white/50 text-sm">Create and manage content for the public Courses page.</p>
        </div>
        <Link 
          href="/admin/courses/new"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
        >
          <Plus size={18} /> Add Course
        </Link>
      </div>

      <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-xs font-bold text-white/50 uppercase tracking-wider">Course Name</th>
              <th className="p-4 text-xs font-bold text-white/50 uppercase tracking-wider">Price</th>
              <th className="p-4 text-xs font-bold text-white/50 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/40">No courses found. Add one!</td>
              </tr>
            ) : (
              courses.map(course => (
                <tr key={course.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      {course.imageUrl && (
                        <img src={course.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-white/10" alt="" />
                      )}
                      <div>
                        <div className="font-bold text-white">{course.title}</div>
                        <div className="text-xs text-white/40 truncate max-w-xs">{course.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-white/90">NPR {course.price.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.published ? "bg-green-500/20 text-green-400 border border-green-500/20" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"}`}>
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/courses/${course.id}`} className="inline-block p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors mr-2">
                      <Edit2 size={16} />
                    </Link>
                    <button onClick={() => setDeleteId(course.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
