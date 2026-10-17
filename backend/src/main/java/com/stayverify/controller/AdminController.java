package com.stayverify.controller;

import com.stayverify.dto.PropertyResponseDto;
import com.stayverify.dto.VerificationReviewDto;
import com.stayverify.entity.ListingReport;
import com.stayverify.entity.VerificationRecord;
import com.stayverify.service.PropertyService;
import com.stayverify.service.ReportService;
import com.stayverify.service.VerificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final VerificationService verificationService;
    private final ReportService reportService;
    private final PropertyService propertyService;

    public AdminController(VerificationService verificationService,
                           ReportService reportService,
                           PropertyService propertyService) {
        this.verificationService = verificationService;
        this.reportService = reportService;
        this.propertyService = propertyService;
    }

    @GetMapping("/verifications/queue")
    public ResponseEntity<List<VerificationRecord>> getVerificationQueue() {
        return ResponseEntity.ok(verificationService.getAdminQueue());
    }

    @PostMapping("/verifications/{id}/review")
    public ResponseEntity<VerificationRecord> reviewVerification(
            @PathVariable String id,
            @Valid @RequestBody VerificationReviewDto reviewDto
    ) {
        return ResponseEntity.ok(verificationService.reviewEvidence(id, reviewDto));
    }

    @GetMapping("/reports")
    public ResponseEntity<List<ListingReport>> getReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @PatchMapping("/reports/{id}")
    public ResponseEntity<ListingReport> updateReport(
            @PathVariable String id,
            @RequestBody Map<String, String> body
    ) {
        String status = body.getOrDefault("status", "INVESTIGATING");
        String adminNotes = body.get("adminNotes");
        return ResponseEntity.ok(reportService.updateReportStatus(id, status, adminNotes));
    }

    @GetMapping("/fraud-alerts")
    public ResponseEntity<List<PropertyResponseDto>> getFraudAlerts() {
        List<PropertyResponseDto> all = propertyService.searchProperties(null, null, null, null, null, null, null);
        List<PropertyResponseDto> flagged = all.stream()
                .filter(p -> "HIGH".equalsIgnoreCase(p.getFraudRiskLevel()) || "MODERATE".equalsIgnoreCase(p.getFraudRiskLevel()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(flagged);
    }
}
