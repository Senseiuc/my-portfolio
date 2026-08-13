import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  CircuitBoard,
  Network,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

type FlowKey = 'payout' | 'identity' | 'tripease' | 'golden-attic' | 'transglobal' | 'ansar';

interface SystemFlow {
  key: FlowKey;
  label: string;
  shortLabel: string;
  context: string;
  trigger: string;
  steps: Array<{ title: string; detail: string }>;
  safeguard: string;
  outcome: string;
  stack: string[];
}

const flows: SystemFlow[] = [
  {
    key: 'payout',
    label: 'Konga payout processing',
    shortLabel: 'Payouts',
    context: 'Scheduled merchant money movement across a high-volume commerce platform.',
    trigger: 'A scheduled payout run finds escrow records that are eligible for release.',
    steps: [
      { title: 'Select eligible records', detail: 'Query the payout workload from the current processing position.' },
      { title: 'Read a bounded batch', detail: 'Load no more than 500 records instead of scanning the full workload at once.' },
      { title: 'Process releases', detail: 'Apply wallet and settlement rules to each eligible record.' },
      { title: 'Pace database demand', detail: 'Pause briefly between batches to prevent sustained CPU and database pressure.' },
      { title: 'Advance the cursor', detail: 'Persist progress and continue from the next offset until the run is complete.' },
    ],
    safeguard: 'Bounded batches, cursor-based progress, controlled pacing, and recoverable background processing.',
    outcome: 'Payout execution time was reduced by half without introducing database locking spikes.',
    stack: ['PHP', 'Yii 1.1', 'MySQL', 'Redis', 'Cron', 'Kubernetes'],
  },
  {
    key: 'identity',
    label: 'Konga merchant identity',
    shortLabel: 'Identity',
    context: 'Merchant verification spanning SellerHQ, identity services, an external provider, and operations review.',
    trigger: 'A merchant submits identity information from the onboarding or compliance workflow.',
    steps: [
      { title: 'Validate submission', detail: 'Check required merchant and identity fields before making an external request.' },
      { title: 'Request verification', detail: 'Send the verification request through the Node.js identity service to Dojah.' },
      { title: 'Handle provider response', detail: 'Normalize success, rejection, token, and service failure states.' },
      { title: 'Persist the decision', detail: 'Store the verification outcome for downstream compliance and merchant workflows.' },
      { title: 'Expose review state', detail: 'Return an actionable status to merchant and administration interfaces.' },
    ],
    safeguard: 'Environment-driven provider configuration, controlled token handling, validation, and regression coverage around authentication.',
    outcome: 'Identity checks became part of a traceable merchant compliance workflow across frontend, backend, and operations surfaces.',
    stack: ['AngularJS', 'TypeScript', 'Node.js', 'Restify', 'Dojah API', 'MySQL'],
  },
  {
    key: 'tripease',
    label: 'TripEase escrow ledger',
    shortLabel: 'Escrow',
    context: 'A booking workflow coordinated across independently versioned transit services.',
    trigger: 'A verified payment or booking adjustment requests a wallet mutation.',
    steps: [
      { title: 'Authenticate the request', detail: 'Resolve the actor through the dedicated authentication service.' },
      { title: 'Resolve trip context', detail: 'Load company, route, schedule, and booking data from their service boundaries.' },
      { title: 'Check the reference', detail: 'Reject a repeated payment or adjustment using its idempotency reference.' },
      { title: 'Lock the wallet row', detail: 'Apply the mutation inside a database transaction using row-level locking.' },
      { title: 'Commit or retry', detail: 'Commit the ledger entry or retry a detected deadlock up to five times.' },
    ],
    safeguard: 'Reference idempotency, database transactions, row locks, and bounded deadlock retries.',
    outcome: 'Concurrent wallet actions remain consistent while duplicate callbacks cannot create duplicate ledger entries.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Docker', 'Paystack', 'Flutterwave'],
  },
  {
    key: 'golden-attic',
    label: 'Golden Attic rewards',
    shortLabel: 'Rewards',
    context: 'Dual-currency wallet and commission processing on a modernized community commerce platform.',
    trigger: 'A qualifying marketplace or referral event creates a reward or commission workload.',
    steps: [
      { title: 'Record the source event', detail: 'Capture the qualifying order, referral, or network activity.' },
      { title: 'Queue the workload', detail: 'Move reward and commission processing away from the synchronous request path.' },
      { title: 'Calculate entitlement', detail: 'Apply the relevant wallet, currency, and network rules.' },
      { title: 'Write ledger entries', detail: 'Update the correct cash, shopping, or investment wallet with exact arithmetic.' },
      { title: 'Expose the result', detail: 'Make the transaction available to member, seller, and administration workflows.' },
    ],
    safeguard: 'Queued execution, spendable-balance holds, hashed transaction records, and controlled wallet adjustments.',
    outcome: 'Queued rewards reduced server overhead by 35%, while settlement improvements made processing 40% faster.',
    stack: ['Laravel 11', 'PHP', 'MySQL', 'Redis', 'Docker', 'CI'],
  },
  {
    key: 'transglobal',
    label: 'Transglobal shipment integration',
    shortLabel: 'Logistics',
    context: 'Shipment booking coordinated between the Cargo portal, Backyard API, tariffs, payments, and tracking.',
    trigger: 'A customer or partner submits an international shipment booking.',
    steps: [
      { title: 'Resolve the tariff', detail: 'Match origin, destination, and weight against the imported Sabre tariff structure.' },
      { title: 'Create the booking', detail: 'Persist shipment and customer data through the connected booking platform.' },
      { title: 'Initiate payment', detail: 'Start the configured SeerBit or Paystack payment workflow.' },
      { title: 'Verify the callback', detail: 'Validate the incoming payment or shipment webhook signature.' },
      { title: 'Synchronize status', detail: 'Update waybill and shipment state across the Cargo portal and Backyard API.' },
    ],
    safeguard: 'Signed webhook verification, payment confirmation, retry-aware integrations, and scheduled follow-up jobs.',
    outcome: 'Two connected applications coordinate tariffs, payments, waybills, and shipment updates through explicit integration boundaries.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Sabre', 'SeerBit', 'Paystack'],
  },
  {
    key: 'ansar',
    label: 'Ansar-Ud-Deen communications',
    shortLabel: 'Comms',
    context: 'Governed content and communications shared by web, administration, and mobile clients.',
    trigger: 'An administrator publishes content or starts a member communication workflow.',
    steps: [
      { title: 'Authorize the action', detail: 'Apply API authentication and administration rules before accepting the change.' },
      { title: 'Persist governed content', detail: 'Write the approved record through NestJS and Prisma to PostgreSQL.' },
      { title: 'Invalidate stale cache', detail: 'Clear affected Redis keys so clients do not receive outdated content.' },
      { title: 'Queue communications', detail: 'Hand email, SMS, or push work to the BullMQ processing foundation.' },
      { title: 'Serve connected clients', detail: 'Expose the current state to the Next.js website, CMS, and Flutter application.' },
    ],
    safeguard: 'Role-aware API boundaries, migrations, queued work, cache invalidation, Sentry instrumentation, and recovery runbooks.',
    outcome: 'Web, API, administration, and mobile delivery operate from one governed platform with repeatable deployment targets.',
    stack: ['NestJS', 'Next.js', 'Flutter', 'PostgreSQL', 'Redis', 'BullMQ'],
  },
];

