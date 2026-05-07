export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="text-center"
      style={{
        padding: "64px 24px",
        border: "1px solid var(--color-hairline)",
        borderRadius: 6,
      }}
    >
      <p className="m-0 meta" style={{ fontSize: 13 }}>
        {label.toUpperCase()}
      </p>
    </div>
  );
}
