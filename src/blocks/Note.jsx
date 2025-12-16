export default function Note({ payload }) {
  if (!payload?.text) return null;
  return <div className="card bg-note p-md text-note">⚠️ {payload.text}</div>;
}
