export default function MarqueeBottom() {
  return (
    // Accent layer behind the band: the mask fades the dark strip to transparent
    // at the left/right edges, so the edges now reveal this teal instead of the page bg.
    <div style={{ background: 'var(--accent)' }}>
      <div style={{ overflow: 'hidden', background: 'var(--dark)', padding: '18px 0', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)', maskImage: 'linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)' }}>
        <div style={{ display: 'flex', gap: '34px', width: 'max-content', animation: 'marquee 26s linear infinite reverse', fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontSize: 'clamp(20px,2.6vw,34px)', color: '#eceae2', whiteSpace: 'nowrap' }}>
          <span style={{ display: 'flex', gap: '34px', alignItems: 'center' }}>Open to connect<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>Always up for a good conversation<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>Systems<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>Teams<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>The craft<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span></span>
          <span aria-hidden="true" style={{ display: 'flex', gap: '34px', alignItems: 'center' }}>Open to connect<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>Always up for a good conversation<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>Systems<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>Teams<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span>The craft<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>●</span></span>
        </div>
      </div>
    </div>
  );
}
