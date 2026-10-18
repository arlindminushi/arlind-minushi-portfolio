"use client";

import { useRef } from "react";
import { content as C } from "@/lib/content";
import { pinProgress, useFrame } from "@/lib/motion";

const size = (t: string, short?: boolean) =>
  short ? "clamp(54px,8.6vw,150px)" : t.length > 260 ? "clamp(22px,2.6vw,42px)" : "clamp(28px,3.6vw,60px)";

// Pinned testimonials: one quote per 100vh of scroll, words lighting up as you go.
export default function KindWords() {
  const secRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ q: -1, k: -1, kq: -1 });
  const n = C.words.length;

  useFrame(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const p = pinProgress(secRef.current), loc = Math.min(n - 0.0001, p * n), qi = Math.floor(loc), lp = loc - qi;
    const figs = Array.from(stack.querySelectorAll<HTMLElement>("[data-wb]"));
    const s = state.current;
    if (qi !== s.q) {
      s.q = qi;
      figs.forEach((b, i) => {
        const on = i === qi;
        b.style.opacity = on ? "1" : "0";
        b.style.transform = on ? "none" : i < qi ? "translateY(-50px)" : "translateY(50px)";
        const m = b.querySelector<HTMLElement>("[data-wmark]");
        if (m) m.style.transform = on ? "scale(1) rotate(0deg)" : "scale(0) rotate(-25deg)";
      });
      if (countRef.current) countRef.current.textContent = `${String(qi + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${lp.toFixed(3)})`;
    const ws = Array.from(figs[qi]?.querySelectorAll<HTMLElement>("[data-ww]") ?? []);
    const k = Math.floor(Math.min(1, lp / 0.7) * (ws.length + 1));
    if (k !== s.k || qi !== s.kq) {
      s.k = k;
      s.kq = qi;
      ws.forEach((w, i) => {
        const lit = i < k;
        w.style.opacity = lit ? "1" : "0.12";
        w.style.filter = lit ? "none" : "blur(5px)";
        w.style.transform = lit ? "none" : "translateY(.3em)";
      });
    }
  });

  return (
    <section ref={secRef} className="words-sec" style={{ height: `${n * 100 + 60}vh` }} aria-label="Kind words">
      <div className="words-sticky">
        <div className="label-row"><span>KIND WORDS</span><span ref={countRef}>01 / {String(n).padStart(2, "0")}</span></div>
        <div className="words-track"><div ref={barRef} className="words-bar" /></div>
        <div ref={stackRef} className="words-stack">
          {C.words.map((q) => (
            <figure key={q.n} data-wb className="word-fig">
              <span data-wmark aria-hidden="true" className="word-mark">“</span>
              <blockquote style={{ fontSize: size(q.t, q.short) }}>
                {q.t.split(" ").map((w, i) => <span key={i} data-ww className="ww">{w}</span>)}
              </blockquote>
              <figcaption>
                <span className="word-name">{q.n}</span>
                <span className="mono-xs dim" style={{ fontSize: 12 }}>{q.r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
