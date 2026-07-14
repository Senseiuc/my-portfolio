import 'dotenv/config';
import express from 'express';
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

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Turn off CSP to support client loading custom styles/scripts dynamically
}));
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

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

    // Fetch dynamic GitHub streaks if token is set
    let githubStreak = { current: 18, longest: 45, totalCommits: 1420 };
    if (githubToken) {
      const dynamicStreak = await getGithubStreaks(githubToken, username);
      if (dynamicStreak) {
        githubStreak = dynamicStreak;
      }
    }

    let gitlabRes: any = {
      projectsCount: 8,
      totalCommits: 240,
      streak: { current: 24, longest: 56, totalCommits: 1180 },
      activeProjects: [
        { name: 'transglobal_backyard', description: 'Core backend API for Sabre calculations', lastActivity: new Date().toISOString() },
        { name: 'cargo', description: 'Partner cargo booking & waybill dispatch portal', lastActivity: new Date().toISOString() },
        { name: 'trip-ease-transport-service', description: 'Transit scheduling & journey planner microservice', lastActivity: new Date().toISOString() },
        { name: 'trip-ease-payment-service', description: 'Escrow wallet ledgers & Paystack gateway microservice', lastActivity: new Date().toISOString() },
      ]
    };

    const gitlabToken = process.env.GITLAB_TOKEN;
    const gitlabUrl = process.env.GITLAB_URL || 'https://az-gitlab.igbimo.com';

    if (gitlabToken) {
      try {
        const glHeaders = { 'Authorization': `Bearer ${gitlabToken}` };
        const projectsRes = await fetch(`${gitlabUrl}/api/v4/projects?membership=true&per_page=100`, { headers: glHeaders });
        if (projectsRes.ok) {
          const projects = await projectsRes.json() as any[];
          gitlabRes.projectsCount = projects.length;
          
          let commitsCount = 0;
          for (const project of projects.slice(0, 3)) {
            const commitsRes = await fetch(`${gitlabUrl}/api/v4/projects/${project.id}/repository/commits?per_page=1`, { headers: glHeaders });
            if (commitsRes.ok) {
              const totalCommitsHeader = commitsRes.headers.get('x-total');
              if (totalCommitsHeader) {
                commitsCount += parseInt(totalCommitsHeader, 10);
              }
            }
          }
          gitlabRes.totalCommits = commitsCount || (projects.length * 35);

          // Fetch user's push events to isolate projects they contributed to personally
          const eventsRes = await fetch(`${gitlabUrl}/api/v4/events?action=pushed&per_page=100`, { headers: glHeaders });
          let personalProjects: any[] = [];
          if (eventsRes.ok) {
            const events = await eventsRes.json() as any[];
            const contributedProjectIds = Array.from(new Set(events.map((e: any) => e.project_id)));
            
            for (const pid of contributedProjectIds.slice(0, 4)) {
              const pRes = await fetch(`${gitlabUrl}/api/v4/projects/${pid}`, { headers: glHeaders });
              if (pRes.ok) {
                const p = await pRes.json() as any;
                personalProjects.push(p);
              }
            }
          }

          // Fallback to latest membership projects if no recent personal pushes are recorded
          const finalActiveProjects = personalProjects.length > 0 
            ? personalProjects 
            : projects.sort((a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime()).slice(0, 4);

          gitlabRes.activeProjects = finalActiveProjects.map(p => {
            const name = p.name === 'konga-ads-be' ? 'SHQAdmin' : p.name;
            return {
              name,
              description: p.description || 'Enterprise workspace project',
              lastActivity: p.last_activity_at
            };
          });
          
          // Fetch dynamic GitLab streaks from push events
          const dynamicGlStreak = await getGitlabStreaks(gitlabToken, gitlabUrl);
          if (dynamicGlStreak) {
            gitlabRes.streak = {
              current: dynamicGlStreak.current,
              longest: dynamicGlStreak.longest,
              totalCommits: dynamicGlStreak.totalCommits || gitlabRes.totalCommits
            };
          }
        }
      } catch (glError) {
        console.error('Failed to load GitLab metrics dynamically:', glError);
      }
    }

    gitCache = {
      github: {
        publicRepos: repos.length,
        starsCount: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
        languages: languageShare.slice(0, 5),
        streak: githubStreak
      },
      gitlab: {
        projectsCount: gitlabRes.projectsCount,
        totalCommits: gitlabRes.totalCommits,
        streak: gitlabRes.streak,
        activeProjects: gitlabRes.activeProjects
      },
      lastUpdated: new Date().toISOString(),
    };
    lastGitFetch = now;

    res.json(gitCache);
  } catch (error) {
    // Fallback Mock Data if rate limited or offline
    const fallbackData = {
      github: {
        publicRepos: 18,
        starsCount: 4,
        languages: [
          { name: 'PHP', percentage: 45 },
          { name: 'TypeScript', percentage: 25 },
          { name: 'JavaScript', percentage: 15 },
          { name: 'Python', percentage: 10 },
          { name: 'Other', percentage: 5 },
        ],
        streak: {
          current: 18,
          longest: 45,
          totalCommits: 1420
        }
      },
      gitlab: {
        projectsCount: 5,
        totalCommits: 145,
        streak: {
          current: 24,
          longest: 56,
          totalCommits: 1180
        },
        activeProjects: [
          { name: 'transglobal_backyard', description: 'Core backend API for Sabre calculations', lastActivity: new Date().toISOString() },
          { name: 'cargo', description: 'Partner cargo booking & waybill dispatch portal', lastActivity: new Date().toISOString() },
          { name: 'trip-ease-transport-service', description: 'Transit scheduling & journey planner microservice', lastActivity: new Date().toISOString() },
          { name: 'trip-ease-payment-service', description: 'Escrow wallet ledgers & Paystack gateway microservice', lastActivity: new Date().toISOString() },
        ]
      },
      isFallback: true,
      lastUpdated: new Date().toISOString(),
    };
    res.json(fallbackData);
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
    const systemSettings = db.prepare('SELECT * FROM sys_metrics').all() as { key: string, value: string }[];

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
        syncStatus: systemSettings.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {}),
      },
      nodeVersion: process.version,
      platform: process.platform,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve metrics' });
  }
});

