export default function Hadith({ payload }) {
  if (!payload) return null;

  return (
    <div className="card bg-card p-md hover:shadow-lg transition space-y-sm">
      {payload.arabic && <div className="ar">{payload.arabic}</div>}
      {payload.translation && <div>{payload.translation}</div>}
      {(payload.source || payload.grade) && (
        <small className="text-muted">{payload.source}{payload.grade && ` • ${payload.grade}`}</small>
      )}
    </div>
  );
}
