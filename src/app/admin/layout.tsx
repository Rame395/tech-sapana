import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Table, 
  CreditCard, 
  Wrench, 
  User, 
  LogIn, 
  UserPlus,
  Megaphone 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F1535] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 fixed h-full border-r border-white/10 bg-[#0F1535]/80 backdrop-blur-xl p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">V</div>
          <span className="font-bold tracking-widest text-sm">VISION UI FREE</span>
        </div>
        
        <nav className="space-y-1">
          <Link href="/admin" className="flex items-center gap-3 bg-blue-600/20 text-white rounded-xl px-4 py-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={18} />
            </div>
            <span className="font-semibold text-sm">Dashboard</span>
          </Link>
          
          <Link href="/admin/courses" className="flex items-center gap-3 text-white/50 hover:text-white rounded-xl px-4 py-3 transition-colors">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <Table size={18} />
            </div>
            <span className="font-semibold text-sm">Courses</span>
          </Link>

          <Link href="/admin/banner" className="flex items-center gap-3 text-white/50 hover:text-white rounded-xl px-4 py-3 transition-colors">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <Megaphone size={18} />
            </div>
            <span className="font-semibold text-sm">Banner</span>
          </Link>

          <Link href="/admin/portfolio" className="flex items-center gap-3 text-white/50 hover:text-white rounded-xl px-4 py-3 transition-colors">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <CreditCard size={18} />
            </div>
            <span className="font-semibold text-sm">Portfolio</span>
          </Link>

          <Link href="/admin/faq" className="flex items-center gap-3 text-white/50 hover:text-white rounded-xl px-4 py-3 transition-colors">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <Wrench size={18} />
            </div>
            <span className="font-semibold text-sm">FAQ</span>
          </Link>
        </nav>

        <div className="mt-8 mb-4 px-4 text-xs font-bold text-white/40 uppercase tracking-wider">Account Pages</div>
        
        <nav className="space-y-1">
          <Link href="#" className="flex items-center gap-3 text-white/50 hover:text-white rounded-xl px-4 py-3 transition-colors">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <User size={18} />
            </div>
            <span className="font-semibold text-sm">Profile</span>
          </Link>

          <Link href="#" className="flex items-center gap-3 text-white/50 hover:text-white rounded-xl px-4 py-3 transition-colors">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <LogIn size={18} />
            </div>
            <span className="font-semibold text-sm">Sign In</span>
          </Link>

          <Link href="#" className="flex items-center gap-3 text-white/50 hover:text-white rounded-xl px-4 py-3 transition-colors">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <UserPlus size={18} />
            </div>
            <span className="font-semibold text-sm">Sign Up</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-blue-600/40 to-purple-600/40 border border-white/10 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-xl rounded-full"></div>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-3">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
            </div>
            <div className="font-bold text-sm mb-1">Need help?</div>
            <div className="text-xs text-white/60 mb-3">Please check our docs</div>
            <button className="w-full bg-white text-black font-bold text-xs py-2 rounded-lg">DOCUMENTATION</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 overflow-x-hidden min-h-screen">
        {children}
      </main>
    </div>
  );
}
