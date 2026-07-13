import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../portfolio.db');
const db = new Database(dbPath);

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
`);

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
