import { create } from 'zustand'

export type AgentStatus = 'online' | 'working' | 'offline' | 'error'
export type TabId =
  | 'dashboard' | 'chat' | 'memory' | 'skills' | 'jobs'
  | 'sessions'  | 'terminal' | 'analytics' | 'apikeys' | 'mcp' | 'operations'

export interface Agent {
  id: string; name: string; model: string; status: AgentStatus
  role: string; tokenCount: number; taskCount: number; lastActive: string
}

export interface ChatMessage {
  id: string; role: 'user' | 'agent' | 'system'; content: string
  timestamp: string; agentId?: string
  toolCalls?: { name: string; result: string }[]; tokens?: number
}

export interface Session {
  id: string; title: string; agentId: string; model: string
  messages: number; tokens: number; cost: number
  status: 'live' | 'ended'
  platform: 'cli' | 'telegram' | 'discord' | 'slack' | 'cron' | 'web'
  lastActive: string
}

export interface CronJob {
  id: string; name: string; prompt: string; schedule: string
  target: string; status: 'enabled' | 'paused' | 'error'
  lastRun: string; nextRun: string; runCount: number
}

export interface Skill {
  id: string; name: string; description: string; category: string
  enabled: boolean; origin: 'builtin' | 'community' | 'custom'; usageCount: number
}

export interface MemoryEntry {
  id: string; key: string; value: string; category: string
  created: string; updated: string; size: string
}

export interface Goal {
  id: string; title: string; progress: number
  status: 'active' | 'completed' | 'paused'; dueDate: string; agentId: string
}

export type KeyStatus = 'valid' | 'invalid' | 'untested' | 'testing'

export interface ApiKey {
  id: string
  provider: string          // display name e.g. "OpenAI"
  envVar: string            // e.g. OPENAI_API_KEY
  value: string
  category: string
  status: KeyStatus
  maskedValue: string       // shown in UI
  docsUrl: string
  baseUrl?: string          // for validation ping
  addedAt: string
}

/* ─── seed data ──────────────────────────────────────────── */
const AGENTS: Agent[] = [
  { id: 'hermes',     name: 'Hermes',    model: 'nous-hermes-3',     status: 'online',  role: 'Primary Agent',        tokenCount: 142800, taskCount: 47, lastActive: 'now' },
  { id: 'claude',     name: 'Claude',    model: 'claude-sonnet-4-6', status: 'working', role: 'Planner / Reasoner',   tokenCount: 89200,  taskCount: 23, lastActive: '2m ago' },
  { id: 'openclaw',   name: 'OpenClaw',  model: 'gpt-4o',            status: 'online',  role: 'Router / Dispatcher',  tokenCount: 56400,  taskCount: 31, lastActive: '5m ago' },
  { id: 'researcher', name: 'Researcher',model: 'nous-hermes-3',     status: 'offline', role: 'Research Agent',       tokenCount: 28100,  taskCount: 12, lastActive: '1h ago' },
]

const SESSIONS: Session[] = [
  { id: 's1', title: 'Build landing page component', agentId: 'hermes',   model: 'nous-hermes-3',     messages: 24, tokens: 18420, cost: 0.18, status: 'live',  platform: 'web',      lastActive: 'now' },
  { id: 's2', title: 'Research competitor analysis',  agentId: 'claude',   model: 'claude-sonnet-4-6', messages: 16, tokens: 12800, cost: 0.24, status: 'live',  platform: 'web',      lastActive: '3m ago' },
  { id: 's3', title: 'Weekly digest cron job',        agentId: 'hermes',   model: 'nous-hermes-3',     messages: 4,  tokens: 3200,  cost: 0.03, status: 'ended', platform: 'cron',     lastActive: '1h ago' },
  { id: 's4', title: 'Telegram bot response',         agentId: 'hermes',   model: 'nous-hermes-3',     messages: 8,  tokens: 5600,  cost: 0.05, status: 'ended', platform: 'telegram', lastActive: '2h ago' },
  { id: 's5', title: 'Code review pipeline',          agentId: 'openclaw', model: 'gpt-4o',            messages: 32, tokens: 28100, cost: 0.42, status: 'ended', platform: 'cli',      lastActive: '3h ago' },
  { id: 's6', title: 'Discord community Q&A',         agentId: 'hermes',   model: 'nous-hermes-3',     messages: 12, tokens: 8400,  cost: 0.08, status: 'ended', platform: 'discord',  lastActive: '5h ago' },
]

