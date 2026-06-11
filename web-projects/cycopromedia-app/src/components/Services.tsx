const services = [
  {
    icon: '📸',
    title: 'Photography',
    description: 'Editorial, commercial, brand, events, weddings, real estate, and fine art. Every shoot is a story told with intention and technical mastery.',
    tags: ['Editorial', 'Commercial', 'Events', 'Weddings', 'Real Estate'],
    color: 'var(--cyan)',
  },
  {
    icon: '🎬',
    title: 'Videography',
    description: 'Cinematic brand films, commercial promos, music videos, documentary, podcast, and social reels that stop the scroll and spark emotion.',
    tags: ['Brand Films', 'Promos', 'Music Videos', 'Social Reels'],
    color: 'var(--magenta)',
  },
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Custom-built websites that convert visitors into clients. Fast, beautiful, SEO-optimized, and built around your business goals.',
    tags: ['Landing Pages', 'Business Sites', 'UI Design', 'SEO'],
    color: 'var(--green)',
  },
  {
    icon: '✨',
    title: 'Content Creation',
    description: 'Full social media packages, brand content strategy, monthly retainers, and campaigns designed to grow your online presence.',
    tags: ['Social Media', 'Brand Strategy', 'Campaigns', 'Retainers'],
    color: '#FF9500',
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label" data-reveal>Services</span>
          <h2 className="section-title" data-reveal data-reveal-delay="1">
            What We <span className="accent">Create</span>
          </h2>
          <p className="section-subtitle" data-reveal data-reveal-delay="2">
            From stunning visuals to powerful digital experiences — every service is built around your vision and delivered with precision.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {services.map((svc, i) => (
            <div key={svc.title} className="glass-card" data-reveal data-reveal-delay={String(i % 4)} style={{ padding: '36px 28px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `color-mix(in srgb, ${svc.color} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${svc.color} 30%, transparent)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', marginBottom: 20,
              }}>
                {svc.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600,
                color: 'var(--white)', marginBottom: 12,
              }}>
                {svc.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
                {svc.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {svc.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: svc.color,
                    background: `color-mix(in srgb, ${svc.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${svc.color} 25%, transparent)`,
                    padding: '4px 10px', borderRadius: 20,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
