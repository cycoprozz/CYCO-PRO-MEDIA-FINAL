import { useState } from 'react'

const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'Photography', label: 'Photography' },
  { value: 'Videography', label: 'Videography' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Content Creation', label: 'Content Creation' },
  { value: 'Other', label: 'Other / Multiple' },
]

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'all 0.2s ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    color: 'var(--text-secondary)', marginBottom: 8,
  }

  return (
    <section className="section" id="contact">
      <div className="section-inner">
        <span className="section-label" data-reveal>Contact</span>
        <h2 className="section-title" data-reveal data-reveal-delay="1">
          Let's <span className="accent">Work Together</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 50 }} className="contact-grid">
          {/* Form */}
          <div data-reveal data-reveal-delay="2">
            {status === 'sent' ? (
              <div style={{
                background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)',
                borderRadius: 'var(--radius)', padding: '40px 32px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--white)', marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Thank you! We'll follow up at the email you provided within 24–48 hours.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }} className="btn btn-outline" style={{ marginTop: 20 }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                aria-label="Contact form"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="name" style={labelStyle}>Full Name</label>
                  <input
                    type="text" id="name" name="name" required
                    placeholder="Your name" autoComplete="name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,240,255,0.1)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="email" style={labelStyle}>Email Address</label>
                  <input
                    type="email" id="email" name="email" required
                    placeholder="you@example.com" autoComplete="email"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,240,255,0.1)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="phone" style={labelStyle}>Phone (optional)</label>
                  <input
                    type="tel" id="phone" name="phone"
                    placeholder="+1 (555) 000-0000" autoComplete="tel"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,240,255,0.1)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="service" style={labelStyle}>Service Interested In</label>
                  <select
                    id="service" name="service" required
                    value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,240,255,0.1)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {serviceOptions.map(o => <option key={o.value} value={o.value} style={{ background: '#111', color: '#fff' }}>{o.label}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="message" style={labelStyle}>Tell Us About Your Project</label>
                  <textarea
                    id="message" name="message" required
                    placeholder="Describe your project, timeline, budget, and any specific requirements..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,240,255,0.1)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message ▸'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div data-reveal data-reveal-delay="3" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '✉️', title: 'Email', content: <><a href="mailto:joffre@cycopromedia.com" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>joffre@cycopromedia.com</a><br /><a href="mailto:techstylebyjoffre@gmail.com" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>techstylebyjoffre@gmail.com</a></> },
              { icon: '📞', title: 'Phone', content: <a href="tel:+14706526060" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(470) 652-6060</a> },
              { icon: '📍', title: 'Location', content: <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Atlanta, GA — Available Worldwide</p> },
            ].map(item => (
              <div key={item.title} style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                padding: 20, borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--cyan-dim)', fontSize: '1.1rem',
                }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--white)', marginBottom: 4 }}>{item.title}</h4>
                  {item.content}
                </div>
              </div>
            ))}

            {/* Social */}
            <div style={{
              padding: 20, borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)',
            }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--white)', marginBottom: 12 }}>Follow Along</h4>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href="https://instagram.com/cycoprozz" target="_blank" rel="noopener"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  📷 Instagram
                </a>
                <a href="https://linkedin.com/company/cyco-pro-media" target="_blank" rel="noopener"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>

            {/* Payment methods */}
            <div style={{
              padding: 20, borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)',
            }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--white)', marginBottom: 12 }}>Payment Methods</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
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
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