const JOBS: CronJob[] = [
  { id: 'j1', name: 'Daily Digest',   prompt: 'Summarize top 5 AI news and send to Telegram',           schedule: '0 8 * * *',    target: 'telegram', status: 'enabled', lastRun: '8:00 AM',        nextRun: 'Tomorrow 8:00 AM', runCount: 42 },
  { id: 'j2', name: 'Weekly Report',  prompt: 'Generate weekly analytics report for Slack #reports',    schedule: '0 9 * * 1',    target: 'slack',    status: 'enabled', lastRun: 'Mon 9:00 AM',    nextRun: 'Next Monday',      runCount: 8  },
  { id: 'j3', name: 'Memory Cleanup', prompt: 'Archive memories older than 30 days to long-term store', schedule: '0 0 1 * *',    target: 'local',    status: 'paused',  lastRun: '1st of month',   nextRun: 'Paused',           runCount: 3  },
  { id: 'j4', name: 'Health Check',   prompt: 'Check all agent statuses and alert if any are down',     schedule: '*/15 * * * *', target: 'discord',  status: 'error',   lastRun: '15 min ago',     nextRun: 'N/A',              runCount: 289},
]

const SKILLS: Skill[] = [
  { id: 'sk1',  name: 'web-search',    description: 'Search the web via Brave or SerpAPI',         category: 'Research',      enabled: true,  origin: 'builtin',   usageCount: 234 },
  { id: 'sk2',  name: 'code-runner',   description: 'Execute Python, JS, and shell code in sandbox', category: 'Developer',   enabled: true,  origin: 'builtin',   usageCount: 189 },
  { id: 'sk3',  name: 'file-ops',      description: 'Read, write, and manage local files',          category: 'System',        enabled: true,  origin: 'builtin',   usageCount: 312 },
  { id: 'sk4',  name: 'email-sender',  description: 'Send emails via Gmail or SMTP',               category: 'Communication', enabled: false, origin: 'community', usageCount: 56  },
  { id: 'sk5',  name: 'github-ops',    description: 'Interact with GitHub repos, PRs, issues',     category: 'Developer',     enabled: true,  origin: 'community', usageCount: 78  },
  { id: 'sk6',  name: 'image-gen',     description: 'Generate images via Replicate or Stability',  category: 'Creative',      enabled: false, origin: 'community', usageCount: 23  },
  { id: 'sk7',  name: 'pdf-reader',    description: 'Extract and summarize PDF documents',         category: 'Research',      enabled: true,  origin: 'builtin',   usageCount: 145 },
  { id: 'sk8',  name: 'cal-sync',      description: 'Read and write Google Calendar events',       category: 'Productivity',  enabled: false, origin: 'custom',    usageCount: 12  },
  { id: 'sk9',  name: 'db-query',      description: 'Run SQL queries against connected databases', category: 'Developer',     enabled: true,  origin: 'custom',    usageCount: 67  },
  { id: 'sk10', name: 'twitter-post',  description: 'Post and monitor Twitter/X activity',         category: 'Social',        enabled: false, origin: 'community', usageCount: 34  },
]

const MEMORIES: MemoryEntry[] = [
  { id: 'm1', key: 'user.name',          value: 'User prefers to be called by first name. Responds well to direct answers.', category: 'User Profile', created: '2026-05-01', updated: '2026-05-27', size: '0.2 KB' },
  { id: 'm2', key: 'project.stack',      value: 'Primary tech stack: React, TypeScript, Node.js, Postgres. Prefers pnpm.', category: 'Projects',     created: '2026-05-10', updated: '2026-05-25', size: '0.3 KB' },
  { id: 'm3', key: 'preferences.code',   value: 'No comments unless complex. Functional components. No default exports on utils.', category: 'Preferences', created: '2026-05-12', updated: '2026-05-20', size: '0.4 KB' },
  { id: 'm4', key: 'business.goals',     value: 'Building SaaS in AI tooling space. Target launch Q3 2026.',               category: 'Business',     created: '2026-05-15', updated: '2026-05-27', size: '0.5 KB' },
  { id: 'm5', key: 'context.meetings',   value: 'Standup every weekday at 10AM. Prefers async otherwise.',                  category: 'User Profile', created: '2026-05-18', updated: '2026-05-22', size: '0.2 KB' },
  { id: 'm6', key: 'skills.learned',     value: 'Created custom PDF summarization skill on 2026-05-20.',                   category: 'Skills',       created: '2026-05-20', updated: '2026-05-20', size: '0.3 KB' },
]

