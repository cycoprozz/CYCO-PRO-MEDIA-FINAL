const steps = [
  { num: '01', icon: '💬', title: 'Consultation', desc: 'Free discovery call. We talk goals, audience, must-haves. No pitch — just listening. You walk away with clarity, even if we\'re not a fit.' },
  { num: '02', icon: '🔍', title: 'Deep Understanding', desc: 'We dive into your business — competitors, customers, content needs. Every question we ask shapes a strategy that\'s uniquely yours.' },
  { num: '03', icon: '📋', title: 'Proposal & Plan', desc: 'Custom quote, sitemap, timeline, and milestones. You see exactly what you\'re getting, when, and for how much — before a dollar is spent.' },
  { num: '04', icon: '🎨', title: 'Design & Prototype', desc: 'Mockups and wireframes aligned with your brand. You review, we refine. Nothing moves to code until you\'re excited about the direction.' },
  { num: '05', icon: '⚡', title: 'Build & Test', desc: 'Clean, fast, mobile-responsive code. Regular check-ins so you see progress. Cross-browser tested. SEO-ready. Forms working. No surprises.' },
  { num: '06', icon: '🚀', title: 'Launch & Support', desc: 'Domain connected. SSL active. Analytics verified. Training session so you own your site. 30 days of post-launch support included.' },
]

const capabilities = [
  { icon: '🏪', title: 'Landing Pages', desc: 'High-converting single-page sites for campaigns, products, and lead gen.' },
  { icon: '🏢', title: 'Business Websites', desc: '6–12 page custom sites with portfolio, booking forms, and full SEO.' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Mockups, wireframes, and prototypes that match your brand perfectly.' },
  { icon: '📊', title: 'SEO & Analytics', desc: 'Schema markup, sitemaps, speed optimization, and Google Analytics setup.' },
  { icon: '🤖', title: 'AI Workflow', desc: 'AI-powered automation, chatbots, and workflow infrastructure for your business.' },
  { icon: '🛒', title: 'E-Commerce', desc: 'Online stores with payment integration, inventory, and product management.' },
  { icon: '📱', title: 'Mobile-First', desc: 'Every site is responsive, fast, and tested across all devices and browsers.' },
  { icon: '🔧', title: 'Maintenance', desc: 'Monthly retainers for updates, security patches, backups, and monitoring.' },
]

const webPricing = [
  {
    name: 'Landing Page', price: '$750', period: 'One-time',
    features: ['Single-page design', 'Mobile-responsive', 'Contact/lead form', 'Basic SEO setup', 'Domain connection', '1 revision round'],
    featured: false,
  },
  {
    name: 'Business Site', price: 'Starting at $1,500', period: 'One-time',
    features: ['6–12 custom pages', 'Portfolio/gallery + filtering', 'Booking or inquiry forms', 'Advanced SEO (schema, sitemap)', 'Speed + security optimization', 'Training + 30-day support'],
    featured: true,
  },
  {
    name: 'Maintenance', price: 'Starting at $200/mo', period: 'Monthly retainer',
    features: ['Content updates', 'Plugin/security patches', 'Uptime monitoring', 'Monthly backups', 'Performance reports', 'Priority support'],
    featured: false,
  },
]

export default function WebDev() {
  return (
    <section className="section" id="web-development">
      <div className="section-inner center">
        <span className="section-label" data-reveal>Web Development</span>
        <h2 className="section-title" data-reveal data-reveal-delay="1">
          Your Website, <span className="accent">Built on Co-Value</span>
        </h2>
        <p className="section-subtitle" data-reveal data-reveal-delay="2">
          We don't just build websites — we build partnerships. Every project starts with understanding <em>your</em> goals, <em>your</em> customers, and <em>your</em> vision.
        </p>

        {/* Process Steps */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24, marginBottom: 60,
        }} className="process-grid">
          {steps.map((step, i) => (
            <div key={step.num} className="glass-card" data-reveal data-reveal-delay={String(i % 3)}
              style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{step.icon}</div>
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700,
                background: 'linear-gradient(135deg, var(--cyan), var(--magenta))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1, marginBottom: 12,
              }}>{step.num}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 10 }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Co-value statement */}
        <div data-reveal style={{
          background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.12)',
          borderRadius: 'var(--radius)', padding: '32px 40px', marginBottom: 60,
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.7,
        }}>
          "We believe in <strong style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>business co-value</strong> — your success is our success. Every project is a collaboration, not a transaction. We ask hard questions, propose honest solutions, and never bill for something you don't need."
        </div>

        {/* Web Pricing */}
        <div style={{ marginBottom: 60 }}>
          <span className="section-label" data-reveal>Pricing</span>
          <h2 className="section-title" data-reveal data-reveal-delay="1" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Transparent <span className="accent">Web Packages</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }} className="web-pricing-grid">
            {webPricing.map((pkg, i) => (
              <div key={pkg.name} className="glass-card" data-reveal data-reveal-delay={String(i)}
                style={{
                  padding: '40px 28px', textAlign: 'center', position: 'relative',
                  ...(pkg.featured ? { borderColor: 'var(--border-glow)', boxShadow: '0 0 50px rgba(0,240,255,0.08)' } : {}),
                }}>
                {pkg.featured && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--cyan)', color: 'var(--bg-deep)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700,
                    letterSpacing: '0.14em', padding: '5px 16px', borderRadius: 20,
                  }}>POPULAR</div>
                )}
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--white)', marginBottom: 12 }}>
                  {pkg.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: 4 }}>
                  {pkg.price}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 24 }}>{pkg.period}</p>
                <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: 28 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{
                      padding: '8px 0', fontSize: '0.88rem', color: 'var(--text-secondary)',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`btn ${pkg.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {pkg.featured ? 'Start Project' : 'Get Started'}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <span className="section-label" data-reveal>Everything We Do</span>
          <h2 className="section-title" data-reveal data-reveal-delay="1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            Full-Stack <span className="accent">Capabilities</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40 }} className="cap-grid">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="glass-card" data-reveal data-reveal-delay={String(i % 4)}
                style={{ padding: '20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', background: 'var(--cyan-dim)',
                  border: '1px solid rgba(0,240,255,0.15)',
                }}>
                  {cap.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)', marginBottom: 3 }}>{cap.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .web-pricing-grid { grid-template-columns: 1fr !important; max-width: 420px !important; margin-left: auto !important; margin-right: auto !important; }
          .cap-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .cap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
