import 'dotenv/config';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'sha256-VnW+cmoqkeo/ANBqsJnlp81KE/9yzmqwiTGzfedx6IA='"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:'],
      mediaSrc: ["'self'"],
      connectSrc: ["'self'", ...(isProduction ? [] : ['ws:', 'http://localhost:*'])],
      fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
if (!isProduction) {
  app.use(cors({ origin: [/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/] }));
}
app.use('/api', (req, res, next) => {
  if (req.method !== 'GET') res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(express.json({ limit: '16kb', strict: true }));

const createLimiter = (windowMs: number, max: number, message: string) => rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: message },
});

const readLimiter = createLimiter(15 * 60 * 1000, 120, 'Too many requests. Please try again shortly.');
const terminalLimiter = createLimiter(10 * 60 * 1000, 30, 'Terminal request limit reached. Please wait before trying again.');
const contactLimiter = createLimiter(60 * 60 * 1000, 5, 'Message limit reached. Please try again later.');
const chatLimiter = createLimiter(10 * 60 * 1000, 20, 'Chat request limit reached. Please wait before trying again.');

app.use(['/api/git-metrics', '/api/metrics'], readLimiter);

const normalizeText = (value: unknown, maxLength: number): string | null => {
  if (typeof value !== 'string') return null;
  const normalized = value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
  return normalized && normalized.length <= maxLength ? normalized : null;
};

const normalizeEmail = (value: unknown): string | null => {
  const email = normalizeText(value, 254)?.toLowerCase();
  if (!email) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
};

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

async function sendContactEmail({ name, email, message }: ContactMessage) {
  const token = process.env.MAILTRAP_TOKEN;
  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.MAIL_TO_EMAIL;
  const fromEmail = process.env.MAIL_FROM_EMAIL || 'hello@senseiuc.com';
  const fromName = process.env.MAIL_FROM_NAME || 'Senseiuc Portfolio';
  const apiBase = process.env.MAILTRAP_API_BASE || 'https://send.api.mailtrap.io';

  if (!token || !toEmail) return { skipped: true };

  const subject = `Portfolio contact from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n');

  const response = await fetch(`${apiBase.replace(/\/$/, '')}/api/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: { email: fromEmail, name: fromName },
      to: [{ email: toEmail }],
      reply_to: { email, name },
      subject,
      text,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Mailtrap send failed with status ${response.status}`);
  }

  return { skipped: false };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Streak Calculation Helpers
async function getGithubStreaks(token: string, username: string) {
  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Senseiuc-Portfolio-App'
      },
      body: JSON.stringify({ query, variables: { username } })
    });

    if (!res.ok) throw new Error(`GraphQL fetch failed: ${res.statusText}`);
    const body = await res.json() as any;
    const calendar = body?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const days = calendar.weeks.flatMap((w: any) => w.contributionDays);
    days.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let longestStreak = 0;
    let tempStreak = 0;
    const todayStr = new Date().toISOString().split('T')[0];

    days.forEach((day: any) => {
      if (day.contributionCount > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        if (day.date !== todayStr) {
          tempStreak = 0;
        }
      }
    });

    let current = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      const day = days[i];
      if (day.contributionCount > 0) {
        current++;
      } else {
        if (day.date === todayStr) {
          continue;
        }
        break;
      }
    }

    return {
      current,
      longest: longestStreak,
      totalCommits: calendar.totalContributions
    };
  } catch (error) {
    console.error('Failed to calculate dynamic GitHub streaks:', error);
    return null;
  }
}

async function getGitlabStreaks(token: string, baseUrl: string) {
  try {
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await fetch(`${baseUrl}/api/v4/events?action=pushed&per_page=100`, { headers });
    if (!res.ok) throw new Error('GitLab events fetch failed');
    const events = await res.json() as any[];

    const pushDates = events.map((e: any) => e.created_at.split('T')[0]);
    const uniqueDates = Array.from(new Set(pushDates)).sort() as string[];

    if (uniqueDates.length === 0) {
      return { current: 0, longest: 0, totalCommits: 240 };
    }

    uniqueDates.reverse();

    let current = 0;
    let lastCheckedDate = new Date(uniqueDates[0]);
    const diffFromToday = Math.floor((Date.now() - lastCheckedDate.getTime()) / 86400000);

    if (diffFromToday <= 1) {
      current = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = new Date(uniqueDates[i]);
        const diff = Math.floor((lastCheckedDate.getTime() - prevDate.getTime()) / 86400000);
        if (diff === 1) {
          current++;
          lastCheckedDate = prevDate;
        } else if (diff > 1) {
          break;
        }
      }
    }

    let longest = 0;
    let temp = 0;
    const ascDates = [...uniqueDates].reverse();
    let prevD: Date | null = null;

    ascDates.forEach((dStr) => {
      const d = new Date(dStr);
      if (prevD === null) {
        temp = 1;
      } else {
        const diff = Math.floor((d.getTime() - prevD.getTime()) / 86400000);
        if (diff === 1) {
          temp++;
        } else if (diff > 1) {
          temp = 1;
        }
      }
      if (temp > longest) {
        longest = temp;
      }
      prevD = d;
    });

    return {
      current,
      longest: Math.max(longest, current),
      totalCommits: 240
    };
  } catch (error) {
    console.error('Failed to calculate dynamic GitLab streaks:', error);
    return null;
  }
}

// Cache variables for Git Metrics
let gitCache: any = null;
let lastGitFetch = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Git Metrics API
app.get('/api/git-metrics', async (req, res) => {
  const now = Date.now();
  if (gitCache && (now - lastGitFetch < CACHE_DURATION)) {
    return res.json(gitCache);
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const username = "Senseiuc";

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Senseiuc-Portfolio-App'
    };
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    const url = githubToken 
      ? 'https://api.github.com/user/repos?per_page=100&type=owner' 
      : `https://api.github.com/users/${username}/repos?per_page=100`;

    const githubRes = await fetch(url, { headers });
    if (!githubRes.ok) throw new Error('GitHub fetch failed');
    const repos = await githubRes.json() as any[];

    // Calculate Language distribution
    const languages: Record<string, number> = {};
    let totalSize = 0;

    repos.forEach((repo: any) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + (repo.size || 1);
        totalSize += repo.size || 1;
      }
    });

    const languageShare = Object.entries(languages).map(([name, size]) => ({
      name,
      percentage: Math.round((size / totalSize) * 100),
    })).sort((a, b) => b.percentage - a.percentage);

    // Contribution data requires authenticated GraphQL access.
    let githubContributions: { currentStreak: number; longestStreak: number; commitsThisYear: number } | null = null;
    if (githubToken) {
      const dynamicStreak = await getGithubStreaks(githubToken, username);
      if (dynamicStreak) {
        githubContributions = {
          currentStreak: dynamicStreak.current,
          longestStreak: dynamicStreak.longest,
          commitsThisYear: dynamicStreak.totalCommits,
        };
      }
    }

    gitCache = {
      github: {
        publicRepos: repos.length,
        starsCount: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
        languages: languageShare.slice(0, 5),
        contributions: githubContributions,
      },
      lastUpdated: new Date().toISOString(),
    };
    lastGitFetch = now;

    res.json(gitCache);
  } catch (error) {
    console.error('Failed to load public GitHub metrics:', error);
    res.status(503).json({ error: 'Public GitHub activity is currently unavailable' });
  }
});

