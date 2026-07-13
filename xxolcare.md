# Xxolcare Booking Portal - Project Profile

**Xxolcare** is a premium Care Booking and Hospitality Management application. It enables seamless discovery, booking scheduling, and financial transaction settlement for care providers and hospitality professionals (referred to inside the core engine as "Xxolstars").

* **Production URL:** [https://xxolcare.com](https://xxolcare.com)
* **Core Technology Stack:** Laravel (PHP), MySQL, Paystack Gateway APIs, Docker, Termii SMS Gateway.

---

## 1. Core Architectural & System Features

### A. Care Booking & Hospitality Scheduling Engine
At the center of Xxolcare is a robust scheduling system (built around `BookingsController.php` and `ScheduleController.php`). 
* **Worker Allocations:** Allocates verified care stars to domestic care, cleaning, and hospitality sessions.
* **Customer Feedbacks & Ratings:** Integrates feedback nodes (`Feedbacks.php`) allowing clients to submit session scores, which dynamically updates the care star's operational rating.

### B. Dynamic Price Surge Algorithms
To optimize revenue during busy scheduling slots, the platform implements runtime cost surges:
* **Cost Multipliers:** Programmed dynamic price scaling rules (`25%`, `35%`, and `50%` cost multipliers) applied during high-demand peak slots (e.g. weekends, holidays, or late-night bookings).
* **Surge Control Logic:** Seamlessly adjusts the base service billing models prior to Paystack checkout authorization.

### C. Digital QR Business Card Channel
To streamline staff validation and business networking, the platform features a digital identity system (`StaffCardController.php`):
* **Dynamic QR Code Generation:** Generates unique vector QR codes encoding each staff member's profile card details.
* **Metadata Configuration:** Staff can customize optional contact fields, physical addresses, websites, and department tags on their digital business cards.

### D. Thread & Memory Optimization
To prevent backend worker threads from hitting operational memory boundaries during traffic spikes:
* **Bypassing Queue Blocks:** Successfully optimized email dispatch protocols by replacing asynchronous queue runners with in-memory direct variable injection paths (`test without queue - using variables`).
* **Result:** Eliminated queue database locking bottlenecks and resolved critical transactional mail delays.

### E. Bot Protection & Sign-Up Firewall
To protect the database from malicious registrations and fake accounts:
* **Middlewares:** Configured anti-bot middlewares analyzing request headers, payloads, and request frequency limits.
* **Bot Deflector:** Intercepts, logs, and blocks automated spambot sign-ups.

---

## 2. Payment & Third-Party Integrations
* **Paystack Webhooks:** Secure webhook ingestion verifying transaction references, resolving payment sessions, and triggering automated customer invoices.
* **Automated Mail Controllers:** Leverages customized SMTP mail routines (`MailController.php`) to deliver real-time care alerts, booking changes, and invoicing receipts.
