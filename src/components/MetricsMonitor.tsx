import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Database, RefreshCcw, Server } from 'lucide-react';

interface SystemMetrics {
  uptime: number;
  memory: { rss: number; heapTotal: number; heapUsed: number };
  database: { messagesStored: number; terminalLogsStored: number };
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
      if (!response.ok) throw new Error('Runtime metrics are unavailable');
      setMetrics(await response.json());
      setError(false);
    } catch (requestError) {
      console.error('Failed to load portfolio runtime metrics:', requestError);
      setMetrics(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = window.setInterval(fetchMetrics, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex h-60 flex-col items-center justify-center border border-slate-800 bg-slate-900/40 p-8 font-mono text-sm text-slate-500">
        <RefreshCcw className="mb-2 h-5 w-5 animate-spin text-orange-400" />
        <span>Reading portfolio runtime...</span>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="flex h-60 flex-col items-start justify-center border border-slate-800 bg-[#141110]/50 p-6">
        <Activity className="h-5 w-5 text-slate-500" />
        <h3 className="mt-3 text-sm font-bold text-slate-200">Runtime metrics unavailable</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">The portfolio API did not return a current measurement. No fallback values are shown.</p>
        <button type="button" onClick={fetchMetrics} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300">
          <RefreshCcw className="h-3.5 w-3.5" /> Retry
        </button>
      </div>
    );
  }

  const memoryPercent = metrics.memory.heapTotal > 0
    ? Math.round((metrics.memory.heapUsed / metrics.memory.heapTotal) * 100)
    : 0;

  return (
    <div className="border border-slate-800 bg-[#141110]/50 p-5 font-mono text-xs leading-relaxed text-slate-300">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-orange-400" />
          <span className="font-bold uppercase text-slate-100">Portfolio runtime</span>
        </div>
        <span className="border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">API measured</span>
      </div>

      <p className="mb-4 text-[10px] leading-relaxed text-slate-500">
        Current health of this portfolio application, not the production systems described elsewhere on the site.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="border border-slate-800/60 bg-slate-950/40 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-slate-400">
            <Cpu className="h-3.5 w-3.5 text-orange-400" /> Process heap
          </div>
          <div className="mb-2 text-sm font-semibold text-slate-100">{metrics.memory.heapUsed}MB / {metrics.memory.heapTotal}MB</div>
          <div className="h-1.5 w-full overflow-hidden bg-slate-800">
            <div className="h-full bg-orange-400 transition-[width] duration-500" style={{ width: `${Math.min(memoryPercent, 100)}%` }} />
          </div>
          <div className="mt-1 text-right text-[10px] text-slate-500">{memoryPercent}% used</div>
        </div>

        <div className="border border-slate-800/60 bg-slate-950/40 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-slate-400">
            <Database className="h-3.5 w-3.5 text-slate-300" /> Portfolio storage
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><div className="text-[10px] text-slate-500">Contact entries</div><div className="font-semibold text-slate-100">{metrics.database.messagesStored}</div></div>
            <div><div className="text-[10px] text-slate-500">Explorer queries</div><div className="font-semibold text-slate-100">{metrics.database.terminalLogsStored}</div></div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-800 pt-3 text-[10px] text-slate-500 sm:grid-cols-2">
        <div className="flex items-center gap-1.5"><Server className="h-3 w-3" /> Runtime: {metrics.platform} / {metrics.nodeVersion}</div>
        <div className="sm:text-right">Process uptime: {formatUptime(metrics.uptime)}</div>
      </div>
    </div>
  );
}
