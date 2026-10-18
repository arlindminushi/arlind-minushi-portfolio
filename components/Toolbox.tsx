"use client";

import { useEffect, useRef } from "react";
import { content as C } from "@/lib/content";
import { onFrame, prefersReducedMotion } from "@/lib/motion";

const SIZES = ["clamp(44px,7vw,124px)", "clamp(30px,4.4vw,78px)", "clamp(56px,9vw,160px)", "clamp(26px,3.4vw,60px)", "clamp(38px,5.6vw,100px)"];
const FX: Record<string, string> = {
  Python: "python", Django: "django", React: "react", TypeScript: "ts", Databricks: "databricks", "Azure AD": "azure",
  AWS: "aws", "React Native": "rn", PostgreSQL: "pg", "OAuth 2.0": "oauth", Docker: "docker", "Unity Catalog": "unity",
};
const ACC = "#ff5a4f";

type Fx = {
  name: string;
  chars: HTMLElement[];
  layer: HTMLElement;
  t0: number;
  timers: ReturnType<typeof setTimeout>[];
  snakeW?: number;
  W?: number;
  pos?: { x: number; w: number }[];
};
type Word = HTMLElement & { _x?: number; _y?: number };

function stopFx(fx: Map<HTMLElement, Fx>, el: HTMLElement) {
  const st = fx.get(el);
  if (!st) return;
  st.timers.forEach(clearTimeout);
  st.chars.forEach((c) => {
    c.style.transition = "transform .4s cubic-bezier(.16,1,.3,1),opacity .3s";
    for (const k of ["transform", "opacity", "visibility", "outline", "backgroundImage", "backgroundRepeat", "backgroundSize", "backgroundPosition", "webkitBackgroundClip", "backgroundClip", "color", "webkitTextStroke"] as const) {
      (c.style as unknown as Record<string, string>)[k] = "";
    }
    const o = c.dataset.c;
    if (o != null && c.textContent !== o) c.textContent = o;
  });
  st.layer.innerHTML = "";
  fx.delete(el);
}

