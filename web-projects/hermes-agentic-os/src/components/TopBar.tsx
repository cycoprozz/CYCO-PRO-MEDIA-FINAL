import { useStore, type TabId } from '@/store/useStore'
import { Bell, Search, Wifi } from 'lucide-react'

const TITLES: Record<TabId, string> = {
  dashboard:  'Dashboard',
  chat:       'Chat',
  sessions:   'Sessions',
  memory:     'Memory Vault',
  skills:     'Skills',
  jobs:       'Cron Jobs',
  terminal:   'Terminal',
  analytics:  'Analytics',
  apikeys:    'API Keys',
  mcp:        'MCP Servers',
  operations: 'Operations',
}

export function TopBar() {
  const { activeTab } = useStore()

  return (
    <header style={{
      height: 54, flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px',
      background: '#070b12', borderBottom: '1px solid #111827',
    }}>
      <h1 style={{ fontSize: 14, fontWeight: 600, color: '#c7d2fe', flex: 1 }}>
        {TITLES[activeTab]}
      </h1>

      {/* fake search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
        background: '#0d111a', border: '1px solid #1a2236', borderRadius: 8,
        width: 200, cursor: 'text',
      }}>
        <Search size={12} color="#3d506b" />
        <span style={{ fontSize: 12.5, color: '#3d506b' }}>Search…</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#2d3f57', background: '#111827', padding: '1px 5px', borderRadius: 4, border: '1px solid #1a2236' }}>⌘K</span>
      </div>

      <button className="icon-btn" style={{ position: 'relative' }}>
        <Bell size={14} />
        <span style={{ position: 'absolute', top: 5, right: 5, width: 5, height: 5, borderRadius: '50%', background: '#ef4444' }} />
      </button>

      {/* connection pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
        background: '#0d111a', border: '1px solid #1a2236', borderRadius: 20,
      }}>
        <Wifi size={10} color="#22c55e" />
        <span style={{ fontSize: 11, color: '#3d506b' }}>Connected</span>
      </div>
    </header>
  )
}
