"use client";

import { useState } from "react";
import { content as C } from "@/lib/content";
import { NARROW, useMediaQuery } from "@/lib/motion";

// Four expanding panels, one per role. Hover/click opens one; on mobile all are open.
export default function RolePanels() {
  const [active, setActive] = useState(0);
  const narrow = useMediaQuery(`(max-width: ${NARROW - 1}px)`);

  return (
    <section className="roles-sec">
      <div className="label-row"><span>EVERY STEP, IN DETAIL</span><span>HOVER A YEAR</span></div>
      <div className="roles">
        {C.roles.map((r, i) => {
          const open = narrow || i === active;
          return (
            <div
              key={r.y}
              className={`role${!narrow && i === active ? " is-active" : ""}${open ? " is-open" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="role-bar" />
              <span className="role-year">{r.y}</span>
              <span className="mono-xs dim" style={{ letterSpacing: ".1em" }}>{r.when}</span>
              <span className="role-title">{r.title}</span>
              <span className="mono-sm mut">{r.org}</span>
              <ul className="role-body">
                {r.bullets.map((b) => (
                  <li key={b}><span className="acc">—</span>{b}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
