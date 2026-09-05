"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Eye, Loader2, ExternalLink } from "lucide-react";
import { updateEnrollmentStatus } from "@/app/actions/enrollment";

type Enrollment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  paymentScreenshotUrl: string | null;
  createdAt: Date;
  course: {
    title: string;
  };
};

export default function EnrollmentsAdminClient({ initialEnrollments }: { initialEnrollments: Enrollment[] }) {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      const res = await updateEnrollmentStatus(id, newStatus);
      if (res.success) {
        setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/5 shadow-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Course Enrollments</h2>
          <p className="text-sm text-gray-400 mt-1">Manage guest checkouts and verify payments.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/30 text-gray-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium border-b border-white/5">Date</th>
              <th className="px-6 py-4 font-medium border-b border-white/5">Student</th>
              <th className="px-6 py-4 font-medium border-b border-white/5">Contact</th>
              <th className="px-6 py-4 font-medium border-b border-white/5">Course</th>
              <th className="px-6 py-4 font-medium border-b border-white/5">Receipt</th>
              <th className="px-6 py-4 font-medium border-b border-white/5">Status</th>
              <th className="px-6 py-4 font-medium border-b border-white/5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No enrollments found.
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {enrollment.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    <div>{enrollment.email}</div>
                    <div>{enrollment.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-400 font-medium">
                    {enrollment.course.title}
                  </td>
                  <td className="px-6 py-4">
                    {enrollment.paymentScreenshotUrl ? (
                      <a 
                        href={enrollment.paymentScreenshotUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-md text-xs font-semibold transition-colors border border-blue-500/20"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Receipt
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs italic">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {enrollment.status === "PENDING" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        Pending
                      </span>
                    )}
                    {enrollment.status === "VERIFIED" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                        Verified
                      </span>
                    )}
                    {enrollment.status === "REJECTED" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {loadingId === enrollment.id ? (
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                      ) : (
                        <>
                          {enrollment.status !== "VERIFIED" && (
                            <button
                              onClick={() => handleStatusChange(enrollment.id, "VERIFIED")}
                              title="Verify Payment"
                              className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          {enrollment.status !== "REJECTED" && (
                            <button
                              onClick={() => handleStatusChange(enrollment.id, "REJECTED")}
                              title="Reject Payment"
                              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
