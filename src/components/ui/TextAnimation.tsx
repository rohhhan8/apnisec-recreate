"use client";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface TextAnimationProps {
  text: string;
  className?: string;
  direction?: Direction;
  as?: React.ElementType;
  lineAnime?: boolean; // Kept for compatibility, though we might simpler logic
}

export default function TextAnimation({
  text,
  className,
  direction = "up",
  as: Component = "p",
  lineAnime = false,
}: TextAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const getVariants = (): Variants => {
    const x = direction === "left" ? 40 : direction === "right" ? -40 : 0;
    const y = direction === "up" ? 40 : direction === "down" ? -40 : 0;

    return {
      hidden: {
        filter: "blur(10px)",
        opacity: 0,
        x,
        y,
      },
      visible: {
        filter: "blur(0px)",
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    };
  };

  return (
    <Component
      ref={ref}
      className={cn("block", className)} // Changed to block to behave like h2/p usually
    >
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
        className="inline-block" // Wrapper for valid transform
      >
        {text}
      </motion.span>
    </Component>
  );
}
