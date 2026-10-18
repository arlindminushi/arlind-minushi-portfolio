"use client";

import { useRef } from "react";
import { content as C } from "@/lib/content";
import { clamp01, isNarrow, pinProgress, prefersReducedMotion, useFrame } from "@/lib/motion";

// Deterministic pseudo-random scatter so server and client agree.
const rnd = (n: number) => { const x = Math.sin(n * 91.7) * 43758.5; return x - Math.floor(x); };
const SEED = C.companies.map((_, i) => ({ dx: (rnd(i + 1) - 0.5) * 120, dy: (rnd(i + 11) - 0.5) * 110, r: (rnd(i + 21) - 0.5) * 80 }));

// Pinned logo wall: tiles fly in from scattered offsets and land in a 3×3 grid; hover flips.
export default function BuiltWith() {
  const secRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const p = isNarrow() || prefersReducedMotion() ? 1 : pinProgress(secRef.current);
    grid.querySelectorAll<HTMLElement>("[data-co]").forEach((el, i) => {
      const s = SEED[i], t = clamp01((p - i * 0.035) / 0.5), e = 1 - Math.pow(1 - t, 3), k = 1 - e;
      el.style.transform = k < 0.001 ? "none" : `translate(${(s.dx * k).toFixed(2)}vw,${(s.dy * k).toFixed(2)}vh) rotate(${(s.r * k).toFixed(2)}deg) scale(${(0.55 + 0.45 * e).toFixed(3)})`;
      el.style.opacity = Math.min(1, e * 1.6).toFixed(3);
    });
  });

  return (
    <section ref={secRef} className="co-sec">
      <div className="co-sticky">
        <div className="co-head">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="mono-label">PEOPLE I’VE BUILT WITH</span>
            <h2 className="co-title">Built with<span className="acc">.</span></h2>
          </div>
          <span className="mono-label" style={{ fontSize: 11.5 }}>HOVER A LOGO ↻</span>
        </div>
        <div ref={gridRef} className="co-grid">
          {C.companies.map((c, i) => (
            <div key={c.name} data-co className="co-tile">
              <div className="co-inner">
                <div className="co-front">
                  <span className="co-n">{String(i + 1).padStart(2, "0")}</span>
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={c.name} loading="lazy" />
                  ) : (
                    <div className="co-conf">
                      <span>CONFIDENTIAL CLIENT</span>
                      <span className="co-conf-name">{c.name}</span>
                    </div>
                  )}
                </div>
                <div className="co-back">
                  <span className="co-acc" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span className="co-name">{c.name}</span>
                    <span className="co-tag">{c.tag}</span>
                  </div>
                  <span className="co-period">{c.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
