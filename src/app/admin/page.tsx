import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { 
  Presentation, 
  Users, 
  Layers, 
  Table, 
  CreditCard, 
  Wrench, 
  FileText,
  Megaphone,
  Settings,
  ArrowRight,
  BarChart,
  UserCheck,
  TrendingUp,
  BookOpen,
  Edit3,
  Moon,
  Sun,
  Calendar,
  AlertCircle
} from "lucide-react";
import RevenueChart from "./components/RevenueChart";

export default async function AdminDashboard() {
  // Fetch real stats
  const totalVerifiedStudents = await prisma.enrollment.count({ where: { status: "VERIFIED" } });
  
  const verifiedEnrollments = await prisma.enrollment.findMany({
    where: { status: "VERIFIED" },
    include: { course: true }
  });
  
  const totalRevenue = verifiedEnrollments.reduce((acc, curr) => acc + (curr.course.price || 0), 0);
  const activeCourses = await prisma.course.count({ where: { published: true } });
  const publishedPosts = await prisma.post.count({ where: { status: "PUBLISHED" } });
  
  const teamMembersCount = await prisma.teamMember.count();
  const pendingEnrollmentsCount = await prisma.enrollment.count({ where: { status: "PENDING" } });

  // Compute course performance
  const coursePerformance: Record<string, { title: string, students: number, revenue: number }> = {};
  
  // Compute monthly revenue
  const monthlyRevenueMap: Record<string, { month: string, revenue: number, students: number }> = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Initialize last 6 months
  const d = new Date();
  for (let i = 5; i >= 0; i--) {
    const dTemp = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const monthKey = `${monthNames[dTemp.getMonth()]} ${dTemp.getFullYear()}`;
    monthlyRevenueMap[monthKey] = { month: monthKey, revenue: 0, students: 0 };
  }

  verifiedEnrollments.forEach(e => {
    // Course performance
    if (!coursePerformance[e.courseId]) {
      coursePerformance[e.courseId] = { title: e.course.title, students: 0, revenue: 0 };
    }
    coursePerformance[e.courseId].students += 1;
    coursePerformance[e.courseId].revenue += (e.course.price || 0);

    // Monthly revenue
    const eDate = new Date(e.createdAt);
    const monthKey = `${monthNames[eDate.getMonth()]} ${eDate.getFullYear()}`;
    if (monthlyRevenueMap[monthKey]) {
      monthlyRevenueMap[monthKey].revenue += (e.course.price || 0);
      monthlyRevenueMap[monthKey].students += 1;
    }
  });

  const chartData = Object.values(monthlyRevenueMap);
  const topCourses = Object.values(coursePerformance).sort((a, b) => b.students - a.students);
  const maxStudents = Math.max(...topCourses.map(c => c.students), 1);
  const maxRevenue = Math.max(...topCourses.map(c => c.revenue), 1);


  // Calculate Time and Greeting (Adjusted for Nepal Time roughly)
  const now = new Date();
  const nepalTime = new Date(now.getTime() + (5 * 60 + 45) * 60000);
  const hour = nepalTime.getUTCHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const GreetingIcon = hour < 12 || (hour > 6 && hour < 18) ? Sun : Moon;
  const dateString = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(now);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
      {/* Banner Header */}
      <header className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F1535] via-[#121A42] to-[#1a2352] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl border border-white/10">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        
        <div className="relative z-10 flex items-center gap-5">
          {/* Logo */}
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.4)]">
            TS
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">TechSapana Dashboard</h2>
            <p className="text-white/60 text-sm md:text-base font-medium">Real-time overview of your tech education platform.</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg md:text-xl">
            <GreetingIcon size={22} className="text-white/90" />
            {greeting}, Team
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl">
            <Calendar size={16} className="text-white/80" />
            {dateString}
          </div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Verified Students */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <UserCheck size={20} />
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">Students</span>
          </div>
          <h3 className="text-3xl font-black text-white">{totalVerifiedStudents}</h3>
          <p className="text-white/50 text-sm mt-1 font-medium">Verified Enrollments</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Revenue</span>
          </div>
          <h3 className="text-3xl font-black text-white">Rs. {totalRevenue.toLocaleString()}</h3>
          <p className="text-white/50 text-sm mt-1 font-medium">Total Verified Revenue</p>
        </div>

        {/* Active Courses */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <h3 className="text-3xl font-black text-white">{activeCourses}</h3>
          <p className="text-white/50 text-sm mt-1 font-medium">Published Courses</p>
        </div>

        {/* Pending Approvals */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full">Action</span>
          </div>
          <h3 className="text-3xl font-black text-white">{pendingEnrollmentsCount}</h3>
          <p className="text-white/50 text-sm mt-1 font-medium">Pending Approvals</p>
        </div>

        {/* Team Members */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <Users size={20} />
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full">Team</span>
          </div>
          <h3 className="text-3xl font-black text-white">{teamMembersCount}</h3>
          <p className="text-white/50 text-sm mt-1 font-medium">Total Team Members</p>
        </div>

        {/* Published Posts */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
              <Edit3 size={20} />
            </div>
            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">Content</span>
          </div>
          <h3 className="text-3xl font-black text-white">{publishedPosts}</h3>
          <p className="text-white/50 text-sm mt-1 font-medium">Published Blog Posts</p>
        </div>
      </div>

      {/* Revenue Chart Section */}
      <RevenueChart data={chartData} />

      {/* Course Performance Section & Quick Links Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Course Performance */}
        {topCourses.length > 0 && (
          <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                <Table size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Course Performance</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-xs font-bold text-white/50 uppercase tracking-wider">Course Name</th>
                    <th className="py-3 px-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Verified Students</th>
                    <th className="py-3 px-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Generated Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {topCourses.map((course, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-sm font-semibold text-white">
                        {course.title}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-blue-400">
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(course.students / maxStudents) * 100}%` }}></div>
                          </div>
                          <span className="w-6 text-right">{course.students}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-green-400">
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${(course.revenue / maxRevenue) * 100}%` }}></div>
                          </div>
                          <span>Rs. {course.revenue.toLocaleString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
              <Presentation size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Quick Actions</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/admin/enrollments" 
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-blue-500/20 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all group"
            >
              <div className="font-semibold text-white">Verify Enrollments</div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all group"
            >
              <div className="font-semibold text-white">View Live Website</div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/admin/settings" 
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all group"
            >
              <div className="font-semibold text-white">Global Settings</div>
              <Settings size={16} className="text-white/50 group-hover:text-white group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
