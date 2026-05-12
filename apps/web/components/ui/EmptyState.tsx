import type { ReactNode } from "react";

export function EmptyState({
  title,
  action,
}: {
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      className="text-center"
      style={{
        padding: "64px 24px",
        border: "1px dashed var(--color-hairline)",
        borderRadius: 6,
      }}
    >
      <p className="m-0 text-fg-2" style={{ fontSize: 15 }}>
        {title}
      </p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
