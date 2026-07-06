"use client";

import { useEffect, useState } from "react";

const MONO = "var(--font-jetbrains-mono)";
const SERIF = "var(--font-instrument-serif)";

type Quote = { quote: string; name: string; title: string };

const TESTIMONIALS: Quote[] = [
  {
    quote: "What a pleasure and privilege it is to work with you and our amazing colleagues in Kosovo.",
    name: "Nathan Lynn",
    title: "Data Executive",
  },
  { quote: "Appreciate you, Arlind!", name: "Tom Johnstone", title: "SVP, Data & AI" },
  { quote: "Amazing!!", name: "Elkida Bazaj", title: "AVP, Data & AI" },
  { quote: "The best 👍", name: "Granit Boshnjaku", title: "Consultant @ Shell" },
  {
    quote: "Will always be your biggest fan — Go Arlind Go!",
    name: "Nathan Lynn",
    title: "Data Executive",
  },
  { quote: "One of our XponentL Xperts.", name: "XponentL Data", title: "12,985 followers" },
];

export default function Testimonial() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // respect reduced motion — dots still allow manual browsing
    const id = window.setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 3000);
    return () => clearInterval(id);
  }, [paused]);

  const t = TESTIMONIALS[i];

  return (
    <section style={{ padding: "clamp(80px,13vh,150px) clamp(20px,5vw,64px)", background: "var(--dark)", color: "#eceae2" }}>
      <div
        style={{ maxWidth: "1080px", margin: "0 auto" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span data-reveal style={{ fontFamily: MONO, fontSize: "12px", letterSpacing: ".22em", color: "var(--accent)", display: "block", marginBottom: "clamp(22px,3.5vh,34px)" }}>
          KIND WORDS
        </span>

        <div
          role="group"
          aria-label="Testimonials"
          style={{ minHeight: "clamp(160px,26vh,240px)", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <blockquote key={i} style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(28px,4.3vw,54px)", lineHeight: 1.22, letterSpacing: "-.01em", color: "#f3f0e8", animation: "fadeIn .5s ease both" }}>
            <span style={{ color: "var(--accent)" }}>“</span>{t.quote}<span style={{ color: "var(--accent)" }}>”</span>
          </blockquote>
          <div key={"a" + i} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "14px", marginTop: "clamp(26px,4vh,40px)", fontFamily: MONO, fontSize: "13px", letterSpacing: ".04em", animation: "fadeIn .5s ease .06s both" }}>
            <span style={{ width: "28px", height: "2px", background: "var(--accent)", flex: "none" }} />
            <span style={{ color: "#eceae2" }}>{t.name}</span>
            <span style={{ color: "#8a887d" }}>{t.title}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "9px", marginTop: "clamp(30px,4.5vh,46px)" }}>
          {TESTIMONIALS.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show testimonial ${n + 1} of ${TESTIMONIALS.length}`}
              aria-current={n === i}
              style={{
                width: n === i ? "26px" : "9px",
                height: "9px",
                padding: 0,
                border: "none",
                borderRadius: "999px",
                background: n === i ? "var(--accent)" : "rgba(236,234,226,.28)",
                cursor: "pointer",
                transition: "width .35s cubic-bezier(.16,1,.3,1),background .3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
