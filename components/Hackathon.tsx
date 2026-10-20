"use client";

import Image from "next/image";
import { useRef } from "react";
import { content as C } from "@/lib/content";
import { pinProgress, useFrame } from "@/lib/motion";

// Pinned: photos open through a growing circle, then cross-fade under a huge "2nd".
export function HackathonPin() {
  const secRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const shown = useRef(-1);
  const n = C.hack.photos.length;

  useFrame(() => {
    const mask = maskRef.current;
    if (!mask) return;
    const p = pinProgress(secRef.current);
    mask.style.clipPath = `circle(${(Math.min(1, p / 0.32) * 75).toFixed(2)}% at 50% 50%)`;
    const k = Math.min(n - 1, Math.floor((Math.max(0, p - 0.05) / 0.95) * n));
    if (k !== shown.current) {
      shown.current = k;
      mask.querySelectorAll<HTMLElement>("[data-hp]").forEach((im, i) => { im.style.opacity = i === k ? "1" : "0"; });
    }
  });

  return (
    <section ref={secRef} className="hack-pin" aria-label={C.hack.name}>
      <div className="sticky-100">
        <div ref={maskRef} className="hack-mask">
          {C.hack.photos.map((p) => (
            <Image key={p.src} data-hp src={p.src} alt={p.alt} fill quality={90} sizes="100vw" className="hack-photo" style={{ objectPosition: p.focus ?? "50% 50%" }} />
          ))}
        </div>
        <div className="hack-over">
          <span className="mono-label" style={{ color: "inherit" }}>{C.hack.name.toUpperCase()}</span>
          <span className="hack-place">{C.hack.place}</span>
          <span className="mono-label" style={{ color: "inherit" }}>PLACE · AS MENTOR</span>
        </div>
      </div>
    </section>
  );
}

export function HackathonDetails() {
  return (
    <section className="white sec hack-details">
      <div className="hd-top">
        <p data-rv className="hd-line">{C.hack.line}</p>
        <div data-rv className="hd-team">
          <p className="body-p" style={{ fontSize: 15.5 }}>{C.hack.proud}</p>
        </div>
      </div>
      <div className="hd-quotes">
        {C.hack.quotes.map((q) => (
          <figure data-rv key={q.n}>
            <blockquote>“{q.t}”</blockquote>
            <figcaption className="mono-xs dim">{q.n} — {q.r}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
