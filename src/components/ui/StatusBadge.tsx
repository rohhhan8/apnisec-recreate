"use client";
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  darkMode?: boolean;
}

export const StatusBadge = ({ status, className, darkMode = true }: StatusBadgeProps) => {
  const styles = {
    OPEN: darkMode 
      ? "text-green-400 border-green-400/30 bg-green-400/10" 
      : "text-green-600 border-green-500/30 bg-green-500/10",
    IN_PROGRESS: darkMode 
      ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" 
      : "text-yellow-600 border-yellow-500/30 bg-yellow-500/10",
    RESOLVED: darkMode 
      ? "text-blue-400 border-blue-400/30 bg-blue-400/10" 
      : "text-blue-600 border-blue-500/30 bg-blue-500/10",
    CLOSED: darkMode 
      ? "text-neutral-500 border-neutral-500/30 bg-neutral-500/10" 
      : "text-gray-500 border-gray-400/30 bg-gray-100",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-mono font-bold border tracking-wider uppercase",
        styles[status],
        className
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
};
