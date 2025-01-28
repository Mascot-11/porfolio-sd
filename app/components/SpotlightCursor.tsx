"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const SpotlightCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      animate={{
        background: `radial-gradient(circle 200px at ${mousePosition.x}px ${
          mousePosition.y
        }px, ${
          theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"
        }, transparent 50%)`,
      }}
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
        animate={{
          clipPath: `circle(80px at ${mousePosition.x}px ${mousePosition.y}px)`,
        }}
      />
    </motion.div>
  );
};
