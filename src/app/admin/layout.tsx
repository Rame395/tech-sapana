import React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F1535] text-white flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 overflow-x-hidden min-h-screen">
        {children}
      </main>
    </div>
  );
}
