# Wings Tenancy System - Project Profile

**Wings** is a multi-tenant property management platform built for estate landlords and letting agents. It manages the full lifecycle of rental properties — from property and unit registration, tenant onboarding, tenancy agreement creation, automated rent schedule generation, to payment tracking and income reporting.

* **Core Technology Stack:** Laravel 11, Livewire, Blade, MySQL, Cloudinary (image hosting), REST API layer.

---

## 1. Core Architecture & System Features

### A. Property & Unit Management
The platform implements a hierarchical property → unit → tenancy data model:
* **Property Registration:** Landlords register estate properties with type classification (residential, commercial), unit configuration (single or multi-unit), and optional valuation via `PropertyService.php`.
* **Unit Management:** Each property contains one or more units with configurable attributes — bedrooms, bathrooms, size (sqm/sqft), and rent price — managed via `UnitService.php`.
* **Cloudinary Image Pipeline:** Property and unit photos are uploaded, stored, and managed through a dedicated `CloudinaryService.php` integration supporting cover images and gallery collections via polymorphic `Image` model relationships.

### B. Tenancy Lifecycle Engine
The tenancy system manages the full rental agreement lifecycle:
* **Tenancy Creation with Overlap Detection:** When creating a tenancy, `TenancyService.php` validates date ranges against existing tenancies on the same unit to prevent double-booking conflicts.
* **Multi-Frequency Support:** Tenancies support weekly, monthly, quarterly, and yearly payment frequencies via the `PaymentFrequency` helper class.
* **Unit Status Tracking:** On tenancy creation, the associated unit is automatically marked as `TENANTED` and linked to the primary tenant.
* **Active Tenancy Scopes:** The `HasTenancyStatus` trait provides Eloquent scopes (`scopeActive`, `withActiveTenancy`, `withoutActiveTenancy`) for querying active vs. vacant units.

### C. Automated Rent Schedule Generation
One of the most substantial features — `RentScheduleService.php` — automatically generates a full payment schedule when a tenancy is created:
* **Date-Based Iteration:** Iterates from start date to end date using Carbon interval methods, generating a payment record for each billing period.
* **Custom Payment Day:** Supports a configurable `payment_day` field allowing landlords to set a specific day of the month for rent due dates.
* **First Payment Auto-Application:** Automatically distributes the tenant's initial payment across the generated schedule, marking periods as `paid`, `partial`, or `pending` based on the amount.
* **Non-Destructive Regeneration:** When a tenancy is updated, preserves already-paid/partial payment records while regenerating only pending/overdue entries.
* **Manual Income Application:** The `applyPayment()` method distributes a lump-sum payment across the oldest unpaid periods first (FIFO), correctly splitting partial payments.

### D. Payment Tracking & Status Management
* **Status State Machine:** Payments track five statuses — `pending`, `paid`, `partial`, `overdue`, `failed` — defined as constants on the `Payment` model.
* **Searchable & Sortable Data Tables:** The `HasDataTableColumns` trait provides auto-generated, configurable data table column definitions from database schema, with support for explicit column visibility, omission lists, and virtual/relationship columns.
* **Paginated Queries:** Both `payments_array()` and `income_array()` on the Tenancy model provide paginated, searchable, sortable payment listings with tenant and unit name resolution.

### E. Dashboard & Income Analytics
* **Financial Dashboard:** `Dashboard.php` Livewire component aggregates total income (sum of paid/partial payments), expenses, and balance with optional date-range filtering.
* **Currency Support:** Dashboard respects the authenticated user's currency preference.
* **Property Overview:** Dashboard lists all properties owned by the logged-in user.

### F. Tenant Management
* **Tenant Profiles:** Full tenant records with first/last name, date of birth, email, phone (primary + secondary), and social media links via `TenantService.php`.
* **Archive/Restore:** Tenants can be archived (status toggled to `archived`) and restored (toggled to `prospective`).

### G. REST API Layer
* **RESTful API Controllers:** Dedicated API controllers (`Api/PropertyController.php`, `Api/PaymentController.php`, `Api/TenantController.php`, `Api/AgentController.php`, `Api/UnitController.php`) exposing CRUD operations via JSON endpoints.
* **Service Layer Pattern:** All API controllers delegate to service classes (`PropertyService`, `PaymentService`, etc.) keeping controllers thin and business logic reusable.

### H. Company & Contact Settings
* **Company Profiles:** Livewire-driven company registration and settings management.
* **Contact Management:** Separate contact settings and display components.

---

## 2. Technical Patterns & Architecture

* **Service Layer Architecture:** All business logic is encapsulated in dedicated service classes (`PropertyService`, `UnitService`, `TenantService`, `TenancyService`, `PaymentService`, `RentScheduleService`, `CloudinaryService`, `AgentService`, `CompanyService`) — controllers remain thin.
* **Livewire Components:** Interactive UI built with Livewire for Dashboard, Property, Tenant, Company, Contact, AddTenancy, AddIncome, and ImageUploader components.
* **Reusable Blade Components:** Custom Blade components for data tables, date pickers, date range pickers, loading buttons, modals, action dropdowns, and notification toasts.
* **Eloquent Traits:** `HasDataTableColumns` for automatic table column generation and `HasTenancyStatus` for active tenancy scoping.
* **Polymorphic Image System:** Images attached to both properties and units via a shared `Image` model with `morphMany`/`morphOne` relationships.
