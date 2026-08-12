import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Mail, 
  Github, 
  Linkedin, 
  Briefcase, 
  Calendar,
  Send,
  CheckCircle2,
  ArrowRight,
  FileText,
  ChevronDown,
  MapPin
} from 'lucide-react';
import Logo from './components/Logo';
import ChatWidget from './components/ChatWidget';
import Mascot from './components/Mascot';
import MobileMapNav from './components/MobileMapNav';
import NextRead from './components/NextRead';

export const PROJECTS = [
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
        '4 independently versioned service repositories',
        '20 tests and 45 migrations in the companies service',
        'WalletService uses row locks, reference idempotency, and 5-attempt transaction retries',
        'RouteGraphService uses bounded path search and precomputed all-pairs shortest paths'
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
        '2 connected product repositories',
        '45 tests and 57 migrations across Transglobal Backyard and Cargo',
        'Custom tariff overrides, commission calculations, shipment tracking, and payment provider interfaces',
        'Self-healing tariff imports and migration to a single SeerBit provider'
      ],
      contributions: [
        'Full-Stack Architecture: Engineered both the Transglobal API hub and Cargo shipping portal from scratch, designing database schemas, multi-tenant referral models, and admin/customer dashboards.',
        'Paystack DVA Gateway: Integrated Paystack dedicated virtual bank accounts linked to customer codes, with explicit name normalization and retry handling for validation failures.',
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
    title: 'Ansar-Ud-Deen Society Digital Platform',
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
        'Prisma migrations, Redis-backed BullMQ jobs, Sentry instrumentation, and operational runbooks',
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
    id: 'golden-attic',
    number: '08',
    category: 'Financial Commerce',
    title: 'Golden Attic Community Platform',
    shortDesc: 'Modernized a community economic platform spanning dual-currency wallets, marketplace operations, referral networks, rewards processing, data migration, testing, and containerized delivery.',
    tags: ['Laravel 11', 'PHP', 'Redis', 'Docker'],
    borderColor: 'hover:border-amber-500/30',
    hoverText: 'group-hover:text-amber-400',
    accentColor: 'text-amber-400',
    link: null,
    details: {
      url: null,
      system: 'Golden Attic Community Economic Platform',
      role: 'Senior full-stack engineer owning modernization and delivery across backend services, financial workflows, seller interfaces, data, testing, and deployment.',
      constraints: 'The live platform needed a major framework upgrade while preserving more than 100,000 historical records and maintaining correctness across wallets, commissions, marketplace orders, and referral rewards.',
      architecture: ['Laravel 11 application', 'Cash + shopping + investment wallets', 'Redis-backed queues', 'Marketplace + referral network'],
      evidence: [
        'Laravel 5.8 to Laravel 11 upgrade with more than 100,000 historical records preserved',
        'Cash, shopping, and investment wallets operating across XOF and USD',
        'Queued reward and commission processing reduced server overhead by 35%',
        'Ledger, marketplace, genealogy, CI, and Docker workflows maintained as one production platform'
      ],
      contributions: [
        'Platform Modernization: Led the Laravel 5.8 to 11 migration while preserving more than 100,000 historical records with zero data loss.',
        'Financial Architecture: Built a dual-currency XOF/USD ledger across cash, shopping, and investment wallets, improving settlement speed by 40%.',
        'Ledger Integrity: Added tamper-resistant hashed transaction records, exact wallet arithmetic, spendable-balance holds, and controlled adjustment workflows.',
        'Rewards Processing: Moved rewards and commission workloads onto Laravel queues and Redis, reducing server overhead by 35% while improving throughput.',
        'Seller Marketplace: Delivered multi-step product creation, drafts, localized taxonomy, category suggestions, image cropping, and background-removal tooling.',
        'Network Operations: Built referral and downline topology views for Feeder and Stage matrices, connecting member growth, rewards, and operational reporting.',
        'Delivery Operations: Maintained Docker-based local development, repeatable CI test execution, deployment configuration, and production resilience when Redis is unavailable.'
      ],
      commits: [
        '43049c1 style: modernize the financial activity ledger and receipt flow',
        '6e3ef43 feat: reserve pending debits in wallet spendable balances',
        '832e00d feat: add maker-checker wallet adjustments',
        'bc8b3e5 feat: add localized marketplace taxonomy and category suggestions',
        '21d3f59 feat: add seller image tooling and background removal',
        'caa00c2 feat: overhaul the referral topology tree',
        '2c24337 ci: stabilize test execution without external Redis sessions'
      ]
    }
  },
  {
    id: 'visitor-management',
    number: '09',
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
        '23 project commits',
        'Visitor and staff check-in routes, approval flows, and duplicate-check protection',
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
    number: '10',
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
        '91 project commits',
        'Shipment, tracking update, payout, commission, and sales domains',
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
        'Shipment tracking, Flutterwave callbacks, and commission controls'
      ]
    }
  }
];

