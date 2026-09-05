"use client";

import React from "react";
import Link from "next/link";
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
  BarChart
} from "lucide-react";

export default function AdminDashboard() {
  const modules = [
    { name: "Hero Section", href: "/admin/hero", icon: Presentation, desc: "Manage homepage hero slides and text" },
    { name: "Team Members", href: "/admin/team", icon: Users, desc: "Manage team profiles and roles" },
    { name: "Services", href: "/admin/services", icon: Layers, desc: "Update services offered" },
    { name: "Courses", href: "/admin/courses", icon: Table, desc: "Manage training and courses" },
    { name: "Portfolio", href: "/admin/portfolio", icon: CreditCard, desc: "Update portfolio and projects" },
    { name: "FAQ", href: "/admin/faq", icon: Wrench, desc: "Manage frequently asked questions" },
    { name: "Blog", href: "/admin/blog", icon: FileText, desc: "Write and edit blog posts" },
    { name: "Stats", href: "/admin/stats", icon: BarChart, desc: "Manage company statistics" },
    { name: "Banner", href: "/admin/banner", icon: Megaphone, desc: "Manage global announcements" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent py-2">
        <div>
          <div className="text-white/50 text-xs font-semibold mb-1">Admin / Dashboard</div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Welcome to TechSapana Admin</h2>
          <p className="text-white/60 text-sm mt-1 max-w-xl">
            Manage your website content efficiently. Select a module below to start making changes.
          </p>
        </div>
        <Link 
          href="/admin/settings"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Settings size={16} /> Site Settings
        </Link>
      </header>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <Link 
              key={i} 
              href={mod.href}
              className="group bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
              
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Icon size={24} />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{mod.name}</h3>
              <p className="text-white/50 text-sm mb-6 flex-1">{mod.desc}</p>
              
              <div className="flex items-center text-blue-400 text-sm font-bold group-hover:text-blue-300">
                Manage <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
