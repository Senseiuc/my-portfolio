import { useEffect } from 'react';
import { Music2, Quote } from 'lucide-react';
import Logo from './components/Logo';
import Mascot from './components/Mascot';
import MobileMapNav from './components/MobileMapNav';

const interests = [
  { title: 'Chess', description: 'Planning ahead, testing ideas, and finding the move that changes the position.', image: '/senseiuc-hobby-chess.png', variant: 'think' as const },
  { title: 'Fitness', description: 'Pull-ups, consistency, and the satisfying proof that small improvements compound.', image: '/senseiuc-hobby-fitness.png', variant: 'build' as const },
  { title: 'Poetry', description: 'The precision of language and the freedom to say more with fewer words.', variant: 'teach' as const },
  { title: 'Gaming', description: 'A place where systems, stories, competition, and experimentation coexist.', variant: 'debug' as const },
  { title: 'Music', description: 'A soundtrack for focus, momentum, reflection, and the occasional excellent chorus.', image: '/senseiuc-hobby-music.png', variant: 'cloud' as const },
  { title: 'Meeting people', description: 'Hearing how people think, what they are building, and what shaped them.', variant: 'partner' as const },
];

export default function LifePage() {
  useEffect(() => { document.title = 'Life Outside Code | Gideon Nwadialu'; }, []);

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100">
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-amber-950/40 bg-[#0a0806]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="/" className="flex min-h-11 items-center gap-2 text-sm font-bold text-slate-200 hover:text-orange-400"><Logo className="h-8 w-8" /> Gideon Nwadialu</a>
          <Music2 className="hidden h-5 w-5 text-orange-400 md:block" aria-hidden="true" />
          <MobileMapNav className="md:hidden" />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:py-16">
        <section className="border-b border-amber-950/60 pb-10 md:pb-14">
          <p className="font-mono text-xs uppercase text-orange-400">Life outside code</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl">The things that keep me curious.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">Engineering is a large part of my life, not the whole of it. Strategy, movement, language, stories, music, and people keep the rest interesting.</p>
        </section>

        <section className="grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 sm:grid-cols-2 lg:grid-cols-3" aria-label="Personal interests">
          {interests.map((interest, index) => (
            <article key={interest.title} className="group relative min-h-56 overflow-hidden bg-[#0a0806] p-5 pr-24 transition-colors hover:bg-orange-500/[0.035]">
              <span className="font-mono text-[10px] text-orange-400">0{index + 1}</span>
              <h2 className="mt-2 text-lg font-bold">{interest.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{interest.description}</p>
              <span className="absolute left-5 bottom-5 font-mono text-[10px] uppercase text-slate-700 transition-colors group-hover:text-orange-500/70">Open texture</span>
              {interest.image ? (
                <img src={interest.image} alt={`${interest.title} Senseiuc mascot`} width="512" height="512" loading="lazy" decoding="async" className="mascot mascot--float absolute bottom-2 right-2 w-24 object-contain transition-transform group-hover:scale-105" />
              ) : (
                <Mascot variant={interest.variant} motion="float" label={`${interest.title} mascot`} className="absolute bottom-2 right-2 w-20 opacity-80 transition-transform group-hover:scale-105" />
              )}
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 border-b border-amber-950/60 py-10 md:grid-cols-[auto_1fr_auto] md:items-center">
          <Quote className="h-8 w-8 text-orange-400" />
          <blockquote className="max-w-3xl text-xl font-semibold leading-relaxed text-slate-200">“The same mind that enjoys a difficult system also enjoys a close chess position, a demanding set, and a line of poetry that finally lands.”</blockquote>
          <a href="/work" className="inline-flex items-center text-sm font-bold text-orange-400 hover:text-orange-300">Back to systems</a>
        </section>
      </main>
    </div>
  );
}
