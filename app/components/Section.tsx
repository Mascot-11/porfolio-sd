"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id: string;
}

export function Section({
  children,
  className = "",
  delay = 0,
  id,
}: SectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={`py-12 ${className}`}
    >
      {children}
    </motion.section>
  );
}
