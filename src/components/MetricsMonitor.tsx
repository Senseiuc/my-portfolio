import React, { useEffect, useState } from 'react';
import { Activity, Server, Cpu, HardDrive, RefreshCcw } from 'lucide-react';

interface SystemMetrics {
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
  database: {
    messagesStored: number;
    terminalLogsStored: number;
    syncStatus: {
      konga_sync_count: string;
      lextorah_sync_count: string;
      sabre_seed_count: string;
      last_deployment_time: string;
    };
  };
  nodeVersion: string;
  platform: string;
}

export default function MetricsMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      if (!response.ok) throw new Error('API fetch failed');
      const data = await response.json();
      setMetrics(data);
      setError(false);
    } catch (err) {
      console.error('Failed to load live metrics, using local sandbox metrics:', err);
      // Fallback local metrics for local presentation
      setMetrics({
        uptime: Math.round(performance.now() / 1000) + 7200,
        memory: {
          rss: 42,
          heapTotal: 28,
          heapUsed: 16 + Math.round(Math.sin(Date.now() / 5000) * 2),
        },
        database: {
          messagesStored: 3,
          terminalLogsStored: 18,
          syncStatus: {
            konga_sync_count: '986',
            lextorah_sync_count: '412',
            sabre_seed_count: '1420',
            last_deployment_time: new Date(Date.now() - 3600000).toISOString(),
          }
        },
        nodeVersion: 'v22.12.0',
        platform: 'linux-alpine'
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900/40 border border-slate-800 rounded-xl h-60 text-slate-500 font-mono text-sm animate-pulse">
        <RefreshCcw className="w-5 h-5 animate-spin mb-2 text-cyan-400" />
        <span>Initializing VPS Metrics Stream...</span>
      </div>
    );
  }

  const memoryPercent = metrics 
    ? Math.round((metrics.memory.heapUsed / metrics.memory.heapTotal) * 100) 
    : 0;

  return (
    <div className="bg-[#0f172a]/50 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md font-mono text-xs leading-relaxed text-slate-300">
      {/* Title */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold text-slate-100 uppercase tracking-wider">Live DevOps Metrics Monitor</span>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${error ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
          {error ? 'SANDBOX ACTIVE' : 'LIVE VPS STREAM'}
        </span>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-2 gap-4">
        {/* Memory widget */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-slate-400 mb-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Process Heap</span>
          </div>
          <div className="text-sm font-semibold text-slate-100 mb-1">
            {metrics?.memory.heapUsed}MB / {metrics?.memory.heapTotal}MB
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-400 h-full transition-all duration-1000" 
              style={{ width: `${memoryPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1 text-right">
            Usage: {memoryPercent}%
          </div>
        </div>

        {/* Database state widget */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-slate-400 mb-2">
            <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
            <span>SQLite Ledgers</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div>
              <div className="text-[10px] text-slate-500">Contact Logs</div>
              <div className="font-semibold text-slate-100">{metrics?.database.messagesStored}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">Command Logs</div>
              <div className="font-semibold text-slate-100">{metrics?.database.terminalLogsStored}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Matrix */}
      <div className="mt-4 bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
        <div className="text-slate-400 mb-2 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800/40 pb-1">
          Catalog Sync Daemons Status
        </div>
        <div className="grid grid-cols-3 gap-2 text-slate-300 text-[10px]">
          <div>
            <div className="text-slate-500">Konga queue</div>
            <div className="font-semibold text-cyan-400">{metrics?.database.syncStatus.konga_sync_count} runs</div>
          </div>
          <div>
            <div className="text-slate-500">Lextorah syncd</div>
            <div className="font-semibold text-indigo-400">{metrics?.database.syncStatus.lextorah_sync_count} files</div>
          </div>
          <div>
            <div className="text-slate-500">Sabre matrix</div>
            <div className="font-semibold text-emerald-400">{metrics?.database.syncStatus.sabre_seed_count} seeds</div>
          </div>
        </div>
      </div>

      {/* System info */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-[10px] text-slate-500 gap-2 border-t border-slate-800 pt-3">
        <div className="flex items-center gap-1">
          <Server className="w-3 h-3 text-slate-600" />
          <span>Host: {metrics?.platform} ({metrics?.nodeVersion})</span>
        </div>
        <div>
          <span>Uptime: {metrics ? formatUptime(metrics.uptime) : '0s'}</span>
        </div>
      </div>
    </div>
  );
}
