"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Dummy Logos using text for now, replacing with SVGs in prod
const companies = [
  "CyberCorp", "NetDefend", "SecuRity", "AuthZero", "HashLock", "BioKey"
];

export const TrustSection = () => {
  return (
    <div className="py-10 bg-transparent flex flex-col items-center justify-center relative overflow-hidden">
      <h3 className="text-xl font-mono text-neutral-500 mb-10 uppercase tracking-[0.2em] relative z-10">
         Trusted By Industry Leaders
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto px-10 relative z-10">
        {companies.map((company, idx) => (
           <motion.div
             key={idx}
             whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #08CB00", color: "#08CB00" }}
             className="flex items-center justify-center p-6 border border-white/5 rounded-xl bg-white/5 backdrop-blur-sm cursor-crosshair transition-all duration-300 group"
           >
              <span className="text-xl font-bold text-neutral-600 group-hover:text-neon transition-colors">
                {company}
              </span>
           </motion.div>
        ))}
      </div>
      
      {/* Background glow for "Trust" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon opacity-[0.05] blur-[150px]" />
    </div>
  );
};
