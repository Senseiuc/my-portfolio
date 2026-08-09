import { ArrowLeft, ArrowRight, BookOpen, Code2, ExternalLink, Wrench } from 'lucide-react';
import Logo from './components/Logo';

const TEACHING_CHAPTERS = [
  {
    period: '2013 - 2014',
    school: 'Merus College',
    location: 'Ifo, Ogun State',
    role: 'High School Mathematics Teacher',
    story: 'Taught junior secondary Mathematics, Introductory Technology, and Computer Science. Reframed difficult topics in a more approachable way, improving class performance by over 30%, while also leading clubs and supporting interhouse sports.',
  },
  {
    period: '2014 - 2016',
    school: 'Foresight Schools',
    location: 'Ogun State',
    role: 'Mathematics Teacher',
    story: 'Taught senior secondary Mathematics and oversaw the after-school tutorial programme, helping students build stronger understanding and genuine interest in the subject.',
  },
  {
    period: '2015 - 2016',
    school: 'Asoland College',
    location: 'Lagos State',
    role: 'Mathematics Teacher',
    story: 'Taught Mathematics and Quantitative Reasoning to Basic 5 and 6 students. Organized classes for school events, composed anniversary songs, and trained students for interclass and interhouse sports.',
  },
  {
    period: '2017 - 2018',
    school: 'Foresight Schools',
    location: 'Ogun State',
    role: 'Mathematics Teacher',
    story: 'Returned to teach senior secondary Mathematics and run the tutorial programme, including tutor recruitment, coordination, and financial disbursement. Student interest grew, and the school recorded its highest number of university admissions compared with previous years.',
  },
];

const TRANSITION_CHAPTERS = [
  {
    period: 'Sep - Dec 2021',
    company: 'LifeSeed Worldwide',
    role: 'IT Support Specialist Intern',
    detail: 'Supported new app features, listened to customers, resolved concerns, and created promotional flyers and video content to improve visibility.',
  },
  {
    period: 'Nov 2021 - Jan 2022',
    company: 'DENICHE Hospitality',
    role: 'Junior Web Developer',
    detail: 'Maintained staff computers, diagnosed infrastructure issues, trained employees on the internal operations app, improved multi-entry sales workflows, and added Vue.js client-side calculations to the booking experience. Also stepped in as Operational Supervisor for one month.',
  },
  {
    period: 'Dec 2021 - Feb 2022',
    company: 'LifeSeed Worldwide',
    role: 'Web Developer',
    detail: 'Built web application components and customer websites with Laravel, jQuery, Bootstrap, PHP, and MySQL. Gathered stakeholder feedback, handled IT support, and learned graphic design and video editing when the work called for it.',
  },
];

export default function BeforeSystemsPage() {
  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <a href="#origin-story" className="skip-link">Skip to origin story</a>
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-amber-950/40 bg-[#0a0806]/92 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2" aria-label="Gideon Nwadialu home">
            <Logo className="w-8 h-8" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase">GIDEON <span className="text-orange-400">NWADIALU</span></span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase text-slate-300 hover:text-orange-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </a>
        </div>
      </header>

      <main id="origin-story" tabIndex={-1} className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-amber-950/60 pb-12 md:pb-16">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase text-orange-400">The prequel / 2013 to 2022</p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Before I built systems,<br /><span className="text-orange-400">I taught people how to solve them.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-slate-300">
              Software was not the first place I learned to break hard problems into understandable steps. That happened in mathematics classrooms, tutorial programmes, school events, support desks, and one very hands-on hospitality operation.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <img src="/gideon_caricature.webp" alt="Caricature of Gideon Nwadialu" width="520" height="520" className="w-48 sm:w-56 lg:w-64 aspect-square object-cover border border-slate-800" />
          </div>
        </section>

        <section className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <img src="/senseiuc-section-teaching.png" alt="Senseiuc mascot teaching mathematics" width="512" height="512" className="mascot mascot--inspect w-36 object-contain" />
              <p className="mt-4 font-mono text-xs uppercase text-orange-400">Chapter one</p>
              <h2 className="mt-2 text-3xl font-extrabold">The classroom years</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">Teaching sharpened the skills I still use in engineering: clarity, patience, structure, feedback, and knowing when a problem needs a different explanation.</p>
            </div>
          </div>
          <div className="lg:col-span-8 border-y border-slate-800 divide-y divide-slate-800">
            {TEACHING_CHAPTERS.map((chapter, index) => (
              <article key={`${chapter.school}-${chapter.period}`} className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-7">
                <div className="sm:col-span-3 font-mono text-xs text-orange-400">0{index + 1} / {chapter.period}</div>
                <div className="sm:col-span-9">
                  <h3 className="text-xl font-bold">{chapter.school}</h3>
                  <p className="mt-1 text-xs font-mono text-slate-500">{chapter.role} / {chapter.location}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{chapter.story}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-16 border-t border-amber-950/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <Wrench className="w-7 h-7 text-orange-400" />
              <p className="mt-4 font-mono text-xs uppercase text-orange-400">Chapter two</p>
              <h2 className="mt-2 text-3xl font-extrabold">Then I started fixing the tools</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">The path into software was practical: support the users, understand the workflow, improve the app, and learn whatever the next problem required.</p>
            </div>
            <div className="lg:col-span-8 space-y-0 border-y border-slate-800 divide-y divide-slate-800">
              {TRANSITION_CHAPTERS.map((chapter, index) => (
                <article key={`${chapter.company}-${chapter.period}`} className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-7">
                  <div className="sm:col-span-3 font-mono text-xs text-orange-400">0{index + 1} / {chapter.period}</div>
                  <div className="sm:col-span-9">
                    <h3 className="text-xl font-bold">{chapter.company}</h3>
                    <p className="mt-1 text-xs font-mono text-slate-500">{chapter.role} / Lagos, Nigeria</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{chapter.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 border-y border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 md:items-center">
          <div className="md:col-span-2"><BookOpen className="w-8 h-8 text-orange-400" /></div>
          <div className="md:col-span-7">
            <h2 className="text-2xl font-extrabold">The through-line</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">Teaching made complexity understandable. Support made technology accountable to real users. Operations exposed the cost of slow workflows. Engineering gave me a way to improve all three at once.</p>
          </div>
          <div className="md:col-span-3 md:text-right space-y-3">
            <a href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300">See what I build now <ArrowRight className="w-4 h-4" /></a>
            <a href="https://www.linkedin.com/in/gideonnwadialu/details/experience/" target="_blank" rel="noopener noreferrer" className="flex md:justify-end items-center gap-2 text-xs font-mono text-slate-400 hover:text-orange-400">LinkedIn experience <ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-amber-950/40 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>Gideon Nwadialu</span>
          <span className="inline-flex items-center gap-2"><Code2 className="w-4 h-4" /> Teacher to product engineer</span>
        </div>
      </footer>
    </div>
  );
}
