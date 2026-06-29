export default function Intro() {
  return (
    <section style={{ padding: 'clamp(70px,12vh,150px) clamp(20px,5vw,64px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p data-reveal style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontSize: '14px', color: 'var(--muted)', margin: '0 0 28px' }}>“Simplicity is prerequisite for reliability.” — Dijkstra</p>
        <p data-reveal style={{ margin: 0, fontSize: 'clamp(26px,4.3vw,56px)', fontWeight: 500, lineHeight: '1.18', letterSpacing: '-.018em', color: 'var(--ink)' }}>Six years turning gnarly enterprise requirements into software people actually use — and, lately, into <em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400, color: 'var(--accent)' }}>teams that build it well.</em></p>
        <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 'clamp(30px,4.5vh,44px)' }}>
          <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', letterSpacing: '.03em', color: 'var(--ink2)', border: '1px solid var(--line)', borderRadius: '20px', padding: '9px 16px', display: 'inline-flex', alignItems: 'center', gap: '9px' }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)' }}></span>Databricks Certified Data Engineer Associate</span>
        </div>
      </div>
    </section>
  );
}