const GOALS: Goal[] = [
  { id: 'g1', title: 'Complete MVP dashboard',         progress: 78,  status: 'active',    dueDate: 'Jun 1',  agentId: 'hermes' },
  { id: 'g2', title: 'Integrate 5 messaging platforms',progress: 60,  status: 'active',    dueDate: 'Jun 15', agentId: 'claude' },
  { id: 'g3', title: 'Publish 10 custom skills',       progress: 40,  status: 'active',    dueDate: 'Jul 1',  agentId: 'hermes' },
  { id: 'g4', title: 'Optimize token usage by 30%',    progress: 100, status: 'completed', dueDate: 'May 20', agentId: 'openclaw' },
]

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', role: 'system', content: 'Session started — Hermes Agent connected.', timestamp: '10:00 AM' },
  { id: '2', role: 'agent',  content: "Hello! I'm ready to help. I have access to web search, file operations, code execution, and your full memory vault. What would you like to work on today?", timestamp: '10:00 AM', agentId: 'hermes', tokens: 42 },
  { id: '3', role: 'user',   content: 'Can you summarize the latest AI news and set up a daily cron job for it?', timestamp: '10:01 AM' },
  { id: '4', role: 'agent',  content: "Sure! Let me search for today's AI news first, then wire up the cron job.", timestamp: '10:01 AM', agentId: 'hermes', toolCalls: [{ name: 'web_search', result: 'Found 12 recent articles from TechCrunch, ArsTechnica, VentureBeat' }], tokens: 128 },
]

const INITIAL_KEYS: ApiKey[] = [
  { id: 'k1', provider: 'OpenAI',      envVar: 'OPENAI_API_KEY',      value: 'sk-proj-abc123def456',      category: 'LLM',       status: 'valid',    maskedValue: 'sk-proj-••••••••••••', docsUrl: 'https://platform.openai.com/api-keys',         baseUrl: 'https://api.openai.com',            addedAt: '2026-05-01' },
  { id: 'k2', provider: 'Anthropic',   envVar: 'ANTHROPIC_API_KEY',   value: 'sk-ant-abc123',             category: 'LLM',       status: 'valid',    maskedValue: 'sk-ant-••••••••••••', docsUrl: 'https://console.anthropic.com/',               baseUrl: 'https://api.anthropic.com',         addedAt: '2026-05-02' },
  { id: 'k3', provider: 'DeepSeek',    envVar: 'DEEPSEEK_API_KEY',    value: '',                          category: 'LLM',       status: 'untested', maskedValue: '',                    docsUrl: 'https://platform.deepseek.com/',               baseUrl: 'https://api.deepseek.com',          addedAt: '2026-05-10' },
  { id: 'k4', provider: 'Groq',        envVar: 'GROQ_API_KEY',        value: 'gsk_xxxxxx',                category: 'LLM',       status: 'invalid',  maskedValue: 'gsk_••••••••••••',    docsUrl: 'https://console.groq.com/keys',                baseUrl: 'https://api.groq.com',              addedAt: '2026-05-12' },
  { id: 'k5', provider: 'OpenRouter',  envVar: 'OPENROUTER_API_KEY',  value: '',                          category: 'LLM',       status: 'untested', maskedValue: '',                    docsUrl: 'https://openrouter.ai/keys',                   baseUrl: 'https://openrouter.ai',             addedAt: '2026-05-14' },
  { id: 'k6', provider: 'Brave Search',envVar: 'BRAVE_API_KEY',       value: 'BSA-xyz789',                category: 'Tools',     status: 'valid',    maskedValue: 'BSA-••••••••••••',    docsUrl: 'https://api.search.brave.com/app/keys',        addedAt: '2026-05-03' },
  { id: 'k7', provider: 'Telegram',    envVar: 'TELEGRAM_BOT_TOKEN',  value: '',                          category: 'Messaging', status: 'untested', maskedValue: '',                    docsUrl: 'https://core.telegram.org/bots#botfather',     addedAt: '2026-05-15' },
  { id: 'k8', provider: 'Discord',     envVar: 'DISCORD_BOT_TOKEN',   value: 'MTI.xxxxxx',               category: 'Messaging', status: 'invalid',  maskedValue: 'MTI.••••••••••••',    docsUrl: 'https://discord.com/developers/applications', addedAt: '2026-05-15' },
]

