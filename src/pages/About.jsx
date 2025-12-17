import { usePreferences } from "../contexts/UserPreferencesContext";
import { renderBlock } from "../blocks/blockRegistry";
import { ABOUT_BLOCKS } from "../utils/aboutContent";
import { BlockErrorBoundary } from "../blocks/BlockErrorBoundary";

export default function About() {
  const { language } = usePreferences();

  const blocks = ABOUT_BLOCKS[language] ?? ABOUT_BLOCKS.en;

  return (
    <BlockErrorBoundary>
      {blocks.map((block, i) => renderBlock(block, i))}
    </BlockErrorBoundary>
  );
}
