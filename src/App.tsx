import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  Mail, 
  Github, 
  Linkedin, 
  Gitlab,
  Briefcase, 
  Calendar,
  Send,
  CheckCircle2,
  ArrowRight,
  FileText
} from 'lucide-react';
import EngineRoom from './components/EngineRoom';
import Logo from './components/Logo';
import ChatWidget from './components/ChatWidget';
import Mascot from './components/Mascot';

const Terminal = lazy(() => import('./components/Terminal'));
const MetricsMonitor = lazy(() => import('./components/MetricsMonitor'));
const GitStats = lazy(() => import('./components/GitStats'));

const PROJECTS = [
  {
    id: 'xxolcare',
    number: '01',
    category: 'Care Hospitality',
    title: 'Xxolcare Booking Portal',
    shortDesc: 'Designed care hospitality booking algorithms, integrated Paystack payment gateway webhooks, and automated cPanel Git deployment pipelines with optimized mail dispatch routing.',
    tags: ['Laravel', 'Paystack API', 'Docker'],
    borderColor: 'hover:border-teal-500/30',
    hoverText: 'group-hover:text-teal-400',
    accentColor: 'text-teal-400',
    link: 'https://xxolcare.com',
    details: {
      url: 'https://xxolcare.com',
      system: 'Hospitality Management Engine',
      contributions: [
        'Staff QR System: Built a dynamic digital business card and QR code generation node.',
        'Manual Cost Adjustments: Applied iterative service pricing increases (25%, 35%, 50%) to adjust billing in response to operational cost pressures.',
        'Variable Queue Optimization: Re-engineered transaction notifications using in-memory variables to bypass worker queue choke-points.',
        'Bot Prevention: Integrated Google reCAPTCHA verification and honeypot field traps to block automated signup requests.',
        'Admin Operations Console: Programmed dashboards managing financial ledgers, onboarding document verifications, and manual staff allocations.',
        'Flipped Analytics Audit: Diagnosed and resolved a critical logic error in monthly finance calculations (swapped array pushes) that caused fake deficit reports.',
        'Ancillary Staffing Engine: Developed Livewire components and selection routing for Chauffeur Drivers and Personal Chefs alongside cleaning profiles.',
        'Training Sandbox: Created a replica staging environment for staff onboarding training before production access.',
        'Automated Deployment: Configured cPanel Git auto-deploy pipeline copying application files to production on push.'
      ],
      commits: [
        '6a83855 feat: add optional website/address fields to staff card',
        '9c5d8e8 feat: add QR code digital business card system for staff',
        '55798e1 fix admin jobs display',
        '38e0230 schedules',
        '32bf5f4 increased cost by 50%',
        '314d436 sms issue fixed',
        'ba7b3b2 test without queue - using variables'
      ]
    }
  },
  {
    id: 'lextorah',
    number: '02',
    category: 'AI Learning Platforms',
    title: 'Lextorah Educational Ecosystem',
    shortDesc: 'A unified educational platform combining a Laravel LMS for student registrations and course sprint scheduling with a FastAPI/React AI tutoring agent, media whisper transcriber, and portal support chatbot.',
    tags: ['FastAPI', 'Laravel', 'React'],
    borderColor: 'hover:border-orange-500/30',
    hoverText: 'group-hover:text-orange-400',
    accentColor: 'text-orange-400',
    link: 'https://lextorah-elearning.com/',
    details: {
      url: 'https://www.lextorah.ai/',
      system: 'Learning Management System & AI Tutor Portal',
      contributions: [
        'AI Portal Sync & Deployments: Configured Docker deployment files, engineered a git-diff based smart sync script, and developed a Node-based static analyzer (audit_sync.js) to automate copying files from upstream while verifying casing and route prefix rules.',
        'AI Portal Error Corrections: Debugged and fixed critical runtime/build errors in the FastAPI/React code (e.g. lazy-loading Whisper model to prevent startup crashes, correcting case-sensitive asset paths, standardizing client-side API prefixes, and replacing deprecated agent functions with LangGraph create_react_agent).',
        'Support Chat Widget Integration: Deployed a floating, responsive AI assistant widget ("Ms. Lexi") into the legacy PHP portal templates (footer.php, chat-widget.js, chat-widget.css), implementing browser-based guest sessions and typing states communicating with the FastAPI backend.',
        'LMS Sprints & Timetables: Implemented course sprint scheduling modules, student enrollment selectors, and a master timetable grid with overlap checks to prevent tutor double-booking.',
        'AI Tutor JWT Bridge API: Deployed a Laravel-based JWT authentication gateway (/aitutor-login) validating active subscriptions and forwarding user roles to the FastAPI portal.',
        'Cart, Discount & Checkout: Debugged registration shopping carts, added coupon/tuition discount multipliers, and refactored the Paystack payment verification flow.',
        'reCAPTCHA Registration Guard: Rebuilt foreign exam registration pages (SAT, PTE, TOEFL) with Google reCAPTCHA v2 validations to block spambots.'
      ],
      commits: [
        '94ae637 build(governance): add smart sync script (AI Portal)',
        'ee3d70f fix(backend): replace deprecated create_agent with langgraph create_react_agent (AI Portal)',
        '86ab97e feat: add sprint schedule relations to auth payload (ap/laravel)',
        '4965946 feat: email implementation for student alerts (elearning/main)',
        '8ca21c4 feat: auto schedule calendar build & collision checks (elearning/main)',
        'e808cfb refactor: payment system cart checkout flow (elearning/main)',
        'f1a4109 refactor: modify registration page validations & popups (elearning/main)'
      ]
    }
  },
  {
    id: 'tripease',
    number: '03',
    category: 'Transit Booking',
    title: 'TripEase Logistics Router',
    shortDesc: 'A distributed transit scheduling, seat booking, and fleet routing ecosystem built across separate Laravel microservices managing escrow ledger wallets and payment gateways.',
    tags: ['PHP', 'Laravel', 'Docker', 'Microservices'],
    borderColor: 'hover:border-indigo-500/30',
    hoverText: 'group-hover:text-indigo-400',
    accentColor: 'text-indigo-400',
    link: null,
    details: {
      url: null,
      system: 'Distributed Microservices Logistics System',
      role: 'System architect and backend engineer across four independently versioned Laravel services.',
      constraints: 'Independent service ownership, duplicate payment callbacks, concurrent wallet mutations, and multi-leg journey discovery.',
      architecture: ['Auth', 'Companies + route graph', 'Payments', 'Transport + escrow ledger'],
      evidence: [
        '4 local service repositories inspected',
        '20 tests and 45 migrations in the companies service',
        'Row locks, reference idempotency, and 5-attempt transaction retries verified in WalletService',
        'Precomputed route graph with bounded path search and all-pairs shortest paths verified in RouteGraphService'
      ],
      contributions: [
        'Microservices Architecture: Designed and deployed the system across four independent Laravel microservices (Auth, Companies, Payments, and Transport Services) running containerized in Docker.',
        'Escrow Wallet Ledger: Programmed secure transaction wallets in the transport service utilizing lockForUpdate row locks inside database transactions to eliminate race conditions, with 5-stage deadlock retries.',
        'Idempotence Governance: Created idempotency lookup layers in the WalletService using distinct reference keys to block duplicate transaction payouts or booking adjustments.',
        'Modular Payment Providers: Integrated Flutterwave and Paystack payment gateway providers, managing verification webhook routes secured with custom signature validations.',
        'Fleet & Schedule Registry: Programmed operators registries, active vehicle fleets, driver records, and scheduling controllers supporting bidirectional routes with stations/stops.',
        'Journey Search Engine: Programmed search algorithms querying schedules tables to map out optimal multi-leg travel route options for booking passengers.'
      ],
      commits: [
        '08d58aa authentication service complete (auth)',
        '27e64f4 service registration & company registries (companies)',
        '522d7a3 price calculations and scheduling updates (companies)',
        '74d987a trip ease payment service init (payments)',
        '2d81857 paystack and flutterwave service (payments)',
        '0c48886 stats and analytics controllers (transport)',
        '2873599 stats reporting (transport)'
      ]
    }
  },
  {
    id: 'wings',
    number: '04',
    category: 'Property Management',
    title: 'Wings Tenancy System',
    shortDesc: 'A multi-tenant property management platform with automated rent schedule generation, payment lifecycle tracking, and Cloudinary-powered property image pipelines.',
    tags: ['Laravel', 'Livewire', 'REST API'],
    borderColor: 'hover:border-emerald-500/30',
    hoverText: 'group-hover:text-emerald-400',
    accentColor: 'text-emerald-400',
    link: 'https://wings.nmobile.com.ng/',
    details: {
      url: 'https://wings.nmobile.com.ng/',
      system: 'Estate Multi-Tenant Dashboard',
      contributions: [
        'Rent Schedule Engine: Automated rent payment schedule generation with first-payment auto-distribution and FIFO lump-sum payment application across billing periods.',
        'Tenancy Overlap Detection: Built date-range conflict validation preventing double-booking of units across tenancy agreements.',
        'Service Layer Architecture: Structured all business logic into dedicated service classes (PropertyService, TenancyService, RentScheduleService, PaymentService) keeping controllers thin.',
        'Dynamic Data Tables: Built a reusable HasDataTableColumns trait auto-generating sortable, searchable, paginated table definitions from database schema.',
        'Cloudinary Image Pipeline: Integrated cloud image uploads with polymorphic cover/gallery relationships for properties and units.'
      ],
      commits: [
        '8ee0d88 tenants, payments and dynamic dashboard',
        '081751f show tenancies',
        'f043c39 added property page',
        '7828448 auth and dashboard',
        '6006048 images',
        '58f7f32 cover_image'
      ]
    }
  },
  {
    id: 'radionews',
    number: '05',
    category: 'Content Portals',
    title: 'Radio News CMS',
    shortDesc: 'A broadcasting content management system integrating dynamic news publishing and revisions logs with Daily.co WebRTC video call rooms and live stream analytics.',
    tags: ['Laravel', 'Filament', 'Daily.co'],
    borderColor: 'hover:border-pink-500/30',
    hoverText: 'group-hover:text-pink-400',
    accentColor: 'text-pink-400',
    link: 'https://home.homelandradio.org/',
    details: {
      url: 'https://home.homelandradio.org/',
      system: 'Broadcasting CMS & Publishing Engine',
      contributions: [
        'Filament CMS Dashboard: Built resource managers for article management, category sorting orders, comments moderation, and ads placements.',
        'Spatie Role Access: Restricted administrative actions by applying Spatie permission layers for admin, editor, moderator, and viewer accounts.',
        'Daily.co WebRTC Rooms: Integrated rooms creation and tokens generation via the Daily.co API, embedding owner-privileged conference screens inside admin pages.',
        'Real-time Chat Webhooks: Built a webhook dispatcher (/daily-webhook) parsing video call chat events and logging participant logs in database channels.',
        'Live Broadcast Analytics: Created stream metadata trackers displaying current listeners status, peaks, last restarts, and calculated uptime.',
        'SEO Discovery Feeds: Automated search engine discovery by generating dynamic sitemaps (/sitemap.xml) and RSS feeds (/feed).'
      ],
      commits: [
        'f9a7688 admin (sprint list & layout setups)',
        '818a0be login (authentication templates)',
        '5940ec0 deploy (automated shell deploy dispatcher)',
        '85b255b seed (tariff and site configurations)',
        '528aab5 radio news completed (CMS features integration)',
        '8efe315 radio news app completed'
      ]
    }
  },
  {
    id: 'transglobal',
    number: '06',
    category: 'Integration APIs',
    title: 'Transglobal X Sabre',
    shortDesc: 'Designed and built the Transglobal logistics API engine and shipping portal from scratch, integrating Sabre tariff matrices, Paystack dedicated accounts, and SeerBit gateways.',
    tags: ['PHP', 'Laravel', 'Docker'],
    borderColor: 'hover:border-yellow-500/30',
    hoverText: 'group-hover:text-yellow-400',
    accentColor: 'text-yellow-400',
    link: 'https://cargo.sabrecwa.com/',
    links: [
      { label: 'Transglobal platform', url: 'https://transglobal.africa/' },
      { label: 'Cargo booking portal', url: 'https://cargo.sabrecwa.com/' }
    ],
    details: {
      url: 'https://transglobal.africa/',
      links: [
        { label: 'Transglobal platform', url: 'https://transglobal.africa/' },
        { label: 'Cargo booking portal', url: 'https://cargo.sabrecwa.com/' }
      ],
      system: 'Logistics Sabre Integration API & Booking Hub',
      role: 'Full-stack architect and implementation owner across the Transglobal API hub and customer-facing Cargo portal.',
      constraints: 'Partner tariff matrices changed independently, payment providers required different handshakes, and shipment state had to remain consistent across systems.',
      architecture: ['Sabre tariff import', 'Transglobal API hub', 'Cargo booking portal', 'SeerBit + shipment sync'],
      evidence: [
        '2 local product repositories inspected',
        '45 tests and 57 migrations across Transglobal Backyard and Cargo',
        'Custom tariff overrides, commission calculations, shipment tracking, and provider interfaces verified in source',
        'Recent implementation trail includes self-healing tariff imports and migration to a single SeerBit provider'
      ],
      contributions: [
        'Full-Stack Architecture: Engineered both the Transglobal API hub and Cargo shipping portal from scratch, designing database schemas, multi-tenant referral models, and admin/customer dashboards.',
        'Paystack DVA Gateway: Integrated Paystack dedicated virtual bank accounts (test-bank) linked to customer codes, implementing self-healing name-splitting (first/last name split fallback) and auto-retries to bypass API validation errors.',
        'Sabre Tariff Auto-Seeders: Programmed database tariff seeders parsing global international shipping rate matrix files, mapping weight-based pricing brackets (sellingRate10kg vs. sellingRate20kg) and auto-creating missing countries/locations.',
        'SeerBit Payment Gateway: Developed a payment provider for the Cargo portal utilizing a secure token-exchange handshake (generating dynamic Bearer tokens via credential encryption).',
        'Webhook Syncing: Engineered webhook listener routes validating HMAC-SHA512 signatures and dispatching automated shipment status syncs to downstream logistics databases.',
        'Console Feedback Scheduler: Coded cron-driven console commands sending automated NPS review requests 24 hours after delivery, with partner-portal exclusion rules (sabre/bicourtney).'
      ],
      commits: [
        '9175766 feat: automatically create missing countries/tariff buckets (backyard)',
        'c7d03a7 feat: Sabre Tariff matrix update and commission calculation bypass (backyard)',
        '28f45b3 Fix Paystack test-bank assignment & update runtime to sail-8.4 (backyard)',
        '13be8f8 Fix Paystack Customer Update last_name required validation error (backyard)',
        'b174a3b feat: complete feedback system with delayed emails & NPS (backyard)',
        'df8df00 chore: remove Paystack/Flutterwave, enforce Seerbit (cargo)',
        '5d01dd3 feat: complete automated webhook syncing & waybill PDF dispatch (cargo)'
      ]
    }
  },
  {
    id: 'ansar-ud-deen',
    number: '07',
    category: 'Digital Modernization',
    title: 'Ansar-Ud-Deen Digital Platform',
    shortDesc: 'A society-wide digital platform spanning a NestJS API, Next.js website and CMS, Flutter mobile app, donation workflows, queued communications, and production operations.',
    tags: ['NestJS', 'Next.js', 'Flutter', 'PostgreSQL'],
    borderColor: 'hover:border-green-500/30',
    hoverText: 'group-hover:text-green-400',
    accentColor: 'text-green-400',
    link: null,
    details: {
      url: null,
      system: 'Ansar-Ud-Deen Society Digital Platform',
      role: 'Platform engineer modernizing the society website, administration workflows, API platform, and member-facing mobile experience.',
      constraints: 'A public-facing institution needed one governed content source, dependable donation and communication flows, and deployable web and mobile clients without disrupting existing operations.',
      architecture: ['Next.js web + CMS', 'NestJS API', 'PostgreSQL + Redis queues', 'Flutter mobile client'],
      evidence: [
        '154 commits in the local monorepo',
        'Docker Compose targets for development, staging, and production',
        'Prisma migrations, Redis-backed BullMQ jobs, Sentry instrumentation, and operational runbooks verified locally',
        'Web, API, and mobile applications maintained in one governed repository'
      ],
      contributions: [
        'Platform Modernization: Structured a shared digital platform across a Next.js public site and CMS, NestJS backend, and Flutter mobile application.',
        'Content Delivery: Built API-managed news, events, leadership, branch, and media content with cache invalidation and Cloudinary-backed assets.',
        'Donation Infrastructure: Implemented donation verification and webhook-ready payment flows with Paystack configuration boundaries.',
        'Queued Communications: Integrated Redis and BullMQ foundations for email, SMS, and push-notification workloads.',
        'Operational Readiness: Added containerized staging targets, database migration discipline, monitoring hooks, backup guidance, and recovery runbooks.',
        'Mobile Delivery: Hardened Firebase initialization and iOS deployment configuration for a reliable cross-platform client startup path.'
      ],
      commits: [
        'ef47225 fix(mobile): safe Firebase init and iOS deployment target setup',
        'fbc642f chore: restore authentication guards after leadership seeding',
        '91fae82 feat: add admin endpoint for Cloudinary leadership records',
        'ae415ef fix: clear Redis keys during container seed startup',
        '740fb63 fix: flexible leadership matching and cache invalidation'
      ]
    }
  },
  {
    id: 'visitor-management',
    number: '08',
    category: 'Workplace Operations',
    title: 'Visitor Management System',
    shortDesc: 'A multi-location visitor and staff check-in platform with approval workflows, role-based administration, duplicate-entry protection, privacy controls, and SMS/email notifications.',
    tags: ['Laravel', 'Filament', 'Termii', 'Cloudinary'],
    borderColor: 'hover:border-cyan-500/30',
    hoverText: 'group-hover:text-cyan-400',
    accentColor: 'text-cyan-400',
    link: 'https://fcmbvms.visitors.com.ng',
    details: {
      url: 'https://fcmbvms.visitors.com.ng',
      system: 'Multi-Location Visitor Management System',
      role: 'Full-stack engineer responsible for self-service check-in, staff workflows, administration controls, and notification delivery.',
      constraints: 'Reception teams needed fast identity lookup and location-aware check-in while preventing duplicate visits and preserving consent, privacy, and role boundaries.',
      architecture: ['Location QR entry', 'Visitor + staff check-in', 'Approval and access rules', 'Email + SMS notifications'],
      evidence: [
        '23 commits in the local repository',
        'Visitor and staff check-in routes, approval flows, and duplicate-check protection verified in source',
        'Role presets cover superadmin, admin, receptionist, and staff access levels',
        'Termii SMS, email notifications, Cloudinary fallback storage, CAPTCHA, and consent controls implemented'
      ],
      contributions: [
        'Self-Service Check-In: Built location-specific QR entry, visitor lookup, registration, staff selection, and successful-arrival workflows.',
        'Duplicate Protection: Prevented pending or active duplicate check-ins and enforced required host information before admission.',
        'Staff Operations: Added staff attendance check-in and checkout alongside visitor approval and reception workflows.',
        'Access Governance: Defined role and permission presets for superadmins, administrators, receptionists, and staff users.',
        'Notification Delivery: Connected email and Termii SMS alerts to visitor arrival events and host notifications.',
        'Privacy Controls: Added consent-aware check-in, an institutional privacy notice, cookie controls, CAPTCHA, and optional visitor photography.'
      ],
      commits: [
        'c8ff7c24 feat: staff checkout workflow',
        '72bfc401 fix: block pending duplicate check-ins and require staff visited',
        'b46b036c feat: privacy notice and branded cookie banner',
        '904c05fc feat: staff approval, mandatory consent, and optional photos',
        '76d4869c fix: CAPTCHA and visitor search handling'
      ]
    }
  },
  {
    id: 'shipwize',
    number: '09',
    category: 'Delivery Logistics',
    title: 'Shipwize',
    shortDesc: 'A shipment booking and tracking platform combining delivery pricing, Flutterwave payments, confirmation codes, operational dashboards, commissions, and Termii SMS updates.',
    tags: ['Laravel', 'Livewire', 'Flutterwave', 'Termii'],
    borderColor: 'hover:border-blue-500/30',
    hoverText: 'group-hover:text-blue-400',
    accentColor: 'text-blue-400',
    link: 'https://shipwize.ng/',
    details: {
      url: 'https://shipwize.ng/',
      system: 'Shipwize Booking, Payment, and Tracking Platform',
      role: 'Full-stack engineer implementing the shipment lifecycle from booking and payment through tracking and delivery confirmation.',
      constraints: 'Customers and operators needed one reliable workflow connecting shipment pricing, online payment verification, status updates, collection security, and outbound communication.',
      architecture: ['Shipment booking', 'Flutterwave verification', 'Tracking timeline', 'Termii delivery alerts'],
      evidence: [
        '91 commits in the local repository',
        'Shipment, tracking update, payout, commission, and sales domains verified in source',
        'Flutterwave initialization and callback verification implemented for shipment payments',
        'Termii messaging and delivery confirmation codes connected to the order lifecycle'
      ],
      contributions: [
        'Shipment Lifecycle: Built customer booking, operational shipment management, unique tracking numbers, and public delivery-status lookup.',
        'Payment Verification: Integrated Flutterwave checkout initialization and callback verification against shipment records.',
        'Collection Security: Generated delivery confirmation codes and connected them to post-payment customer messages.',
        'Tracking Operations: Implemented timestamped tracking updates and customer-facing origin-to-destination progress views.',
        'SMS Automation: Integrated Termii notifications for order confirmation and delivery communication.',
        'Commercial Controls: Added commission, payout, sales, and team-oriented administrative workflows.'
      ],
      commits: [
        '5f312cc4 feat: Termii messaging integration',
        '90e0aae6 fix: SMS delivery handling',
        'e432eecf update: customer shipment message flow',
        '5973dc12 update: logistics workflow changes',
        'Local implementation trail includes shipment tracking, Flutterwave callbacks, and commission controls'
      ]
    }
  }
];

