import React from "react";
import { useLoaderData } from "react-router-dom";
import { renderBlock } from "../blocks/blockRegistry";
import { BlockErrorBoundary } from "../blocks/BlockErrorBoundary";

export default function Home() {
  const data = useLoaderData() ?? []; // fallback to empty array

  return (
    <BlockErrorBoundary>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((block, i) => renderBlock(block, i))
      ) : (
        <p>No content available.</p>
      )}
    </BlockErrorBoundary>
  );
}
