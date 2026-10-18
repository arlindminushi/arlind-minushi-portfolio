"use client";

import Image from "next/image";
import { useRef } from "react";
import { content as C } from "@/lib/content";
import { clamp01, useFrame } from "@/lib/motion";

export default function About() {
  const imgRef = useRef<HTMLImageElement>(null);

  useFrame(() => {
    const img = imgRef.current, box = img?.parentElement;
    if (!img || !box) return;
    const r = box.getBoundingClientRect(), vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    const t = clamp01((vh - r.top) / (vh + r.height));
    img.style.transform = `scale(1.6) translateY(${((0.5 - t) * 5).toFixed(2)}%)`;
  });

  return (
    <section className="white sec about" id="about">
      <div data-rv className="about-pic">
        <Image
          ref={imgRef}
          src="/uploads/team.jpg"
          alt="Arlind with a mentor"
          fill
          quality={90}
          // Cover-cropped into a ≤420px 4:5 box, then zoomed 1.6× → drawn ~3× the box width.
          sizes="1260px"
          style={{ objectFit: "cover", objectPosition: "0% 50%", transformOrigin: "36% 76%", transform: "scale(1.6)", willChange: "transform" }}
        />
      </div>
      <div className="about-text">
        <span data-rv className="mono-sm mut" style={{ fontSize: 12.5 }}>{C.aboutQuote}</span>
        <h2 data-rv className="about-h">Engineer first.<br />Lead by example.</h2>
        {C.about.map((p) => <p data-rv key={p.slice(0, 24)} className="body-p" style={{ fontSize: 16, lineHeight: 1.65 }}>{p}</p>)}
        <div data-rv className="creds">
          {C.creds.map((c) => (
            <div key={c.k}>
              <span className="mono-xs dim" style={{ fontSize: 10.5, letterSpacing: ".14em" }}>{c.k.toUpperCase()}</span>
              <span style={{ fontSize: 14.5, lineHeight: 1.35 }}>{c.t}</span>
              {c.s && <span className="mono-xs dim">{c.s}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
