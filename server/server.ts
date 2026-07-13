import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
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
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

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

    const githubRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
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

    const gitlabRes = {
      projectsCount: 8,
      totalCommits: 240,
    };

    gitCache = {
      github: {
        publicRepos: repos.length,
        starsCount: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
        languages: languageShare.slice(0, 5),
        recentActivity: repos.slice(0, 3).map(repo => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description || 'No description available',
          updatedAt: repo.updated_at,
        })),
      },
      gitlab: gitlabRes,
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
        recentActivity: [
          { name: 'my-portfolio', url: 'https://github.com/Senseiuc/my-portfolio', description: 'Full-stack developer portfolio site', updatedAt: new Date().toISOString() },
          { name: 'cargo', url: 'https://github.com/Senseiuc/cargo', description: 'Logistics booking cargo systems with Sabre Integration', updatedAt: '2026-07-09T05:59:00Z' },
          { name: 'transglobal_backyard', url: 'https://github.com/Senseiuc/transglobal_backyard', description: 'Supply chain management systems', updatedAt: '2026-06-09T10:17:00Z' },
        ],
      },
      gitlab: {
        projectsCount: 5,
        totalCommits: 145,
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
