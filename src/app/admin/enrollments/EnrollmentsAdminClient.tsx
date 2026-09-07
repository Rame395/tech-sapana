"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Eye, Loader2, MessageCircle, Mail, Send } from "lucide-react";
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
  const [selectedCourse, setSelectedCourse] = useState<string>("All");
  
  // State for Google Meet links per course
  const [meetLinks, setMeetLinks] = useState<Record<string, string>>({});

  const handleStatusChange = async (id: string, newStatus: string, enrollment: Enrollment) => {
    setLoadingId(id);
    try {
      const res = await updateEnrollmentStatus(id, newStatus);
      if (res.success) {
        setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
        
        // If it was just verified, prompt for messaging
        if (newStatus === "VERIFIED") {
          // Use setTimeout so the UI updates first
          setTimeout(() => {
            const wantToMessage = window.confirm("Student Verified Successfully! (Seat count decremented).\\n\\nWould you like to send them a WhatsApp approval message now?");
            if (wantToMessage) {
              handleWhatsAppSingle(enrollment);
            }
          }, 100);
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleWhatsAppSingle = (enrollment: Enrollment) => {
    const text = `Hello ${enrollment.name}, your payment for the course *${enrollment.course.title}* has been verified! Welcome to TechSapana!`;
    const url = `https://wa.me/${enrollment.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEmailSingle = (enrollment: Enrollment) => {
    const subject = `Enrollment Verified: ${enrollment.course.title}`;
    const body = `Hello ${enrollment.name},\n\nYour payment for the course "${enrollment.course.title}" has been verified! Welcome to TechSapana.\n\nBest regards,\nTechSapana Team`;
    const url = `mailto:${enrollment.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  const handleEmailClass = (courseTitle: string, students: Enrollment[]) => {
    const link = meetLinks[courseTitle];
    if (!link) {
      alert("Please enter a Google Meet link first.");
      return;
    }
    
    // Only email VERIFIED students
    const verifiedEmails = students.filter(s => s.status === "VERIFIED").map(s => s.email);
    
    if (verifiedEmails.length === 0) {
      alert("No verified students to email in this course.");
      return;
    }

    const bcc = verifiedEmails.join(',');
    const subject = `Class Link for ${courseTitle}`;
    const body = `Hello students,\n\nHere is your class link for ${courseTitle}:\n${link}\n\nSee you there!`;
    
    const url = `mailto:?bcc=${bcc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  // Group enrollments by course title
  const groupedEnrollments = enrollments.reduce((acc, enrollment) => {
    const courseTitle = enrollment.course.title;
    if (!acc[courseTitle]) {
      acc[courseTitle] = [];
    }
    acc[courseTitle].push(enrollment);
    return acc;
  }, {} as Record<string, Enrollment[]>);

  const courseTitles = Object.keys(groupedEnrollments);

  const filteredGroups = selectedCourse === "All" 
    ? groupedEnrollments 
    : { [selectedCourse]: groupedEnrollments[selectedCourse] };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Course Enrollments</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="course-filter" className="text-sm text-gray-400 font-medium">Filter by Course:</label>
          <select 
            id="course-filter"
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-black/40 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Courses</option>
            {courseTitles.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>
      </div>

      {Object.keys(filteredGroups).length === 0 || (selectedCourse !== "All" && !filteredGroups[selectedCourse]) ? (
        <div className="bg-[#1a1a2e] rounded-xl border border-white/5 shadow-2xl p-8 text-center text-gray-500">
          No enrollments found for this selection.
        </div>
      ) : (
        Object.entries(filteredGroups).map(([courseTitle, students]) => (
          <div key={courseTitle} className="bg-[#1a1a2e] rounded-xl border border-white/5 shadow-2xl overflow-hidden">
            {/* Course Header */}
            <div className="px-6 py-5 border-b border-white/5 bg-black/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-blue-400">{courseTitle}</h2>
                <p className="text-sm text-gray-400 mt-1">{students.length} Total Student(s)</p>
              </div>
              
              {/* Google Meet Mass Mailer */}
              <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Paste Google Meet Link..." 
                  className="bg-black/40 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 w-full md:w-64"
                  value={meetLinks[courseTitle] || ""}
                  onChange={(e) => setMeetLinks({...meetLinks, [courseTitle]: e.target.value})}
                />
                <button 
                  onClick={() => handleEmailClass(courseTitle, students)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <Send className="w-4 h-4" /> Email Class
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 font-medium border-b border-white/5">Date</th>
                    <th className="px-6 py-3 font-medium border-b border-white/5">Student</th>
                    <th className="px-6 py-3 font-medium border-b border-white/5">Contact</th>
                    <th className="px-6 py-3 font-medium border-b border-white/5">Receipt</th>
                    <th className="px-6 py-3 font-medium border-b border-white/5">Status</th>
                    <th className="px-6 py-3 font-medium border-b border-white/5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map((enrollment) => (
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
                      <td className="px-6 py-4">
                        {enrollment.paymentScreenshotUrl ? (
                          <a 
                            href={enrollment.paymentScreenshotUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-md text-xs font-semibold transition-colors border border-blue-500/20"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
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
                        <div className="flex justify-end gap-2 items-center">
                          {/* Messaging Buttons */}
                          <button 
                            onClick={() => handleWhatsAppSingle(enrollment)}
                            title="WhatsApp Student"
                            className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEmailSingle(enrollment)}
                            title="Email Student"
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          
                          <div className="w-px h-4 bg-white/10 mx-1"></div>

                          {/* Status Action Buttons */}
                          {loadingId === enrollment.id ? (
                            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                          ) : (
                            <>
                              {enrollment.status !== "VERIFIED" && (
                                <button
                                  onClick={() => handleStatusChange(enrollment.id, "VERIFIED", enrollment)}
                                  title="Verify Payment"
                                  className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                              )}
                              {enrollment.status !== "REJECTED" && (
                                <button
                                  onClick={() => handleStatusChange(enrollment.id, "REJECTED", enrollment)}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
