"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("apnisec-theme");
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "dark");
    }
    setMounted(true);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("apnisec-theme", darkMode ? "dark" : "light");
    }
  }, [darkMode, mounted]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Theme utility classes
export function getThemeClasses(darkMode: boolean) {
  return {
    bgMain: darkMode ? 'bg-black' : 'bg-gray-100',
    textMain: darkMode ? 'text-white' : 'text-gray-900',
    textMuted: darkMode ? 'text-neutral-500' : 'text-gray-700',
    cardBg: darkMode ? 'bg-neutral-900/50' : 'bg-white',
    cardBorder: darkMode ? 'border-white/10' : 'border-gray-300',
    headerBg: darkMode ? 'bg-black/80' : 'bg-white',
    inputBg: darkMode ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200',
    // Use teal for light mode, neon for dark mode
    accentColor: darkMode ? 'text-neon' : 'text-teal-600',
    accentBg: darkMode ? 'bg-neon' : 'bg-teal-600',
    accentBorder: darkMode ? 'border-neon' : 'border-teal-600',
    accentBgLight: darkMode ? 'bg-neon/10' : 'bg-teal-500/10',
    accentBorderLight: darkMode ? 'border-neon/30' : 'border-teal-500/30',
  };
}
