"use client";

import { useRef } from "react";
import { content as C } from "@/lib/content";
import { clamp01, isNarrow, isShort, pinProgress, prefersReducedMotion, useFrame } from "@/lib/motion";

const STEP_AT = [0.04, 0.14, 0.24, 0.58];

// Career "staircase" that tells the promotion story: scroll-scrubbed while pinned on big
// screens, played as a timeline on phones where the stacked layout is too tall to pin.
export default function Promotion() {
  const secRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const nowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wasRef = useRef<HTMLDivElement>(null);
  const wasTextRef = useRef<HTMLSpanElement>(null);
  const strikeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const promoRef = useRef<HTMLDivElement>(null);
  // When unpinned (phones, landscape) each block plays the story as a short timeline once it
  // scrolls into view; these hold the moment each block started (-1 = not yet).
  const started = useRef({ steps: -1, promo: -1 });

  const steps = C.roles.slice().reverse(); // oldest first; column-reverse puts it at the bottom

  useFrame((now) => {
    const reduce = prefersReducedMotion();
    let stepOn: (i: number) => boolean;
    let wasOn: boolean, strikeOn: boolean, nowOn: boolean, textOn: boolean, line: number;
    if (!reduce && (isNarrow() || isShort())) {
      const vh = window.innerHeight, s = started.current;
      if (s.steps < 0 && stepsRef.current && stepsRef.current.getBoundingClientRect().top < vh * 0.8) s.steps = now;
      // On tall phones both blocks arrive together; let the staircase finish climbing first.
      if (s.promo < 0 && promoRef.current && promoRef.current.getBoundingClientRect().top < vh * 0.75)
        s.promo = s.steps < 0 ? now : Math.max(now, s.steps + steps.length * 160 + 300);
      const ds = s.steps < 0 ? -1 : now - s.steps, dp = s.promo < 0 ? -1 : now - s.promo;
      stepOn = (i) => ds >= i * 160; // oldest first: the staircase climbs
      wasOn = dp >= 0;
      line = clamp01((dp - 300) / 500);
      strikeOn = dp >= 700;
      nowOn = dp >= 1000;
      textOn = dp >= 1300;
    } else {
      const p = reduce ? 1 : pinProgress(secRef.current), on = (a: number) => p >= a;
      stepOn = (i) => on(STEP_AT[i] ?? 0);
      wasOn = on(0.24);
      line = clamp01((p - 0.36) / 0.2);
      strikeOn = on(0.48);
      nowOn = on(0.58);
      textOn = on(0.7);
    }
    const set = (el: HTMLElement | null, v: boolean, hid: string) => {
      if (!el) return;
      el.style.opacity = v ? "1" : "0";
      el.style.transform = v ? "none" : hid;
    };
    stepsRef.current?.querySelectorAll<HTMLElement>("[data-step]").forEach((s, i) => set(s, stepOn(i), "translateY(30px)"));
    set(wasRef.current, wasOn, "translateY(30px)");
    if (strikeRef.current) strikeRef.current.style.transform = `scaleX(${strikeOn ? 1 : 0})`;
    if (wasTextRef.current) wasTextRef.current.style.opacity = strikeOn ? "0.4" : "1";
    if (lineRef.current) lineRef.current.style.transform = `scaleY(${line.toFixed(3)})`;
    set(nowRef.current, nowOn, "translateY(40px)");
    set(textRef.current, textOn, "translateY(30px)");
  });

  return (
    <section ref={secRef} className="career" aria-label="Promotion">
      <div className="career-sticky">
        <div className="label-row"><span>THE PATH SO FAR</span><span>2020 → NOW</span></div>
        <div className="career-grid">
          <div ref={stepsRef} className="steps">
            {steps.map((s, i) => {
              const top = i === steps.length - 1;
              return (
                <div key={s.y} data-step className={`step${top ? " is-top" : ""}`} style={{ marginLeft: `${i * 9}%` }}>
                  <span className="step-when">{s.when.toUpperCase()}</span>
                  <span className="step-title">{s.title}</span>
                  <span className="step-org">{s.org}</span>
                </div>
              );
            })}
          </div>
          <div ref={promoRef} className="promo">
            <div ref={nowRef} className="promo-now pop">
              <span className="badge">PROMOTED · {C.promo.date.toUpperCase()}</span>
              <span className="promo-title">{C.promo.to}<span className="acc">.</span></span>
              <span className="mono-sm mut">{C.promo.sub}</span>
            </div>
            <div ref={lineRef} className="promo-line" />
            <div ref={wasRef} className="promo-was pop">
              <span className="mono-label">WAS · 2025 — 2026</span>
              <span className="was-wrap">
                <span ref={wasTextRef} className="was-title">Tech Lead</span>
                <span ref={strikeRef} className="was-strike" />
              </span>
              <span className="mono-xs dim">{C.roles[1].title} · {C.roles[1].org}</span>
            </div>
            <div ref={textRef} className="promo-text pop">
              <p className="lead-p">{C.promo.p1}</p>
              <p className="body-p">{C.promo.p2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
