from typing import Dict, Any

# Locality baseline rental benchmarks (in INR)
BENCHMARKS = {
    "PG": {"median": 9000, "min_expected": 5000, "max_expected": 20000},
    "Hostel": {"median": 10500, "min_expected": 6000, "max_expected": 22000},
    "Room": {"median": 7500, "min_expected": 4500, "max_expected": 18000},
    "Flat": {"median": 20000, "min_expected": 12000, "max_expected": 60000}
}

def evaluate_fraud_risk(data: Dict[str, Any]) -> Dict[str, Any]:
    prop_type = data.get("type", "PG")
    rent = float(data.get("rent", 0))
    deposit = float(data.get("deposit", 0))
    owner_verified = bool(data.get("owner_verified", False))
    evidence_verified = bool(data.get("evidence_verified", False))

    benchmark = BENCHMARKS.get(prop_type, BENCHMARKS["PG"])
    min_exp = benchmark["min_expected"]
    median = benchmark["median"]

    score = 0
    reasons = []

    # 1. Price Anomaly Test
    if rent < min_exp * 0.6:
        score += 45
        reasons.append(f"Listed rent (₹{int(rent):,}) is >40% lower than typical {prop_type} baseline.")
    elif rent < min_exp:
        score += 20
        reasons.append(f"Listed rent (₹{int(rent):,}) is below typical market minimum.")

    # 2. Deposit Anomaly Test
    if deposit > rent * 6:
        score += 25
        reasons.append(f"Security deposit (₹{int(deposit):,}) is unusually high compared to rent.")
    elif deposit == 0 and prop_type == "Flat":
        score += 15
        reasons.append("Zero deposit on full flat listing requires physical verification.")

    # 3. Verification Document Test
    if not owner_verified:
        score += 20
        reasons.append("Owner identity has not passed government photo ID review.")
    if not evidence_verified:
        score += 20
        reasons.append("Property ownership deed / utility bill has not been verified.")

    # Determine risk category
    if score >= 50:
        level = "HIGH"
        summary = "High Risk: " + " ".join(reasons)
    elif score >= 25:
        level = "MODERATE"
        summary = "Moderate Risk: " + " ".join(reasons)
    else:
        level = "LOW"
        summary = "Low Risk: Rental pricing and verification documents conform to standard market benchmarks."

    return {
        "property_id": data.get("property_id", "unknown"),
        "risk_level": level,
        "risk_score": min(score, 100),
        "explanation": summary,
        "factors": reasons
    }
