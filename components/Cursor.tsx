"use client";

import { useEffect, useRef } from "react";
import { onFrame } from "@/lib/motion";

// 12px difference-blended dot that trails the pointer. Hidden on touch devices.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot || window.matchMedia("(pointer: coarse)").matches) return;
    dot.style.display = "block";
    let mx = -50, my = -50, cx = -50, cy = -50;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });
    const off = onFrame(() => {
      cx += (mx - cx) * 0.25;
      cy += (my - cy) * 0.25;
      dot.style.transform = `translate(${cx}px,${cy}px)`;
    });
    return () => {
      off();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
