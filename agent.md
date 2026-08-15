# Portfolio Agent Guide

This is the working context for coding agents contributing to Gideon Nwadialu's
portfolio. Read it before changing public content, project claims, the CV, the
assistant, deployment configuration, or visual assets.

## Product Purpose

This repository contains a Product Engineering portfolio and a
print-ready CV. The site should present Gideon as an engineer who owns delivery
across frontend, mobile, backend, data, DevOps, deployment, and production
support, with particularly strong depth in payment infrastructure, complex
integrations, and reliable backend systems. It is a working portfolio, not a
generic marketing landing page.

## Technical Architecture

- Frontend: React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion.
- Backend: Express and TypeScript.
- Local storage: SQLite through `better-sqlite3`.
- Development: `Dockerfile.dev` and `docker-compose.yml` expose the site on
  `http://localhost:3000` and the API on `http://localhost:5001`.
- Production: `Dockerfile` builds the frontend and compiled backend, then starts
  `dist-server/server.js` on `PORT`.
- Temporary hosting: `render.yaml` defines a free Docker web service. Its SQLite
  database is ephemeral and must not be treated as durable storage.
- CI: `.github/workflows/ci.yml` builds and tests with Node 22.

Important source files:

- `src/App.tsx`: portfolio content, case studies, supporting projects, project
  detail dialog, and primary page composition.
- `src/components/Mascot.tsx`: mascot selection and motion behavior.
- `src/components/ChatWidget.tsx`: Sensei assistant interface, onboarding,
  history, starter questions, and session persistence.
- `server/server.ts`: API routes, assistant knowledge, provider integration,
  local fallback answers, security headers, metadata, and runtime serving.
- `server/db.ts`: SQLite schema, retention rules, and legacy lead migration.
- `src/index.css`: global visual rules, accessibility behavior, and motion
  preferences.
- `resume.md` and `resume.html`: synchronized CV sources.

## Brand And Design Rules

- Brand name: Senseiuc. Public person name: Gideon Nwadialu.
- Primary visual language: ink black, charcoal, orange, amber, and restrained
  supporting colors. Do not turn the site into a one-color orange theme.
- Use the orange-bearded Sensei mascot as a purposeful guide or system marker,
  not as decoration on every section.
- Preserve the technical, editorial composition: visible structure, evidence,
  compact typography, square or lightly rounded controls, and limited cards.
- Avoid generic AI-site patterns such as gradient blobs, oversized slogans,
  excessive glass panels, empty feature cards, and interchangeable copy.
- The favicon is a transparent simplified mascot silhouette.
- Keep layouts responsive and verify long titles, tags, dialogs, and buttons at
  desktop and mobile sizes.
- Honor `prefers-reduced-motion` and maintain keyboard focus, dialog trapping,
  labels, and semantic headings.

## Public Project Policy

Current public project set:

- Konga Merchant Platform Engineering
- Logistics API & Cargo Booking Platform (contract)
- Transit Booking Microservices
- Xxolcare Booking Portal
- Lextorah Educational Ecosystem
- Wings Tenancy System
- Radio News CMS
- Society Web, API & Mobile Platform (contract)
- Financial Ledger & Marketplace Platform
- Visitor Management System (contract)
- Shipment Booking & Tracking Platform

The homepage presents three flagship case studies and a compact set of onward
paths. The complete project archive lives at `/work`, the dedicated Konga case
study remains at `/work/konga-merchant-platform`, and public workflow diagrams
live at `/systems`.

The personal career origin story lives at `/before-systems`. It covers Gideon's
mathematics teaching experience from 2013 to 2018 and his transition through
hospitality IT support, operations, and early web development in 2021 and 2022.

The complete certifications archive lives at `/credentials`, and the leadership
timeline lives at `/leadership`. Keep their detailed content off the homepage.

Gideon's interests in chess, fitness, poetry, gaming, music, and meeting people
live at `/life` with the existing mascot system. The measured portfolio runtime,
public GitHub activity, and project explorer live at `/console`.

The homepage presents three selected leadership roles, with the complete
leadership, mentorship, and community-service timeline at `/leadership`. Do not
publish LinkedIn edit-form URLs for these entries.

Do not add LockIt, LockItAdmin, LockItApp, LockitApiGateway, lockit-web, or any
other LockIt component. LockIt is a private personal project and must remain out
of the public portfolio, CV, metadata, assistant knowledge, and screenshots.

