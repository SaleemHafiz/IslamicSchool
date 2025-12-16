export default function Section({ payload, renderBlock }) {
  if (!payload || typeof payload !== "object") return null;

  return (
    <section className="flex flex-col gap-2 m-6 p-2">
      {payload.heading && (
        <h2 className="text-lg font-semibold">{payload.heading}</h2>
      )}
      {Array.isArray(payload.children) &&
        payload.children.map((child, i) =>
          renderBlock ? renderBlock(child, i) : null
        )}
    </section>
  );
}
