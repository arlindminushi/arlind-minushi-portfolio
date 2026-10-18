"use client";

import { useEffect, useRef, useState } from "react";
import { onFrame, prefersReducedMotion } from "@/lib/motion";

// Easter egg: after a while with no scrolling, a little head peeks in from a screen
// edge, follows the cursor (or taps / device tilt on touch), blinks, roams and
// complains when poked. Any scroll sends it away again.

type Edge = "bottom" | "top" | "left" | "right";
type Spot = { edge: Edge; at: number };
type Timer = ReturnType<typeof setTimeout>;

const ROT: Record<Edge, number> = { bottom: 0, top: 180, left: 90, right: -90 };
const SPRING = "cubic-bezier(.34,1.56,.64,1)";
const HELLO = ["Hi again.", "Peekaboo.", "Just checking…", "Nice section, right?"];
const LANDED = ["Over here!", "Peekaboo.", "Boo."];
const POKES = ["Ouch!", "OUCH! Hey!!", "That's it. I'm reporting you to HR."];
const WRAP_LEFT = -58;
const HIDDEN = "translateY(130%)";
const BUBBLE_OFF = "translate(-50%,-50%) scale(.8)";

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const viewW = () => document.documentElement.clientWidth;
const viewH = () => window.innerHeight;

export default function IdleEyes() {
  const [on, setOn] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const eyeRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)];
  const pupilRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)];
  const pokeRef = useRef<() => void>(() => {});

  // Client-only, and off entirely for people who prefer reduced motion.
  useEffect(() => setOn(!prefersReducedMotion()), []);

  useEffect(() => {
    if (!on) return;
    const anchor = anchorRef.current, wrap = wrapRef.current, head = headRef.current, bubble = bubbleRef.current;
    const eyes = eyeRefs.map((r) => r.current), pupils = pupilRefs.map((r) => r.current);
    if (!anchor || !wrap || !head || !bubble || eyes.some((e) => !e) || pupils.some((p) => !p)) return;
    const eyeEls = eyes as HTMLSpanElement[], pupilEls = pupils as HTMLSpanElement[];

    const touch = window.matchMedia("(pointer: coarse)").matches;
    const scale = touch ? 0.7 : 1;
    const idleMs = touch ? 10000 : 7000;

    const timers = new Set<Timer>();
    const later = (fn: () => void, ms: number): Timer => {
      const t = setTimeout(() => { timers.delete(t); fn(); }, Math.max(0, ms));
      timers.add(t);
      return t;
    };
    const cancel = (t?: Timer) => { if (t) { clearTimeout(t); timers.delete(t); } };

    let spot: Spot = { edge: "bottom", at: 0 };
    let shown = false, first = true, pokes = 0, squinting = false, awayUntil = 0, activeUntil = 0, roamDue = 0;
    let idleT: Timer | undefined, roamT: Timer | undefined, moveT: Timer | undefined;
    let sayT: Timer | undefined, unsayT: Timer | undefined, squintT: Timer | undefined;

    // ---------- placement ----------
    const range = (edge: Edge): [number, number] => {
      if (touch) return [70, viewW() - 70];
      return edge === "bottom" || edge === "top" ? [120, viewW() - 120] : [140, viewH() - 140];
    };
    const randomSpot = (): Spot => {
      let edge: Edge = "bottom";
      if (!touch) {
        const r = Math.random();
        edge = r < 0.45 ? "bottom" : r < 0.65 ? "top" : r < 0.83 ? "left" : "right";
      }
      const [a, b] = range(edge);
      return { edge, at: b > a ? rand(a, b) : (a + b) / 2 };
    };
    const cornerSpot = (): Spot => ({ edge: "bottom", at: viewW() - (touch ? 70 : 90) });
    const place = (s: Spot) => {
      spot = s;
      const st = anchor.style;
      st.left = st.right = st.top = st.bottom = "auto";
      // bottom/right pin to the edge itself, so mobile toolbars and scrollbars can't hide it
      if (s.edge === "bottom") { st.left = `${s.at}px`; st.bottom = "0px"; }
      else if (s.edge === "top") { st.left = `${s.at}px`; st.top = "0px"; }
      else if (s.edge === "left") { st.left = "0px"; st.top = `${s.at}px`; }
      else { st.right = "0px"; st.top = `${s.at}px`; }
      st.transform = `rotate(${ROT[s.edge]}deg) scale(${scale})`;
    };
    /** Where the head's centre sits once fully slid in (independent of the slide animation). */
    const landedCentre = () => {
      const a = anchor.getBoundingClientRect(), th = (ROT[spot.edge] * Math.PI) / 180;
      const lx = (WRAP_LEFT + wrap.offsetWidth / 2) * scale, ly = (-wrap.offsetHeight / 2) * scale;
      return { x: a.left + lx * Math.cos(th) - ly * Math.sin(th), y: a.top + lx * Math.sin(th) + ly * Math.cos(th) };
    };

    // ---------- speech bubble ----------
    const hush = () => {
      cancel(sayT); cancel(unsayT);
      bubble.style.opacity = "0";
      bubble.style.transform = BUBBLE_OFF;
    };
    const say = (text: string, ms = 2000, delay = 0) => {
      cancel(sayT); cancel(unsayT);
      sayT = later(() => {
        if (!shown) return;
        bubble.textContent = text;
        const c = landedCentre(), vw = viewW(), vh = viewH();
        const dx = vw / 2 - c.x, dy = vh / 2 - c.y, d = Math.hypot(dx, dy) || 1;
        const dist = 80 + (wrap.offsetHeight * scale) / 2; // ~80px clear of the head, toward the centre
        const w = bubble.offsetWidth, h = bubble.offsetHeight, m = 8;
        bubble.style.left = `${clamp(c.x + (dx / d) * dist, w / 2 + m, vw - w / 2 - m).toFixed(1)}px`;
        bubble.style.top = `${clamp(c.y + (dy / d) * dist, h / 2 + m, vh - h / 2 - m).toFixed(1)}px`;
        bubble.style.transition = "none";
        bubble.style.opacity = "0";
        bubble.style.transform = BUBBLE_OFF;
        void bubble.offsetWidth;
        bubble.style.transition = `opacity .35s ${SPRING}, transform .35s ${SPRING}`;
        bubble.style.opacity = "1";
        bubble.style.transform = "translate(-50%,-50%) scale(1)";
        unsayT = later(hush, ms);
      }, delay);
    };

    // ---------- show / hide / roam ----------
    const stopRoam = () => { cancel(roamT); roamT = undefined; cancel(moveT); moveT = undefined; };
    const scheduleRoam = () => {
      cancel(roamT);
      roamDue = performance.now() + rand(7000, 11000);
      roamT = later(roam, roamDue - performance.now());
    };
    const show = () => {
      anchor.style.visibility = "visible";
      wrap.style.transform = "translateY(0)";
      shown = true;
      scheduleRoam();
    };
    const hide = (keepBubble = false) => {
      wrap.style.transform = HIDDEN;
      shown = false;
      activeUntil = performance.now() + 900;
      if (!keepBubble) hush();
      stopRoam();
      // Parked just past the edge isn't enough on its own: iOS Safari paints page content
      // behind its translucent toolbar, so the tucked-away head would still peek through.
      later(() => { if (!shown) anchor.style.visibility = "hidden"; }, 800);
    };
    function roam() {
      roamT = undefined;
      if (!shown) return;
      hide();
      moveT = later(() => {
        moveT = undefined;
        place(randomSpot());
        show();
        if (Math.random() < 0.4) say(pick(LANDED), 2000, 800);
      }, 800);
    }
    const delayRoam = (ms: number) => {
      if (!roamT) return;
      cancel(roamT);
      roamDue += ms;
      roamT = later(roam, roamDue - performance.now());
    };
    const introRunning = () => {
      const fill = document.querySelector<HTMLElement>(".hero-fill");
      return !!fill && getComputedStyle(fill).display !== "none";
    };
    function appear() {
      idleT = undefined;
      const now = performance.now();
      if (now < awayUntil) { idleT = later(appear, awayUntil - now); return; }
      if (introRunning()) { idleT = later(appear, 500); return; }
      if (shown || moveT) return;
      place(first ? cornerSpot() : randomSpot());
      show();
      say(first ? "Still here?" : pick(HELLO), 2000, 950);
      first = false;
    }

    // ---------- eyes ----------
    const setEyes = (sy: number) => eyeEls.forEach((e) => { e.style.transform = sy === 1 ? "" : `scaleY(${sy})`; });
    const blink = () => {
      if (!squinting) {
        setEyes(0.08);
        later(() => { if (!squinting) setEyes(1); }, 120);
      }
      later(blink, rand(2200, 5000));
    };

    // ---------- poke ----------
    pokeRef.current = () => {
      if (!shown) return;
      pokes++;
      head.animate(
        [
          { transform: "translateX(0) rotate(0deg)" },
          { transform: "translateX(-7px) rotate(-6deg)" },
          { transform: "translateX(6px) rotate(5deg)" },
          { transform: "translateX(-4px) rotate(-3deg)" },
          { transform: "translateX(2px) rotate(1.5deg)" },
          { transform: "translateX(0) rotate(0deg)" },
        ],
        { duration: 360, easing: "ease-out" }
      );
      squinting = true;
      setEyes(0.3);
      cancel(squintT);
      squintT = later(() => { squinting = false; setEyes(1); }, 420);
      if (pokes < 3) {
        say(POKES[pokes - 1], 1600);
        delayRoam(6000);
        return;
      }
      pokes = 0;
      say(POKES[2], 2600);
      stopRoam();
      later(() => {
        hide(true); // let the HR line finish its 2.6s
        awayUntil = performance.now() + 15000;
        cancel(idleT);
        idleT = later(appear, 15000);
      }, 2300);
    };

    // ---------- look target ----------
    let mx = viewW() / 2, my = viewH() / 2;
    let tapX = 0, tapY = 0, tapAt = -Infinity;
    let gamma = 0, beta = 45, oriAt = -Infinity;
    let glance = { dx: 0, dy: -200 }, glanceNext = 0;
    const pp = [{ x: 0, y: 0 }, { x: 0, y: 0 }];

    const offFrame = onFrame((now) => {
      if (!shown && now > activeUntil) return; // fully tucked away: nothing to draw
      const r = head.getBoundingClientRect(), hx = r.left + r.width / 2, hy = r.top + r.height / 2;
      let tx = mx, ty = my;
      if (touch) {
        if (now - tapAt < 2500) { tx = tapX; ty = tapY; }
        else if (now - oriAt < 1000) {
          tx = hx + clamp(gamma / 35, -1, 1) * 300;
          ty = hy + clamp((beta - 45) / 35, -1, 1) * 300;
        } else {
          if (now > glanceNext) { glance = { dx: rand(-300, 300), dy: -rand(0, 400) }; glanceNext = now + rand(1200, 3000); }
          tx = hx + glance.dx;
          ty = hy + glance.dy;
        }
      }
      // Undo the anchor rotation so "toward the target" is in the head's own frame.
      const th = (-ROT[spot.edge] * Math.PI) / 180, c = Math.cos(th), s = Math.sin(th);
      eyeEls.forEach((eye, i) => {
        const e = eye.getBoundingClientRect();
        const dx = tx - (e.left + e.width / 2), dy = ty - (e.top + e.height / 2);
        const lx = dx * c - dy * s, ly = dx * s + dy * c;
        const d = Math.hypot(lx, ly) || 1, k = Math.min(11, d / 12) / d;
        pp[i].x += (lx * k - pp[i].x) * 0.2;
        pp[i].y += (ly * k - pp[i].y) * 0.2;
        pupilEls[i].style.transform = `translate(${pp[i].x.toFixed(2)}px,${pp[i].y.toFixed(2)}px)`;
      });
    });

    // ---------- listeners ----------
    const onScroll = () => {
      if (shown || moveT) hide();
      cancel(idleT);
      idleT = later(appear, Math.max(idleMs, awayUntil - performance.now()));
    };
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onPointer = (e: PointerEvent) => { tapX = e.clientX; tapY = e.clientY; tapAt = performance.now(); };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      gamma = e.gamma; beta = e.beta; oriAt = performance.now();
    };
    const onResize = () => {
      const [a, b] = range(spot.edge);
      if (spot.at < a || spot.at > b) place({ ...spot, at: clamp(spot.at, a, Math.max(a, b)) });
    };

    place(cornerSpot()); // parked, hidden, at bottom-right before anything else happens
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (touch) {
      window.addEventListener("pointerdown", onPointer, { passive: true });
      window.addEventListener("deviceorientation", onOrient); // used only where it fires without a prompt
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
    }
    idleT = later(appear, idleMs);
    later(blink, rand(2200, 5000));

    return () => {
      offFrame();
      timers.forEach(clearTimeout);
      timers.clear();
      head.getAnimations().forEach((a) => a.cancel());
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("mousemove", onMouse);
      pokeRef.current = () => {};
    };
  }, [on]); // refs are stable; re-run only when the egg is switched on

  if (!on) return null;

  const blush = { position: "absolute", bottom: 6, width: 14, height: 6, borderRadius: "50%", background: "#ff5a4f", opacity: 0.75 } as const;

  return (
    <>
      <div
        ref={anchorRef}
        aria-hidden="true"
        style={{ position: "fixed", left: "calc(100% - 90px)", bottom: 0, width: 0, height: 0, zIndex: 9980, visibility: "hidden" }}
      >
        <div
          ref={wrapRef}
          style={{ position: "absolute", left: WRAP_LEFT, bottom: 0, transform: HIDDEN, transition: `transform .75s ${SPRING}` }}
        >
          <div
            ref={headRef}
            onClick={() => pokeRef.current()}
            style={{
              position: "relative", display: "flex", gap: 10, padding: "14px 16px 10px", background: "#000",
              borderRadius: "46px 46px 0 0", boxShadow: "0 0 0 1px rgba(255,255,255,.16)", cursor: "pointer",
            }}
          >
            {eyeRefs.map((eyeRef, i) => (
              <span
                key={i}
                ref={eyeRef}
                style={{
                  position: "relative", display: "block", width: 40, height: 40, borderRadius: "50%", background: "#f2f2f0",
                  overflow: "hidden", transformOrigin: "50% 55%", transition: "transform .07s ease",
                }}
              >
                <span
                  ref={pupilRefs[i]}
                  style={{ position: "absolute", left: "50%", top: "50%", width: 17, height: 17, margin: -8.5, borderRadius: "50%", background: "#000" }}
                >
                  <span style={{ position: "absolute", left: 3, top: 3, width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
                </span>
              </span>
            ))}
            <span style={{ ...blush, left: 8 }} />
            <span style={{ ...blush, right: 8 }} />
          </div>
        </div>
      </div>
      <div
        ref={bubbleRef}
        aria-hidden="true"
        style={{
          position: "fixed", left: 0, top: 0, zIndex: 9981, pointerEvents: "none",
          fontFamily: "var(--font-spline-mono), 'Spline Sans Mono', monospace", fontSize: 11, letterSpacing: ".1em",
          color: "#f2f2f0", background: "#000", border: "1px solid rgba(255,255,255,.22)", borderRadius: 20,
          padding: "7px 12px", whiteSpace: "nowrap", opacity: 0, transform: BUBBLE_OFF,
        }}
      />
    </>
  );
}