const KONGA_CASE_STUDY = {
  id: 'konga-payouts',
  number: '01',
  category: 'Commerce Infrastructure',
  title: 'Konga Merchant Platform Engineering',
  shortDesc: 'Improved merchant money movement, compliance, identity verification, marketplace synchronization, engineering feedback loops, and operational interfaces across a high-volume commerce platform.',
  tags: ['PHP', 'MySQL', 'Redis', 'Kubernetes'],
  borderColor: 'hover:border-orange-500/30',
  hoverText: 'group-hover:text-orange-400',
  accentColor: 'text-orange-400',
  link: 'https://shq.konga.com/',
  links: [{ label: 'Visit SellerHQ', url: 'https://shq.konga.com/' }],
  details: {
    url: 'https://shq.konga.com/',
    links: [{ label: 'Visit SellerHQ', url: 'https://shq.konga.com/' }],
    system: 'Merchant Commerce and Operations Platform',
    role: 'Software engineer working across merchant-facing applications, middleware, administration systems, scheduled jobs, integrations, and deployment operations.',
    constraints: 'Enterprise source is proprietary; this public case study preserves implementation confidentiality and omits internal topology, source code, credentials, and customer data.',
    architecture: ['Merchant + admin surfaces', 'Marketplace services', 'Scheduled processing', 'Data + external integrations'],
    evidence: [
      'Payout execution time reduced by half',
      'Cursor offsets, bounded 500-record batches, and paced execution',
      'Work delivered across 8 merchant, middleware, administration, identity, notification, integration, and operations repositories'
    ],
    contributions: [
      'Operational Problem: Large payout runs produced database pressure and delayed merchant fund releases.',
      'Batch Strategy: Reworked processing around cursor offsets and bounded groups of 500 records instead of broad scans.',
      'Load Control: Introduced controlled microsecond delays between batches to smooth CPU and database demand.',
      'Recovery Path: Strengthened synchronization daemons and failure handling around payout and catalog workflows.',
      'Platform Delivery: Built or improved wallet debit security, QoS inventory compliance, Dojah-backed identity checks, KOMA pricing, SEO synchronization, email auditing, and responsive merchant operations.',
      'Engineering Enablement: Revived automated testing with containerized execution, isolated test data, service mocks, environment-driven configuration, readiness handling, CI integration, and targeted regression coverage across Codeception, PHPUnit, and Mocha suites.',
      'Multi-Stack Delivery: Worked across AngularJS and TypeScript interfaces, PHP/Yii commerce services, Node.js/Restify identity services, Python/Flask/Celery notifications, and Docker/Kubernetes operations.',
      'Outcome: Cut payout execution time in half while making critical merchant workflows more traceable, recoverable, and operable.'
    ],
    commits: [
      'Production work completed across Konga enterprise repositories.',
      'See the dedicated case study for technical designs and end-to-end delivery paths.'
    ]
  }
};

const FLAGSHIP_CASE_STUDIES = [
  {
    project: KONGA_CASE_STUDY,
    mascot: 'ledger' as const,
    index: '01',
    context: 'Konga / merchant platform',
    problem: 'Merchants needed faster payouts, safer account checks, and more reliable marketplace updates across several internal tools.',
    decision: 'Improved the payout flow, strengthened wallet checks, automated verification work, and made key merchant processes easier to test and recover.',
    outcome: '2x faster payouts',
    outcomeNote: 'merchant payout work completed in half the time',
    evidence: ['Faster payout runs', '8 work areas touched', 'Repeatable tests'],
  },
  {
    project: PROJECTS.find((project) => project.id === 'transglobal')!,
    mascot: 'integrate' as const,
    index: '02',
    context: 'Transglobal x Sabre / logistics',
    problem: 'Shipping quotes, customer accounts, and payment updates were spread across different tools.',
    decision: 'Built one connected hub to manage tariffs, bookings, payments, and shipment updates in one flow.',
    outcome: 'One integration hub',
    outcomeNote: 'from shipping quote to payment confirmation',
    evidence: ['2 connected platforms', '45 tests', '57 data updates'],
  },
  {
    project: PROJECTS.find((project) => project.id === 'tripease')!,
    mascot: 'architect' as const,
    index: '03',
    context: 'TripEase / distributed transit',
    problem: 'Bookings, transport companies, payments, and user accounts all needed to work together without duplicate charges or wallet mistakes.',
    decision: 'Separated the major parts of the product and added checks around payments, bookings, and wallet updates.',
    outcome: '4 connected services',
    outcomeNote: 'booking, payments, fleet, and accounts working together',
    evidence: ['4 product areas', '20 company tests', 'Safer retries'],
  },
];

const HERO_STEPS = ['Design', 'Build', 'Launch', 'Support'];

