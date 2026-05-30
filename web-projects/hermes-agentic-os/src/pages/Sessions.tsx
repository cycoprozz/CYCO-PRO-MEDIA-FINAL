import { useStore } from '@/store/useStore'
import { Search, Trash2, ExternalLink, MessageSquare, Terminal, Globe, Send, Hash, Clock } from 'lucide-react'
import { useState } from 'react'

const platIcon = (p: string) => ({ cli: <Terminal size={11} />, telegram: <Send size={11} />, discord: <Hash size={11} />, slack: <Hash size={11} />, cron: <Clock size={11} />, web: <Globe size={11} /> }[p] || <Globe size={11} />)
const platColor = (p: string) => ({ cli: '#94a3b8', telegram: '#60a5fa', discord: '#818cf8', slack: '#4ade80', cron: '#facc15', web: '#f472b6' }[p] || '#94a3b8')

export function Sessions() {
  const { sessions, agents } = useStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all'|'live'|'ended'>('all')

  const filtered = sessions.filter(s => {
    const ms = s.title.toLowerCase().includes(search.toLowerCase()) || s.model.includes(search)
    const mf = filter === 'all' || s.status === filter
    return ms && mf
  })

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#07080d' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: '1px solid #111827', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 11px', background: '#0d111a', border: '1px solid #1a2236', borderRadius: 8, flex: 1, maxWidth: 280 }}>
          <Search size={12} color="#3d506b" />
          <input type="text" placeholder="Search sessions…" value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', padding: 0, outline: 'none', fontSize: 13 }} />
        </div>
        <div style={{ display: 'flex', gap: 2, padding: 3, background: '#0d111a', border: '1px solid #1a2236', borderRadius: 8 }}>
          {(['all','live','ended'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500, border: 'none',
              background: filter === f ? '#1a2236' : 'transparent',
              color: filter === f ? '#e2e8f0' : '#3d506b',
              textTransform: 'capitalize',
            }}>{f}</button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: '#3d506b', marginLeft: 'auto' }}>{filtered.length} sessions</span>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table>
            <thead><tr>
              <th>Title</th><th>Agent</th><th>Platform</th><th>Messages</th><th>Tokens</th><th>Cost</th><th>Status</th><th>Active</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.map(s => {
                const agent = agents.find(a => a.id === s.agentId)
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {s.status === 'live' && <span className="dot dot-yellow" />}
                        <div>
                          <div style={{ color: '#e2e8f0', fontWeight: 500 }}>{s.title}</div>
                          <div className="mono" style={{ fontSize: 10.5, color: '#3d506b' }}>{s.model}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8' }}>{agent?.name || '—'}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: platColor(s.platform) }}>
                        {platIcon(s.platform)}
                        <span style={{ fontSize: 12, textTransform: 'capitalize' }}>{s.platform}</span>
                      </div>
                    </td>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageSquare size={11} color="#3d506b" /><span>{s.messages}</span></div></td>
                    <td className="mono" style={{ color: '#818cf8' }}>{(s.tokens/1000).toFixed(1)}k</td>
                    <td style={{ color: '#facc15' }}>${s.cost.toFixed(2)}</td>
                    <td><span className={`badge ${s.status === 'live' ? 'badge-green' : 'badge-gray'}`}>{s.status}</span></td>
                    <td style={{ color: '#3d506b', fontSize: 12 }}>{s.lastActive}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 3 }}>
                        <button className="icon-btn"><ExternalLink size={11} /></button>
                        <button className="icon-btn" style={{ color: '#7f1d1d' }}><Trash2 size={11} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 48 }}>
              <MessageSquare size={30} color="#1a2236" />
              <p style={{ color: '#2d3f57', marginTop: 10 }}>No sessions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
