export default function Capabilities() {
  return (
    <section style={{ padding: 'clamp(80px,14vh,170px) clamp(20px,5vw,64px)', background: 'var(--dark)', color: '#eceae2' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '36px', alignItems: 'flex-end', marginBottom: 'clamp(46px,7vh,80px)' }}>
          <div>
            <span data-reveal style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', letterSpacing: '.22em', color: '#8a887d', display: 'block', marginBottom: '18px' }}>01 — WHAT I DO</span>
            <h2 data-reveal style={{ margin: 0, fontSize: 'clamp(38px,7vw,92px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: '.92' }}>Capabilities</h2>
          </div>
          <p data-reveal style={{ maxWidth: '440px', margin: 0, fontSize: '16px', lineHeight: '1.65', color: '#b9b7ac', fontWeight: 300 }}>I operate across the whole stack — architecture, implementation, and the people side. Equally comfortable in a code review, a hiring loop, or a stakeholder room.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: '1px', background: 'var(--dline)', border: '1px solid var(--dline)' }}>
          <button type="button" data-cap aria-expanded="false" data-reveal style={{ display: 'block', width: '100%', textAlign: 'left', font: 'inherit', color: 'inherit', background: 'var(--dark)', border: 'none', padding: 'clamp(28px,3vw,44px)', cursor: 'pointer', transition: 'background .4s' }} data-style-hover="background:#1b1a14;">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '54px', height: '54px', border: '1px solid var(--dline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: '16px', height: '16px', border: '1.5px solid var(--accent)', transform: 'rotate(45deg)', display: 'block' }}></span></div>
              <span data-cap-chev style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '26px', lineHeight: 1, flex: 'none', transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}>+</span>
            </div>
            <h3 style={{ margin: '24px 0 0', fontSize: '22px', fontWeight: 600, color: '#eceae2' }}>Engineering Leadership</h3>
            <div data-cap-detail style={{ maxHeight: 0, overflow: 'hidden', opacity: 0, transition: 'max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s' }}><p style={{ margin: '14px 0 0', fontSize: '14.5px', lineHeight: '1.6', color: '#a3a197', fontWeight: 300 }}>Leading a 16-person team day to day — sprint delivery, performance reviews, career growth, resource planning, and holding the hiring bar. I optimize for engineers who can own a problem end to end.</p></div>
          </button>
          <button type="button" data-cap aria-expanded="false" data-reveal data-reveal-delay="80" style={{ display: 'block', width: '100%', textAlign: 'left', font: 'inherit', color: 'inherit', background: 'var(--dark)', border: 'none', padding: 'clamp(28px,3vw,44px)', cursor: 'pointer', transition: 'background .4s' }} data-style-hover="background:#1b1a14;">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '54px', height: '54px', border: '1px solid var(--dline)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '18px' }}>{'</>'}</div>
              <span data-cap-chev style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '26px', lineHeight: 1, flex: 'none', transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}>+</span>
            </div>
            <h3 style={{ margin: '24px 0 0', fontSize: '22px', fontWeight: 600, color: '#eceae2' }}>Full-Stack Engineering</h3>
            <div data-cap-detail style={{ maxHeight: 0, overflow: 'hidden', opacity: 0, transition: 'max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s' }}><p style={{ margin: '14px 0 0', fontSize: '14.5px', lineHeight: '1.6', color: '#a3a197', fontWeight: 300 }}>Python &amp; Django on the backend, React &amp; React Native on the front, Node.js and REST APIs in between. I care about clean architecture, reusable components, and code the next person can actually read.</p></div>
          </button>
          <button type="button" data-cap aria-expanded="false" data-reveal data-reveal-delay="160" style={{ display: 'block', width: '100%', textAlign: 'left', font: 'inherit', color: 'inherit', background: 'var(--dark)', border: 'none', padding: 'clamp(28px,3vw,44px)', cursor: 'pointer', transition: 'background .4s' }} data-style-hover="background:#1b1a14;">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '54px', height: '54px', border: '1px solid var(--dline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: '16px', height: '16px', border: '1.5px solid var(--accent)', borderRadius: '50%', display: 'block' }}></span></div>
              <span data-cap-chev style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '26px', lineHeight: 1, flex: 'none', transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}>+</span>
            </div>
            <h3 style={{ margin: '24px 0 0', fontSize: '22px', fontWeight: 600, color: '#eceae2' }}>Cloud &amp; Security</h3>
            <div data-cap-detail style={{ maxHeight: 0, overflow: 'hidden', opacity: 0, transition: 'max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s' }}><p style={{ margin: '14px 0 0', fontSize: '14.5px', lineHeight: '1.6', color: '#a3a197', fontWeight: 300 }}>Azure AD, OAuth 2.0, MSAL and SSO for enterprise identity; AWS S3, Secrets Manager, Elastic Beanstalk, Lambda and Cognito for the things that run in the cloud.</p></div>
          </button>
          <button type="button" data-cap aria-expanded="false" data-reveal data-reveal-delay="240" style={{ display: 'block', width: '100%', textAlign: 'left', font: 'inherit', color: 'inherit', background: 'var(--dark)', border: 'none', padding: 'clamp(28px,3vw,44px)', cursor: 'pointer', transition: 'background .4s' }} data-style-hover="background:#1b1a14;">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '54px', height: '54px', border: '1px solid var(--dline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ display: 'flex', gap: '3px' }}><span style={{ width: '4px', height: '16px', background: 'var(--accent)', display: 'block' }}></span><span style={{ width: '4px', height: '16px', background: 'var(--accent)', opacity: '.5', display: 'block' }}></span><span style={{ width: '4px', height: '16px', background: 'var(--accent)', opacity: '.25', display: 'block' }}></span></span></div>
              <span data-cap-chev style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '26px', lineHeight: 1, flex: 'none', transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}>+</span>
            </div>
            <h3 style={{ margin: '24px 0 0', fontSize: '22px', fontWeight: 600, color: '#eceae2' }}>Data Platforms</h3>
            <div data-cap-detail style={{ maxHeight: 0, overflow: 'hidden', opacity: 0, transition: 'max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s' }}><p style={{ margin: '14px 0 0', fontSize: '14.5px', lineHeight: '1.6', color: '#a3a197', fontWeight: 300 }}>SQL across PostgreSQL, MySQL, SQL Server and BigQuery, plus Databricks Unity Catalog and metadata-driven workflows — the governed foundation under every data product.</p></div>
          </button>
          <button type="button" data-cap aria-expanded="false" data-reveal data-reveal-delay="320" style={{ display: 'block', width: '100%', textAlign: 'left', font: 'inherit', color: 'inherit', background: 'var(--dark)', border: 'none', padding: 'clamp(28px,3vw,44px)', cursor: 'pointer', transition: 'background .4s' }} data-style-hover="background:#1b1a14;">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '54px', height: '54px', border: '1px solid var(--dline)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '22px', lineHeight: 1 }}>+</div>
              <span data-cap-chev style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '26px', lineHeight: 1, flex: 'none', transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}>+</span>
            </div>
            <h3 style={{ margin: '24px 0 0', fontSize: '22px', fontWeight: 600, color: '#eceae2' }}>Delivery &amp; Agile</h3>
            <div data-cap-detail style={{ maxHeight: 0, overflow: 'hidden', opacity: 0, transition: 'max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s' }}><p style={{ margin: '14px 0 0', fontSize: '14.5px', lineHeight: '1.6', color: '#a3a197', fontWeight: 300 }}>Agile/Scrum with Jira, requirements gathering, UI/UX documentation and stakeholder management — turning fuzzy asks into a plan a team can actually ship against.</p></div>
          </button>
          <button type="button" data-cap aria-expanded="false" data-reveal data-reveal-delay="400" style={{ display: 'block', width: '100%', textAlign: 'left', font: 'inherit', color: 'inherit', background: 'var(--dark)', border: 'none', padding: 'clamp(28px,3vw,44px)', cursor: 'pointer', transition: 'background .4s' }} data-style-hover="background:#1b1a14;">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '54px', height: '54px', border: '1px solid var(--dline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: '18px', height: '18px', background: 'var(--accent)', display: 'block' }}></span></div>
              <span data-cap-chev style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--accent)', fontSize: '26px', lineHeight: 1, flex: 'none', transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}>+</span>
            </div>
            <h3 style={{ margin: '24px 0 0', fontSize: '22px', fontWeight: 600, color: '#eceae2' }}>Mentoring &amp; Hiring</h3>
            <div data-cap-detail style={{ maxHeight: 0, overflow: 'hidden', opacity: 0, transition: 'max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s' }}><p style={{ margin: '14px 0 0', fontSize: '14.5px', lineHeight: '1.6', color: '#a3a197', fontWeight: 300 }}>Technical interviews and evaluation frameworks, structured onboarding, and the slower work of helping engineers grow into their next role.</p></div>
          </button>
        </div>
      </div>
    </section>
  );
}
