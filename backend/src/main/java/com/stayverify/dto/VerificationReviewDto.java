package com.stayverify.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class VerificationReviewDto {
    @NotBlank(message = "Review status is required")
    private String status; // VERIFIED, REJECTED, ACTION_REQUIRED

    private String notes;
    private List<String> badgesGranted; // e.g. ["OWNER_ID", "PROPERTY_EVIDENCE", "ON_SITE"]

    public VerificationReviewDto() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<String> getBadgesGranted() { return badgesGranted; }
    public void setBadgesGranted(List<String> badgesGranted) { this.badgesGranted = badgesGranted; }
}
