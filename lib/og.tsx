import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Shared brand palette for the generated social/OG images.
const PAPER = "#f3f0e8";
const INK = "#16150f";
const INK2 = "#33322a";
const MUTED = "#76746a";
const ACCENT = "#0E7C86";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** 1200×630 Open Graph / Twitter card, rendered at build time with next/og. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: MUTED,
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                background: ACCENT,
                marginRight: 16,
                display: "flex",
              }}
            />
            <div style={{ display: "flex" }}>PORTFOLIO</div>
          </div>
          <div style={{ display: "flex" }}>PRISHTINA · KOSOVO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 700,
              color: INK,
              lineHeight: 1,
              letterSpacing: -5,
            }}
          >
            Arlind Minushi
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 40,
              color: INK2,
            }}
          >
            Senior Software Engineer · Tech Lead · Engineering Manager
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: ACCENT }}>
          <div
            style={{ width: 64, height: 4, background: ACCENT, marginRight: 22, display: "flex" }}
          />
          <div style={{ display: "flex" }}>
            Python · Django · React · Databricks · Azure
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}

// Handwritten signature "A" (Sacramento) for the favicon + Apple touch icon.
// Read once at module scope from disk (works during the static build/prerender).
const sacramentoData = readFileSync(
  join(process.cwd(), "lib", "Sacramento-Regular.ttf")
);

/** Square signature-"A" mark used for the favicon and the Apple touch icon. */
export function renderMonogram(px: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
          color: PAPER,
          fontFamily: "Sacramento",
          fontSize: Math.round(px * 0.98),
          // nudge the script glyph to sit optically centred in the tile
          paddingTop: Math.round(px * 0.06),
        }}
      >
        A
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Sacramento", data: sacramentoData, style: "normal", weight: 400 }],
    }
  );
}
