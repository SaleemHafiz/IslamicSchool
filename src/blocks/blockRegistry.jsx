import Section from "./Section";
import Paragraph from "./Paragraph";
import Note from "./Note";
import List from "./List";
import Image from "./Image";
import Divider from "./Divider";
import Hadith from "./Hadith";
import Quote from "./Quote";
import Ayah from "./Ayah";
import Warning from "./Warning";
import Audio from "./Audio";
import Footnote from "./Footnote";

export const BLOCK_MAP = {
  section: Section,
  paragraph: Paragraph,
  note: Note,
  list: List,
  image: Image,
  divider: Divider,
  hadith: Hadith,
  quote: Quote,
  ayah: Ayah,
  warning: Warning,
  audio: Audio,
  footnote: Footnote,
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
