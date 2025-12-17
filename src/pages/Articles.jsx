import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { usePreferences } from "../contexts/UserPreferencesContext.jsx";

const Articles = () => {
  const meta = useLoaderData(); // full meta.json
  const { subject, level, language } = usePreferences();

  if (!meta?.articles) {
    console.warn("Articles: invalid loader data", meta);
    return null;
  }

  // Filter articles by user preferences
  const filteredArticles = meta.articles.filter((article) => {
    const matchesSubject = article.subjects?.includes(subject);
    const matchesLevel = article.level?.includes(level);
    const hasLanguage = article.title?.[language] && article.path?.[language];

    return matchesSubject && matchesLevel && hasLanguage;
  });

  return (
    <section className="articles-root">
      {/* Meta row (same visual language as Article.jsx) */}
      <div className="article-meta">
        <span className="meta-item">{subject}</span>
        <span className="meta-separator">•</span>
        <span className="meta-item">{level}</span>
        <span className="meta-separator">•</span>
        <span className="meta-item">{language}</span>
      </div>

      {/* Articles list */}
      <div className="articles-list">
        {filteredArticles.length === 0 && (
          <p className="articles-empty">
            No articles available for this selection.
          </p>
        )}

        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}/${level}`}
            className="article-card"
          >
            <h3 className="article-title">
              {article.title[language]}
            </h3>

            {article.description?.[language] && (
              <p className="article-description">
                {article.description[language]}
              </p>
            )}

            <div className="article-tags">
              {article.tags?.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Articles;
