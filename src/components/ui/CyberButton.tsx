"use client";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface CyberButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'minimal' | 'glass' | 'outline';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const CyberButton = ({
  children,
  className,
  variant = 'primary',
  disabled,
  type,
  onClick,
}: CyberButtonProps) => {
  if (variant === 'minimal') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative px-8 py-3 rounded-md border border-white/20 bg-black text-white transition-all duration-200 hover:bg-neon hover:text-black hover:border-neon hover:shadow-[4px_4px_0px_var(--color-neon-dark)] active:translate-x-0 active:translate-y-0 active:shadow-none",
          className
        )}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }

  if (variant === 'glass') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
          className
        )}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }

  if (variant === 'outline') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative px-8 py-4 rounded-md border border-neon/50 text-neon font-medium tracking-wide transition-all duration-300 hover:bg-neon/10 hover:border-neon hover:shadow-[0_0_15px_rgba(8,203,0,0.3)] flex items-center justify-center gap-2",
          className
        )}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      className={cn(
        "relative w-[160px] h-[54px] rounded-[50px] border-none outline-none cursor-pointer overflow-hidden shadow-[0_15px_30px_rgba(0,15,0,0.4)] bg-gradient-to-t from-neon-dark to-neon text-white font-bold tracking-widest uppercase text-xs group",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <span className="absolute w-full top-1/2 left-0 -translate-y-1/2 transition-all duration-500 group-hover:-top-full">
        {children}
      </span>
      <span className="absolute w-full top-[150%] left-0 -translate-y-1/2 transition-all duration-500 group-hover:top-1/2 text-black">
        {children}
      </span>
    </motion.button>
  );
};
