"use client";

import { useRef } from "react";
import { useReveals } from "@/lib/motion";
import Cursor from "./Cursor";
import Hero from "./Hero";
import Promotion from "./Promotion";
import RolePanels from "./RolePanels";
import Toolbox from "./Toolbox";
import { HackathonPin, HackathonDetails } from "./Hackathon";
import KindWords from "./KindWords";
import Capabilities from "./Capabilities";
import BuiltWith from "./BuiltWith";
import About from "./About";
import BitsRing from "./BitsRing";
import AskChat from "./AskChat";
import KeeperGame from "./KeeperGame";
import Contact from "./Contact";

export default function Portfolio({ hasResume }: { hasResume: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveals(rootRef);

  return (
    <div ref={rootRef} className="k">
      <a href="#main" className="skip-link">Skip to content</a>
      <Cursor />
      <Hero />
      <main id="main">
        <Promotion />
        <RolePanels />
        <Toolbox />
        <HackathonPin />
        <HackathonDetails />
        <KindWords />
        <Capabilities />
        <BuiltWith />
        <About />
        <BitsRing />
        <section className="sec split" id="ask">
          <h2 data-rv className="h-big">ASK MY AI.</h2>
          <div style={{ flex: "1.4 1 420px", minWidth: 0 }}><AskChat /></div>
        </section>
        <section className="white sec split" id="play">
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 data-rv className="h-big" style={{ flex: "none" }}>BEAT THE KEEPER.</h2>
            <p data-rv className="body-p" style={{ fontSize: 15, maxWidth: 360 }}>
              One shot, five corners, a keeper diving on a guess. Score as many as you can in a row — miss once and it’s back to zero.
            </p>
          </div>
          <div style={{ flex: "1.4 1 420px", minWidth: 0, maxWidth: 820 }}><KeeperGame /></div>
        </section>
        <Contact hasResume={hasResume} />
      </main>
    </div>
  );
}
