import { workItems } from "@/lib/data";

export default function Work() {
  return (
    <section id="work" style={{ padding: 'clamp(80px,14vh,170px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div data-line style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg,var(--accent),transparent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .9s cubic-bezier(.16,1,.3,1)', marginBottom: 'clamp(22px,3.5vh,38px)' }}></div>
        <span data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', letterSpacing: '.22em', color: 'var(--muted)', display: 'block', marginBottom: '16px' }}>02 — SELECTED WORK</span>
        <h2 data-reveal style={{ margin: '0 0 clamp(40px,6vh,68px)', fontSize: 'clamp(40px,8vw,110px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: '.9', color: 'var(--ink)' }}>Things I’ve <em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400 }}>built</em></h2>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {workItems.map((item) => (
            <div key={item.num} data-reveal className="work-row" style={{ display: 'grid', gridTemplateColumns: 'clamp(56px,8vw,110px) minmax(0,1.1fr) minmax(0,1fr)', gap: 'clamp(16px,3vw,48px)', alignItems: 'start', padding: 'clamp(30px,4.5vh,52px) 0', borderBottom: '1px solid var(--line)', transition: 'background .45s cubic-bezier(.16,1,.3,1),box-shadow .45s,padding .45s cubic-bezier(.16,1,.3,1)' }} data-style-hover="background:var(--paper2);box-shadow:inset 3px 0 0 var(--accent);padding-left:clamp(18px,3vw,40px);">
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: 'clamp(30px,4.2vw,64px)', lineHeight: '.82', color: 'transparent', WebkitTextStroke: '1.5px var(--accent)' }}>{item.num}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: 'clamp(26px,3.4vw,46px)', fontWeight: 600, letterSpacing: '-.02em', lineHeight: '1.04', color: 'var(--ink)' }}>{item.titleLines[0]}<br />{item.titleLines[1]}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: 'var(--muted)' }}>
                  {item.tags.map((t) => (
                    <span key={t.label} style={t.accent === true ? { border: '1px solid var(--accent)', color: 'var(--accent)', padding: '5px 11px', borderRadius: '2px' } : { border: '1px solid var(--line)', padding: '5px 11px', borderRadius: '2px' }}>{t.label}</span>
                  ))}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.65', color: 'var(--ink2)', fontWeight: 300, paddingTop: '6px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
