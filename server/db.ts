import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve(__dirname, '../portfolio.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS terminal_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    command TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sys_metrics (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL,
    consented_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(first_name, last_name, email, consented_at)
  );
`);

// Import the legacy JSON file once, then remove the plaintext copy.
const legacyLeadsPath = path.resolve(__dirname, 'leads.json');
if (fs.existsSync(legacyLeadsPath)) {
  try {
    const legacyLeads = JSON.parse(fs.readFileSync(legacyLeadsPath, 'utf8')) as Array<Record<string, unknown>>;
    const insertLegacyLead = db.prepare(`
      INSERT OR IGNORE INTO leads (first_name, last_name, email, consented_at, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    const migrateLegacyLeads = db.transaction(() => {
      for (const lead of legacyLeads) {
        if (typeof lead.firstName !== 'string' || typeof lead.email !== 'string' || !lead.email.trim()) continue;
        const timestamp = typeof lead.timestamp === 'string' ? lead.timestamp : new Date().toISOString();
        insertLegacyLead.run(
          lead.firstName.trim(),
          typeof lead.lastName === 'string' ? lead.lastName.trim() : '',
          lead.email.trim().toLowerCase(),
          timestamp,
          timestamp,
        );
      }
    });
    migrateLegacyLeads();
    fs.unlinkSync(legacyLeadsPath);
  } catch (error) {
    console.error('Legacy lead migration failed; the source file was preserved:', error);
  }
}

// Contact data is only needed for a reasonable follow-up window.
db.prepare("DELETE FROM leads WHERE created_at < datetime('now', '-180 days')").run();
db.prepare("DELETE FROM messages WHERE created_at < datetime('now', '-180 days')").run();

// Seed metrics if empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM sys_metrics');
const row = countStmt.get() as { count: number } | undefined;
if (!row || row.count === 0) {
  const insert = db.prepare('INSERT OR REPLACE INTO sys_metrics (key, value) VALUES (?, ?)');
  insert.run('konga_sync_count', '986');
  insert.run('lextorah_sync_count', '412');
  insert.run('sabre_seed_count', '1420');
  insert.run('last_deployment_time', new Date().toISOString());
}

export default db;
