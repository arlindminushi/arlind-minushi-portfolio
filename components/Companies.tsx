"use client";

import { useState } from "react";
import { companies } from "@/lib/data";

const MONO = "var(--font-jetbrains-mono)";
const SERIF = "var(--font-instrument-serif)";

export default function Companies() {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="companies"
      style={{ padding: "clamp(80px,14vh,170px) clamp(20px,5vw,64px)" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div
          data-line
          style={{
            height: 2,
            width: "100%",
            background: "linear-gradient(90deg,var(--accent),transparent)",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform .9s cubic-bezier(.16,1,.3,1)",
            marginBottom: "clamp(22px,3.5vh,38px)",
          }}
        />
        <span
          data-reveal
          style={{
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: ".22em",
            color: "var(--muted)",
            display: "block",
            marginBottom: 16,
          }}
        >
          04 — COMPANIES &amp; CLIENTS
        </span>
        <h2
          data-reveal
          style={{
            margin: "0 0 clamp(30px,5vh,52px)",
            fontSize: "clamp(40px,8vw,110px)",
            fontWeight: 700,
            letterSpacing: "-.03em",
            lineHeight: ".9",
            color: "var(--ink)",
          }}
        >
          People I&rsquo;ve{" "}
          <em style={{ fontFamily: SERIF, fontWeight: 400 }}>built with</em>
        </h2>
        <div data-reveal style={{ borderTop: "1px solid var(--line)" }}>
          {companies.map((c, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <div key={c.name}>
                <div
                  data-style-hover="color:var(--ink);background:var(--paper2);padding-left:clamp(12px,3vw,40px);"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                  onClick={() => setOpen((o) => (o === i ? null : i))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    justifyContent: "space-between",
                    padding: "clamp(14px,2vw,26px) clamp(4px,1.4vw,18px)",
                    borderBottom: "1px solid var(--line)",
                    cursor: "pointer",
                    color: "var(--ink2)",
                    transition: "color .35s,background .35s,padding .35s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "clamp(12px,2vw,28px)",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "clamp(11px,1.2vw,14px)",
                        color: "var(--accent)",
                        flex: "none",
                      }}
                    >
                      {idx}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(26px,5vw,66px)",
                        fontWeight: 600,
                        letterSpacing: "-.025em",
                        lineHeight: 1,
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(15px,1.6vw,24px)",
                        alignSelf: "center",
                        opacity: 0.45,
                      }}
                    >
                      →
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: "clamp(10px,1.1vw,13px)",
                      textAlign: "right",
                      flex: "none",
                      lineHeight: 1.7,
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "var(--accent)",
                        visibility: active === i ? "visible" : "hidden",
                      }}
                    >
                      {c.tag}
                    </span>
                    <span style={{ display: "block", color: "var(--muted)" }}>
                      {c.period}
                    </span>
                  </div>
                </div>

                {open === i && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "clamp(20px,3vw,44px)",
                      alignItems: "center",
                      padding: "clamp(24px,3.5vh,44px) clamp(6px,1.4vw,18px)",
                      background: "var(--paper2)",
                      borderBottom: "1px solid var(--line)",
                      animation: "panelOpen .55s cubic-bezier(.16,1,.3,1) both",
                    }}
                  >
                    {c.logo && (
                      <div
                        style={{
                          width: "clamp(124px,16vw,184px)",
                          height: "clamp(84px,10vw,116px)",
                          background: "#fff",
                          border: "1px solid var(--line)",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 16,
                          flex: "none",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.logo}
                          alt={`${c.name} logo`}
                          loading="lazy"
                          decoding="async"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div
                        style={{
                          fontFamily: MONO,
                          fontSize: 11,
                          letterSpacing: ".16em",
                          color: "var(--accent)",
                          marginBottom: 12,
                        }}
                      >
                        {c.tag}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "clamp(15px,1.5vw,18px)",
                          lineHeight: 1.6,
                          color: "var(--ink2)",
                          fontWeight: 300,
                          maxWidth: 660,
                        }}
                      >
                        {c.blurb}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
