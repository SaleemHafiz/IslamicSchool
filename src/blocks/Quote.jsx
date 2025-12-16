export default function Quote({ payload }) {
  if (!payload?.text) return null;

  return (
    <blockquote className="card bg-quote p-md hover:shadow-lg transition space-y-sm">
      <div>❝ {payload.text}</div>
      {payload.source && <footer className="text-quote">{payload.source}</footer>}
    </blockquote>
  );
}
