import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import EngineRoom from './components/EngineRoom';
import NextRead from './components/NextRead';
import SiteHeader from './components/SiteHeader';

export default function SystemsPage() {
  useEffect(() => { document.title = 'Systems and Architecture | Gideon Nwadialu'; }, []);

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100">
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-16">
        <section className="border-b border-amber-950/60 pb-10 md:pb-14">
          <p className="font-mono text-xs uppercase text-orange-400">Systems and architecture</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl">Follow the decisions through the stack.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">Public architecture walkthroughs showing triggers, boundaries, safeguards, technologies, and outcomes without exposing private implementation details.</p>
        </section>

        <section className="py-10 md:py-14"><EngineRoom /></section>

        <NextRead
          title="See where these patterns shipped"
          description="Move from architecture flows to the project archive and compare the systems that used these safeguards in production."
          href="/work"
          cta="Browse systems"
          icon={ArrowRight}
        />
      </main>
    </div>
  );
}
