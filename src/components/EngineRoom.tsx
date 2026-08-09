import React, { useRef, useState } from 'react';
import { Network, Database, RefreshCw, Cpu, CheckCircle, Radio, Globe, Shield, CreditCard, Truck } from 'lucide-react';

interface Step {
  title: string;
  desc: string;
  status: 'active' | 'success' | 'pending';
}

type TabKey = 'payout' | 'sync' | 'tripease' | 'xxolcare' | 'radionews' | 'transglobal';

export default function EngineRoom() {
  const [activeTab, setActiveTab] = useState<TabKey>('payout');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const payoutSteps: Step[] = [
    { title: 'Trigger Daemon', desc: 'Background cron starts execution on order delivery confirmation.', status: 'success' },
    { title: 'Batch Query (Cursor)', desc: 'Fetch escrow records in cursor-offset pages of 500 records rather than full scans.', status: 'active' },
    { title: 'Microsecond Delay', desc: 'Introduces a programmatic delay (usleep) between batches to prevent DB CPU spikes.', status: 'pending' },
    { title: 'KYC Token Refresh', desc: 'Hits Dojah API; triggers single-retry token bypass automatically if token has expired.', status: 'pending' },
    { title: 'Batch Release', desc: 'Safely commits wallet settlements twice as fast without locking database tables.', status: 'pending' }
  ];

  const syncSteps: Step[] = [
    { title: 'File Watcher', desc: 'Scans workspace directories and hashes files to identify modifications.', status: 'success' },
    { title: 'Isolate Changed Files', desc: 'Extracts changed files only, excluding local files in .gitignore and config configurations.', status: 'active' },
    { title: 'Staging Env Patch', desc: 'Safely reserves local environmental settings and credentials.', status: 'pending' },
    { title: 'Deploy Sync Run', desc: 'Transfers only the isolated file list, cutting deployment transmission times by 50%.', status: 'pending' }
  ];

  const tripeaseSteps: Step[] = [
    { title: 'API Gateway Ingress', desc: 'Visitor/driver requests arrive at the centralized gateway (Docker runtime).', status: 'success' },
    { title: 'Auth Service Check', desc: 'Validates JWT session credentials against the centralized auth microservice.', status: 'active' },
    { title: 'Router Delegation', desc: 'Forwards verified requests to trip-ease-companies-service or transport-service.', status: 'pending' },
    { title: 'Multi-Tenant Isolation', desc: 'Separates database pool tenants via tenancy middleware headers.', status: 'pending' }
  ];

  const xxolcareSteps: Step[] = [
    { title: 'Booking Request', desc: 'Client submits care hospitality booking with service type (Cleaning, Chauffeur, Chef).', status: 'success' },
    { title: 'reCAPTCHA + Honeypot', desc: 'Google reCAPTCHA v2 and honeypot fields validate the request is human-originated.', status: 'success' },
    { title: 'Dynamic Pricing Engine', desc: 'Applies iterative cost multipliers (25%, 35%, 50%) based on service tier and operational costs.', status: 'active' },
    { title: 'Paystack Payment', desc: 'Processes payment via Paystack gateway webhooks with verification callbacks.', status: 'pending' },
    { title: 'Queue Bypass Notify', desc: 'Sends transaction notifications via in-memory variables to bypass worker queue choke-points.', status: 'pending' },
    { title: 'Staff Allocation', desc: 'Admin console assigns verified staff via Livewire selection routing.', status: 'pending' }
  ];

  const radionewsSteps: Step[] = [
    { title: 'Article Authoring', desc: 'Editors create articles with media uploads, tags, and trending/top story flags via Filament.', status: 'success' },
    { title: 'Spatie Role Gate', desc: 'Role-based permissions (Admin, Editor, Moderator, Viewer) control publish/moderate actions.', status: 'success' },
    { title: 'Daily.co Room Spin-up', desc: 'Admin triggers WebRTC video room creation via Daily.co API with moderator tokens.', status: 'active' },
    { title: 'Webhook Chat Logger', desc: 'Webhook dispatcher parses video call chat events and logs participant messages in DB.', status: 'pending' },
    { title: 'SEO Feed Generation', desc: 'Automated dynamic sitemaps (/sitemap.xml) and RSS feeds (/feed) generated on publish.', status: 'pending' }
  ];

  const transglobalSteps: Step[] = [
    { title: 'Full-Stack Architecture', desc: 'Designed & built both platforms from scratch: Cargo Booking Portal (Frontend) & Transglobal Backyard (API Core).', status: 'success' },
    { title: 'Sabre Tariff Matrix', desc: 'Auto-seeds custom international weight-tiered price brackets, self-healing missing Country/Location DB relations on the fly.', status: 'success' },
    { title: 'Paystack DVA Core', desc: 'Allocates partner bank accounts via Paystack Webhooks with first/last name splitting and auto-retry fallbacks.', status: 'active' },
    { title: 'SeerBit Secure Exchange', desc: 'Secures SeerBit checkout gateway connection utilizing dynamic Bearer token-exchange handshakes.', status: 'pending' },
    { title: 'HMAC Webhook Sync', desc: 'Validates SHA-512 webhook signatures, updating shipment/waybill tracking status across system boundaries.', status: 'pending' },
    { title: 'NPS Feedback Schedulers', desc: 'Console crons automatically sending rating requests 24h post-delivery with partner exclusion rules.', status: 'pending' }
  ];

  const getSteps = () => {
    switch (activeTab) {
      case 'payout': return payoutSteps;
      case 'sync': return syncSteps;
      case 'tripease': return tripeaseSteps;
      case 'xxolcare': return xxolcareSteps;
      case 'radionews': return radionewsSteps;
      case 'transglobal': return transglobalSteps;
    }
  };

  const tabConfig: { key: TabKey; label: string; shortLabel: string }[] = [
    { key: 'payout', label: 'Konga Escrow Payouts', shortLabel: 'Payouts' },
    { key: 'sync', label: 'Lextorah Smart Sync', shortLabel: 'Sync' },
    { key: 'tripease', label: 'TripEase Microservices', shortLabel: 'Services' },
    { key: 'xxolcare', label: 'Xxolcare Bookings', shortLabel: 'Bookings' },
    { key: 'radionews', label: 'Radio News CMS', shortLabel: 'Broadcast' },
    { key: 'transglobal', label: 'Transglobal × Sabre', shortLabel: 'Logistics' },
  ];

  const getActiveStepColor = () => {
    switch (activeTab) {
      case 'payout': return 'border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.1)]';
      default: return 'border-orange-500/50';
    }
  };

  const getSpinnerColor = () => {
    switch (activeTab) {
      case 'payout': return 'text-orange-400';
      default: return 'text-orange-400';
    }
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabConfig.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabConfig.length) % tabConfig.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabConfig.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabConfig[nextIndex];
    setActiveTab(nextTab.key);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="border-y border-amber-950/60 py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end mb-8">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase text-orange-400 flex items-center gap-2">
            <Network className="w-4 h-4" />
            Interactive systems study
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100">Open the Engine Room.</h2>
        </div>
        <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">
          Choose a system and trace one request through its operational decisions.
        </p>
      </div>

      <div role="tablist" aria-label="Architecture studies" className="grid grid-cols-3 md:grid-cols-6 border border-slate-800 mb-8 overflow-x-auto">
        {tabConfig.map((tab, index) => (
          <button
            key={tab.key}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`engine-room-tab-${tab.key}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls="engine-room-panel"
            tabIndex={activeTab === tab.key ? 0 : -1}
            onClick={() => setActiveTab(tab.key)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            className={`min-h-14 px-3 py-2 border-r border-b md:border-b-0 border-slate-800 text-left cursor-pointer transition-colors ${activeTab === tab.key ? 'bg-orange-500 text-[#0a0806]' : 'bg-[#0d0a07] text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
          >
            <span className="block font-mono text-[10px] opacity-70">0{index + 1}</span>
            <span className="block text-xs font-bold">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      <div
        id="engine-room-panel"
        role="tabpanel"
        aria-labelledby={`engine-room-tab-${activeTab}`}
        tabIndex={0}
        className="grid grid-cols-1 md:grid-cols-5 gap-8"
      >
        <h3 className="sr-only">{tabConfig.find((tab) => tab.key === activeTab)?.label}</h3>
        {/* Step Flow List */}
        <div className="md:col-span-2 divide-y divide-slate-800 border-y border-slate-800 font-mono text-xs">
          {getSteps().map((step, idx) => (
            <div 
              key={idx} 
              className={`py-4 px-2 border-l-2 transition-all ${step.status === 'active' ? `bg-orange-500/5 ${getActiveStepColor()}` : step.status === 'success' ? 'border-emerald-700/50 text-slate-300' : 'border-transparent text-slate-500'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">{idx + 1}. {step.title}</span>
                {step.status === 'success' && <CheckCircle className="w-3 h-3 text-slate-500" />}
                {step.status === 'active' && <RefreshCw className={`w-3 h-3 ${getSpinnerColor()} animate-spin`} />}
              </div>
              <p className="text-xs leading-relaxed font-sans text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Architectural Diagram Block */}
        <div className="md:col-span-3 bg-[#0d0a07] border border-slate-800 p-5 flex flex-col justify-between font-mono text-xs min-h-[280px] relative">
          <div className="absolute top-0 right-0 px-3 py-1 border-l border-b border-slate-800 text-slate-500 text-[10px]">
            LIVE MODEL / {activeTab.toUpperCase()}
          </div>
          <div className="text-slate-400 uppercase text-xs mb-4">
            Request path
          </div>

          <div className="flex flex-col items-center justify-center flex-1 py-4">
            {activeTab === 'payout' && (
              <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded">
                  <Database className="w-3 h-3 text-slate-300" />
                  <span>Konga MySQL DB</span>
                </div>
                <div className="w-0.5 h-6 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-orange-500/50 rounded shadow-[0_0_8px_rgba(249,115,22,0.1)]">
                  <Cpu className="w-3 h-3 text-orange-400 animate-pulse" />
                  <span>Payout Daemon (offset loop)</span>
                </div>
                <div className="w-0.5 h-6 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Dojah KYC & Escrow release</span>
                </div>
              </div>
            )}

            {activeTab === 'sync' && (
              <div className="flex items-center justify-between w-full max-w-xs gap-4 relative">
                <div className="flex flex-col items-center gap-1">
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Local Workspace</div>
                  <span className="text-[8px] text-slate-500">1,240 files</span>
                </div>

                <div className="flex-1 h-0.5 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute px-1 bg-slate-950 border border-slate-800 text-[8px] rounded text-slate-300">
                    Smart-sync filter
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="px-2 py-1 bg-slate-900 border border-orange-500/50 rounded">Staging Server</div>
                  <span className="text-[8px] text-slate-300">12 updated files</span>
                </div>
              </div>
            )}

            {activeTab === 'tripease' && (
              <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <div className="px-2 py-1 bg-slate-900 border border-slate-850 rounded">
                  Driver Mobile Client
                </div>
                <div className="w-0.5 h-5 bg-slate-850" />
                <div className="px-2 py-1.5 bg-slate-900 border border-emerald-500/40 rounded shadow-md">
                  VMS Docker Gateway Router
                </div>
                <div className="flex justify-between w-full max-w-xs mt-2 relative">
                  <div className="w-0.5 h-6 bg-slate-850 absolute left-4" />
                  <div className="w-0.5 h-6 bg-slate-850 absolute right-4" />
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded mt-5">
                    Auth service
                  </div>
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded mt-5">
                    Transport service
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'xxolcare' && (
              <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded">
                  <Globe className="w-3 h-3 text-orange-400" />
                  <span>Client Booking Form</span>
                </div>
                <div className="w-0.5 h-5 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-orange-500/50 rounded shadow-[0_0_8px_rgba(20,184,166,0.1)]">
                  <Shield className="w-3 h-3 text-orange-400 animate-pulse" />
                  <span>reCAPTCHA + Honeypot Gate</span>
                </div>
                <div className="w-0.5 h-5 bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 rounded">
                    <CreditCard className="w-3 h-3 text-amber-400" />
                    <span>Paystack</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 rounded">
                    <Cpu className="w-3 h-3 text-orange-400" />
                    <span>Dynamic Pricing</span>
                  </div>
                </div>
                <div className="w-0.5 h-5 bg-slate-800" />
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Staff Allocation (Livewire)</span>
                </div>
              </div>
            )}

            {activeTab === 'radionews' && (
              <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-orange-500/50 rounded shadow-[0_0_8px_rgba(236,72,153,0.1)]">
                  <Radio className="w-3 h-3 text-orange-400 animate-pulse" />
                  <span>Filament CMS Dashboard</span>
                </div>
                <div className="flex gap-6 mt-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-0.5 h-5 bg-slate-800" />
                    <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-center">
                      <span className="text-orange-400">Articles</span>
                      <div className="text-[8px] text-slate-500">Revisions + SEO</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-0.5 h-5 bg-slate-800" />
                    <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-center">
                      <span className="text-slate-300">Daily.co</span>
                      <div className="text-[8px] text-slate-500">WebRTC Rooms</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-0.5 h-5 bg-slate-800" />
                    <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-center">
                      <span className="text-amber-400">Analytics</span>
                      <div className="text-[8px] text-slate-500">Live stream</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-0.5 bg-slate-800 mt-2 relative flex items-center justify-center">
                  <div className="absolute px-1 bg-slate-950 border border-orange-500/30 text-[8px] rounded text-orange-400">
                    Spatie Role Gates
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-slate-400">/sitemap.xml</span>
                  </div>
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">
                    <span className="text-slate-400">/feed (RSS)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transglobal' && (
              <div className="flex flex-col justify-between h-full w-full gap-3 py-1">
                {/* Visual Flow Diagram */}
                <div className="relative flex flex-col gap-4 w-full">
                  {/* Top Row: User ➔ Cargo Portal ➔ Backyard API */}
                  <div className="flex items-center justify-between w-full relative">
                    {/* User / Partner */}
                    <div className="flex flex-col items-center z-10 w-24">
                      <div className="px-2 py-1 bg-[#141110] border border-slate-800 rounded text-center w-full">
                        <span className="text-[8px] text-slate-400 font-bold uppercase">Client / Partner</span>
                        <div className="text-[7px] text-slate-500 mt-0.5">Schedules Shipment</div>
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute left-[96px] right-[210px] h-0.5 bg-orange-500/20 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <span className="text-[6px] text-orange-500/60 font-mono">POST</span>
                    </div>

                    {/* Cargo Booking Portal */}
                    <div className="flex flex-col items-center z-10 w-28">
                      <div className="px-2 py-1 bg-slate-900 border border-orange-500/30 rounded text-center w-full">
                        <span className="text-[8px] text-orange-400 font-bold uppercase">Cargo Portal</span>
                        <div className="text-[7px] text-slate-500 mt-0.5">Waybill & SeerBit IPN</div>
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute right-[112px] left-[208px] h-0.5 bg-orange-500/20 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <span className="text-[6px] text-slate-400/60 font-mono">REST API</span>
                    </div>

                    {/* Transglobal API Hub */}
                    <div className="flex flex-col items-center z-10 w-28">
                      <div className="px-2 py-1 bg-slate-900 border border-orange-500/30 rounded text-center w-full">
                        <span className="text-[8px] text-slate-300 font-bold uppercase">Backyard API</span>
                        <div className="text-[7px] text-slate-500 mt-0.5">Sabre Tariffs & DVA</div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Row: Payment gateways */}
                  <div className="flex items-center justify-around w-full py-1">
                    <div className="flex flex-col items-center">
                      <div className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[7px] text-slate-400">
                        SeerBit Handshake
                      </div>
                      <span className="text-[6px] text-slate-600">Bearer Token exchange</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[7px] text-slate-400">
                        Paystack DVA Core
                      </div>
                      <span className="text-[6px] text-slate-600">Auto Name-Split & Retry</span>
                    </div>
                  </div>

                  {/* Bottom Row: Webhook Sync from Hub to Portal */}
                  <div className="relative flex items-center justify-between w-full">
                    {/* Webhook Controller */}
                    <div className="flex flex-col items-center z-10 w-28">
                      <div className="px-2 py-1 bg-slate-900 border border-orange-500/30 rounded text-center w-full">
                        <span className="text-[8px] text-orange-400 font-bold uppercase">HMAC Webhook</span>
                        <div className="text-[7px] text-slate-500 mt-0.5">Verifies SHA-512</div>
                      </div>
                    </div>

                    {/* Connection Line (Right to Left) */}
                    <div className="absolute right-[112px] left-[112px] h-0.5 bg-emerald-500/20 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="text-[7px] text-emerald-400/80 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                        <span>◀</span><span>Waybill DB Sync</span>
                      </div>
                    </div>

                    {/* Downstream Waybill Database */}
                    <div className="flex flex-col items-center z-10 w-28">
                      <div className="px-2 py-1 bg-slate-900 border border-emerald-500/30 rounded text-center w-full">
                        <span className="text-[8px] text-emerald-400 font-bold uppercase">Waybill DB</span>
                        <div className="text-[7px] text-slate-500 mt-0.5">Prints & Updates DB</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connectivity Pattern explanation */}
                <div className="text-[8px] text-slate-500 bg-slate-950/40 p-2 border border-slate-900 rounded leading-normal">
                  <span className="text-orange-400 font-bold uppercase">Connection Workflow:</span> The client schedules shipping via the <span className="text-slate-300">Cargo Booking Portal</span>. The booking triggers a tariff computation against the Sabre Matrix in the <span className="text-slate-300">Backyard API</span>. Payment is processed using Paystack DVA/SeerBit handshakes. Upon confirmation, a webhook fires to the Backyard engine, which verifies the signature via SHA-512 and dispatches updates back to the Cargo waybill database to unlock printing.
                </div>
              </div>
            )}
          </div>

          <div className="text-[9px] text-slate-500 leading-normal border-t border-slate-900 pt-2">
            {activeTab === 'payout' && (
              <span className="text-orange-400/80">Result: Prevented DB lock failures. Escrow releases processed 2x faster without CPU spikes.</span>
            )}
            {activeTab === 'sync' && (
              <span className="text-slate-300/80">Result: Slashing staging deployment transfer cycles by 50% while preserving environment settings.</span>
            )}
            {activeTab === 'tripease' && (
              <span className="text-emerald-400/80">Result: Secure, containerized microservices routing with isolated multi-tenant database pools.</span>
            )}
            {activeTab === 'xxolcare' && (
              <span className="text-orange-400/80">Result: Eliminated bot signups, enabled dynamic pricing adjustments, and bypassed queue bottlenecks for instant notifications.</span>
            )}
            {activeTab === 'radionews' && (
              <span className="text-orange-400/80">Result: Full CMS with role-gated publishing, embedded WebRTC conferencing, and automated SEO discovery feeds.</span>
            )}
            {activeTab === 'transglobal' && (
              <span className="text-orange-400/80">Result: Self-healing tariff seeding with multi-gateway payment processing and HMAC-secured webhook synchronization.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
