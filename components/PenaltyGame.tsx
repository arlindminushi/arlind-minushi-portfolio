"use client";

import { useEffect, useRef, useState } from "react";

const MONO = "var(--font-jetbrains-mono)";
const SERIF = "var(--font-instrument-serif)";
const BEST_KEY = "penalty-best-streak";

type Zone = { id: string; label: string; x: number; y: number };

// Positions are percentages of the pitch box. Five aim spots inside the goal.
const ZONES: Zone[] = [
  { id: "TL", label: "top left", x: 27, y: 24 },
  { id: "TR", label: "top right", x: 73, y: 24 },
  { id: "C", label: "the middle", x: 50, y: 37 },
  { id: "BL", label: "bottom left", x: 27, y: 50 },
  { id: "BR", label: "bottom right", x: 73, y: 50 },
];

const SPOT = { x: 50, y: 87 };
const KEEPER_HOME = { x: 50, y: 46 };

type Phase = "aim" | "shooting" | "result";

export default function PenaltyGame() {
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [phase, setPhase] = useState<Phase>("aim");
  const [shot, setShot] = useState<number | null>(null);
  const [dive, setDive] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<"goal" | "save" | null>(null);
  const [ball, setBall] = useState({ x: SPOT.x, y: SPOT.y, s: 1 });
  const [keeper, setKeeper] = useState({ x: KEEPER_HOME.x, y: KEEPER_HOME.y });
  const [anim, setAnim] = useState(true);

  const reduce = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    try {
      const b = Number(localStorage.getItem(BEST_KEY));
      if (Number.isFinite(b) && b > 0) setBest(b);
    } catch {}
    reduce.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function later(fn: () => void, ms: number) {
    const t = setTimeout(fn, reduce.current ? Math.min(ms, 50) : ms);
    timers.current.push(t);
  }

  function shoot(i: number) {
    if (phase !== "aim") return;
    const guess = Math.floor(Math.random() * ZONES.length);
    setShot(i);
    setDive(guess);
    setPhase("shooting");
    setAnim(true);
    setBall({ x: ZONES[i].x, y: ZONES[i].y, s: 0.6 });
    setKeeper({ x: ZONES[guess].x, y: ZONES[guess].y });
    later(() => {
      if (guess === i) {
        setOutcome("save");
      } else {
        setStreak((s) => {
          const ns = s + 1;
          setBest((b) => {
            const nb = Math.max(b, ns);
            try {
              localStorage.setItem(BEST_KEY, String(nb));
            } catch {}
            return nb;
          });
          return ns;
        });
        setOutcome("goal");
      }
      setPhase("result");
    }, 720);
  }

  function resetPlacement() {
    setAnim(false);
    setBall({ x: SPOT.x, y: SPOT.y, s: 1 });
    setKeeper({ x: KEEPER_HOME.x, y: KEEPER_HOME.y });
    later(() => setAnim(true), 30);
  }

  function nextShot() {
    setOutcome(null);
    setShot(null);
    setDive(null);
    resetPlacement();
    setPhase("aim");
  }

  function playAgain() {
    setStreak(0);
    nextShot();
  }

  const dur = reduce.current ? 0 : 640;
  const kdur = reduce.current ? 0 : 520;
  const ballTransition = anim
    ? `left ${dur}ms cubic-bezier(.4,.02,.2,1), top ${dur}ms cubic-bezier(.4,.02,.2,1), transform ${dur}ms cubic-bezier(.4,.02,.2,1)`
    : "none";
  const keeperTransition = anim
    ? `left ${kdur}ms cubic-bezier(.34,1.3,.5,1), top ${kdur}ms cubic-bezier(.34,1.3,.5,1), transform ${kdur}ms cubic-bezier(.34,1.3,.5,1)`
    : "none";
  const keeperTilt = keeper.x < 48 ? -22 : keeper.x > 52 ? 22 : 0;

  const status =
    phase === "shooting"
      ? " "
      : "Pick a corner — the keeper guesses on instinct.";

  return (
    <section
      id="play"
      style={{
        padding: "clamp(80px,14vh,170px) clamp(20px,5vw,64px)",
        background: "var(--dark)",
        color: "#eceae2",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <span
          data-reveal
          style={{ fontFamily: MONO, fontSize: "12px", letterSpacing: ".22em", color: "#8a887d", display: "block", marginBottom: "16px" }}
        >
          09 — PLAY
        </span>
        <h2
          data-reveal
          style={{ margin: "0 0 14px", fontSize: "clamp(40px,8vw,96px)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: ".9" }}
        >
          Beat the <em style={{ fontFamily: SERIF, fontWeight: 400, color: "var(--accent)" }}>keeper</em>
        </h2>
        <p
          data-reveal
          style={{ margin: "0 0 clamp(30px,5vh,48px)", fontSize: "16.5px", color: "#b9b7ac", fontWeight: 300, maxWidth: "520px" }}
        >
          One shot, five corners, a keeper diving on a guess. Score as many as you can in a row — miss once and it&rsquo;s back to zero.
        </p>

        {/* Scoreboard */}
        <div
          data-reveal
          style={{ display: "flex", gap: "10px", marginBottom: "18px", fontFamily: MONO, fontSize: "12px", letterSpacing: ".08em" }}
        >
          <span style={{ padding: "8px 14px", border: "1px solid var(--dline)", borderRadius: "999px", color: "#eceae2" }}>
            STREAK&nbsp;<b style={{ color: "var(--accent)" }}>{streak}</b>
          </span>
          <span style={{ padding: "8px 14px", border: "1px solid var(--dline)", borderRadius: "999px", color: "#8a887d" }}>
            BEST&nbsp;<b style={{ color: "#eceae2" }}>{best}</b>
          </span>
        </div>

        {/* Pitch */}
        <div
          data-reveal
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "5 / 4",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid var(--dline)",
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.018) 0 8%, rgba(255,255,255,0) 8% 16%), radial-gradient(120% 90% at 50% 0%, #1b2a20 0%, #141810 60%, #12110c 100%)",
            boxShadow: "inset 0 0 120px rgba(0,0,0,.55)",
          }}
        >
          {/* Goal frame + net */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              top: "12%",
              height: "46%",
              borderLeft: "4px solid rgba(255,255,255,.82)",
              borderRight: "4px solid rgba(255,255,255,.82)",
              borderTop: "5px solid rgba(255,255,255,.9)",
              borderRadius: "3px 3px 0 0",
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 1px, transparent 1px 22px), repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 1px, transparent 1px 22px)",
            }}
          />
          {/* Penalty arc hint */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "82%",
              width: "34%",
              height: "22%",
              transform: "translate(-50%,-50%)",
              border: "2px solid rgba(255,255,255,.14)",
              borderRadius: "50%",
              clipPath: "inset(0 0 55% 0)",
            }}
          />
          {/* Penalty spot */}
          <span
            aria-hidden
            style={{ position: "absolute", left: `${SPOT.x}%`, top: `${SPOT.y}%`, width: "7px", height: "7px", borderRadius: "50%", background: "rgba(255,255,255,.55)", transform: "translate(-50%,-50%)" }}
          />

          {/* Aim zones */}
          {ZONES.map((z, i) => {
            const isShot = shot === i;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => shoot(i)}
                disabled={phase !== "aim"}
                aria-label={`Shoot ${z.label}`}
                style={{
                  position: "absolute",
                  left: `${z.x}%`,
                  top: `${z.y}%`,
                  transform: "translate(-50%,-50%)",
                  width: "clamp(44px,12vw,62px)",
                  height: "clamp(44px,12vw,62px)",
                  borderRadius: "50%",
                  border: `1.5px solid ${isShot ? "var(--accent)" : "rgba(236,234,226,.4)"}`,
                  background: isShot ? "rgba(14,124,134,.22)" : "rgba(236,234,226,.05)",
                  cursor: phase === "aim" ? "pointer" : "default",
                  transition: "background .25s, border-color .25s, transform .25s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                data-style-hover={
                  phase === "aim"
                    ? "background:rgba(14,124,134,.28);border-color:var(--accent);transform:translate(-50%,-50%) scale(1.08);"
                    : undefined
                }
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isShot ? "var(--accent)" : "rgba(236,234,226,.5)" }} />
              </button>
            );
          })}

          {/* Keeper */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: `${keeper.x}%`,
              top: `${keeper.y}%`,
              transform: `translate(-50%,-50%) rotate(${keeperTilt}deg)`,
              transition: keeperTransition,
              width: "clamp(40px,10vw,52px)",
              height: "clamp(52px,13vw,68px)",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            {/* gloves */}
            <span style={{ position: "absolute", top: 0, left: "-6px", width: "16px", height: "16px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 2px rgba(0,0,0,.25)" }} />
            <span style={{ position: "absolute", top: 0, right: "-6px", width: "16px", height: "16px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 2px rgba(0,0,0,.25)" }} />
            {/* head */}
            <span style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", width: "16px", height: "16px", borderRadius: "50%", background: "#e7c9a8" }} />
            {/* body */}
            <span style={{ position: "absolute", top: "26px", left: "50%", transform: "translateX(-50%)", width: "26px", height: "40px", borderRadius: "12px 12px 8px 8px", background: "#2b2a22", border: "1.5px solid rgba(236,234,226,.35)" }} />
          </div>

          {/* Ball */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: `${ball.x}%`,
              top: `${ball.y}%`,
              transform: `translate(-50%,-50%) scale(${ball.s})`,
              transition: ballTransition,
              width: "clamp(22px,6vw,30px)",
              height: "clamp(22px,6vw,30px)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #e9e7df 60%, #cfccc0 100%)",
              boxShadow: "0 6px 14px rgba(0,0,0,.45), inset 0 -3px 6px rgba(0,0,0,.15)",
              zIndex: 4,
            }}
          />

          {/* Result overlay */}
          {phase === "result" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "24px",
                background: "rgba(18,17,12,.55)",
                backdropFilter: "blur(2px)",
                zIndex: 5,
                animation: "fadeIn .3s ease both",
              }}
            >
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(44px,10vw,86px)", lineHeight: 1, color: outcome === "goal" ? "var(--accent)" : "#f3f0e8" }}>
                {outcome === "goal" ? "GOAL!" : "Saved!"}
              </div>
              <p style={{ margin: "16px 0 22px", fontFamily: MONO, fontSize: "13px", letterSpacing: ".04em", color: "#c9c7bc", maxWidth: "340px" }}>
                {outcome === "goal"
                  ? `That's ${streak} in a row. Keep the run going.`
                  : `The keeper went ${dive !== null ? ZONES[dive].label : "the right way"}. You scored ${streak} before that.`}
              </p>
              <button
                type="button"
                onClick={outcome === "goal" ? nextShot : playAgain}
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "999px",
                  padding: "13px 28px",
                  fontFamily: MONO,
                  fontSize: "13px",
                  letterSpacing: ".06em",
                  cursor: "pointer",
                }}
                data-style-hover="filter:brightness(1.1);"
              >
                {outcome === "goal" ? "SHOOT AGAIN" : "PLAY AGAIN"}
              </button>
            </div>
          )}
        </div>

        <p style={{ margin: "18px 0 0", fontFamily: MONO, fontSize: "12px", letterSpacing: ".06em", color: "#8a887d", textAlign: "center", minHeight: "16px" }}>
          {status}
        </p>
      </div>
    </section>
  );
}
