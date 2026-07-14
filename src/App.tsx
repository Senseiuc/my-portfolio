import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  Mail, 
  Github, 
  Linkedin, 
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
        'Surge Price Algorithms: Developed dynamic price multiplier formulas (25%, 35%, 50% peaks) based on booking demand surges.',
        'Variable Queue Optimization: Re-engineered transaction notifications using in-memory variables to bypass worker queue choke-points.',
        'Bot Prevention: Added user registration firewall scripts to block automated signup requests.',
        'Admin Operations Console: Programmed dynamic dashboards managing financial audit trails, onboarding verifications, and manual staff allocations.',
        'Flipped Analytics Audit: Diagnosed and resolved a critical logic error in monthly finance calculations (swapped array pushes) that caused fake deficit reports.',
        'Ancillary Staffing Engine: Developed selection routing controllers onboarding Chauffeur Drivers and Personal Chefs alongside cleaning profiles.',
        'Training Sandbox & Automations: Created a replica staging environment for staff onboarding training, and automated CI/CD deployment pipelines reloading containers during pushes.'
      ],
      commits: [
        '6a83855 feat: add optional website/address fields to staff card',
        '9c5d8e8 feat: add QR code digital business card system for staff',
        '55798e1 fix admin jobs status list display layouts',
        '38e0230 dynamic schedule controller and task calendars',
        '32bf5f4 increased cost by 50% (pricing surge reaction to fake reports)',
        '314d436 fix: webhook payload signature validations',
        'ba7b3b2 test without queue - using variables for mail thread optimization'
      ]
    }
  },
  {
    id: 'lextorah',
    number: '02',
    category: 'AI Learning Platforms',
    title: 'Lextorah Smart-Sync',
    shortDesc: 'Engineered multi-tenant file syncing daemons that monitor, translate, and catalog course video metadata concurrently into database channels.',
    tags: ['FastAPI', 'React', 'Python Watchdog'],
    borderColor: 'hover:border-cyan-500/30',
    hoverText: 'group-hover:text-cyan-400',
    accentColor: 'text-cyan-400',
    link: 'https://lextorah.com',
    details: {
      url: 'https://lextorah.com',
      system: 'Metadata Translation Sync Daemon',
      contributions: [
        'Concurrent Monitoring: Designed dynamic folder watchdogs that track filesystem write updates.',
        'SaaS Multitenancy: Built tenant resource routing boundaries separating learning catalog nodes.',
        'FastAPI API: Authored highly performant routing paths processing heavy payload uploads.'
      ],
      commits: [
        'feat: initial folder monitor hook',
        'refactor: multi-tenant metadata index route',
        'perf: parallel fastAPI upload buffers'
      ]
    }
  },
  {
    id: 'tripease',
    number: '03',
    category: 'Logistics Routing',
    title: 'TripEase Logistics Router',
    shortDesc: 'Designed load-balanced high-throughput packet routing structures for cargo fleet networks, managing live latency offsets and transit states.',
    tags: ['Node.js', 'PostgreSQL', 'Docker'],
    borderColor: 'hover:border-indigo-500/30',
    hoverText: 'group-hover:text-indigo-400',
    accentColor: 'text-indigo-400',
    link: null,
    details: {
      url: null,
      system: 'Transit State Router Load Balancer',
      contributions: [
        'Traffic Gateway: Implemented reverse proxy load balancer routing metrics.',
        'High-Throughput Packets: Managed real-time transit state caches inside Redis indices.',
        'Environment Setup: Fully containerized the fleet monitoring microservices network.'
      ],
      commits: [
        'feat: gateway reverse proxy configurations',
        'perf: redis caching for vehicle telemetry',
        'docker: compile fleet service image'
      ]
    }
  },
  {
    id: 'wings',
    number: '04',
    category: 'Property Management',
    title: 'Wings Tenancy System',
    shortDesc: 'A multi-tenant estate dashboard tracking payments, property status records, dynamic payment gateways integration, and ledger accounts.',
    tags: ['Laravel', 'Blade', 'Dynamic Dashboards'],
    borderColor: 'hover:border-emerald-500/30',
    hoverText: 'group-hover:text-emerald-400',
    accentColor: 'text-emerald-400',
    link: null,
    details: {
      url: null,
      system: 'Estate Multi-Tenant Dashboard',
      contributions: [
        'Tenancies System: Created payment tracking states and property management log views.',
        'Ledgers & Payments: Integrated dynamic online bank payouts mapping transactions.',
        'Dynamic Widgets: Programmed high-fidelity metrics dashboards summarizing rental indexes.'
      ],
      commits: [
        'feat: tenants dynamic dashboard calculations',
        'feat: integrate property payments ledger logs',
        'refactor: show tenancies list views'
      ]
    }
  },
  {
    id: 'radionews',
    number: '05',
    category: 'Content Portals',
    title: 'Radio News CMS',
    shortDesc: 'Engineered administrative backends for real-time news management, login authentications, and audio broadcast streams syndication.',
    tags: ['Laravel', 'Bootstrap', 'Admin Auth'],
    borderColor: 'hover:border-pink-500/30',
    hoverText: 'group-hover:text-pink-400',
    accentColor: 'text-pink-400',
    link: null,
    details: {
      url: null,
      system: 'Broadcasting CMS & Publishing Engine',
      contributions: [
        'Real-time Publishing: Created article editing nodes with media upload buffers.',
        'Secure Auth: Programmed multi-level administrator sign-in gates.',
        'Audio Feeds: Integrated live broadcast streams syndication widgets.'
      ],
      commits: [
        'feat: admin news post controls',
        'feat: login session security wrapper',
        'fix: audio stream sync handler'
      ]
    }
  },
  {
    id: 'transglobal',
    number: '06',
    category: 'Integration APIs',
    title: 'Transglobal Cargo Sabre',
    shortDesc: 'Designed auto-seeder algorithms and billing calculators integrating Sabre logistics protocols with custom local invoicing.',
    tags: ['PHP', 'Sabre API', 'Automated Seeders'],
    borderColor: 'hover:border-yellow-500/30',
    hoverText: 'group-hover:text-yellow-400',
    accentColor: 'text-yellow-400',
    link: null,
    details: {
      url: null,
      system: 'Logistics Sabre Integration API',
      contributions: [
        'Sabre SDK: Integrated Sabre cargo flight availability protocol APIs.',
        'Auto-Seeders: Wrote database seeders fetching bulk global airport tariff indexes.',
        'Calculators: Coded logic calculating live customs clearances and freight taxes.'
      ],
      commits: [
        'feat: Sabre SOAP gateway bindings',
        'perf: optimize tariff auto-seed speed',
        'fix: calculator billing decimals rounding'
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
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] glow-bg" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] glow-bg" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Floating Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#070a13]/70 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-mono text-sm font-bold text-slate-100 uppercase tracking-widest">
              GIDEON <span className="text-cyan-400">NWADIALU</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">/about</a>
            <a href="#competencies" className="hover:text-cyan-400 transition-colors">/skills</a>
            <a href="#study" className="hover:text-cyan-400 transition-colors">/study</a>
            <a href="#engine-room" className="hover:text-cyan-400 transition-colors">/engine-room</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">/projects</a>
            <a href="#terminal" className="hover:text-cyan-400 transition-colors">/terminal</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">/experience</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">/contact</a>
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
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Systems Architect & Developer</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight"
            >
              Nwadialu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Gideon</span>
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
              <a href="#contact" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-900 rounded font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg cursor-pointer">
                <Mail className="w-3.5 h-3.5" />
                Contact Gideon
              </a>
              <a href="https://github.com/Senseiuc" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-800 hover:border-cyan-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-cyan-400 cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-800 hover:border-cyan-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-cyan-400 cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Profile Logo Card with background-senseiuc-design.png background */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full aspect-square max-w-[360px] mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-[#0f172a]/50 p-6 flex flex-col items-center justify-center shadow-2xl group"
          >
            {/* Background design image with overlay gradient */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('/background-senseiuc-design.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-transparent to-transparent z-0" />

            {/* Brand Logo in center (Animated Transparent SVG Logo) */}
            <div className="relative z-10 w-44 h-44 flex items-center justify-center">
              <Logo className="w-full h-full" />
            </div>
            <div className="relative z-10 mt-6 font-mono text-[10px] text-slate-500 text-center uppercase tracking-widest">
              senseiuc vps-01 node
            </div>
          </motion.div>
        </section>

        {/* CORE COMPETENCIES GRID */}
        <section id="competencies" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Core Competencies
            </h2>
            <p className="text-xs text-slate-500 font-mono">/capabilities-matrix.json</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-slate-800 bg-[#0f172a]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
              <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold">1. Fintech & Ledger Operations</span>
              <h3 className="font-bold text-slate-200 text-sm">Escrow Wallet Payouts & Audits</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Optimized billing and payouts updates in backend daemons using cursor offsets in chunked batches of 500 records with microsecond delays, **releasing payments twice as fast and eliminating database locking spikes**.
              </p>
            </div>

            <div className="p-5 border border-slate-800 bg-[#0f172a]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
              <span className="font-mono text-[10px] text-indigo-400 uppercase font-bold">2. Systems Governance</span>
              <h3 className="font-bold text-slate-200 text-sm">Smart-Sync Deployment Automation</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Engineered custom smart-sync file isolation scripts, **reducing environment sync delivery times by 50%** while preserving staging configuration overrides and local patches.
              </p>
            </div>

            <div className="p-5 border border-slate-800 bg-[#0f172a]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold">3. Microservices Routing</span>
              <h3 className="font-bold text-slate-200 text-sm">API Gateway Authentication</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Implemented multi-tenant gateways and secure token validation wrappers routing logistics traffic between Laravel microservices, **improving environment setup startup times by 50%**.
              </p>
            </div>

            <div className="p-5 border border-slate-800 bg-[#0f172a]/30 rounded-xl space-y-2 hover:border-slate-700/60 transition-colors">
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 border border-slate-800 bg-[#0f172a]/20 rounded-xl items-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/background-senseiuc-design.png')" }} />
            
            <div className="md:col-span-3 flex justify-center z-10">
              <Logo className="w-36 h-36 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.25)] animate-pulse" />
            </div>
            
            <div className="md:col-span-9 space-y-4 font-sans z-10">
              <div className="space-y-2">
                <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wide font-mono text-orange-400">
                  Mathematics & Algorithmic Foundations
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Holding a <strong className="text-slate-200">BSc in Mathematics</strong> from the University of Lagos, Gideon treats software engineering as the application of rigorous proof and quantitative logic. From designing multi-wallet transactional ledger constraints to formulating Redis caching distributions, his mathematical training ensures code is written with absolute correctness and efficiency.
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-900 pt-3">
                <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wide font-mono text-cyan-400">
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
              <Briefcase className="w-5 h-5 text-cyan-400" />
              Featured Projects Catalog
            </h2>
            <p className="text-xs text-slate-500 font-mono">/active-deployments.json</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className={`p-5 border border-slate-900 bg-[#0f172a]/20 rounded-xl space-y-3 ${project.borderColor} transition-colors flex flex-col justify-between group`}
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
                  
                  <div className="border-t border-slate-900/60 pt-2 flex items-center justify-between">
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
                        className="text-[9px] font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
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
              <TerminalIcon className="w-5 h-5 text-cyan-400" />
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
              <Briefcase className="w-5 h-5 text-cyan-400" />
              Professional Experience
            </h2>
            <p className="text-xs text-slate-500 font-mono">/history.xml</p>
          </div>

          <div className="relative border-l border-slate-800 pl-4 ml-2 space-y-8 font-mono text-xs">
            {/* Konga */}
            <div className="relative space-y-1.5">
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-cyan-400 rounded-full ring-4 ring-[#070a13]" />
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-slate-100">Konga — Software Engineer</span>
                <span className="text-cyan-400 flex items-center gap-1 font-semibold text-[10px]">
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
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-indigo-500 rounded-full ring-4 ring-[#070a13]" />
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
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-[#070a13]" />
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
              <div className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-700 rounded-full ring-4 ring-[#070a13]" />
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
        <section id="contact" className="space-y-6 max-w-xl mx-auto border border-slate-900 bg-[#0f172a]/20 p-6 rounded-xl backdrop-blur-md">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-slate-100 flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              Contact & Connections Node
            </h2>
            <p className="text-[11px] text-slate-500 font-mono">Submit a query securely to the portfolio sqlite log.</p>
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
                    className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-cyan-400 outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-cyan-400 outline-none focus:border-cyan-500/50"
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
                  className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-cyan-400 outline-none focus:border-cyan-500/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-500 text-cyan-400 font-bold rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
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
            <div className="px-4 py-3 border-b border-slate-900 bg-slate-950 flex items-center justify-between">
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
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-[10px] animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
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
                    
                    <div className="space-y-2 border-l border-slate-900 pl-4 py-1">
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
                    <div className="bg-slate-950/70 border border-slate-900 p-4 rounded-lg space-y-1.5">
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
                    <div className="pt-2 border-t border-slate-900 flex justify-end">
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

    </div>
  );
}
