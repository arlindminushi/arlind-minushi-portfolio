"use client";

import { useEffect, useRef, useState } from "react";

// One shared requestAnimationFrame loop for every scroll/pointer-driven section.
type FrameFn = (now: number) => void;
const subs = new Set<FrameFn>();
let raf = 0;

function loop(now: number) {
  subs.forEach((fn) => fn(now));
  raf = subs.size ? requestAnimationFrame(loop) : 0;
}

export function onFrame(fn: FrameFn) {
  subs.add(fn);
  if (!raf) raf = requestAnimationFrame(loop);
  return () => {
    subs.delete(fn);
  };
}

/** Runs `fn` every frame while mounted; always calls the latest closure. */
export function useFrame(fn: FrameFn) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => onFrame((now) => ref.current(now)), []);
}

export const EXPO = "cubic-bezier(.16,1,.3,1)";
export const NARROW = 760;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Progress (0→1) through a pinned section: tall wrapper with a 100vh sticky child. */
export function pinProgress(el: HTMLElement | null) {
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  return clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function isNarrow() {
  return typeof window !== "undefined" && window.innerWidth < NARROW;
}

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Fade-up ([data-rv]) and masked word-rise ([data-up]) reveals inside `root`. */
export function useReveals(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const ups = Array.from(el.querySelectorAll<HTMLElement>("[data-up]"));
    const rv = Array.from(el.querySelectorAll<HTMLElement>("[data-rv]"));
    ups.forEach((u, i) => {
      u.style.transform = "translateY(105%)";
      u.style.transition = `transform .9s ${EXPO} ${i * 0.035}s`;
    });
    rv.forEach((r) => {
      r.style.opacity = "0";
      r.style.transform = "translateY(40px)";
      r.style.transition = `opacity .9s ease,transform 1s ${EXPO}`;
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          t.style.opacity = "1";
          t.style.transform = "none";
          io.unobserve(t);
        }),
      { threshold: 0.1 }
    );
    [...ups, ...rv].forEach((x) => io.observe(x));
    return () => io.disconnect();
  }, [root]);
}
