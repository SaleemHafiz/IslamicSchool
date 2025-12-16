export function InlineRenderer({ inlines }) {
  if (!Array.isArray(inlines)) return null;
  return (
    <>
      {inlines.map((inline, i) => {
        if (!inline || typeof inline !== "object") return null;
        switch (inline.type) {
          case "bold":
            return (
              <strong key={i} className="text-accent">
                {inline.text ?? ""}
              </strong>
            );
          case "italic":
            return (
              <em key={i} className="text-muted">
                {inline.text ?? ""}
              </em>
            );
          case "highlight":
            return (
              <span key={i} className="bg-accent p-xs rounded">
                {inline.text ?? ""}
              </span>
            );
          case "text":
          default:
            return <span key={i}>{inline.text ?? ""}</span>;
        }
      })}
    </>
  );
}

export function Section({ payload, renderBlock }) {
  if (!payload || typeof payload !== "object") return null;
  return (
    <section className="m-lg">
      {payload.heading && <h2>{payload.heading}</h2>}
      {Array.isArray(payload.children) &&
        payload.children.map((child, i) =>
          renderBlock ? renderBlock(child, i) : null
        )}
    </section>
  );
}

export function Paragraph({ payload, renderBlock }) {
  if (!payload) return null;

  const hasChildren =
    Array.isArray(payload.children) && payload.children.length > 0;

  return (
    <div className="paragraph-block">
      {/* Inline text */}
      {Array.isArray(payload.inlines) && (
        <div className="paragraph-text">
          <InlineRenderer inlines={payload.inlines} />
        </div>
      )}

      {/* Child blocks like Image, Note */}
      {hasChildren &&
        payload.children.map((child, i) => (
          <div key={i} className="paragraph-child">
            {renderBlock ? renderBlock(child, i) : null}
          </div>
        ))}
    </div>
  );
}

export function Note({ payload }) {
  if (!payload?.text) return null;
  return <div className="card bg-note m-md text-note">⚠️ {payload.text}</div>;
}

export function List({ payload }) {
  if (!payload || !Array.isArray(payload.items)) return null;
  const Tag = payload.ordered ? "ol" : "ul";
  return (
    <Tag className="m-md">
      {payload.items.map((item, i) => (
        <li key={i} className="m-xs">
          {item}
        </li>
      ))}
    </Tag>
  );
}

export function Image({ payload }) {
  if (!payload?.src) throw new Error("Image block requires src");
  return (
    <div className="m-md">
      <img
        src={payload.src}
        alt={payload.alt ?? ""}
        className="border rounded hover:shadow-lg transition"
      />
    </div>
  );
}

export function Divider() {
  return <div className="divider" />;
}

export function Hadith({ payload }) {
  if (!payload) return null;
  return (
    <div className="card bg-card m-md hover:shadow-lg transition">
      {payload.arabic && <div className="arabic m-sm">{payload.arabic}</div>}
      {payload.translation && <div className="m-sm">{payload.translation}</div>}
      {(payload.source || payload.grade) && (
        <small className="text-muted">
          {payload.source}
          {payload.grade && ` • ${payload.grade}`}
        </small>
      )}
    </div>
  );
}

export function Quote({ payload }) {
  if (!payload?.text) return null;
  return (
    <blockquote className="card bg-quote m-md hover:shadow-lg transition">
      <div className="m-sm">❝ {payload.text}</div>
      {payload.source && (
        <footer className="text-quote">{payload.source}</footer>
      )}
    </blockquote>
  );
}

export function Ayah({ payload }) {
  if (!payload) return null;
  return (
    <div className="card bg-card m-md hover:shadow-lg transition">
      {payload.arabic && <div className="arabic m-sm">{payload.arabic}</div>}
      {payload.translation && <div className="m-sm">{payload.translation}</div>}
      {payload.surah && payload.ayah && (
        <small className="text-muted">
          Surah {payload.surah}, Ayah {payload.ayah}
        </small>
      )}
    </div>
  );
}

export function Warning({ payload }) {
  if (!payload?.text) return null;
  return <div className="card bg-note m-md text-note">⚠️ {payload.text}</div>;
}

export function Audio({ payload }) {
  if (!payload?.src) throw new Error("Audio block requires src");
  return (
    <div className="card bg-card m-md hover:shadow-lg transition">
      {payload.title && <div className="m-sm text-accent">{payload.title}</div>}
      <audio controls src={payload.src} className="m-sm w-full" />
    </div>
  );
}

export function Footnote({ payload }) {
  if (!payload?.text) return null;
  return (
    <small className="text-muted m-sm">
      {payload.text}
      {payload.reference && ` (${payload.reference})`}
    </small>
  );
}

// ===============================
// FILE: Example usage (e.g. Home.jsx)
// ===============================

/*
import { renderBlock } from "@/blocks/blockRegistry";
import { BlockErrorBoundary } from "@/blocks/BlockErrorBoundary";

export default function Home({ data }) {
  return (
    <BlockErrorBoundary>
      {data.map((block, i) => renderBlock(block, i))}
    </BlockErrorBoundary>
  );
}
*/
