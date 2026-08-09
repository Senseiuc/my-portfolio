import { useLayoutEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import GitStats from './components/GitStats';
import Logo from './components/Logo';
import MetricsMonitor from './components/MetricsMonitor';
import Terminal from './components/Terminal';

export default function ConsolePage() {
  useLayoutEffect(() => { document.title = 'Portfolio Console | Gideon Nwadialu'; }, []);

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100">
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-amber-950/40 bg-[#0a0806]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="/" className="flex min-h-11 items-center gap-2 text-sm font-bold text-slate-200 hover:text-orange-400"><Logo className="h-8 w-8" /> Gideon Nwadialu</a>
          <span className="font-mono text-[10px] uppercase text-slate-500">Technical appendix</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-16">
        <section className="border-b border-amber-950/60 pb-10 md:pb-14">
          <p className="flex items-center gap-2 font-mono text-xs uppercase text-orange-400"><TerminalIcon className="h-4 w-4" /> Portfolio console</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl">Inspect the portfolio itself.</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">Measured application health, public GitHub activity, and an interactive guide to Gideon's work. Unavailable sources remain unavailable rather than displaying estimated values.</p>
        </section>

        <section className="space-y-6 py-10 md:space-y-8 md:py-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><MetricsMonitor /><GitStats /></div>
          <Terminal />
        </section>
      </main>
    </div>
  );
}
