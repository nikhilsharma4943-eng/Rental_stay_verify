package com.stayverify.service;

import com.stayverify.dto.ListingReportDto;
import com.stayverify.entity.ListingReport;
import com.stayverify.entity.Property;
import com.stayverify.entity.User;
import com.stayverify.exception.ResourceNotFoundException;
import com.stayverify.repository.ListingReportRepository;
import com.stayverify.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ReportService {

    private final ListingReportRepository listingReportRepository;
    private final PropertyRepository propertyRepository;
    private final AuthService authService;

    public ReportService(ListingReportRepository listingReportRepository,
                         PropertyRepository propertyRepository,
                         AuthService authService) {
        this.listingReportRepository = listingReportRepository;
        this.propertyRepository = propertyRepository;
        this.authService = authService;
    }

    @Transactional
    public ListingReport submitReport(ListingReportDto dto) {
        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found: " + dto.getPropertyId()));

        User currentUser = authService.getCurrentUserEntity();

        ListingReport report = new ListingReport();
        report.setId("rep-" + UUID.randomUUID().toString().substring(0, 8));
        report.setProperty(property);
        report.setReporterId(currentUser != null ? currentUser.getId() : null);
        report.setReporterEmail(dto.getReporterEmail() != null ? dto.getReporterEmail() : (currentUser != null ? currentUser.getEmail() : null));
        report.setReason(dto.getReason());
        report.setDescription(dto.getDescription());
        report.setStatus("PENDING");

        // Increase fraud risk level if multiple complaints exist
        property.setFraudRiskLevel("MODERATE");
        property.setFraudRiskNote("Listing under active moderation review due to tenant report.");
        propertyRepository.save(property);

        return listingReportRepository.save(report);
    }

    @Transactional(readOnly = true)
    public List<ListingReport> getAllReports() {
        return listingReportRepository.findAll();
    }

    @Transactional
    public ListingReport updateReportStatus(String id, String status, String adminNotes) {
        ListingReport report = listingReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found: " + id));

        report.setStatus(status);
        if (adminNotes != null) {
            report.setAdminNotes(adminNotes);
        }

        if ("SUSPENDED".equalsIgnoreCase(status) && report.getProperty() != null) {
            Property property = report.getProperty();
            property.setAvailable(false);
            property.setVerificationStatus("SUSPENDED");
            property.setFraudRiskLevel("HIGH");
            property.setFraudRiskNote("Suspended due to verified violation of zero-advance-fee policy.");
            propertyRepository.save(property);
        }

        return listingReportRepository.save(report);
    }
}
