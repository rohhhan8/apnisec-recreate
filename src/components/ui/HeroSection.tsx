"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";
import { CyberButton } from "./CyberButton";
import HeroText from "./HeroText";

const BRAND_NAMES = [
  'Amazon', 'Red Bull', 'Dell', 'Apple', 'Microsoft', 
  'Domino\'s', 'Figma', 'Uber', 'Netflix', 'Meta',
  'Google', 'Tesla', 'Adobe', 'Spotify', 'Nike'
];

export const HeroSection = () => {
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % 3); // Cycle through 3 groups of 5
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleBrands = BRAND_NAMES.slice(currentGroup * 5, (currentGroup + 1) * 5);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Static Gradient Background - No overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/grad.jpg" 
          alt="Neon Gradient Background" 
          fill
          priority
          className="object-cover rotate-180"
        />
        <div className="absolute inset-0 bg-black/10" /> 
      </div>

      {/* Desktop: Centered | Mobile: Left-aligned with darker text for visibility on bright areas */}
      <div className="z-20 flex flex-col items-start md:items-center text-left md:text-center space-y-6 md:space-y-8 px-5 md:px-4 max-w-7xl w-full md:mx-auto mt-24 md:mt-10">
        
        {/* Premium Animated Headlines - Dark shadow for visibility */}
        <div className="flex flex-col items-start md:items-center gap-2 md:gap-4">
           <HeroText 
               text="Defend Against Cyber Threats"
               highlightWords={["Cyber", "Threats"]}
               highlightClassName="text-neon"
               className="text-[2rem] leading-tight sm:text-5xl md:text-8xl font-black tracking-tight"
           />
           
           <HeroText 
               text="Before They Strike"
               className="text-[1.75rem] leading-tight sm:text-4xl md:text-7xl font-bold tracking-tight text-white"
           />
        </div>

        {/* Subtext Description - Darker text shadow for bright background */}
        <p className="max-w-3xl mt-2 md:mt-3 text-left md:text-center text-sm md:text-xl font-medium leading-relaxed tracking-wide text-neutral-100">
            Elevate your security posture with advanced solutions and in-depth vulnerability assessments, aligned with{' '}
            <span className="text-white font-bold">OWASP, NIST, SANS, CERT, & NIC.</span>
        </p>
        
        {/* CTAs - Smaller, more compact on mobile */}
        <div className="flex flex-row items-center gap-3 md:gap-6 pt-4 md:pt-8">
           {/* Download Report */}
           <CyberButton variant="outline" className="rounded-full border border-white/30 bg-black/60 hover:bg-white/10 text-white hover:text-white text-xs md:text-sm font-bold tracking-wider md:tracking-widest px-4 md:px-8 py-3 md:py-4 backdrop-blur-md transition-all duration-300 group hover:scale-105 shadow-lg">
              <Download className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              <span className="hidden sm:inline">DOWNLOAD </span>REPORT
           </CyberButton>
           
           {/* Get Quote */}
           <CyberButton variant="glass" className="rounded-full bg-black/60 border border-white/30 hover:bg-white/10 hover:border-neon/50 text-white hover:text-neon text-xs md:text-sm font-black tracking-wider md:tracking-widest px-5 md:px-10 py-3 md:py-4 transition-all duration-300 shadow-lg">
              GET QUOTE
           </CyberButton>
        </div>

        {/* Social Proof - Dark backgrounds for visibility */}
        <div className="flex flex-col items-start md:items-center gap-3 md:gap-6 mt-8 md:mt-16 w-full max-w-5xl">
            <span className="text-black font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-[10px] md:text-xs px-3 py-1">
                TRUSTED BY 100+ ORGANIZATIONS
            </span>
            
            <div className="h-8 md:h-10 w-full flex items-center justify-start md:justify-center relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentGroup}
                        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-wrap justify-start md:justify-center items-center gap-4 md:gap-16"
                    >
                        {visibleBrands.slice(0, 5).map((brand) => (
                            <span 
                                key={brand} 
                                className="text-sm md:text-2xl font-black font-cabinet text-black/70 md:text-black/60 hover:text-white transition-colors cursor-default [text-shadow:_1px_1px_8px_rgb(255_255_255_/_50%)] md:[text-shadow:none]"
                            >
                                {brand}
                            </span>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* Mobile: Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="md:hidden mt-6"
        >
          <ArrowDown className="w-5 h-5 text-black/50" />
        </motion.div>

      </div>
    </div>
  );
};
