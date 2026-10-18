"use client";

import { useRef, useState } from "react";
import { content as C } from "@/lib/content";
import { scrollToTop } from "@/lib/motion";

const RING = "OPEN TO CONNECT · SYSTEMS · TEAMS · THE CRAFT · PRISHTINA (CET) ·";

// "Magnetic" contact: a circular mail button that leans toward the cursor.
export default function Contact({ hasResume }: { hasResume: boolean }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const txtRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);
  const mail = `mailto:${C.contact.email}`;

  const onMove = (e: React.MouseEvent) => {
    const b = btnRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    const on = Math.hypot(dx, dy) < r.width * 1.3;
    b.style.transform = on ? `translate(${(dx * 0.28).toFixed(1)}px,${(dy * 0.28).toFixed(1)}px)` : "none";
    if (txtRef.current) txtRef.current.style.transform = on ? `translate(${(dx * 0.12).toFixed(1)}px,${(dy * 0.12).toFixed(1)}px)` : "none";
  };
  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "none";
    if (txtRef.current) txtRef.current.style.transform = "none";
  };
  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    try {
      navigator.clipboard.writeText(C.contact.email).then(done, () => { window.location.href = mail; });
    } catch {
      window.location.href = mail;
    }
  };

  return (
    <section className="contact" id="contact" onMouseMove={onMove} onMouseLeave={onLeave}>
      <span className="mono-label">SAY HELLO</span>
      <div className="mag">
        <svg viewBox="0 0 200 200" className="mag-ring" aria-hidden="true">
          <defs><path id="amRing" d="M100,100 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0" /></defs>
          <text><textPath href="#amRing" textLength="560" lengthAdjust="spacing">{RING}</textPath></text>
        </svg>
        <a ref={btnRef} href={mail} className="mag-btn">
          <span ref={txtRef} className="mag-txt">
            <span className="mag-big">Let’s talk</span>
            <span className="mono-xs" style={{ letterSpacing: ".14em" }}>WRITE ME →</span>
          </span>
        </a>
      </div>
      <p className="body-p" style={{ maxWidth: 520, fontSize: 16 }}>{C.contact.lead}</p>
      <div className="contact-btns">
        <button type="button" className="ghost-btn" onClick={copy}>{copied ? "COPIED ✓" : `${C.contact.email} — COPY`}</button>
        <a className="ghost-btn" href={C.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        {hasResume && <a className="ghost-btn" href={C.contact.resume} download>Résumé ↓</a>}
      </div>
      <div className="contact-foot">
        <span>{C.contact.note}</span>
        <a
          href="#top"
          className="seal"
          aria-label="Back to top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/am-seal-white-transparent.svg" alt="" />
        </a>
        <span>© 2026 {C.name}</span>
      </div>
    </section>
  );
}
