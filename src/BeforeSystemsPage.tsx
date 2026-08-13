import { ArrowRight, BookOpen, Code2, Wrench } from 'lucide-react';
import NextRead from './components/NextRead';
import SiteHeader from './components/SiteHeader';

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

      <SiteHeader />

      <main id="origin-story" tabIndex={-1} className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-16">
        <section className="grid grid-cols-1 gap-6 border-b border-amber-950/60 pb-8 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase text-orange-400">The prequel / 2013 to 2022</p>
            <h1 className="mt-3 text-[2.45rem] font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
              Before I built systems,<br /><span className="text-orange-400">I taught people how to solve them.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:mt-6 md:text-lg">
              Software was not the first place I learned to break hard problems into understandable steps. That happened in mathematics classrooms, tutorial programmes, school events, support desks, and one very hands-on hospitality operation.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <img src="/gideon_caricature.webp" alt="Caricature of Gideon Nwadialu" width="520" height="520" className="aspect-square w-full max-w-56 object-cover border border-slate-800 sm:max-w-64 lg:w-64" />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 py-8 md:py-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="grid grid-cols-[minmax(0,1fr)_88px] items-center gap-4 lg:block">
                <div>
                  <p className="font-mono text-xs uppercase text-orange-400 lg:mt-4">Chapter one</p>
                  <h2 className="mt-2 text-3xl font-extrabold">The classroom years</h2>
                </div>
                <img src="/senseiuc-section-teaching.png" alt="Senseiuc mascot teaching mathematics" width="512" height="512" className="mascot mascot--inspect order-2 w-20 object-contain lg:order-none lg:w-36" />
              </div>
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

        <section className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-4 md:gap-px md:overflow-visible md:border md:border-slate-800 md:bg-slate-800 md:px-0 md:pb-0" aria-label="Transferable skills from teaching to engineering">
          {[
            ['Explain', 'Translate complex ideas until the user, student, or teammate can act.'],
            ['Sequence', 'Break large problems into steps that can be practiced, tested, and improved.'],
            ['Support', 'Stay close to real people when the workflow becomes confusing or costly.'],
            ['Improve', 'Turn repeated pain into better tools, clearer processes, and stronger systems.'],
          ].map(([title, detail], index) => (
            <div key={title} className="min-w-[72vw] snap-center border border-slate-800 bg-[#0a0806] p-4 md:min-h-40 md:min-w-0 md:border-0 md:p-5">
              <p className="font-mono text-[10px] uppercase text-orange-400">Transfer {String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-2 text-base font-bold text-slate-100 md:mt-3 md:text-lg">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="py-12 md:py-16 border-t border-amber-950/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-4 lg:block">
                <div>
                  <p className="font-mono text-xs uppercase text-orange-400 lg:mt-4">Chapter two</p>
                  <h2 className="mt-2 text-3xl font-extrabold">Then I started fixing the tools</h2>
                </div>
                <Wrench className="order-2 h-8 w-8 justify-self-end text-orange-400 lg:order-none lg:h-7 lg:w-7 lg:justify-self-auto" />
              </div>
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
          <div className="md:col-span-10">
            <h2 className="text-2xl font-extrabold">The through-line</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">Teaching made complexity understandable. Support made technology accountable to real users. Operations exposed the cost of slow workflows. Engineering gave me a way to improve all three at once.</p>
          </div>
        </section>

        <NextRead
          title="Jump from origin story to current systems"
          description="The early chapters explain the mindset. The work archive shows where that mindset now appears in product engineering."
          href="/work"
          cta="Open work"
          icon={Code2}
        />
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
