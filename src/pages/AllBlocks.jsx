import React from "react";
import { useLoaderData } from "react-router-dom";
import { renderBlock } from "../blocks/blockRegistry.jsx";
import { BlockErrorBoundary } from "../blocks/BlockErrorBoundary";

const AllBlocks = () => {
  const data = useLoaderData();

  if (!Array.isArray(data)) {
    console.warn("AllBlocks: loader data is not an array", data);
    return null;
  }

  return (
    <BlockErrorBoundary>
      {data.map((block, i) => renderBlock(block, i))}
    </BlockErrorBoundary>
  );
};

export default AllBlocks;
