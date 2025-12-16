import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ meta }) {
  const location = useLocation();

  const [selectedLang, setSelectedLang] = useState(meta.languages[0]);
  const [selectedLevel, setSelectedLevel] = useState(meta.levels[0]);
  const [selectedSubject, setSelectedSubject] = useState(meta.subjects[0]);

  const getLinkClass = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <header>
      {/* Logo */}
      <div className="logo">IslamicSchool</div>

      {/* Navigation */}
      <nav className="flex gap-2 flex-wrap">
        <Link to="/" className={getLinkClass("/")}>Home</Link>
        <Link to="/blocks" className={getLinkClass("/blocks")}>All Blocks</Link>
        <Link to="/about" className={getLinkClass("/about")}>About</Link>
      </nav>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
          {meta.languages.map((lang) => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))}
        </select>

        <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
          {meta.levels.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl.charAt(0).toUpperCase() + lvl.slice(1)}</option>
          ))}
        </select>

        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          {meta.subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
