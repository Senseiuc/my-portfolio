# Gideon's Workspace Agent Guide

This guide serves as the instruction manual for AI agents operating in this repository (`my-portfolio`). It dictates the layout structure, maintenance rules, privacy constraints, and reference architectures for managing Gideon's professional portfolio and CV.

---

## 📋 General Repository Scope
* **Workspace Path:** `/Users/gideonnwadialu/Gideon`
* **Purpose:** Hosting and maintaining the professional resume and developer portfolio assets of **Nwadialu Gideon** (Fullstack Engineer | Backend, APIs & Platform Integrations).

---

## 🛠️ CV Maintenance Rules

### 1. File Synchronization
* The CV is stored in two versions:
  * **[resume.html](file:///Users/gideonnwadialu/Gideon/resume.html)**: The print-ready, pixel-perfect HTML/CSS layout.
  * **[resume.md](file:///Users/gideonnwadialu/Gideon/resume.md)**: The plain-text markdown version.
* **Rule:** Any change, update, or refactoring applied to one file **must** be immediately synchronized with the other.

### 2. Privacy & Sensitivity Constraints
* **Contact Details:** Always mask the personal phone number (e.g., `+234-810-534-XXXX`). Never leave the full number plain in public-facing templates.
* **Confidential Projects:** **Do NOT** mention the **Lockit** project or any of its associated components (`LockItAdmin`, `LockItApp`, `LockitApiGateway`, `lockit-web`) on the public CV or portfolio pages. This is a private, personal project.
* **Client Anonymity:** When referencing the Visitor Management System, refer to the client generally as a *"confidential financial services client"*.

### 3. Chronological Order & Structure
* Work Experience must always be listed in the following order:
  1. **Konga** (2024 - Present)
  2. **Golden Attic** (2025 - Present)
  3. **Freelance Software Engineer** (2023 - Present) — featuring *Lextorah*, *Transglobal & Cargo*, and *TripEase / VMS* as nested project bullets.
  4. **Xxolcare** (2022 - 2024)

### 4. Result-Oriented Copywriting
* All bullet points must remain **result-driven** and highlight clear technical metrics (e.g., transaction speeds, CPU overhead reductions, database locks prevented, and deployment synchronization time slashes).

---

## 🎨 HTML/CSS Printing & Layout Guide
* **Color Palette:** Sidebar is `#1b365d` (dark navy), body text is `#334155` (slate-700), headings are `#0f172a` (slate-900).
* **Print Settings:** The `@media print` query strictly overrides the margins using `@page { size: A4; margin: 0; }` and forces `.page { height: 297mm; overflow: hidden; }` to prevent standard browser margins from splitting the page.
* **Layout Balance:** Page 1 should contain current salaried roles (*Konga*, *Golden Attic*), and Page 2 should contain contract and freelance experiences (*Lextorah*, *Transglobal*, *TripEase*, *Xxolcare*). This balances vertical height and avoids gaps.

---

## 💻 Local Projects Directory Reference
When writing summaries or updating project achievements, cross-check git logs in the user's workspace:
* **lextorah** (`/Users/gideonnwadialu/lextorah`): E-learning portal featuring LangGraph AI state tutor engines, speech processing (Whisper, TTS), FastAPI backend, and custom smart-sync patch shell tooling.
* **cargo / transglobal_backyard** (`/Projects/cargo` & `/Projects/transglobal_backyard`): Global supply chain booking platform. Payment migrated to **Seerbit** (references to Paystack/Flutterwave removed). Integrates Sabre Tariff calculations and matrix seeders. Runs on a Laravel Sail 8.4 Docker stack.
* **visitorManagementSystems** (`/Projects/visitorManagementSystems`): Multi-tenant visitor registry platform with RBAC and real-time dashboard notifications.
* **outsource** (`/Users/gideonnwadialu/outsource`): HaulOutsource logistics staffing platform (SQLite/MySQL fallbacks, Stripe subscription updates, and cPanel single-file bundle build scripts).
