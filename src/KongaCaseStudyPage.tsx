import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import MobileMapNav from './components/MobileMapNav';
import NextRead from './components/NextRead';

const chapters = [
  {
    index: '01',
    title: 'Money movement with bounded risk',
    icon: LockKeyhole,
    problem: 'High-volume escrow releases and merchant wallet actions had to move faster without increasing lock pressure or allowing concurrent debits.',
    decision: 'Bound payout work with cursor offsets and 500-record batches, pace execution, and protect interactive debits with pessimistic row locks plus OTP confirmation.',
    result: 'Payout execution completed in half the previous time while avoiding the database CPU spikes associated with the earlier flow.',
    evidence: ['500-record payout batches', 'Pessimistic wallet row locks', 'Two-step OTP debit confirmation'],
  },
  {
    index: '02',
    title: 'Compliance that operates as a system',
    icon: ShieldCheck,
    problem: 'Inventory quality rules and merchant identity checks crossed onboarding, scheduled enforcement, operations review, and external notification services.',
    decision: 'Build the QoS workflow across schema, cron enforcement, REST endpoints, admin review, audit history, Hermes reporting, tests, and Kubernetes configuration; connect NIN and CAC verification to Dojah-backed onboarding controls.',
    result: 'Converted manual compliance work into traceable, configurable workflows with explicit exclusions, deadlines, verification states, and operational reporting.',
    evidence: ['Cron-based inventory enforcement', 'Hermes breach reporting', 'NIN and CAC verification controls'],
  },
  {
    index: '03',
    title: 'Marketplace reliability across old boundaries',
    icon: RefreshCw,
    problem: 'Merchant data, catalog state, pricing, SEO metadata, communications, and administrative tools moved across legacy applications and databases.',
    decision: 'Repair partial Magento synchronization, add KOMA pricing and merchant settings, introduce versioned SEO-tag caching, centralize email delivery logs, and lead a portal-wide mobile responsiveness overhaul across SellerHQ and Backyard.',
    result: 'Made failure states recoverable, sensitive changes auditable, merchant communication traceable, and key merchant/admin workflows usable on mobile while resolving layout, JavaScript, and CSS issues.',
    evidence: ['Self-healing merchant synchronization', 'Cross-database caching + email audit trail', 'Mobile UI, JavaScript, and CSS remediation'],
  },
  {
    index: '04',
    title: 'A repeatable engineering feedback loop',
    icon: ServerCog,
    problem: 'Legacy tests depended on fragile shared services and environment-specific configuration, making local verification and CI feedback difficult to reproduce.',
    decision: 'Containerize the test workflow, isolate its schema and migrations, mock Hermes, add MySQL readiness and Redis setup, normalize environment-driven service configuration, and connect the suite to CI build and deployment stages.',
    result: 'Revived automated testing as a practical local and CI development workflow, then expanded regression coverage around SSO, authentication middleware, wallet behavior, and compliance rules.',
    evidence: ['Containerized PHPUnit workflow', 'Isolated schema + Hermes mock', 'SSO and authentication regression tests'],
  },
];

const topology = [
  { label: 'Frontend and operations UX', detail: 'JavaScript and TypeScript merchant/admin surfaces across SellerHQ, Backyard, wallet, products, orders, compliance, and reporting.', icon: Store },
  { label: 'Commerce and identity services', detail: 'PHP/Yii marketplace services and Node.js authentication handling business rules, APIs, validation, pricing, and secure wallet actions.', icon: Layers3 },
  { label: 'Data, jobs, and integrations', detail: 'MySQL, Redis, cron and queue workers connecting Magento, Dojah, SSO, and Python/Celery-powered Hermes notifications.', icon: Database },
  { label: 'Delivery and operations', detail: 'Docker local environments, isolated tests, GitLab CI pipelines, and Kubernetes deployments, services, ingress, Redis, and scheduled workloads.', icon: ServerCog },
];

const deliverySlices = [
  {
    title: 'QoS inventory compliance',
    impact: 'A complete operational control loop',
    path: ['Countdown and admin review UI', 'REST rules + audit schema', 'Inventory zeroing cron', 'Hermes breach reports', 'Kubernetes configuration'],
  },
  {
    title: 'Merchant identity verification',
    impact: 'Faster, governed onboarding decisions',
    path: ['Document upload + OCR UX', 'NIN/CAC validation', 'Dojah service integration', 'Identity reuse controls', 'Auditable merchant state'],
  },
  {
    title: 'Engineering feedback loop',
    impact: 'Repeatable local and CI verification',
    path: ['Docker test environment', 'Isolated schema + migrations', 'Hermes mock + service readiness', 'Regression suites', 'Build and deployment pipeline'],
  },
];

