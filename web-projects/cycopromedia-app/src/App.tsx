import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import WebDev from './components/WebDev'
import About from './components/About'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const [showBackTop, setShowBackTop] = useState(false)
  useReveal()

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <WebDev />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          position: 'fixed', bottom: 30, right: 30, zIndex: 999,
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(0,240,255,0.15)',
          border: '1px solid rgba(0,240,255,0.25)',
          color: 'var(--cyan)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          opacity: showBackTop ? 1 : 0,
          pointerEvents: showBackTop ? 'auto' : 'none',
          transition: 'all 0.4s ease',
          fontSize: '1.1rem',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.color = 'var(--bg-deep)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,240,255,0.15)'; e.currentTarget.style.color = 'var(--cyan)' }}
      >
        ↑
      </button>
    </>
  )
}
