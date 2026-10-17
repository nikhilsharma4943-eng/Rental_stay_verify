package com.stayverify.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal rent;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal deposit;

    @Column(nullable = false, length = 30)
    private String gender = "Any";

    @Column(length = 100)
    private String occupancy;

    @Column(nullable = false)
    private Boolean available = true;

    @Column(name = "electricity_terms")
    private String electricityTerms;

    @Column(name = "notice_period")
    private String noticePeriod;

    @Column(name = "lock_in_period")
    private String lockInPeriod;

    @Column(length = 200)
    private String maintenance;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "owner_name", nullable = false, length = 150)
    private String ownerName;

    @Column(name = "owner_phone", nullable = false, length = 30)
    private String ownerPhone;

    @Column(name = "owner_since", length = 10)
    private String ownerSince;

    @Column(name = "owner_id_verified", nullable = false)
    private Boolean ownerIdVerified = false;

    @Column(name = "property_evidence_verified", nullable = false)
    private Boolean propertyEvidenceVerified = false;

    @Column(name = "contact_verified", nullable = false)
    private Boolean contactVerified = false;

    @Column(name = "on_site_verified", nullable = false)
    private Boolean onSiteVerified = false;

    @Column(name = "verification_status", nullable = false, length = 50)
    private String verificationStatus = "UNDER_REVIEW";

    @Column(name = "evidence_type")
    private String evidenceType;

    @Column(name = "fraud_risk_level", length = 30)
    private String fraudRiskLevel = "LOW";

    @Column(name = "fraud_risk_note")
    private String fraudRiskNote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "property_amenities", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "amenity")
    private List<String> amenities = new ArrayList<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Property() {}

    // Getters and Setters
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

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
