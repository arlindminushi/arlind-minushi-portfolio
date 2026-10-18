"use client";

import { scrollToTop } from "@/lib/motion";

// Monogram pinned to the top-left of every page; click to glide back to the top.
export default function CornerLogo() {
  return (
    <a
      href="#top"
      className="corner-logo"
      aria-label="Back to top"
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/am-monogram-on-black.svg" alt="" width={44} height={44} />
    </a>
  );
}
