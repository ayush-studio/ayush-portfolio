import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ayush Kumar — Senior Frontend & AI Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.25) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
          fontFamily: "sans-serif",
          color: "#f8fafc",
          border: "2px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Top Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(99, 102, 241, 0.5)",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            DELOITTE USI · 2024 – PRESENT
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(52, 211, 153, 0.4)",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            🏆 Deloitte Applause Award Winner
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Ayush Kumar
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#818cf8",
              margin: 0,
            }}
          >
            Senior Frontend &amp; AI Systems Architect
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              margin: 0,
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            React 19 · Angular 17 · TypeScript · Next.js · GenAI UI Workflows · High-Throughput Web Systems
          </p>
        </div>

        {/* Bottom Footer Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "18px",
            color: "#64748b",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span>github.com/ayush-studio</span>
            <span>·</span>
            <span>Bengaluru, India</span>
          </div>
          <div style={{ color: "#34d399", fontWeight: 700 }}>
            ● Open for Senior UI / Frontend Roles
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
