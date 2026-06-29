export default function Nav() {
  return (
    <nav
      id="nav"
      aria-label="Primary"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px clamp(20px,5vw,64px)',
        background: 'rgba(243,240,232,.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
        transform: 'translateY(-110%)',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'transform .5s cubic-bezier(.16,1,.3,1),opacity .5s ease,background .3s',
      }}
    >
      <a
        href="#home"
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontWeight: 700,
          fontSize: '15px',
          letterSpacing: '.02em',
          color: 'var(--ink)',
          textDecoration: 'none',
        }}
      >
        Arlind Minushi
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px,2vw,28px)' }}>
        <a
          href="#work"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '12px',
            letterSpacing: '.08em',
            color: 'var(--ink2)',
            textDecoration: 'none',
            transition: 'color .3s',
          }}
          data-style-hover="color:var(--accent);"
        >
          WORK
        </a>
        <a
          href="#about"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '12px',
            letterSpacing: '.08em',
            color: 'var(--ink2)',
            textDecoration: 'none',
            transition: 'color .3s',
          }}
          data-style-hover="color:var(--accent);"
        >
          ABOUT
        </a>
        <a
          href="#contact"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '12px',
            letterSpacing: '.06em',
            color: 'var(--paper)',
            background: 'var(--ink)',
            textDecoration: 'none',
            padding: '9px 16px',
            borderRadius: '2px',
            transition: 'background .3s',
          }}
          data-style-hover="background:var(--accent);"
        >
          GET IN TOUCH
        </a>
      </div>
    </nav>
  );
}
