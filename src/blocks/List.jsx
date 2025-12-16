export default function List({ payload }) {
  if (!payload || !Array.isArray(payload.items)) return null;

  const Tag = payload.ordered ? "ol" : "ul";

  return (
    <Tag className="list-disc ps-lg">
      {payload.items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  );
}
