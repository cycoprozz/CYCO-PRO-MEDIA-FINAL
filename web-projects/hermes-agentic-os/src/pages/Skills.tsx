import { useStore } from '@/store/useStore'
import { Search, Zap, ToggleLeft, ToggleRight } from 'lucide-react'
import { useState } from 'react'

const CATS = ['All','Research','Developer','System','Communication','Creative','Productivity','Social']
const ORI_CLS: Record<string,string> = { builtin:'badge-blue', community:'badge-green', custom:'badge-indigo' }

export function Skills() {
  const { skills, toggleSkill } = useStore()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [ori, setOri] = useState('all')

  const filtered = skills.filter(s => {
    const ms = s.name.includes(search) || s.description.toLowerCase().includes(search.toLowerCase())
    const mc = cat === 'All' || s.category === cat
    const mo = ori === 'all' || s.origin === ori
    return ms && mc && mo
  })
  const enabled = skills.filter(s => s.enabled).length

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#07080d' }}>
      {/* Toolbar */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #111827', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 11px', background: '#0d111a', border: '1px solid #1a2236', borderRadius: 8, width: 240 }}>
            <Search size={12} color="#3d506b" />
            <input type="text" placeholder="Search skills…" value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', padding: 0, outline: 'none', fontSize: 13 }} />
          </div>
          <div style={{ display: 'flex', gap: 2, padding: 3, background: '#0d111a', border: '1px solid #1a2236', borderRadius: 8 }}>
            {['all','builtin','community','custom'].map(o => (
              <button key={o} onClick={() => setOri(o)} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11.5, border: 'none', textTransform: 'capitalize', background: ori === o ? '#1a2236' : 'transparent', color: ori === o ? '#e2e8f0' : '#3d506b' }}>{o}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <span className="badge badge-green">{enabled} enabled</span>
            <span className="badge badge-gray">{skills.length - enabled} off</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '3px 9px', borderRadius: 6, fontSize: 11.5, fontWeight: 500, border: 'none',
              background: cat === c ? '#6366f1' : '#0d111a',
              color: cat === c ? '#fff' : '#3d506b',
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 10 }}>
          {filtered.map(sk => (
            <div key={sk.id} className="card anim-fade-up" style={{ padding: 15, borderColor: sk.enabled ? 'rgba(99,102,241,.22)' : undefined, opacity: sk.enabled ? 1 : 0.65 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: sk.enabled ? 'rgba(99,102,241,.1)' : '#111827', border: `1px solid ${sk.enabled ? 'rgba(99,102,241,.2)' : '#1a2236'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={14} color={sk.enabled ? '#818cf8' : '#3d506b'} />
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{sk.name}</div>
                    <div style={{ fontSize: 10.5, color: '#3d506b' }}>{sk.category}</div>
                  </div>
                </div>
                <button onClick={() => toggleSkill(sk.id)} style={{ background: 'none', border: 'none', padding: 0, flexShrink: 0 }}>
                  {sk.enabled ? <ToggleRight size={22} color="#6366f1" /> : <ToggleLeft size={22} color="#2d3f57" />}
                </button>
              </div>
              <p style={{ fontSize: 12.5, color: '#4a5f7a', marginTop: 10, lineHeight: 1.55 }}>{sk.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid #111827' }}>
                <span className={`badge ${ORI_CLS[sk.origin] || 'badge-gray'}`}>{sk.origin}</span>
                <span style={{ fontSize: 11, color: '#2d3f57' }}>{sk.usageCount} uses</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 60 }}>
              <Zap size={30} color="#1a2236" /><p style={{ color: '#2d3f57', marginTop: 12 }}>No skills found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