const KONGA_CASE_STUDY = {
  id: 'konga-payouts',
  number: '01',
  category: 'Commerce Infrastructure',
  title: 'Konga Merchant Payout Engine',
  shortDesc: 'Refactored a high-volume payout workflow to release merchant funds faster without trading speed for database stability.',
  tags: ['PHP', 'MySQL', 'Batch Processing'],
  borderColor: 'hover:border-orange-500/30',
  hoverText: 'group-hover:text-orange-400',
  accentColor: 'text-orange-400',
  link: null,
  details: {
    url: null,
    system: 'High-Volume Merchant Payout Infrastructure',
    role: 'Backend engineer responsible for payout throughput, synchronization workers, and production database stability.',
    constraints: 'Enterprise source is proprietary; the public case study must preserve implementation confidentiality and omit customer data.',
    architecture: ['Payout cursor', '500-record batches', 'Paced worker execution', 'Merchant ledger release'],
    evidence: [
      'Reported production outcome: payout execution time reduced by half',
      'Reported implementation: cursor offsets, bounded 500-record batches, and paced execution',
      'Evidence basis: professional work record; proprietary repository is not stored locally'
    ],
    contributions: [
      'Operational Problem: Large payout runs produced database pressure and delayed merchant fund releases.',
      'Batch Strategy: Reworked processing around cursor offsets and bounded groups of 500 records instead of broad scans.',
      'Load Control: Introduced controlled microsecond delays between batches to smooth CPU and database demand.',
      'Recovery Path: Strengthened synchronization daemons and failure handling around payout and catalog workflows.',
      'Outcome: Cut payout execution time in half while eliminating the locking spikes observed in the previous flow.'
    ],
    commits: [
      'Production work completed within Konga enterprise repositories.',
      'Implementation details are summarized without exposing proprietary source code.'
    ]
  }
};

