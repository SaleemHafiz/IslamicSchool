import React from "react";
import { useLoaderData } from "react-router-dom";

// Helper to render blocks recursively
const renderBlock = (block) => {
  const { id, payload } = block;

  switch (id) {
    case "paragraph":
      return (
        <p>
          {payload.inlines.map((inline, idx) => {
            switch (inline.type) {
              case "text":
                return inline.text;
              case "bold":
                return <strong key={idx}>{inline.text}</strong>;
              case "italic":
                return <em key={idx}>{inline.text}</em>;
              default:
                return inline.text;
            }
          })}
        </p>
      );
    case "image":
      return <img src={payload.src} alt={payload.alt} className="rounded w-full" />;
    case "section":
      return (
        <div
          className={`flex ${
            payload.direction === "row" ? "flex-row gap-4 flex-wrap" : "flex-col gap-4"
          } my-4`}
        >
          {payload.heading && <h2 className="text-xl font-bold mb-2">{payload.heading}</h2>}
          {payload.children && payload.children.map((child, idx) => <div key={idx}>{renderBlock(child)}</div>)}
        </div>
      );
    default:
      return null;
  }
};

export default function Home() {
  const homeData = useLoaderData();

  return (
    <div className="home p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">{homeData.title.en} / {homeData.title.ur}</h1>
      </header>

      {/* Hero Section */}
      {homeData.hero && (
        <div className="hero mb-6 flex flex-col md:flex-row items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{homeData.hero.heading.en} / {homeData.hero.heading.ur}</h2>
            <p>{homeData.hero.subheading.en} / {homeData.hero.subheading.ur}</p>
          </div>
          <img src={homeData.hero.image} alt="Hero" className="w-full md:w-1/2 rounded" />
        </div>
      )}

      {/* Sections */}
      {homeData.sections.map((section, idx) => (
        <div key={idx}>{renderBlock(section)}</div>
      ))}
    </div>
  );
}
