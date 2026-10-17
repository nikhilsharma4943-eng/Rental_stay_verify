# StayVerify — Local Setup & Development Guide (Windows)

This document provides exact, tested step-by-step instructions to run the StayVerify full-stack application on Windows.

---

## 1. Prerequisites Verified on This System

| Component | Installed / Supported Version |
|---|---|
| **Java JDK** | Java 21 / Java 26 (Verified: `jdk-26.0.1`) |
| **Node.js** | Node.js v18+ (Verified: `v24.22.0`) |
| **npm** | npm 10+ (Verified: `11.19.1`) |
| **Maven** | Apache Maven 3.9+ (Installed in user directory & wrapped via `mvnw.cmd`) |
| **Python** | Python 3.10+ (Verified: `3.14.2`) |
| **Database** | PostgreSQL 14+ or Standalone Local Profile (H2 PostgreSQL mode) |

---

## 2. Running the Spring Boot Backend

### Option A: Instant Local Startup (No External Database Required)
The project includes a ready-to-run local profile configured with an in-memory PostgreSQL-compatible database and pre-seeded demonstration data.

Open PowerShell in the `backend/` directory:
```powershell
cd backend
& "$env:LOCALAPPDATA\Programs\Maven\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run "-Dspring-boot.run.profiles=local"
```
Or simply run using the provided wrapper:
```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
```
The backend starts on: **`http://localhost:8080`**

### Option B: Running with a Live PostgreSQL Database
1. Create the database in PostgreSQL:
   ```sql
   CREATE DATABASE stayverify;
   ```
2. Configure your credentials in `backend/.env` or set environment variables:
   ```powershell
   $env:DB_HOST="localhost"
   $env:DB_PORT="5432"
   $env:DB_NAME="stayverify"
   $env:DB_USER="postgres"
   $env:DB_PASSWORD="your_password"
   ```
3. Run with Flyway migrations:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

---

## 3. Running the React Frontend

Open a new PowerShell terminal:
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

The frontend application opens at: **`http://localhost:3000`** (or `http://localhost:5173`)

Vite is pre-configured with a reverse proxy forward: requests to `/api` automatically route to `http://localhost:8080/api`.

---

## 4. Running the Optional Python FastAPI Fraud Service

Open a new PowerShell terminal:
```powershell
cd fraud-service
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The service runs at **`http://localhost:8000`** with interactive API docs at **`http://localhost:8000/docs`**.

> **Note**: The StayVerify backend includes a native fallback rule engine. If the FastAPI service is not running, the platform continues functioning smoothly without interruptions.

---

## 5. Seeded Test Accounts

| Account Role | Email Address | Password | Permissions |
|---|---|---|---|
| **Administrator** | `admin@stayverify.com` | `AdminPassword@123` | Document Verification Queue, Listing Scam Reports, Fraud Alerts |
| **Property Owner** | `rajesh.sharma@example.com` | `Password@123` | Add / Edit Properties, Toggle Availability, Submit Evidence |
| **Student / Tenant** | `aarav.gupta@example.com` | `Password@123` | Browse, Filter, Contact Owner, Schedule In-Person Visits, Report Listings |

---

## 6. Running Tests

### Backend JUnit Tests
```powershell
cd backend
.\mvnw.cmd test "-Dspring.profiles.active=test"
```

### Frontend Production Build Test
```powershell
cd frontend
npm.cmd run build
```
