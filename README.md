# StayVerify — Full-Stack Rental Platform

> **"Find Your Stay. Verify Before You Trust."**

StayVerify is a complete, production-grade student and working professional rental platform built to discover PGs, hostels, independent rooms, and shared/full flats. The platform eliminates rental fraud, hidden brokerage charges, and misleading terms through transparent pricing, strict owner identity verification, private property evidence review, and community reporting.

---

## Key Differentiators & Features

1. **Transparent Pricing Breakdown**
   - Monthly rent and refundable security deposits are clearly separated in Indian Rupee format (`₹`).
   - Upfront disclosure of electricity charges (included units vs. sub-meter rates), maintenance fees, notice periods, and lock-in periods.
   - Zero hidden brokerage fees.

2. **Four-Tier Verification System**
   - **Contact Verified**: Owner mobile confirmed.
   - **Owner Identity Verified**: Government photo ID matched with owner profile by administrators.
   - **Property Evidence Reviewed**: Utility bills, registered sale deeds, municipal tax receipts, or society allotment certificates checked.
   - **On-Site Verified**: Optional physical verification by local field agents.
   - *Security Guarantee*: Uploading a document **never** awards a badge automatically; private document files are strictly held in administrative storage and **never** exposed publicly.

3. **Student Safety & Anti-Fraud Protection**
   - **Zero-Fee In-Person Visits**: Booking a physical inspection on StayVerify is 100% free. Demanding "visiting card fees" or "gate pass tokens" is strictly prohibited.
   - **Listing Reporting Queue**: Tenants can instantly report misleading photos or fee demands, routing the listing to the administrative moderation desk.
   - **Rule-Based Fraud Scoring**: Automatic detection of suspiciously low rental prices (&gt;40% below locality averages) and unverified listings.

---

## System Architecture & Project Organization

```
stayverify/
├── design-reference/
│   └── stayverify_rental_platform.tsx   # Original reference prototype
├── frontend/                            # React 18 + Vite + Plain CSS + Lucide Icons
│   ├── src/
│   │   ├── components/                  # Navbar, Footer, PropertyCard, Badges, Modals
│   │   ├── pages/                       # HomePage, FindProperties, PropertyDetails, Owner, Admin
│   │   ├── services/                    # api, authService, propertyService, verificationService, reportService
│   │   ├── hooks/                       # useAuth Context & RBAC helpers
│   │   ├── data/                        # mockProperties demonstration dataset
│   │   └── styles/index.css             # Design tokens & responsive CSS
│   ├── package.json
│   └── vite.config.js
├── backend/                             # Java 21 / 26 + Spring Boot 3.3.4 + Spring Data JPA
│   ├── src/main/java/com/stayverify/
│   │   ├── config/                      # WebSecurityConfig, DataInitializer
│   │   ├── controller/                  # AuthController, PropertyController, AdminController, etc.
│   │   ├── dto/                         # Request & Response DTOs
│   │   ├── entity/                      # User, Property, VerificationRecord, VisitRequest, ListingReport
│   │   ├── repository/                  # JPA Repositories with custom search
│   │   ├── security/                    # JWT Provider, Auth Filter, UserPrincipal
│   │   ├── service/                     # Business logic, FraudDetectionService
│   │   └── exception/                   # GlobalExceptionHandler
│   ├── src/main/resources/
│   │   ├── application.yml              # PostgreSQL configuration
│   │   ├── application-local.yml        # Standalone H2 PostgreSQL-compatible profile
│   │   └── db/migration/                # Flyway schema V1 & seed V2
│   ├── src/test/                        # JUnit & Spring Boot integration tests
│   ├── pom.xml
│   └── mvnw.cmd                         # Windows Maven wrapper
├── fraud-service/                       # Python FastAPI Independent Service
│   ├── app/
│   │   ├── main.py                      # FastAPI app & CORS
│   │   └── fraud_detector.py            # Heuristic pricing anomaly engine
│   └── requirements.txt
├── docs/
│   ├── ARCHITECTURE.md                  # Comprehensive architectural overview
│   ├── API_DOCUMENTATION.md             # REST API specifications
│   ├── VERIFICATION_WORKFLOW.md         # 4-stage verification lifecycle
│   └── LOCAL_SETUP.md                   # Detailed Windows environment setup
├── .gitignore
├── mvnw.cmd                             # Root Windows Maven wrapper
└── README.md
```

---

## Technology Stack

- **Frontend**: React 18, Vite, React Router v6, Plain CSS, Lucide React Icons.
- **Backend**: Java 21 / Java 26, Spring Boot 3.3.4, Spring Security 6 (JWT + BCrypt), Spring Data JPA, Bean Validation, PostgreSQL driver, Flyway migrations.
- **Database**: PostgreSQL (Production/Dev) / In-Memory H2 in PostgreSQL mode (Standalone Local/Testing).
- **Fraud Microservice**: Python 3.14, FastAPI, Pydantic, Uvicorn.

---

## Quick Start (Windows)

### 1. Start the Spring Boot Backend
In a PowerShell window:
```powershell
cd backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
```
*The backend starts at `http://localhost:8080` and pre-seeds initial demonstration accounts and properties.*

### 2. Start the React Frontend
In a separate PowerShell window:
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```
*The frontend opens at `http://localhost:3000` (or `http://localhost:5173`).*

### 3. (Optional) Start the FastAPI Fraud Engine
In a separate PowerShell window:
```powershell
cd fraud-service
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```
*API documentation available at `http://localhost:8000/docs`.*

---

## Default Accounts for Testing

| Role | Email | Password | Allowed Workflows |
|---|---|---|---|
| **Administrator** | `admin@stayverify.com` | `AdminPassword@123` | Moderate documents, approve verification badges, inspect reports, view fraud risk alerts |
| **Property Owner** | `rajesh.sharma@example.com` | `Password@123` | Add properties, edit listings, toggle availability, upload verification documents |
| **Student / Tenant** | `aarav.gupta@example.com` | `Password@123` | Browse, filter, contact owner, schedule in-person visits, report suspicious listings |

---

## Automated Tests

Run the backend JUnit test suite:
```powershell
cd backend
.\mvnw.cmd test "-Dspring.profiles.active=test"
```

Run the frontend production build verification:
```powershell
cd frontend
npm.cmd run build
```
