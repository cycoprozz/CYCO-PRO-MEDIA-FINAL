import './index.css'
import { useStore } from '@/store/useStore'
import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '@/components/TopBar'
import { Dashboard }  from '@/pages/Dashboard'
import { Chat }       from '@/pages/Chat'
import { Sessions }   from '@/pages/Sessions'
import { Memory }     from '@/pages/Memory'
import { Skills }     from '@/pages/Skills'
import { Jobs }       from '@/pages/Jobs'
import { TerminalPage } from '@/pages/Terminal'
import { Analytics }  from '@/pages/Analytics'
import { ApiKeys }    from '@/pages/ApiKeys'
import { MCP }        from '@/pages/MCP'
import { Operations } from '@/pages/Operations'

export default function App() {
  const { activeTab } = useStore()

  const page = {
    dashboard:  <Dashboard />,
    chat:       <Chat />,
    sessions:   <Sessions />,
    memory:     <Memory />,
    skills:     <Skills />,
    jobs:       <Jobs />,
    terminal:   <TerminalPage />,
    analytics:  <Analytics />,
    apikeys:    <ApiKeys />,
    mcp:        <MCP />,
    operations: <Operations />,
  }[activeTab]

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#07080d' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <TopBar />
        <main style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {page}
        </main>
      </div>
    </div>
  )
}
