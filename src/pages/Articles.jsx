import React, { useState, useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { usePreferences } from "../contexts/UserPreferencesContext.jsx";

const Articles = () => {
  const meta = useLoaderData(); // full meta.json
  const { level, language } = usePreferences();

  const [sortBy, setSortBy] = useState("default"); // "default" | "latest"

  if (!meta?.articles) {
    console.warn("Articles: invalid loader data", meta);
    return null;
  }

  // Filter articles that have availability in user's language & level
  const filteredArticles = useMemo(() => {
    return meta.articles
      .map((article) => {
        const avail = article.availability.find(
          (a) => a.lang === language && a.level === level
        );
        if (!avail) return null;
        return {
          ...article,
          title: avail.title,
          description: avail.description,
          publishedDate: avail.publishedDate, // optional if available
        };
      })
      .filter(Boolean);
  }, [meta.articles, language, level]);

  // Sort if needed
  const sortedArticles = useMemo(() => {
    const copy = [...filteredArticles];
    if (sortBy === "latest") {
      copy.sort((a, b) => {
        const da = new Date(a.publishedDate || 0);
        const db = new Date(b.publishedDate || 0);
        return db - da;
      });
    }
    return copy;
  }, [filteredArticles, sortBy]);

  return (
    <div className="p-md">
      {/* Sorter */}
      <div className="filters mb-lg">
        <label className="text-accent font-semibold">Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-sm"
        >
          <option value="default">Default Order</option>
          <option value="latest">Latest Published</option>
        </select>
      </div>

      {/* Article List */}
      <div className="grid gap-lg sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedArticles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}/${level}/${language}`}
            className="card hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold mb-sm">{article.title}</h2>
            <p className="text-muted text-sm">{article.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
