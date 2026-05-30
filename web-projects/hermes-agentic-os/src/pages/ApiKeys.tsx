import { useStore, type ApiKey, type KeyStatus } from '@/store/useStore'
import {
  Key, Plus, Trash2, Eye, EyeOff, Copy, ExternalLink,
  CheckCircle2, XCircle, AlertCircle, Loader2, X
} from 'lucide-react'
import { useState } from 'react'

/* ── known providers catalogue ─────────────────────────── */
interface ProviderTemplate {
  name: string; envVar: string; category: string; placeholder: string; docsUrl: string; baseUrl?: string
}
const PROVIDER_TEMPLATES: ProviderTemplate[] = [
  { name: 'OpenAI',          envVar: 'OPENAI_API_KEY',          category: 'LLM',       placeholder: 'sk-proj-…',        docsUrl: 'https://platform.openai.com/api-keys',          baseUrl: 'https://api.openai.com' },
  { name: 'Anthropic',       envVar: 'ANTHROPIC_API_KEY',       category: 'LLM',       placeholder: 'sk-ant-…',         docsUrl: 'https://console.anthropic.com/',                baseUrl: 'https://api.anthropic.com' },
  { name: 'DeepSeek',        envVar: 'DEEPSEEK_API_KEY',        category: 'LLM',       placeholder: 'sk-…',             docsUrl: 'https://platform.deepseek.com/',                baseUrl: 'https://api.deepseek.com' },
  { name: 'DeepSeek v4',     envVar: 'DEEPSEEK_V4_API_KEY',     category: 'LLM',       placeholder: 'sk-…',             docsUrl: 'https://platform.deepseek.com/',                baseUrl: 'https://api.deepseek.com' },
  { name: 'Groq',            envVar: 'GROQ_API_KEY',            category: 'LLM',       placeholder: 'gsk_…',            docsUrl: 'https://console.groq.com/keys',                 baseUrl: 'https://api.groq.com' },
  { name: 'OpenRouter',      envVar: 'OPENROUTER_API_KEY',      category: 'LLM',       placeholder: 'sk-or-…',          docsUrl: 'https://openrouter.ai/keys',                    baseUrl: 'https://openrouter.ai' },
  { name: 'Google Gemini',   envVar: 'GEMINI_API_KEY',          category: 'LLM',       placeholder: 'AIza…',            docsUrl: 'https://aistudio.google.com/app/apikey',        baseUrl: 'https://generativelanguage.googleapis.com' },
  { name: 'Mistral',         envVar: 'MISTRAL_API_KEY',         category: 'LLM',       placeholder: '…',                docsUrl: 'https://console.mistral.ai/api-keys/',          baseUrl: 'https://api.mistral.ai' },
  { name: 'Cohere',          envVar: 'COHERE_API_KEY',          category: 'LLM',       placeholder: '…',                docsUrl: 'https://dashboard.cohere.com/api-keys',         baseUrl: 'https://api.cohere.ai' },
  { name: 'Together AI',     envVar: 'TOGETHER_API_KEY',        category: 'LLM',       placeholder: '…',                docsUrl: 'https://api.together.xyz/',                     baseUrl: 'https://api.together.xyz' },
  { name: 'Nous Portal',     envVar: 'NOUS_API_KEY',            category: 'LLM',       placeholder: 'sk-nous-…',        docsUrl: 'https://portal.nousresearch.com',               baseUrl: 'https://inferencing.nousresearch.com' },
  { name: 'Brave Search',    envVar: 'BRAVE_API_KEY',           category: 'Tools',     placeholder: 'BSA-…',            docsUrl: 'https://api.search.brave.com/app/keys' },
  { name: 'SerpAPI',         envVar: 'SERPAPI_KEY',             category: 'Tools',     placeholder: '…',                docsUrl: 'https://serpapi.com/manage-api-key' },
  { name: 'GitHub Token',    envVar: 'GITHUB_TOKEN',            category: 'Tools',     placeholder: 'ghp_…',            docsUrl: 'https://github.com/settings/tokens' },
  { name: 'Replicate',       envVar: 'REPLICATE_API_TOKEN',     category: 'Tools',     placeholder: 'r8_…',             docsUrl: 'https://replicate.com/account/api-tokens' },
  { name: 'Telegram',        envVar: 'TELEGRAM_BOT_TOKEN',      category: 'Messaging', placeholder: '1234:ABC…',        docsUrl: 'https://core.telegram.org/bots#botfather' },
  { name: 'Discord',         envVar: 'DISCORD_BOT_TOKEN',       category: 'Messaging', placeholder: 'MTI…',             docsUrl: 'https://discord.com/developers/applications' },
  { name: 'Slack',           envVar: 'SLACK_BOT_TOKEN',         category: 'Messaging', placeholder: 'xoxb-…',           docsUrl: 'https://api.slack.com/apps' },
  { name: 'Custom',          envVar: '',                        category: 'Custom',    placeholder: '',                 docsUrl: '' },
]