For the Visitor Management System, describe the customer as a confidential
financial-services client in narrative copy. The approved public production URL
is `https://fcmbvms.visitors.com.ng`.

Approved production URLs:

- Konga SellerHQ: `https://shq.konga.com/`
- Logistics API platform: production URL intentionally omitted from public copy
- Cargo booking portal: production URL intentionally omitted from public copy
- Visitor Management System: `https://fcmbvms.visitors.com.ng`
- Shipment booking platform: `https://shipwize.ng/`

## Evidence And Copy Rules

- Do not invent metrics, responsibilities, client names, technologies, dates,
  commit counts, or production outcomes.
- Prefer statements verified in local source, tests, migrations, git history,
  deployment files, or information explicitly supplied by Gideon.
- Clearly qualify reported outcomes when proprietary source is unavailable.
- Do not expose customer data, credentials, repository tokens, internal URLs,
  `.env` content, database files, lead records, or proprietary implementation
  details.
- Keep project copy concrete: problem, engineering decision, evidence, and
  operational outcome.
- Use `Gideon Nwadialu` consistently in prose. The CV heading may retain its
  established layout order if needed for print composition.

Useful local evidence locations outside this repository may include:

- `/Users/gideonnwadialu/lextorah`
- `/Users/gideonnwadialu/Projects/cargo`
- Core logistics API repository path is intentionally omitted from public copy
- Transit microservices repository path is intentionally omitted from public copy
- `/Users/gideonnwadialu/Projects/visitorManagementSystems`
- `/Users/gideonnwadialu/Projects/funmi-express`
- Society platform repository path is intentionally omitted from public copy

Local repositories are evidence sources, not permission to publish confidential
content. If a repository is absent, preserve the portfolio entry and mark data
for later confirmation instead of fabricating details.

## Sensei Assistant Rules

- Provider order: configured Gemini provider, then the grounded local fallback.
- The external provider may fail because of quota or rate limits; the fallback
  must remain useful without it.
- Pass only a short sanitized conversation history.
- Ground answers in the portfolio knowledge supplied in `server/server.ts`.
- Do not answer beyond verified context. Say when information is unavailable.
- Use the visitor's name in the greeting only. Do not prefix ordinary answers
  with their name.
- Keep project comparisons specific and explain the distinct engineering value
  of each system.
- Contact details are stored only after explicit follow-up consent.

## CV Maintenance

The CV has two canonical representations:

- `resume.md`: readable source.
- `resume.html`: print-ready A4 layout.

Any factual CV change must be applied to both files in the same change. Do not
allow project names, dates, skills, metrics, or bullet wording to drift between
them. Preserve the full public phone number `08105347918`.

Work Experience must always be listed in this order:

1. Konga (2024 - Present)
2. Financial Ledger & Marketplace Platform (2021 - Present)
3. Freelance Software Engineer (2020 - Present), with nested project bullets for
   Society Web, API & Mobile Platform, Lextorah, Logistics API & Cargo Booking Platform,
   Transit Booking Microservices, Visitor Management System, and Shipment Booking & Tracking Platform.
4. Xxolcare (2022 - 2024)

Before adding a metric to the CV, identify its source. If it cannot be supported,
replace it with a concrete scope or engineering result that can be verified.
Keep the CV concise enough for its existing two-page print layout and render the
HTML before finalizing visual changes.

## Privacy And Data Retention

- `.env`, `portfolio.db`, and `server/leads.json` must remain ignored.
- Contact messages and consented leads are retained for 180 days by the current
  SQLite cleanup policy.
- Email is optional during assistant onboarding and is saved only when the
  visitor explicitly requests follow-up.
- Render free instances have ephemeral filesystems, so their SQLite data can be
  lost on restart, sleep, or redeploy.

## Verification

Use Node 22 as required by `package.json`.

```bash
npm run build
docker compose run --rm --no-deps app npm test
docker build -t senseiuc-portfolio-render-test .
```

For frontend changes:

1. Run the app at `http://localhost:3000`.
2. Inspect desktop and mobile viewports.
3. Exercise changed interactions, dialogs, forms, and assistant states.
4. Check browser console output and confirm assets load.
5. Re-run the production build.

For deployment changes, start the production image with a writable temporary
database path and verify `/api/health` on port 8080.

## Git Discipline

- Preserve unrelated user changes in a dirty worktree.
- Never commit secrets, local databases, lead exports, or generated runtime logs.
- Keep generated social, mascot, and optimized WebP assets only when referenced
  by the site.
- Use focused commits and report tests that were run.
