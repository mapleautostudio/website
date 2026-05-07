import { AlertCircle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3"
      style={{
        padding: 16,
        border: "1px solid var(--color-danger)",
        borderRadius: 6,
        background: "rgba(201, 127, 127, 0.08)",
      }}
    >
      <AlertCircle
        size={18}
        strokeWidth={1.5}
        style={{ color: "var(--color-danger)", marginTop: 2, flexShrink: 0 }}
      />
      <span style={{ fontSize: 14, color: "var(--color-fg-1)" }}>{message}</span>
    </div>
  );
}
