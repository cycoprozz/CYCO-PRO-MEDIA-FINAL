import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const PARTICLE_COUNT = 80
    const CONNECT_DIST = 130
    let mouseX = -1000, mouseY = -1000
    let animId: number

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
    }

    function createParticles() {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 1.8 + 0.5,
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(0, 240, 255, 0.5)'
        ctx!.fill()

        const dmx = mouseX - p.x, dmy = mouseY - p.y
        const distM = Math.sqrt(dmx * dmx + dmy * dmy)
        if (distM < 160) {
          ctx!.beginPath(); ctx!.moveTo(p.x, p.y); ctx!.lineTo(mouseX, mouseY)
          ctx!.strokeStyle = `rgba(255, 0, 170, ${(1 - distM / 160) * 0.35})`
          ctx!.lineWidth = 0.6; ctx!.stroke()
          p.vx += dmx * 0.0002; p.vy += dmy * 0.0002
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            ctx!.beginPath(); ctx!.moveTo(p.x, p.y); ctx!.lineTo(q.x, q.y)
            ctx!.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / CONNECT_DIST) * 0.2})`
            ctx!.lineWidth = 0.4; ctx!.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    resize(); createParticles(); draw()
    window.addEventListener('resize', () => { resize(); createParticles() })
    document.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{
        position: 'relative', zIndex: 1, textAlign: 'center',
        padding: '0 24px', maxWidth: 800,
      }}>
        <div data-reveal style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--cyan)',
          border: '1px solid rgba(0,240,255,0.2)', padding: '6px 18px',
          borderRadius: 20, marginBottom: 28, background: 'rgba(0,240,255,0.05)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Atlanta, GA — Available Worldwide
        </div>

        <h1 data-reveal data-reveal-delay="1" style={{
          fontFamily: 'var(--font-heading)', fontWeight: 700,
          fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 1.1,
          color: 'var(--white)', marginBottom: 16,
        }}>
          Creative Media<br />
          <span style={{ color: 'var(--cyan)' }}>&amp;</span>{' '}
          <span style={{ background: 'linear-gradient(135deg, var(--magenta), #9090C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Web Solutions
          </span>
        </h1>

        <p data-reveal data-reveal-delay="2" style={{
          fontFamily: 'var(--font-heading)', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2vw, 1.35rem)', color: 'var(--text-secondary)',
          marginBottom: 12,
        }}>
          "Imitation is not innovation."
        </p>

        <p data-reveal data-reveal-delay="3" style={{
          fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'var(--text-secondary)',
          maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Transforming brands through cinematic visuals, cutting-edge web experiences, and strategic content that demands attention.
        </p>

        <div data-reveal data-reveal-delay="4" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#portfolio" className="btn btn-primary">View Our Work ▸</a>
          <a href="#contact" className="btn btn-outline">Book Your Consultation</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em', zIndex: 1,
      }}>
        <span>scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
