# Lextorah Educational Platform & AI Ecosystem - Project Profile

**Lextorah** is a unified, enterprise-grade educational ecosystem. It merges a legacy Laravel-based Learning Management System (LMS) with a modern FastAPI/React AI learning portal and a client-side AI support widget ("Ms. Lexi") deployed across the primary language school portal. The platform handles everything from student onboarding, SAT/PTE exam registration, shopping cart checkouts, and course sprint scheduling to AI-driven Socratic tutoring and video transcription.

* **Production URL:** [https://lextorah.com](https://lextorah.com)
* **Core Technology Stack:** Laravel (PHP), FastAPI (Python), React (Vite/Redux/Tailwind), MySQL, MongoDB, Pinecone Vector Database, OpenAI API (LLM, Whisper, TTS, Embeddings), Docker, Apache.

---

## 1. Core Architectural & System Features

### A. Socratic AI Classroom Agent
At the heart of the virtual learning portal is an agentic tutoring system (`LextorahBackend/services/classroom_agent.py`):
* **LangGraph Agentic Flow:** Employs a LangGraph `StateGraph` workflow featuring a `tutor_node` to coordinate topic delivery.
* **Auto-Translation & Parsing:** If teaching non-English words (e.g. French, German), it automatically translates terms into English, explains grammar/syntax rules, and wraps up each section with an engaging check-in question.
* **Markdown Streaming:** Streams chunked, double-spaced markdown content to the frontend for enhanced reading comprehension.

### B. Laravel LMS Sprint & Auto-Scheduling Engine
Manages class cohorts and timetables (`elearning/main/app/Http/Controllers/SprintController.php`):
* **Sprint Class Cohorts:** Integrates a sprint creation, student enrollment, and schedule builder pipeline mapped to specific courses.
* **Auto-Scheduling Conflict Detection:** Validates proposed schedule slots against existing tutor assignments. Detects overlapping start/end times and checks if a tutor is double-booked on any day, blocking conflicting creations.
* **Master Timetable Grid:** Features an admin timetable template grouping active sprints by tutor across days of the week.

### C. Cart, Discount & Checkout Pipeline
Handles course checkout and payment settlement (`elearning/main/app/Http/Controllers/RegistrationController.php`):
* **Shopping Cart system:** Aggregates pending course and exam registrations for the authenticated student (`user/cart.blade.php`).
* **Discount Computations:** Calculates course discount percentages at cart level, adjusting final tuition amounts, registration fees, and materials costs before generation.
* **Payment Refactoring:** Links cart items to transaction logs and redirects to the Paystack checkout flow, verifying status updates to activate student course registrations.

### D. Secure Registration & Exam Onboarding
Manages intake forms and security controls (`elearning/main/app/Http/Controllers/ForeignExamController.php`):
* **Exam Registrations:** Deploys dedicated registration portals for foreign exams (SAT, PTE, TOEFL, IELTS) with fields for test dates, test centers, identification uploads, and personal info.
* **reCAPTCHA Firewall:** Integrates Google reCAPTCHA v2 validations on registration forms to prevent automated sign-up requests.

### E. Whisper & Cloudinary Media Pipeline
Manages media indexing and transcript generation (`LextorahBackend/utils/whisper.py`):
* **Lazy-Loaded Speech-to-Text:** Integrates OpenAI Whisper locally. The model is lazy-loaded on its first call to prevent server startup crashes and 502 Gateway errors.
* **Media Upload Handling:** Extracts audio tracks from video files (mp4, webm, mov, etc.) and processes them via Whisper to generate course transcripts.
* **Cloud Storage:** Automatically uploads course materials and transcripts to Cloudinary for CDN delivery.

### F. RAG Pipeline & Pinecone Vector Store
Supports context-aware Q&A and curriculum searches (`LextorahBackend/services/embedder.py`):
* **Text Chunking:** Splits extracted PDF/text course resources using custom sliding window chunking (500-character size, 50-character overlap).
* **Vector Indexing:** Generates vector embeddings using `text-embedding-3-small` and synchronizes them to the `lextorahdb` Pinecone index.

### G. AI Academic Decline Alerts
Flags struggling students to instructors (`LextorahBackend/services/aialert.py`):
* **Alert Generation:** Allows admins and tutors to query student performance trends across specific courses.
* **OpenAI Analysis:** Evaluates MongoDB quiz results and assignments over time to highlight downward trendlines, generating warnings with structured explanations.

### H. "Ms. Lexi" AI Support Widget
Integrates AI customer assistance directly into the legacy portal (`Downloads/well-known`):
* **Apache/PHP Integration:** Deployed a client-side support widget via `footer.php`, `js/chat-widget.js`, and `css/chat-widget.css`.
* **State & Animation:** Displays a floating bubble, active slide-up prompts, typing animations, and keeps track of individual guest sessions via local storage.
* **Support API:** Routes student messages to the FastAPI backend `/api/support` endpoint and streams back conversational answers.

---

## 2. Developer Workflow, Sync & Governance Rules

The codebase implements a strict architecture governance pipeline to maintain container health and prevent regressions during remote team synchronizations (`PULL_AND_SYNC_CHECKLIST.md`):

### A. Smart-Sync Script
* **Upstream Synchronization (`scripts/sync_upstream.sh`):** Instead of standard overwrite operations, a smart bash script reads the Git `ORIG_HEAD` diff in the upstream repository (`/Users/gideonnwadialu/Downloads/well-known/lextorah`) and copies *only* modified files. This preserves local architecture overrides on untouched files.

### B. Automated Architecture Governance Checks
* **Sync Auditer (`scripts/audit_sync.js`):** Run on the frontend via `npm run audit-sync` to verify compliance:
  1. **Routing Prefix Constraints:** Enforces that all frontend `apiClient()` routes and `EventSource` connections start with `/api/` to avoid CORS issues.
  2. **Forbidden Backend Prefixes:** Ensures no backend FastAPI route decorator (`@router.get`, etc.) contains a redundant `/api/` prefix (Nginx manages this routing mapping).
  3. **Case Sensitivity Checks:** Flags casing issues for static image files (e.g. `Container.png`, `Institution.png`, `msLexi.png`) to avoid broken paths on case-sensitive Linux Docker environments.
  4. **Ghost Dependency Guard:** Parses imports in the frontend directory and alerts developers if imported packages are missing from `package.json`.
  5. **Environment Configuration:** Validates Docker builds for necessary packages: Whisper's `ffmpeg` dependency, `setuptools<70.0.0` pins, `--no-build-isolation` flags, and `numpy<2.0.0` bindings.
