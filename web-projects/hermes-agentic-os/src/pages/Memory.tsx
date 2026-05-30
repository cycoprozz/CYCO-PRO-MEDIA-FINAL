import { useStore } from '@/store/useStore'
import { Search, Trash2, Plus, Brain, Edit2 } from 'lucide-react'
import { useState } from 'react'

const CATS = ['All','User Profile','Projects','Preferences','Business','Skills']
const CAT_CLS: Record<string,string> = { 'User Profile':'badge-blue','Projects':'badge-indigo','Preferences':'badge-yellow','Business':'badge-green','Skills':'badge-red' }

export function Memory() {
  const { memories, deleteMemory } = useStore()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [selected, setSelected] = useState<string|null>(null)

  const filtered = memories.filter(m => {
    const ms = m.key.includes(search) || m.value.toLowerCase().includes(search.toLowerCase())
    const mc = cat === 'All' || m.category === cat
    return ms && mc
  })
  const sel = memories.find(m => m.id === selected)

  return (
    <div className="anim-fade-up" style={{ display: 'flex', height: '100%', background: '#07080d' }}>
      {/* List panel */}
      <div style={{ width: 380, minWidth: 380, borderRight: '1px solid #111827', display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #111827' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 11px', background: '#0d111a', border: '1px solid #1a2236', borderRadius: 8, flex: 1 }}>
              <Search size={12} color="#3d506b" />
              <input type="text" placeholder="Search memory…" value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', padding: 0, outline: 'none', fontSize: 13 }} />
            </div>
            <button className="btn btn-primary" style={{ padding: '7px 11px', flexShrink: 0 }}><Plus size={13} /></button>
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

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '10px 14px', borderBottom: '1px solid #111827' }}>
          {[{ v: memories.length, l: 'Entries', c: '#818cf8' }, { v: 5, l: 'Categories', c: '#4ade80' }, { v: '1.9KB', l: 'Total', c: '#facc15' }].map(s => (
            <div key={s.l} className="card" style={{ padding: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: '#3d506b' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map(m => (
            <div key={m.id} onClick={() => setSelected(m.id)} className="card card-hover anim-slide-r" style={{
              padding: '11px 13px',
              borderColor: selected === m.id ? '#6366f1' : undefined,
              background: selected === m.id ? '#0b0f1c' : undefined,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span className="mono" style={{ fontSize: 12, color: '#818cf8', fontWeight: 600 }}>{m.key}</span>
                <span className={`badge ${CAT_CLS[m.category] || 'badge-gray'}`} style={{ fontSize: 9 }}>{m.category}</span>
              </div>
              <p style={{ fontSize: 12, color: '#4a5f7a', lineHeight: 1.55 }}>{m.value.slice(0, 88)}{m.value.length > 88 ? '…' : ''}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 10, color: '#2d3f57' }}>Updated {m.updated}</span>
                <span style={{ fontSize: 10, color: '#2d3f57' }}>{m.size}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
              <Brain size={28} color="#1a2236" />
              <p style={{ color: '#2d3f57', marginTop: 10, fontSize: 13 }}>No memories found</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {sel ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #111827' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Brain size={15} color="#6366f1" />
                <span className="mono" style={{ fontSize: 14, color: '#818cf8', fontWeight: 600 }}>{sel.key}</span>
                <span className={`badge ${CAT_CLS[sel.category] || 'badge-gray'}`}>{sel.category}</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 11px' }}><Edit2 size={11} /> Edit</button>
                <button className="btn btn-danger" style={{ fontSize: 12, padding: '5px 11px' }} onClick={() => { deleteMemory(sel.id); setSelected(null) }}><Trash2 size={11} /> Delete</button>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card" style={{ padding: 18 }}>
                <p style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.75 }}>{sel.value}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Key',      val: sel.key,      mono: true },
                  { label: 'Category', val: sel.category, mono: false },
                  { label: 'Size',     val: sel.size,     mono: false },
                  { label: 'Created',  val: sel.created,  mono: false },
                  { label: 'Updated',  val: sel.updated,  mono: false },
                ].map(r => (
                  <div key={r.label} className="card" style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#3d506b' }}>{r.label}</span>
                    <span className={r.mono ? 'mono' : ''} style={{ fontSize: 12, color: '#94a3b8' }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Brain size={38} color="#111827" />
            <p style={{ color: '#2d3f57', fontSize: 14 }}>Select a memory to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
