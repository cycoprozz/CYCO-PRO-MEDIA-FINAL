import { useEffect, useRef } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Cities Served' },
]

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const el = ref.current
          if (!el) return
          let current = 0
          const step = Math.max(1, Math.ceil(value / (2000 / 16)))
          const update = () => {
            current += step
            if (current >= value) { el.textContent = value + suffix; return }
            el.textContent = current + suffix
            requestAnimationFrame(update)
          }
          update()
        }
      },
      { threshold: 0.6 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, suffix])

  return (
    <div data-reveal style={{ textAlign: 'center', padding: '24px' }}>
      <div style={{
        fontFamily: 'var(--font-heading)', fontWeight: 700,
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        background: 'linear-gradient(135deg, var(--cyan), var(--magenta))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        marginBottom: 8, lineHeight: 1,
      }}>
        <span ref={ref}>0{suffix}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
        {label}
      </p>
    </div>
  )
}

export default function Stats() {
  return (
    <div style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(0,240,255,0.02)',
    }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {stats.map((s) => <StatCounter key={s.label} {...s} />)}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
