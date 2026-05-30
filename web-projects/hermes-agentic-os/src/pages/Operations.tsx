import { useStore } from '@/store/useStore'
import { Play, Pause, Settings2, Plus, Cpu, ArrowRight, CheckSquare, Clock, AlertCircle, Circle } from 'lucide-react'
import { useState } from 'react'

interface Task { id:string; title:string; assignee:string; status:'todo'|'in_progress'|'review'|'done'; priority:'high'|'medium'|'low' }
const TASKS: Task[] = [
  { id:'t1', title:'Implement web search skill v2',    assignee:'hermes',     status:'in_progress', priority:'high'   },
  { id:'t2', title:'Review and merge PR #142',         assignee:'claude',     status:'review',      priority:'high'   },
  { id:'t3', title:'Write test suite for cron jobs',   assignee:'hermes',     status:'todo',        priority:'medium' },
  { id:'t4', title:'Optimize memory compression',      assignee:'openclaw',   status:'done',        priority:'medium' },
  { id:'t5', title:'Update API documentation',         assignee:'researcher', status:'todo',        priority:'low'    },
  { id:'t6', title:'Deploy to staging environment',    assignee:'openclaw',   status:'in_progress', priority:'high'   },
]
const COLS = ['todo','in_progress','review','done'] as const
const COL_META: Record<string,{label:string;color:string;icon:React.ReactNode}> = {
  todo:        { label:'To Do',       color:'#2d3f57', icon:<Circle      size={11}/> },
  in_progress: { label:'In Progress', color:'#60a5fa', icon:<Clock       size={11}/> },
  review:      { label:'Review',      color:'#facc15', icon:<AlertCircle size={11}/> },
  done:        { label:'Done',        color:'#4ade80', icon:<CheckSquare size={11}/> },
}
const PC = (p:string) => ({ high:'#ef4444', medium:'#eab308', low:'#374151' }[p]||'#374151')

export function Operations() {
  const { agents, updateAgentStatus } = useStore()
  const [tasks] = useState<Task[]>(TASKS)

  return (
    <div className="anim-fade-up" style={{ display:'flex', flexDirection:'column', height:'100%', overflowY:'auto', background:'#07080d', padding:20, gap:18 }}>
      {/* Agents */}
      <div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#e2e8f0' }}>Agent Control</div>
          <button className="btn btn-ghost" style={{ fontSize:12, padding:'5px 11px' }}><Plus size={11}/> Add Agent</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:10 }}>
          {agents.map(a => {
            const c = { online:'#22c55e', working:'#eab308', offline:'#374151', error:'#ef4444' }[a.status]
            return (
              <div key={a.id} className="card" style={{ padding:14 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:'#111827', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Cpu size={15} color={c}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#e2e8f0' }}>{a.name}</div>
                    <div style={{ fontSize:10.5, color:'#3d506b' }}>{a.model}</div>
                  </div>
                  <span className="dot" style={{ background:c, animation: a.status==='working'?'pulse-dot 1.4s ease-in-out infinite':undefined }}/>
                </div>
                <div style={{ fontSize:11.5, color:'#3d506b', marginBottom:10 }}>{a.role}</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:10 }}>
                  <div style={{ textAlign:'center', padding:'6px 0', background:'#0d111a', borderRadius:7 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:'#e2e8f0' }}>{a.taskCount}</div>
                    <div style={{ fontSize:9, color:'#2d3f57' }}>tasks</div>
                  </div>
                  <div style={{ textAlign:'center', padding:'6px 0', background:'#0d111a', borderRadius:7 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:'#e2e8f0' }}>{(a.tokenCount/1000).toFixed(0)}k</div>
                    <div style={{ fontSize:9, color:'#2d3f57' }}>tokens</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:5 }}>
                  <button
                    className="btn btn-ghost" style={{ flex:1, fontSize:11, padding:'5px 0' }}
                    onClick={() => updateAgentStatus(a.id, a.status==='offline'?'online':'offline')}
                  >
                    {a.status==='offline'?<><Play size={10} color="#4ade80"/> Start</>:<><Pause size={10}/> Pause</>}
                  </button>
                  <button className="icon-btn" style={{ width:28, height:28, flexShrink:0 }}><Settings2 size={11}/></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Kanban */}
      <div>
        <div style={{ fontSize:14, fontWeight:600, color:'#e2e8f0', marginBottom:12 }}>Task Board</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
          {COLS.map(col => {
            const meta = COL_META[col]
            const colTasks = tasks.filter(t => t.status === col)
            return (
              <div key={col}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, padding:'0 4px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5, color:meta.color }}>
                    {meta.icon}
                    <span style={{ fontSize:12, fontWeight:600 }}>{meta.label}</span>
                  </div>
                  <span className="badge badge-gray" style={{ fontSize:9 }}>{colTasks.length}</span>
                </div>
                <div style={{ background:'#0d111a', border:'1px solid #1a2236', borderRadius:10, padding:8, minHeight:80, display:'flex', flexDirection:'column', gap:6 }}>
                  {colTasks.map(task => {
                    const ag = agents.find(a=>a.id===task.assignee)
                    const ac = { online:'#22c55e', working:'#eab308', offline:'#374151', error:'#ef4444' }[ag?.status||'offline']
                    return (
                      <div key={task.id} className="card anim-slide-r" style={{ padding:'10px 12px', cursor:'grab' }}>
                        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:6, marginBottom:6 }}>
                          <span style={{ fontSize:12, color:'#e2e8f0', lineHeight:1.4 }}>{task.title}</span>
                          <span style={{ width:6, height:6, borderRadius:'50%', background:PC(task.priority), flexShrink:0, marginTop:4 }}/>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                          <span className="dot" style={{ background:ac, width:5, height:5 }}/>
                          <span style={{ fontSize:10.5, color:'#3d506b' }}>{ag?.name||task.assignee}</span>
                          <span style={{ marginLeft:'auto' }}>
                            <ArrowRight size={9} color="#1a2236"/>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  <button style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 8px', color:'#2d3f57', fontSize:11, border:'none', background:'transparent', cursor:'pointer' }}>
                    <Plus size={10}/> Add task
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
