export default function Footnote({ payload }) {
  if (!payload?.text) return null;
  return <small className="text-muted">{payload.text}{payload.reference && ` (${payload.reference})`}</small>;
}
