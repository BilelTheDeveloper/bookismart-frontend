import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/**
 * 🌗 ThemeToggle — animated light/dark switch.
 *
 * Props:
 *   variant: "icon" (default) | "pill"
 *   className: extra classes for the wrapper button
 */
const ThemeToggle = ({ variant = "icon", className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  const base =
    "relative inline-flex items-center justify-center rounded-xl border transition-all " +
    "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 " +
    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700";

  const sizing = variant === "pill" ? "h-9 px-3 gap-2 text-xs font-bold" : "h-9 w-9";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`${base} ${sizing} ${className}`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon size={17} className="text-indigo-300" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun size={17} className="text-amber-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {variant === "pill" && <span>{isDark ? "Dark" : "Light"}</span>}
    </button>
  );
};

export default ThemeToggle;
