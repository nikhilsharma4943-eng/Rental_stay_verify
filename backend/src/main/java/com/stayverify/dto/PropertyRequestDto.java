package com.stayverify.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public class PropertyRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Property type is required")
    private String type;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Rent is required")
    @Min(value = 500, message = "Monthly rent must be at least ₹500")
    private BigDecimal rent;

    @NotNull(message = "Deposit is required")
    @Min(value = 0, message = "Deposit cannot be negative")
    private BigDecimal deposit;

    private String gender = "Any";
    private String occupancy;
    private Boolean available = true;
    private String electricityTerms;
    private String noticePeriod;
    private String lockInPeriod;
    private String maintenance;
    private String description;
    private String ownerName;
    private String ownerPhone;
    private String evidenceType;
    private List<String> images;
    private List<String> amenities;

    public PropertyRequestDto() {}

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

    public String getEvidenceType() { return evidenceType; }
    public void setEvidenceType(String evidenceType) { this.evidenceType = evidenceType; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }
}
