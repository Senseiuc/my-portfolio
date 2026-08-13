import {
  ExternalLink,
  ArrowRight,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import NextRead from './components/NextRead';
import SiteHeader from './components/SiteHeader';

const chapters = [
  {
    index: '01',
    title: 'Faster payouts with safer wallet checks',
    icon: LockKeyhole,
    problem: 'Merchant payouts needed to run faster, but wallet debits still had to be protected from double charges and database strain.',
    decision: 'Processed payouts in 500-record batches, resumed work from saved cursors, slowed each batch enough to protect the database, and added locked wallet checks with OTP confirmation.',
    result: 'Cut payout time in half while keeping wallet updates safer and avoiding the database CPU spikes from the older flow.',
  },
  {
    index: '02',
    title: 'Clearer compliance and identity checks',
    icon: ShieldCheck,
    problem: 'Inventory compliance and merchant identity checks needed clear workflows across onboarding, scheduled checks, operations review, and external notifications.',
    decision: 'Built the QoS workflow for rules, scheduled checks, admin review, audit history, Hermes reports, and tests; connected NIN and CAC verification to Dojah-backed onboarding checks.',
    result: 'Turned manual compliance work into clearer workflows with deadlines, exclusions, verification states, review history, and reports for operations teams.',
  },
  {
    index: '03',
    title: 'Marketplace reliability and mobile UX overhaul',
    icon: RefreshCw,
    problem: 'Merchant sync failures, pricing changes, SEO updates, email delivery, and mobile screens needed better recovery, clearer history, and easier use.',
    decision: 'Fixed Magento sync gaps, added merchant pricing and settings controls, added version history for SEO tags, centralized email logs, and improved mobile responsiveness across SellerHQ and Backyard.',
    result: 'Made marketplace updates easier to recover, changes easier to review, merchant emails easier to trace, and key merchant/admin tasks easier to finish on smaller screens.',
  },
  {
    index: '04',
    title: 'More reliable tests and release checks',
    icon: ServerCog,
    problem: 'Tests were hard to run the same way locally and in CI because they depended on shared services and environment-specific setup.',
    decision: 'Containerized the test setup, isolated the test database, mocked Hermes, added MySQL and Redis readiness checks, cleaned up service configuration, and connected the tests to CI.',
    result: 'Made automated tests useful again for local development and CI, then added checks for SSO, login behavior, wallet behavior, and compliance rules.',
  },
];

const topology = [
  { label: 'Merchant and admin UX', detail: 'Improved SellerHQ and Backyard screens for wallet, products, orders, compliance, reports, and mobile use.', icon: Store },
  { label: 'Commerce and identity rules', detail: 'Shipped PHP/Yii and Node.js changes for validation, pricing, onboarding, wallet safety, and SSO.', icon: Layers3 },
  { label: 'Data, jobs, and integrations', detail: 'Worked with MySQL, Redis, queues, cron jobs, Magento sync, Dojah checks, and Hermes notifications.', icon: Database },
  { label: 'Tests, CI, and operations', detail: 'Improved Docker test setup, service mocks, GitLab CI, and Kubernetes deployment configuration.', icon: ServerCog },
];

const payoutSteps = [
  ['Select', 'Resume from the last saved point instead of scanning everything again.'],
  ['Batch', 'Load up to 500 eligible records at a time.'],
  ['Release', 'Apply payout rules and save the merchant wallet changes.'],
  ['Pause', 'Wait briefly between batches to reduce database pressure.'],
  ['Continue', 'Move to the next saved point until all eligible payouts are done.'],
];

export default function KongaCaseStudyPage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const chapterDetailRef = useRef<HTMLElement | null>(null);
  const activeChapter = chapters[activeChapterIndex];
  const ActiveChapterIcon = activeChapter.icon;

  const selectChapter = (index: number) => {
    setActiveChapterIndex(index);
    window.requestAnimationFrame(() => {
      chapterDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = 'Konga Merchant Platform Improvements | Gideon Nwadialu';
    if (description) {
      description.content = 'A technical case study of Gideon Nwadialu\'s current full-time work improving Konga merchant payouts, wallet correctness, compliance, identity, marketplace synchronization, and operations.';
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-300">
      <a href="#case-study-main" className="skip-link">Skip to case study</a>

      <SiteHeader />

      <main id="case-study-main">
        <section className="relative overflow-hidden border-b border-amber-950/60">
          <div className="systems-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-7 px-4 pb-10 pt-10 md:px-8 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs uppercase text-orange-400">Konga / Merchant platform improvements</p>
              <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-slate-100 sm:text-4xl md:text-6xl">
                Making marketplace operations faster, safer, and easier to recover.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-400 md:text-lg md:leading-8">
                Current full-time software engineering work across merchant payouts, wallet safety, compliance, marketplace sync, mobile UX, automated tests, CI, and production deployments.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="https://shq.konga.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 px-4 py-2.5 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400">
                  Visit SellerHQ
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <span className="font-mono text-[10px] uppercase text-slate-500">Production merchant portal</span>
              </div>
            </div>

            <aside className="grid grid-cols-[minmax(0,1fr)_120px] items-center gap-4 border-l border-amber-900/60 pl-4 sm:grid-cols-[minmax(0,1fr)_150px] lg:col-span-4 lg:block lg:self-end lg:pl-7" aria-label="Case study outcome">
              <div>
                <p className="font-mono text-[11px] uppercase text-slate-500">Flagship production result</p>
                <p className="mt-2 text-3xl font-extrabold text-orange-400 sm:text-4xl">2x faster</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">merchant payout execution, using smaller batches and short pauses to reduce database pressure.</p>
              </div>
              <img
                src="/senseiuc-konga-mascot.png"
                alt="Senseiuc mascot presenting the Konga smile logo"
                width="1254"
                height="1254"
                loading="eager"
                decoding="async"
                className="mascot mascot--float ml-auto w-28 object-contain mix-blend-screen sm:w-36 lg:mb-6 lg:ml-0 lg:w-56"
              />
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-900" aria-label="Impact snapshot">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-900 px-4 md:grid-cols-4 md:divide-y-0 md:px-8">
            {[
              ['2x faster payouts', 'Smaller batches and short pauses reduced payout time without overloading the database.'],
              ['8 repositories', 'Merchant, middleware, admin, identity, notification, integration, and operations codebases.'],
              ['4 language stacks', 'JavaScript/TypeScript, PHP, Node.js, and Python services connected through APIs, queues, and shared data.'],
              ['2024 - present', 'Ongoing work across production features, fixes, modernization, and deployments.'],
            ].map(([value, detail]) => (
              <div key={value} className="p-3 sm:p-5 md:px-7 md:py-7 md:first:pl-0 md:last:pr-0">
                <p className="text-base font-bold text-slate-100 sm:text-xl">{value}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm sm:leading-6">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20" aria-labelledby="scope-title">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase text-orange-400">What I improved</p>
              <h2 id="scope-title" className="mt-3 text-2xl font-extrabold text-slate-100 sm:text-3xl">Production work across the full platform.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                The work touched user-facing screens, backend rules, background jobs, integrations, tests, and deployment setup.
              </p>
            </div>

            <div className="lg:col-span-8">
              <ol className="grid grid-cols-1 border border-slate-800 sm:grid-cols-2">
                {topology.map((node, index) => {
                  const Icon = node.icon;
                  return (
                    <li key={node.label} className="relative min-h-36 border-b border-slate-800 p-4 last:border-b-0 sm:min-h-44 sm:p-5 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(3)]:border-b-0">
                      <div className="flex items-center justify-between">
                        <Icon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                        <span className="font-mono text-[10px] text-slate-600">NODE {String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="mt-5 font-bold text-slate-100 sm:mt-8">{node.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{node.detail}</p>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-3 text-xs leading-5 text-slate-600">High-level view only. Internal endpoints, server names, credentials, customer data, and private database details remain confidential.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-amber-950/50 bg-[#0d0b09]">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
              <div className="sticky top-20 z-20 -mx-4 border-b border-amber-950/50 bg-[#0d0b09]/95 px-4 pb-4 pt-1 backdrop-blur md:-mx-8 md:px-8 lg:top-24 lg:mx-0 lg:border-b-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:backdrop-blur-none">
                <p className="font-mono text-xs uppercase text-orange-400">Delivery record</p>
                <h2 className="mt-3 text-2xl font-extrabold text-slate-100 sm:text-3xl">Key production workstreams.</h2>
                <div className="mt-7 flex gap-2 overflow-x-auto border-y border-slate-800 py-2 lg:block lg:space-y-2 lg:overflow-visible lg:border lg:p-2">
                  {chapters.map((chapter, index) => {
                    const Icon = chapter.icon;
                    const isActive = index === activeChapterIndex;
                    return (
                      <button
                        key={chapter.index}
                        type="button"
                        onClick={() => selectChapter(index)}
                        className={`min-w-[240px] border px-3 py-3 text-left transition-colors lg:min-w-0 lg:w-full ${
                          isActive
                            ? 'border-orange-500/70 bg-orange-500/[0.08]'
                            : 'border-slate-800 bg-[#0a0806] hover:border-amber-800 hover:bg-orange-500/[0.03]'
                        }`}
                        aria-pressed={isActive}
                      >
                        <span className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase text-slate-500">
                          Chapter {chapter.index}
                          <Icon className={`h-4 w-4 ${isActive ? 'text-orange-400' : 'text-slate-700'}`} aria-hidden="true" />
                        </span>
                        <span className="mt-2 block text-sm font-bold text-slate-100">{chapter.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <article ref={chapterDetailRef} className="relative scroll-mt-56 overflow-hidden border border-slate-800 bg-[#0a0806] p-5 sm:p-7 md:scroll-mt-44 md:p-8 lg:scroll-mt-32">
                <div className="absolute inset-0 systems-grid opacity-[0.1]" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-[11px] uppercase text-orange-400">Chapter {activeChapter.index}</p>
                      <h3 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-slate-100 md:text-5xl">{activeChapter.title}</h3>
                    </div>
                    <ActiveChapterIcon className="h-8 w-8 shrink-0 text-slate-600" aria-hidden="true" />
                  </div>

                  <dl className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="border-l border-orange-500/70 pl-4">
                      <dt className="font-mono text-[10px] uppercase text-slate-500">Problem</dt>
                      <dd className="mt-2 text-sm leading-6 text-slate-400">{activeChapter.problem}</dd>
                    </div>
                    <div className="border-l border-slate-700 pl-4">
                      <dt className="font-mono text-[10px] uppercase text-slate-500">Decision</dt>
                      <dd className="mt-2 text-sm leading-6 text-slate-400">{activeChapter.decision}</dd>
                    </div>
                    <div className="border-l border-slate-700 pl-4">
                      <dt className="font-mono text-[10px] uppercase text-slate-500">Result</dt>
                      <dd className="mt-2 text-sm leading-6 text-slate-300">{activeChapter.result}</dd>
                    </div>
                  </dl>

                  {activeChapter.index === '04' && (
                    <img src="/senseiuc-section-testing.png" alt="Senseiuc software testing and operations mascot" width="512" height="512" loading="lazy" decoding="async" className="mascot mascot--inspect mt-8 w-32 object-contain" />
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24" aria-labelledby="payout-design-title">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase text-orange-400">How payouts got faster</p>
              <h2 id="payout-design-title" className="mt-3 text-2xl font-extrabold text-slate-100 sm:text-3xl">Smaller batches, steadier load.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">The payout flow was changed so it could process work in smaller chunks, resume safely, and avoid putting too much pressure on the database at once.</p>
              <div className="mt-7 border-l border-amber-900/60 pl-5">
                <Gauge className="h-5 w-5 text-orange-400" aria-hidden="true" />
                <p className="mt-3 text-xl font-bold text-slate-100">500 records per batch</p>
                <p className="mt-1 text-sm text-slate-500">with saved progress and short pauses between batches</p>
              </div>
            </div>

            <ol className="lg:col-span-8">
              {payoutSteps.map(([title, detail], index) => (
                <li key={title} className="relative grid grid-cols-[42px_1fr] gap-4 pb-8 last:pb-0">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-amber-800 bg-[#0a0806] font-mono text-xs text-orange-400">{String(index + 1).padStart(2, '0')}</div>
                  {index < payoutSteps.length - 1 && <div className="absolute left-5 top-10 h-[calc(100%-40px)] border-l border-dashed border-amber-900" aria-hidden="true" />}
                  <div className="border-b border-slate-900 pb-7">
                    <h3 className="font-bold text-slate-100">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="mx-auto max-w-7xl border-t border-slate-900 px-4 pt-8 md:px-8">
          <p className="max-w-3xl text-xs leading-6 text-slate-600">
            Note: this case study focuses on scope, decisions, and results. Source code, customer data, internal endpoints, credentials, and operational details remain private.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <NextRead
            title="Back to all projects"
            description="Return to the project archive and compare the other systems, portals, logistics tools, and production workflows."
            href="/work"
            cta="Open all projects"
            icon={ServerCog}
          />
        </div>
      </main>

      <footer className="border-t border-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>Gideon Nwadialu / Product Engineer</span>
          <a href="/#projects" className="inline-flex items-center gap-2 font-bold text-slate-400 transition-colors hover:text-orange-400">More selected work <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </footer>
    </div>
  );
}
