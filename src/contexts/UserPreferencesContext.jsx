import React, { createContext, useContext, useState, useEffect } from "react";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState("light");        // light | dark
  const [language, setLanguage] = useState("en"); // en | ur | ar
  const [level, setLevel] = useState("beginner");     // beginner | medium | advanced
  const [subject, setSubject] = useState("quran");

  // ===============================
  // Load from localStorage (once)
  // ===============================
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedLanguage = localStorage.getItem("language");
    const storedLevel = localStorage.getItem("level");
    const storedSubject = localStorage.getItem("subject");

    if (storedTheme) setTheme(storedTheme);
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedLevel) setLevel(storedLevel);
    if (storedSubject) setSubject(storedSubject);
  }, []);

  // ===============================
  // Sync → localStorage + DOM
  // ===============================
  useEffect(() => {
  const root = document.documentElement;

  // theme → CSS
  root.setAttribute("data-theme", theme);

  // language → CSS
  root.setAttribute("data-language", language);

  // level → CSS
  root.setAttribute("data-level", level);

  // direction → global layout
  const isRTL = language === "ur" || language === "ar";
  root.setAttribute("dir", isRTL ? "rtl" : "ltr");

  // Force body font update so it changes immediately
  const font = getComputedStyle(root).getPropertyValue('--font-ui');
  document.body.style.fontFamily = font;

  // persist to localStorage
  localStorage.setItem("theme", theme);
  localStorage.setItem("language", language);
  localStorage.setItem("level", level);
  localStorage.setItem("subject", subject);
}, [theme, language, level, subject]);


  // ===============================
  // Context value
  // ===============================
  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    level,
    setLevel,
    subject,
    setSubject,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

// ===============================
// Hook
// ===============================
export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return ctx;
}
