"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  darkMode?: boolean;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  darkMode = true,
  type = "danger",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // Theme classes
  const overlayBg = "bg-black/80 backdrop-blur-sm";
  const cardBg = darkMode ? "bg-neutral-900" : "bg-white";
  const cardBorder = darkMode ? "border-white/10" : "border-gray-200";
  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textMuted = darkMode ? "text-neutral-400" : "text-gray-600";
  
  // Type-based colors
  const typeColors = {
    danger: {
      icon: "text-red-500",
      iconBg: "bg-red-500/10",
      button: "bg-red-500 hover:bg-red-600 text-white",
      glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
    },
    warning: {
      icon: "text-amber-500",
      iconBg: "bg-amber-500/10",
      button: "bg-amber-500 hover:bg-amber-600 text-black",
      glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    },
    info: {
      icon: darkMode ? "text-neon" : "text-teal-500",
      iconBg: darkMode ? "bg-neon/10" : "bg-teal-500/10",
      button: darkMode ? "bg-neon hover:bg-cyan-400 text-black" : "bg-teal-500 hover:bg-teal-600 text-white",
      glow: darkMode ? "shadow-[0_0_30px_rgba(0,240,255,0.3)]" : "shadow-[0_0_30px_rgba(20,184,166,0.3)]",
    },
  };

  const colors = typeColors[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 ${overlayBg} z-[100] flex items-center justify-center p-4`}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`${cardBg} ${cardBorder} border rounded-2xl w-full max-w-md overflow-hidden`}
          >
            {/* Header */}
            <div className={`p-6 border-b ${cardBorder}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${colors.iconBg}`}>
                    <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold font-cabinet text-lg ${textMain}`}>
                      {title}
                    </h3>
                    <p className={`text-sm ${textMuted} mt-1`}>{message}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"} ${textMuted} transition-colors`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Animated Warning Line */}
            <div className="relative h-1 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
                className={`absolute inset-0 ${type === "danger" ? "bg-gradient-to-r from-transparent via-red-500 to-transparent" : type === "warning" ? "bg-gradient-to-r from-transparent via-amber-500 to-transparent" : darkMode ? "bg-gradient-to-r from-transparent via-neon to-transparent" : "bg-gradient-to-r from-transparent via-teal-500 to-transparent"}`}
              />
            </div>

            {/* Actions */}
            <div className={`p-6 ${darkMode ? "bg-black/30" : "bg-gray-50"} flex gap-3 justify-end`}>
              <button
                onClick={onClose}
                className={`px-6 py-3 rounded-xl ${darkMode ? "bg-white/5 hover:bg-white/10 border border-white/10" : "bg-gray-100 hover:bg-gray-200 border border-gray-200"} ${textMuted} font-medium text-sm transition-all`}
              >
                {cancelText}
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className={`px-6 py-3 rounded-xl ${colors.button} ${colors.glow} font-bold text-sm tracking-wide transition-all`}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
