# Transit Booking Microservices - Project Profile

This high-performance transit routing, seat booking, and multi-service logistics ecosystem was architected from the ground up as a distributed microservices network. It implements separate service modules managing user identities, transport operating companies, escrow ledger wallets, and payment gateways.

* **Core Technology Stack:** Laravel (PHP), MySQL, Redis, Flutterwave Gateway, Paystack Gateway, Docker, Docker Compose.

---

## 1. Microservices Architecture

The transit booking system is split across four dedicated Laravel microservices, communicating via secure service API layers:

### A. Authentication Service (`trip-ease-auth-service`)
* **Identity Management:** Coordinates registration, login, profile retrieval (`me`), and Sanctum bearer token management (including list tokens and revocation options).
* **Role-Based Access Control:** Role resource manager controllers (`RoleController`) governing administrative permissions across services.

### B. Fleet & Operator Service (`trip-ease-companies-service`)
* **Corporate Registries:** Manages operator accounts (`CompanyController`), stations/locations (`TerminalController`), active vehicles fleet (`VehicleController`), and staff rosters (`DriverController`).
* **Schedules & Recurring Routes:** Configures schedule series (`ScheduleController`) mapping bidirectional route schedules, route stops, distance indexes, and dynamic pricing metrics.
* **Driver Mobile Auth:** Exposes specialized driver-only authorization endpoints (`DriverLoginController`) supporting native driver applications.
* **Access Control Middleware:** Uses `AuthServiceMiddleware` to validate inter-service signatures on inbound operations requests.

### C. Ledger & Payment Gateway Service (`trip-ease-payment-service`)
* **Payment Router:** Initiates transaction sessions via provider gateways (supporting Paystack and Flutterwave) and monitors status verify endpoints.
* **Webhook Receiver:** Exposes public callback endpoints (`/webhooks/flutterwave`) validating platform signatures to mark transactions as paid.
* **Throughput Gateways:** Protected by `check.service` middleware checking service-to-service validation keys, alongside rate-limiting API throttlers.

### D. Transport & Journey Planner Service (`trip-ease-transport-service`)
* **Trip Routing Queries:** Executes search journey controllers (`searchJourney`) to dynamically locate multi-leg trips, calculate speed/distance metrics, and plan legs.
* **Booking Ledger coordination:** Connects booking states with the payment microservice to verify transactions, credit user escrow wallets, and complete bookings idempotently.
* **Operations Logs updates:** Updates transit schedules and leg progress records (`updateLegStatusBySchedule`).

---

## 2. Escrow Ledger & Idempotency Governance

The ledger system in `trip-ease-transport-service/app/Services/WalletService.php` is engineered to handle ledger credits/debits with strict transaction guarantees:

* **Row Locking (`lockForUpdate`):** Inside database transactions, the service locks the user's specific `EscrowWallet` row. This prevents double-spending anomalies and race conditions during concurrent booking requests.
* **Deadlock Auto-Retry:** Uses Laravel's transaction retry parameters to repeat the transaction block up to **5 times** if a database deadlock is encountered, ensuring seamless completion.
* **Idempotency by Reference:** Prior to modifying any balances, the script checks the `WalletTransaction` database table for the unique reference string (e.g., `$paymentReference` or `$paymentReference . '-DEBIT'`). If found, it immediately returns the existing record without altering the balance again, protecting against double-billing.
* **Audit Logs:** Logs balances before and after operations (`balance_before`, `balance_after`), capturing transaction timestamps and metadata.

---

## 3. System Design & Architectural Review

The platform runs as a distributed event-coordinated microservices cluster. Below is the system architecture sequence outlining the transaction validation, ledger operations, and the self-healing compensation loops.

