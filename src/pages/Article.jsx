import React from "react";
import { useLoaderData } from "react-router-dom";
import { renderBlock } from "../blocks/blockRegistry.jsx";
import { BlockErrorBoundary } from "../blocks/BlockErrorBoundary";
import { usePreferences } from "../contexts/UserPreferencesContext.jsx";

const Article = () => {
  const data = useLoaderData();
  const { subject, level } = usePreferences();

  if (!data || !Array.isArray(data.content?.blocks)) {
    console.warn("Article: invalid loader data", data);
    return null;
  }

  return (
    <article className="article-root">
      {/* Meta row */}
      <div className="article-meta">
        <span className="meta-item">{subject}</span>
        <span className="meta-separator">•</span>
        <span className="meta-item">{level}</span>
        <span className="meta-separator">•</span>
        <span className="meta-item">{data.topic}</span>
      </div>

      {/* Content */}
      <BlockErrorBoundary>
        {data.content.blocks.map((block, i) =>
          renderBlock(block, i)
        )}
      </BlockErrorBoundary>
    </article>
  );
};

export default Article;