export default function EngineRoom() {
  const [activeKey, setActiveKey] = useState<FlowKey>('payout');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const activeFlow = flows.find((flow) => flow.key === activeKey) ?? flows[0];

  const selectFlow = (key: FlowKey) => {
    setActiveKey(key);
    window.requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % flows.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + flows.length) % flows.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = flows.length - 1;
    else return;

    event.preventDefault();
    selectFlow(flows[nextIndex].key);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="border-y border-amber-950/60 py-8 md:py-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end mb-8">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase text-orange-400 flex items-center gap-2">
            <Network className="w-4 h-4" />
            Interactive architecture walkthrough
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100">Inside the Systems</h2>
        </div>
        <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">
          Explore the workflows, boundaries, safeguards, and operational decisions behind selected systems.
        </p>
      </div>

      <div role="tablist" aria-label="System architecture walkthroughs" className="sticky top-20 z-20 mb-8 grid grid-cols-2 border border-slate-800 bg-[#0a0806]/95 backdrop-blur md:grid-cols-6 lg:top-24">
        {flows.map((flow, index) => (
          <button
            key={flow.key}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`engine-room-tab-${flow.key}`}
            type="button"
            role="tab"
            aria-selected={activeKey === flow.key}
            aria-controls="engine-room-panel"
            tabIndex={activeKey === flow.key ? 0 : -1}
            onClick={() => selectFlow(flow.key)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            className={`min-h-16 px-3 py-2 border-r border-b md:border-b-0 border-slate-800 text-left cursor-pointer transition-colors ${activeKey === flow.key ? 'bg-orange-500 text-[#0a0806]' : 'bg-[#0d0a07] text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
          >
            <span className="block font-mono text-[10px] opacity-70">0{index + 1}</span>
            <span className="block text-xs font-bold">{flow.shortLabel}</span>
          </button>
        ))}
      </div>

      <div
        id="engine-room-panel"
        ref={panelRef}
        role="tabpanel"
        aria-labelledby={`engine-room-tab-${activeKey}`}
        tabIndex={0}
        className="grid scroll-mt-56 grid-cols-1 gap-8 md:scroll-mt-44 lg:grid-cols-12 lg:scroll-mt-32"
      >
        <div className="lg:col-span-4">
          <p className="font-mono text-[10px] uppercase text-orange-400">Selected workflow</p>
          <h3 className="mt-2 text-xl font-bold text-slate-100">{activeFlow.label}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{activeFlow.context}</p>

          <div className="mt-6 border-l-2 border-orange-500/60 pl-4">
            <p className="font-mono text-[10px] uppercase text-slate-500">Trigger</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{activeFlow.trigger}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {activeFlow.stack.map((technology) => (
              <span key={technology} className="border border-slate-800 bg-[#0d0a07] px-2 py-1 font-mono text-[10px] text-slate-400">
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 border border-slate-800 bg-[#0d0a07] p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <CircuitBoard className="h-4 w-4 text-orange-400" />
              <span className="font-mono text-[10px] uppercase">System flow</span>
            </div>
            <span className="font-mono text-[10px] text-slate-600">{activeFlow.steps.length} stages</span>
          </div>

          <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {activeFlow.steps.map((step, index) => (
              <li key={step.title} className={`relative border border-slate-800 p-4 ${index === activeFlow.steps.length - 1 ? 'sm:col-span-2' : ''}`}>
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-orange-500/40 bg-orange-500/5 font-mono text-[10px] text-orange-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.detail}</p>
                  </div>
                </div>
                {index < activeFlow.steps.length - 1 && (
                  <ArrowRight className="absolute -bottom-2.5 right-4 z-10 h-5 w-5 bg-[#0d0a07] p-1 text-slate-600 sm:hidden" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-5 grid grid-cols-1 border-t border-slate-800 md:grid-cols-2">
            <div className="py-5 md:pr-5 md:border-r md:border-slate-800">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Safeguards
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{activeFlow.safeguard}</p>
            </div>
            <div className="pt-5 md:pl-5">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-orange-400" /> Outcome
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{activeFlow.outcome}</p>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2 border-t border-slate-900 pt-4 font-mono text-[9px] uppercase text-slate-600">
            <Wrench className="h-3 w-3" /> Shipped architecture
          </div>
        </div>
      </div>
    </div>
  );
}