/* ─── store ──────────────────────────────────────────────── */
interface AppState {
  activeTab: TabId
  agents: Agent[]
  messages: ChatMessage[]
  sessions: Session[]
  cronJobs: CronJob[]
  skills: Skill[]
  memories: MemoryEntry[]
  goals: Goal[]
  apiKeys: ApiKey[]
  chatInput: string
  isStreaming: boolean
  selectedAgent: string

  setActiveTab: (t: TabId) => void
  setSelectedAgent: (id: string) => void
  addMessage: (m: ChatMessage) => void
  setChatInput: (v: string) => void
  setIsStreaming: (v: boolean) => void
  toggleSkill: (id: string) => void
  toggleJob: (id: string) => void
  deleteMemory: (id: string) => void
  updateAgentStatus: (id: string, s: AgentStatus) => void

  /* API key actions */
  addApiKey: (key: Omit<ApiKey, 'id' | 'addedAt' | 'status' | 'maskedValue'>) => void
  updateApiKeyValue: (id: string, value: string) => void
  deleteApiKey: (id: string) => void
  setKeyStatus: (id: string, status: KeyStatus) => void
}

let keySeq = 100
let msgSeq = 100

export const useStore = create<AppState>((set) => ({
  activeTab: 'dashboard',
  agents: AGENTS,
  messages: INITIAL_MESSAGES,
  sessions: SESSIONS,
  cronJobs: JOBS,
  skills: SKILLS,
  memories: MEMORIES,
  goals: GOALS,
  apiKeys: INITIAL_KEYS,
  chatInput: '',
  isStreaming: false,
  selectedAgent: 'hermes',

  setActiveTab: (t) => set({ activeTab: t }),
  setSelectedAgent: (id) => set({ selectedAgent: id }),
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  setChatInput: (v) => set({ chatInput: v }),
  setIsStreaming: (v) => set({ isStreaming: v }),
  toggleSkill: (id) => set((s) => ({ skills: s.skills.map(sk => sk.id === id ? { ...sk, enabled: !sk.enabled } : sk) })),
  toggleJob: (id) => set((s) => ({ cronJobs: s.cronJobs.map(j => j.id === id ? { ...j, status: j.status === 'enabled' ? 'paused' : 'enabled' } as CronJob : j) })),
  deleteMemory: (id) => set((s) => ({ memories: s.memories.filter(m => m.id !== id) })),
  updateAgentStatus: (id, status) => set((s) => ({ agents: s.agents.map(a => a.id === id ? { ...a, status } : a) })),

  addApiKey: (key) => set((s) => ({
    apiKeys: [...s.apiKeys, {
      ...key,
      id: `k${++keySeq}`,
      addedAt: new Date().toISOString().split('T')[0],
      status: 'untested' as KeyStatus,
      maskedValue: key.value ? key.value.slice(0, 6) + '••••••••••••' : '',
    }]
  })),

  updateApiKeyValue: (id, value) => set((s) => ({
    apiKeys: s.apiKeys.map(k => k.id === id
      ? { ...k, value, status: 'untested', maskedValue: value ? value.slice(0, 6) + '••••••••••••' : '' }
      : k
    )
  })),

  deleteApiKey: (id) => set((s) => ({ apiKeys: s.apiKeys.filter(k => k.id !== id) })),

  setKeyStatus: (id, status) => set((s) => ({
    apiKeys: s.apiKeys.map(k => k.id === id ? { ...k, status } : k)
  })),
}))

export { msgSeq }
export const nextMsgId = () => String(++msgSeq)
