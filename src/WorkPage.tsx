import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Layers3 } from 'lucide-react';
import Logo from './components/Logo';
import MobileMapNav from './components/MobileMapNav';
import NextRead from './components/NextRead';
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
  const categories = useMemo(() => ['All', ...Array.from(new Set(ORDERED_PROJECTS.map((project) => project.category)))], []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProjectId, setActiveProjectId] = useState(ORDERED_PROJECTS[0]?.id);
  const visibleProjects = activeCategory === 'All'
    ? ORDERED_PROJECTS
    : ORDERED_PROJECTS.filter((project) => project.category === activeCategory);
  const activeProject = visibleProjects.find((project) => project.id === activeProjectId) ?? visibleProjects[0] ?? ORDERED_PROJECTS[0];

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
          <a href="/" className="hidden items-center gap-2 text-xs font-mono uppercase text-slate-300 hover:text-orange-400 transition-colors md:inline-flex">
            <ArrowLeft className="w-4 h-4" /> Home
          </a>
          <MobileMapNav className="md:hidden" />
        </div>
      </header>

      <main id="work-archive" tabIndex={-1} className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-16">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-b border-amber-950/60 pb-8 md:pb-14">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase text-orange-400">Selected systems / 2020 to now</p>
            <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">Work that spans the whole stack.</h1>
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

        <section className="py-8 md:py-14 border-b border-slate-800">
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

        <section className="py-8 md:py-14">
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <Layers3 className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="font-mono text-xs uppercase text-orange-400">Project archive</p>
                  <h2 className="mt-1 text-2xl md:text-3xl font-extrabold">Browse shipped systems</h2>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="flex gap-2 overflow-x-auto border-y border-slate-800 py-2 md:justify-start lg:flex-wrap lg:justify-end lg:overflow-visible">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      const nextProject = category === 'All'
                        ? ORDERED_PROJECTS[0]
                        : ORDERED_PROJECTS.find((project) => project.category === category);
                      if (nextProject) setActiveProjectId(nextProject.id);
                    }}
                    className={`min-h-10 shrink-0 border px-3 text-xs font-mono transition-colors ${
                      activeCategory === category
                        ? 'border-orange-500/70 bg-orange-500/[0.08] text-orange-300'
                        : 'border-slate-800 text-slate-400 hover:border-amber-800 hover:text-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <p className="mb-3 font-mono text-[10px] uppercase text-slate-500">Swipe sideways / details are attached to each card</p>
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4">
              {visibleProjects.map((project, index) => (
                <article key={project.id} className="min-w-[86vw] max-w-[86vw] snap-center border border-amber-950/60 bg-[#0d0a07]/90">
                  <div className="min-h-56 p-4">
                    <span className="font-mono text-[10px] uppercase font-bold text-orange-400">
                      {String(index + 1).padStart(2, '0')} / {project.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-100">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.shortDesc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="border border-slate-800 px-2 py-1 text-[10px] font-mono text-slate-400">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-800 p-4">
                    <p className="font-mono text-[10px] uppercase text-slate-500">Role and scope</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.details.role ?? project.details.system}</p>

                    {project.details.architecture && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.details.architecture.map((node) => (
                          <span key={node} className="border border-amber-950/70 px-2 py-1 text-[11px] text-orange-200">{node}</span>
                        ))}
                      </div>
                    )}

                    <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-400">
                      {project.details.contributions.slice(0, 3).map((item) => (
                        <li key={item} className="border-l border-slate-800 pl-3">{item}</li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.id === 'konga-payouts' && (
                        <a href="/work/konga-merchant-platform" className="inline-flex min-h-11 items-center gap-2 bg-orange-500 px-4 py-2.5 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400">
                          Read case study <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                      {(project.details.links ?? project.links ?? (project.link ? [{ label: 'Production site', url: project.link }] : [])).map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-mono text-slate-300 hover:text-orange-400 transition-colors">
                          {link.label} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="hidden grid-cols-1 gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <div className={`grid auto-rows-fr grid-cols-1 gap-px border border-slate-800 bg-slate-800 ${visibleProjects.length === 1 ? '' : 'sm:grid-cols-2'}`}>
              {visibleProjects.map((project, index) => {
                const isActive = project.id === activeProject.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveProjectId(project.id)}
                    className={`group min-h-52 bg-[#0a0806] p-4 text-left transition-colors hover:bg-orange-500/[0.035] ${
                      isActive ? 'outline outline-1 outline-orange-500/70 -outline-offset-1' : ''
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="font-mono text-[10px] uppercase font-bold text-orange-400">
                      {String(index + 1).padStart(2, '0')} / {project.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-slate-100 group-hover:text-orange-300">{project.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">{project.shortDesc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="border border-slate-800 px-2 py-1 text-[10px] font-mono text-slate-400">{tag}</span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <aside className="lg:sticky lg:top-24 border border-amber-950/60 bg-[#0d0a07]/90 p-5">
              <p className="font-mono text-[11px] uppercase text-orange-400">Active system</p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-100">{activeProject.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{activeProject.shortDesc}</p>

              <div className="mt-6 border-l border-slate-700 pl-4">
                <p className="font-mono text-[10px] uppercase text-slate-500">Role and scope</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeProject.details.role ?? activeProject.details.system}</p>
              </div>

              {activeProject.details.architecture && (
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase text-slate-500">Architecture path</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeProject.details.architecture.map((node) => (
                      <span key={node} className="border border-amber-950/70 px-2 py-1 text-[11px] text-orange-200">{node}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase text-slate-500">Selected delivery</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-400">
                  {activeProject.details.contributions.slice(0, 4).map((item) => (
                    <li key={item} className="border-l border-slate-800 pl-3">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {activeProject.id === 'konga-payouts' && (
                  <a href="/work/konga-merchant-platform" className="inline-flex min-h-11 items-center gap-2 bg-orange-500 px-4 py-2.5 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400">
                    Read case study <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                {(activeProject.details.links ?? activeProject.links ?? (activeProject.link ? [{ label: 'Production site', url: activeProject.link }] : [])).map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-mono text-slate-300 hover:text-orange-400 transition-colors">
                    {link.label} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <NextRead
          title="Read the Konga case study"
          description="The archive shows breadth. The Konga case study goes deeper into one production environment across money movement, identity, testing, and operations."
          href="/work/konga-merchant-platform"
          cta="Open case study"
          icon={Layers3}
        />
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
