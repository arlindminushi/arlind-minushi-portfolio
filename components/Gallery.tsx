"use client";

import { useState } from "react";
import Image from "next/image";
import { gallery, dadJokes } from "@/lib/data";

export default function Gallery() {
  const [joke, setJoke] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const tellJoke = () => {
    let i = Math.floor(Math.random() * dadJokes.length);
    if (dadJokes.length > 1 && dadJokes[i] === joke) i = (i + 1) % dadJokes.length;
    setJoke(dadJokes[i]);
    setCount((c) => c + 1);
  };
  return (
    <section id="gallery" style={{ padding: 'clamp(80px,14vh,170px) clamp(20px,5vw,64px)', background: 'var(--paper2)', borderBlock: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div data-line style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg,var(--accent),transparent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .9s cubic-bezier(.16,1,.3,1)', marginBottom: 'clamp(22px,3.5vh,38px)' }}></div>
        <span data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', letterSpacing: '.22em', color: 'var(--muted)', display: 'block', marginBottom: '16px' }}>07 — OFF THE CLOCK</span>
        <h2 data-reveal style={{ margin: '0 0 12px', fontSize: 'clamp(40px,8vw,110px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: '.9', color: 'var(--ink)' }}>Bits of <em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400 }}>me</em></h2>
        <p data-reveal style={{ margin: '0 0 clamp(40px,6vh,60px)', fontSize: '16.5px', color: 'var(--muted)', fontWeight: 300, maxWidth: '560px', marginBottom: 'clamp(44px,7vh,68px)' }}>The work matters, but it’s not the whole picture. A few things from outside the editor — and when I’m not shipping products, I might just be taking your elo on FACEIT. <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '13px', color: 'var(--accent)', whiteSpace: 'nowrap' }}>// CS2</span></p>
        <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', margin: '0 0 clamp(40px,6vh,60px)', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', letterSpacing: '.14em', color: 'var(--muted)' }}><span>LIFTING HEAVY</span><span style={{ color: 'var(--accent)' }}>·</span><span>FOOTBALL</span><span style={{ color: 'var(--accent)' }}>·</span><span>PADEL</span><span style={{ color: 'var(--accent)' }}>·</span><span>CS2</span></div>
        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start', margin: '0 0 clamp(38px,5.5vh,56px)' }}>
          <button type="button" onClick={tellJoke} data-style-hover="border-color:var(--accent);color:var(--accent);" style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '13px', letterSpacing: '.08em', color: 'var(--ink2)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', padding: '12px 22px', cursor: 'pointer', transition: 'border-color .3s,color .3s' }}>
            {joke ? 'ANOTHER ONE →' : 'CLICK FOR A LAUGH →'}
          </button>
          {joke && (
            <p key={count} style={{ margin: 0, maxWidth: '640px', fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontSize: 'clamp(19px,2.3vw,28px)', lineHeight: 1.3, color: 'var(--ink)', animation: 'fadeIn .35s ease both' }}>
              <span style={{ color: 'var(--accent)' }}>“</span>{joke}<span style={{ color: 'var(--accent)' }}>”</span>
            </p>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(clamp(220px,28vw,300px),1fr))', gap: '24px 18px', alignItems: 'start' }}>
          {gallery.map((item) => (
            <figure data-reveal key={item.src} style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 300px" style={{ display: 'block', width: '100%', height: 'auto', transition: 'transform .9s cubic-bezier(.16,1,.3,1)' }} data-style-hover="transform:scale(1.05);" />
              </div>
              <figcaption style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--muted)', marginTop: '10px', lineHeight: '1.5' }}>
                {item.caption}
                {item.tag && <> <span style={{ color: 'var(--accent)', whiteSpace: 'nowrap' }}>{item.tag}</span></>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
