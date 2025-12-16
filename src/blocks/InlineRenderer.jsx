export default function InlineRenderer({ inlines }) {
  if (!Array.isArray(inlines)) return null;

  return (
    <>
      {inlines.map((inline, i) => {
        if (!inline || typeof inline !== "object") return null;

        switch (inline.type) {
          case "bold":
            return <strong key={i} className="text-accent">{inline.text ?? ""}</strong>;
          case "italic":
            return <em key={i} className="text-muted">{inline.text ?? ""}</em>;
          case "highlight":
            return <span key={i} className="bg-accent p-xs rounded">{inline.text ?? ""}</span>;
          case "text":
          default:
            return <span key={i}>{inline.text ?? ""}</span>;
        }
      })}
    </>
  );
}