const PRIMARY_NAV_GROUPS = [
  {
    label: 'About',
    href: '#about',
    summary: 'Start with the person, path, and credibility.',
    links: [
      ['#about', 'Overview'],
      ['/before-systems', 'Origin story'],
      ['/leadership', 'Leadership'],
      ['/credentials', 'Credentials'],
      ['/life', 'Life outside code'],
      ['/resume.html', 'Resume'],
    ],
  },
  {
    label: 'Projects',
    href: '#projects',
    summary: 'See real work, live links, and what each project solved.',
    links: [
      ['#projects', 'Featured cases'],
      ['/work', 'All projects'],
      ['/work/konga-merchant-platform', 'Konga case study'],
    ],
  },
  {
    label: 'Systems',
    href: '#competencies',
    summary: 'See the skills behind the work in plain terms.',
    links: [
      ['#competencies', 'Capabilities'],
      ['/systems', 'How the systems work'],
      ['/console', 'Portfolio console'],
    ],
  },
  {
    label: 'Contact',
    href: '#contact',
    summary: 'Reach out or verify public profiles.',
    links: [
      ['#contact', 'Contact form'],
      ['mailto:hello@gideonnwadialu.com', 'Email'],
      ['https://github.com/Senseiuc', 'GitHub'],
      ['https://www.linkedin.com/in/gideonnwadialu/', 'LinkedIn'],
    ],
  },
];

