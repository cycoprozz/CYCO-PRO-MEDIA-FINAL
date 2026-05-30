import { useStore, type TabId } from '@/store/useStore'
import {
  LayoutDashboard, MessageSquare, Brain, Zap, Clock,
  Terminal, BarChart2, Key, Plug, Activity, History, Cpu
} from 'lucide-react'

interface NavGroup {
  label: string
  items: { id: TabId; label: string; icon: React.ReactNode; badge?: number }[]
}

const NAV: NavGroup[] = [
  {
    label: 'Core',
    items: [
      { id: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={15} /> },
      { id: 'chat',       label: 'Chat',        icon: <MessageSquare  size={15} />, badge: 2 },
      { id: 'sessions',   label: 'Sessions',    icon: <History        size={15} /> },
    ],
  },
  {
    label: 'Agent',
    items: [
      { id: 'memory',     label: 'Memory',      icon: <Brain    size={15} /> },
      { id: 'skills',     label: 'Skills',      icon: <Zap      size={15} /> },
      { id: 'jobs',       label: 'Cron Jobs',   icon: <Clock    size={15} /> },
      { id: 'operations', label: 'Operations',  icon: <Activity size={15} /> },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'terminal',   label: 'Terminal',    icon: <Terminal  size={15} /> },
      { id: 'analytics',  label: 'Analytics',   icon: <BarChart2 size={15} /> },
      { id: 'mcp',        label: 'MCP',         icon: <Plug      size={15} /> },
      { id: 'apikeys',    label: 'API Keys',    icon: <Key       size={15} /> },
    ],
  },
]

export function Sidebar() {
  const { activeTab, setActiveTab, agents } = useStore()
  const onlineCount = agents.filter(a => a.status !== 'offline').length

  return (
    <aside style={{
      width: 210, minWidth: 210,
      background: '#070b12',
      borderRight: '1px solid #111827',
      display: 'flex', flexDirection: 'column',
      height: '100vh',
    }}>
      {/* Logo */}
      <div style={{
        height: 54, display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 16px', borderBottom: '1px solid #111827', flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg,#6366f1,#a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Cpu size={14} color="#fff" />
        </div>
        <span className="grad-text" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.3px' }}>Hermes OS</span>
      </div>

      {/* Nav groups */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        {NAV.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 20 }}>
            <div className="sec-label" style={{ marginBottom: 6, paddingLeft: 8 }}>{group.label}</div>
            {group.items.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="ni">{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    width: 17, height: 17, borderRadius: '50%', fontSize: 10, fontWeight: 700,
                    background: '#6366f1', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Status footer */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid #111827', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 10px', borderRadius: 8, background: '#0d111a',
          border: '1px solid #1a2236',
        }}>
          <span className="dot dot-green" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, color: '#64748b', fontWeight: 600 }}>{onlineCount}/{agents.length} agents online</div>
            <div style={{ fontSize: 10, color: '#2d3f57', marginTop: 1 }}>Gateway · port 8642</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
