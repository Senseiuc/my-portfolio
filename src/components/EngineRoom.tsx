import React, { useState } from 'react';
import { Network, Database, RefreshCw, Cpu, CheckCircle } from 'lucide-react';

interface Step {
  title: string;
  desc: string;
  status: 'active' | 'success' | 'pending';
}

export default function EngineRoom() {
  const [activeTab, setActiveTab] = useState<'payout' | 'sync' | 'tripease'>('payout');

  const payoutSteps: Step[] = [
    { title: 'Trigger Daemon', desc: 'Background cron starts execution on order delivery confirmation.', status: 'success' },
    { title: 'Batch Query (Cursor)', desc: 'Fetch escrow records in cursor-offset pages of 500 records rather than full scans.', status: 'active' },
    { title: 'Microsecond Delay', desc: 'Introduces a programmatic delay (usleep) between batches to prevent DB CPU spikes.', status: 'pending' },
    { title: 'KYC Token Refresh', desc: 'Hits Dojah API; triggers single-retry token bypass automatically if token has expired.', status: 'pending' },
    { title: 'Batch Release', desc: 'Safely commits wallet settlements twice as fast without locking database tables.', status: 'pending' }
  ];

  const syncSteps: Step[] = [
    { title: 'File Watcher', desc: 'Scans workspace directories and hashes files to identify modifications.', status: 'success' },
    { title: 'Isolate Changed Files', desc: 'Extracts changed files only, excluding local files in .gitignore and config configurations.', status: 'active' },
    { title: 'Staging Env Patch', desc: 'Safely reserves local environmental settings and credentials.', status: 'pending' },
    { title: 'Deploy Sync Run', desc: 'Transfers only the isolated file list, cutting deployment transmission times by 50%.', status: 'pending' }
  ];

  const tripeaseSteps: Step[] = [
    { title: 'API Gateway Ingress', desc: 'Visitor/driver requests arrive at the centralized gateway (Docker runtime).', status: 'success' },
    { title: 'Auth Service Check', desc: 'Validates JWT session credentials against the centralized auth microservice.', status: 'active' },
    { title: 'Router Delegation', desc: 'Forwards verified requests to trip-ease-companies-service or transport-service.', status: 'pending' },
    { title: 'Multi-Tenant Isolation', desc: 'Separates database pool tenants via tenancy middleware headers.', status: 'pending' }
  ];

  const getSteps = () => {
    switch (activeTab) {
      case 'payout': return payoutSteps;
      case 'sync': return syncSteps;
      case 'tripease': return tripeaseSteps;
    }
  };

  return (
    <div className="bg-[#0f172a]/50 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
        <Network className="w-4 h-4 text-cyan-400" />
        <span className="font-mono text-xs font-bold text-slate-100 uppercase tracking-wider">
          The Engine Room — Interactive Architecture Playground
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-800/40 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('payout')}
          className={`px-3 py-1.5 rounded font-mono text-xs cursor-pointer transition-all ${activeTab === 'payout' ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-bold' : 'text-slate-500 border border-transparent hover:text-slate-300'}`}
        >
          Konga Escrow Payouts
        </button>
        <button
          onClick={() => setActiveTab('sync')}
          className={`px-3 py-1.5 rounded font-mono text-xs cursor-pointer transition-all ${activeTab === 'sync' ? 'bg-indigo-500/10 border border-indigo-500/40 text-indigo-400 font-bold' : 'text-slate-500 border border-transparent hover:text-slate-300'}`}
        >
          Lextorah Smart Sync
        </button>
        <button
          onClick={() => setActiveTab('tripease')}
          className={`px-3 py-1.5 rounded font-mono text-xs cursor-pointer transition-all ${activeTab === 'tripease' ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold' : 'text-slate-500 border border-transparent hover:text-slate-300'}`}
        >
          TripEase Microservices
        </button>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Step Flow List */}
        <div className="md:col-span-2 space-y-3 font-mono text-xs">
          {getSteps().map((step, idx) => (
            <div 
              key={idx} 
              className={`p-3 border rounded-lg transition-all ${step.status === 'active' ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : step.status === 'success' ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-950/20 border-slate-900 text-slate-600'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">{idx + 1}. {step.title}</span>
                {step.status === 'success' && <CheckCircle className="w-3 h-3 text-slate-500" />}
                {step.status === 'active' && <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />}
              </div>
              <p className="text-[10px] leading-normal">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Architectural Diagram Block */}
        <div className="md:col-span-3 bg-slate-950/60 border border-slate-850 rounded-lg p-4 flex flex-col justify-between font-mono text-[10px] min-h-[220px]">
          <div className="text-slate-500 uppercase tracking-wider text-[9px] mb-4">
            Flow Simulation Diagram
          </div>

          <div className="flex flex-col items-center justify-center flex-1 py-4">
            {activeTab === 'payout' && (
              <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded">
                  <Database className="w-3 h-3 text-indigo-400" />
                  <span>Konga MySQL DB</span>
                </div>
                <div className="w-0.5 h-6 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-cyan-500/50 rounded shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                  <Cpu className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Payout Daemon (offset loop)</span>
                </div>
                <div className="w-0.5 h-6 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Dojah KYC & Escrow release</span>
                </div>
              </div>
            )}

            {activeTab === 'sync' && (
              <div className="flex items-center justify-between w-full max-w-xs gap-4 relative">
                <div className="flex flex-col items-center gap-1">
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Local Workspace</div>
                  <span className="text-[8px] text-slate-500">1,240 files</span>
                </div>

                <div className="flex-1 h-0.5 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute px-1 bg-slate-950 border border-slate-800 text-[8px] rounded text-indigo-400">
                    Smart-sync filter
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="px-2 py-1 bg-slate-900 border border-indigo-500/50 rounded">Staging Server</div>
                  <span className="text-[8px] text-indigo-400">12 updated files</span>
                </div>
              </div>
            )}

            {activeTab === 'tripease' && (
              <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <div className="px-2 py-1 bg-slate-900 border border-slate-850 rounded">
                  Driver Mobile Client
                </div>
                <div className="w-0.5 h-5 bg-slate-850" />
                <div className="px-2 py-1.5 bg-slate-900 border border-emerald-500/40 rounded shadow-md">
                  VMS Docker Gateway Router
                </div>
                <div className="flex justify-between w-full max-w-xs mt-2 relative">
                  <div className="w-0.5 h-6 bg-slate-850 absolute left-4" />
                  <div className="w-0.5 h-6 bg-slate-850 absolute right-4" />
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded mt-5">
                    Auth service
                  </div>
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded mt-5">
                    Transport service
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[9px] text-slate-500 leading-normal border-t border-slate-900 pt-2">
            {activeTab === 'payout' && (
              <span className="text-cyan-400/80">Result: Prevented DB lock failures. Escrow releases processed 2x faster without CPU spikes.</span>
            )}
            {activeTab === 'sync' && (
              <span className="text-indigo-400/80">Result: Slashing staging deployment transfer cycles by 50% while preserving environment settings.</span>
            )}
            {activeTab === 'tripease' && (
              <span className="text-emerald-400/80">Result: Secure, containerized microservices routing with isolated multi-tenant database pools.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
