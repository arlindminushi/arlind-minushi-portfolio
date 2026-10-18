"use client";

import { useRef } from "react";
import { content as C } from "@/lib/content";
import { clamp01, isNarrow, pinProgress, prefersReducedMotion, useFrame } from "@/lib/motion";

const STEP_AT = [0.04, 0.14, 0.24, 0.58];

// Pinned career "staircase" that tells the promotion story as you scroll.
export default function Promotion() {
  const secRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const nowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wasRef = useRef<HTMLDivElement>(null);
  const wasTextRef = useRef<HTMLSpanElement>(null);
  const strikeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const steps = C.roles.slice().reverse(); // oldest first; column-reverse puts it at the bottom

  useFrame(() => {
    const p = isNarrow() || prefersReducedMotion() ? 1 : pinProgress(secRef.current);
    const on = (a: number) => p >= a;
    const set = (el: HTMLElement | null, v: boolean, hid: string) => {
      if (!el) return;
      el.style.opacity = v ? "1" : "0";
      el.style.transform = v ? "none" : hid;
    };
    stepsRef.current?.querySelectorAll<HTMLElement>("[data-step]").forEach((s, i) => set(s, on(STEP_AT[i] ?? 0), "translateY(30px)"));
    set(wasRef.current, on(0.24), "translateY(30px)");
    if (strikeRef.current) strikeRef.current.style.transform = `scaleX(${on(0.48) ? 1 : 0})`;
    if (wasTextRef.current) wasTextRef.current.style.opacity = on(0.48) ? "0.4" : "1";
    if (lineRef.current) lineRef.current.style.transform = `scaleY(${clamp01((p - 0.36) / 0.2).toFixed(3)})`;
    set(nowRef.current, on(0.58), "translateY(40px)");
    set(textRef.current, on(0.7), "translateY(30px)");
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
          <div className="promo">
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
