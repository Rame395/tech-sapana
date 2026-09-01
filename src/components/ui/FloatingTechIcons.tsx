"use client";

import { motion } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiJavascript, 
  SiPython, 
  SiDocker 
} from "react-icons/si";

export default function FloatingTechIcons() {
  const icons = [
    { Icon: SiReact, top: "12%", left: "4%", delay: 0, size: 50, duration: 8, color: "#61DAFB" },
    { Icon: SiJavascript, top: "82%", left: "6%", delay: 1.2, size: 55, duration: 10, color: "#F7DF1E" },
    { Icon: SiNextdotjs, top: "15%", left: "45%", delay: 0.5, size: 45, duration: 9, color: "#FFFFFF" },
    { Icon: SiNodedotjs, top: "85%", left: "55%", delay: 2.1, size: 55, duration: 11, color: "#339933" },
    { Icon: SiPython, top: "78%", left: "90%", delay: 1.5, size: 45, duration: 7, color: "#FFD43B" },
    { Icon: SiDocker, top: "45%", left: "94%", delay: 0.8, size: 50, duration: 12, color: "#2496ED" },
    { Icon: SiTypescript, top: "10%", left: "85%", delay: 2.5, size: 40, duration: 8.5, color: "#3178C6" },
    { Icon: SiTailwindcss, top: "50%", left: "2%", delay: 0.3, size: 50, duration: 9.5, color: "#06B6D4" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {icons.map((item, i) => {
        const Icon = item.Icon;
        return (
          <motion.div
            key={i}
            className="absolute drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            style={{ top: item.top, left: item.left, color: item.color }}
            animate={{
              y: [0, -25, 10, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 12, -12, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <Icon size={item.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
