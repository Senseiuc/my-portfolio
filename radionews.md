# Radio News CMS - Project Profile

**Radio News CMS** is a premium, full-scale broadcasting content management system and live WebRTC communications portal. Built entirely from scratch, it integrates a rich Filament-based admin dashboard with dynamic sitemap generation, real-time video conferencing rooms, dynamic advertising slots, and live radio broadcast status analytics.

* **Production URL:** [https://home.homelandradio.org/](https://home.homelandradio.org/)
* **Core Technology Stack:** Laravel (PHP), MySQL, Filament Admin Panel, Bootstrap, Spatie Permissions, Daily.co WebRTC API, Docker.

---

## 1. Core Architectural & System Features

### A. Laravel & Filament CMS Engine
Deploys a robust administration dashboard with role-based access controls:
* **Filament Resources:** Includes dedicated resources managing dynamic advertisement blocks (`AdResource`), comments moderation (`CommentResource`), newsletter signups (`NewsletterResource`), and categories sort order (`CategoryResource`).
* **Spatie Roles & Permissions:** Configures Spatie role-based authorization schemas (`RoleResource`, `UserResource`) separating administration levels (Admin, Editor, Moderator, Viewer).
* **Dynamic Site Settings:** Integrates site settings controls (`SiteSettingResource`) enabling admins to dynamically update radio stream URLs, live player settings, Tawk.to support widget keys, and company logos.

### B. Rich Article & Revision Manager
Controls the publishing lifecycle of editorial content (`app/Filament/Resources/ArticleResource.php`):
* **Media Uploads:** Authors write articles with attachments, image assets, and dynamic tags.
* **Trending & Top Stories:** Features flags to categorize articles as trending or pinned top stories.
* **Revision History tracking:** Automatically logs modifications in the database (`ArticleRevisionResource.php`) mapping author revisions.

### C. Daily.co WebRTC Video Conference Calls
Powers WebRTC-based video rooms for live panel discussions and calls (`app/Services/DailyService.php`):
* **Room Creation APIs:** Requests Daily.co API endpoints to spin up private video rooms (`createRoom`) with screen-sharing and knocking enabled.
* **Filament call Room (`app/Filament/Pages/CallRoom.php`):** Generates meeting tokens with moderator owner privileges (`is_owner => true`) and embeds the prebuilt video iframe inside the admin panel.
* **Public Call Endpoint:** Connects public users to prebuilt conference layouts via the `/call` web controller.

### D. Chat Webhooks Integration
Logs meeting messages in real time (`routes/api.php`):
* **Webhook Endpoint (`/daily-webhook`):** Receives events dispatched by the Daily.co platform.
* **Message Logging:** On `chat-message` payloads, it extracts the meeting ID, sender name, and text contents, writing them to the local `chat_messages` table.

### E. Broadcast Audio Streams Analytics
Exposes streaming status statistics to users and administrators (`app/Http/Controllers/Api/RadioController.php`):
* **Public stream Status:** Fetches live stream metadata for listeners on the home player interface.
* **Admin Analytics:** Provides endpoint trackers querying peak listeners, total connections, last restarts, and uptime calculations.

### F. Sitemap & SEO Discovery
* **SEO Feeds:** Deploys dynamic sitemap controllers mapping routes (`/sitemap.xml`) and article RSS channels (`/feed`) to index pages on search engines automatically.

### G. Shell Deployment Dispatcher
* **Auto-Deploy Testing Route (`/deploy-test`):** Triggered by administrators to launch the deployment bash script (`deploy.sh`), returning execution output logs directly to the screen.
