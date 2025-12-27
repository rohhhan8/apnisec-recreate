"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Settings, 
  Users, 
  Shield, 
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  activeItem?: string;
  darkMode?: boolean;
  loggingOut?: boolean;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "threats", label: "Threat Feed", icon: AlertTriangle, href: "/dashboard?tab=feed" },
  { id: "reports", label: "Reports", icon: FileText, href: "/dashboard?tab=report" },
  { id: "team", label: "Team", icon: Users, href: "/dashboard/team" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar({ 
  isOpen, 
  onToggle, 
  onLogout,
  activeItem = "dashboard",
  darkMode = true,
  loggingOut = false
}: SidebarProps) {
  
  const bgColor = darkMode ? "bg-neutral-950" : "bg-white";
  const borderColor = darkMode ? "border-white/10" : "border-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-900";
  const mutedColor = darkMode ? "text-neutral-400" : "text-gray-500";
  const hoverBg = darkMode ? "hover:bg-white/5" : "hover:bg-gray-100";
  // Accent colors - teal for light mode, neon for dark mode
  const accentText = darkMode ? "text-neon" : "text-teal-600";
  const accentBg = darkMode ? "bg-neon/10" : "bg-teal-500/10";
  const accentBorder = darkMode ? "border-neon/30" : "border-teal-500/30";
  const logoBg = darkMode ? "bg-gradient-to-br from-neon/20 to-neon/5" : "bg-gradient-to-br from-teal-500/20 to-teal-500/5";

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 84,
          x: 0
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed left-0 top-0 h-screen z-50 flex flex-col",
          bgColor,
          `border-r ${borderColor}`,
          "lg:translate-x-0",
          !isOpen && "max-lg:-translate-x-full"
        )}
      >
        {/* Logo Area */}
        <div className={`h-20 flex items-center justify-between px-4 border-b ${borderColor}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${logoBg} flex items-center justify-center border ${accentBorder} shrink-0`}>
              <Shield className={`w-5 h-5 ${accentText}`} />
            </div>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className={`text-lg font-black font-cabinet tracking-tight whitespace-nowrap overflow-hidden ${textColor}`}
                >
                  ApniSec
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          {/* Toggle Button - Desktop */}
          <button
            onClick={onToggle}
            className={cn(
              "hidden lg:flex p-2 rounded-lg transition-colors shrink-0",
              mutedColor,
              hoverBg,
              `hover:${textColor}`
            )}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {/* Close for mobile */}
          <button
            onClick={onToggle}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              mutedColor,
              hoverBg
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                  isActive 
                    ? `${accentBg} ${accentText} border ${accentBorder}` 
                    : cn(mutedColor, hoverBg, `hover:${textColor}`)
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && accentText)} />
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Profile & Logout */}
        <div className={`p-3 border-t ${borderColor} space-y-1`}>
          {/* Profile Link */}
          <Link
            href="/profile"
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
              activeItem === "profile"
                ? `${accentBg} ${accentText} border ${accentBorder}`
                : cn(mutedColor, hoverBg, `hover:${textColor}`)
            )}
          >
            <Users className="w-5 h-5 shrink-0" />
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium text-sm whitespace-nowrap overflow-hidden"
                >
                  Profile
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            disabled={loggingOut}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
              "text-red-400 hover:bg-red-500/10 hover:text-red-300",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium text-sm whitespace-nowrap overflow-hidden"
                >
                  {loggingOut ? "Exiting..." : "Logout"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Footer Badge */}
        <div className={`p-3 border-t ${borderColor}`}>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <span className={`text-xs font-mono ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`}>
                  v1.0.0 • Console
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <span className={`text-xs font-mono ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`}>v1</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
