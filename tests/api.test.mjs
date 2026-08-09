import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import Database from 'better-sqlite3';

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'senseiuc-api-'));
const databasePath = path.join(tempDir, 'portfolio.db');
const siteUrl = 'https://portfolio.example';
let server;
let baseUrl;

const findPort = () => new Promise((resolve, reject) => {
  const listener = net.createServer();
  listener.once('error', reject);
  listener.listen(0, '127.0.0.1', () => {
    const address = listener.address();
    listener.close(() => resolve(address.port));
  });
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Test server did not become healthy');
};

const postJson = (pathname, body) => fetch(`${baseUrl}${pathname}`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

before(async () => {
  const port = await findPort();
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ['dist-server/server.js'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(port),
      SITE_URL: siteUrl,
      DATABASE_PATH: databasePath,
      GEMINI_API_KEY: '',
      GITHUB_TOKEN: '',
      GITLAB_TOKEN: '',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await waitForServer();
});

after(async () => {
  if (server && !server.killed) {
    server.kill('SIGTERM');
    await new Promise((resolve) => server.once('exit', resolve));
  }
  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('health endpoint sends security and rate-limit headers', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-security-policy') ?? '', /default-src 'self'/);
  assert.match(response.headers.get('content-security-policy') ?? '', /style-src[^;]*https:\/\/fonts\.googleapis\.com/);
  assert.match(response.headers.get('content-security-policy') ?? '', /font-src[^;]*https:\/\/fonts\.gstatic\.com/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('ratelimit-limit'), '120');
});

test('missing static assets do not fall through to the SPA document', async () => {
  const response = await fetch(`${baseUrl}/assets/missing-build-file.css`);
  assert.equal(response.status, 404);
  assert.match(response.headers.get('content-type') ?? '', /^text\/plain/);
  assert.equal(await response.text(), 'Asset not found');
});

test('contact validation rejects malformed input', async () => {
  const response = await postJson('/api/contact', {
    name: 'Reviewer',
    email: 'not-an-email',
    message: 'Hello',
  });
  assert.equal(response.status, 400);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('terminal endpoint rejects command-shaped injection and accepts allowlisted commands', async () => {
  const rejected = await postJson('/api/terminal/run', { command: 'help; rm' });
  assert.equal(rejected.status, 400);

  const accepted = await postJson('/api/terminal/run', { command: 'help' });
  assert.equal(accepted.status, 200);
  assert.match((await accepted.json()).output, /Available Commands/);
});

test('lead capture requires consent and stores only consented details in SQLite', async () => {
  const withoutConsent = await postJson('/api/leads', {
    firstName: 'Privacy',
    email: 'privacy@example.com',
    consent: false,
  });
  assert.equal(withoutConsent.status, 400);

  const withConsent = await postJson('/api/leads', {
    firstName: 'Privacy',
    lastName: 'Test',
    email: 'PRIVACY@example.com',
    consent: true,
  });
  assert.equal(withConsent.status, 201);

  const db = new Database(databasePath, { readonly: true });
  const stored = db.prepare('SELECT first_name, last_name, email FROM leads').get();
  db.close();
  assert.deepEqual(stored, {
    first_name: 'Privacy',
    last_name: 'Test',
    email: 'privacy@example.com',
  });
});

test('oversized JSON receives a controlled 413 response', async () => {
  const response = await postJson('/api/chat', { message: 'x'.repeat(17_000) });
  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), { error: 'Request body is too large.' });
});

test('chat fallback answers project comparisons and rejects empty messages', async () => {
  const comparison = await postJson('/api/chat', {
    message: 'Compare TripEase and Transglobal',
    userProfile: { firstName: 'Visitor' },
    history: [{ role: 'assistant', text: 'Which systems interest you?' }],
  });
  assert.equal(comparison.status, 200);
  const comparisonBody = await comparison.json();
  assert.match(comparisonBody.reply, /distributed architecture/i);
  assert.match(comparisonBody.reply, /integration depth/i);
  assert.doesNotMatch(comparisonBody.reply, /^Visitor,/);

  const empty = await postJson('/api/chat', { message: '   ' });
  assert.equal(empty.status, 400);
});

test('canonical, robots, and sitemap responses share the configured production URL', async () => {
  const home = await (await fetch(`${baseUrl}/`)).text();
  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();

  assert.match(home, new RegExp(`<link rel="canonical" href="${siteUrl}/"`));
  assert.match(home, new RegExp(`${siteUrl}/senseiuc-social-card\\.webp`));
  assert.match(robots, new RegExp(`Sitemap: ${siteUrl}/sitemap\\.xml`));
  assert.match(sitemap, new RegExp(`<loc>${siteUrl}/</loc>`));
  assert.doesNotMatch(`${home}${robots}${sitemap}`, /__SITE_URL__/);
});
