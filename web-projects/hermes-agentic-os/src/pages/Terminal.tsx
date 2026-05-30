import { useState, useRef, useEffect } from 'react'
import { Terminal as TermIcon, Plus, X, Copy, Maximize2 } from 'lucide-react'

interface Line { id: number; type: 'input'|'output'|'error'|'info'|'success'; content: string }
let lid = 0
const L = (type: Line['type'], content: string): Line => ({ id: ++lid, type, content })

const RESPONSES: Record<string, string[]> = {
  'hermes chat':        ['Starting Hermes chat session…', '✓ Connected to Hermes Agent v2.3.0', '✓ Memory vault loaded (6 entries)', '✓ Skills loaded (7 active)', 'Type your message or /help for commands'],
  'hermes status':      ['Hermes Agent Status', '  Version:  2.3.0', '  Gateway:  running (PID 8624, port 8642)', '  Dashboard: running (port 9119)', '  Sessions: 2 active', '  Model:    nous-hermes-3 (primary)'],
  'hermes memory list': ['Memory entries (6 total):', '  user.name         User Profile  0.2 KB', '  project.stack     Projects      0.3 KB', '  preferences.code  Preferences   0.4 KB', '  business.goals    Business      0.5 KB', '  context.meetings  User Profile  0.2 KB', '  skills.learned    Skills        0.3 KB'],
  'hermes skills':      ['Enabled Skills (7/10):', '  ✓ web-search  (234 uses)', '  ✓ code-runner (189 uses)', '  ✓ file-ops    (312 uses)', '  ✓ github-ops  (78 uses)', '  ✓ pdf-reader  (145 uses)', '  ✓ db-query    (67 uses)', '  ✗ email-sender (disabled)', '  ✗ image-gen    (disabled)', '  ✗ cal-sync     (disabled)'],
  'hermes jobs list':   ['Cron Jobs (4 total):', '  ✓ Daily Digest     0 8 * * *    telegram  42 runs', '  ✓ Weekly Report    0 9 * * 1    slack      8 runs', '  ⏸ Memory Cleanup  0 0 1 * *    local      3 runs', '  ✗ Health Check    */15 * * * * discord   ERROR'],
  'hermes keys':        ['API Keys:', '  ✓ OpenAI          OPENAI_API_KEY       valid', '  ✓ Anthropic       ANTHROPIC_API_KEY    valid', '  ✗ DeepSeek        DEEPSEEK_API_KEY     not set', '  ✗ Groq            GROQ_API_KEY         invalid', '  ✓ Brave Search    BRAVE_API_KEY        valid'],
  'ls':                 ['agents/  memory/  skills/  sessions/  config/  logs/  keys/'],
  'pwd':                ['/Users/user/.hermes'],
  'help':               ['Available commands:', '  hermes chat          Start interactive chat', '  hermes status        Show agent status', '  hermes memory list   List memory entries', '  hermes skills        List skills', '  hermes jobs list     List cron jobs', '  hermes keys          Show API key status', '  clear                Clear terminal', '  ls / pwd             File system', '  help                 This help'],
}

const INIT: Line[] = [
  L('info', '╔══════════════════════════════════════╗'),
  L('info', '║     Hermes Agentic OS  v2.3.0         ║'),
  L('info', '╚══════════════════════════════════════╝'),
  L('success', '✓ Hermes Agent connected'),
  L('success', '✓ Gateway on :8642'),
  L('output', 'Type "help" for commands'),
  L('output', ''),
]

const lineColor = (t: Line['type']) => ({ input:'#a5f3fc', output:'#64748b', error:'#f87171', info:'#818cf8', success:'#4ade80' }[t])

export function TerminalPage() {
  const [lines, setLines] = useState<Line[]>(INIT)
  const [input, setInput] = useState('')
  const [hist, setHist] = useState<string[]>([])
  const [hi, setHi] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])

  const run = (cmd: string) => {
    const t = cmd.trim()
    if (!t) return
    setHist(h => [t, ...h])
    setHi(-1)
    if (t === 'clear') { setLines([]); setInput(''); return }
    const out: Line[] = [L('input', `$ ${t}`)]
    const resp = RESPONSES[t]
    if (resp) {
      resp.forEach(r => out.push(L(r.startsWith('✗') || r.toLowerCase().includes('error') ? 'error' : r.startsWith('✓') ? 'success' : 'output', r)))
    } else {
      out.push(L('error', `bash: ${t}: command not found`))
    }
    out.push(L('output', ''))
    setLines(l => [...l, ...out])
    setInput('')
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { run(input); return }
    if (e.key === 'ArrowUp')   { const i = Math.min(hi+1, hist.length-1); setHi(i); setInput(hist[i]||'') }
    if (e.key === 'ArrowDown') { const i = Math.max(hi-1, -1); setHi(i); setInput(i===-1?'':hist[i]||'') }
  }

  const QUICK = ['hermes status','hermes chat','hermes memory list','hermes skills','hermes keys','help']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#04060e' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: '#070b12', borderBottom: '1px solid #111827', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 7, background: '#0d111a', border: '1px solid #1a2236' }}>
          <TermIcon size={11} color="#818cf8" />
          <span style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500 }}>hermes — bash</span>
          <X size={10} color="#3d506b" />
        </div>
        <button className="icon-btn" style={{ width: 26, height: 26 }}><Plus size={11} /></button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <button className="icon-btn" style={{ width: 26, height: 26 }} onClick={() => navigator.clipboard.writeText(lines.map(l => l.content).join('\n'))}><Copy size={11} /></button>
          <button className="icon-btn" style={{ width: 26, height: 26 }}><Maximize2 size={11} /></button>
        </div>
      </div>

      {/* Output */}
      <div className="mono" style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', cursor: 'text', fontSize: 13 }} onClick={() => inputRef.current?.focus()}>
        {lines.map(l => <div key={l.id} style={{ color: lineColor(l.type), lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{l.content}</div>)}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a5f3fc' }}>
          <span>$</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#a5f3fc', fontFamily: 'inherit', fontSize: 'inherit', flex: 1, caretColor: '#6366f1' }}
            autoFocus spellCheck={false} />
          <span className="anim-blink" style={{ color: '#6366f1' }}>█</span>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Quick commands */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderTop: '1px solid #111827', background: '#070b12', flexShrink: 0, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#2d3f57' }}>Quick:</span>
        {QUICK.map(cmd => (
          <button key={cmd} className="btn btn-ghost" style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20 }} onClick={() => run(cmd)}>{cmd}</button>
        ))}
      </div>
    </div>
  )
}