const FLAGSHIP_CASE_STUDIES = [
  {
    project: KONGA_CASE_STUDY,
    mascot: 'ledger' as const,
    index: '01',
    context: 'Konga / production commerce',
    problem: 'Merchant payout batches were slow and generated database locking pressure during high-volume execution.',
    decision: 'Process bounded cursor batches of 500 records, pace the workload, and strengthen daemon recovery paths.',
    outcome: '2x faster payouts',
    outcomeNote: 'reported production result; proprietary source withheld',
    evidence: ['500-record batches', 'Cursor pagination', 'Paced execution'],
  },
  {
    project: PROJECTS.find((project) => project.id === 'transglobal')!,
    mascot: 'integrate' as const,
    index: '02',
    context: 'Transglobal x Sabre / logistics',
    problem: 'Shipping quotes, tariff matrices, customer accounts, and payment providers lived across disconnected systems.',
    decision: 'Build one Laravel integration hub with tariff seeders, signed webhooks, DVA provisioning, and gateway fallbacks.',
    outcome: 'One integration hub',
    outcomeNote: 'from global tariff import to payment confirmation',
    evidence: ['2 repositories', '45 tests', '57 migrations'],
  },
  {
    project: PROJECTS.find((project) => project.id === 'tripease')!,
    mascot: 'architect' as const,
    index: '03',
    context: 'TripEase / distributed transit',
    problem: 'Booking, fleet operations, payments, and identity needed independent ownership without risking duplicate wallet actions.',
    decision: 'Split four containerized services and protect the ledger with row locks, idempotency keys, and deadlock retries.',
    outcome: '4 bounded services',
    outcomeNote: 'with concurrency-safe escrow operations',
    evidence: ['4 repositories', '20 company tests', '5 retry attempts'],
  },
];

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [telemetryOpen, setTelemetryOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const projectDialogRef = useRef<HTMLDivElement>(null);
  const projectTriggerRef = useRef<HTMLElement | null>(null);

  const handleOpenProjectDetails = (project: any, trigger: HTMLElement) => {
    projectTriggerRef.current = trigger;
    setSelectedProject(project);
  };

  const closeProjectDetails = () => setSelectedProject(null);

  useEffect(() => {
    if (!selectedProject) return;

    const dialog = projectDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    requestAnimationFrame(() => focusable()[0]?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeProjectDetails();
        return;
      }

      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      projectTriggerRef.current?.focus();
    };
  }, [selectedProject]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Failed to send');
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100 font-sans relative selection:bg-orange-500/30 selection:text-orange-200">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <div className="systems-grid fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      <header className="sticky top-0 z-50 w-full bg-[#0a0806]/92 backdrop-blur-md border-b border-amber-950/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <a href="#about" className="flex items-center gap-2" aria-label="Gideon Nwadialu, back to introduction">
            <Logo className="w-8 h-8" />
            <span className="font-mono text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wider">
              GIDEON <span className="text-orange-400">NWADIALU</span>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
            <a href="#projects" className="hover:text-orange-400 transition-colors">Selected work</a>
            <a href="#engine-room" className="hover:text-orange-400 transition-colors">Engine room</a>
            <a href="#experience" className="hover:text-orange-400 transition-colors">Experience</a>
            <a href="#contact" className="text-slate-100 hover:text-orange-400 transition-colors">Contact</a>
          </nav>
          <nav aria-label="Mobile navigation" className="flex md:hidden items-center gap-3 font-mono text-[10px] uppercase text-slate-400">
            <a href="#projects" className="py-2 hover:text-orange-400 transition-colors">Work</a>
            <a href="#contact" className="py-2 text-slate-100 hover:text-orange-400 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" tabIndex={-1} className="max-w-6xl mx-auto px-4 py-5 md:py-8 relative z-10 space-y-14 md:space-y-20">

        {/* HERO SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center lg:min-h-[72vh] py-6 md:py-14">
          {/* Intro Text */}
          <div className="lg:col-span-7 space-y-6 md:space-y-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border-l-2 border-orange-500 pl-3"
            >
              <Cpu className="w-4 h-4 text-orange-400" />
              <span className="font-mono text-xs text-orange-300 uppercase tracking-wider font-bold">Web / mobile / backend / delivery</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-100 leading-[1.02] md:leading-[0.96]"
            >
              I build the whole application.<br />
              <span className="text-orange-400">Then make it hold up.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed font-sans"
            >
              I’m Gideon Nwadialu, an end-to-end application engineer. I take products from interface and mobile experience through APIs, data, infrastructure, deployment, and production support, with particular depth in payments and complex integrations.
            </motion.p>

            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-3 gap-2 border-y border-amber-950/60 py-4 max-w-2xl"
            >
              <div>
                <dt className="font-mono text-[11px] uppercase text-slate-500">Payout speed</dt>
                <dd className="mt-1 text-base sm:text-xl font-bold text-slate-100">2x faster</dd>
              </div>
              <div className="border-l border-amber-950/60 pl-4">
                <dt className="font-mono text-[11px] uppercase text-slate-500">Records moved</dt>
                <dd className="mt-1 text-base sm:text-xl font-bold text-slate-100">100k+</dd>
              </div>
              <div className="border-l border-amber-950/60 pl-4">
                <dt className="font-mono text-[11px] uppercase text-slate-500">Core focus</dt>
                <dd className="mt-1 text-base sm:text-xl font-bold text-slate-100">Reliability</dd>
              </div>
            </motion.dl>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a href="#projects" className="px-5 py-3 bg-orange-500 hover:bg-orange-400 text-[#0a0806] rounded font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer">
                Inspect selected work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/resume.html" className="px-4 py-3 border border-slate-700 hover:border-orange-500/60 rounded font-semibold text-sm text-slate-200 transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Resume
              </a>
              <a aria-label="GitHub profile" href="https://github.com/Senseiuc" target="_blank" rel="noopener noreferrer" className="p-3 border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
              <a aria-label="GitLab profile" href="https://az-gitlab.igbimo.com/gideon.nwadialu" target="_blank" rel="noopener noreferrer" className="p-3 border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
                <Gitlab className="w-4 h-4" />
              </a>
              <a aria-label="LinkedIn profile" href="https://www.linkedin.com/in/gideonnwadialu/" target="_blank" rel="noopener noreferrer" className="p-3 border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 w-full max-w-[520px] mx-auto lg:ml-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full overflow-hidden border border-amber-900/40 shadow-2xl bg-[#100d09]"
            >
              <div className="aspect-video bg-black">
                <video
                  src="/Bearded_logo_glowing_orange_energy_202607140039.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/background-senseiuc-design.webp"
                  aria-label="Animated Senseiuc chessboard identity"
                  className="block w-full h-full object-contain"
                />
              </div>
              <div className="border-t border-amber-900/40 p-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase text-orange-400">Senseiuc / systems study 01</p>
                  <p className="text-sm text-slate-300 mt-1">Strategy translated into dependable software.</p>
                </div>
                <span className="font-mono text-[10px] text-slate-500">LAGOS → REMOTE</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section aria-labelledby="systems-practice-title" className="border-y border-amber-950/50 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <div>
              <p className="font-mono text-xs uppercase text-orange-400">The Senseiuc method</p>
              <h2 id="systems-practice-title" className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100">
                Three moves behind every reliable system.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Understand the money, connect the moving parts, then design for the failure nobody scheduled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {[
              {
                variant: 'ledger' as const,
                number: '01',
                title: 'Protect the ledger',
                copy: 'Treat every payment state, retry, and reconciliation path as an auditable contract.',
              },
              {
                variant: 'integrate' as const,
                number: '02',
                title: 'Bridge the systems',
                copy: 'Make APIs, webhooks, queues, and legacy services agree on one dependable truth.',
              },
              {
                variant: 'architect' as const,
                number: '03',
                title: 'Plan beyond happy paths',
                copy: 'Model locks, failures, recovery, and scale before they become production incidents.',
              },
            ].map((item) => (
              <article key={item.number} className="group grid grid-cols-[112px_1fr] md:block gap-4 items-center md:px-6 first:md:pl-0 last:md:pr-0 md:border-l first:md:border-l-0 border-amber-950/50">
                <Mascot
                  variant={item.variant}
                  label={`${item.title} Senseiuc mascot`}
                  motion={item.variant === 'architect' ? 'inspect' : 'float'}
                  className="w-28 md:w-40 mx-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="md:mt-4">
                  <span className="font-mono text-[11px] text-orange-400">MOVE {item.number}</span>
                  <h3 className="mt-1 text-lg font-bold text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-7 md:space-y-10" aria-labelledby="selected-work-title">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Selected work / evidence first</p>
              <h2 id="selected-work-title" className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-100">
                Systems judged by what happens under pressure.
              </h2>
            </div>
            <p className="md:col-span-5 text-sm md:text-base leading-relaxed text-slate-400">
              Three projects that show the work from production bottleneck to architecture decision and operational result.
            </p>
          </div>

          <div className="divide-y divide-amber-950/50 border-y border-amber-950/50">
            {FLAGSHIP_CASE_STUDIES.map((story, storyIndex) => (
              <article
                key={story.project.id}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 py-8 md:py-14"
              >
                <div className={`hidden lg:flex lg:col-span-3 items-center justify-center ${storyIndex % 2 === 1 ? 'lg:order-3' : ''}`}>
                  <Mascot
                    variant={story.mascot}
                    label={`${story.project.title} case study mascot`}
                    motion={story.mascot === 'architect' ? 'inspect' : 'float'}
                    className="w-48 transition-transform duration-300 group-hover:scale-[1.025]"
                  />
                </div>

                <div className={`lg:col-span-6 ${storyIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 pt-1">
                      <p className="font-mono text-[11px] uppercase text-slate-500">
                        Case {story.index} / {story.context}
                      </p>
                      <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-100">{story.project.title}</h3>
                    </div>
                    <Mascot
                      variant={story.mascot}
                      label={`${story.project.title} case study mascot`}
                      motion={story.mascot === 'architect' ? 'inspect' : 'float'}
                      className="w-20 sm:w-24 lg:hidden transition-transform duration-300 group-hover:scale-[1.025]"
                    />
                  </div>

                  <dl className="mt-6 space-y-5">
                    <div className="grid grid-cols-[76px_1fr] gap-4">
                      <dt className="font-mono text-[11px] uppercase text-orange-400 pt-0.5">Problem</dt>
                      <dd className="text-sm leading-relaxed text-slate-300">{story.problem}</dd>
                    </div>
                    <div className="grid grid-cols-[76px_1fr] gap-4">
                      <dt className="font-mono text-[11px] uppercase text-orange-400 pt-0.5">Decision</dt>
                      <dd className="text-sm leading-relaxed text-slate-300">{story.decision}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 border-l border-amber-900/60 pl-4">
                    <p className="font-mono text-[10px] uppercase text-slate-500">Evidence</p>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                      {story.evidence.map((item) => (
                        <li key={item} className="text-xs text-slate-300 before:content-['/'] before:mr-2 before:text-orange-400">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {story.project.tags.map((tag) => (
                      <span key={tag} className="border border-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(event) => handleOpenProjectDetails(story.project, event.currentTarget)}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-100 hover:text-orange-400 transition-colors"
                  >
                    Read engineering notes
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className={`lg:col-span-3 lg:border-l lg:border-amber-950/50 lg:pl-7 flex flex-col justify-center ${storyIndex % 2 === 1 ? 'lg:order-1 lg:border-l-0 lg:border-r lg:pr-7 lg:pl-0' : ''}`}>
                  <p className="font-mono text-[11px] uppercase text-slate-500">Outcome</p>
                  <p className="mt-2 text-2xl md:text-3xl font-extrabold text-orange-400">{story.outcome}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{story.outcomeNote}</p>
                  <div className="mt-5 flex flex-col items-start gap-2">
                    {(story.project.links ?? (story.project.link ? [{ label: 'Visit production site', url: story.project.link }] : [])).map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-slate-300 hover:text-orange-400 transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CORE COMPETENCIES GRID */}
        <section id="competencies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Capability board / field tested</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-400" />
              Core Competencies
              </h2>
            </div>
            <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">One accountable engineering path from product interface to production operations, demonstrated through shipped systems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-y border-slate-800 md:border-x">
            <div className="relative p-6 pr-28 border-b md:border-r border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="code" motion="inspect" className="absolute right-2 bottom-1 w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">01 / Frontend & Product Workflows</span>
              <h3 className="font-bold text-slate-200 text-base">Interfaces People Can Operate</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Builds responsive React and Next.js portals, administration dashboards, CMS workflows, booking journeys, and role-aware operational interfaces connected to real production processes.
              </p>
            </div>

            <div className="relative p-6 pr-28 border-b border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="secure" motion="inspect" className="absolute right-2 bottom-1 w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">02 / Backend & Financial Systems</span>
              <h3 className="font-bold text-slate-200 text-base">Reliable APIs, Ledgers & Integrations</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Engineers payment workflows, APIs, queues, webhooks, data migrations, and concurrency-safe services, including payout processing that ran twice as fast without database locking spikes.
              </p>
            </div>

            <div className="relative p-6 pr-28 md:border-r border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="build" motion="float" className="absolute right-2 bottom-1 w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">03 / Mobile & Cross-Platform</span>
              <h3 className="font-bold text-slate-200 text-base">Mobile Products on Shared Platforms</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Delivers Flutter clients alongside web and API platforms, including the Ansar-Ud-Deen member experience and TripEase mobile workflows backed by shared identity, payment, and content services.
              </p>
            </div>

            <div className="relative p-6 pr-28 border-t md:border-t-0 border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="deploy" motion="celebrate" className="absolute right-2 bottom-1 w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">04 / DevOps & Production Ownership</span>
              <h3 className="font-bold text-slate-200 text-base">From Repository to Running Service</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Containers, deploys, monitors, and troubleshoots applications with Docker, Kubernetes, CI/CD workflows, environment automation, and production-safe migration practices.
              </p>
            </div>
          </div>
        </section>

        {/* SENSEI'S STUDY: LOGIC, MATHEMATICS & CHESS */}
        <section id="study" className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase text-orange-400">Personal operating system</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
              <Logo className="w-6 h-6 animate-pulse" animate={false} />
              Sensei's Study: Logic & Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-y border-slate-800 items-center relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/background-senseiuc-design.webp')" }} />
            
            <div className="md:col-span-4 flex justify-center z-10 w-full">
              <div className="w-full aspect-square max-w-[260px] flex items-center justify-center overflow-hidden border border-slate-800 shadow-lg bg-[#141110]/30">
                <img 
                  src="/gideon_caricature.webp"
                  alt="Gideon Caricature" 
                  width="520"
                  height="520"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter drop-shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                />
              </div>
            </div>
            
            <div className="md:col-span-8 space-y-4 font-sans z-10">
              <div className="space-y-2">
                <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wide font-mono text-orange-400">
                  Mathematics & Algorithmic Foundations
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Holding a <strong className="text-slate-200">BSc in Mathematics</strong> from the University of Lagos, Gideon treats software engineering as the application of rigorous proof and quantitative logic. From designing multi-wallet transactional ledger constraints to formulating Redis caching distributions, his mathematical training ensures code is written with absolute correctness and efficiency.
                </p>
              </div>

              <div className="space-y-2 border-t border-amber-950/40 pt-3">
                <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wide font-mono text-orange-400">
                  The Chess Philosophy of Systems Design
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  An avid chess player, Gideon views system architecture through the lens of strategic board logic. Designing high-throughput payouts and auto-renewal daemons is similar to mapping out lines of play: every command is a calculated move designed to preempt runtime exceptions, mitigate bottlenecks, and secure an optimized endpoint execution path.
                </p>
              </div>

              <blockquote className="border-l-2 border-orange-500 pl-4 py-1 italic text-slate-400 text-sm font-serif bg-orange-500/5">
                "A robust backend is like a master chess game—invisible in its complexity, absolute in its logic, and executing with flawless precision."
                <span className="block text-[10px] font-mono text-orange-400 mt-1 uppercase font-bold not-italic">— Sensei's Maxim</span>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE PLAYGROUND */}
        <section id="engine-room">
          <EngineRoom />
        </section>

        {/* SUPPORTING PROJECTS */}
        <section id="project-archive" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Supporting work / broader range</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-400" />
              More Systems Shipped
              </h2>
            </div>
            <p className="md:col-span-5 text-sm text-slate-400 leading-relaxed">Additional production and client work across education, care, property, broadcasting, institutional platforms, and logistics.</p>
          </div>

          <div className="border-y border-slate-800 divide-y divide-slate-800">
            {PROJECTS.filter((project) => !['tripease', 'transglobal'].includes(project.id)).map((project) => (
              <article
                key={project.id}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 hover:bg-orange-500/[0.025] transition-colors"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">{project.number} / {project.category}</span>
                  <h3 className="mt-2 font-bold text-slate-100 text-lg group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="md:col-span-6 text-slate-400 text-sm leading-relaxed">{project.shortDesc}</p>

                <div className="md:col-span-3 flex md:flex-col items-start md:items-end justify-between gap-4">
                  <div className="flex flex-wrap md:justify-end gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(event) => handleOpenProjectDetails(project, event.currentTarget)}
                    className="text-xs font-mono text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Engineering notes <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="terminal">
          <details
            className="group border-y border-slate-800 py-6"
            onToggle={(event) => setTelemetryOpen(event.currentTarget.open)}
          >
            <summary className="list-none cursor-pointer flex items-center justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase text-orange-400">Optional technical appendix</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-100 flex items-center gap-2">
                  <TerminalIcon className="w-5 h-5 text-orange-400" />
                  Live Portfolio Telemetry
                </h2>
                <p className="mt-2 text-sm text-slate-400">Runtime metrics, contribution data, and an interactive command reference.</p>
              </div>
              <span className="font-mono text-xs text-slate-400 group-open:text-orange-400">OPEN +</span>
            </summary>
            {telemetryOpen && (
              <Suspense fallback={<p role="status" className="pt-8 font-mono text-xs text-slate-500">Loading live telemetry...</p>}>
                <div className="pt-8 space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MetricsMonitor />
                    <GitStats />
                  </div>
                  <Terminal />
                </div>
              </Suspense>
            )}
          </details>
        </section>

        {/* WORK TIMELINE EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Experience / where the work happened</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-400" />
              Professional Experience
              </h2>
            </div>
            <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">Production engineering across commerce, financial platforms, consulting, and care operations.</p>
          </div>

          <div className="border-y border-slate-800 divide-y divide-slate-800">
            {[
              ['2024 — NOW', 'Konga', 'Software Engineer', 'Optimized payouts and escrow releases, repaired synchronization daemons, resolved resource locks in high-volume background jobs, and managed staging workloads.'],
              ['2021 — NOW', 'Golden Attic', 'Senior Full-Stack Engineer, part-time', 'Led a Laravel 5.8 to 11 migration with zero data loss, built dual-currency wallet ledgers, and engineered event-driven reward processors.'],
              ['2020 — NOW', 'Independent consulting', 'Full-Stack & DevOps Consultant', 'Built Sabre tariff seeders and billing gateways, FastAPI service integrations, and a visitor-management platform for a confidential financial services client.'],
              ['2022 — 2024', 'Xxolcare', 'Software Developer', 'Built care-booking workflows, integrated Paystack webhooks and transactional notifications, and standardized Docker development environments.'],
            ].map(([period, company, role, description], index) => (
              <article key={company} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6">
                <div className="md:col-span-2 flex items-center gap-2 font-mono text-xs text-orange-400">
                  <span className="text-slate-600">0{index + 1}</span>
                  <Calendar className="w-3.5 h-3.5" />
                  {period}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-bold text-slate-100">{company}</h3>
                  <p className="mt-1 text-sm text-slate-500">{role}</p>
                </div>
                <p className="md:col-span-6 text-sm leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-y border-amber-950/60 py-10 md:py-14">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase text-orange-400">Your move</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-100">Bring me the difficult part.</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 max-w-md">
              I’m open to end-to-end web and mobile application work, backend and payment platforms, product integrations, and production engineering conversations.
            </p>
            <div className="mt-5 lg:mt-6 flex items-center gap-5 lg:block">
              <Mascot variant="integrate" label="Senseiuc partnership mascot" motion="float" className="w-20 sm:w-24 lg:w-36" />
              <div className="min-w-0 space-y-3 text-sm lg:mt-6">
                <a href="mailto:nwadialugideon@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-orange-400 transition-colors break-all sm:break-normal">
                  <Mail className="w-4 h-4 shrink-0" /> nwadialugideon@gmail.com
                </a>
                <p className="font-mono text-xs text-slate-500">Lagos, Nigeria / remote</p>
                <p className="font-mono text-xs text-slate-500">+234-810-534-XXXX</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-slate-800 lg:pl-10">
            {sent ? (
              <div role="status" className="min-h-72 flex flex-col items-start justify-center space-y-3 text-emerald-400 border-y border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
                <span className="font-bold text-lg">Message received.</span>
                <p className="text-sm text-slate-400 max-w-sm">Thank you. Gideon can follow up using the email address you provided.</p>
              </div>
            ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-5 text-sm">
              <p id="contact-privacy" className="text-xs leading-relaxed text-slate-500">
                Your details are used only to respond to this message and are retained for up to 180 days.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-slate-400">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    aria-describedby="contact-privacy"
                    autoComplete="name"
                    maxLength={100}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-slate-700 px-0 py-2.5 md:py-3 text-slate-100 outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-slate-400">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    aria-describedby="contact-privacy"
                    autoComplete="email"
                    maxLength={254}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-slate-700 px-0 py-2.5 md:py-3 text-slate-100 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-slate-400">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  aria-describedby="contact-privacy"
                  rows={3}
                  maxLength={3000}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-y bg-transparent border-b border-slate-700 px-0 py-3 text-slate-100 outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="px-5 py-3 bg-orange-500 hover:bg-orange-400 text-[#0a0806] font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </form>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-600 relative z-10">
        <div>Designed and built by Gideon Nwadialu in Lagos, Nigeria.</div>
        <div className="mt-1 font-mono">React / Express / SQLite / Docker</div>
      </footer>

      {/* Project engineering notes */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProjectDetails();
          }}
        >
          <motion.div 
            ref={projectDialogRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="w-full max-w-3xl max-h-[92dvh] sm:max-h-none bg-[#0a0806] border border-slate-700 rounded-t-lg sm:rounded-lg overflow-hidden shadow-2xl flex flex-col text-slate-300"
          >
            <div className="px-5 py-4 border-b border-amber-950/50 flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-orange-400">
                Engineering notes / {selectedProject.category}
              </span>
              <button 
                type="button"
                aria-label="Close project details"
                onClick={closeProjectDetails}
                className="w-9 h-9 text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 md:p-8 space-y-7 md:space-y-8 max-h-[calc(92dvh-66px)] sm:max-h-[78vh] overflow-y-auto">
              <div>
                <p className="font-mono text-xs uppercase text-slate-500">System</p>
                <h4 id="project-dialog-title" className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100">
                  {selectedProject.details.system}
                </h4>
              </div>

              {(selectedProject.details.role || selectedProject.details.constraints) && (
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 border border-slate-800">
                  {selectedProject.details.role && (
                    <div className="bg-[#0a0806] p-4">
                      <dt className="font-mono text-[10px] uppercase text-orange-400">Role</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-slate-300">{selectedProject.details.role}</dd>
                    </div>
                  )}
                  {selectedProject.details.constraints && (
                    <div className="bg-[#0a0806] p-4">
                      <dt className="font-mono text-[10px] uppercase text-orange-400">Constraints</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-slate-300">{selectedProject.details.constraints}</dd>
                    </div>
                  )}
                </dl>
              )}

              {selectedProject.details.architecture && (
                <div>
                  <p className="font-mono text-xs uppercase text-slate-500 mb-3">Architecture path</p>
                  <ol className="grid grid-cols-1 sm:grid-cols-4 border border-slate-800">
                    {selectedProject.details.architecture.map((node: string, i: number) => (
                      <li key={node} className="relative min-h-20 p-3 border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 border-slate-800">
                        <span className="font-mono text-[10px] text-orange-400">{String(i + 1).padStart(2, '0')}</span>
                        <p className="mt-2 text-xs leading-relaxed text-slate-200">{node}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {selectedProject.details.evidence && (
                <div>
                  <p className="font-mono text-xs uppercase text-orange-400 mb-3">Evidence basis</p>
                  <ul className="border-y border-slate-800 divide-y divide-slate-800">
                    {selectedProject.details.evidence.map((item: string) => (
                      <li key={item} className="py-3 text-sm leading-relaxed text-slate-400 flex gap-3">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-orange-400" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="font-mono text-xs uppercase text-orange-400 mb-4">Owned and delivered</p>
                <ul className="divide-y divide-slate-800 border-y border-slate-800">
                        {selectedProject.details.contributions.map((item: string, i: number) => {
                          const [title, desc] = item.split(': ');
                          return (
                            <li key={i} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 sm:gap-5 py-4 text-sm leading-relaxed text-slate-400">
                              <strong className="text-slate-200">{title}</strong>
                              <span>{desc}</span>
                            </li>
                          );
                        })}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs uppercase text-slate-500 mb-3">Selected implementation trail</p>
                <div className="border-l border-amber-900/60 pl-4 space-y-2">
                      {selectedProject.details.commits.map((commit: string, i: number) => (
                        <div key={i} className="text-slate-400 text-xs leading-relaxed flex gap-2 font-mono">
                          <span className="text-orange-400 select-none">{String(i + 1).padStart(2, '0')}</span>
                          <span className="break-words">{commit}</span>
                        </div>
                      ))}
                </div>
              </div>

              {(selectedProject.details.links || selectedProject.details.url) && (
                <div className="pt-5 border-t border-amber-950/50 flex flex-wrap justify-end gap-2">
                  {(selectedProject.details.links ?? [{ label: 'Visit production site', url: selectedProject.details.url }]).map((link: { label: string; url: string }) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 hover:bg-orange-400 text-[#0a0806] px-4 py-2.5 rounded font-bold transition-colors text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Chat Widget */}
      <ChatWidget />

    </div>
  );
}
