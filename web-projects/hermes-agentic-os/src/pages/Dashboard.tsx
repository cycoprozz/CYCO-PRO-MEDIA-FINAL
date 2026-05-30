import { useStore } from '@/store/useStore'
import { MessageSquare, Brain, DollarSign, Zap, Cpu, ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const tokenData = [
  { t: '8am', v: 12000 }, { t: '9am', v: 28000 }, { t: '10am', v: 45000 },
  { t: '11am', v: 38000 }, { t: '12pm', v: 52000 }, { t: '1pm', v: 61000 },
  { t: '2pm', v: 48000 }, { t: '3pm', v: 72000 }, { t: '4pm', v: 85000 }, { t: '5pm', v: 67000 },
]

const CT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass" style={{ padding: '6px 10px', borderRadius: 7, fontSize: 12 }}>
      <div style={{ color: '#3d506b' }}>{label}</div>
      <div style={{ color: '#818cf8' }}>{(payload[0].value / 1000).toFixed(0)}k tokens</div>
    </div>
  )
}

export function Dashboard() {
  const { agents, sessions, cronJobs, skills, goals, setActiveTab } = useStore()
  const live    = sessions.filter(s => s.status === 'live').length
  const totalTok = sessions.reduce((a, s) => a + s.tokens, 0)
  const totalCost = sessions.reduce((a, s) => a + s.cost, 0)
  const enabledSkills = skills.filter(s => s.enabled).length

  return (
    <div className="anim-fade-up" style={{ height: '100%', overflowY: 'auto', padding: 20, background: '#07080d', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.2px' }}>Mission Control</div>
          <div style={{ fontSize: 12, color: '#3d506b', marginTop: 2 }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.18)' }}>
          <span className="dot dot-green" />
          <span style={{ fontSize: 12, color: '#818cf8', fontWeight: 600 }}>All systems nominal</span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Live Sessions',  value: `${live}`,                  sub: `${sessions.length} total`,         icon: <MessageSquare size={15} />, color: '#818cf8', border: 'rgba(99,102,241,.2)',   bg: 'rgba(99,102,241,.06)'   },
          { label: 'Tokens Used',    value: `${(totalTok/1000).toFixed(0)}k`, sub: 'today',                    icon: <Brain size={15} />,         color: '#4ade80', border: 'rgba(34,197,94,.2)',    bg: 'rgba(34,197,94,.06)'    },
          { label: 'Cost Today',     value: `$${totalCost.toFixed(2)}`, sub: 'USD',                              icon: <DollarSign size={15} />,    color: '#facc15', border: 'rgba(234,179,8,.2)',   bg: 'rgba(234,179,8,.06)'    },
          { label: 'Active Skills',  value: `${enabledSkills}`,          sub: `${skills.length} available`,      icon: <Zap size={15} />,           color: '#60a5fa', border: 'rgba(59,130,246,.2)',  bg: 'rgba(59,130,246,.06)'   },
        ].map((k, i) => (
          <div key={i} className="card" style={{ padding: 16, borderColor: k.border, background: k.bg }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#3d506b', fontWeight: 500 }}>{k.label}</span>
              <span style={{ color: k.color }}>{k.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: k.color, letterSpacing: '-0.5px' }}>{k.value}</div>
            <div style={{ fontSize: 11, color: '#2d3f57', marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Mid row: chart + agents */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 12 }}>
        {/* Chart */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>Token Usage Today</div>
            <span className="badge badge-indigo">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={tokenData}>
              <defs>
                <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" tick={{ fill: '#2d3f57', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${v/1000}k`} tick={{ fill: '#2d3f57', fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<CT />} />
              <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} fill="url(#tg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Agents */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', marginBottom: 12 }}>Agents</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {agents.map(a => {
              const c = { online: '#22c55e', working: '#eab308', offline: '#374151', error: '#ef4444' }[a.status]
              return (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: '#0d111a', border: '1px solid #1a2236' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Cpu size={13} color={c} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#e2e8f0' }}>{a.name}</div>
                    <div style={{ fontSize: 10.5, color: '#3d506b' }}>{a.role}</div>
                  </div>
                  <span className="dot" style={{ background: c }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom row: goals, sessions, jobs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {/* Goals */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>Goals</div>
            <button onClick={() => setActiveTab('operations')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#6366f1', cursor: 'pointer' }}>
              All <ArrowRight size={10} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {goals.map(g => (
              <div key={g.id}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {g.status === 'completed' ? <CheckCircle2 size={11} color="#4ade80" /> : <Circle size={11} color="#818cf8" />}
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{g.title}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: g.status === 'completed' ? '#4ade80' : '#818cf8' }}>{g.progress}%</span>
                </div>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: `${g.progress}%`, background: g.status === 'completed' ? '#22c55e' : 'linear-gradient(90deg,#6366f1,#a78bfa)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>Recent Sessions</div>
            <button onClick={() => setActiveTab('sessions')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#6366f1', cursor: 'pointer' }}>
              All <ArrowRight size={10} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sessions.slice(0, 4).map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, background: '#0d111a' }}>
                <span className={`dot ${s.status === 'live' ? 'dot-yellow' : 'dot-gray'}`} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</div>
                  <div style={{ fontSize: 10.5, color: '#3d506b' }}>{s.messages} msgs · {(s.tokens/1000).toFixed(1)}k</div>
                </div>
                <span className={`badge ${s.status === 'live' ? 'badge-green' : 'badge-gray'}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>Cron Jobs</div>
            <button onClick={() => setActiveTab('jobs')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#6366f1', cursor: 'pointer' }}>
              All <ArrowRight size={10} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {cronJobs.map(j => {
              const c = { enabled: '#4ade80', paused: '#facc15', error: '#f87171' }[j.status]
              return (
                <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, background: '#0d111a' }}>
                  <span className="dot" style={{ background: c }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500 }}>{j.name}</div>
                    <div style={{ fontSize: 10.5, color: '#3d506b' }} className="mono">{j.schedule}</div>
                  </div>
                  <span className={`badge ${j.status === 'enabled' ? 'badge-green' : j.status === 'error' ? 'badge-red' : 'badge-yellow'}`}>{j.status}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
