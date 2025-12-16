export default function Image({ payload }) {
  if (!payload?.src) throw new Error("Image block requires src");

  return (
    <div className="rounded-lg overflow-hidden border">
      <img
        src={payload.src}
        alt={payload.alt ?? ""}
        className="hover:shadow-lg transition max-w-full h-auto block"
      />
    </div>
  );
}
