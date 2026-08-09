import { ArrowLeft, ArrowRight, ExternalLink, Layers3 } from 'lucide-react';
import Logo from './components/Logo';
import { PROJECTS } from './App';

const PROJECT_ORDER = [
  'ansar-ud-deen',
  'golden-attic',
  'tripease',
  'visitor-management',
  'shipwize',
  'transglobal',
  'xxolcare',
  'lextorah',
  'wings',
  'radionews',
];

const ORDERED_PROJECTS = PROJECT_ORDER
  .map((id) => PROJECTS.find((project) => project.id === id))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <a href="#work-archive" className="skip-link">Skip to project archive</a>
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-amber-950/40 bg-[#0a0806]/92 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2" aria-label="Gideon Nwadialu home">
            <Logo className="w-8 h-8" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase">
              GIDEON <span className="text-orange-400">NWADIALU</span>
            </span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase text-slate-300 hover:text-orange-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </a>
        </div>
      </header>

      <main id="work-archive" tabIndex={-1} className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-b border-amber-950/60 pb-10 md:pb-14">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase text-orange-400">Selected systems / 2020 to now</p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">Work that spans the whole stack.</h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-slate-300">
              Production systems delivered across interfaces, mobile clients, APIs, financial ledgers, data migrations, integrations, testing, infrastructure, and ongoing operations.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-end gap-4">
            <img src="/senseiuc-section-architect.png" alt="Senseiuc systems architect mascot" width="512" height="512" className="mascot mascot--inspect w-28 sm:w-36 shrink-0 object-contain" />
            <dl className="grid grid-cols-1 gap-4 flex-1 content-end">
              <div className="border-l border-orange-500 pl-4">
                <dt className="font-mono text-[11px] uppercase text-slate-500">Systems</dt>
                <dd className="mt-1 text-2xl font-bold">11</dd>
              </div>
              <div className="border-l border-slate-700 pl-4">
                <dt className="font-mono text-[11px] uppercase text-slate-500">Delivery</dt>
                <dd className="mt-1 text-2xl font-bold">End to end</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="py-10 md:py-14 border-b border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:items-center">
            <div className="md:col-span-3">
              <span className="font-mono text-[11px] uppercase font-bold text-orange-400">Flagship case study</span>
              <h2 className="mt-2 text-xl font-bold">Konga Merchant Platform Engineering</h2>
            </div>
            <p className="md:col-span-6 text-sm leading-relaxed text-slate-400">
              End-to-end commerce engineering across merchant interfaces, PHP and Node.js services, Python notifications, money movement, identity, testing, Docker, Kubernetes, and production support.
            </p>
            <div className="md:col-span-3 md:text-right">
              <a href="/work/konga-merchant-platform" className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">
                Read case study <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="flex items-center gap-3 mb-8">
            <Layers3 className="w-5 h-5 text-orange-400" />
            <div>
              <p className="font-mono text-xs uppercase text-orange-400">Project archive</p>
              <h2 className="mt-1 text-2xl md:text-3xl font-extrabold">More systems shipped</h2>
            </div>
          </div>

          <div className="border-y border-slate-800 divide-y divide-slate-800">
            {ORDERED_PROJECTS.map((project, index) => (
              <article key={project.id} className="py-7 md:py-9">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7">
                  <div className="md:col-span-3">
                    <span className="font-mono text-[11px] uppercase font-bold text-orange-400">
                      {String(index + 1).padStart(2, '0')} / {project.category}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-slate-100">{project.title}</h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-sm leading-relaxed text-slate-400">{project.shortDesc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-slate-800 px-2 py-1 text-[10px] font-mono text-slate-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-orange-400 transition-colors">
                        Production site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <details className="group mt-5 md:ml-[25%] border-l border-slate-800 pl-4 md:pl-6">
                  <summary className="cursor-pointer list-none inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-orange-400 transition-colors">
                    Engineering details <span className="group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-7">
                    <div>
                      <p className="font-mono text-[11px] uppercase text-slate-500">Role and scope</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.details.role ?? project.details.system}</p>
                      {project.details.architecture && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.details.architecture.map((node) => (
                            <span key={node} className="border border-amber-950/70 px-2 py-1 text-[11px] text-orange-200">{node}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase text-slate-500">What I delivered</p>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-400">
                        {project.details.contributions.slice(0, 5).map((item) => (
                          <li key={item} className="border-l border-slate-700 pl-3">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-amber-950/40">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs font-mono text-slate-500">
          <span>Gideon Nwadialu / Product Engineer</span>
          <a href="mailto:nwadialugideon@gmail.com" className="hover:text-orange-400 transition-colors">nwadialugideon@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}
