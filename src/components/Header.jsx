import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { usePreferences } from "../contexts/UserPreferencesContext";
import strings from "../utils/strings";

export default function Header({ meta }) {
  const location = useLocation();
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    level,
    setLevel,
    subject,
    setSubject,
  } = usePreferences();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const getLinkClass = (path) => (location.pathname === path ? "active" : "");
  const t = strings[language];

  return (
    <header className="header-container">
      <div className="logo">IslamicSchool</div>

      <nav className="nav-links">
        <Link to="/" className={getLinkClass("/")}>
          {t.navbar.home}
        </Link>
        <Link to="/articles" className={getLinkClass("/articles")}>
          {t.navbar.articles}
        </Link>
        <Link
          to="/about"
          className={getLinkClass("/about")}
        >
          {t.navbar.about}
        </Link>
        {/* <Link to="/about" className={getLinkClass("/about")}>About</Link> */}
      </nav>

      <div className="filters">
        {/* Language select */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {meta.languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang[language]} {/* display name in current user language */}
            </option>
          ))}
        </select>

        {/* Level select (display in user language) */}
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          {meta.levels.map((lvl) => (
            <option key={lvl.en} value={lvl.en}>
              {lvl[language]} {/* dynamically show in current language */}
            </option>
          ))}
        </select>

        {/* Subject select (display in user language) */}
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {meta.subjects.map((subj) => (
            <option key={subj.en} value={subj.en}>
              {subj[language]} {/* dynamically show in current language */}
            </option>
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
