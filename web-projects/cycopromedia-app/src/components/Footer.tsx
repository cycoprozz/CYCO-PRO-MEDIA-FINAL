const LOGO = 'https://raw.githubusercontent.com/cycoprozz/CYCO-PRO-MEDIA-FINAL/main/images/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(10,10,15,0.6)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '60px 32px 32px',
    }} role="contentinfo">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: 40, marginBottom: 40,
        }} className="footer-columns">
          {/* Brand */}
          <div>
            <a href="#home" aria-label="CYCO PRO MEDIA Home" style={{ display: 'inline-block', marginBottom: 16 }}>
              <img src={LOGO} alt="CYCO PRO MEDIA" style={{ height: 56, width: 'auto' }} loading="lazy" />
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 280 }}>
              Creative Media & Web Solutions. Photography, videography, web development, and content creation — crafted in Atlanta, delivered worldwide.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 16 }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Photography', 'Videography', 'Web Development', 'Content Creation'].map(s => (
                <li key={s}><a href="#services" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 16 }}>Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ label: 'About', href: '#about' }, { label: 'Portfolio', href: '#portfolio' }, { label: 'Pricing', href: '#pricing' }, { label: 'Contact', href: '#contact' }].map(l => (
                <li key={l.label}><a href={l.href} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 16 }}>Payment Methods</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {['Cash App', 'Venmo', 'Zelle', 'Apple Pay'].map(p => (
                <span key={p} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.06em',
                  padding: '6px 12px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--text-muted)',
                }}>{p}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Secure, flexible payment options for every project.</p>
          </div>
        </div>

        <div style={{
          paddingTop: 24, borderTop: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
          fontSize: '0.8rem', color: 'var(--text-muted)',
        }}>
          <span>© {year} CYCO PRO MEDIA. All rights reserved.</span>
          <span>Built with passion in Atlanta, GA</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-columns { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-columns { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
