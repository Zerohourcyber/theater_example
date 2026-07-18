import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Static branded OG image (SPEC §9: a static branded image is fine for POC). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,155,255,0.25), rgba(11,14,22,1) 70%), #0B0E16",
          color: "#F2F6FC",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#3B9BFF",
            fontSize: 28,
            letterSpacing: 12,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          {/* Diamond mark drawn with CSS — glyphs outside the base font
              trigger dynamic font fetches that can fail at build time. */}
          <div
            style={{
              width: 18,
              height: 18,
              background: "#3B9BFF",
              transform: "rotate(45deg)",
            }}
          />
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            width: 480,
            height: 2,
            background:
              "linear-gradient(to right, transparent, #3B9BFF, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