function startFx(fx: Map<HTMLElement, Fx>, el: HTMLElement) {
  if (prefersReducedMotion()) return;
  stopFx(fx, el);
  const name = el.dataset.fx || "";
  const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-tc]"));
  const layer = el.querySelector<HTMLElement>("[data-fxl]");
  if (!layer || !chars.length) return;
  const st: Fx = { name, chars, layer, t0: performance.now(), timers: [] };
  fx.set(el, st);
  const later = (f: () => void, ms: number) => st.timers.push(setTimeout(f, ms));
  const alive = () => fx.get(el) === st;
  const W = el.offsetWidth, H = el.offsetHeight, fs = parseFloat(getComputedStyle(el).fontSize) || 60;
  const rel = () => {
    const b = el.getBoundingClientRect();
    return chars.map((c) => { const r = c.getBoundingClientRect(); return { x: r.left - b.left, w: r.width }; });
  };
  const label = (txt: string) =>
    `<span data-lbl class="fx-label">${txt}</span>`;
  const showLbl = (ms = 0) => later(() => { const l = layer.querySelector<HTMLElement>("[data-lbl]"); if (l) l.style.opacity = "1"; }, ms);
  chars.forEach((c) => { c.style.transition = "none"; });

  if (name === "python") {
    // A snake slithering *inside* the letters: shared moving background, clipped to text.
    const SH = chars[0].offsetHeight || fs, SW = Math.max(W * 0.7, SH * 3), cy = SH * 0.6, amp = SH * 0.15, wl = SH * 0.9, th = SH * 0.22;
    const x1 = SW - SH * 0.32;
    let d = `M${(th * 0.6).toFixed(1)} ${cy.toFixed(1)}`;
    for (let x = th * 0.6, k = 0; x < x1; x += wl / 2, k++) {
      const nx = Math.min(x1, x + wl / 2);
      d += ` Q${((x + nx) / 2).toFixed(1)} ${(cy + (k % 2 ? amp : -amp) * 2).toFixed(1)} ${nx.toFixed(1)} ${cy.toFixed(1)}`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW.toFixed(0)}" height="${SH.toFixed(0)}"><path d="${d}" fill="none" stroke="${ACC}" stroke-width="${th.toFixed(1)}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="${(th * 0.7).toFixed(1)}" stroke-dasharray="${(th * 0.22).toFixed(1)} ${(th * 0.38).toFixed(1)}"/><ellipse cx="${(x1 + SH * 0.08).toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(th * 0.85).toFixed(1)}" ry="${(th * 0.62).toFixed(1)}" fill="${ACC}"/><circle cx="${(x1 + SH * 0.16).toFixed(1)}" cy="${(cy - th * 0.18).toFixed(1)}" r="${(th * 0.12).toFixed(1)}" fill="#000"/></svg>`;
    const snake = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    st.snakeW = SW; st.pos = rel(); st.W = W;
    chars.forEach((c) => Object.assign(c.style, {
      backgroundImage: `${snake}, linear-gradient(var(--ink),var(--ink))`,
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundSize: `${SW.toFixed(0)}px ${SH.toFixed(0)}px, 100% 100%`,
      webkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", webkitTextStroke: "0px",
    }));
    layer.innerHTML = label("import this");
    showLbl(150);
  } else if (name === "django") {
    const spawn = () => {
      if (!alive()) return;
      const s = document.createElement("span");
      s.textContent = Math.random() < 0.5 ? "♪" : "♫";
      s.className = "fx-note";
      s.style.left = `${(Math.random() * 90 + 5).toFixed(1)}%`;
      layer.appendChild(s);
      later(() => s.remove(), 1500);
      later(spawn, 200);
    };
    spawn();
  } else if (name === "react") {
    layer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -50 200 100" preserveAspectRatio="none" style="position:absolute;left:50%;top:50%;width:${(W * 1.2).toFixed(0)}px;height:${(H * 1.7).toFixed(0)}px;transform:translate(-50%,-50%);overflow:visible;"><g style="transform-origin:0 0;animation:amSpin 4s linear infinite;">${[0, 60, 120].map((a) => `<g transform="rotate(${a})"><ellipse rx="96" ry="24" fill="none" stroke="var(--acc)" stroke-width="1.6" vector-effect="non-scaling-stroke"/><circle cx="96" cy="0" r="3.5" fill="var(--acc)"/></g>`).join("")}</g></svg>`;
  } else if (name === "ts") {
    layer.innerHTML = '<span class="fx-caret"></span>';
    const caret = layer.firstChild as HTMLElement, pos = rel(), n = chars.length;
    const place = (k: number) => { caret.style.left = `${(k === 0 ? 0 : pos[k - 1].x + pos[k - 1].w).toFixed(1)}px`; };
    let k = n;
    place(k);
    const type = () => { if (!alive()) return; if (k < n) { chars[k].style.visibility = "visible"; k++; place(k); later(type, 80); } };
    const erase = () => { if (!alive()) return; if (k > 0) { k--; chars[k].style.visibility = "hidden"; place(k); later(erase, 45); } else later(type, 260); };
    later(erase, 120);
  } else if (name === "databricks") {
    chars.forEach((c, i) => { c.style.transform = `translateY(-1.4em) rotate(${(i % 2 ? 1 : -1) * 18}deg)`; c.style.opacity = "0"; });
    void el.offsetWidth;
    requestAnimationFrame(() => chars.forEach((c, i) => {
      c.style.transition = `transform .6s cubic-bezier(.3,1.5,.5,1) ${i * 0.05}s,opacity .2s ${i * 0.05}s`;
      c.style.transform = "none";
      c.style.opacity = "1";
    }));
  } else if (name === "azure") {
    layer.innerHTML = '<span class="fx-scan"></span><span data-ok class="fx-ok">✓ VERIFIED</span>';
    later(() => { const ok = layer.querySelector<HTMLElement>("[data-ok]"); if (ok) ok.style.opacity = "1"; }, 1000);
  } else if (name === "aws") {
    const x1 = W * 0.06, y1 = H * 0.92, cx = W * 0.45, cy = H * 1.24, x2 = W * 0.84, y2 = H * 0.9, sw = Math.max(3, fs * 0.05);
    layer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${(H * 1.4).toFixed(0)}" style="position:absolute;left:0;top:0;overflow:visible;"><path data-sm d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2} M${x2 - W * 0.07} ${y2 - H * 0.06} L${x2} ${y2} L${x2 - W * 0.05} ${y2 + H * 0.1}" fill="none" stroke="var(--acc)" stroke-width="${sw.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const p = layer.querySelector<SVGPathElement>("[data-sm]");
    if (p?.getTotalLength) {
      const L = p.getTotalLength();
      p.style.strokeDasharray = String(L);
      p.style.strokeDashoffset = String(L);
      void p.getBoundingClientRect();
      requestAnimationFrame(() => { p.style.transition = "stroke-dashoffset .8s cubic-bezier(.65,0,.35,1)"; p.style.strokeDashoffset = "0"; });
    }
  } else if (name === "rn") {
    layer.innerHTML = '<span data-ph class="fx-phone"><span></span></span>';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const ph = layer.querySelector<HTMLElement>("[data-ph]");
      if (ph) { ph.style.transform = "none"; ph.style.opacity = "1"; }
    }));
    chars.forEach((c) => { c.style.transform = "scale(.6)"; c.style.opacity = ".3"; });
    void el.offsetWidth;
    requestAnimationFrame(() => chars.forEach((c, i) => {
      c.style.transition = `transform .45s cubic-bezier(.34,1.56,.64,1) ${0.15 + i * 0.03}s,opacity .3s ${0.15 + i * 0.03}s`;
      c.style.transform = "none";
      c.style.opacity = "1";
    }));
  } else if (name === "pg") {
    layer.innerHTML = label("ORDER BY letter ASC");
    showLbl(50);
    const sort = (on: boolean) => {
      if (!alive()) return;
      const pos = rel();
      const order = chars
        .map((c, i) => ({ i, ch: (c.dataset.c || "").toLowerCase() }))
        .sort((a, b) => (a.ch < b.ch ? -1 : a.ch > b.ch ? 1 : a.i - b.i));
      let x = 0;
      const tx: number[] = [];
      order.forEach((o) => { tx[o.i] = x - pos[o.i].x; x += pos[o.i].w; });
      chars.forEach((c, i) => {
        c.style.transition = `transform .7s cubic-bezier(.65,0,.35,1) ${i * 0.025}s`;
        c.style.transform = on ? `translateX(${tx[i].toFixed(1)}px)` : "none";
      });
      later(() => sort(!on), on ? 1500 : 900);
    };
    later(() => sort(true), 120);
  } else if (name === "oauth") {
    layer.innerHTML = label("TOKEN ISSUED ✓");
    const pool = "ABCDEF0123456789#$%&*";
    let f = 0;
    const N = 10 + chars.length;
    const step = () => {
      if (!alive()) return;
      f++;
      chars.forEach((c, i) => {
        const o = c.dataset.c || "";
        if (o === " ") return;
        c.textContent = f > 10 + i ? o : pool[(Math.random() * pool.length) | 0];
      });
      if (f < N) later(step, 45); else showLbl(0);
    };
    step();
  } else if (name === "docker") {
    chars.forEach((c, i) => later(() => {
      if (c.dataset.c !== " ") { c.style.outline = ".035em solid var(--acc)"; c.style.outlineOffset = "-.02em"; }
    }, i * 60));
  } else if (name === "unity") {
    const pos = rel(), n = chars.length, sp = 0.05 * fs;
    let k = 0;
    layer.innerHTML = chars
      .map((c, i) => (c.dataset.c === " " ? "" : `<span data-idx class="fx-idx" style="left:${(pos[i].x + pos[i].w / 2 + (i - (n - 1) / 2) * sp).toFixed(1)}px;transition:opacity .3s ${i * 0.04}s,transform .4s ${i * 0.04}s;">${String(++k).padStart(2, "0")}</span>`))
      .join("");
    chars.forEach((c) => { c.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)"; });
    requestAnimationFrame(() => {
      chars.forEach((c, i) => { c.style.transform = `translateX(${((i - (n - 1) / 2) * sp).toFixed(1)}px)`; });
      layer.querySelectorAll<HTMLElement>("[data-idx]").forEach((s) => { s.style.opacity = "1"; s.style.transform = "translate(-50%,0)"; });
    });
  }
}

