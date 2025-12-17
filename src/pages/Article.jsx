import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { renderBlock } from "../blocks/blockRegistry.jsx";
import { BlockErrorBoundary } from "../blocks/BlockErrorBoundary";
import { usePreferences } from "../contexts/UserPreferencesContext.jsx";
import api from "../utils/axios.js";

const Article = () => {
  const { topic, level: urlLevel, language: urlLang } = useParams();
  const { language: userLang, level: userLevel, subject } = usePreferences();
  const navigate = useNavigate();

  // State for current params loaded from URL
  const [currentLang, setCurrentLang] = useState(urlLang || userLang);
  const [currentLevel, setCurrentLevel] = useState(urlLevel || userLevel);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync URL → state on initial render
  useEffect(() => {
    if (urlLang) setCurrentLang(urlLang);
    if (urlLevel) setCurrentLevel(urlLevel);
  }, [urlLang, urlLevel]);

  // Fetch article whenever topic, currentLevel, or currentLang changes
  useEffect(() => {
    if (!topic || !currentLevel || !currentLang) return;
    setLoading(true);

    async function fetchArticle() {
      try {
        const res = await api.get(
          `https://raw.githubusercontent.com/SaleemHafiz/db/main/islamicschool/articles/${topic}/${currentLevel}/${currentLang}.json`
        );
        setData(res.data);
      } catch (err) {
        console.error("Failed to load article:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [topic, currentLevel, currentLang]);

  useEffect(() => {
    // Only auto-update if the current article matches user preferences
    if (currentLang === urlLang && currentLevel === urlLevel) {
      if (userLang !== currentLang || userLevel !== currentLevel) {
        setCurrentLang(userLang);
        setCurrentLevel(userLevel);
        navigate(`/article/${topic}/${userLevel}/${userLang}`);
      }
    }
  }, [userLang, userLevel]);

  if (loading) return <div>Loading article...</div>;
  if (!data || !Array.isArray(data.content?.blocks)) {
    return <div>Article not found or invalid format.</div>;
  }

  // Determine if suggestions need to be shown
  const showLangSuggestion = currentLang !== userLang;
  const showLevelSuggestion = currentLevel !== userLevel;

  const handleChangeLang = () => {
    setCurrentLang(userLang);
    navigate(`/article/${topic}/${currentLevel}/${userLang}`);
  };

  const handleChangeLevel = () => {
    setCurrentLevel(userLevel);
    navigate(`/article/${topic}/${userLevel}/${currentLang}`);
  };

  const handleChangeBoth = () => {
    setCurrentLang(userLang);
    setCurrentLevel(userLevel);
    navigate(`/article/${topic}/${userLevel}/${userLang}`);
  };

  return (
    <article className="article-root">
      {/* Top suggestion cards */}
      {(showLangSuggestion || showLevelSuggestion) && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {showLangSuggestion && !showLevelSuggestion && (
            <button
              className="card cursor-pointer bg-accent text-bg p-sm rounded"
              onClick={handleChangeLang}
            >
              Read in {userLang.toUpperCase()}
            </button>
          )}
          {showLevelSuggestion && !showLangSuggestion && (
            <button
              className="card cursor-pointer bg-accent text-bg p-sm rounded"
              onClick={handleChangeLevel}
            >
              Switch to {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)}
            </button>
          )}
          {showLangSuggestion && showLevelSuggestion && (
            <button
              className="card cursor-pointer bg-accent text-bg p-sm rounded"
              onClick={handleChangeBoth}
            >
              Read according to your preferences
            </button>
          )}
        </div>
      )}

      {/* Meta row */}
      <div className="article-meta">
        <span className="meta-item">{subject}</span>
        <span className="meta-separator">•</span>
        <span className="meta-item">{currentLevel}</span>
        <span className="meta-separator">•</span>
        <span className="meta-item">{data.topic}</span>
      </div>

      {/* Content */}
      <BlockErrorBoundary>
        {data.content.blocks.map((block, i) => renderBlock(block, i))}
      </BlockErrorBoundary>
    </article>
  );
};

export default Article;
