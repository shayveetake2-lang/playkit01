import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "PLAYKIT 01 — Archival Formulas & Physical Editions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF9F5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          border: "16px solid #121212",
          fontFamily: "serif",
        }}
      >
        {/* Top Masthead Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #E7E5E0",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#7A6A5C",
              fontWeight: 600,
            }}
          >
            PLAYKIT 01 • STUDIO ARCHIVE VOL. 01
          </div>
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#121212",
              fontFamily: "monospace",
            }}
          >
            ISSUE NO. 01 • 2026
          </div>
        </div>

        {/* Center Typography Block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "58px",
              lineHeight: 1.1,
              color: "#121212",
              fontWeight: 400,
              maxWidth: "1000px",
            }}
          >
            Deterministic AI Prompt Blueprints & Archival Physical Editions.
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#666662",
              maxWidth: "850px",
              lineHeight: 1.4,
              fontFamily: "sans-serif",
            }}
          >
            Engineering battle-tested computational formulas across Gemini Image, Claude, and Midjourney alongside heavyweight standard cotton streetwear fulfilled globally via Fourthwall.
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E7E5E0",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "15px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#121212",
              fontFamily: "sans-serif",
            }}
          >
            <span>PROMPTBASE VERIFIED</span>
            <span>•</span>
            <span>FOURTHWALL GLOBAL LOGISTICS</span>
          </div>

          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#7A6A5C",
            }}
          >
            playkit01.store
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

