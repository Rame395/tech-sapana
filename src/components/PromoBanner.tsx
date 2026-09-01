"use client";

import { useEffect, useState } from "react";
import { AlarmClock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPromoBanner } from "@/app/actions/banner";

export default function PromoBanner() {
  const [banner, setBanner] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getPromoBanner().then(data => setBanner(data));
  }, []);

  useEffect(() => {
    if (!banner?.targetDate) return;
    
    const target = new Date(banner.targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [banner?.targetDate]);

  if (!mounted || !banner || !banner.isActive) return null; // Avoid hydration mismatch

  const pad = (num: number) => num.toString().padStart(2, "0");

  const TimerBox = ({ value, label }: { value: number, label: string }) => (
    <div className="bg-gray-50 dark:bg-[#121A30] border border-gray-200/60 dark:border-white/5 rounded-xl px-2 py-1.5 min-w-[56px] flex flex-col items-center justify-center shadow-sm dark:shadow-none transition-colors">
      <div className="text-blue-600 dark:text-blue-400 font-extrabold text-xl leading-none mb-1">{pad(value)}</div>
      <div className="text-gray-500 dark:text-[#8F9BBA] text-[0.55rem] uppercase font-bold tracking-widest">{label}</div>
    </div>
  );

  return (
    <div className="w-full bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-white/10 rounded-[2rem] px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl dark:shadow-[0_10px_40px_rgba(37,99,235,0.1)] mb-10 overflow-hidden relative transition-all">
      {/* Background glow effect */}
      <div className="absolute left-10 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Left side: Icon + Text */}
      <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-4 md:gap-6 z-10 text-center md:text-left w-full md:w-auto">
        <div className="bg-blue-600 rounded-full p-4 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] flex-shrink-0 relative">
          <AlarmClock size={28} strokeWidth={2.5} />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <div>
            <span className="bg-red-500 text-white text-[0.65rem] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg dark:shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              {banner.badgeText}
            </span>
          </div>
          <h2 className="text-gray-900 dark:text-white text-xl md:text-2xl font-extrabold tracking-tight max-w-[500px] leading-tight">
            {banner.title}
          </h2>
        </div>
      </div>

      {/* Right side: Timer + Button */}
      <div className="flex flex-col sm:flex-row items-center gap-6 z-10 w-full md:w-auto justify-center md:justify-end">
        <div className="flex items-center gap-1.5">
          <TimerBox value={timeLeft.days} label="Days" />
          <span className="text-gray-300 dark:text-white/20 font-bold mb-3">:</span>
          <TimerBox value={timeLeft.hours} label="Hrs" />
          <span className="text-gray-300 dark:text-white/20 font-bold mb-3">:</span>
          <TimerBox value={timeLeft.minutes} label="Mins" />
          <span className="text-gray-300 dark:text-white/20 font-bold mb-3">:</span>
          <TimerBox value={timeLeft.seconds} label="Secs" />
        </div>

        <Link href={banner.buttonLink} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-extrabold px-6 py-3.5 rounded-full whitespace-nowrap transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center gap-2">
          {banner.buttonText} <ArrowRight size={18} strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
}
