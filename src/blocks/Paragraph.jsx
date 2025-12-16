import InlineRenderer from "./InlineRenderer";

export default function Paragraph({ payload, renderBlock }) {
  if (!payload) return null;

  const hasChildren = Array.isArray(payload.children) && payload.children.length > 0;

  return (
    <div className="paragraph-block">
      {hasChildren && (
        <div className="paragraph-children-column">
          {payload.children.map((child, i) => (
            <div key={i} className="paragraph-child">
              {renderBlock ? renderBlock(child, i) : null}
            </div>
          ))}
        </div>
      )}
      {Array.isArray(payload.inlines) && payload.inlines.length > 0 && (
        <div className="paragraph-text">
          <InlineRenderer inlines={payload.inlines} />
        </div>
      )}
      <div style={{ clear: "both" }} />
    </div>
  );
}
