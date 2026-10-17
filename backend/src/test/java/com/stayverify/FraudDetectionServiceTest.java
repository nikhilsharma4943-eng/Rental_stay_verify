package com.stayverify;

import com.stayverify.entity.Property;
import com.stayverify.service.FraudDetectionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class FraudDetectionServiceTest {

    private FraudDetectionService fraudDetectionService;

    @BeforeEach
    void setUp() {
        fraudDetectionService = new FraudDetectionService();
    }

    @Test
    void testAssessPropertyRisk_LowRentFlat_FlagsHighRisk() {
        Property property = new Property();
        property.setType("Flat");
        property.setRent(new BigDecimal("4500")); // Far below normal ₹18,000
        property.setPropertyEvidenceVerified(false);

        FraudDetectionService.FraudResult result = fraudDetectionService.assessPropertyRisk(property);

        assertEquals("HIGH", result.riskLevel);
        assertTrue(result.riskNote.contains("unusually low"));
    }

    @Test
    void testAssessPropertyRisk_UnverifiedEvidence_FlagsModerateRisk() {
        Property property = new Property();
        property.setType("PG");
        property.setRent(new BigDecimal("9000"));
        property.setPropertyEvidenceVerified(false);

        FraudDetectionService.FraudResult result = fraudDetectionService.assessPropertyRisk(property);

        assertEquals("MODERATE", result.riskLevel);
        assertTrue(result.riskNote.contains("pending"));
    }

    @Test
    void testAssessPropertyRisk_FullyVerified_FlagsLowRisk() {
        Property property = new Property();
        property.setType("PG");
        property.setRent(new BigDecimal("8500"));
        property.setOwnerIdVerified(true);
        property.setPropertyEvidenceVerified(true);

        FraudDetectionService.FraudResult result = fraudDetectionService.assessPropertyRisk(property);

        assertEquals("LOW", result.riskLevel);
        assertTrue(result.riskNote.contains("verified"));
    }
}
