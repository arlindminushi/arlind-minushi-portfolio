"use client";

import { useEffect, useRef, useState } from "react";
import { onFrame } from "@/lib/motion";

type Geo = { R: DOMRect; gx: number; gy: number; gw: number; gh: number };
type Pose = { x: number; y: number; r: number; a: number; l: number };
type Shot = {
  g: Geo; ax: number; ay: number; px: number; py: number; t0: number; phase: "fly" | "net" | "save";
  hist: [number, number, number][];
  t1?: number; ex?: number; ey?: number; es?: number; er?: number; vx?: number; vy?: number;
  lx?: number; ly?: number; ls?: number; lr?: number;
};
type Dive = { kx: number; ky: number; t0: number };

const BEST_KEY = "am_keeper_best";
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Night-stadium penalty game: aim anywhere in the goal, click to shoot, keeper guesses.
export default function KeeperGame() {
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [hist, setHist] = useState<("g" | "s")[]>([]);
  const streakRef = useRef(0);
  const bestRef = useRef(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<HTMLDivElement>(null);
  const keeperRef = useRef<HTMLDivElement>(null);
  const armL = useRef<HTMLDivElement>(null);
  const armR = useRef<HTMLDivElement>(null);
  const legL = useRef<HTMLDivElement>(null);
  const legR = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const aimRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const g = useRef({
    shot: null as Shot | null,
    dive: null as Dive | null,
    ret: null as { t0: number; from: Pose } | null,
    pose: { x: 0, y: 0, r: 0, a: 0, l: 0 } as Pose,
    busy: false,
    hover: false,
    timers: [] as ReturnType<typeof setTimeout>[],
  });

  const later = (f: () => void, ms: number) => g.current.timers.push(setTimeout(f, ms));

  const geo = (): Geo => {
    const R = rootRef.current!.getBoundingClientRect(), G = goalRef.current!.getBoundingClientRect();
    return { R, gx: G.left - R.left, gy: G.top - R.top, gw: G.width, gh: G.height };
  };
  const aimAt = (e: React.MouseEvent) => {
    const gg = geo(), x = e.clientX - gg.R.left, y = e.clientY - gg.R.top;
    const ax = Math.max(0.04, Math.min(0.96, (x - gg.gx) / gg.gw)), ay = Math.max(0.06, Math.min(0.96, (y - gg.gy) / gg.gh));
    return { g: gg, ax, ay, px: gg.gx + ax * gg.gw, py: gg.gy + ay * gg.gh };
  };

  useEffect(() => {
    try {
      const b = parseInt(localStorage.getItem(BEST_KEY) || "0", 10);
      if (b > 0) { bestRef.current = b; setBest(b); }
    } catch {}
    const st = g.current;
    const t0 = performance.now();

    const resolve = (x: number, y: number) => {
      const s = st.shot!, d = st.dive!, gg = s.g;
      const saved = Math.pow((s.ax - d.kx) / 0.17, 2) + Math.pow((s.ay - d.ky) / 0.42, 2) < 1;
      s.t1 = performance.now(); s.ex = x; s.ey = y; s.es = s.ls; s.er = s.lr;
      if (saved) {
        s.phase = "save";
        const kx = gg.gx + d.kx * gg.gw, ky = gg.gy + d.ky * gg.gh, dx = x - kx || 1, dy = y - ky, n = Math.hypot(dx, dy) || 1;
        s.vx = (dx / n) * gg.R.width * 0.22;
        s.vy = ((dy / n) * 0.6 - 0.4) * gg.R.height * 0.3;
      } else {
        s.phase = "net";
        s.vx = (x - gg.R.width * 0.5) * 0.04;
        s.vy = -gg.R.height * 0.01;
        const net = netRef.current;
        if (net) {
          net.style.transition = "transform .12s ease-out";
          net.style.transform = "scale(1.035,1.06) translateY(1.5%)";
          later(() => { net.style.transition = "transform .7s cubic-bezier(.34,1.9,.5,1)"; net.style.transform = "none"; }, 120);
        }
        const fl = flashRef.current;
        if (fl) {
          fl.style.transition = "none";
          fl.style.opacity = ".16";
          requestAnimationFrame(() => { fl.style.transition = "opacity .5s ease"; fl.style.opacity = "0"; });
        }
      }
      const m = msgRef.current;
      if (m) {
        m.textContent = saved ? "SAVED." : "GOAL!";
        m.style.color = saved ? "#f2f2f0" : "var(--gacc)";
        m.style.transition = "none";
        m.style.opacity = "0";
        m.style.transform = "scale(1.8) skewX(-10deg)";
        requestAnimationFrame(() => requestAnimationFrame(() => {
          m.style.transition = "transform .4s cubic-bezier(.2,1.4,.4,1),opacity .2s";
          m.style.opacity = "1";
          m.style.transform = "scale(1) skewX(-10deg)";
        }));
        later(() => { m.style.transition = "opacity .4s, transform .5s"; m.style.opacity = "0"; m.style.transform = "scale(.9) skewX(-10deg)"; }, 1050);
      }
      const ns = saved ? 0 : streakRef.current + 1, nb = Math.max(bestRef.current, ns);
      streakRef.current = ns;
      bestRef.current = nb;
      try { localStorage.setItem(BEST_KEY, String(nb)); } catch {}
      setStreak(ns);
      setBest(nb);
      setHist((h) => [...h, saved ? ("s" as const) : ("g" as const)].slice(-10));
      later(reset, 1500);
    };

    const reset = () => {
      st.shot = null;
      st.ret = { t0: performance.now(), from: { ...st.pose } };
      st.dive = null;
      const b = ballRef.current;
      if (b) {
        b.style.transform = "none";
        b.style.opacity = "0";
        b.style.transition = "opacity .3s";
        requestAnimationFrame(() => { b.style.opacity = "1"; });
        later(() => { b.style.transition = "none"; }, 320);
      }
      if (shadowRef.current) { shadowRef.current.style.transform = "none"; shadowRef.current.style.opacity = ".8"; }
      if (aimRef.current && st.hover) aimRef.current.style.opacity = "1";
      st.busy = false;
    };

    const flight = (now: number) => {
      const s = st.shot!, gg = s.g, B = ballRef.current!, S = { x: gg.R.width * 0.5, y: gg.R.height * 0.86 };
      const trails = Array.from(trailRef.current?.children ?? []) as HTMLElement[];
      let x: number, y: number, sc: number, rot: number, op = 1;
      const t = Math.min(1, (now - s.t0) / 560);
      if (s.phase === "fly") {
        const e = 1 - Math.pow(1 - t, 2);
        x = S.x + (s.px - S.x) * e + Math.sin(Math.PI * t) * (s.px - S.x) * 0.18;
        y = S.y + (s.py - S.y) * e - Math.sin(Math.PI * t) * gg.R.height * 0.05;
        sc = 1 - 0.56 * e;
        rot = t * 900 * (s.px < S.x ? -1 : 1);
        const sh = shadowRef.current;
        if (sh) {
          const base = S.y + gg.R.height * 0.02, shy = base + (gg.gy + gg.gh - base) * e;
          sh.style.transform = `translate(${(x - S.x).toFixed(1)}px,${(shy - base).toFixed(1)}px) scale(${(1 - 0.55 * e).toFixed(3)})`;
          sh.style.opacity = String(0.8 * (1 - 0.5 * e));
        }
        s.hist.unshift([x, y, sc]);
        s.hist.length = Math.min(s.hist.length, 16);
        trails.forEach((tr, k) => {
          const h = s.hist[2 + k * 3];
          if (!h) { tr.style.opacity = "0"; return; }
          tr.style.transform = `translate(${h[0].toFixed(1)}px,${h[1].toFixed(1)}px) scale(${h[2].toFixed(3)})`;
          tr.style.marginLeft = tr.style.marginTop = `${(-gg.R.width * 0.021).toFixed(1)}px`;
          tr.style.opacity = String(Math.max(0, 0.3 - k * 0.055));
        });
        s.lx = x; s.ly = y; s.ls = sc; s.lr = rot;
        if (t >= 1) resolve(x, y);
      } else {
        const u = Math.min(1, (now - s.t1!) / 450), e = easeOut(u);
        x = s.ex! + s.vx! * e;
        y = s.ey! + s.vy! * e + (s.phase === "net" ? gg.R.height * 0.05 * e * e : 0);
        sc = s.es! * (s.phase === "net" ? 1 - 0.12 * e : 1 + 0.25 * e);
        rot = s.er! + 600 * e * (s.vx! < 0 ? -1 : 1);
        op = s.phase === "net" ? 1 : 1 - e;
        trails.forEach((tr) => { tr.style.opacity = "0"; });
      }
      B.style.transform = `translate(${(x - S.x).toFixed(1)}px,${(y - S.y).toFixed(1)}px) scale(${sc.toFixed(3)}) rotate(${rot.toFixed(0)}deg)`;
      B.style.opacity = String(op);
    };

    const off = onFrame((now) => {
      const root = rootRef.current, K = keeperRef.current;
      if (!root || !K) return;
      const r = root.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const T = (now - t0) / 1000, P = st.pose;
      if (liveRef.current) liveRef.current.style.opacity = String(0.35 + 0.65 * Math.abs(Math.sin(T * 2.2)));
      if (st.dive) {
        const d = st.dive, e = easeOut(Math.max(0, Math.min(1, (now - d.t0) / 420))), gg = geo(), side = d.kx - 0.5;
        P.x = side * gg.gw * 0.92 * e; P.y = -(1 - d.ky) * gg.gh * 0.62 * e; P.r = Math.max(-82, Math.min(82, side * 190)) * e; P.a = 150 * e; P.l = 16 * e;
      } else if (st.ret) {
        const t = Math.max(0, Math.min(1, (now - st.ret.t0) / 380)), e = easeOut(t), s = st.ret.from;
        P.x = s.x * (1 - e); P.y = s.y * (1 - e); P.r = s.r * (1 - e); P.a = s.a * (1 - e); P.l = s.l * (1 - e);
        if (t >= 1) st.ret = null;
      } else {
        const gg = geo();
        P.x = Math.sin(T * 1.7) * gg.gw * 0.035; P.y = -Math.abs(Math.sin(T * 3.4)) * gg.gh * 0.02; P.r = Math.sin(T * 1.7) * 3; P.a = 0; P.l = 0;
      }
      K.style.transform = `translate(${P.x.toFixed(1)}px,${P.y.toFixed(1)}px) rotate(${P.r.toFixed(2)}deg)`;
      if (armL.current) armL.current.style.transform = `rotate(${(18 + P.a).toFixed(1)}deg)`;
      if (armR.current) armR.current.style.transform = `rotate(${(-18 - P.a).toFixed(1)}deg)`;
      if (legL.current) legL.current.style.transform = `rotate(${P.l.toFixed(1)}deg)`;
      if (legR.current) legR.current.style.transform = `rotate(${(-P.l).toFixed(1)}deg)`;
      if (st.shot) flight(now);
    });

    return () => {
      off();
      st.timers.forEach(clearTimeout);
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const aim = aimRef.current;
    if (!aim) return;
    g.current.hover = true;
    const a = aimAt(e);
    aim.style.left = `${a.px.toFixed(1)}px`;
    aim.style.top = `${a.py.toFixed(1)}px`;
    aim.style.opacity = g.current.busy ? ".25" : "1";
  };
  const onLeave = () => {
    g.current.hover = false;
    if (aimRef.current) aimRef.current.style.opacity = "0";
  };
  const onShoot = (e: React.MouseEvent) => {
    const st = g.current;
    if (st.busy || !ballRef.current) return;
    st.busy = true;
    const a = aimAt(e);
    if (aimRef.current) aimRef.current.style.opacity = ".25";
    ballRef.current.style.transition = "none";
    st.shot = { g: a.g, ax: a.ax, ay: a.ay, px: a.px, py: a.py, t0: performance.now(), phase: "fly", hist: [] };
    st.ret = null;
    st.dive = { kx: 0.1 + Math.random() * 0.8, ky: 0.15 + Math.random() * 0.8, t0: performance.now() + 70 };
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div ref={rootRef} className="kg" onMouseMove={onMove} onMouseLeave={onLeave} onClick={onShoot} role="application" aria-label="Penalty mini-game: click inside the goal to shoot">
      <div className="kg-lights" />
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" className="kg-pitch" aria-hidden="true">
        <polygon points="-400,1000 -100,1000 395,540 260,540" fill="#0b0b0b" />
        <polygon points="200,1000 500,1000 665,540 530,540" fill="#0b0b0b" />
        <polygon points="800,1000 1100,1000 935,540 800,540" fill="#0b0b0b" />
        <polygon points="1400,1000 1700,1000 1205,540 1070,540" fill="#0b0b0b" />
        <line x1="120" y1="540" x2="1480" y2="540" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
        <polygon points="450,540 1150,540 1235,640 365,640" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        <polygon points="250,540 1350,540 1560,930 40,930" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="2" />
        <ellipse cx="800" cy="862" rx="10" ry="5" fill="rgba(255,255,255,.55)" />
      </svg>
      <div ref={goalRef} className="kg-goal">
        <div ref={netRef} className="kg-net" />
        <div className="kg-bar" />
        <div className="kg-post" style={{ left: "-1.2%" }} />
        <div className="kg-post" style={{ right: "-1.2%" }} />
        <div ref={keeperRef} className="kg-keeper">
          <div ref={legL} className="kg-leg" style={{ left: "24%" }} />
          <div ref={legR} className="kg-leg" style={{ right: "24%" }} />
          <div className="kg-body"><div /></div>
          <div className="kg-head" />
          <div ref={armL} className="kg-arm" style={{ left: "6%", transform: "rotate(18deg)" }}><div /></div>
          <div ref={armR} className="kg-arm" style={{ right: "6%", transform: "rotate(-18deg)" }}><div /></div>
        </div>
      </div>
      <div ref={shadowRef} className="kg-shadow" />
      <div ref={trailRef}>
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="kg-trail" />)}
      </div>
      <div ref={ballRef} className="kg-ball" />
      <div ref={aimRef} className="kg-aim"><span /><span /><span /></div>
      <div className="kg-hud kg-top">
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span ref={liveRef} className="kg-live" />LIVE · PENALTIES</span>
        <span style={{ display: "flex", gap: 6 }}>
          <span className="kg-chip">STREAK <b style={{ color: "var(--gacc)" }}>{pad(streak)}</b></span>
          <span className="kg-chip">BEST <b>{pad(best)}</b></span>
        </span>
      </div>
      <div className="kg-hud kg-bottom">
        <span style={{ color: "rgba(255,255,255,.55)" }}>AIM ANYWHERE IN THE GOAL — CLICK TO SHOOT</span>
        <span style={{ display: "flex", gap: 5 }}>
          {hist.map((h, i) => (
            <span key={i} className="kg-dot" style={h === "g" ? { background: "var(--gacc)", borderColor: "var(--gacc)" } : undefined} />
          ))}
        </span>
      </div>
      <div ref={msgRef} className="kg-msg" />
      <div ref={flashRef} className="kg-flash" />
    </div>
  );
}
