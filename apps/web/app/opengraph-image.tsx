import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Maple Auto Studio — Finish, calibrated.";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#0B0B0D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#D4A574",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            MAPLE
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(245, 242, 236, 0.6)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            AUTO STUDIO
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "rgba(212, 165, 116, 0.2)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#F5F2EC",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Finish, calibrated.
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "rgba(245, 242, 236, 0.6)",
              letterSpacing: "0.01em",
            }}
          >
            Independent detailing studio · Saskatoon, SK
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "#D4A574",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.05em",
            }}
          >
            mapleautostudio.ca
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
