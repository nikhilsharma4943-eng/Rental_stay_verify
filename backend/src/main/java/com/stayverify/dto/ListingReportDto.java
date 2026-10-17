package com.stayverify.dto;

import jakarta.validation.constraints.NotBlank;

public class ListingReportDto {
    @NotBlank(message = "Property ID is required")
    private String propertyId;

    @NotBlank(message = "Reason is required")
    private String reason;

    @NotBlank(message = "Description is required")
    private String description;

    private String reporterEmail;

    public ListingReportDto() {}

    public String getPropertyId() { return propertyId; }
    public void setPropertyId(String propertyId) { this.propertyId = propertyId; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getReporterEmail() { return reporterEmail; }
    public void setReporterEmail(String reporterEmail) { this.reporterEmail = reporterEmail; }
}
