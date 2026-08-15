# Logistics API & Cargo Booking Platform - Project Profile

This enterprise logistics integration hub and billing gateway coordinates bulk international tariffs seeding, custom weight-tiered selling rates, Paystack-backed Dedicated Virtual Accounts (DVA) for logistical partner organizations, and automated webhook synchronization dispatching shipping statuses to downstream cargo booking engines.

* **Production URLs:** Intentionally omitted from public copy.
* **Engagement:** Contract full-stack engineering.
* **Core Technology Stack:** Laravel (PHP), MySQL, Paystack Gateway, SeerBit Gateway, Docker.

---

## 1. Core Architectural & System Features

### A. Partner Tariff Matrix Auto-Seeders
Automates international route rate tables:
* **Route Seeding Matrix:** Seeds custom tariff tables for shipping routes from Lagos, Nigeria (`LAG-NGA`) to major European countries (UK, Germany, Italy, France, etc.) mapped to a partner referral profile.
* **Weight-Tiered Price Splitting:** Automatically maps custom rates based on package weights: packages weighing up to 10kg are assigned a lower selling rate (`sellingRate10kg`), while packages over 10kg scale to a higher selling rate (`sellingRate20kg`).
* **Self-Healing DB Relations:** If a target country or routing location doesn't exist during seeding, the script dynamically creates the missing `Country` and `Location` rows on the fly, ensuring relational database integrity.

### B. Paystack Dedicated Virtual Account (DVA) Provisioning
Allocates designated partner billing accounts:
* **DVA Gateway:** Generates dedicated partner bank accounts on Paystack (using bank nodes like `test-bank`) and links the allocated account details (account number, bank, name) to the user's dashboard profile.
* **Direct Webhook Completion:** Deploys a dedicated Paystack webhook listener (`PaystackWebhookController.php`) validating HMAC-SHA512 payload signatures. On successful virtual account transfers, it completes the corresponding pending transaction and notifies downstream partner logistics portals.

### C. Paystack Profile Self-Healing & Name Splitting
Bypasses Paystack validation errors during account creation:
* **Dynamic Name Splitting:** Paystack customer creation requires distinct first and last name fields, whereas the system uses a single profile `name` string. The gateway automatically splits the string on spaces, extracting the first and last names and defaulting to `"Partner"` if the last name is missing.
* **Profile Autocomplete:** Automatically assigns a fallback phone number (`+2348030000000`) if the partner profile has no contact phone.
* **Failed Attempt Auto-Retry:** If a DVA assignment fails due to validation errors, the controller triggers a PUT request to update Paystack's records with corrected names/phones and automatically retries the bank allocation.

### D. Automated Feedback Request Scheduler
Gathers NPS metrics from direct clients:
* **24-Hour Dispatch Delay:** A console command scheduled via cron queries delivered shipments that have been in `delivered` status for at least 24 hours.
* **Partner Portal Exclusions:** Excludes configured cargo referral IDs from customer feedback logs, ensuring partner shipments are not emailed directly.
* **NPS Log Tracking:** Logs emails dispatched in the database to prevent duplicate mailers.

### E. SeerBit Gateway & Downstream Waybill Syncing
Drives cargo checkout portal operations (`cargo/app/Services/Payment/Providers/SeerBitProvider.php`):
* **SeerBit API Provider:** Implements a SeerBit gateway connection utilizing a token-exchange security handshake (post credentials to `/encrypt/keys` to generate a dynamic Bearer token) for secure initializations.
* **Status Webhooks:** Webhook controllers synchronize tracking updates from the core logistics API and backend webhooks to mark shipments as paid or in-transit.
* **Waybills Print Layouts:** Generates print-ready barcode-configured Waybills (`print.waybill` template) for cargo dispatch.

---

## 2. Git Repository Architecture

The logistics integration ecosystem is built across two distinct Git repositories:

1. **Core Logistics API**: The core logistics API handling DVA account allocations, international tariff matrices, feedback request commands, and webhook routing.
2. **Cargo Booking Portal (`cargo`)**: The partner-facing customer shipping booking portal managing payment transactions via SeerBit and printing waybills.
