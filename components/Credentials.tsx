export default function Credentials() {
  return (
    <section id="certs" style={{ padding: 'clamp(80px,14vh,170px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <span data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', letterSpacing: '.22em', color: 'var(--muted)', display: 'block', marginBottom: 'clamp(34px,5vh,56px)' }}>06 — CREDENTIALS</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 'clamp(20px,2.5vw,32px)' }}>
          <div data-reveal style={{ borderTop: '2px solid var(--ink)', paddingTop: '24px' }}>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', letterSpacing: '.18em', color: 'var(--accent)', marginBottom: '18px' }}>CERTIFICATION</div>
            <h3 style={{ margin: '0 0 6px', fontSize: 'clamp(18px,2vw,23px)', fontWeight: 600, color: 'var(--ink)', lineHeight: '1.18' }}>Databricks Certified Data Engineer Associate</h3>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12.5px', color: 'var(--muted)' }}>Credential ID · 108344349</div>
          </div>
          <div data-reveal data-reveal-delay="100" style={{ borderTop: '2px solid var(--ink)', paddingTop: '24px' }}>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', letterSpacing: '.18em', color: 'var(--accent)', marginBottom: '18px' }}>EDUCATION</div>
            <h3 style={{ margin: '0 0 10px', fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 600, color: 'var(--ink)', lineHeight: '1.18' }}>B.Sc. Computer Science &amp; Engineering</h3>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12.5px', color: 'var(--muted)' }}>University for Business and Technology · 2017–2020</div>
          </div>
          <div data-reveal data-reveal-delay="200" style={{ borderTop: '2px solid var(--ink)', paddingTop: '24px' }}>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', letterSpacing: '.18em', color: 'var(--accent)', marginBottom: '18px' }}>LANGUAGES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}><span style={{ fontSize: '18px', color: 'var(--ink)' }}>Albanian</span><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: 'var(--muted)' }}>NATIVE</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontSize: '18px', color: 'var(--ink)' }}>English</span><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: 'var(--accent)' }}>C2</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
