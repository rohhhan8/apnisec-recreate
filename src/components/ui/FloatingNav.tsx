"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

export const FloatingNav = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Services", link: "#services" },
    { name: "Clients", link: "#clients" },
    { name: "Resources", link: "#resources" },
    { name: "FAQ", link: "#faq" },
  ];

  const navContent = (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed z-[9999] top-4 md:top-6 inset-x-0 mx-auto max-w-6xl flex gap-3 px-3 md:px-4",
          className
        )}
      >
        <div className="w-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-2xl">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
               <div className="relative w-20 md:w-25 h-8">
                  <Image src="/logo.svg" alt="ApniSec" fill className="object-contain" priority />
               </div>
          </div>

          {/* Navigation Links (Desktop - Centered) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item, idx) => (
              <Link
                  key={idx}
                  href={item.link}
                  className="text-s font-bold text-white/70 hover:text-white transition-colors tracking-wide"
              >
                  {item.name}
              </Link>
              ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
              <Link href="/login" className="hidden sm:block text-sm font-bold text-white hover:text-neutral-300 transition-colors">
                  Log in
              </Link>
              
              <Link href="/register" className="hidden sm:block">
                  <button className="flex items-center gap-2 border border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 rounded-full px-4 md:px-6 py-2 transition-all duration-300 group">
                      <span className="text-sm font-bold text-white group-hover:text-neon transition-colors">Sign Up</span>
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-neon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-neon transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[9998] top-20 inset-x-0 mx-3 md:hidden"
          >
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-white/80 hover:text-neon transition-colors py-2 border-b border-white/5"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex flex-col gap-3 pt-4">
                <Link 
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 border border-white/20 rounded-full text-white font-bold hover:bg-white/5 transition-all"
                >
                  Log in
                </Link>
                <Link 
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-neon text-black rounded-full font-bold hover:bg-white transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // Use portal to render nav directly to document.body, bypassing all transforms
  if (!mounted) return null;
  return createPortal(navContent, document.body);
};
