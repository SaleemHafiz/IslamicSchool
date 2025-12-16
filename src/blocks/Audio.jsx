export default function Audio({ payload }) {
  if (!payload?.src) throw new Error("Audio block requires src");

  return (
    <div className="card bg-card p-md hover:shadow-lg transition space-y-sm">
      {payload.title && <div className="text-accent">{payload.title}</div>}
      <audio controls src={payload.src} className="w-full" />
    </div>
  );
}
