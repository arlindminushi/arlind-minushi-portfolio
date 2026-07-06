"use client";

import usePortfolioEffects from "./usePortfolioEffects";
import Nav from "./Nav";
import HomeHero from "./HomeHero";
import Intro from "./Intro";
import MarqueeTop from "./MarqueeTop";
import Capabilities from "./Capabilities";
import Work from "./Work";
import Experience from "./Experience";
import Companies from "./Companies";
import About from "./About";
import Testimonial from "./Testimonial";
import Credentials from "./Credentials";
import Gallery from "./Gallery";
import AskAI from "./AskAI";
import PenaltyGame from "./PenaltyGame";
import MarqueeBottom from "./MarqueeBottom";
import Contact from "./Contact";

export default function Portfolio() {
  usePortfolioEffects();

  return (
    <div id="root" className="root">
      <a href="#home" className="skip-link">
        Skip to content
      </a>
      <div
        id="progressbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: "100%",
          background: "var(--accent)",
          transform: "scaleX(0)",
          transformOrigin: "0 50%",
          zIndex: 950,
          willChange: "transform",
        }}
      />
      <Nav />
      <main>
        <HomeHero />
        <Intro />
        <MarqueeTop />
        <Capabilities />
        <Work />
        <Experience />
        <Companies />
        <About />
        <Testimonial />
        <Credentials />
        <Gallery />
        <AskAI />
        <PenaltyGame />
        <MarqueeBottom />
        <Contact />
      </main>
    </div>
  );
}
