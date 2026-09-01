"use client";

import React, { useEffect, useState } from "react";
import { getPromoBanner } from "@/app/actions/banner";

export default function MarqueeBanner() {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getPromoBanner().then(data => {
      setText(data.marqueeText || "");
      setIsActive(data.marqueeIsActive ?? true);
    });
  }, []);

  if (!mounted || !isActive || !text) return null;

  // We repeat the text multiple times to ensure smooth infinite scrolling
  const repeatedText = Array(15).fill(text);

  return (
    <div className="w-full bg-blue-600 border-y border-blue-500 overflow-hidden py-3 relative z-20 flex">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {repeatedText.map((item, index) => (
          <span 
            key={index} 
            className="text-white font-extrabold text-sm md:text-base px-8 tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
