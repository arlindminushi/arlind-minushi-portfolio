export default function Contact() {
  return (
    <section id="contact" style={{ padding: 'clamp(86px,15vh,180px) clamp(20px,5vw,64px) clamp(50px,7vh,80px)', background: 'var(--dark)', color: '#eceae2' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,90px)', alignItems: 'start' }}>
          <div>
            <span data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', letterSpacing: '.22em', color: '#8a887d', display: 'block', marginBottom: '22px' }}>09 — SAY HELLO</span>
            <h2 data-reveal style={{ margin: 0, fontSize: 'clamp(54px,10vw,150px)', fontWeight: 700, letterSpacing: '-.035em', lineHeight: '.86' }}>Let’s<br /><em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400, color: 'var(--accent)' }}>talk.</em></h2>
            <div data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 'clamp(12px,1.3vw,14px)', letterSpacing: '.03em', color: 'var(--accent)', margin: 'clamp(26px,4vh,38px) 0 0', lineHeight: '1.65', maxWidth: '460px' }}>Building enterprise data and platform systems in Pristina.</div>
            <p data-reveal style={{ margin: 'clamp(18px,2.5vh,26px) 0 0', maxWidth: '460px', fontSize: '16.5px', lineHeight: '1.65', color: '#b9b7ac', fontWeight: 300 }}>Whether it’s about systems, scaling teams, or just the craft — I’m always happy to talk. Reach out through any of the channels below and I’ll get back to you.</p>
            <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'clamp(18px,2.5vh,24px)', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: '#8a887d', letterSpacing: '.04em' }}><span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)' }}></span>Based in Pristina (CET), usually replies within a day.</div>
          </div>
          <div data-reveal style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="mailto:arlind.minushi06@gmail.com" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '22px 0', borderTop: '1px solid var(--dline)', textDecoration: 'none', color: '#eceae2', transition: 'color .3s,padding .3s' }} data-style-hover="color:var(--accent);padding-left:8px;"><span style={{ fontSize: 'clamp(16px,1.7vw,21px)', wordBreak: 'break-all' }}>arlind.minushi06@gmail.com</span><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#8a887d', flex: 'none' }}>EMAIL</span></a>
            <a href="tel:+38349313126" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '22px 0', borderTop: '1px solid var(--dline)', textDecoration: 'none', color: '#eceae2', transition: 'color .3s,padding .3s' }} data-style-hover="color:var(--accent);padding-left:8px;"><span style={{ fontSize: 'clamp(16px,1.7vw,21px)' }}>+383 49 313 126</span><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#8a887d', flex: 'none' }}>PHONE</span></a>
            <a href="https://www.linkedin.com/in/arlind-minushi-1b61a51a4/" target="_blank" rel="noopener" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '22px 0', borderTop: '1px solid var(--dline)', textDecoration: 'none', color: '#eceae2', transition: 'color .3s,padding .3s' }} data-style-hover="color:var(--accent);padding-left:8px;"><span style={{ fontSize: 'clamp(16px,1.7vw,21px)' }}>/in/arlind-minushi ↗</span><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#8a887d', flex: 'none' }}>LINKEDIN</span></a>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '22px 0', borderBlock: '1px solid var(--dline)' }}><span style={{ fontSize: 'clamp(16px,1.7vw,21px)' }}>Prishtina, Kosovo</span><span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#8a887d', flex: 'none' }}>LOCATION</span></div>
            <a href="Arlind-Minushi-Resume.pdf" download style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '32px', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '13px', letterSpacing: '.08em', color: 'var(--dark)', background: '#eceae2', textDecoration: 'none', padding: '16px 24px', borderRadius: '2px', transition: 'background .3s,color .3s' }} data-style-hover="background:var(--accent);color:#fff;">DOWNLOAD RÉSUMÉ ↓</a>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: 'clamp(56px,9vh,100px)', paddingTop: '28px', borderTop: '1px solid var(--dline)', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: '#8a887d' }}>
          <div>Arlind Minushi — Senior Software Engineer</div>
          <div>Designed &amp; built in Prishtina · © 2026</div>
          <a href="#home" style={{ color: '#8a887d', textDecoration: 'none', transition: 'color .3s' }} data-style-hover="color:var(--accent);">BACK TO TOP ↑</a>
        </div>
      </div>
    </section>
  );
}