const payoutSteps = [
  ['Select', 'Resume from a cursor instead of rescanning the full release set.'],
  ['Bound', 'Load no more than 500 eligible records into one unit of work.'],
  ['Release', 'Apply payout rules and persist merchant ledger changes.'],
  ['Pace', 'Yield briefly between batches to smooth database and CPU demand.'],
  ['Continue', 'Advance the cursor until the eligible release set is exhausted.'],
];

export default function KongaCaseStudyPage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = chapters[activeChapterIndex];
  const ActiveChapterIcon = activeChapter.icon;

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

      <header className="sticky top-0 z-40 border-b border-amber-950/60 bg-[#0a0806]/95 backdrop-blur">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-200 transition-colors hover:text-orange-400">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Portfolio
          </a>
          <span className="hidden font-mono text-xs uppercase text-slate-500 md:block">Enterprise commerce / technical case study</span>
          <MobileMapNav className="md:hidden" />
        </div>
      </header>

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
                As a current full-time software engineer at Konga, Gideon improves and supports merchant and admin interfaces, backend rules, data, scheduled processing, integrations, automated tests, CI, and Kubernetes operations across a multi-language commerce platform.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="https://shq.konga.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 px-4 py-2.5 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400">
                  Visit SellerHQ
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <span className="font-mono text-[10px] uppercase text-slate-500">Production merchant portal</span>
              </div>
            </div>

            <aside className="border-l border-amber-900/60 pl-4 lg:col-span-4 lg:self-end lg:pl-7" aria-label="Case study outcome">
              <p className="font-mono text-[11px] uppercase text-slate-500">Flagship production result</p>
              <p className="mt-2 text-3xl font-extrabold text-orange-400 sm:text-4xl">2x faster</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">merchant payout execution, with bounded batches and paced processing to control database pressure.</p>
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-900" aria-labelledby="frameworks-title">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 md:px-8 md:py-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-xs uppercase text-orange-400">Languages and frameworks</p>
              <h2 id="frameworks-title" className="mt-2 text-2xl font-bold text-slate-100">A multi-stack delivery surface.</h2>
            </div>
            <dl className="grid grid-cols-1 gap-px bg-slate-800 border border-slate-800 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {[
                ['Frontend', 'JavaScript, TypeScript, AngularJS, Grunt, Sass'],
                ['Backend + services', 'PHP, Yii 1.1, Node.js, Restify, Knex, Bookshelf, Python, Flask, Celery'],
                ['Testing', 'Codeception, PHPUnit, Mocha, Chai, Sinon, service mocks'],
                ['Data + operations', 'MySQL, Redis, RabbitMQ, Beanstalk, Docker, GitLab CI, Kubernetes, PM2'],
              ].map(([label, tools]) => (
                <div key={label} className="bg-[#0a0806] p-4">
                  <dt className="font-mono text-[10px] uppercase text-orange-400">{label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{tools}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-slate-900" aria-label="Project scope">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-900 px-4 md:grid-cols-4 md:divide-y-0 md:px-8">
            {[
              ['8 repositories', 'Merchant, middleware, administration, identity, notification, integration, and operations codebases.'],
              ['4 language ecosystems', 'JavaScript/TypeScript, PHP, Node.js, and Python services connected through APIs, queues, shared data, and operational workflows.'],
              ['Screen to cluster', 'Frontend remediation, backend rules, integrations, tests, CI, and Kubernetes operations delivered as one accountable engineering path.'],
              ['2024 - present', 'Sustained delivery across production features, incident recovery, modernization, and deployment operations.'],
            ].map(([value, detail]) => (
              <div key={value} className="p-3 sm:p-5 md:px-7 md:py-7 md:first:pl-0 md:last:pr-0">
                <p className="text-base font-bold text-slate-100 sm:text-xl">{value}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm sm:leading-6">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24" aria-labelledby="scope-title">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase text-orange-400">Technical design 01</p>
              <h2 id="scope-title" className="mt-3 text-2xl font-extrabold text-slate-100 sm:text-3xl">From merchant screen to cluster operations.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                The work was not confined to one repository or layer. Product changes moved through merchant and admin interfaces, commerce and identity services, background processing, shared data, external systems, tests, and deployment infrastructure.
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
                      {index < topology.length - 1 && (
                        <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 bg-[#0a0806] p-1 text-amber-700 sm:block" aria-hidden="true" />
                      )}
                    </li>
                  );
                })}
              </ol>
              <p className="mt-3 text-xs leading-5 text-slate-600">Technical overview of the platform. Internal endpoints, infrastructure names, credentials, customer data, and proprietary schemas remain confidential.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-900 bg-[#0d0b09]" aria-labelledby="delivery-slices-title">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="font-mono text-xs uppercase text-orange-400">Technical design 02</p>
                <h2 id="delivery-slices-title" className="mt-3 text-2xl font-extrabold text-slate-100 sm:text-3xl md:text-4xl">Features delivered as complete operating paths.</h2>
              </div>
              <p className="text-sm leading-7 text-slate-400 md:col-span-5">Each path crossed interface, application logic, data, service integration, verification, and production operations instead of stopping at a single layer.</p>
            </div>

            <div className="mt-10 divide-y divide-slate-800 border-y border-slate-800">
              {deliverySlices.map((slice, sliceIndex) => (
                <article key={slice.title} className="grid grid-cols-1 gap-5 py-6 sm:py-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-3">
                    <span className="font-mono text-[10px] text-orange-400">PATH {String(sliceIndex + 1).padStart(2, '0')}</span>
                    <h3 className="mt-2 text-lg font-bold text-slate-100">{slice.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{slice.impact}</p>
                  </div>
                  <ol className="grid grid-cols-2 border border-slate-800 sm:grid-cols-5 lg:col-span-9">
                    {slice.path.map((step, stepIndex) => (
                      <li key={step} className="relative min-h-20 border-b border-r border-slate-800 p-3 even:border-r-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                        <span className="font-mono text-[9px] text-orange-400">{String(stepIndex + 1).padStart(2, '0')}</span>
                        <p className="mt-2 text-xs leading-5 text-slate-300">{step}</p>
                        {stepIndex < slice.path.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 bg-[#0d0b09] p-1 text-amber-700 sm:block" aria-hidden="true" />}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-amber-950/50 bg-[#0d0b09]">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
              <div className="lg:sticky lg:top-24">
                <p className="font-mono text-xs uppercase text-orange-400">Delivery record</p>
                <h2 className="mt-3 text-2xl font-extrabold text-slate-100 sm:text-3xl">Four chapters of the same reliability problem.</h2>
                <div className="mt-7 flex gap-2 overflow-x-auto border-y border-slate-800 py-2 lg:block lg:space-y-2 lg:overflow-visible lg:border lg:p-2">
                  {chapters.map((chapter, index) => {
                    const Icon = chapter.icon;
                    const isActive = index === activeChapterIndex;
                    return (
                      <button
                        key={chapter.index}
                        type="button"
                        onClick={() => setActiveChapterIndex(index)}
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

              <article className="relative overflow-hidden border border-slate-800 bg-[#0a0806] p-5 sm:p-7 md:p-8">
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

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {activeChapter.evidence.map((item, index) => (
                      <div key={item} className="border border-slate-800 bg-black/20 p-3">
                        <p className="font-mono text-[10px] uppercase text-slate-600">Evidence {index + 1}</p>
                        <p className="mt-3 text-sm font-semibold leading-snug text-slate-200">{item}</p>
                      </div>
                    ))}
                  </div>

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
              <p className="font-mono text-xs uppercase text-orange-400">Technical design 03</p>
              <h2 id="payout-design-title" className="mt-3 text-2xl font-extrabold text-slate-100 sm:text-3xl">Bounded payout execution.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">The optimization treated throughput and database stability as one design constraint. Smaller resumable units reduced broad scans and made load easier to control.</p>
              <div className="mt-7 border-l border-amber-900/60 pl-5">
                <Gauge className="h-5 w-5 text-orange-400" aria-hidden="true" />
                <p className="mt-3 text-xl font-bold text-slate-100">500 records per batch</p>
                <p className="mt-1 text-sm text-slate-500">with cursor progression and deliberate pacing</p>
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

        <section className="border-t border-slate-900">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-4 py-12 md:px-8 md:py-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Confidentiality</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-100">Technical depth without exposing private systems.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">This case study focuses on the problems solved, systems built, and production results. Source code, internal topology, customer information, credentials, and operational secrets remain private.</p>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-slate-800 lg:pl-8">
              {[['Covered', 'Architecture, migrations, tests, scheduled jobs, integrations, and deployment workflows.'], ['Protected', 'Source code, customer data, internal endpoints, credentials, and operational details.']].map(([label, copy]) => (
                <div key={label} className="flex gap-3 py-3 first:pt-0">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                  <p className="text-sm leading-6 text-slate-500"><strong className="text-slate-300">{label}:</strong> {copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <NextRead
            title="Explore the architecture room"
            description="After the Konga deep dive, compare the recurring safeguards behind payments, identity, logistics, rewards, and communications."
            href="/systems"
            cta="Open systems"
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
