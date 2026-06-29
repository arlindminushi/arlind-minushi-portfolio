import Image from "next/image";

export default function HomeHero() {
  return (
    <section id="home" style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', padding: 'clamp(104px,15vh,180px) clamp(20px,5vw,64px) clamp(78px,11vh,118px)' }}>
      <div data-hero-corner data-show="flex" style={{ position: 'absolute', top: 'clamp(18px,2.4vh,30px)', left: 'clamp(20px,5vw,64px)', alignItems: 'center', gap: 8, fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--muted)', pointerEvents: 'none', zIndex: 3 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}></span>AM</div>
      <div data-hero-corner data-show="block" style={{ position: 'absolute', top: 'clamp(18px,2.4vh,30px)', right: 'clamp(20px,5vw,64px)', fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--muted)', pointerEvents: 'none', zIndex: 3 }}>© 2026</div>
      <div data-hero-corner data-show="flex" style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(18px,2.4vh,30px)', padding: '0 clamp(20px,5vw,64px)', alignItems: 'center', justifyContent: 'space-between', gap: 18, fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)', pointerEvents: 'none', zIndex: 3 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 9, flex: 'none' }}>SCROLL<span style={{ color: 'var(--accent)' }}>↓</span></span>
        <span data-hero-strip style={{ display: 'flex', alignItems: 'center', gap: 'clamp(7px,1vw,13px)', whiteSpace: 'nowrap', overflow: 'hidden', letterSpacing: '.05em' }}>Python<span style={{ color: 'var(--accent)' }}>·</span>SQL<span style={{ color: 'var(--accent)' }}>·</span>Django<span style={{ color: 'var(--accent)' }}>·</span>React / TypeScript<span style={{ color: 'var(--accent)' }}>·</span>Azure<span style={{ color: 'var(--accent)' }}>·</span>Databricks<span style={{ color: 'var(--accent)' }}>·</span>Unity Catalog</span>
        <span style={{ flex: 'none' }}>Pristina, Kosovo · CET</span>
      </div>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div data-hero-anim style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 'clamp(11px,1.3vw,13px)', letterSpacing: '.18em', color: 'var(--muted)', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginBottom: 'clamp(22px,4vh,40px)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2.4s ease-in-out infinite' }}></span>SENIOR SOFTWARE ENGINEER</span><span style={{ color: 'var(--line)' }}>/</span>TECH LEAD<span style={{ color: 'var(--line)' }}>/</span>ENGINEERING MANAGER
        </div>
        <div data-hero-anim style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--muted)', marginBottom: 'clamp(6px,1vh,12px)' }}>Principal Consultant · Data &amp; Platform Engineering</div>
        <h1 style={{ margin: 0, fontWeight: 700, lineHeight: '.82', letterSpacing: '-.04em', fontSize: 'clamp(66px,16.5vw,300px)', color: 'var(--ink)' }}>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '.05em' }}><span data-hero-anim style={{ display: 'block' }}>ARLIND</span></span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '.05em' }}><span data-hero-anim style={{ display: 'block' }}>MINUSHI</span></span>
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 30, marginTop: 'clamp(24px,4vh,46px)' }}>
          <p data-hero-anim style={{ margin: 0, maxWidth: 680, fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontSize: 'clamp(27px,4vw,56px)', lineHeight: '1.12', color: 'var(--ink2)' }}>Engineer, lead, and the person the team keeps turning to — building enterprise platforms in Prishtina, Kosovo.</p>
          <a href="#work" data-hero-anim style={{ flex: 'none', fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, letterSpacing: '.1em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1.5px solid var(--ink)', paddingBottom: 5, transition: 'color .3s,border-color .3s' }} data-style-hover="color:var(--accent);border-color:var(--accent);">SEE SELECTED WORK ↓</a>
        </div>
      </div>
      <div data-hero-anim id="herowrap" style={{ maxWidth: 560, margin: 'clamp(38px,6vh,68px) auto 0', position: 'relative', willChange: 'transform' }}>
        <div style={{ overflow: 'hidden', borderRadius: 4 }}>
          <Image
            src="/uploads/Un-6f052e6c.jpg"
            alt="Portrait of Arlind Minushi, Senior Software Engineer"
            width={800}
            height={1199}
            priority
            sizes="(max-width: 624px) 100vw, 560px"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ position: 'absolute', left: 'clamp(16px,2.5vw,32px)', bottom: 'clamp(16px,2.5vw,32px)', width: 'clamp(92px,11vw,132px)', height: 'clamp(92px,11vw,132px)', background: 'var(--paper)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'floatY 5s ease-in-out infinite' }}>
          <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'spin 18s linear infinite' }}>
            <defs><path id="badgepath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"></path></defs>
            <text style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '9.5px', letterSpacing: '2.4px', fill: 'var(--ink)' }}><textPath href="#badgepath">SCROLL TO EXPLORE · SCROLL TO EXPLORE · </textPath></text>
          </svg>
          <span style={{ fontSize: 22, color: 'var(--accent)' }}>↓</span>
        </div>
      </div>
    </section>
  );
}