const CATEGORIES = ['All', 'LLM', 'Tools', 'Messaging', 'Custom']
const CATEGORY_COLOR: Record<string, string> = {
  LLM: 'badge-indigo', Tools: 'badge-blue', Messaging: 'badge-green', Custom: 'badge-gray',
}

const statusIcon = (s: KeyStatus) => {
  if (s === 'valid')    return <CheckCircle2 size={14} color="#4ade80" />
  if (s === 'invalid')  return <XCircle      size={14} color="#f87171" />
  if (s === 'testing')  return <Loader2      size={14} color="#818cf8" className="anim-spin-slow" />
  return <AlertCircle size={14} color="#4a5f7a" />
}

const statusLabel = (s: KeyStatus) => ({
  valid: { text: 'Valid', cls: 'badge-green' },
  invalid: { text: 'Invalid', cls: 'badge-red' },
  testing: { text: 'Testing…', cls: 'badge-indigo' },
  untested: { text: 'Untested', cls: 'badge-gray' },
}[s])

/* ── AddKeyModal ──────────────────────────────────────────── */
function AddKeyModal({ onClose }: { onClose: () => void }) {
  const { addApiKey } = useStore()
  const [step, setStep] = useState<'pick' | 'fill'>('pick')
  const [selected, setSelected] = useState<ProviderTemplate | null>(null)
  const [customName, setCustomName] = useState('')
  const [customEnv, setCustomEnv] = useState('')
  const [keyValue, setKeyValue] = useState('')
  const [show, setShow] = useState(false)
  const [catFilter, setCatFilter] = useState('All')

  const filtered = PROVIDER_TEMPLATES.filter(p => catFilter === 'All' || p.category === catFilter)

  const pickProvider = (p: ProviderTemplate) => {
    setSelected(p)
    setStep('fill')
  }

  const submit = () => {
    if (!selected) return
    const name = selected.name === 'Custom' ? customName : selected.name
    const env  = selected.name === 'Custom' ? customEnv  : selected.envVar
    if (!name || !env) return
    addApiKey({
      provider: name,
      envVar: env,
      value: keyValue,
      category: selected.category,
      docsUrl: selected.docsUrl,
      baseUrl: selected.baseUrl,
    })
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="card anim-fade-up" style={{ width: 560, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #1a2236' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {step === 'fill' && selected && (
              <button className="icon-btn" style={{ width: 24, height: 24 }} onClick={() => setStep('pick')}>
                <span style={{ fontSize: 16, color: '#4a5f7a' }}>‹</span>
              </button>
            )}
            <Key size={15} color="#818cf8" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>
              {step === 'pick' ? 'Add API Key' : `Add ${selected?.name === 'Custom' ? 'Custom' : selected?.name} Key`}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={14} /></button>
        </div>

        {/* Step 1 — pick provider */}
        {step === 'pick' && (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 20px', borderBottom: '1px solid #111827' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['All', 'LLM', 'Tools', 'Messaging', 'Custom'].map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                    background: catFilter === c ? '#6366f1' : '#0d111a',
                    color: catFilter === c ? '#fff' : '#4a5f7a',
                    border: `1px solid ${catFilter === c ? '#6366f1' : '#1a2236'}`,
                  }}>{c}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {filtered.map(p => (
                <button key={p.name} onClick={() => pickProvider(p)} className="card card-hover" style={{
                  padding: '12px 14px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: '#111827',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Key size={13} color="#6366f1" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{p.name}</div>
                    <div style={{ fontSize: 10.5, color: '#3d506b', marginTop: 1 }}>{p.envVar || 'Custom var'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — fill key */}
        {step === 'fill' && selected && (
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {selected.name === 'Custom' && (
              <>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Provider Name</div>
                  <input type="text" placeholder="e.g. My Custom LLM" value={customName} onChange={e => setCustomName(e.target.value)} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Environment Variable</div>
                  <input type="text" placeholder="e.g. MY_LLM_API_KEY" value={customEnv} onChange={e => setCustomEnv(e.target.value.toUpperCase())} className="mono" />
                </div>
              </>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#64748b' }}>API Key</span>
                {selected.docsUrl && (
                  <a href={selected.docsUrl} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#6366f1', display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                    Get key <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'}
                  placeholder={selected.placeholder || 'Paste your API key here…'}
                  value={keyValue}
                  onChange={e => setKeyValue(e.target.value)}
                  className="mono"
                  style={{ paddingRight: 38 }}
                />
                <button className="icon-btn" style={{ position: 'absolute', right: 4, top: 3, width: 26, height: 26 }} onClick={() => setShow(s => !s)}>
                  {show ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={submit} disabled={!keyValue && selected.name !== 'Custom'}>
                Add Key
              </button>
              <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── KeyRow ───────────────────────────────────────────────── */
function KeyRow({ k }: { k: ApiKey }) {
  const { updateApiKeyValue, deleteApiKey, setKeyStatus } = useStore()
  const [show, setShow] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(k.value)
  const [copied, setCopied] = useState(false)

  const validateKey = async () => {
    if (!k.value) return
    setKeyStatus(k.id, 'testing')
    // Simulate async validation (real impl would call the provider's models endpoint)
    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800))
    // Heuristic: key present and looks plausible → valid, else invalid
    const looks_valid = k.value.length > 12 && !k.value.includes('xxxxxx')
    setKeyStatus(k.id, looks_valid ? 'valid' : 'invalid')
  }

  const copyKey = () => {
    navigator.clipboard.writeText(k.value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const saveEdit = () => {
    updateApiKeyValue(k.id, draft)
    setEditing(false)
  }

  const sl = statusLabel(k.status)

  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Key size={12} color="#6366f1" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{k.provider}</div>
            <div style={{ fontSize: 10.5, color: '#3d506b' }} className="mono">{k.envVar}</div>
          </div>
        </div>
      </td>
      <td><span className={`badge ${CATEGORY_COLOR[k.category] || 'badge-gray'}`}>{k.category}</span></td>
      <td>
        {editing ? (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="text" value={draft} onChange={e => setDraft(e.target.value)}
              className="mono" style={{ fontSize: 12, padding: '5px 8px' }}
              autoFocus onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditing(false) }}
            />
            <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: 12, flexShrink: 0 }} onClick={saveEdit}>Save</button>
            <button className="icon-btn" onClick={() => { setEditing(false); setDraft(k.value) }}><X size={12} /></button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="mono" style={{ fontSize: 12, color: '#4a5f7a' }}>
              {k.value ? (show ? k.value : k.maskedValue || '••••••••••••••••') : <span style={{ color: '#2d3f57', fontStyle: 'italic' }}>Not set</span>}
            </span>
            {k.value && (
              <button className="icon-btn" style={{ width: 22, height: 22 }} onClick={() => setShow(s => !s)}>
                {show ? <EyeOff size={11} /> : <Eye size={11} />}
              </button>
            )}
          </div>
        )}
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {statusIcon(k.status)}
          <span className={`badge ${sl.cls}`}>{sl.text}</span>
        </div>
      </td>
      <td style={{ color: '#2d3f57', fontSize: 12 }}>{k.addedAt}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Validate */}
          <button
            className="btn btn-ghost" style={{ padding: '4px 9px', fontSize: 11 }}
            onClick={validateKey}
            disabled={!k.value || k.status === 'testing'}
            title="Test this key against the provider"
          >
            {k.status === 'testing' ? 'Testing…' : 'Test'}
          </button>
          {/* Edit */}
          <button className="icon-btn" onClick={() => setEditing(true)} title="Edit key value"><Eye size={12} /></button>
          {/* Copy */}
          {k.value && (
            <button className="icon-btn" onClick={copyKey} title="Copy to clipboard">
              {copied ? <CheckCircle2 size={12} color="#4ade80" /> : <Copy size={12} />}
            </button>
          )}
          {/* Docs */}
          {k.docsUrl && (
            <a href={k.docsUrl} target="_blank" rel="noreferrer" className="icon-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
              <ExternalLink size={12} />
            </a>
          )}
          {/* Delete */}
          <button className="icon-btn" style={{ color: '#7f1d1d' }} onClick={() => deleteApiKey(k.id)} title="Remove key">
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  )
}

/* ── Main page ───────────────────────────────────────────── */
export function ApiKeys() {
  const { apiKeys } = useStore()
  const [showAdd, setShowAdd] = useState(false)
  const [catFilter, setCatFilter] = useState('All')

  const filtered = apiKeys.filter(k => catFilter === 'All' || k.category === catFilter)
  const valid   = apiKeys.filter(k => k.status === 'valid').length
  const invalid = apiKeys.filter(k => k.status === 'invalid').length
  const unset   = apiKeys.filter(k => !k.value).length

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#07080d' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid #111827', flexShrink: 0 }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="badge badge-green">{valid} valid</span>
          {invalid > 0 && <span className="badge badge-red">{invalid} invalid</span>}
          {unset  > 0 && <span className="badge badge-gray">{unset} not set</span>}
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{
              padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500, border: 'none',
              background: catFilter === c ? '#6366f1' : 'transparent',
              color: catFilter === c ? '#fff' : '#3d506b',
            }}>{c}</button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            <Plus size={13} /> Add Key
          </button>
        </div>
      </div>

      {/* Security notice */}
      <div style={{ margin: '14px 20px 0', padding: '10px 14px', borderRadius: 8, background: 'rgba(99,102,241,.06)', border: '1px solid rgba(99,102,241,.15)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <Key size={13} color="#818cf8" />
        <span style={{ fontSize: 12.5, color: '#4a5f7a' }}>
          Keys are stored in <span className="mono" style={{ color: '#818cf8' }}>~/.hermes/.env</span> on your machine and never leave your device.
          Use the <strong style={{ color: '#94a3b8' }}>Test</strong> button to validate a key against its provider in real time.
        </span>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Category</th>
                <th>Key</th>
                <th>Status</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(k => <KeyRow key={k.id} k={k} />)}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#2d3f57' }}>
                  No keys in this category. <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 10px', marginLeft: 8 }} onClick={() => setShowAdd(true)}>Add one</button>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddKeyModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
