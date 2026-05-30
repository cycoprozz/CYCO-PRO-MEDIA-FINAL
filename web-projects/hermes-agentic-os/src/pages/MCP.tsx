import { useState } from 'react'
import { Plug, Plus, RefreshCw, CheckCircle2, XCircle, Circle, ExternalLink, Wrench, Search } from 'lucide-react'

interface MCPServer { id:string; name:string; desc:string; cmd:string; status:'connected'|'disconnected'|'error'; tools:string[]; cat:string }

const SERVERS: MCPServer[] = [
  { id:'m1', name:'filesystem',  desc:'Read/write local file system',             cmd:'npx @modelcontextprotocol/server-filesystem',   status:'connected',    tools:['read_file','write_file','list_dir','search_files'],      cat:'System'       },
  { id:'m2', name:'brave-search',desc:'Web search via Brave Search API',          cmd:'npx @modelcontextprotocol/server-brave-search',  status:'connected',    tools:['brave_web_search','brave_local_search'],                  cat:'Research'     },
  { id:'m3', name:'github',      desc:'GitHub repos, PRs, issues, code',          cmd:'npx @modelcontextprotocol/server-github',        status:'connected',    tools:['search_repos','get_file','create_issue','list_prs'],      cat:'Developer'    },
  { id:'m4', name:'postgres',    desc:'PostgreSQL database operations',           cmd:'npx @modelcontextprotocol/server-postgres',      status:'disconnected', tools:['query','list_tables','describe_table'],                   cat:'Database'     },
  { id:'m5', name:'slack',       desc:'Send messages and read channels',          cmd:'npx @modelcontextprotocol/server-slack',         status:'error',        tools:['post_message','list_channels','get_thread'],              cat:'Messaging'    },
  { id:'m6', name:'puppeteer',   desc:'Browser automation and web scraping',      cmd:'npx @modelcontextprotocol/server-puppeteer',     status:'disconnected', tools:['navigate','screenshot','click','fill_form'],              cat:'Browser'      },
]

const sIcon = (s:string) => {
  if(s==='connected')    return <CheckCircle2 size={12} color="#4ade80"/>
  if(s==='error')        return <XCircle      size={12} color="#f87171"/>
  return                        <Circle       size={12} color="#2d3f57"/>
}

export function MCP() {
  const [search, setSearch] = useState('')
  const [sel, setSel] = useState<string|null>('m1')
  const filtered = SERVERS.filter(s => s.name.includes(search) || s.desc.toLowerCase().includes(search.toLowerCase()))
  const server = SERVERS.find(s => s.id === sel)
  const conn = SERVERS.filter(s => s.status === 'connected').length

  return (
    <div className="anim-fade-up" style={{ display:'flex', height:'100%', background:'#07080d' }}>
      {/* List */}
      <div style={{ width:320, minWidth:320, borderRight:'1px solid #111827', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'12px 14px', borderBottom:'1px solid #111827' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>
              <Plug size={14} color="#818cf8"/>
              <span style={{ fontSize:14, fontWeight:600, color:'#e2e8f0' }}>MCP Servers</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span className="badge badge-green">{conn} connected</span>
              <button className="icon-btn" style={{ width:26, height:26 }}><Plus size={12}/></button>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 10px', background:'#0d111a', border:'1px solid #1a2236', borderRadius:8 }}>
            <Search size={12} color="#3d506b"/>
            <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} style={{ border:'none', background:'transparent', padding:0, outline:'none', fontSize:13 }}/>
          </div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'10px 10px' }}>
          {filtered.map(s=>(
            <button key={s.id} onClick={()=>setSel(s.id)} style={{
              width:'100%', textAlign:'left', padding:'11px 12px', borderRadius:9, marginBottom:4,
              background: sel===s.id ? '#0b0f1c' : '#0d111a',
              border: `1px solid ${sel===s.id ? '#6366f1' : '#1a2236'}`,
              cursor:'pointer', transition:'all 0.13s',
            }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                  {sIcon(s.status)}
                  <span className="mono" style={{ fontSize:13, color:'#e2e8f0', fontWeight:600 }}>{s.name}</span>
                </div>
                <span className="badge badge-gray" style={{ fontSize:9 }}>{s.cat}</span>
              </div>
              <div style={{ fontSize:11.5, color:'#3d506b' }}>{s.desc}</div>
              <div style={{ fontSize:10.5, color:'#2d3f57', marginTop:4 }}>{s.tools.length} tools</div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      {server ? (
        <div style={{ flex:1, overflowY:'auto', padding:22 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                {sIcon(server.status)}
                <h2 className="mono" style={{ fontSize:17, fontWeight:700, color:'#e2e8f0' }}>{server.name}</h2>
                <span className={`badge ${server.status==='connected'?'badge-green':server.status==='error'?'badge-red':'badge-gray'}`}>{server.status}</span>
              </div>
              <p style={{ fontSize:13, color:'#4a5f7a' }}>{server.desc}</p>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <button className="btn btn-ghost" style={{ fontSize:12, padding:'6px 11px' }}><RefreshCw size={11}/> Reconnect</button>
              {server.status!=='connected' && <button className="btn btn-primary" style={{ fontSize:12, padding:'6px 11px' }}><Plug size={11}/> Connect</button>}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
            <div className="card" style={{ padding:14 }}>
              <div className="sec-label" style={{ marginBottom:10 }}>Configuration</div>
              {[['Command', server.cmd, true],['Category', server.cat, false],['Tools', String(server.tools.length), false]].map(([l,v,m])=>(
                <div key={l as string} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ fontSize:12, color:'#3d506b' }}>{l}</span>
                  <span className={m?'mono':''} style={{ fontSize:11.5, color:'#94a3b8', maxWidth:'60%', textAlign:'right' }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding:14 }}>
              <div className="sec-label" style={{ marginBottom:10 }}>Actions</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <a href={`https://github.com/modelcontextprotocol`} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize:12, textDecoration:'none' }}>
                  <ExternalLink size={11}/> Docs
                </a>
                <button className="btn btn-ghost" style={{ fontSize:12 }}><Wrench size={11}/> Test</button>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding:14 }}>
            <div className="sec-label" style={{ marginBottom:10 }}>Available Tools</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:7 }}>
              {server.tools.map(t=>(
                <div key={t} style={{ display:'flex', alignItems:'center', gap:7, padding:'8px 10px', borderRadius:7, background:'#0d111a', border:'1px solid #1a2236' }}>
                  <Wrench size={10} color="#6366f1"/>
                  <span className="mono" style={{ fontSize:12, color:'#64748b' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10 }}>
          <Plug size={36} color="#111827"/>
          <p style={{ color:'#2d3f57', fontSize:14 }}>Select a server</p>
        </div>
      )}
    </div>
  )
}
