import Image from "next/image";

export default function About() {
  return (
    <section id="about" style={{ padding: 'clamp(80px,14vh,170px) clamp(20px,5vw,64px)', background: 'var(--paper2)', borderBlock: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <span data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', letterSpacing: '.22em', color: 'var(--muted)', display: 'block', marginBottom: 'clamp(34px,5vh,56px)' }}>05 — ABOUT</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(40px,5vw,84px)', alignItems: 'center' }}>
          <div data-reveal style={{ position: 'relative', order: 2 }}>
            <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
              <Image className="about-photo" src="/uploads/Un4.jpg" alt="Arlind with the team and a mentor" width={2048} height={1366} sizes="(max-width: 800px) 90vw, 600px" style={{ display: 'block', width: '100%', height: 'clamp(400px,56vh,600px)', objectFit: 'cover', objectPosition: 'center 38%', transition: 'transform .9s cubic-bezier(.16,1,.3,1)' }} data-style-hover="transform:scale(1.04);" />
            </div>
          </div>
          <div style={{ order: 1 }}>
            <p data-reveal style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontSize: '15px', color: 'var(--muted)', margin: '0 0 22px' }}>“The best technical decision is the one the whole team understands.”</p>
            <h2 data-reveal style={{ margin: '0 0 clamp(24px,4vh,38px)', fontSize: 'clamp(34px,5vw,68px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: '.98', color: 'var(--ink)' }}>Engineer first.<br /><em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400, color: 'var(--accent)' }}>Lead</em> by example.</h2>
            <p data-reveal style={{ margin: '0 0 20px', fontSize: '16.5px', lineHeight: '1.7', color: 'var(--ink2)', fontWeight: 300 }}>I got into leadership the way most good leads do — by being the person the team kept turning to. Today I lead a team of engineers at Genpact / Xponentl Data in Prishtina, splitting my days between architecture, code reviews, hiring, and making sure good work actually ships.</p>
            <p data-reveal style={{ margin: 0, fontSize: '16.5px', lineHeight: '1.7', color: 'var(--ink2)', fontWeight: 300 }}>I’m hands-on by default — Python and Django on the backend, React and React Native on the front, SQL and Databricks underneath. I like clean architecture, reusable components, and authentication that doesn’t keep anyone up at night.</p>
            <div data-reveal style={{ marginTop: 'clamp(30px,4.5vh,44px)' }}>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', letterSpacing: '.2em', color: 'var(--muted)', marginBottom: '18px' }}>HOW I LEAD</div>
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', padding: '13px 0', borderBottom: '1px solid var(--line)' }}><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: 'var(--accent)', flex: 'none' }}>01</span><span style={{ fontSize: 'clamp(17px,1.9vw,22px)', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-.01em' }}>Ship small, review everything.</span></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', padding: '13px 0', borderBottom: '1px solid var(--line)' }}><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: 'var(--accent)', flex: 'none' }}>02</span><span style={{ fontSize: 'clamp(17px,1.9vw,22px)', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-.01em' }}>Hire for trajectory, not just résumé.</span></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', padding: '13px 0', borderBottom: '1px solid var(--line)' }}><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: 'var(--accent)', flex: 'none' }}>03</span><span style={{ fontSize: 'clamp(17px,1.9vw,22px)', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-.01em' }}>The hard part is people, not code.</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
