"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { content as C } from "@/lib/content";
import { pinProgress, useFrame } from "@/lib/motion";

// Pinned 3D carousel of off-the-clock photos; the front photo's caption shows below.
export default function BitsRing() {
  const secRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const R = useRef(0);
  const front = useRef(-1);
  const n = C.gallery.length;

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const layout = () => {
      const items = Array.from(ring.querySelectorAll<HTMLElement>("[data-rg]"));
      if (!items.length) return;
      R.current = (items[0].offsetWidth / 2 / Math.tan(Math.PI / n)) * 1.25;
      items.forEach((el, k) => { el.style.transform = `translate(-50%,-50%) rotateY(${(k * 360) / n}deg) translateZ(${R.current}px)`; });
    };
    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [n]);

  useFrame(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const a = pinProgress(secRef.current) * 360 * 1.2;
    ring.style.transform = `translateZ(${-R.current}px) rotateY(${-a}deg)`;
    const f = ((Math.round(a / (360 / n)) % n) + n) % n;
    if (f !== front.current && capRef.current) {
      front.current = f;
      capRef.current.textContent = C.gallery[f].cap;
    }
  });

  return (
    <section ref={secRef} className="ring-sec" aria-label="Bits of me">
      <div className="ring-sticky">
        <div className="ring-head">
          <h2 className="h-sec">BITS OF ME</h2>
          <span className="mono-label" style={{ fontSize: 11.5 }}>{C.hobbies.join(" · ").toUpperCase()}</span>
        </div>
        <div className="ring-stage">
          <div ref={ringRef} className="ring">
            {C.gallery.map((g) => (
              <div key={g.src} data-rg className="ring-item">
                <Image src={g.src} alt={g.alt} fill quality={90} sizes="300px" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
        <span ref={capRef} className="ring-cap">{C.gallery[0].cap}</span>
      </div>
    </section>
  );
}
