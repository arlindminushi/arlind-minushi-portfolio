"use client";

import { useEffect } from "react";

/**
 * Imperative page behaviours ported from the original vanilla `app.js`:
 * scroll reveals, sticky-nav reveal, scroll-progress bar, hero parallax,
 * responsive hero corners, the capability accordion, the trailing-dot cursor,
 * and the generic `data-style-hover` handler.
 *
 * Companies and (optionally) other interactive pieces are real React components,
 * so they are NOT built here — this hook only wires the DOM-level effects that
 * operate on stable `id`s and `data-*` attributes within the mounted tree.
 */
export default function usePortfolioEffects() {
  useEffect(() => {
    const rootEl: HTMLElement = document.getElementById("root") || document.body;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    /* ---- generic [data-style-hover] handler ---- */
    function parseStyle(s: string): Record<string, string> {
      const o: Record<string, string> = {};
      (s || "").split(";").forEach((d) => {
        d = d.trim();
        if (!d) return;
        const i = d.indexOf(":");
        if (i < 0) return;
        o[d.slice(0, i).trim()] = d.slice(i + 1).trim();
      });
      return o;
    }
    rootEl.querySelectorAll<HTMLElement>("[data-style-hover]").forEach((el) => {
      const hov = parseStyle(el.getAttribute("data-style-hover") || "");
      let prev: Record<string, string> | null = null;
      const enter = () => {
        prev = {};
        for (const k in hov) {
          prev[k] = el.style.getPropertyValue(k);
          el.style.setProperty(k, hov[k]);
        }
      };
      const leave = () => {
        if (!prev) return;
        for (const k in prev) {
          if (prev[k]) el.style.setProperty(k, prev[k]);
          else el.style.removeProperty(k);
        }
        prev = null;
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    /* ---- scroll reveals (repeating, both directions) ---- */
    let revEls: HTMLElement[] = [];
    const revealEl = (el: HTMLElement) => {
      if (el.hasAttribute("data-line")) el.style.transform = "scaleX(1)";
      else if (el.hasAttribute("data-vline")) el.style.transform = "scaleY(1)";
      else if (el.hasAttribute("data-dot")) el.style.transform = "scale(1)";
      else {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    };
    const hideEl = (el: HTMLElement) => {
      if (el.hasAttribute("data-line")) el.style.transform = "scaleX(0)";
      else if (el.hasAttribute("data-vline")) el.style.transform = "scaleY(0)";
      else if (el.hasAttribute("data-dot")) el.style.transform = "scale(0)";
      else {
        el.style.opacity = "0";
        el.style.transform = "translateY(34px)";
      }
    };
    const isSpecial = (el: HTMLElement) =>
      el.hasAttribute("data-line") ||
      el.hasAttribute("data-vline") ||
      el.hasAttribute("data-dot");

    let revObs: IntersectionObserver | null = null;
    let revealFallback: number | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      revEls = Array.from(
        rootEl.querySelectorAll<HTMLElement>(
          "[data-reveal],[data-line],[data-vline],[data-dot]"
        )
      );
      revEls.forEach((el) => {
        if (!isSpecial(el)) {
          const base = el.style.transition;
          el.style.transition =
            (base ? base + "," : "") + "opacity .5s ease-out,transform .5s ease-out";
        }
        hideEl(el);
      });
      requestAnimationFrame(() => {
        const vh = window.innerHeight || 800;
        revEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.88 && r.bottom > 0) revealEl(el);
        });
      });
      revObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const el = e.target as HTMLElement;
            if (e.isIntersecting) {
              const d = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
              el.style.transitionDelay = d / 1000 + "s";
              revealEl(el);
            } else {
              el.style.transitionDelay = "0s";
              hideEl(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revEls.forEach((el) => revObs!.observe(el));
      // Safety for throttled environments — reveal whatever is in view after a beat.
      revealFallback = window.setTimeout(() => {
        const vh = window.innerHeight || 800;
        revEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) revealEl(el);
        });
      }, 1400);
    }

    /* ---- expandable capability cards ---- */
    rootEl.querySelectorAll<HTMLElement>("[data-cap]").forEach((btn, i) => {
      const detail = btn.querySelector<HTMLElement>("[data-cap-detail]");
      const chev = btn.querySelector<HTMLElement>("[data-cap-chev]");
      // Programmatically link each toggle to the panel it controls (a11y).
      if (detail) {
        if (!detail.id) detail.id = `cap-detail-${i}`;
        btn.setAttribute("aria-controls", detail.id);
      }
      const onClick = () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        if (!detail) return;
        if (open) {
          detail.style.maxHeight = "0";
          detail.style.opacity = "0";
          if (chev) chev.style.transform = "rotate(0deg)";
        } else {
          detail.style.maxHeight = detail.scrollHeight + "px";
          detail.style.opacity = "1";
          if (chev) chev.style.transform = "rotate(45deg)";
        }
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    /* ---- combined scroll handler ---- */
    const heroWrap = document.getElementById("herowrap");
    const bar = document.getElementById("progressbar");
    const nav = document.getElementById("nav");
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if (heroWrap)
        heroWrap.style.transform = "translateY(" + Math.min(y * 0.08, 60) + "px)";
      if (bar) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight || 1;
        bar.style.transform =
          "scaleX(" + Math.min(1, Math.max(0, y / max)) + ")";
      }
      if (nav) {
        const show = y > (window.innerHeight || 800) * 0.55;
        nav.style.transform = show ? "translateY(0)" : "translateY(-110%)";
        nav.style.opacity = show ? "1" : "0";
        nav.style.pointerEvents = show ? "auto" : "none";
      }
      if (revEls.length) {
        const vh2 = window.innerHeight || 800;
        for (let i = 0; i < revEls.length; i++) {
          const el = revEls[i];
          const r = el.getBoundingClientRect();
          if (r.top < vh2 * 0.85 && r.bottom > vh2 * 0.15) revealEl(el);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    /* ---- responsive hero corners ---- */
    const applyHeroCorners = () => {
      const w = window.innerWidth || 1200;
      rootEl.querySelectorAll<HTMLElement>("[data-hero-corner]").forEach((el) => {
        el.style.display = w < 680 ? "none" : el.getAttribute("data-show") || "block";
      });
      const strip = rootEl.querySelector<HTMLElement>("[data-hero-strip]");
      if (strip) strip.style.display = w < 1024 ? "none" : "flex";
    };
    applyHeroCorners();
    window.addEventListener("resize", applyHeroCorners, { passive: true });
    cleanups.push(() => window.removeEventListener("resize", applyHeroCorners));

    /* ---- trailing-dot cursor (pointer devices only) ---- */
    if (
      !(
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches
      )
    ) {
      const N = 7;
      const trail: { el: HTMLDivElement; x: number; y: number }[] = [];
      for (let i = 0; i < N; i++) {
        const sz = Math.max(4, 13 - i * 1.4);
        const d = document.createElement("div");
        d.style.cssText =
          "position:fixed;top:0;left:0;width:" +
          sz +
          "px;height:" +
          sz +
          "px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:99998;opacity:" +
          (0.6 - i * 0.07).toFixed(2) +
          ";transform:translate(-50%,-50%);will-change:transform;";
        // Append inside the themed root so `var(--accent)` resolves (it is
        // defined on `.root`, not on <body>); position:fixed keeps them
        // viewport-anchored since no ancestor establishes a transform context.
        rootEl.appendChild(d);
        trail.push({ el: d, x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
      const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const onMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      let raf = 0;
      const loop = () => {
        let px = mouse.x;
        let py = mouse.y;
        for (let j = 0; j < trail.length; j++) {
          const t = trail[j];
          t.x += (px - t.x) * 0.35;
          t.y += (py - t.y) * 0.35;
          t.el.style.transform =
            "translate(" + t.x + "px," + t.y + "px) translate(-50%,-50%)";
          px = t.x;
          py = t.y;
        }
        raf = requestAnimationFrame(loop);
      };
      loop();
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf);
        trail.forEach((t) => t.el.remove());
      });
    }

    /* ---- "easy there" easter egg: frantic mouse movement -> playful toast ---- */
    if (
      !(
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches
      )
    ) {
      const jokes = [
        "Whoa there, speed racer — the site isn't going anywhere 🏎️",
        "Easy, tiger 🐯 — savour the portfolio.",
        "404: chill not found 😅",
        "You move the mouse like you ship code. Fast. Respect 🚀",
        "Slow down there, Speedy Gonzales 🌀",
        "Caffeine levels: dangerously high ☕",
        "The mouse would like to file for a short break 🐭",
        "That's a lot of mileage on that cursor 🛞",
      ];
      let energy = 0;
      let lx = 0, ly = 0, lt = 0, hasLast = false;
      let cooldownUntil = 0, lastIdx = -1;
      let toastEl: HTMLDivElement | null = null;
      let toastTxt: HTMLSpanElement | null = null;
      let toastTimer = 0;

      const showToast = (msg: string) => {
        if (toastTimer) clearTimeout(toastTimer);
        if (!toastEl) {
          toastEl = document.createElement("div");
          toastEl.setAttribute("role", "status");
          toastEl.style.cssText =
            "position:fixed;top:18px;left:50%;z-index:99999;display:flex;align-items:center;gap:10px;max-width:min(92vw,460px);padding:12px 18px;background:var(--ink);color:var(--paper);font-family:var(--font-jetbrains-mono),monospace;font-size:13px;letter-spacing:.02em;line-height:1.4;border-radius:999px;box-shadow:0 18px 44px -18px rgba(0,0,0,.55);pointer-events:none;transform:translateX(-50%);";
          const dot = document.createElement("span");
          dot.style.cssText = "width:8px;height:8px;border-radius:50%;background:var(--accent);flex:none;";
          toastTxt = document.createElement("span");
          toastEl.appendChild(dot);
          toastEl.appendChild(toastTxt);
          rootEl.appendChild(toastEl);
        }
        if (toastTxt) toastTxt.textContent = msg;
        const el = toastEl;
        try {
          el.animate(
            reduce
              ? [{ opacity: 0 }, { opacity: 1 }]
              : [
                  { opacity: 0, transform: "translateX(-50%) translateY(-16px) scale(.96)" },
                  { opacity: 1, transform: "translateX(-50%) translateY(0) scale(1)" },
                ],
            { duration: 380, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }
          );
        } catch {
          el.style.opacity = "1";
        }
        toastTimer = window.setTimeout(() => {
          try {
            const a = el.animate(
              reduce
                ? [{ opacity: 1 }, { opacity: 0 }]
                : [
                    { opacity: 1, transform: "translateX(-50%) translateY(0) scale(1)" },
                    { opacity: 0, transform: "translateX(-50%) translateY(-12px) scale(.97)" },
                  ],
              { duration: 300, easing: "ease-in", fill: "both" }
            );
            a.onfinish = () => { el.remove(); if (toastEl === el) { toastEl = null; toastTxt = null; } };
          } catch {
            el.remove();
            if (toastEl === el) { toastEl = null; toastTxt = null; }
          }
        }, 3200);
      };

      const onShake = (e: MouseEvent) => {
        const now = performance.now();
        if (hasLast) {
          const dt = now - lt;
          const dist = Math.hypot(e.clientX - lx, e.clientY - ly);
          // Time-decaying "energy" — only sustained frantic movement crosses the line.
          energy = energy * Math.exp(-dt / 450) + dist;
        }
        lx = e.clientX; ly = e.clientY; lt = now; hasLast = true;
        if (energy > 1500 && now > cooldownUntil) {
          cooldownUntil = now + 9000; // ~9s breather between jokes
          energy = 0;
          let i = Math.floor(Math.random() * jokes.length);
          if (jokes.length > 1 && i === lastIdx) i = (i + 1) % jokes.length;
          lastIdx = i;
          showToast(jokes[i]);
        }
      };
      window.addEventListener("mousemove", onShake, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("mousemove", onShake);
        if (toastTimer) clearTimeout(toastTimer);
        if (toastEl) { toastEl.remove(); toastEl = null; toastTxt = null; }
      });
    }

    /* ---- teardown ---- */
    return () => {
      if (revObs) revObs.disconnect();
      if (revealFallback) clearTimeout(revealFallback);
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