export default function Toolbox() {
  const secRef = useRef<HTMLElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = toolRef.current;
    if (!box) return;
    const words = Array.from(box.querySelectorAll<Word>("[data-tool]"));
    const fx = new Map<HTMLElement, Fx>();
    const reduce = prefersReducedMotion();
    let base: { x: number; y: number }[] = [];
    let mx: number | null = null, my: number | null = null;

    const layout = () => {
      words.forEach((el) => { el.style.transform = "none"; el._x = 0; el._y = 0; });
      const c = box.getBoundingClientRect();
      base = words.map((el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top }; });
    };
    const onMove = (e: MouseEvent) => { const c = box.getBoundingClientRect(); mx = e.clientX - c.left; my = e.clientY - c.top; };
    const onLeave = () => { mx = null; my = null; };
    const enters = words.map((el) => {
      const on = () => startFx(fx, el), off = () => stopFx(fx, el);
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
      return () => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); };
    });

    layout();
    const lt = setTimeout(layout, 800);
    document.fonts?.ready.then(layout);
    window.addEventListener("resize", layout);
    box.addEventListener("mousemove", onMove);
    box.addEventListener("mouseleave", onLeave);

    const off = onFrame((nowMs) => {
      const now = nowMs / 1000;
      // Idle float + cursor repel. Only while near the viewport.
      const r = box.getBoundingClientRect();
      if (!reduce && r.bottom > -200 && r.top < window.innerHeight + 200) {
        words.forEach((el, i) => {
          const b = base[i];
          if (!b) return;
          let dx = 0, dy = 0;
          if (mx != null && my != null && !fx.has(el)) {
            const vx = b.x - mx, vy = b.y - my, d = Math.hypot(vx, vy) || 1, f = Math.max(0, 1 - d / 240);
            dx = (vx / d) * f * 80;
            dy = (vy / d) * f * 80;
          }
          const tx = dx + Math.sin(now * 0.8 + i * 1.7) * 6, ty = dy + Math.cos(now * 0.6 + i * 2.3) * 9;
          el._x = (el._x || 0) + (tx - (el._x || 0)) * 0.12;
          el._y = (el._y || 0) + (ty - (el._y || 0)) * 0.12;
          el.style.transform = `translate(${el._x.toFixed(1)}px,${el._y.toFixed(1)}px) rotate(${(el._x * 0.08).toFixed(2)}deg)`;
        });
      }
      fx.forEach((st) => {
        const t = (nowMs - st.t0) / 1000;
        if (st.name === "python") {
          const W = st.W || 400, SW = st.snakeW || 0, o = ((t * W * 0.55) % (W + SW)) - SW;
          st.chars.forEach((c, i) => {
            c.style.transform = `translateY(${(Math.sin(t * 6 - i * 0.9) * 0.05).toFixed(3)}em) rotate(${(Math.cos(t * 6 - i * 0.9) * 3).toFixed(2)}deg)`;
            if (st.pos?.[i]) c.style.backgroundPosition = `${(o - st.pos[i].x).toFixed(1)}px 0, 0 0`;
          });
        } else if (st.name === "django") {
          st.chars.forEach((c, i) => { c.style.transform = `translate(${(Math.sin(t * 70 + i * 2) * 1.4).toFixed(2)}px,${(Math.cos(t * 55 + i) * 0.8).toFixed(2)}px)`; });
        } else if (st.name === "aws") {
          st.chars.forEach((c, i) => { c.style.transform = `translateY(${(Math.sin(t * 3 + i * 0.8) * 0.05).toFixed(3)}em)`; });
        } else if (st.name === "docker") {
          const y = Math.sin(t * 2.6) * 0.05, rr = Math.sin(t * 2.6 + 1) * 2.2;
          st.chars.forEach((c) => { c.style.transform = `translateY(${y.toFixed(3)}em) rotate(${rr.toFixed(2)}deg)`; });
        }
      });
    });

    return () => {
      off();
      clearTimeout(lt);
      enters.forEach((f) => f());
      fx.forEach((_, el) => stopFx(fx, el));
      window.removeEventListener("resize", layout);
      box.removeEventListener("mousemove", onMove);
      box.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={secRef} className="statement-sec">
      <div className="statement">
        <span className="mono-xs dim" style={{ fontSize: 12, letterSpacing: ".06em" }}>{C.quote}</span>
        <p className="statement-p">
          {C.statement.split(" ").map((w, i) => (
            <span key={i} className="mask"><span data-up style={{ display: "inline-block" }}>{w}&nbsp;</span></span>
          ))}
        </p>
      </div>
      <div ref={toolRef} className="toolbox">
        <div className="label-row"><span>THE TOOLBOX</span><span>HOVER EACH ONE</span></div>
        <div className="tool-cloud">
          {C.stack.map((s, i) => (
            <span
              key={s}
              data-tool
              data-fx={FX[s] || "none"}
              className={`tool${i % 3 === 1 ? " is-outline" : ""}`}
              style={{ fontSize: SIZES[i % SIZES.length] }}
            >
              {s.split("").map((ch, k) => (
                <span key={k} data-tc data-c={ch} className="tc">{ch}</span>
              ))}
              <span data-fxl className="fx-layer" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