// System Metrics API
app.get('/api/metrics', (req, res) => {
  try {
    const memory = process.memoryUsage();
    const uptime = process.uptime();
    
    // SQLite count metrics
    const msgCount = db.prepare('SELECT COUNT(*) as count FROM messages').get() as { count: number };
    const logsCount = db.prepare('SELECT COUNT(*) as count FROM terminal_logs').get() as { count: number };
    res.json({
      uptime: Math.round(uptime),
      memory: {
        rss: Math.round(memory.rss / 1024 / 1024), // MB
        heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
      },
      database: {
        messagesStored: msgCount.count,
        terminalLogsStored: logsCount.count,
      },
      nodeVersion: process.version,
      platform: process.platform,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve metrics' });
  }
});

// Terminal Commands Executor API
app.post('/api/terminal/run', terminalLimiter, (req, res) => {
  const command = normalizeText(req.body?.command, 40);
  if (!command || !/^[a-z-]+$/i.test(command)) {
    return res.status(400).json({ error: 'Enter a valid terminal command.' });
  }

  const rawCmd = command.toLowerCase();
  
  // Log command execution to database
  try {
    db.prepare('INSERT INTO terminal_logs (command) VALUES (?)').run(rawCmd);
  } catch (err) {
    console.error('Failed to log command:', err);
  }

  let output = '';

  switch (rawCmd) {
    case 'help':
      output = `Available Commands:
  help        - List all custom commands
  skills      - Show full-stack technology list
  timeline    - Print career work experiences
  best-backend - Show the strongest backend examples
  payments    - Explore payment and ledger work
  mobile      - Explore mobile delivery
  devops      - Explore deployment and operations work
  leadership  - Show leadership experience
  recommend-project - Choose a useful case study starting point
  metrics     - Show this portfolio application's runtime
  db-status   - Check status of SQLite backend
  clear       - Clear screen console log
  contact     - Display social channels & links`;
      break;
    case 'skills':
      output = `[Senseiuc Technical Competencies Profile]
  - Frontend: React, Next.js, TypeScript, responsive product interfaces
  - Mobile: Flutter applications connected to shared web and API platforms
  - Backend: PHP (Laravel, Yii, Phalcon), Node.js (Express), FastAPI, REST/GraphQL
  - DevOps: Docker, Kubernetes, Helm, Elastic/Kibana clusters, cPanel
  - AI Integrations: LangGraph, LangChain, Whisper Speech, OpenAI, Huawei Vision
  - Database: MySQL/MariaDB, MongoDB, SQLite, Redis caching`;
      break;
    case 'timeline':
      output = `[Career Journey]
  - Konga (2024 - PRESENT)        | Software Engineer (merchant money movement, compliance, identity, synchronization, testing enablement, and platform operations; optimized payout speeds by 2x)
  - Financial platform (2021 - PRESENT) | Senior Full-Stack Engineer (Part-time, 100k data migrations, ledger builds)
  - Freelance (2020 - PRESENT)    | Lextorah smart-sync, tariff matrix seeders, VMS RBAC ledgers
  - Xxolcare (2022 - 2024)        | Built care scheduling platform, Paystack automation`;
      break;
    case 'best-backend':
      output = `[Backend Starting Points]
  Konga       - Bounded payout processing, wallet correctness, identity, and legacy services
  Transit microservices - Service boundaries, idempotency, row locks, and deadlock retries
  Cargo platform - Tariffs, payment gateways, signed webhooks, and shipment synchronization

Open /systems for workflow diagrams or /work for the full archive.`;
      break;
    case 'payments':
      output = `[Payments and Ledger Work]
  Konga       - Merchant payouts, escrow release, wallet safeguards, and processing recovery
  Financial platform - Dual-currency wallets, holds, controlled adjustments, rewards, and commissions
  Transit microservices - Escrow ledger mutations protected by idempotency, transactions, and row locks
  Cargo platform - Paystack and SeerBit payment verification across connected logistics systems`;
      break;
    case 'mobile':
      output = `[Mobile Delivery]
  Society platform - Flutter member application connected to a NestJS API and shared content platform
  Transit microservices - Mobile transit workflows backed by separate identity, company, payment, and transport services
  Konga          - Portal-wide responsive remediation across merchant and administration workflows`;
      break;
    case 'devops':
      output = `[Delivery and Operations]
  Docker environments, repeatable local setup, CI test execution, Kubernetes workloads,
  Redis-backed jobs, production migrations, monitoring hooks, deployment configuration,
  service readiness handling, and production troubleshooting.`;
      break;
    case 'leadership':
      output = `[Leadership]
  Vice President - National Association of Mathematical Science Students
  President      - Young Disciples International
  Lead Tutor     - Engineering Career Expo
  Reviewer       - ALX Africa

Open /leadership for the complete timeline and outcomes.`;
      break;
    case 'recommend-project':
      output = `[Choose Your Route]
  Hiring manager    -> Start with Konga, then open /work
  Backend engineer  -> Run 'best-backend' and open /systems
  Payments team     -> Run 'payments'
  Product team      -> Review the society platform and financial platform
  Engineering lead -> Review /leadership and the Konga testing chapter`;
      break;
    case 'metrics':
      output = `[Portfolio Application Runtime]
  Node Version: ${process.version}
  Active Platform: ${process.platform}
  Process Heap: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB / ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`;
      break;
    case 'db-status':
      const count = db.prepare('SELECT COUNT(*) as count FROM terminal_logs').get() as { count: number };
      output = `[Database Status]
  Driver: better-sqlite3 (SQLite)
  Database Path: portfolio.db
  Active Tables: messages, terminal_logs, sys_metrics
  Total Commands Logged: ${count.count}`;
      break;
    case 'contact':
      output = `[Social Channels]
  Email: nwadialugideon@gmail.com
  GitHub: github.com/senseiuc
  Linktree: linktr.ee/senseiuc`;
      break;
    default:
      output = `Command not recognized: '${command}'. Type 'help' to see available commands.`;
  }

  res.json({ output });
});

// Contact message handler
app.post('/api/contact', contactLimiter, async (req, res) => {
  const name = normalizeText(req.body?.name, 100);
  const email = normalizeEmail(req.body?.email);
  const message = normalizeText(req.body?.message, 3000);
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Enter a valid name, email address, and message.' });
  }

  try {
    const insert = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
    insert.run(name, email, message);

    await sendContactEmail({ name, email, message });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact message failed:', error);
    res.status(500).json({ error: 'Failed to send message. Please email Gideon directly.' });
  }
});

// Local Fallback Answering Engine (used if GEMINI_API_KEY is not defined or fails)
function getLocalChatResponse(message: string, userProfile?: { firstName: string; lastName?: string; email?: string }): string {
  const msg = message.toLowerCase();
  const namePrefix = '';

  if (msg.includes('compare') && msg.includes('transit') && (msg.includes('cargo') || msg.includes('logistics'))) {
    return `${namePrefix}the transit microservices platform demonstrates distributed architecture: four bounded services for identity, companies, payments, and transport, with concurrency-safe escrow operations. The cargo platform, delivered as contract work, demonstrates integration depth: one Laravel hub coordinating tariffs, customer accounts, payment providers, and signed shipment webhooks. The transit platform is the stronger microservices example; the cargo platform is the stronger external-systems integration example.`;
  }
  if (msg.includes('best') || msg.includes('strongest') || msg.includes('backend architecture')) {
    return `${namePrefix}the strongest public backend examples are Konga for high-volume batch processing, the transit microservices platform for service boundaries and ledger concurrency, and the cargo platform for payment and logistics integrations delivered as contract work. The society platform, also contract work, adds full-platform operational ownership across API, web, mobile, queues, and deployment.`;
  }
  if (msg.includes('what can') || msg.includes('for my team') || msg.includes('hire')) {
    return `${namePrefix}Gideon can own an application end to end: responsive web interfaces, Flutter mobile clients, APIs, data models, payments and integrations, containerized deployment, and production troubleshooting. His deepest specialization is in backend-heavy systems where reliability, transactions, and operational workflows matter.`;
  }
  if (msg.includes('projects') || msg.includes('portfolio') || msg.includes('work')) {
    return `${namePrefix}Gideon's portfolio covers commerce infrastructure at Konga, community finance and marketplace operations, distributed transit, logistics integrations for the cargo and shipment platforms, contract work on society and visitor operations, education, property management, broadcasting, and care hospitality. Ask for a comparison or a specific project and I can explain the engineering decisions and results.`;
  }
  
  if (msg.includes('konga')) {
    return `${namePrefix}at Konga, Gideon works across the merchant platform: payout and wallet correctness, QoS inventory compliance, merchant identity verification, Magento synchronization, pricing, email auditing, responsive operations, testing enablement, and deployment support. He revived repeatable local and CI verification with containerized tests, isolated test data, service mocks, environment-driven configuration, readiness handling, and targeted SSO/authentication regression coverage. His flagship performance result was refactoring payout execution around cursor offsets, bounded 500-record batches, and paced processing, cutting execution time in half while controlling database pressure. His work spans eight merchant, middleware, administration, identity, notification, integration, and operations repositories.`;
  }
  if (msg.includes('cargo platform') || msg.includes('logistics api')) {
    return `${namePrefix}Gideon designed and built a logistics shipping portal and backend API from scratch as contract work. He integrated global tariff matrices, custom price calculator models, and payment systems (Paystack, SeerBit).`;
  }
  if (msg.includes('transit microservices') || msg.includes('transit platform')) {
    return `${namePrefix}the transit booking platform is a containerized microservices project built by Gideon. It features 4 independent services (Auth, Companies, Payments, Transport) running in Docker. He designed an escrow wallet ledger with deadlock retry mechanisms and idempotency check guards.`;
  }
  if (msg.includes('xxolcare') || msg.includes('xxol')) {
    return `${namePrefix}for Xxolcare, Gideon developed a care hospitality scheduling system. Key achievements include building a dynamic QR business card node, resolving monthly deficit array calculations, automating Git deployments to production, and setting up clean select controllers for chefs and drivers.`;
  }
  if (msg.includes('lextorah') || msg.includes('learning')) {
    return `${namePrefix}Lextorah is an educational ecosystem Gideon contributed to. He built smart git-diff deployment scripts, debugged case-sensitive path build issues in their React/FastAPI code, resolved Whisper transcriber load crashes, and integrated AI tutor chatbots using LangGraph.`;
  }
  if (msg.includes('wings')) {
    return `${namePrefix}Wings is a property tenancy management portal Gideon built. It features live rent schedule auto-generation, FIFO payment distributions across tenancy periods, and image pipelines connected to Cloudinary.`;
  }
  if (msg.includes('radionews') || msg.includes('radio')) {
    return `${namePrefix}RadioNews is a broadcasting CMS Gideon built using Filament and Spatie roles. He integrated WebRTC video call rooms using the Daily.co API and created automated shell deploy scripts.`;
  }
  if (msg.includes('society platform') || msg.includes('society web')) {
    return `${namePrefix}the society web, API, and mobile platform was contract work: a society-wide modernization project spanning a NestJS API, Next.js website and CMS, Flutter mobile app, PostgreSQL, Redis queues, donations, media delivery, and containerized operations.`;
  }
  if (msg.includes('financial platform') || msg.includes('marketplace platform')) {
    return `${namePrefix}Gideon owns delivery across a Laravel 11 community economic platform spanning dual-currency XOF/USD wallets, marketplace seller workflows, referral networks, queued rewards, testing, Docker, and production operations. He led the Laravel 5.8 to 11 migration while preserving more than 100,000 historical records, improved settlement speed by 40%, and reduced server overhead by 35% through queued reward and commission processing.`;
  }
  if (msg.includes('visitor management') || msg.includes('visitor system') || msg.includes('check-in')) {
    return `${namePrefix}Gideon built a multi-location visitor and staff management system as contract work, with QR-based entry, approval workflows, duplicate check-in protection, role-based administration, privacy consent, and Termii SMS and email alerts.`;
  }
  if (msg.includes('shipment platform') || msg.includes('shipment booking')) {
    return `${namePrefix}the shipment booking and tracking platform is a Laravel logistics platform Gideon developed for shipment booking, Flutterwave payment verification, tracking updates, delivery confirmation codes, commissions, and Termii customer notifications.`;
  }
  if (msg.includes('teach') || msg.includes('teacher') || msg.includes('before software') || msg.includes('before systems')) {
    return `${namePrefix}before moving fully into software, Gideon taught Mathematics, Quantitative Reasoning, Introductory Technology, and Computer Science across Merus College, Foresight Schools, and Asoland College. He made difficult topics more approachable, improved one class's performance by over 30%, coordinated tutors and tutorial finances, and helped Foresight achieve its strongest university-admission year at the time. He later moved through hospitality IT support and operations into web development at LifeSeed Worldwide.`;
  }
  if (msg.includes('certificate') || msg.includes('certification') || msg.includes('credential')) {
    return `${namePrefix}Gideon's credentials include the ALX Software Engineering Programme with a specialization in Back End Development, Google's IT Automation with Python Specialization, and Coursera certificates in Web Application Technologies and Django, Using Python to Access Web Data, and Introduction to HTML5.`;
  }
  if (msg.includes('leadership') || msg.includes('leader') || msg.includes('mentor') || msg.includes('volunteer')) {
    return `${namePrefix}Gideon's leadership experience spans academic mentoring, tutoring, community programmes, and technology outreach. As Vice President of the National Association of Mathematical Science Students at the University of Lagos, he coordinated tutors and supported students through difficult courses. As President of Young Disciples International, he led an executive team, organized a 300+ person talent event with more than 20 contestants, and helped increase weekly attendance by 50%. He has also served as a Lead Tutor, ALX portfolio reviewer, group coordinator, technology volunteer, and IoT intern.`;
  }
  if (msg.includes('skills') || msg.includes('stack') || msg.includes('languages') || msg.includes('technologies')) {
    return `${namePrefix}Gideon works across the application lifecycle: React and Next.js interfaces, Flutter mobile apps, PHP/Laravel, Node.js/Express and Python/FastAPI services, SQL data systems, plus Docker, Kubernetes, CI/CD, and production operations. His strongest depth is in backend architecture, payments, and integrations.`;
  }
  if (msg.includes('contact') || msg.includes('email') || msg.includes('hire')) {
    return `${namePrefix}you can reach Gideon Nwadialu via email at nwadialugideon@gmail.com, or check out his GitHub profile (github.com/senseiuc) and LinkedIn.`;
  }
  if (msg.includes('enjoy') || msg.includes('hobby') || msg.includes('hobbies') || msg.includes('fun') || msg.includes('free time')) {
    return `Outside software, ${userProfile?.firstName ? `${userProfile.firstName}, ` : ''}Gideon enjoys chess, fitness, poetry, gaming, listening to music, and meeting people. Chess feeds his strategic side, fitness keeps him grounded, poetry gives him a different relationship with language, and he enjoys the systems and stories inside games as much as the perspectives that come from meeting someone new.`;
  }
  if (msg.includes('school') || msg.includes('education') || msg.includes('university') || msg.includes('college') || msg.includes('degree') || msg.includes('study') || msg.includes('studied')) {
    return `${namePrefix}Gideon Nwadialu attended the University of Lagos (UNILAG), where he earned his BSc in Mathematics. He also holds certifications in ALX Back End Development and Google IT Automation.`;
  }
  if (msg.includes('docker') || msg.includes('container') || msg.includes('containers')) {
    return `${namePrefix}Docker packages software into isolated containers so it runs identically on any machine. Gideon uses Docker (including Docker Compose & Laravel Sail) to containerize full-stack projects like the transit platform and Lextorah, standardizing environments and cutting development setup times by 60%.`;
  }
  if (msg.includes('kubernetes') || msg.includes('k8s') || msg.includes('orchestrator') || msg.includes('orchestration')) {
    return `${namePrefix}Kubernetes (K8s) is an orchestration platform that automates the deployment, scaling, and management of containerized apps. Gideon utilizes Kubernetes to orchestrate multi-service networks, like decoupled Auth, Payment, and Transport microservices, for peak availability and smooth traffic scaling.`;
  }
  if (msg.includes('microservice') || msg.includes('microservices')) {
    return `${namePrefix}microservices architecture structures a system as independently owned services that communicate through explicit interfaces. In the transit booking platform, Gideon designed the platform from scratch as four Laravel microservices for authentication, companies, payments, and transport, then protected cross-service payment and wallet actions with idempotency, transactions, row locks, and retry handling.`;
  }
  if (msg.includes('api') || msg.includes('apis') || msg.includes('webhook') || msg.includes('webhooks') || msg.includes('integration') || msg.includes('integrations')) {
    return `${namePrefix}an API acts as a bridge letting different software systems talk to each other, while Webhooks send real-time event updates. Gideon specializes in API integrations, having connected logistics tariff seeders, Paystack/Seerbit billing loops, and Dojah KYC identity verification with automated retry logic.`;
  }
  if (/\b(hello|hi|hey|greetings)\b/i.test(msg)) {
    return `Hello${userProfile?.firstName ? ` ${userProfile.firstName}` : ''}! I am Sensei, Gideon Nwadialu's AI Assistant. Ask me about Gideon's work on Konga, the transit platform, society platform, Visitor Management, shipment platform, cargo platform, or his other systems and technical skills!`;
  }
  
  return `${namePrefix}I do not have enough information in the portfolio to answer that confidently. I can help with Gideon's projects, architecture decisions, technologies, experience, availability, or contact details. Try asking which project best matches the problem your team is solving.`;
}

const GIDEON_INFO = `
You are "Sensei", the personal AI coding and development assistant for Gideon Nwadialu. You are answering a visitor on Gideon's professional portfolio site.
Keep answers concise, specific, and focused on Gideon's work, experience, and technical skills. Speak of Gideon in the third person ("Gideon built...", "He has..."). Use the visitor's name in the initial greeting only; do not prefix or repeatedly personalize ordinary answers with their name. Ground every claim in the information below. Never invent clients, metrics, technologies, URLs, responsibilities, or outcomes. When the information is insufficient, say so and suggest a relevant question you can answer. For comparisons, identify the distinct engineering strengths of each project. Prefer concrete decisions and evidence over promotional language.

Information about Gideon Nwadialu:
- Role: Product Engineer with deep backend expertise. Owns delivery across frontend, Flutter mobile, backend services, data, DevOps, deployment, and production support, with deep specialization in payment systems and complex integrations.
- Location: Lagos, Nigeria / remote.
- Professional Experience:
  1. Konga (2024 - Present): Software Engineer. Works across merchant money movement, inventory compliance, identity verification, marketplace synchronization, pricing, communications, testing enablement, and platform operations. Revived containerized local and CI testing across legacy merchant services. Optimized payout execution to run twice as fast using cursor offsets, bounded 500-record batches, and paced processing.
  2. Financial Ledger & Marketplace Platform (2021 - Present): Senior Full-Stack Engineer (Part-time). Built financial ledger architectures and data pipelines.
  3. Freelance/Contracting (2020 - Present): Engineered logistics platforms, society platform work, and RBAC visitor systems as contract work, alongside other smart-sync and deployment automation work.
  4. Xxolcare (2022 - 2024): Software Engineer. Built care-scheduling engine, integrated Paystack billing, resolved calculation deficit bugs, and developed QR code digital business cards.
  5. LifeSeed Worldwide (2021 - 2022): Progressed from IT Support Specialist intern to part-time Web Developer, building Laravel, jQuery, and Bootstrap applications, gathering customer feedback, providing IT support, and creating promotional design and video content.
  6. DENICHE Hospitality (2021 - 2022): Junior Web Developer. Maintained workplace technology, trained staff on internal software, improved multi-entry sales workflows, added Vue.js booking calculations, and served briefly as Operational Supervisor.
- Teaching Experience:
  - Foresight Schools (2017 - 2018 and 2014 - 2016): Taught senior secondary Mathematics, managed after-school tutorials, coordinated tutors and disbursements, and helped drive stronger student interest and university admissions.
  - Asoland College (2015 - 2016): Taught Mathematics and Quantitative Reasoning, organized classes for school events, composed anniversary songs, and trained students for sports activities.
  - Merus College (2013 - 2014): Taught junior secondary Mathematics, Introductory Technology, and Computer Science, making lessons more approachable and improving class performance by over 30%.
- Primary Projects:
  - Logistics API & Cargo Booking Platform: Contract; shipping logistics portal with tariff matrix seeding and real-time transit pricing.
  - Transit Booking Microservices: Multi-tenant containerized microservices (Auth, Payments, Companies, Transport) transit router with escrow wallets.
  - Wings: Tenancy contract and rent scheduler automation with FIFO billing application.
  - RadioNews: Radio CMS dashboard with Daily.co WebRTC integrations and Spatie access controls.
  - Lextorah: FastAPI tutoring portal with smart sync pipelines and footer chatbot widgets.
  - Society Web, API & Mobile Platform: Contract; modernization platform with NestJS, Next.js, Flutter, PostgreSQL, Redis queues, donations, CMS workflows, and containerized operations.
  - Financial Ledger & Marketplace Platform: Laravel 11 community economic platform with XOF/USD wallets, marketplace seller workflows, referral networks, Redis-backed rewards, testing, and Docker operations.
  - Visitor Management System: Contract; multi-location visitor and staff check-in with approvals, role controls, privacy consent, and SMS/email notifications.
  - Shipment Booking & Tracking Platform: Shipment booking, Flutterwave payment verification, tracking updates, delivery confirmation, commissions, and Termii notifications.
- Core Technologies:
  - Languages: PHP, TypeScript, JavaScript, Python, SQL
  - Frontend & Mobile: React, Next.js, TypeScript, Flutter
  - Backend Frameworks: Laravel, Express, FastAPI, NestJS
  - DevOps & Tools: Docker, Kubernetes, Kibana, cPanel Git auto-deploy, Git/GitLab workflows.
- Certifications:
  - ALX Software Engineering Programme, Back End Development specialization (issued September 2023, credential yzNECc35M8).
  - Google IT Automation with Python Specialization (issued April 2021, credential SVDCQ9UBXD8V).
  - Web Application Technologies and Django, Coursera (issued November 2020, credential MM5GCQ9URH72).
  - Using Python to Access Web Data, Coursera (issued November 2020, credential WUEL97SVZJKY).
  - Introduction to HTML5, Coursera (issued November 2020, credential U7B9GMJ8XAM8).
- Leadership & Community Experience:
  - Vice President, National Association of Mathematical Science Students, University of Lagos (2021 - 2023): Coordinated tutors, mentored students, and participated in departmental and faculty-wide tutorials.
  - President, Young Disciples International (2017): Led the executive team, organized a 300+ person talent event with more than 20 contestants, increased weekly attendance by 50%, and appointed team leads.
  - Lead Tutor, Engineering Career Expo (2023 - 2024): Led tutoring work in an education-focused programme.
  - Reviewer, ALX Africa (2023): Reviewed students' portfolio projects.
  - Internet of Things Intern, Nithub (2023 - Present): Technology-focused volunteer experience.
  - Group Coordinator, Young Disciples International (2014 - 2015): Led the Ready Writers group and helped organize community events.
  - Volunteer Staff, DesignIT Africa (2022): Supported school outreach, materials distribution, and student technology education.
- Personal Interests & Hobbies: Playing chess, fitness and working out, reading and writing poetry, gaming, listening to music, meeting people, solving logical and mathematical puzzles, and exploring advanced AI agent architectures.
`;

// Cache map for Chat responses to save tokens and respond in under 1ms
const CHAT_CACHE_LIMIT = 200;
const CHAT_CACHE_TTL = 60 * 60 * 1000;
const chatCache = new Map<string, { reply: string; expiresAt: number }>();

const cacheChatReply = (key: string, reply: string) => {
  if (chatCache.size >= CHAT_CACHE_LIMIT) {
    const oldestKey = chatCache.keys().next().value;
    if (oldestKey) chatCache.delete(oldestKey);
  }
  chatCache.set(key, { reply, expiresAt: Date.now() + CHAT_CACHE_TTL });
};

app.post('/api/chat', chatLimiter, async (req, res) => {
  const message = normalizeText(req.body?.message, 600);
  if (!message) {
    return res.status(400).json({ error: 'Enter a message between 1 and 600 characters.' });
  }

  const suppliedProfile = req.body?.userProfile;
  const userProfile = suppliedProfile && typeof suppliedProfile === 'object' ? {
    firstName: normalizeText(suppliedProfile.firstName, 80) || '',
    lastName: normalizeText(suppliedProfile.lastName, 80) || undefined,
  } : undefined;
  const history: Array<{ role: 'user' | 'assistant'; text: string }> = Array.isArray(req.body?.history)
    ? req.body.history.slice(-8).flatMap((item: unknown) => {
        if (!item || typeof item !== 'object') return [];
        const candidate = item as { role?: unknown; text?: unknown };
        const role = candidate.role === 'user' || candidate.role === 'assistant' ? candidate.role : null;
        const text = normalizeText(candidate.text, 600);
        return role && text ? [{ role, text }] : [];
      })
    : [];
  const firstUserTurn = history.findIndex((item) => item.role === 'user');
  const conversationHistory = firstUserTurn >= 0 ? history.slice(firstUserTurn) : [];

  const normalizedMessage = message.toLowerCase();
  const historyKey = conversationHistory
    .map((item) => `${item.role}:${item.text.toLowerCase()}`)
    .join('|');
  const cacheKey = `${normalizedMessage}_${historyKey}_${userProfile?.firstName ? userProfile.firstName.toLowerCase() : 'anonymous'}`;

  const cached = chatCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return res.json({ reply: cached.reply, cached: true });
  }
  if (cached) {
    chatCache.delete(cacheKey);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const reply = getLocalChatResponse(message, userProfile);
    cacheChatReply(cacheKey, reply);
    return res.json({ reply });
  }

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    let systemInstructionText = GIDEON_INFO;
    if (userProfile && userProfile.firstName) {
      systemInstructionText += `\n- The current visitor's first name is ${userProfile.firstName}.${userProfile.lastName ? ` Their last name is ${userProfile.lastName}.` : ''} Their name has already been used in the greeting. Do not repeat it in normal answers unless it is genuinely necessary for clarity.`;
    }

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          ...conversationHistory.map((item) => ({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item.text }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        systemInstruction: {
          parts: [{ text: systemInstructionText }]
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status: ${response.status}`);
    }

    const data = await response.json() as any;
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble formulating a response right now. Feel free to contact Gideon directly!";
    
    // Store in cache
    cacheChatReply(cacheKey, reply);
    
    res.json({ reply });
  } catch (error) {
    console.error('Gemini API call failed, falling back to local chat engine:', error);
    const reply = getLocalChatResponse(message, userProfile);
    res.json({ reply });
  }
});

// Leads registration route
app.post('/api/leads', contactLimiter, async (req, res) => {
  try {
    const firstName = normalizeText(req.body?.firstName, 80);
    const lastName = normalizeText(req.body?.lastName, 80) || '';
    const email = normalizeEmail(req.body?.email);
    const consent = req.body?.consent === true;
    if (!firstName || !email || !consent) {
      return res.status(400).json({ error: 'A valid name, email address, and follow-up consent are required.' });
    }

    const consentedAt = new Date().toISOString();
    db.prepare(`
      INSERT INTO leads (first_name, last_name, email, consented_at)
      VALUES (?, ?, ?, ?)
    `).run(firstName, lastName, email, consentedAt);

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Failed to save lead:', err);
    res.status(500).json({ error: 'Failed to record contact details' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (!req.path.startsWith('/api')) return next(error);

  const bodyError = error as { type?: string; status?: number };
  if (bodyError.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body is too large.' });
  }
  if (bodyError.type === 'entity.parse.failed' || bodyError.status === 400) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }

  console.error('Unhandled API error:', error);
  return res.status(500).json({ error: 'Unexpected server error.' });
});

// Serve frontend build static files in production
const distPath = path.resolve(__dirname, '../dist');
const getSiteUrl = (req: Request) => {
  const configuredUrl = process.env.SITE_URL?.trim().replace(/\/$/, '');
  if (configuredUrl && /^https?:\/\//i.test(configuredUrl)) return configuredUrl;

  const renderHostname = process.env.RENDER_EXTERNAL_HOSTNAME?.trim();
  if (renderHostname) return `https://${renderHostname}`;

  return `${req.protocol}://${req.get('host')}`;
};

const withSiteUrl = (content: string, req: Request) => content.replaceAll('__SITE_URL__', getSiteUrl(req));

app.get('/robots.txt', (req, res) => {
  const template = fs.readFileSync(path.join(distPath, 'robots.txt'), 'utf8');
  res.type('text/plain').send(withSiteUrl(template, req));
});

app.get('/sitemap.xml', (req, res) => {
  const template = fs.readFileSync(path.join(distPath, 'sitemap.xml'), 'utf8');
  res.type('application/xml').send(withSiteUrl(template, req));
});

app.use(express.static(distPath, { index: false }));

// Asset-like requests should never receive the SPA document as a fallback.
app.get('*', (req, res, next) => {
  if (path.extname(req.path)) {
    return res.status(404).type('text/plain').send('Asset not found');
  }
  next();
});

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
    res.type('html').send(withSiteUrl(template, req));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
