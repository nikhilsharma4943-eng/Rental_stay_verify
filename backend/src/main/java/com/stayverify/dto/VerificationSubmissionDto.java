package com.stayverify.dto;

import jakarta.validation.constraints.NotBlank;

public class VerificationSubmissionDto {
    @NotBlank(message = "Property ID is required")
    private String propertyId;

    @NotBlank(message = "Verification type is required")
    private String verificationType; // OWNER_ID, PROPERTY_EVIDENCE, ON_SITE

    @NotBlank(message = "Document type is required")
    private String documentType;

    private String documentPath;
    private String notes;

    public VerificationSubmissionDto() {}

    public String getPropertyId() { return propertyId; }
    public void setPropertyId(String propertyId) { this.propertyId = propertyId; }

    public String getVerificationType() { return verificationType; }
    public void setVerificationType(String verificationType) { this.verificationType = verificationType; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getDocumentPath() { return documentPath; }
    public void setDocumentPath(String documentPath) { this.documentPath = documentPath; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