### A. Journey Booking & Escrow Transaction Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Passenger as Passenger App
    participant TS as Transport Service
    participant PS as Payment Service
    participant CS as Companies Service
    participant Gateway as Paystack / Flutterwave

    Passenger->>TS: 1. Request Booking (Journey payload + Payment token)
    alt Gateway Checkout Required
        TS->>PS: 2. Initiate Payment (Amount, User ID)
        PS->>Gateway: 3. Create Checkout URL
        Gateway-->>PS: 4. Return Checkout Link & Ref
        PS-->>TS: 5. Return Checkout payload
        TS-->>Passenger: 6. Redirect to Checkout Link
        Passenger->>Gateway: 7. Authorize & Pay
        Gateway->>PS: 8. Send Payment Webhook Callback
        PS->>PS: 9. Verify Signature & Complete Transaction
    end

    Passenger->>TS: 10. Complete Booking (Ref, Journey)
    TS->>PS: 11. Verify Payment Status (Ref)
    PS-->>TS: 12. Return Success Payload

    Note over TS, TS: Ledger Escalation starts inside DB Transaction
    TS->>TS: 13. Query unique reference (Idempotence Check)
    alt Reference not yet processed
        TS->>TS: 14. Lock EscrowWallet row for update
        TS->>TS: 15. Credit Escrow Wallet (Reference: REF)
        TS->>TS: 16. Create Credit Ledger Entry
        TS->>TS: 17. Debit Escrow Wallet (Reference: REF-DEBIT)
        TS->>TS: 18. Create Debit Ledger Entry
        TS->>TS: 19. Commit DB Transaction (Unlock Wallet)
    end

    Note over TS, CS: Inter-Service Sync Session
    TS->>CS: 20. Sync Booking Request (X-Client-Id validation)
    alt Companies Service locks seats successfully
        CS->>CS: 21. Create Bookings, Lock Seat Numbers
        CS-->>TS: 22. Return 201 Created (Booking Reference, Seat Numbers)
        TS->>TS: 23. Update local TripLegs with seat numbers & Confirm Trip
        TS-->>Passenger: 24. Render Confirmed Trip Layout & QR Code
    else Sync Session Fails (Network Outage / Validation Errors)
        CS-->>TS: 25. Return Error status (500 / 422)
        Note over TS, TS: Self-Healing Compensation Loop triggers
        TS->>TS: 26. Lock EscrowWallet row for update
        TS->>TS: 27. Credit Escrow Wallet Refund (Reference: REF-REFUND)
        TS->>TS: 28. Create Refund Credit Ledger Entry
        TS->>TS: 29. Update Trip status to 'Error' (Save error message)
        TS-->>Passenger: 30. Return Booking Failed Layout (Escrow Wallet Refunded)
    end
```


### B. Component System Architecture Diagram

```mermaid
graph TD
    %% Clients
    subgraph Clients
        App[Passenger Mobile/Web App]
        DriverApp[Driver Mobile App]
    end

    %% Gateway
    subgraph Gateway Layer
        Nginx[Nginx Reverse Proxy / Load Balancer]
    end

    %% Microservices
    subgraph microservices [Transit Microservices Core]
        Auth[trip-ease-auth-service<br/>Laravel / Sanctum]
        Companies[trip-ease-companies-service<br/>Laravel / Fleet Core]
        Payments[trip-ease-payment-service<br/>Laravel / Transactions]
        Transport[trip-ease-transport-service<br/>Laravel / Router & Wallet]
    end

    %% Databases
    subgraph Databases [Data Storage Layers]
        DB_Auth[(Auth MySQL)]
        DB_Comp[(Companies MySQL)]
        DB_Pay[(Payments MySQL)]
        DB_Trans[(Transport MySQL)]
        RedisCache[(Redis Cluster<br/>Cache & Throttles)]
    end

    %% Gateways External
    subgraph External Gateways
        Paystack[Paystack API]
        Flutterwave[Flutterwave API]
    end

    %% Connections Clients to Gateway
    App -->|HTTPS Requests| Nginx
    DriverApp -->|HTTPS Requests| Nginx

    %% Reverse proxy routes
    Nginx -->|/api/auth/*| Auth
    Nginx -->|/api/companies/*| Companies
    Nginx -->|/api/payments/*| Payments
    Nginx -->|/api/transport/*| Transport

    %% Inter-service HTTP calls
    Transport -->|Verify Payment HTTP| Payments
    Transport -->|Sync Bookings HTTP| Companies
    Companies -->|Authenticate Token HTTP| Auth
    Payments -->|Authorize Payment HTTP| Auth

    %% Databases relations
    Auth --> DB_Auth
    Companies --> DB_Comp
    Payments --> DB_Pay
    Transport --> DB_Trans

    %% Shared caching
    Companies -.-> RedisCache
    Payments -.-> RedisCache
    Transport -.-> RedisCache

    %% External links
    Payments -->|Checkout/Verify| Paystack
    Payments -->|Checkout/Verify| Flutterwave
    Paystack -->|Webhooks callback| Payments
    Flutterwave -->|Webhooks callback| Payments
```

### C. Microservice Component Responsibilities

1. **Authentication Boundary:** Centralizes user profiles and tokens inside Sanctum databases, shielding other endpoints from unauthorized calls.
2. **Double-Spend Protection (Transport Service):** The `lockForUpdate` lock ensures that no concurrent transaction thread can manipulate the same wallet model before the current debit completes.
3. **Idempotence Integrity:** The payments, credits, and debits track distinct references (`REF`, `REF-DEBIT`, `REF-REFUND`). If any request crashes halfway, the client retries safely without risking duplicate funding or duplicate debits.
4. **Autonomous Decoupling:** The `Transport Service` maintains a caching schema of routes. If the `Companies Service` experiences a temporary outage, passengers can still browse journeys. The booking sync acts as the final validation checkpoint during checkout.
5. **Self-Healing Reconciliations:** The fallback compensation loop guarantees that network outages between the Transport and Companies services do not lock passenger capital. If the booking cannot be confirmed, the ledger automatically balances back to zero.
