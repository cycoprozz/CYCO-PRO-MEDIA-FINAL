const plans = [
  {
    name: 'Starter',
    price: '$200',
    desc: 'Perfect for small shoots',
    features: ['1-hour session', '10 edited images', '1 location', 'Online gallery', '5-day delivery'],
    featured: false,
  },
  {
    name: 'Business',
    price: '$500',
    desc: 'Most popular for brands',
    features: ['3-hour session', '20 edited images', '1 location', 'Online gallery', '3-day delivery', 'Commercial usage rights'],
    featured: true,
  },
  {
    name: 'Custom',
    price: '$1,500+',
    desc: 'For full production needs',
    features: ['Multi-day production', 'Unlimited deliverables', 'Multiple locations', 'Video + photo packages', 'Priority delivery', 'Full creative direction'],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="section-inner center">
        <span className="section-label" data-reveal>Pricing</span>
        <h2 className="section-title" data-reveal data-reveal-delay="1">
          Simple, <span className="accent">Transparent</span> Pricing
        </h2>
        <p className="section-subtitle" data-reveal data-reveal-delay="2">
          No hidden fees. No surprises. Just premium creative services at competitive rates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 50 }} className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={plan.name} className="glass-card" data-reveal data-reveal-delay={String(i)}
              style={{
                padding: '40px 28px', textAlign: 'center', position: 'relative',
                ...(plan.featured ? { borderColor: 'var(--border-glow)', boxShadow: '0 0 50px rgba(0,240,255,0.08)' } : {}),
              }}>
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--cyan)', color: 'var(--bg-deep)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700,
                  letterSpacing: '0.14em', padding: '5px 16px', borderRadius: 20,
                }}>POPULAR</div>
              )}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--white)', marginBottom: 8 }}>
                {plan.name}
              </h3>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 700, color: 'var(--cyan)', margin: '16px 0 8px' }}>
                {plan.price}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>{plan.desc}</p>
              <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: 28 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{
                    padding: '8px 0', fontSize: '0.9rem', color: 'var(--text-secondary)',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>▸</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                {plan.featured ? 'Start Project' : plan.name === 'Custom' ? 'Contact Us' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 420px !important; margin-left: auto !important; margin-right: auto !important; }
        }
      `}</style>
    </section>
  )
}