const EXPLORE_GROUPS = [
  {
    label: 'About me',
    eyebrow: 'Person first',
    description: 'Background, leadership, certificates, life outside code, and a printable resume.',
    links: [
      ['/before-systems', 'Origin story'],
      ['/leadership', 'Leadership'],
      ['/credentials', 'Credentials'],
      ['/life', 'Life outside code'],
      ['/resume.html', 'Resume'],
    ],
  },
  {
    label: 'Projects',
    eyebrow: 'Work delivered',
    description: 'Featured projects, the full archive, live links, and the problems solved.',
    links: [
      ['#projects', 'Featured cases'],
      ['/work', 'All projects'],
      ['/work/konga-merchant-platform', 'Konga case study'],
    ],
  },
  {
    label: 'Systems',
    eyebrow: 'How I build',
    description: 'The skills, flows, and practical decisions behind the work.',
    links: [
      ['#competencies', 'Capabilities'],
      ['/systems', 'How systems work'],
      ['/console', 'Portfolio console'],
    ],
  },
  {
    label: 'Contact',
    eyebrow: 'Next move',
    description: 'Start a conversation, check public profiles, or jump straight to email.',
    links: [
      ['#contact', 'Contact form'],
      ['mailto:hello@gideonnwadialu.com', 'Email'],
      ['https://github.com/Senseiuc', 'GitHub'],
      ['https://www.linkedin.com/in/gideonnwadialu/', 'LinkedIn'],
    ],
  },
];

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeFlagshipIndex, setActiveFlagshipIndex] = useState(0);
  const projectDialogRef = useRef<HTMLDivElement>(null);
  const projectTriggerRef = useRef<HTMLElement | null>(null);
  const activeFlagship = FLAGSHIP_CASE_STUDIES[activeFlagshipIndex];

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
          <a href="#about" className="flex min-h-11 min-w-0 items-center gap-1.5" aria-label="Gideon Nwadialu, back to introduction">
            <Logo className="w-8 h-8" />
            <span className="hidden font-mono text-[10px] font-bold text-slate-100 uppercase min-[360px]:inline sm:text-sm">
              GIDEON <span className="text-orange-400">NWADIALU</span>
            </span>
            <span className="font-mono text-[10px] font-bold text-slate-100 uppercase min-[360px]:hidden">
              GIDEON <span className="text-orange-400">N.</span>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400">
            {PRIMARY_NAV_GROUPS.map((group) => (
              <div key={group.label} className="group/nav relative">
                <a
                  href={group.href}
                  className="inline-flex min-h-11 items-center gap-1.5 px-2 uppercase transition-colors hover:text-orange-400 focus-visible:text-orange-400"
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover/nav:rotate-180" aria-hidden="true" />
                </a>
                <div className="invisible absolute right-0 top-full z-50 w-72 border border-slate-800 bg-[#0d0a07] p-3 opacity-0 shadow-2xl transition-all duration-150 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
                  <p className="text-[10px] font-bold uppercase text-orange-400">{group.label}</p>
                  <p className="mt-1 font-sans text-xs normal-case leading-relaxed text-slate-500">{group.summary}</p>
                  <div className="mt-3 space-y-1">
                    {group.links.map(([href, label]) => (
                      <a
                        key={`${group.label}-${href}`}
                        href={href}
                        className="flex items-center justify-between gap-3 border border-transparent px-2 py-2 text-slate-300 transition-colors hover:border-orange-500/40 hover:bg-orange-500/[0.05] hover:text-orange-400"
                      >
                        <span>{label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
          <MobileMapNav className="md:hidden" />
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" tabIndex={-1} className="max-w-7xl mx-auto px-4 pb-5 pt-3 md:pb-8 md:pt-5 relative z-10 space-y-10 md:space-y-14">

        {/* HERO SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center lg:min-h-[72vh] pb-6 pt-4 md:pb-14 md:pt-8">
          {/* Intro Text */}
          <div className="lg:col-span-7 space-y-5 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex max-w-full items-start gap-2 border-l-2 border-orange-500 pl-3"
            >
              <Cpu className="w-4 h-4 text-orange-400" />
              <span className="min-w-0 font-mono text-[10px] leading-relaxed text-orange-300 uppercase font-bold sm:text-xs">Product engineer / web, mobile, backend</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl text-4xl font-extrabold leading-[1.04] text-slate-100 sm:text-5xl md:text-[3.65rem] lg:text-[3.95rem] xl:text-[4.2rem] xl:leading-[1]"
            >
              I’m Gideon Nwadialu.<br />
              I build the whole application.<br />
              <span className="block text-orange-400">Then make it hold up.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl border-y border-amber-950/50 py-3.5"
              aria-label="Product delivery path: design, build, launch, support"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {HERO_STEPS.map((step, index) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-2.5">
                    <motion.span
                      initial={{ borderColor: 'rgba(30, 41, 59, 1)', color: 'rgb(203, 213, 225)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                      animate={{
                        borderColor: ['rgba(30, 41, 59, 1)', 'rgba(249, 115, 22, 0.95)', 'rgba(30, 41, 59, 1)'],
                        color: ['rgb(203, 213, 225)', 'rgb(255, 237, 213)', 'rgb(203, 213, 225)'],
                        backgroundColor: ['rgba(0, 0, 0, 0.2)', 'rgba(249, 115, 22, 0.18)', 'rgba(0, 0, 0, 0.2)'],
                        boxShadow: ['0 0 0 rgba(249, 115, 22, 0)', '0 0 22px rgba(249, 115, 22, 0.22)', '0 0 0 rgba(249, 115, 22, 0)'],
                      }}
                      transition={{
                        duration: 3.1,
                        delay: index * 0.5,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: 'easeInOut',
                      }}
                      className="border px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase sm:px-3 sm:text-xs"
                    >
                      {step}
                    </motion.span>
                    {index < HERO_STEPS.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0.35, scaleX: 0.7 }}
                        animate={{ opacity: [0.35, 1, 0.35], scaleX: [0.7, 1, 0.7] }}
                        transition={{
                          duration: 3.1,
                          delay: index * 0.5 + 0.25,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          ease: 'easeInOut',
                        }}
                        className="h-px w-4 origin-left bg-orange-500 sm:w-6"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase text-slate-500">Complete delivery from idea to live product.</p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed font-sans"
            >
              From first screen to backend, payments, launch, and support, I help turn product ideas into working software.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a href="#projects" className="min-h-11 w-full justify-center px-5 py-3 bg-orange-500 hover:bg-orange-400 text-[#0a0806] rounded font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer sm:w-auto">
                Explore selected work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/resume.html" className="min-h-11 px-4 py-3 border border-slate-700 hover:border-orange-500/60 rounded font-semibold text-sm text-slate-200 transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Resume
              </a>
              <a aria-label="GitHub profile" href="https://github.com/Senseiuc" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
              <a aria-label="LinkedIn profile" href="https://www.linkedin.com/in/gideonnwadialu/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 rounded transition-colors text-slate-400 hover:text-orange-400 cursor-pointer">
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
                  preload="metadata"
                  poster="/background-senseiuc-design.webp"
                  aria-label="Animated Senseiuc chessboard identity"
                  className="block w-full h-full object-contain"
                />
              </div>
              <div className="border-t border-amber-900/40 p-4">
                <div>
                  <p className="font-mono text-[10px] uppercase text-orange-400">Senseiuc / product build 01</p>
                  <p className="text-sm text-slate-300 mt-1">Ideas turned into dependable software.</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                  <span className="inline-flex items-center gap-1.5 border border-slate-800 bg-black/20 px-2.5 py-1 text-slate-400">
                    <span className="relative flex h-4 w-4 items-center justify-center text-orange-400" aria-hidden="true">
                      <span className="absolute h-5 w-5 animate-ping rounded-full border border-orange-500/50" />
                      <span className="absolute h-2 w-2 rounded-full bg-orange-500/35" />
                      <MapPin className="relative h-3.5 w-3.5" />
                    </span>
                    Lagos, Nigeria / Remote
                  </span>
                  <span className="border border-orange-500/40 bg-orange-500/[0.08] px-2.5 py-1 text-orange-300">Open to product engineering roles</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section aria-labelledby="systems-practice-title" className="border-y border-amber-950/50 py-7 md:py-9">
          <div className="mb-6">
            <div>
              <p className="font-mono text-xs uppercase text-orange-400">How I work</p>
              <h2 id="systems-practice-title" className="mt-2 max-w-3xl text-2xl font-extrabold text-slate-100 md:text-3xl">
                How I keep projects reliable.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border border-amber-950/60 bg-amber-950/60 md:grid-cols-3">
            {[
              {
                variant: 'ledger' as const,
                number: '01',
                title: 'Keep money safe',
                outcome: 'Payments and records stay clear.',
                copy: 'I make payment flows, refunds, wallets, and reports easier to track and harder to break.',
              },
              {
                variant: 'integrate' as const,
                number: '02',
                title: 'Connect your tools',
                outcome: 'Your website, app, and admin tools work together.',
                copy: 'I connect screens, payments, messages, dashboards, and third-party services into one smoother workflow.',
              },
              {
                variant: 'architect' as const,
                number: '03',
                title: 'Plan for real life',
                outcome: 'The product keeps working when things go wrong.',
                copy: 'I add checks, retries, alerts, and recovery paths before small issues become business blockers.',
              },
            ].map((item, index) => (
              <article key={item.number} className="group relative grid min-h-[190px] grid-cols-[74px_1fr] gap-4 bg-[#0a0806] p-4 pl-3 sm:grid-cols-[88px_1fr] md:min-h-[280px] md:grid-cols-1 md:p-5">
                <div className="relative flex justify-center md:block">
                  {index < 2 && <span className="absolute left-1/2 top-16 h-[calc(100%+3.5rem)] -translate-x-1/2 border-l border-dashed border-amber-900/70 md:hidden" aria-hidden="true" />}
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-amber-950/70 bg-[#0d0a07] shadow-[0_0_20px_rgba(249,115,22,0.08)] sm:h-20 sm:w-20 md:mx-auto md:h-auto md:w-auto md:border-0 md:bg-transparent md:shadow-none">
                    <Mascot
                      variant={item.variant}
                      label={`${item.title} Senseiuc mascot`}
                      motion={item.variant === 'architect' ? 'inspect' : 'float'}
                      className="w-16 transition-transform duration-300 group-hover:scale-[1.03] sm:w-20 md:mx-auto md:w-32"
                    />
                  </span>
                </div>
                <div className="self-center md:self-auto">
                  <span className="font-mono text-[11px] text-orange-400">MOVE {item.number}</span>
                  <h3 className="mt-1 text-xl font-bold text-slate-100 md:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-200">{item.outcome}</p>
                  <p className="mt-2 hidden text-sm leading-relaxed text-slate-500 sm:block">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-7 md:space-y-10" aria-labelledby="selected-work-title">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Selected work / real projects</p>
              <h2 id="selected-work-title" className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-100">
                Projects built to solve real business problems.
              </h2>
            </div>
            <p className="md:col-span-5 text-sm md:text-base leading-relaxed text-slate-400">
              Three examples showing the problem, what I changed, and the result.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[290px_1fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <div className="flex gap-2 overflow-x-auto border-y border-amber-950/60 py-2 lg:block lg:space-y-2 lg:overflow-visible lg:border lg:p-2">
                {FLAGSHIP_CASE_STUDIES.map((story, index) => {
                  const isActive = index === activeFlagshipIndex;
                  return (
                    <button
                      key={story.project.id}
                      type="button"
                      onClick={() => setActiveFlagshipIndex(index)}
                      className={`group min-w-[235px] flex-1 border px-3 py-3 text-left transition-colors lg:min-w-0 ${
                        isActive
                          ? 'border-orange-500/70 bg-orange-500/[0.08]'
                          : 'border-slate-800 bg-[#0a0806]/80 hover:border-amber-800/80 hover:bg-orange-500/[0.03]'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase text-slate-500">
                        Case {story.index}
                        <span className={isActive ? 'text-orange-400' : 'text-slate-700'}>●</span>
                      </span>
                      <span className="mt-2 block text-sm font-bold text-slate-100">{story.project.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-500">{story.context}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.article
              key={activeFlagship.project.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden border border-amber-950/60 bg-[#0d0a07]/86"
            >
              <div className="absolute inset-0 systems-grid opacity-[0.12]" aria-hidden="true" />
              <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_310px]">
                <div className="p-5 sm:p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase text-orange-400">
                        Project snapshot / {activeFlagship.context}
                      </p>
                      <h3 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-100 md:text-5xl">
                        {activeFlagship.project.title}
                      </h3>
                    </div>
                    <Mascot
                      variant={activeFlagship.mascot}
                      label={`${activeFlagship.project.title} case study mascot`}
                      motion={activeFlagship.mascot === 'architect' ? 'inspect' : 'float'}
                      className="w-20 shrink-0 sm:w-28 md:hidden"
                    />
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="border-l border-orange-500/70 pl-4">
                      <p className="font-mono text-[10px] uppercase text-slate-500">Problem</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeFlagship.problem}</p>
                    </div>
                    <div className="border-l border-slate-700 pl-4">
                      <p className="font-mono text-[10px] uppercase text-slate-500">What I did</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeFlagship.decision}</p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {activeFlagship.evidence.map((item, index) => (
                      <div key={item} className="min-h-24 border border-slate-800 bg-black/20 p-3">
                        <p className="font-mono text-[10px] uppercase text-slate-600">Detail {index + 1}</p>
                        <p className="mt-3 text-sm font-semibold leading-snug text-slate-200">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {activeFlagship.project.tags.map((tag) => (
                      <span key={tag} className="border border-slate-800 bg-[#0a0806]/70 px-2.5 py-1 text-[11px] font-mono text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {activeFlagship.project.id === 'konga-payouts' ? (
                      <a
                        href="/work/konga-merchant-platform"
                        className="inline-flex min-h-11 items-center gap-2 bg-orange-500 px-4 py-2.5 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400"
                      >
                        Open case study
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(event) => handleOpenProjectDetails(activeFlagship.project, event.currentTarget)}
                        className="inline-flex min-h-11 items-center gap-2 bg-orange-500 px-4 py-2.5 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400"
                      >
                        View project details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {(activeFlagship.project.links ?? (activeFlagship.project.link ? [{ label: 'Visit production site', url: activeFlagship.project.link }] : [])).map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-xs font-mono text-slate-300 transition-colors hover:text-orange-400"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>

                <aside className="border-t border-amber-950/60 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-7">
                  <div className="flex items-center gap-4 lg:block">
                    <Mascot
                      variant={activeFlagship.mascot}
                      label={`${activeFlagship.project.title} outcome mascot`}
                      motion={activeFlagship.mascot === 'architect' ? 'inspect' : 'float'}
                      className="hidden w-32 md:block lg:w-40"
                    />
                    <div>
                      <p className="font-mono text-[11px] uppercase text-slate-500">Outcome</p>
                      <p className="mt-2 text-3xl font-extrabold leading-none text-orange-400 md:text-4xl">{activeFlagship.outcome}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{activeFlagship.outcomeNote}</p>
                    </div>
                  </div>
                  <div className="mt-7 border-t border-slate-800 pt-5">
                    <p className="font-mono text-[10px] uppercase text-slate-500">Built with</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeFlagship.project.details.architecture?.map((item: string) => (
                        <span key={item} className="bg-slate-900/70 px-2 py-1 text-[11px] text-slate-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </motion.article>
          </div>
        </section>

        {/* CORE COMPETENCIES GRID */}
        <section id="competencies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">What I can help with</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-400" />
              Core Skills
              </h2>
            </div>
            <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">I can help with the full product: screens, backend, mobile app, deployment, and support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-y border-slate-800 md:border-x">
            <div className="relative p-5 pb-20 sm:p-6 sm:pr-28 border-b md:border-r border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="code" motion="inspect" className="absolute right-2 bottom-1 w-16 sm:w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">01 / Websites & dashboards</span>
              <h3 className="font-bold text-slate-200 text-base">Screens People Can Use</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Builds websites, portals, dashboards, booking flows, and admin tools that are clear on desktop and mobile.
              </p>
            </div>

            <div className="relative p-5 pb-20 sm:p-6 sm:pr-28 border-b border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="secure" motion="inspect" className="absolute right-2 bottom-1 w-16 sm:w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">02 / Backend & payments</span>
              <h3 className="font-bold text-slate-200 text-base">Reliable Business Logic</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Builds the behind-the-scenes parts: accounts, payments, notifications, reports, data, and integrations with other services.
              </p>
            </div>

            <div className="relative p-5 pb-20 sm:p-6 sm:pr-28 md:border-r border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="build" motion="float" className="absolute right-2 bottom-1 w-16 sm:w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">03 / Mobile apps</span>
              <h3 className="font-bold text-slate-200 text-base">Mobile Apps Connected to the Web</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Builds Flutter mobile apps that connect to the same accounts, content, payments, and admin tools as the website.
              </p>
            </div>

            <div className="relative p-5 pb-20 sm:p-6 sm:pr-28 border-t md:border-t-0 border-slate-800 space-y-2 hover:bg-orange-500/[0.03] transition-colors overflow-hidden">
              <Mascot variant="deploy" motion="celebrate" className="absolute right-2 bottom-1 w-16 sm:w-20 opacity-80" />
              <span className="font-mono text-[11px] text-orange-400 uppercase font-bold">04 / Launch & support</span>
              <h3 className="font-bold text-slate-200 text-base">From Code to Live Product</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sets up deployments, fixes issues, improves speed, and keeps the product easier to maintain after it goes live.
              </p>
            </div>
          </div>
        </section>

        <section id="before-systems" className="grid grid-cols-1 md:grid-cols-12 gap-6 md:items-center border-y border-slate-800 py-7">
          <div className="relative md:col-span-3 min-h-24 pr-24 flex flex-col justify-center">
            <p className="font-mono text-xs uppercase text-orange-400">The prequel</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-100">Before I built systems</h2>
            <img src="/senseiuc-section-teaching.png" alt="Senseiuc mascot teaching mathematics" width="512" height="512" loading="lazy" decoding="async" className="mascot mascot--inspect absolute right-0 bottom-0 w-24 object-contain" />
          </div>
          <p className="md:col-span-6 text-sm leading-relaxed text-slate-400">
            I taught mathematics, ran tutorials, trained teams, fixed office computers, supervised hospitality operations, designed flyers, edited video, and kept asking how the work itself could be better. Software became the next classroom.
          </p>
          <div className="md:col-span-3 md:text-right">
            <a href="/before-systems" className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">
              Read the origin story <ArrowRight className="w-4 h-4" />
            </a>
          </div>
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
            <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">Work across commerce, finance, consulting, logistics, care, and community platforms.</p>
          </div>

          <div className="border-y border-slate-800 divide-y divide-slate-800">
            {[
              ['2024 — PRESENT', 'Konga', 'Software Engineer', 'Improved merchant payouts, repaired marketplace sync issues, supported money movement workflows, and helped keep key commerce tools stable.'],
              ['2021 — PRESENT', 'Golden Attic', 'Senior Full-Stack Engineer, part-time', 'Upgraded the platform, preserved more than 100,000 records, improved wallets, and rebuilt reward and marketplace workflows.'],
              ['2020 — PRESENT', 'Independent consulting', 'Full-Stack & DevOps Consultant', 'Built shipping, billing, AI learning, and visitor-management platforms for different clients.'],
              ['2022 — 2024', 'Xxolcare', 'Software Developer', 'Built booking flows, payment updates, staff tools, and cleaner development/deployment processes.'],
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

        <section aria-labelledby="explore-more-title" className="border-y border-amber-950/60 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-xs uppercase text-orange-400">Portfolio routes</p>
              <h2 id="explore-more-title" className="mt-2 text-2xl font-extrabold text-slate-100">Choose the right doorway.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Start with the section that matters most to you: who I am, what I have built, how I work, or how to reach me.
              </p>
            </div>
            <nav aria-label="Additional portfolio areas" className="grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 md:col-span-8 md:grid-cols-2">
              {EXPLORE_GROUPS.map((group) => (
                <article key={group.label} className="bg-[#0a0806] p-4 sm:p-5">
                  <p className="font-mono text-[10px] uppercase text-orange-400">{group.eyebrow}</p>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-100">{group.label}</h3>
                  <p className="mt-2 min-h-12 text-xs leading-relaxed text-slate-500">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.links.map(([href, label]) => (
                      <a
                        key={`${group.label}-${href}`}
                        href={href}
                        className="inline-flex min-h-9 items-center gap-2 border border-slate-800 px-2.5 py-1.5 text-xs font-bold text-slate-300 transition-colors hover:border-orange-500/60 hover:text-orange-400"
                      >
                        {label}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </nav>
          </div>
        </section>

        <section id="leadership" className="hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Leadership & mentorship</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100">Helping people do their best work</h2>
            </div>
            <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">Leadership shaped through academic support, community organizing, tutoring, mentorship, and creating room for other people to contribute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-slate-800 md:border-x">
            {[
              ['Vice President', 'National Association of Mathematical Science Students', '2021 - 2023', 'Coordinated tutors, mentored students through difficult courses, and taught in departmental and faculty-wide tutorials.', 'teach'],
              ['President', 'Young Disciples International', '2017', 'Led the executive team, delivered a 300+ person talent event, and helped increase weekly attendance by 50%.', 'partner'],
              ['Lead Tutor', 'Engineering Career Expo', '2023 - 2024', 'Led tutoring work focused on education, guidance, and helping participants build practical confidence.', 'consult'],
            ].map(([role, organization, period, description, variant], index) => (
              <article key={`${role}-${organization}`} className={`relative min-h-[220px] p-6 pr-24 overflow-hidden ${index < 2 ? 'border-b md:border-b-0 md:border-r' : ''} border-slate-800`}>
                <span className="font-mono text-[10px] text-orange-400">0{index + 1} / {period}</span>
                <h3 className="mt-2 text-lg font-bold text-slate-100">{role}</h3>
                <p className="mt-1 text-xs font-mono text-slate-500">{organization}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{description}</p>
                <Mascot variant={variant as 'teach' | 'partner' | 'consult'} motion="float" className="absolute right-2 bottom-2 w-20 opacity-75" />
              </article>
            ))}
          </div>

          <div className="text-right">
            <a href="/leadership" className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">
              Explore leadership experience <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section id="certifications" className="hidden">
          <div className="relative md:col-span-3 min-h-24 pr-24 flex flex-col justify-center">
            <p className="font-mono text-xs uppercase text-orange-400">Credentials</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-100">Selected certifications</h2>
            <img src="/senseiuc-section-certificate.png" alt="Senseiuc mascot holding a certificate" width="512" height="512" loading="lazy" decoding="async" className="mascot mascot--celebrate absolute right-0 bottom-0 w-24 object-contain" />
          </div>
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border-l border-orange-500 pl-4">
              <p className="text-sm font-bold text-slate-200">ALX Software Engineering</p>
              <p className="mt-1 text-xs text-slate-500">Backend Development / 2023</p>
            </div>
            <div className="border-l border-slate-700 pl-4">
              <p className="text-sm font-bold text-slate-200">Google IT Automation with Python</p>
              <p className="mt-1 text-xs text-slate-500">Google / 2021</p>
            </div>
          </div>
          <div className="md:col-span-3 md:text-right">
            <a href="/credentials" className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">
              View all credentials <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section id="for-fun" className="hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase text-orange-400">Off the clock</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-100">What I do for fun</h2>
            </div>
            <p className="md:col-span-5 text-sm leading-relaxed text-slate-400">A few things that keep me curious, grounded, competitive, and connected when I am not building software.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 border-y border-slate-800 md:border-x">
            {[
              ['Chess', 'I enjoy the quiet tension of planning ahead, testing ideas, and finding the move that changes the position.', 'think', 'inspect'],
              ['Fitness', 'Training keeps my energy steady and reminds me that meaningful progress usually comes from consistency.', 'build', 'celebrate'],
              ['Poetry', 'I write and read poetry for the precision of language and the freedom to say more with fewer words.', 'teach', 'float'],
              ['Gaming', 'Games are where systems, stories, competition, and experimentation get to coexist.', 'debug', 'inspect'],
              ['Music', 'I listen across moods and genres, whether I need focus, momentum, reflection, or simply a good chorus.', 'cloud', 'float'],
              ['Meeting people', 'I like hearing how other people think, what they are building, and the experiences that shaped them.', 'partner', 'celebrate'],
            ].map(([title, description, variant, mascotMotion], index) => (
              <article key={title} className={`relative min-h-[190px] p-5 pr-20 overflow-hidden ${index % 2 === 0 ? 'border-r' : ''} md:border-r md:[&:nth-child(3n)]:border-r-0 border-slate-800 ${index < 4 ? 'border-b' : ''} md:[&:nth-child(-n+3)]:border-b md:[&:nth-child(n+4)]:border-b-0`}>
                <span className="font-mono text-[10px] text-orange-400">0{index + 1}</span>
                <h3 className="mt-2 text-base font-bold text-slate-100">{title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">{description}</p>
                {title === 'Chess' || title === 'Fitness' || title === 'Music' ? (
                  <img
                    src={title === 'Chess' ? '/senseiuc-hobby-chess.png' : title === 'Fitness' ? '/senseiuc-hobby-fitness.png' : '/senseiuc-hobby-music.png'}
                    alt={`${title} mascot`}
                    width="512"
                    height="512"
                    loading="lazy"
                    decoding="async"
                    className={`mascot mascot--${mascotMotion} absolute right-1 bottom-1 object-contain opacity-90 ${title === 'Music' ? 'w-16 sm:w-20' : 'w-20 sm:w-24'}`}
                  />
                ) : (
                  <Mascot
                    variant={variant as 'think' | 'build' | 'teach' | 'debug' | 'cloud' | 'partner'}
                    motion={mascotMotion as 'float' | 'inspect' | 'celebrate'}
                    label={`${title} mascot`}
                    className="absolute right-2 bottom-2 w-16 sm:w-20 opacity-80"
                  />
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 border-y border-amber-950/60 py-8 md:py-14">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase text-orange-400">Your move</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-100">Bring me the difficult part.</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 max-w-md">
              I’m open to web and mobile products, backend and payment platforms, integrations, and ongoing product support.
            </p>
            <div className="mt-5 lg:mt-6 flex items-center gap-3 sm:gap-5 lg:block">
              <Mascot variant="integrate" label="Senseiuc partnership mascot" motion="float" className="w-16 sm:w-24 lg:w-36" />
              <div className="min-w-0 space-y-3 text-sm lg:mt-6">
                <a href="mailto:nwadialugideon@gmail.com" className="flex items-center gap-2 whitespace-nowrap text-xs text-slate-200 hover:text-orange-400 transition-colors sm:text-sm">
                  <Mail className="w-4 h-4 shrink-0" /> nwadialugideon@gmail.com
                </a>
                <p className="font-mono text-xs text-slate-500">Lagos, Nigeria / remote</p>
                <p className="font-mono text-xs text-slate-500">08105347918</p>
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
                className="w-full sm:w-auto px-5 py-3 bg-orange-500 hover:bg-orange-400 text-[#0a0806] font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </form>
            )}
          </div>
        </section>

        <NextRead
          title="Browse the full project archive"
          description="If the featured projects caught your eye, the archive shows more work across web, mobile, backend, payments, logistics, and operations."
          href="/work"
          cta="Open archive"
          icon={Briefcase}
        />

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
                  <p className="font-mono text-xs uppercase text-orange-400 mb-3">Evidence and operating scope</p>
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
                <p className="font-mono text-xs uppercase text-slate-500 mb-3">Selected implementation references</p>
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
