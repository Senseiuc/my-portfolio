import assert from 'node:assert/strict';
import { test } from 'node:test';
import crypto from 'node:crypto';
import fs from 'node:fs';

test('structured profile data and web manifest remain valid JSON', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD block is missing');

  const schema = JSON.parse(match[1]);
  assert.equal(schema['@type'], 'ProfilePage');
  assert.equal(schema.mainEntity?.['@type'], 'Person');
  assert.equal(schema.mainEntity?.name, 'Gideon Nwadialu');

  const manifest = JSON.parse(fs.readFileSync('public/site.webmanifest', 'utf8'));
  assert.equal(manifest.short_name, 'Senseiuc');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);
});

test('CSP contains the exact hash of the structured-data block', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const server = fs.readFileSync('server/server.ts', 'utf8');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match);

  const hash = `sha256-${crypto.createHash('sha256').update(match[1]).digest('base64')}`;
  assert.match(server, new RegExp(hash.replace(/[+]/g, '\\+')));
});

test('resume interactions comply with the site CSP', () => {
  const html = fs.readFileSync('resume.html', 'utf8');

  assert.doesNotMatch(html, /\son[a-z]+\s*=/i);
  assert.match(html, /<script src="\/resume\.js" defer><\/script>/);
  assert.ok(fs.existsSync('public/resume.js'));
});
