import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

/**
 * 🎨 THEME ENGINE — light / dark mode
 *
 * Tailwind v4 is already configured for class-based dark mode in index.css:
 *   @custom-variant dark (&:where(.dark, .dark *));
 *
 * This provider toggles the `.dark` class on <html>, persists the choice in
 * localStorage, and falls back to the user's OS preference on first visit.
 *
 * Usage:
 *   import { useTheme } from "../context/ThemeContext";
 *   const { theme, toggleTheme, setTheme, isDark } = useTheme();
 */

const STORAGE_KEY = "bookiify_theme";
const ThemeContext = createContext(null);

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  // No saved choice → follow the OS
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme; // native form controls / scrollbars follow
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Apply + persist whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Keep tabs/windows in sync, and follow OS changes only if the user never chose
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue);
      }
    };
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onSystem = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) setThemeState(e.matches ? "dark" : "light");
    };
    window.addEventListener("storage", onStorage);
    mq?.addEventListener?.("change", onSystem);
    return () => {
      window.removeEventListener("storage", onStorage);
      mq?.removeEventListener?.("change", onSystem);
    };
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

export default ThemeContext;
