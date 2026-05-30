import { useStore, type ChatMessage } from '@/store/useStore'
import { Send, Paperclip, Mic, Wrench, ChevronDown, Plus, Bot, User, AlertCircle } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { nextMsgId } from '@/store/useStore'

function ToolCallBlock({ tc }: { tc: { name: string; result: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginTop: 8, borderRadius: 7, border: '1px solid #1a2236', overflow: 'hidden', background: '#07080d' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px',
        background: 'transparent', border: 'none', cursor: 'pointer',
      }}>
        <Wrench size={11} color="#6366f1" />
        <span className="mono" style={{ fontSize: 11, color: '#818cf8', flex: 1, textAlign: 'left' }}>{tc.name}</span>
        <span style={{ fontSize: 10.5, color: '#3d506b' }}>tool call</span>
        <ChevronDown size={11} color="#3d506b" style={{ transform: open ? 'rotate(180deg)' : undefined, transition: '0.15s' }} />
      </button>
      {open && (
        <div className="mono" style={{ padding: '6px 10px 10px', fontSize: 11, color: '#4a5f7a', borderTop: '1px solid #111827' }}>
          {tc.result}
        </div>
      )}
    </div>
  )
}

function Bubble({ msg, agentName }: { msg: ChatMessage; agentName: string }) {
  if (msg.role === 'system') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: '#0d111a', border: '1px solid #1a2236' }}>
          <AlertCircle size={10} color="#3d506b" />
          <span style={{ fontSize: 11, color: '#3d506b' }}>{msg.content}</span>
        </div>
      </div>
    )
  }
  const isUser = msg.role === 'user'
  return (
    <div className="anim-fade-up" style={{ display: 'flex', gap: 10, flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
        background: isUser ? '#1a2236' : 'linear-gradient(135deg,#6366f1,#a78bfa)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isUser ? <User size={12} color="#94a3b8" /> : <Bot size={12} color="#fff" />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '76%', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        {!isUser && <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, marginBottom: 3 }}>{agentName}</span>}
        <div style={{
          padding: '9px 13px', borderRadius: isUser ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
          background: isUser ? '#0e1c32' : '#0d111a',
          border: `1px solid ${isUser ? '#1e3048' : '#1a2236'}`,
        }}>
          <p style={{ fontSize: 13.5, color: '#e2e8f0', lineHeight: 1.65 }}>{msg.content}</p>
          {msg.toolCalls?.map((tc, i) => <ToolCallBlock key={i} tc={tc} />)}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
          <span style={{ fontSize: 10, color: '#2d3f57' }}>{msg.timestamp}</span>
          {msg.tokens && <span style={{ fontSize: 10, color: '#2d3f57' }}>{msg.tokens} tokens</span>}
        </div>
      </div>
    </div>
  )
}

const REPLIES = [
  "On it! Let me search the web for that and compile a summary.",
  "Based on my memory vault, I recall your preference for concise answers. Here's what I found…",
  "I'll use the code-runner skill to execute that. One moment…",
  "Breaking this into subtasks and handling each one systematically.",
  "Done! Results saved to your memory vault for future reference.",
]

export function Chat() {
  const { messages, chatInput, setChatInput, addMessage, isStreaming, setIsStreaming, agents, selectedAgent, setSelectedAgent } = useStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const agent = agents.find(a => a.id === selectedAgent) || agents[0]

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }) }, [messages, isStreaming])

  const send = () => {
    if (!chatInput.trim() || isStreaming) return
    addMessage({ id: nextMsgId(), role: 'user', content: chatInput, timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) })
    setChatInput('')
    setIsStreaming(true)
    setTimeout(() => {
      addMessage({
        id: nextMsgId(), role: 'agent',
        content: REPLIES[Math.floor(Math.random() * REPLIES.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        agentId: agent.id, tokens: Math.floor(Math.random() * 180 + 40),
      })
      setIsStreaming(false)
    }, 1100 + Math.random() * 600)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#07080d' }}>
      {/* Session bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderBottom: '1px solid #111827', flexShrink: 0 }}>
        <span className="dot dot-yellow" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Live Session</span>
        <span style={{ color: '#1a2236' }}>·</span>
        {/* Agent selector */}
        <select value={selectedAgent} onChange={e => setSelectedAgent(e.target.value)} style={{ width: 'auto', padding: '3px 8px', fontSize: 12 }}>
          {agents.map(a => <option key={a.id} value={a.id}>{a.name} ({a.model})</option>)}
        </select>
        <span style={{ fontSize: 12, color: '#3d506b' }}>{messages.filter(m => m.role !== 'system').length} messages</span>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 11px' }}>
            <Plus size={12} /> New Session
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map(msg => <Bubble key={msg.id} msg={msg} agentName={agent.name} />)}
        {isStreaming && (
          <div className="anim-fade-up" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <Bot size={12} color="#fff" />
            </div>
            <div style={{ padding: '9px 13px', borderRadius: '10px 10px 10px 2px', background: '#0d111a', border: '1px solid #1a2236', display: 'flex', gap: 5, alignItems: 'center' }}>
              {[0,1,2].map(i => <span key={i} className="dot dot-yellow" style={{ animationDelay: `${i*0.2}s` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 18px', borderTop: '1px solid #111827', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: '10px 12px', background: '#0d111a', border: '1px solid #1a2236', borderRadius: 10 }}>
          <textarea
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={`Message ${agent.name}…  (Enter to send, Shift+Enter for newline)`}
            rows={1}
            style={{ flex: 1, resize: 'none', border: 'none', background: 'transparent', padding: 0, fontSize: 13.5, outline: 'none', maxHeight: 110, overflowY: 'auto', color: '#e2e8f0', fontFamily: 'inherit' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <button className="icon-btn"><Paperclip size={14} /></button>
            <button className="icon-btn"><Mic size={14} /></button>
            <button
              className="btn btn-primary"
              style={{ padding: '7px 13px', fontSize: 13, opacity: (!chatInput.trim() || isStreaming) ? 0.4 : 1 }}
              onClick={send} disabled={!chatInput.trim() || isStreaming}
            >
              <Send size={13} /> Send
            </button>
          </div>
        </div>
        {/* Slash commands */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {['/web-search ', '/run-code ', '/read-file ', '/create-job '].map(cmd => (
            <button key={cmd} onClick={() => setChatInput(cmd)} className="btn btn-ghost" style={{ fontSize: 11, padding: '3px 9px', borderRadius: 20 }}>{cmd.trim()}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
