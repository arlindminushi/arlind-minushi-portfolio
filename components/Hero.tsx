"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { content as C } from "@/lib/content";
import { clamp01, prefersReducedMotion, useFrame } from "@/lib/motion";

const PORTRAIT = "/uploads/portrait.jpg";
const MOVE = "cubic-bezier(.76,0,.24,1)";

// "Letters" intro: a portrait-filled copy of the name starts centred and large,
// then both copies glide to the final spot while the photo frame wipes up.
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const picRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const busy = useRef(true);

  useEffect(() => {
    const hero = heroRef.current, H = nameRef.current, F = fillRef.current, pic = picRef.current;
    if (!hero || !H || !F || !pic) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    let cancelled = false;

    const showFinal = () => {
      F.style.display = "none";
      H.style.transition = "none";
      H.style.opacity = "1";
      H.style.transform = "translateY(-50%)";
      pic.style.transition = "none";
      pic.style.clipPath = "inset(0 0 0 0)";
      busy.current = false;
    };

    if (prefersReducedMotion() || window.scrollY > hero.offsetHeight) {
      showFinal();
      return;
    }

    const play = () => {
      if (cancelled) return;
      H.style.transition = "none";
      H.style.transform = "translate(0px, -50%) scale(1)";
      const hr = hero.getBoundingClientRect(), r = H.getBoundingClientRect();
      const dx = hr.width / 2 - (r.left - hr.left + r.width / 2);
      const dy = hr.height / 2 - (r.top - hr.top + r.height / 2);
      const s0 = Math.min(1.35, (hr.width * 0.9) / r.width);
      const start = `translate(${dx.toFixed(1)}px, calc(-50% + ${dy.toFixed(1)}px)) scale(${s0.toFixed(3)})`;
      const end = "translate(0px, calc(-50% + 0px)) scale(1)";
      pic.style.transition = "none";
      pic.style.clipPath = "inset(100% 0 0 0)";
      F.style.display = "block";
      [H, F].forEach((el) => { el.style.transition = "none"; el.style.transform = start; });
      H.style.opacity = "0";
      F.style.opacity = "1";
      F.style.backgroundPosition = "40% 10%";
      void F.offsetWidth;
      requestAnimationFrame(() => {
        F.style.transition = "background-position 1.6s ease-out";
        F.style.backgroundPosition = "40% 40%";
      });
      later(() => {
        const tr = `transform 1.3s ${MOVE},opacity .5s ease .85s`;
        H.style.transition = tr;
        F.style.transition = tr;
        H.style.transform = end;
        F.style.transform = end;
        H.style.opacity = "1";
        F.style.opacity = "0";
        requestAnimationFrame(() => {
          pic.style.transition = "clip-path 1.5s cubic-bezier(.16,1,.3,1) 1.05s";
          pic.style.clipPath = "inset(0 0 0 0)";
        });
      }, 1700);
      later(() => {
        F.style.display = "none";
        H.style.transition = "none";
        busy.current = false;
      }, 3300);
    };

    // Measure with the real webfont, but never hold the intro hostage to it.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 700))]).then(play);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      showFinal();
    };
  }, []);

  useFrame(() => {
    const hero = heroRef.current, H = nameRef.current;
    if (!hero || !H || busy.current || prefersReducedMotion()) return;
    const r = hero.getBoundingClientRect(), t = clamp01(-r.top / (r.height || 1));
    if (t >= 1 && H.dataset.t === "1") return;
    H.dataset.t = t >= 1 ? "1" : "";
    H.style.transform = `translateY(calc(-50% + ${(t * 26).toFixed(2)}vh)) scale(${(1 - t * 0.08).toFixed(4)})`;
    H.style.opacity = String(1 - t * 0.9);
    if (imgRef.current) imgRef.current.style.transform = `translateY(${(t * -6).toFixed(2)}%)`;
    if (metaRef.current) metaRef.current.style.opacity = String(Math.max(0, 1 - t * 3));
  });

  return (
    <section ref={heroRef} className="hero" id="top">
      <div ref={picRef} className="hero-pic">
        {/* 108%-tall wrapper gives the parallax room to travel; next/image `fill` must stay at 100%. */}
        <div ref={imgRef} className="hero-img">
          <Image
            src={PORTRAIT}
            alt="Arlind Minushi"
            fill
            priority
            quality={90}
            // Rendered width ≈ 0.64 × viewport height (0.40 on phones), not a fraction of vw.
            sizes="(max-width: 759px) 40vh, 64vh"
            style={{ objectFit: "cover", objectPosition: "30% 30%" }}
          />
        </div>
      </div>
      <h1 ref={nameRef} className="hero-name">
        <span>{C.first.toUpperCase()}</span>
        <span>{C.last.toUpperCase()}</span>
      </h1>
      <div ref={fillRef} aria-hidden="true" className="hero-name hero-fill" style={{ backgroundImage: `url('${PORTRAIT}')` }}>
        <span>{C.first.toUpperCase()}</span>
        <span>{C.last.toUpperCase()}</span>
      </div>
      <div ref={metaRef} className="hero-meta">
        <span>{C.role.toUpperCase()}</span>
        <span>{`${C.company} · ${C.location}`.toUpperCase()}</span>
        <span style={{ marginTop: 10 }}>SCROLL ↓</span>
      </div>
    </section>
  );
}
