import { useState, useEffect } from 'react'

const LOGO = 'https://raw.githubusercontent.com/cycoprozz/CYCO-PRO-MEDIA-FINAL/main/images/logo.png'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 'var(--nav-height)',
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.75)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      borderBottom: '1px solid var(--border-subtle)',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      transition: 'background 0.4s ease, box-shadow 0.4s ease',
    }} role="navigation" aria-label="Main navigation">
      <div style={{
        maxWidth: 1280, width: '100%', margin: '0 auto',
        padding: '0 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '100%',
      }}>
        {/* Logo */}
        <a href="#home" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700,
          color: 'var(--white)', textDecoration: 'none',
        }} aria-label="CYCO PRO MEDIA Home">
          <img src={LOGO} alt="CYCO PRO MEDIA" style={{
            height: 72, width: 'auto',
            filter: 'drop-shadow(0 0 16px rgba(184,176,208,0.7)) drop-shadow(0 0 36px rgba(184,176,208,0.4))',
          }} loading="lazy" />
        </a>

        {/* Location badge */}
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em',
          color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6,
        }} className="nav-location-hide">
          📍 ATL · 🌐 Worldwide
        </span>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', gap: 8, listStyle: 'none', alignItems: 'center',
        }} className="nav-links-desktop">
          {['Home', 'Services', 'Web', 'About', 'Pricing', 'Portfolio', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item === 'Home' ? 'home' : item === 'Web' ? 'web-development' : item.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: item === 'Contact' ? 'var(--cyan)' : 'var(--text-secondary)',
                  padding: '8px 12px', borderRadius: 8,
                  border: item === 'Contact' ? '1px solid rgba(0,240,255,0.3)' : 'none',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.color = 'var(--cyan)'
                  if (item !== 'Contact') el.style.background = 'rgba(0,240,255,0.05)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.color = item === 'Contact' ? 'var(--cyan)' : 'var(--text-secondary)'
                  if (item !== 'Contact') el.style.background = 'transparent'
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="nav-toggle-btn"
          style={{
            background: 'transparent', border: '1px solid var(--border-subtle)',
            color: 'var(--white)', width: 40, height: 40, borderRadius: 8,
            cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'var(--nav-height)', left: 0, right: 0,
          background: 'rgba(10,10,15,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {['Home', 'Services', 'Web', 'About', 'Pricing', 'Portfolio', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item === 'Home' ? 'home' : item === 'Web' ? 'web-development' : item.toLowerCase()}`}
              onClick={close}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--text-secondary)',
                padding: '12px 16px', borderRadius: 8, display: 'block',
                textDecoration: 'none',
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-toggle-btn { display: flex !important; }
          .nav-location-hide { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
