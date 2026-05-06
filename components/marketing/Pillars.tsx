import { Star } from "lucide-react";
import { PILLARS } from "@/lib/content/reviews";

export function Pillars() {
  return (
    <section
      id="process"
      className="section"
      style={{ background: "var(--color-surface-deep)" }}
    >
      <div className="container-x">
        <div className="max-w-190 mb-16">
          <span className="eyebrow block mb-5">WHY HERE</span>
          <h2
            className="m-0 font-display"
            style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            <span className="text-fg-1">Specifics, not</span>{" "}
            <em style={{ color: "var(--color-accent)", opacity: 0.9 }}>
              slogans.
            </em>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: 1,
            background: "var(--color-hairline)",
            border: "1px solid var(--color-hairline)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="flex flex-col gap-5"
              style={{
                background: "var(--color-surface-deep)",
                padding: "48px 36px",
                minHeight: 320,
              }}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display"
                  style={{
                    fontSize: 92,
                    fontWeight: 200,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                    color: "var(--color-fg-1)",
                  }}
                >
                  {p.big}
                </span>
                {p.smallStar && (
                  <Star
                    size={22}
                    strokeWidth={1.5}
                    className="text-fg-2"
                    style={{ marginLeft: 4 }}
                  />
                )}
                <span
                  className="text-fg-3"
                  style={{
                    fontSize: 16,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.small ?? p.suffix}
                </span>
              </div>

              <h3
                className="m-0 font-body"
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  color: "var(--color-fg-1)",
                }}
              >
                {p.title}
              </h3>

              <p
                className="m-0 text-fg-2 mt-auto"
                style={{ fontSize: 15, lineHeight: 1.6 }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
