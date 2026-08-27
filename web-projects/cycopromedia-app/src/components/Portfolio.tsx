import { useState, useEffect, useRef } from 'react'

const BASE = 'https://raw.githubusercontent.com/cycoprozz/CYCO-PRO-MEDIA-FINAL/main/images/portfolio'

type PortfolioItem = {
  id: string
  title: string
  tag: string
  type: 'slideshow'
  prefix: string
  count: number
}

const items: PortfolioItem[] = [
  { id: 'editorial', title: 'Editorial Portraits', tag: 'Photography', type: 'slideshow', prefix: 'editorial', count: 43 },
  { id: 'brand', title: 'Brand Campaigns', tag: 'Commercial Photography', type: 'slideshow', prefix: 'brand', count: 8 },
  { id: 'event', title: 'Event Coverage', tag: 'Event Photography', type: 'slideshow', prefix: 'event', count: 13 },
  { id: 'wedding', title: 'Wedding', tag: 'Wedding Photography', type: 'slideshow', prefix: 'wedding', count: 4 },
  { id: 'art', title: 'Fine Art', tag: 'Fine Art Photography', type: 'slideshow', prefix: 'art', count: 14 },
  { id: 'realestate', title: 'Real Estate', tag: 'Architectural Photography', type: 'slideshow', prefix: 'realestate', count: 6 },
]

function buildImages(prefix: string, count: number): string[] {
  const arr: string[] = []
  for (let i = 1; i <= count; i++) {
    arr.push(`${BASE}/${prefix}/${prefix}-${i}.jpg`)
  }
  return arr
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const images = useRef(buildImages(item.prefix, item.count))
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * item.count))
  const [loaded, setLoaded] = useState(false)

  const prev = () => setIdx((i) => (i - 1 + images.current.length) % images.current.length)
  const next = () => setIdx((i) => (i + 1) % images.current.length)

  // Auto-advance every 4 seconds
  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div data-reveal style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-glow)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: '#0a0a15' }}>
        <img
          src={images.current[idx]}
          alt={item.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s ease, opacity 0.3s ease',
            opacity: loaded ? 1 : 0,
          }}
        />
        {/* Nav buttons */}
        <button onClick={prev} aria-label="Previous" style={{
          position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(10,10,20,0.7)', border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--white)', width: 36, height: 36, borderRadius: '50%',
          cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>◂</button>
        <button onClick={next} aria-label="Next" style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(10,10,20,0.7)', border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--white)', width: 36, height: 36, borderRadius: '50%',
          cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>▸</button>
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 2 }}>
          {Array.from({ length: Math.min(item.count, 8) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: i === idx % 8 ? 'var(--cyan)' : 'rgba(255,255,255,0.3)',
                boxShadow: i === idx % 8 ? '0 0 8px var(--cyan)' : 'none',
                transition: 'all 0.2s',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div style={{ padding: '22px 24px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>
          {item.title}
        </h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)' }}>
          {item.tag}
        </span>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="section-inner center">
        <span className="section-label" data-reveal>Portfolio</span>
        <h2 className="section-title" data-reveal data-reveal-delay="1">
          Featured <span className="accent">Work</span>
        </h2>
        <p className="section-subtitle" data-reveal data-reveal-delay="2">
          A curated selection of recent projects showcasing the range and quality of our creative output.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24, marginBottom: 40,
        }}>
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }} data-reveal>
          <a href="https://cycopro.pic-time.com/portfolio" target="_blank" rel="noopener" className="btn btn-outline">
            View Full Portfolio ↗
          </a>
          <a href="#web-development" className="btn btn-primary">
            Start Your Web Project ▸
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #portfolio .section-inner > div:first-of-type + p + div { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          #portfolio .section-inner > div:first-of-type + p + div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
