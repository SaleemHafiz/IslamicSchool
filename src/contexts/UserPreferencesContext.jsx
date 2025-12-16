import React, { createContext, useContext, useState, useEffect } from "react";

const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("english");
  const [level, setLevel] = useState("beginner");
  const [subject, setSubject] = useState("quran");

  // Load from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedLang = localStorage.getItem("language");
    const storedLevel = localStorage.getItem("level");
    const storedSubject = localStorage.getItem("subject");

    if (storedTheme) setTheme(storedTheme);
    if (storedLang) setLanguage(storedLang);
    if (storedLevel) setLevel(storedLevel);
    if (storedSubject) setSubject(storedSubject);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem("level", level);
    localStorage.setItem("subject", subject);

    document.documentElement.setAttribute("data-theme", theme); // For CSS theme
  }, [theme, language, level, subject]);

  return (
    <PreferencesContext.Provider
      value={{ theme, setTheme, language, setLanguage, level, setLevel, subject, setSubject }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
