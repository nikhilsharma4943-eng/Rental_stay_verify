# StayVerify — Verification System & Safety Workflow

## 1. The Four Verification Checks

StayVerify incorporates four distinct verification levels to ensure authentic property listings and prevent student rental fraud.

| Verification Check | Required Evidence | Verification Process | Badge Awarded | Public Disclosure |
|---|---|---|---|---|
| **1. Contact Verified** | Owner mobile number | Confirmed via OTP or administrator SMS/WhatsApp verification | `Contact Verified` (Green) | Phone shown for verified inquiries |
| **2. Owner Identity** | Government Photo ID (Aadhaar / PAN / Voter ID / Passport) | Administrator matches ID name & photo with registered owner account | `Owner ID Verified` (Green) | **Strictly Private — Never Publicly Exposed** |
| **3. Property Evidence** | Registered Sale Deed, Electricity Bill (BESCOM, MSEDCL, Adani, etc.), Municipal Tax Receipt, or Society NOC | Administrator verifies owner name, property address, and billing meter number | `Evidence Reviewed` (Green) | **Document name shown only — Document file strictly private** |
| **4. On-Site Verified** | Physical inspection of accommodation by field agent | Premises visited to verify room condition, water supply, security, and gate timings | `On-Site Verified` (Green) | Inspection date recorded |

---

## 2. Core Security Invariants

### Invariant 1: No Automatic Verification Badges
Uploading a document **never** awards a badge automatically. When an owner submits an electricity bill or ID, the property's verification status changes to:
```
status: UNDER_REVIEW
evidenceType: "<Document Name> (Under Admin Review)"
propertyEvidenceVerified: false
```
Only an explicit administrative action (`POST /api/admin/verifications/{id}/review` with `status: VERIFIED`) converts the badge to green.

### Invariant 2: Total Document Privacy
Student tenants never see private Aadhaar numbers, tax receipts, or electricity bills. The public API only returns:
```json
{
  "ownerIdVerified": true,
  "propertyEvidenceVerified": true,
  "evidenceType": "Electricity Bill & Ownership Deed"
}
```
All actual document files remain in secure private storage accessible exclusively by authorized platform administrators.

### Invariant 3: Zero Visiting Fee Guarantee
Fraudulent operators frequently ask students for "visiting card fees" or "gate pass tokens" (₹500–₹2,000) before showing a property. StayVerify explicitly prohibits visiting fees:
- All in-person visits scheduled on StayVerify are **100% free**.
- If any owner or caretaker demands payment to view a property, tenants can immediately click **Report Listing**.
- Reports enter the admin queue; upon review, offending listings are immediately **SUSPENDED** with a `HIGH` fraud risk warning.
