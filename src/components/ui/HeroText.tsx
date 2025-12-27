"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface HeroTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
}

export default function HeroText({ 
  text, 
  className,
  highlightWords = [],
  highlightClassName = "text-neon"
}: HeroTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      className={cn("flex flex-wrap justify-center gap-x-4 gap-y-2", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, idx) => {
        const isHighlight = highlightWords.some(hw => 
          word.toLowerCase().includes(hw.toLowerCase())
        );
        
        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className={cn(
              "inline-block",
              isHighlight && highlightClassName
            )}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
