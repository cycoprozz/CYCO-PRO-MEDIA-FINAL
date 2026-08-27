const BASE = 'https://raw.githubusercontent.com/cycoprozz/CYCO-PRO-MEDIA-FINAL/main/images/portfolio/about'

export default function About() {
  return (
    <section className="section" id="about" style={{ background: 'rgba(0,240,255,0.02)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-inner">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'center',
        }} className="about-grid">
          {/* Image */}
          <div data-reveal style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius)', overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              aspectRatio: '4/5',
            }}>
              <img
                src={`${BASE}/about-1.jpg`}
                alt="Joffre Elpre — CYCO PRO MEDIA"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            {/* Badge overlay */}
            <div style={{
              position: 'absolute', bottom: 24, right: -16,
              background: 'var(--bg-card)', backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-sm)', padding: '16px 20px',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 4 }}>Based in</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)' }}>Atlanta, GA</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>Available Worldwide</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="section-label" data-reveal data-reveal-delay="1">About</span>
            <h2 className="section-title" data-reveal data-reveal-delay="2" style={{ textAlign: 'left' }}>
              Meet <span className="accent">Joffre Elpre</span>
            </h2>
            <p data-reveal data-reveal-delay="2" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
              Founder of CYCO PRO MEDIA, Joffre is a multi-disciplinary creative based in Atlanta, GA, serving clients worldwide. With a passion for visual storytelling and a sharp eye for design, he blends photography, videography, and web development into cohesive brand experiences.
            </p>
            <p data-reveal data-reveal-delay="3" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
              From editorial fashion campaigns to cinematic brand films, from startup landing pages to complex web platforms — CYCO PRO MEDIA delivers work that's intentional, original, and built to convert. The tagline says it best: <em style={{ color: 'var(--cyan)' }}>"Imitation is not innovation."</em>
            </p>
            <div data-reveal data-reveal-delay="4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { icon: '📸', label: 'Photography', detail: 'Editorial & Commercial' },
                { icon: '🎬', label: 'Videography', detail: 'Brand & Cinematic' },
                { icon: '💻', label: 'Web Dev', detail: 'Custom-Built Sites' },
                { icon: '✨', label: 'Content', detail: 'Social & Strategy' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', gap: 12, alignItems: 'center',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--white)' }}>{item.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div data-reveal data-reveal-delay="4" style={{ display: 'flex', gap: 12 }}>
              <a href="#contact" className="btn btn-primary">Work With Me</a>
              <a href="https://instagram.com/cycoprozz" target="_blank" rel="noopener" className="btn btn-outline">
                @cycoprozz ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
