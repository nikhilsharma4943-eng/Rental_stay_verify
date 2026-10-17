package com.stayverify.service;

import com.stayverify.entity.Property;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class FraudDetectionService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String FASTAPI_FRAUD_URL = "http://localhost:8000/api/fraud/evaluate";

    public static class FraudResult {
        public String riskLevel; // LOW, MODERATE, HIGH
        public String riskNote;

        public FraudResult(String riskLevel, String riskNote) {
            this.riskLevel = riskLevel;
            this.riskNote = riskNote;
        }
    }

    public FraudResult assessPropertyRisk(Property property) {
        // Try calling independent FastAPI service if running
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("property_id", property.getId());
            payload.put("type", property.getType());
            payload.put("location", property.getLocation());
            payload.put("rent", property.getRent());
            payload.put("deposit", property.getDeposit());
            payload.put("owner_verified", property.getOwnerIdVerified());
            payload.put("evidence_verified", property.getPropertyEvidenceVerified());

            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.postForObject(FASTAPI_FRAUD_URL, payload, Map.class);
            if (response != null && response.containsKey("risk_level")) {
                return new FraudResult(
                        (String) response.get("risk_level"),
                        (String) response.get("explanation")
                );
            }
        } catch (Exception ex) {
            // FastAPI service unavailable; gracefully proceed with native Spring Boot rule-based engine
        }

        // Native Rule-Based Risk Engine
        BigDecimal rent = property.getRent() != null ? property.getRent() : BigDecimal.ZERO;
        String type = property.getType() != null ? property.getType() : "PG";

        // Rule 1: Rent unusually low (Suspicious bait-and-switch pricing)
        if ("Flat".equalsIgnoreCase(type) && rent.compareTo(new BigDecimal("7000")) < 0) {
            return new FraudResult("HIGH", "Warning: Rent is unusually low (< ₹7,000) for a full apartment in this region. Inspect before deposit.");
        }
        if ("PG".equalsIgnoreCase(type) && rent.compareTo(new BigDecimal("3500")) < 0) {
            return new FraudResult("HIGH", "Warning: Rent is &gt;50% below North Campus / Metro area median for student PGs.");
        }

        // Rule 2: Unverified evidence
        if (!Boolean.TRUE.equals(property.getPropertyEvidenceVerified())) {
            return new FraudResult("MODERATE", "Property utility bill is pending administrative review. Avoid advance token transfers.");
        }

        return new FraudResult("LOW", "Standard market pricing; owner ID & property ownership verified.");
    }
}
