import * as Blocks from "./Blocks";

export const BLOCK_MAP = {
  section: Blocks.Section,
  paragraph: Blocks.Paragraph,
  note: Blocks.Note,
  list: Blocks.List,
  image: Blocks.Image,
  divider: Blocks.Divider,
  hadith: Blocks.Hadith,
  quote: Blocks.Quote,
  ayah: Blocks.Ayah,
  warning: Blocks.Warning,
  audio: Blocks.Audio,
  footnote: Blocks.Footnote,
};

export function renderBlock(block, key) {
  if (!block || typeof block !== "object") return null;

  const Component = BLOCK_MAP[block.id];

  if (!Component) {
    console.warn("Unknown block id:", block.id);
    return null;
  }

  return (
    <Component
      key={key}
      payload={block.payload}
      renderBlock={renderBlock}
    />
  );
}

