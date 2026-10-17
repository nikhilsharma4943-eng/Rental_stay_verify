package com.stayverify.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class VisitRequestDto {
    @NotBlank(message = "Property ID is required")
    private String propertyId;

    @NotBlank(message = "Visitor name is required")
    private String visitorName;

    @NotBlank(message = "Visitor phone is required")
    private String visitorPhone;

    @NotNull(message = "Preferred visit date is required")
    private LocalDate preferredDate;

    @NotBlank(message = "Preferred time slot is required")
    private String preferredSlot;

    private String notes;

    public VisitRequestDto() {}

    public String getPropertyId() { return propertyId; }
    public void setPropertyId(String propertyId) { this.propertyId = propertyId; }

    public String getVisitorName() { return visitorName; }
    public void setVisitorName(String visitorName) { this.visitorName = visitorName; }

    public String getVisitorPhone() { return visitorPhone; }
    public void setVisitorPhone(String visitorPhone) { this.visitorPhone = visitorPhone; }

    public LocalDate getPreferredDate() { return preferredDate; }
    public void setPreferredDate(LocalDate preferredDate) { this.preferredDate = preferredDate; }

    public String getPreferredSlot() { return preferredSlot; }
    public void setPreferredSlot(String preferredSlot) { this.preferredSlot = preferredSlot; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
