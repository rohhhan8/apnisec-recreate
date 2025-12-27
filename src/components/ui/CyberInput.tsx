"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  darkMode?: boolean;
}

const CyberInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, darkMode = true, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-md border px-4 py-2 text-sm placeholder:font-satoshi focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
            darkMode 
              ? "border-white/20 bg-black/50 text-white placeholder:text-neutral-400 focus:border-neon focus:ring-neon/50" 
              : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/50",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Glow effect on hover/focus */}
        <div className={cn(
          "absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300",
          darkMode ? "bg-neon/5" : "bg-teal-500/5"
        )} />
      </div>
    );
  }
);
CyberInput.displayName = "CyberInput";

export { CyberInput };
