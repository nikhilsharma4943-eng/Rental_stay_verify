# StayVerify — System Architecture & Design

> "Find Your Stay. Verify Before You Trust."

## 1. System Overview

StayVerify is an end-to-end full-stack accommodation platform designed specifically for college students and working professionals. Its core mission is eliminating rental fraud, hidden brokerage charges, and misleading rental terms through transparent pricing, strict owner identity verification, private property evidence review, and tenant community reporting.

```
+-----------------------------------------------------------------------------------+
|                                  StayVerify Platform                              |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ React Frontend (Vite + Inter Font + Plain CSS) ]                               |
|   - Hero Search & Filters (Rent, Gender, Amenities, Availability)                  |
|   - Transparent Pricing Cards (Rent + Refundable Deposit)                         |
|   - Two-Column Property Details & Verification Badges                             |
|   - Owner Portal (Listing Management & Evidence Upload)                           |
|   - Admin Console (Moderation Queue & Scam Reports)                               |
|                                       │                                           |
|                           HTTP REST (JSON + JWT)                                  |
|                                       ▼                                           |
|  [ Spring Boot Backend (Java 21 / 26) ]                                           |
|   - Spring Security 6 (Stateless JWT + BCrypt Passwords + RBAC)                   |
|   - Spring Web REST Controllers (/auth, /properties, /verifications, /admin)      |
|   - Spring Data JPA Repositories                                                  |
|   - Rule-Based Fraud Detection Engine                                             |
|                                       │                                           |
|                 ┌─────────────────────┴─────────────────────┐                     |
|                 ▼                                           ▼                     |
|      [ PostgreSQL Database ]                     [ Optional FastAPI ]             |
|       - Flyway Schema Migrations                  - External Heuristic &          |
|       - Users, Properties, Verifications            ML Pricing Anomaly Engine     |
|       - Visit Requests, Reports                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Component Design

### 2.1 Frontend Architecture (`/frontend`)
- **Framework**: React 18 with Vite.
- **Styling**: Vanilla CSS adhering strictly to the design reference tokens:
  - Backgrounds: `#FFFFFF`, `#F8FAFC`, `#F3F4F6`.
  - Accents: `#2563EB` (Primary blue), `#1D4ED8` (Hover), `#EFF6FF` (Light blue).
  - Statuses: Verified (`#15803D`), Pending (`#B45309`), Danger/Suspended (`#B91C1C`).
- **Icons**: Lucide React (`ShieldCheck`, `UserCheck`, `FileCheck`, `MapPin`, `AlertTriangle`, etc.).
- **State Management**: React Context (`AuthProvider`) for persistent JWT session, user roles, and modal orchestration.
- **Routing**: `react-router-dom` with routes for `/` (Homepage), `/properties` (Find Properties), `/property/:id` (Details), `/owner` (Owner Dashboard), `/admin` (Moderation Console).

### 2.2 Backend Architecture (`/backend`)
- **Runtime**: Java 21+ with Spring Boot 3.3.4.
- **Security**:
  - Stateless JWT token filter (`JwtAuthenticationFilter`).
  - BCrypt password hashing.
  - Role-Based Access Control enforcing `TENANT`, `OWNER`, and `ADMIN` boundaries.
- **Persistence**:
  - PostgreSQL driver with Spring Data JPA.
  - In-memory H2 profile (`local` / `test`) for instant developer bootstrapping.
  - Flyway migrations ensuring repeatable, version-controlled relational schemas.
- **Business Logic**:
  - Verification submission never awards badges automatically.
  - Private verification document paths are never exposed over public APIs.
  - Rule-based risk engine detects pricing anomalies (e.g. rent &lt; 50% locality baseline) and flags listings for moderator attention.

### 2.3 Independent Fraud Detection Service (`/fraud-service`)
- **Runtime**: Python 3.14 + FastAPI + Pydantic.
- **Purpose**: Computes price deviation metrics against regional market benchmarks (Delhi, Bangalore, Pune, Noida).
- **Resilience**: The Spring Boot backend safely queries the fraud service with fallback logic; if FastAPI is offline, the backend continues operating normally using its internal rule engine.
