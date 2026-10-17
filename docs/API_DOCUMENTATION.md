# StayVerify — REST API Documentation

Base URL: `http://localhost:8080/api`

All protected endpoints require an `Authorization` HTTP header with a Bearer token:
```http
Authorization: Bearer <jwt-token>
```

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Creates a new tenant or owner account.
- **Request Body**:
  ```json
  {
    "name": "Aarav Gupta",
    "email": "aarav.gupta@example.com",
    "password": "Password@123",
    "role": "TENANT", // "TENANT" | "OWNER"
    "phone": "+91 98765 43210"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "tokenType": "Bearer",
    "user": {
      "id": "usr-a1b2c3d4",
      "name": "Aarav Gupta",
      "email": "aarav.gupta@example.com",
      "role": "TENANT",
      "phone": "+91 98765 43210"
    }
  }
  ```

### `POST /api/auth/login`
Authenticates user credentials and returns a signed JWT token.
- **Request Body**:
  ```json
  {
    "email": "admin@stayverify.com",
    "password": "AdminPassword@123"
  }
  ```
- **Response**: `200 OK` (returns token and user profile)

### `GET /api/auth/me`
Retrieves the profile of the currently authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

---

## 2. Property Endpoints (`/api/properties`)

### `GET /api/properties`
Search and filter verified rental listings. Publicly accessible.
- **Query Parameters**:
  - `location`: string (e.g. `North Campus`, `Kothrud`)
  - `type`: string (`PG`, `Hostel`, `Room`, `Flat`)
  - `minRent`: number
  - `maxRent`: number
  - `verifiedOnly`: boolean (`true` / `false`)
  - `gender`: string (`Boys`, `Girls`, `Any`)
  - `availableOnly`: boolean (`true` / `false`)
- **Response**: `200 OK` (Array of Property objects)

### `GET /api/properties/{id}`
Retrieve complete details of a specific property listing. Publicly accessible.
- **Response**: `200 OK`
  ```json
  {
    "id": "prop-101",
    "title": "Sunrise Student PG & Residency",
    "type": "PG",
    "location": "North Campus, Delhi",
    "address": "House 42, Block B, Vijay Nagar...",
    "rent": 8500.00,
    "deposit": 8500.00,
    "gender": "Boys",
    "occupancy": "Double Sharing",
    "available": true,
    "electricityTerms": "Included up to 100 units/month, then ₹8/unit",
    "noticePeriod": "1 Month",
    "lockInPeriod": "3 Months",
    "maintenance": "₹0 (Included in rent)",
    "ownerName": "Rajesh Sharma",
    "ownerPhone": "+91 98112 34567",
    "ownerSince": "2023",
    "ownerIdVerified": true,
    "propertyEvidenceVerified": true,
    "contactVerified": true,
    "onSiteVerified": false,
    "verificationStatus": "VERIFIED",
    "evidenceType": "Electricity Bill & Municipal Tax Receipt",
    "fraudRiskLevel": "LOW",
    "fraudRiskNote": "Normal market pricing; owner ID & property ownership verified.",
    "amenities": ["Wi-Fi", "Food / Mess", "Power Backup", "RO Water"],
    "images": ["https://images.unsplash.com/..."]
  }
  ```

### `POST /api/properties`
Create a new rental listing. Requires `OWNER` or `ADMIN` role.
- **Headers**: `Authorization: Bearer <token>`
- **Behavior**: Sets `ownerIdVerified = true`, `propertyEvidenceVerified = false`, and `verificationStatus = 'UNDER_REVIEW'`. **Never automatically verifies property evidence without admin review.**

### `PUT /api/properties/{id}`
Update an existing listing. Accessible by property owner or admin.

### `DELETE /api/properties/{id}`
Remove a listing. Accessible by property owner or admin.

### `PATCH /api/properties/{id}/toggle-availability`
Toggle property availability (Available vs. Full). Accessible by property owner or admin.

### `GET /api/properties/my-listings`
Returns all properties owned by the authenticated user.

---

## 3. Verification Endpoints (`/api/verifications`)

### `POST /api/verifications/submit`
Submit property ownership documents for administrator review.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "propertyId": "prop-101",
    "verificationType": "PROPERTY_EVIDENCE",
    "documentType": "Electricity Bill & Ownership Deed",
    "notes": "Attached latest utility bill for Vijay Nagar flat"
  }
  ```
- **Response**: `201 Created`

### `GET /api/verifications/my-requests`
Returns historical and pending verification submissions for the authenticated owner.

---

## 4. In-Person Visit Endpoints (`/api/visits`)

### `POST /api/visits`
Submit an in-person room inspection request.
- **Request Body**:
  ```json
  {
    "propertyId": "prop-101",
    "visitorName": "Aarav Gupta",
    "visitorPhone": "+91 98765 43210",
    "preferredDate": "2026-10-22",
    "preferredSlot": "Morning (10:00 AM - 1:00 PM)",
    "notes": "Looking to inspect the double sharing room."
  }
  ```
- **Response**: `201 Created`

---

## 5. Listing Reporting Endpoints (`/api/reports`)

### `POST /api/reports`
File a report against a misleading or fraudulent listing (e.g. visiting fees demanded).
- **Request Body**:
  ```json
  {
    "propertyId": "prop-105",
    "reason": "VISITING_FEE_DEMANDED",
    "description": "Owner requested ₹300 advance payment for gate pass",
    "reporterEmail": "student.rahul@example.com"
  }
  ```
- **Response**: `201 Created`

---

## 6. Administration Endpoints (`/api/admin`)
Requires `ROLE_ADMIN`.

### `GET /api/admin/verifications/queue`
Retrieve all pending owner evidence submissions.

### `POST /api/admin/verifications/{id}/review`
Approve or reject a submitted document:
- **Request Body**:
  ```json
  {
    "status": "VERIFIED", // "VERIFIED" | "REJECTED"
    "notes": "Electricity bill verified against municipal tax register.",
    "badgesGranted": ["PROPERTY_EVIDENCE"]
  }
  ```

### `GET /api/admin/reports`
Retrieve all student reports and scam complaints.

### `PATCH /api/admin/reports/{id}`
Update report status (`INVESTIGATING`, `RESOLVED`, `DISMISSED`, `SUSPENDED`).

### `GET /api/admin/fraud-alerts`
Returns listings flagged by the rule engine with `HIGH` or `MODERATE` pricing discrepancy.
