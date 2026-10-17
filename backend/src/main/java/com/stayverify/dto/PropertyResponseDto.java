package com.stayverify.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PropertyResponseDto {
    private String id;
    private String title;
    private String type;
    private String location;
    private String address;
    private BigDecimal rent;
    private BigDecimal deposit;
    private String gender;
    private String occupancy;
    private Boolean available;
    private String electricityTerms;
    private String noticePeriod;
    private String lockInPeriod;
    private String maintenance;
    private String description;
    private String ownerName;
    private String ownerPhone;
    private String ownerSince;
    private Boolean ownerIdVerified;
    private Boolean propertyEvidenceVerified;
    private Boolean contactVerified;
    private Boolean onSiteVerified;
    private String verificationStatus;
    private String evidenceType;
    private String fraudRiskLevel;
    private String fraudRiskNote;
    private List<String> images;
    private List<String> amenities;
    private LocalDateTime createdAt;

    public PropertyResponseDto() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public BigDecimal getRent() { return rent; }
    public void setRent(BigDecimal rent) { this.rent = rent; }

    public BigDecimal getDeposit() { return deposit; }
    public void setDeposit(BigDecimal deposit) { this.deposit = deposit; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getOccupancy() { return occupancy; }
    public void setOccupancy(String occupancy) { this.occupancy = occupancy; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }

    public String getElectricityTerms() { return electricityTerms; }
    public void setElectricityTerms(String electricityTerms) { this.electricityTerms = electricityTerms; }

    public String getNoticePeriod() { return noticePeriod; }
    public void setNoticePeriod(String noticePeriod) { this.noticePeriod = noticePeriod; }

    public String getLockInPeriod() { return lockInPeriod; }
    public void setLockInPeriod(String lockInPeriod) { this.lockInPeriod = lockInPeriod; }

    public String getMaintenance() { return maintenance; }
    public void setMaintenance(String maintenance) { this.maintenance = maintenance; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getOwnerPhone() { return ownerPhone; }
    public void setOwnerPhone(String ownerPhone) { this.ownerPhone = ownerPhone; }

    public String getOwnerSince() { return ownerSince; }
    public void setOwnerSince(String ownerSince) { this.ownerSince = ownerSince; }

    public Boolean getOwnerIdVerified() { return ownerIdVerified; }
    public void setOwnerIdVerified(Boolean ownerIdVerified) { this.ownerIdVerified = ownerIdVerified; }

    public Boolean getPropertyEvidenceVerified() { return propertyEvidenceVerified; }
    public void setPropertyEvidenceVerified(Boolean propertyEvidenceVerified) { this.propertyEvidenceVerified = propertyEvidenceVerified; }

    public Boolean getContactVerified() { return contactVerified; }
    public void setContactVerified(Boolean contactVerified) { this.contactVerified = contactVerified; }

    public Boolean getOnSiteVerified() { return onSiteVerified; }
    public void setOnSiteVerified(Boolean onSiteVerified) { this.onSiteVerified = onSiteVerified; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getEvidenceType() { return evidenceType; }
    public void setEvidenceType(String evidenceType) { this.evidenceType = evidenceType; }

    public String getFraudRiskLevel() { return fraudRiskLevel; }
    public void setFraudRiskLevel(String fraudRiskLevel) { this.fraudRiskLevel = fraudRiskLevel; }

    public String getFraudRiskNote() { return fraudRiskNote; }
    public void setFraudRiskNote(String fraudRiskNote) { this.fraudRiskNote = fraudRiskNote; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
