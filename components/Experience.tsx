import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: 'clamp(80px,14vh,170px) clamp(20px,5vw,64px)', background: 'var(--paper2)', borderBlock: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <div data-line style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg,var(--accent),transparent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .9s cubic-bezier(.16,1,.3,1)', marginBottom: 'clamp(22px,3.5vh,38px)' }}></div>
        <span data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', letterSpacing: '.22em', color: 'var(--muted)', display: 'block', marginBottom: '16px' }}>03 — EXPERIENCE</span>
        <h2 data-reveal style={{ margin: '0 0 clamp(44px,7vh,72px)', fontSize: 'clamp(40px,8vw,110px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: '.9', color: 'var(--ink)' }}>The path <em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400 }}>so far</em></h2>

        {experience.map((entry, i) => (
          <div key={entry.org} data-reveal className="exp-row" data-style-hover="background:var(--paper2);box-shadow:inset 3px 0 0 var(--accent);" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,170px) 1fr', gap: 'clamp(18px,4vw,56px)', padding: 'clamp(28px,4vh,46px) clamp(8px,1.5vw,18px)', ...(i === experience.length - 1 ? { borderBlock: '1px solid var(--line)' } : { borderTop: '1px solid var(--line)' }), transition: 'background .45s cubic-bezier(.16,1,.3,1),box-shadow .45s' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: 'clamp(18px,1.9vw,24px)', color: 'var(--ink)', lineHeight: '1.1', marginBottom: '8px' }}>{entry.period}<span style={{ color: 'var(--accent)' }}>{entry.periodAccent}</span></div>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', letterSpacing: '.16em', color: 'var(--muted)' }}>{entry.location}</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: 'clamp(20px,3vw,40px)', position: 'relative' }}>
              <span data-vline style={{ position: 'absolute', left: '-1.5px', top: 0, width: '2px', height: '100%', background: 'var(--accent)', transform: 'scaleY(0)', transformOrigin: 'top', transition: 'transform .6s ease-out' }}></span>
              <span data-dot style={{ position: 'absolute', left: '-6.5px', top: '7px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 4px var(--paper2)', transform: 'scale(0)', transition: 'transform .5s ease-out .2s' }}></span>
              <h3 style={{ margin: '0 0 3px', fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 600, color: 'var(--ink)' }}>{entry.role}</h3>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '14px', color: 'var(--accent)', marginBottom: '22px' }}>{entry.org}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {entry.bullets.map((bullet, j) => (
                  <li key={j} style={{ display: 'flex', gap: '12px', fontSize: '15.5px', lineHeight: '1.55', color: 'var(--ink2)', fontWeight: 300 }}><span style={{ color: 'var(--accent)', flex: 'none' }}>—</span>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
