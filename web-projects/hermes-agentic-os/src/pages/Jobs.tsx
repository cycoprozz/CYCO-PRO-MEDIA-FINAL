import { useStore } from '@/store/useStore'
import { Clock, Plus, Play, Pause, Trash2, AlertCircle, RefreshCw, X } from 'lucide-react'
import { useState } from 'react'

export function Jobs() {
  const { cronJobs, toggleJob } = useStore()
  const [showNew, setShowNew] = useState(false)
  const enabled = cronJobs.filter(j => j.status === 'enabled').length
  const errors  = cronJobs.filter(j => j.status === 'error').length

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#07080d' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #111827', flexShrink: 0 }}>
        <Clock size={15} color="#818cf8" />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Scheduled Jobs</span>
        <span className="badge badge-green">{enabled} running</span>
        {errors > 0 && <span className="badge badge-red">{errors} errors</span>}
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-primary" onClick={() => setShowNew(s => !s)}>
            {showNew ? <><X size={13} /> Cancel</> : <><Plus size={13} /> New Job</>}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* New job form */}
        {showNew && (
          <div className="card anim-fade-up" style={{ padding: 18, borderColor: 'rgba(99,102,241,.25)', background: 'rgba(99,102,241,.04)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 14 }}>Create New Job</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#3d506b', marginBottom: 6 }}>Job Name</div>
                <input type="text" placeholder="e.g. Morning Briefing" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#3d506b', marginBottom: 6 }}>Delivery Target</div>
                <select>
                  {['telegram','slack','discord','local','email'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <div style={{ fontSize: 12, color: '#3d506b', marginBottom: 6 }}>Prompt</div>
                <textarea placeholder="What should the agent do when this job runs?" rows={2} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#3d506b', marginBottom: 6 }}>Cron Schedule</div>
                <input type="text" placeholder="0 8 * * * — 8am daily" className="mono" />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>Create Job</button>
                <button className="btn btn-ghost" onClick={() => setShowNew(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs list */}
        {cronJobs.map(job => {
          const sc = { enabled: '#22c55e', paused: '#eab308', error: '#ef4444' }[job.status]
          return (
            <div key={job.id} className="card anim-slide-r" style={{ padding: 16, borderColor: `${sc}28` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* Icon */}
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#0d111a', border: `1px solid ${sc}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {job.status === 'error' ? <AlertCircle size={17} color="#ef4444" />
                   : job.status === 'paused' ? <Clock size={17} color="#eab308" />
                   : <RefreshCw size={17} color="#22c55e" className="anim-spin-slow" />}
                </div>

                {/* Body */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{job.name}</span>
                    <span className={`badge ${job.status === 'enabled' ? 'badge-green' : job.status === 'error' ? 'badge-red' : 'badge-yellow'}`}>{job.status}</span>
                    <span className="badge badge-gray">{job.target}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: '#4a5f7a', lineHeight: 1.5, marginBottom: 10 }}>{job.prompt}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                    {[
                      { l: 'Schedule', v: job.schedule, mono: true },
                      { l: 'Last Run',  v: job.lastRun,   mono: false },
                      { l: 'Next Run',  v: job.nextRun,   mono: false },
                      { l: 'Runs',      v: `${job.runCount}×`, mono: false },
                    ].map(r => (
                      <div key={r.l}>
                        <div style={{ fontSize: 10, color: '#2d3f57', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>{r.l}</div>
                        <div className={r.mono ? 'mono' : ''} style={{ fontSize: 12, color: r.mono ? '#818cf8' : '#64748b' }}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <button className="icon-btn" onClick={() => toggleJob(job.id)} title={job.status === 'enabled' ? 'Pause' : 'Enable'}>
                    {job.status === 'enabled' ? <Pause size={13} /> : <Play size={13} />}
                  </button>
                  <button className="icon-btn" style={{ color: '#7f1d1d' }}><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
