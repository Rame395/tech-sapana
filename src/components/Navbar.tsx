"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto w-full lg:w-auto rounded-[2rem] bg-white/70 dark:bg-[#0B1121]/70 backdrop-blur-2xl border border-gray-200/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-4 py-2.5 flex items-center justify-between lg:justify-center lg:gap-16 transition-all">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center !text-white font-extrabold text-[0.95rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_2px_10px_rgba(37,99,235,0.4)]">
            TS
          </div>
          <span className="text-[1.25rem] font-extrabold text-gray-900 dark:text-white tracking-tight hidden sm:block">
            TechSapana
          </span>
        </Link>

        {/* NEUMORPHIC PILL LINKS */}
        <div className="hidden lg:flex items-center bg-gray-100/50 dark:bg-[#000000]/40 p-1.5 rounded-full border border-gray-200/50 dark:border-white/5 shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
          <ul className="flex items-center gap-1 list-none relative">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const isHovered = hoveredPath === item.path;
              
              return (
                <li key={item.name} className="relative z-10" onMouseEnter={() => setHoveredPath(item.path)} onMouseLeave={() => setHoveredPath(pathname)}>
                  <Link
                    href={item.path}
                    className={`relative px-5 py-2 rounded-full text-[0.85rem] font-bold block transition-colors duration-200 ${
                      isActive || isHovered ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-[#8F9BBA] hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                    
                    {/* The Sliding Pill */}
                    {isHovered && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white dark:bg-[#1A2235] rounded-full shadow-sm border border-gray-200 dark:border-white/5 -z-10"
                        style={{
                          boxShadow: theme === "dark" 
                            ? "inset 0 1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.5)" 
                            : "0 2px 10px rgba(0,0,0,0.05)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 pr-1">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all shadow-sm overflow-hidden"
            aria-label="Toggle Theme"
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <Sun className={`absolute w-5 h-5 text-amber-500 transition-all duration-500 transform ${theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 group-hover:rotate-45"}`} />
              <Moon className={`absolute w-5 h-5 text-blue-400 transition-all duration-500 transform ${theme === "dark" ? "rotate-0 scale-100 opacity-100 group-hover:-rotate-12" : "-rotate-90 scale-0 opacity-0"}`} />
            </div>
          </button>

          <Link
            href="/contact"
            className="hidden lg:flex px-5 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 rounded-full text-[0.85rem] font-bold transition-all whitespace-nowrap"
          >
            Contact
          </Link>

          <Link
            href="/courses"
            className="hidden lg:flex px-5 py-2 bg-blue-600 hover:bg-blue-500 !text-white rounded-full text-[0.85rem] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_20px_rgba(37,99,235,0.5)] hover:-translate-y-[1px] transition-all whitespace-nowrap"
          >
            Enroll Now
          </Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-900 dark:text-white p-2 relative z-50"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[49] bg-white/95 dark:bg-[#0B1121]/98 backdrop-blur-3xl flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-3 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-bold py-3 border-b border-gray-100 dark:border-white/5 ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-xl text-base font-bold"
                >
                  Contact Us
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center bg-blue-600 text-white rounded-xl text-base font-bold shadow-lg shadow-blue-500/30"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
