export default function Ayah({ payload }) {
  if (!payload) return null;

  return (
    <div className="card bg-card p-md hover:shadow-lg transition space-y-sm">
      {payload.arabic && <div className="ar">{payload.arabic}</div>}
      {payload.translation && <div>{payload.translation}</div>}
      {payload.surah && payload.ayah && <small className="text-muted">Surah {payload.surah}, Ayah {payload.ayah}</small>}
    </div>
  );
}
