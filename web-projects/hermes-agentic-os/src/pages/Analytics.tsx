import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState } from 'react'
import { TrendingUp, DollarSign, Cpu, Zap } from 'lucide-react'

const daily = [
  { d: 'Mon', t: 142000, c: 1.42, s: 8 }, { d: 'Tue', t: 98000,  c: 0.98, s: 5 },
  { d: 'Wed', t: 187000, c: 1.87, s: 12 },{ d: 'Thu', t: 234000, c: 2.34, s: 15 },
  { d: 'Fri', t: 165000, c: 1.65, s: 10 },{ d: 'Sat', t: 78000,  c: 0.78, s: 4  },
  { d: 'Sun', t: 112000, c: 1.12, s: 7  },
]
const models = [
  { name: 'nous-hermes-3', t: 420000, color: '#6366f1' },
  { name: 'claude-sonnet', t: 280000, color: '#a78bfa' },
  { name: 'gpt-4o',        t: 180000, color: '#3b82f6' },
  { name: 'other',         t: 60000,  color: '#1e3048' },
]
const hourly = Array.from({length:24},(_,i)=>({ h:`${i}:00`, t: Math.floor(Math.random()*50000+5000) }))
const toolsRaw = [{n:'file_ops',c:234},{n:'web_search',c:189},{n:'code_runner',c:145},{n:'github',c:78},{n:'pdf',c:56}]
const tools = toolsRaw.map(x => ({ tool: x.n, calls: x.c }))

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return <div className="glass" style={{ padding:'6px 10px', borderRadius:7, fontSize:12 }}>
    <div style={{color:'#2d3f57'}}>{label}</div>
    {payload.map((p:any,i:number)=><div key={i} style={{color:p.color||'#818cf8'}}>{p.name}: {typeof p.value==='number'&&p.value>999?`${(p.value/1000).toFixed(0)}k`:p.value}</div>)}
  </div>
}

export function Analytics() {
  const [period, setPeriod] = useState<'7d'|'30d'|'90d'>('7d')
  const totalTok  = daily.reduce((a,d)=>a+d.t,0)
  const totalCost = daily.reduce((a,d)=>a+d.c,0)
  const totalSess = daily.reduce((a,d)=>a+d.s,0)

  return (
    <div className="anim-fade-up" style={{ height:'100%', overflowY:'auto', padding:20, background:'#07080d', display:'flex', flexDirection:'column', gap:14 }}>
      {/* Period */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:16, fontWeight:700, color:'#e2e8f0' }}>Usage Analytics</div>
        <div style={{ display:'flex', gap:2, padding:3, background:'#0d111a', border:'1px solid #1a2236', borderRadius:8 }}>
          {(['7d','30d','90d'] as const).map(p=>(
            <button key={p} onClick={()=>setPeriod(p)} style={{ padding:'4px 10px', borderRadius:6, fontSize:12, border:'none', background:period===p?'#1a2236':'transparent', color:period===p?'#e2e8f0':'#3d506b' }}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {[
          { l:'Total Tokens', v:`${(totalTok/1000).toFixed(0)}k`, icon:<Cpu size={14}/>,       c:'#818cf8', sub:'+18% vs last week' },
          { l:'Total Cost',   v:`$${totalCost.toFixed(2)}`,       icon:<DollarSign size={14}/>, c:'#facc15', sub:'+12% vs last week' },
          { l:'Sessions',     v:totalSess,                        icon:<TrendingUp size={14}/>, c:'#4ade80', sub:'+5 vs last week' },
          { l:'Tool Calls',   v:'958',                            icon:<Zap size={14}/>,        c:'#60a5fa', sub:'+22% vs last week' },
        ].map((k,i)=>(
          <div key={i} className="card" style={{ padding:16 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:12, color:'#3d506b' }}>{k.l}</span>
              <span style={{ color:k.c }}>{k.icon}</span>
            </div>
            <div style={{ fontSize:24, fontWeight:700, color:k.c, letterSpacing:'-0.5px' }}>{k.v}</div>
            <div style={{ fontSize:11, color:'#2d3f57', marginTop:4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:12 }}>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#cbd5e1', marginBottom:14 }}>Daily Tokens</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={daily}>
              <XAxis dataKey="d" tick={{fill:'#2d3f57',fontSize:11}} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v=>`${v/1000}k`} tick={{fill:'#2d3f57',fontSize:11}} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<TT/>}/>
              <Bar dataKey="t" name="tokens" fill="#6366f1" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#cbd5e1', marginBottom:14 }}>Model Mix</div>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={models} dataKey="t" cx="50%" cy="50%" outerRadius={55} innerRadius={30}>
                {models.map((m,i)=><Cell key={i} fill={m.color}/>)}
              </Pie>
              <Tooltip formatter={(v)=>`${(Number(v)/1000).toFixed(0)}k tokens`}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:8 }}>
            {models.map(m=>(
              <div key={m.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:m.color, flexShrink:0 }}/>
                  <span style={{ fontSize:11, color:'#4a5f7a' }}>{m.name.split('-')[0]}</span>
                </div>
                <span style={{ fontSize:11, color:'#64748b' }}>{(m.t/1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 240px', gap:12 }}>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#cbd5e1', marginBottom:14 }}>Hourly Activity (Today)</div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={hourly}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a78bfa" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="h" tick={{fill:'#2d3f57',fontSize:10}} axisLine={false} tickLine={false} interval={3}/>
              <YAxis tickFormatter={v=>`${v/1000}k`} tick={{fill:'#2d3f57',fontSize:10}} axisLine={false} tickLine={false} width={24}/>
              <Tooltip content={<TT/>}/>
              <Area type="monotone" dataKey="t" name="tokens" stroke="#a78bfa" strokeWidth={2} fill="url(#ag)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#cbd5e1', marginBottom:14 }}>Top Tools</div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={tools} layout="vertical">
              <XAxis type="number" tick={{fill:'#2d3f57',fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="tool" tick={{fill:'#4a5f7a',fontSize:11}} axisLine={false} tickLine={false} width={76}/>
              <Tooltip/>
              <Bar dataKey="calls" fill="#3b82f6" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
