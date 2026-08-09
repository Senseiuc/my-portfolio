import React, { useLayoutEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, X, Square } from 'lucide-react';

interface LogEntry {
  command: string;
  output: string;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      command: 'system-init',
      output: `Senseiuc Project Explorer [Version 1.0.0]
(c) 2026 Gideon Nwadialu.

Type 'help' to explore Gideon's work and technical background.`
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const output = scrollContainerRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [logs.length]);

  const runCommand = async () => {
    if (loading) return;
    const cmd = input.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === 'clear') {
      setLogs([]);
      setInput('');
      return;
    }

    setLoading(true);
    setLogs(prev => [...prev, { command: cmd, output: 'Searching the portfolio...' }]);
    setInput('');

    try {
      const response = await fetch('/api/terminal/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      setLogs(prev => {
        const next = [...prev];
        // Replace the "Executing query..." placeholder with actual backend result
        next[next.length - 1] = { command: cmd, output: data.output };
        return next;
      });
    } catch (err) {
      setLogs(prev => {
        const next = [...prev];
        next[next.length - 1] = { 
          command: cmd, 
          output: `The portfolio explorer is currently unavailable for '${cmd}'. Please try again shortly.`
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0d0a07]/90 border border-slate-800 overflow-hidden [overflow-anchor:none]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-orange-400" />
          <span className="font-mono text-xs font-semibold text-slate-300">senseiuc / project-explorer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
            <X className="w-1.5 h-1.5 text-red-500/60" />
          </div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
            <Square className="w-1.5 h-1.5 text-yellow-500/60" />
          </div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
            <Play className="w-1.5 h-1.5 text-green-500/60" />
          </div>
        </div>
      </div>

      {/* Terminal Screen Output */}
      <div ref={scrollContainerRef} className="p-4 h-80 overflow-y-auto overscroll-contain [overflow-anchor:none] font-mono text-sm leading-relaxed text-slate-300 scrollbar-thin">
        {logs.map((log, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 text-orange-400">
              <span>$</span>
              <span>{log.command}</span>
            </div>
            <pre className="mt-1 text-emerald-400 whitespace-pre-wrap font-mono text-xs">{log.output}</pre>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Searching portfolio data...</span>
          </div>
        )}
      </div>

      {/* Terminal Form Input */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-950/60 border-t border-slate-800">
        <span className="font-mono text-orange-400">$</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            void runCommand();
          }}
          placeholder="try 'help' or 'recommend-project'..."
          readOnly={loading}
          aria-busy={loading}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent border-none outline-none font-mono text-base sm:text-sm text-emerald-400 placeholder-slate-700"
        />
        <button 
          type="button"
          onClick={() => void runCommand()}
          disabled={loading}
          className="px-3 py-1 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/50 rounded text-orange-400 font-mono text-xs transition-colors cursor-pointer"
        >
          Run
        </button>
      </div>
    </div>
  );
}
