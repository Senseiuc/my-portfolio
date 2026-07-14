import React, { useState } from 'react';
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
  Award, 
  Calendar,
  Send,
  CheckCircle2
} from 'lucide-react';
import Terminal from './components/Terminal';
import MetricsMonitor from './components/MetricsMonitor';
import EngineRoom from './components/EngineRoom';
import GitStats from './components/GitStats';
import Logo from './components/Logo';
import ChatWidget from './components/ChatWidget';

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
    details: {
      url: 'https://transglobal.africa/',
      system: 'Logistics Sabre Integration API & Booking Hub',
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
  }
];

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [modalStage, setModalStage] = useState<'idle' | 'loading' | 'done'>('idle');
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);

  const handleOpenProjectDetails = (project: any) => {
    setSelectedProject(project);
    setModalStage('loading');
    setLoadingLogs([]);
    
    const logs = [
      'Establishing secure connection to telemetry...',
      'Spinning up dynamic logging pod on node vps-01...',
      'Binding virtual directory stream channels...',
      'Querying SQLite cache for git transaction log index...',
      'Telemetry stream stabilized. Decoding repository packets...'
    ];
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        setLoadingLogs(prev => [...prev, `[system-daemon] ${log}`]);
      }, (index + 1) * 450);
    });
    
    setTimeout(() => {
      setModalStage('done');
    }, logs.length * 450 + 200);
  };

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
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/8 rounded-full blur-[120px] glow-bg" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/8 rounded-full blur-[120px] glow-bg" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Floating Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#0a0806]/70 backdrop-blur-md border-b border-amber-950/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-mono text-sm font-bold text-slate-100 uppercase tracking-widest">
              GIDEON <span className="text-orange-400">NWADIALU</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
            <a href="#about" className="hover:text-orange-400 transition-colors">/about</a>
            <a href="#competencies" className="hover:text-orange-400 transition-colors">/skills</a>
            <a href="#study" className="hover:text-orange-400 transition-colors">/study</a>
            <a href="#engine-room" className="hover:text-orange-400 transition-colors">/engine-room</a>
            <a href="#projects" className="hover:text-orange-400 transition-colors">/projects</a>
            <a href="#terminal" className="hover:text-orange-400 transition-colors">/terminal</a>
            <a href="#experience" className="hover:text-orange-400 transition-colors">/experience</a>
            <a href="#contact" className="hover:text-orange-400 transition-colors">/contact</a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10 space-y-20">

        {/* HERO SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[75vh]">
          {/* Intro Text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full"
            >
              <Cpu className="w-3.5 h-3.5 text-orange-400 animate-spin" />
              <span className="font-mono text-[10px] text-orange-400 uppercase tracking-wider font-bold">Systems Architect & Developer</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight"
            >
              Nwadialu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500">Gideon</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-sans"
            >
              Fullstack & Systems Integration Engineer specializing in high-performance backends, secure payment ledgers, automated synchronization systems, and DevOps orchestrations. Experienced in managing legacy refactoring, Kubernetes environments, and speech-enabled AI state agents.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 pt-2"
            >
              <a href="mailto:nwadialugideon@gmail.com" className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-slate-900 rounded font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg cursor-pointer">
                <Mail className="w-3.5 h-3.5" />
                Contact Gideon
              </a>
              <a href="https://github.com/Senseiuc" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://az-gitlab.igbimo.com/gideon.nwadialu" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
                <Gitlab className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/gideonnwadialu/" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Profile Logo Card with full-bleed glowing energy video */}
          <div className="lg:col-span-5 flex flex-col items-center gap-3 w-full max-w-[480px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group"
            >
              {/* Background glowing energy video filling container */}
              <video 
                src="/Bearded_logo_glowing_orange_energy_202607140039.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            </motion.div>
            
            {/* Node label positioned below the video container */}
            <div className="font-mono text-[10px] text-slate-500 text-center uppercase tracking-widest">
              senseiuc vps-01 node
            </div>
          </div>
        </section>

        {/* CORE COMPETENCIES GRID */}
        <section id="competencies" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-400" />
              Core Competencies
            </h2>
            <p className="text-xs text-slate-500 font-mono">/capabilities-matrix.json</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-slate-800 bg-[#141110]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
              <span className="font-mono text-[10px] text-orange-400 uppercase font-bold">1. Fintech & Ledger Operations</span>
              <h3 className="font-bold text-slate-200 text-sm">Escrow Wallet Payouts & Audits</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Optimized billing and payouts updates in backend daemons using cursor offsets in chunked batches of 500 records with microsecond delays, **releasing payments twice as fast and eliminating database locking spikes**.
              </p>
            </div>

            <div className="p-5 border border-slate-800 bg-[#141110]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
              <span className="font-mono text-[10px] text-indigo-400 uppercase font-bold">2. Systems Governance</span>
              <h3 className="font-bold text-slate-200 text-sm">Smart-Sync Deployment Automation</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Engineered custom smart-sync file isolation scripts, **reducing environment sync delivery times by 50%** while preserving staging configuration overrides and local patches.
              </p>
            </div>

            <div className="p-5 border border-slate-800 bg-[#141110]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold">3. Microservices Routing</span>
              <h3 className="font-bold text-slate-200 text-sm">API Gateway Authentication</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Implemented multi-tenant gateways and secure token validation wrappers routing logistics traffic between Laravel microservices, **improving environment setup startup times by 50%**.
              </p>
            </div>

            <div className="p-5 border border-slate-800 bg-[#141110]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
              <span className="font-mono text-[10px] text-pink-400 uppercase font-bold">4. DevOps & Compliance</span>
              <h3 className="font-bold text-slate-200 text-sm">Kubernetes Cluster & KYC Integration</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Integrated third-party Dojah KYC and computer vision APIs with dynamic token retry wrappers, **blocking 99% of registration spam and resolving critical wallet payout failures**.
              </p>
            </div>
          </div>
        </section>

        {/* SENSEI'S STUDY: LOGIC, MATHEMATICS & CHESS */}
        <section id="study" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <Logo className="w-6 h-6 animate-pulse" animate={false} />
              Sensei's Study: Logic & Strategy
            </h2>
            <p className="text-xs text-slate-500 font-mono">/logic-core.json</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 border border-slate-800 bg-[#141110]/20 rounded-xl items-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/background-senseiuc-design.png')" }} />
            
            <div className="md:col-span-4 flex justify-center z-10 w-full">
              <div className="w-full aspect-square max-w-[260px] flex items-center justify-center rounded-xl overflow-hidden border border-slate-800/40 shadow-lg bg-[#141110]/30">
                <img 
                  src="/gideon_caricature.jpg" 
                  alt="Gideon Caricature" 
                  className="w-full h-full object-cover filter drop-shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                />
              </div>
            </div>
            
            <div className="md:col-span-8 space-y-4 font-sans z-10">
              <div className="space-y-2">
                <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wide font-mono text-orange-400">
                  Mathematics & Algorithmic Foundations
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Holding a <strong className="text-slate-200">BSc in Mathematics</strong> from the University of Lagos, Gideon treats software engineering as the application of rigorous proof and quantitative logic. From designing multi-wallet transactional ledger constraints to formulating Redis caching distributions, his mathematical training ensures code is written with absolute correctness and efficiency.
                </p>
              </div>

              <div className="space-y-2 border-t border-amber-950/40 pt-3">
                <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wide font-mono text-orange-400">
                  The Chess Philosophy of Systems Design
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  An avid chess player, Gideon views system architecture through the lens of strategic board logic. Designing high-throughput payouts and auto-renewal daemons is similar to mapping out lines of play: every command is a calculated move designed to preempt runtime exceptions, mitigate bottlenecks, and secure an optimized endpoint execution path.
                </p>
              </div>

              <blockquote className="border-l-2 border-orange-500 pl-4 py-1 italic text-slate-400 text-xs font-serif bg-orange-500/5 rounded-r">
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

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-400" />
              Featured Projects Catalog
            </h2>
            <p className="text-xs text-slate-500 font-mono">/active-deployments.json</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className={`p-5 border border-amber-950/40 bg-[#141110]/20 rounded-xl space-y-3 ${project.borderColor} transition-colors flex flex-col justify-between group`}
              >
                <div className="space-y-2">
                  <span className={`font-mono text-[9px] ${project.accentColor} uppercase font-bold tracking-wider`}>
                    {project.number}. {project.category}
                  </span>
                  <h3 className={`font-bold text-slate-200 text-sm ${project.hoverText} transition-colors`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>
                
                <div className="space-y-3.5 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-slate-900 px-2 py-0.5 rounded text-[9px] font-mono text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-amber-950/40/60 pt-2 flex items-center justify-between">
                    <button 
                      onClick={() => handleOpenProjectDetails(project)}
                      className="text-[9px] font-mono text-slate-500 hover:text-slate-100 transition-colors uppercase tracking-widest flex items-center gap-1 group/btn cursor-pointer"
                    >
                      View Log Insights
                      <span className="group-hover/btn:translate-x-0.5 transition-transform font-bold">&gt;</span>
                    </button>
                    
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[9px] font-mono text-slate-500 hover:text-orange-400 transition-colors uppercase tracking-widest"
                      >
                        Site ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* METRICS & GIT CONTRIBUTION CALENDARS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetricsMonitor />
          <GitStats />
        </section>

        {/* DEVELOPER TERMINAL CONSOLE */}
        <section id="terminal" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-orange-400" />
              Interactive Console Shell
            </h2>
            <p className="text-xs text-slate-500 font-mono">Type commands directly to query Gideon's database.</p>
          </div>
          <Terminal />
        </section>

        {/* WORK TIMELINE EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-400" />
              Professional Experience
            </h2>
            <p className="text-xs text-slate-500 font-mono">/history.xml</p>
          </div>

          <div className="relative border-l border-slate-800 pl-4 ml-2 space-y-8 font-mono text-xs">
            {/* Konga */}
            <div className="relative space-y-1.5">
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-orange-400 rounded-full ring-4 ring-[#0a0806]" />
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-slate-100">Konga — Software Engineer</span>
                <span className="text-orange-400 flex items-center gap-1 font-semibold text-[10px]">
                  <Calendar className="w-3 h-3" />
                  2024 - PRESENT
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Optimized payouts and escrow releases, patched synchronization daemons, resolved resource locks in high-volume background QoS cron tasks, and managed staging clusters.
              </p>
            </div>

            {/* Golden Attic */}
            <div className="relative space-y-1.5">
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-indigo-500 rounded-full ring-4 ring-[#0a0806]" />
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-slate-100">Golden Attic — Senior Full-Stack Engineer (Part-time)</span>
                <span className="text-indigo-400 flex items-center gap-1 font-semibold text-[10px]">
                  <Calendar className="w-3 h-3" />
                  2021 - PRESENT
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Led platform migration from Laravel 5.8 to 11 with zero data loss, built multi-wallet dual-currency P2P transaction ledgers, and engineered event-driven reward queue processors.
              </p>
            </div>

            {/* Freelance */}
            <div className="relative space-y-1.5">
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-[#0a0806]" />
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-slate-100">Freelance — Full-Stack & DevOps Consultant</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[10px]">
                  <Calendar className="w-3 h-3" />
                  2020 - PRESENT
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Created Sabre Tariff auto-seeders and billing gateways for Transglobal & Cargo; managed FastAPI microservices routing for Lextorah; engineered multi-tenant Visitor Management Systems.
              </p>
            </div>

            {/* Xxolcare */}
            <div className="relative space-y-1.5">
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-700 rounded-full ring-4 ring-[#0a0806]" />
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-slate-100">Xxolcare — Software Developer</span>
                <span className="text-slate-500 flex items-center gap-1 font-semibold text-[10px]">
                  <Calendar className="w-3 h-3" />
                  2022 - 2024
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Built care hospitality booking algorithms, integrated Paystack webhooks with transactional mail notifications, and set up Dockerized environments.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="space-y-6 max-w-xl mx-auto border border-amber-950/40 bg-[#141110]/20 p-6 rounded-xl backdrop-blur-md">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-slate-100 flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              Contact & Connections Node
            </h2>
            <p className="text-[11px] text-slate-500 font-mono">Submit a query securely to the portfolio sqlite log.</p>
          </div>

          {/* Direct contact nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-amber-950/40/60 bg-slate-950/40 p-4 rounded-lg font-mono text-[10px]">
            <div className="flex flex-col gap-1 items-center sm:items-start">
              <span className="text-slate-500 uppercase tracking-widest text-[9px]">DIRECT EMAIL</span>
              <a href="mailto:nwadialugideon@gmail.com" className="text-orange-400 hover:underline transition-all">
                nwadialugideon@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1 items-center sm:items-start border-t sm:border-t-0 sm:border-l border-amber-950/40/60 pt-2 sm:pt-0 sm:pl-4">
              <span className="text-slate-500 uppercase tracking-widest text-[9px]">PHONE NODE</span>
              <a href="tel:+2348105347918" className="text-orange-400 hover:underline transition-all">
                +2348105347918
              </a>
            </div>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <CheckCircle2 className="w-8 h-8" />
              <span className="font-bold text-sm">Message Transmitted Successfully!</span>
              <p className="text-[10px] text-slate-400 max-w-xs">Your transmission has been saved to the portfolio SQLite db. Thank you!</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-orange-400 outline-none focus:border-orange-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-orange-400 outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500">Transmission Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-orange-400 outline-none focus:border-orange-500/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/40 hover:border-orange-500 text-orange-400 font-bold rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {loading ? 'Transmitting...' : 'Send Transmission'}
              </button>
            </form>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-950 py-6 text-center font-mono text-[10px] text-slate-600 relative z-10">
        <div>Designed & Programmed inside Docker container node-01</div>
        <div className="mt-1">Active deployment on Render | SQLite Powered</div>
      </footer>

      {/* Dynamic Telemetry Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-[#090e18] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs text-slate-300"
          >
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-amber-950/40 bg-slate-950 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                system telemetry: {selectedProject.id}.sh
              </span>
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setModalStage('idle');
                }}
                className="text-slate-500 hover:text-slate-100 transition-colors text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {modalStage === 'loading' ? (
                <div className="space-y-4 min-h-[220px] flex flex-col justify-end">
                  <div className="space-y-1.5 flex-1">
                    {loadingLogs.map((log, i) => (
                      <div key={i} className="text-emerald-400/90 leading-relaxed text-[11px]">
                        {log}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-orange-400 font-bold text-[10px] animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                    SPINNING UP COMPUTE POD DAEMON...
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* System Architecture Node Details */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Deployment Target</span>
                      <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                        {selectedProject.details.system}
                      </h4>
                    </div>
                    
                    <div className="space-y-2 border-l border-amber-950/40 pl-4 py-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide block mb-1">Main Contributions</span>
                      <ul className="list-none space-y-2">
                        {selectedProject.details.contributions.map((item: string, i: number) => {
                          const [title, desc] = item.split(': ');
                          return (
                            <li key={i} className="text-[11px] leading-relaxed text-slate-400">
                              <strong className={`text-slate-200 ${selectedProject.accentColor}`}>{title}:</strong> {desc}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Git Commit Telemetry Log */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Commit History Insights</span>
                    <div className="bg-slate-950/70 border border-amber-950/40 p-4 rounded-lg space-y-1.5">
                      {selectedProject.details.commits.map((commit: string, i: number) => (
                        <div key={i} className="text-slate-400 text-[11px] flex gap-2 font-mono">
                          <span className="text-amber-500/90 select-none">&gt;</span>
                          <span>{commit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Production Link */}
                  {selectedProject.details.url && (
                    <div className="pt-2 border-t border-amber-950/40 flex justify-end">
                      <a 
                        href={selectedProject.details.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 hover:border-orange-500/40 px-4 py-2 rounded font-bold font-mono transition-all text-[11px] flex items-center gap-1.5 cursor-pointer"
                      >
                        Launch Production Site
                        <span className="text-xs">↗</span>
                      </a>
                    </div>
                  )}
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
