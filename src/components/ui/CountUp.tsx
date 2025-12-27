"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  end: number | string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ 
  end, 
  suffix = "", 
  duration = 2,
  className 
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);
  
  // Parse the numeric part from strings like "849M+" or "99.99%"
  const numericEnd = typeof end === 'string' 
    ? parseFloat(end.replace(/[^\d.]/g, '')) 
    : end;
  
  const extractSuffix = typeof end === 'string'
    ? end.replace(/[\d.]/g, '')
    : suffix;

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(numericEnd * easeOut);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericEnd, duration]);

  // Format the count based on the original format
  const formatCount = () => {
    if (numericEnd >= 1) {
      return Math.round(count).toLocaleString();
    }
    return count.toFixed(2);
  };

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {formatCount()}{extractSuffix}
    </motion.span>
  );
}
