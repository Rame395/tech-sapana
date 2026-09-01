"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrLogin = pathname.startsWith("/admin") || pathname.startsWith("/login");

  if (isAdminOrLogin) {
    return (
      <main className="flex-grow">
        <Toaster position="top-center" toastOptions={{ style: { background: "#1E293B", color: "#fff" } }} />
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Toaster position="top-center" />
        {children}
      </main>
      <Footer />
    </>
  );
}
