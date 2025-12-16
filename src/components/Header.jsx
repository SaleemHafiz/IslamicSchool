import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { usePreferences } from "../contexts/UserPreferencesContext";

export default function Header({ meta }) {
  const location = useLocation();
  const { theme, setTheme, language, setLanguage, level, setLevel, subject, setSubject } = usePreferences();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const getLinkClass = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="header-container">
      <div className="logo">IslamicSchool</div>

      <nav className="nav-links">
        <Link to="/" className={getLinkClass("/")}>Home</Link>
        <Link to="/blocks" className={getLinkClass("/blocks")}>All Blocks</Link>
        <Link to="/article" className={getLinkClass("/article")}>Article</Link>
        {/* <Link to="/about" className={getLinkClass("/about")}>About</Link> */}
      </nav>

      <div className="filters">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {meta.languages.map((lang) => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))}
        </select>

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          {meta.levels.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl.charAt(0).toUpperCase() + lvl.slice(1)}</option>
          ))}
        </select>

        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {meta.subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>

        {/* Theme toggle using FontAwesome */}
        <button onClick={toggleTheme} className="theme-toggle">
          <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
        </button>
      </div>
    </header>
  );
}