// Terminal Commands Executor API
app.post('/api/terminal/run', (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).json({ error: 'Command is required' });

  const rawCmd = command.trim().toLowerCase();
  
  // Log command execution to database
  try {
    db.prepare('INSERT INTO terminal_logs (command) VALUES (?)').run(command);
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
  metrics     - Output real-time VPS metrics
  db-status   - Check status of SQLite backend
  clear       - Clear screen console log
  contact     - Display social channels & links`;
      break;
    case 'skills':
      output = `[Senseiuc Technical Competencies Profile]
  - Backend: PHP (Laravel, Yii, Phalcon), Node.js (Express), FastAPI, REST/GraphQL
  - DevOps: Docker, Kubernetes, Helm, Elastic/Kibana clusters, cPanel
  - AI Integrations: LangGraph, LangChain, Whisper Speech, OpenAI, Huawei Vision
  - Database: MySQL/MariaDB, MongoDB, SQLite, Redis caching`;
      break;
    case 'timeline':
      output = `[Career Journey]
  - Konga (2024 - PRESENT)        | Software Engineer (optimized payout speeds by 2x, fixed sync daemons)
  - Golden Attic (2021 - PRESENT) | Senior Full-Stack Engineer (Part-time, 100k data migrations, ledger builds)
  - Freelance (2020 - PRESENT)    | Lextorah smart-sync, Sabre matrix seeders, VMS RBAC ledgers
  - Xxolcare (2022 - 2024)        | Built care scheduling platform, Paystack automation`;
      break;
    case 'metrics':
      output = `[Live System Footprint]
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
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const insert = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
    insert.run(name, email, message);
    res.json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record message in database' });
  }
});

