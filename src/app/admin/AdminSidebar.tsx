"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Table, 
  CreditCard, 
  Wrench, 
  LogOut,
  Megaphone,
  FileText,
  Presentation,
  Settings,
  Layers,
  Users,
  BarChart,
  ClipboardList
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Hero", href: "/admin/hero", icon: Presentation },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Services", href: "/admin/services", icon: Layers },
    { name: "Courses", href: "/admin/courses", icon: Table },
    { name: "Enrollments", href: "/admin/enrollments", icon: ClipboardList },
    { name: "Banner", href: "/admin/banner", icon: Megaphone },
    { name: "Portfolio", href: "/admin/portfolio", icon: CreditCard },
    { name: "FAQ", href: "/admin/faq", icon: Wrench },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Stats", href: "/admin/stats", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];


  return (
    <aside className="w-64 fixed h-full border-r border-white/10 bg-[#0F1535]/80 backdrop-blur-xl p-6 hidden md:flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center !text-white font-extrabold text-[0.95rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_2px_10px_rgba(37,99,235,0.4)]">
          TS
        </div>
        <span className="font-extrabold tracking-wider text-sm uppercase">TechSapana</span>
      </div>
      
      {/* Main Navigation */}
      <nav className="space-y-1 flex-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                isActive 
                  ? "bg-blue-600/20 text-white" 
                  : "text-white/50 hover:text-white"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive ? "bg-blue-600 text-white" : "bg-white/5 text-white/50"
              }`}>
                <Icon size={18} />
              </div>
              <span className="font-semibold text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Account Navigation */}
      <div className="mt-8 mb-4 px-4 text-xs font-bold text-white/40 uppercase tracking-wider">Account Pages</div>
      <nav className="space-y-1 mb-8">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 text-white/50 hover:text-red-400 rounded-xl px-4 py-3 transition-colors"
        >
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
            <LogOut size={18} />
          </div>
          <span className="font-semibold text-sm">Log Out</span>
        </button>
      </nav>
    </aside>
  );
}
