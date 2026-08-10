import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import EngineRoom from './components/EngineRoom';
import Logo from './components/Logo';
import MobileMapNav from './components/MobileMapNav';

export default function SystemsPage() {
  useEffect(() => { document.title = 'Systems and Architecture | Gideon Nwadialu'; }, []);

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100">
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-amber-950/40 bg-[#0a0806]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="/" className="flex min-h-11 items-center gap-2 text-sm font-bold text-slate-200 hover:text-orange-400">
            <Logo className="h-8 w-8" /> Gideon Nwadialu
          </a>
          <a href="/work" className="hidden min-h-11 items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 md:inline-flex">Work archive <ArrowRight className="h-4 w-4" /></a>
          <MobileMapNav className="md:hidden" />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-16">
        <section className="border-b border-amber-950/60 pb-10 md:pb-14">
          <p className="font-mono text-xs uppercase text-orange-400">Systems and architecture</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl">Follow the decisions through the stack.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">Public architecture walkthroughs showing triggers, boundaries, safeguards, technologies, and outcomes without exposing private implementation details.</p>
        </section>

        <section className="py-10 md:py-14"><EngineRoom /></section>
      </main>
    </div>
  );
}