// Local Fallback Answering Engine (used if GEMINI_API_KEY is not defined or fails)
function getLocalChatResponse(message: string, userProfile?: { firstName: string; lastName?: string; email?: string }): string {
  const msg = message.toLowerCase();
  const namePrefix = userProfile?.firstName ? `${userProfile.firstName}, ` : '';
  
  if (msg.includes('konga')) {
    return `${namePrefix}at Konga, Gideon worked as a Software Engineer. He was responsible for refactoring the merchant payout engine (which cut execution time in half), resolving database replication lags, and managing migrations of over 100k records. He also rebuilt various catalog synchronization daemons.`;
  }
  if (msg.includes('sabre') || msg.includes('transglobal')) {
    return `${namePrefix}Gideon designed and built the TransGlobal logistics shipping portal and backend API from scratch. He integrated the Sabre global tariff matrices, custom price calculator models, and payment systems (Paystack, SeerBit).`;
  }
  if (msg.includes('tripease') || msg.includes('trip-ease')) {
    return `${namePrefix}TripEase is a containerized microservices project built by Gideon. It features 4 independent services (Auth, Companies, Payments, Transport) running in Docker. He designed an escrow wallet ledger with deadlock retry mechanisms and idempotency check guards.`;
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
  if (msg.includes('skills') || msg.includes('stack') || msg.includes('languages') || msg.includes('technologies')) {
    return `${namePrefix}Gideon's primary technical competencies include PHP (Laravel, Yii, Phalcon), Node.js (Express), Python (FastAPI), React, TypeScript, Docker, Kubernetes, Kibana, MySQL/MariaDB, and SQLite.`;
  }
  if (msg.includes('contact') || msg.includes('email') || msg.includes('hire')) {
    return `${namePrefix}you can reach Gideon Nwadialu via email at nwadialugideon@gmail.com, or check out his GitHub profile (github.com/senseiuc) and LinkedIn.`;
  }
  if (msg.includes('enjoy') || msg.includes('hobby') || msg.includes('hobbies') || msg.includes('fun') || msg.includes('free time')) {
    return `Outside of building high-performance software systems, ${userProfile?.firstName ? `${userProfile.firstName}, ` : ''}Gideon enjoys playing chess, listening to music, working out, solving logical and mathematical puzzles (holding a BSc in Mathematics from the University of Lagos), researching advanced AI workflows (like LangGraph & RAG), and learning new languages. He speaks English and Igbo fluently, with basics in French and Yoruba!`;
  }
  if (msg.includes('school') || msg.includes('education') || msg.includes('university') || msg.includes('college') || msg.includes('degree') || msg.includes('study') || msg.includes('studied')) {
    return `${namePrefix}Gideon Nwadialu attended the University of Lagos (UNILAG), where he earned his BSc in Mathematics. He also holds certifications in ALX Back End Development and Google IT Automation.`;
  }
  if (msg.includes('docker') || msg.includes('container') || msg.includes('containers')) {
    return `${namePrefix}Docker packages software into isolated containers so it runs identically on any machine. Gideon uses Docker (including Docker Compose & Laravel Sail) to containerize full-stack projects like TripEase and Lextorah, standardizing environments and cutting development setup times by 60%.`;
  }
  if (msg.includes('kubernetes') || msg.includes('k8s') || msg.includes('orchestrator') || msg.includes('orchestration')) {
    return `${namePrefix}Kubernetes (K8s) is an orchestration platform that automates the deployment, scaling, and management of containerized apps. Gideon utilizes Kubernetes to orchestrate multi-service networks (like the decoupled Auth, Payment, and Transport microservices in TripEase) for peak availability and smooth traffic scaling.`;
  }
  if (msg.includes('microservice') || msg.includes('microservices')) {
    return `${namePrefix}Microservices architecture splits a massive application into small, independent services that talk to each other via APIs. Gideon is highly skilled in this layout—in TripEase, he split the platform into decoupled microservices (Auth, Payments, Companies, Transport) to make the system modular and highly scalable.`;
  }
  if (msg.includes('api') || msg.includes('apis') || msg.includes('webhook') || msg.includes('webhooks') || msg.includes('integration') || msg.includes('integrations')) {
    return `${namePrefix}an API acts as a bridge letting different software systems talk to each other, while Webhooks send real-time event updates. Gideon specializes in API integrations, having connected Sabre logistics tariff seeders, Paystack/Seerbit billing loops, and Dojah KYC identity verification with automated retry logic.`;
  }
  if (/\b(hello|hi|hey|greetings)\b/i.test(msg)) {
    return `Hello${userProfile?.firstName ? ` ${userProfile.firstName}` : ''}! I am Sensei, Gideon Nwadialu's AI Assistant. Ask me anything about Gideon's professional projects (like Konga, TransGlobal, TripEase, Xxolcare, Wings, Lextorah, RadioNews) or his technical skills!`;
  }
  
  return `Thanks for asking${userProfile?.firstName ? ` ${userProfile.firstName}` : ''}! Gideon is a senior full-stack software engineer with deep expertise in PHP/Laravel, Node.js, microservices, and Docker/DevOps. He has worked at Konga and built major systems like TransGlobal, TripEase, and Xxolcare. Ask me about any of these systems for more details!`;
}

const GIDEON_INFO = `
You are "Sensei", the personal AI coding and development assistant for Gideon Nwadialu. You are answering a visitor on Gideon's professional portfolio site.
Keep your answers brief, engaging, and focused on Gideon's work, experience, and technical skills. Be professional, friendly, and speak of Gideon in the third person ("Gideon built...", "He has...").

Information about Gideon Nwadialu:
- Role: Full-Stack Software Engineer & Technical Solutions Architect.
- Location: Lagos, Nigeria / remote.
- Professional Experience:
  1. Konga (2024 - Present): Software Engineer. Optimized payout systems, doubling speed. Rebuilt data synchronization daemons and handled migration operations of over 100k records.
  2. Golden Attic (2021 - Present): Senior Full-Stack Engineer (Part-time). Built financial ledger architectures and data pipelines.
  3. Freelance/Contracting (2020 - Present): Engineered Sabre logistics platforms, smart-sync script handlers, and RBAC ledger systems.
  4. Xxolcare (2022 - 2024): Software Engineer. Built care-scheduling engine, integrated Paystack billing, resolved calculation deficit bugs, and developed QR code digital business cards.
- Primary Projects:
  - TransGlobal x Sabre: Shipping logistics portal with Sabre matrix seeding and real-time transit pricing.
  - TripEase: Multi-tenant containerized microservices (Auth, Payments, Companies, Transport) transit router with escrow wallets.
  - Wings: Tenancy contract and rent scheduler automation with FIFO billing application.
  - RadioNews: Radio CMS dashboard with Daily.co WebRTC integrations and Spatie access controls.
  - Lextorah: FastAPI tutoring portal with smart sync pipelines and footer chatbot widgets.
- Core Technologies:
  - Languages: PHP, TypeScript, JavaScript, Python, SQL
  - Frameworks: Laravel, Express, FastAPI, React
  - DevOps & Tools: Docker, Kubernetes, Kibana, cPanel Git auto-deploy, Git/GitLab workflows.
- Personal Interests & Hobbies: Playing chess, listening to music, working out, solving logical/mathematical puzzles, and exploring advanced AI agent architectures.
`;

// Cache map for Chat responses to save tokens and respond in under 1ms
const chatCache = new Map<string, string>();

app.post('/api/chat', async (req, res) => {
  const { message, userProfile } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const normalizedMessage = message.trim().toLowerCase();
  const cacheKey = `${normalizedMessage}_${userProfile?.firstName ? userProfile.firstName.toLowerCase() : 'anonymous'}`;
  
  if (chatCache.has(cacheKey)) {
    const reply = chatCache.get(cacheKey)!;
    return res.json({ reply, cached: true });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const reply = getLocalChatResponse(message, userProfile);
    chatCache.set(cacheKey, reply);
    return res.json({ reply });
  }

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    let systemInstructionText = GIDEON_INFO;
    if (userProfile && userProfile.firstName) {
      systemInstructionText += `\n- The current visitor's first name is ${userProfile.firstName}.${userProfile.lastName ? ` Their last name is ${userProfile.lastName}.` : ''}${userProfile.email ? ` Their email is ${userProfile.email}.` : ''} Address them personally by their first name (${userProfile.firstName}) in your answers where natural.`;
    }

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: message }]
          }
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
    chatCache.set(cacheKey, reply);
    
    res.json({ reply });
  } catch (error) {
    console.error('Gemini API call failed, falling back to local chat engine:', error);
    const reply = getLocalChatResponse(message, userProfile);
    res.json({ reply });
  }
});

// Leads registration route
app.post('/api/leads', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName) {
      return res.status(400).json({ error: 'First name is required' });
    }

    const leadsPath = path.resolve(__dirname, 'leads.json');
    let leads: any[] = [];
    
    if (fs.existsSync(leadsPath)) {
      const data = fs.readFileSync(leadsPath, 'utf-8');
      try {
        leads = JSON.parse(data);
      } catch (pe) {
        leads = [];
      }
    }
    
    leads.push({
      firstName,
      lastName: lastName || '',
      email: email || '',
      timestamp: new Date().toISOString()
    });
    
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to save lead:', err);
    res.status(500).json({ error: 'Failed to record contact details' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve frontend build static files in production
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
