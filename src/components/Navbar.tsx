"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-2 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
      <nav className="pointer-events-auto w-full lg:w-auto rounded-[2rem] bg-white/70 dark:bg-[#0B1121]/70 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-4 py-2.5 flex items-center justify-between lg:justify-center lg:gap-16 transition-all">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-extrabold text-[0.95rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_2px_10px_rgba(37,99,235,0.4)]">
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
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all shadow-sm"
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="4.22" x2="19.78" y2="5.64" /></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          <Link
            href="/contact"
            className="hidden lg:flex px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-[0.85rem] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_20px_rgba(37,99,235,0.5)] hover:-translate-y-[1px] transition-all whitespace-nowrap"
          >
            Let's Talk
          </Link>
          
          <button className="lg:hidden text-gray-900 dark:text-white p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>
    </div>
  );
}
