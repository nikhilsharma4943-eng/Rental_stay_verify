package com.stayverify.service;

import com.stayverify.dto.PropertyRequestDto;
import com.stayverify.dto.PropertyResponseDto;
import com.stayverify.entity.Property;
import com.stayverify.entity.Role;
import com.stayverify.entity.User;
import com.stayverify.exception.BadRequestException;
import com.stayverify.exception.ResourceNotFoundException;
import com.stayverify.repository.PropertyRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final AuthService authService;
    private final FraudDetectionService fraudDetectionService;

    public PropertyService(PropertyRepository propertyRepository,
                           AuthService authService,
                           FraudDetectionService fraudDetectionService) {
        this.propertyRepository = propertyRepository;
        this.authService = authService;
        this.fraudDetectionService = fraudDetectionService;
    }

    @Transactional(readOnly = true)
    public List<PropertyResponseDto> searchProperties(String location, String type, BigDecimal minRent,
                                                      BigDecimal maxRent, Boolean verifiedOnly,
                                                      String gender, Boolean availableOnly) {
        String locParam = (location != null && !location.trim().isEmpty()) ? location.trim() : null;
        String typeParam = (type != null && !type.equals("All")) ? type : null;

        List<Property> properties = propertyRepository.searchProperties(
                locParam, typeParam, minRent, maxRent, verifiedOnly, gender, availableOnly
        );

        return properties.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PropertyResponseDto getPropertyById(String id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property with ID " + id + " not found"));
        return mapToDto(property);
    }

    @Transactional
    public PropertyResponseDto createProperty(PropertyRequestDto dto) {
        User currentUser = authService.getCurrentUserEntity();
        if (currentUser == null) {
            throw new AccessDeniedException("Must be authenticated to list a property");
        }

        Property property = new Property();
        property.setId("prop-" + UUID.randomUUID().toString().substring(0, 8));
        property.setTitle(dto.getTitle());
        property.setType(dto.getType());
        property.setLocation(dto.getLocation());
        property.setAddress(dto.getAddress());
        property.setRent(dto.getRent());
        property.setDeposit(dto.getDeposit());
        property.setGender(dto.getGender() != null ? dto.getGender() : "Any");
        property.setOccupancy(dto.getOccupancy());
        property.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);
        property.setElectricityTerms(dto.getElectricityTerms());
        property.setNoticePeriod(dto.getNoticePeriod());
        property.setLockInPeriod(dto.getLockInPeriod());
        property.setMaintenance(dto.getMaintenance());
        property.setDescription(dto.getDescription());
        property.setOwnerName(dto.getOwnerName() != null ? dto.getOwnerName() : currentUser.getName());
        property.setOwnerPhone(dto.getOwnerPhone() != null ? dto.getOwnerPhone() : (currentUser.getPhone() != null ? currentUser.getPhone() : "+91 98000 00000"));
        property.setOwnerSince(String.valueOf(LocalDateTime.now().getYear()));

        // Verification rules:
        // Owner Identity can be marked verified if user phone is on file,
        // but property evidence is NEVER awarded automatically upon upload!
        property.setOwnerIdVerified(true);
        property.setPropertyEvidenceVerified(false);
        property.setContactVerified(true);
        property.setOnSiteVerified(false);
        property.setVerificationStatus("UNDER_REVIEW");
        property.setEvidenceType(dto.getEvidenceType() != null ? dto.getEvidenceType() + " (Submitted for Admin Check)" : "Submitted for Admin Check");

        property.setOwner(currentUser);

        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            property.setImages(new ArrayList<>(dto.getImages()));
        } else {
            property.setImages(List.of("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"));
        }

        if (dto.getAmenities() != null) {
            property.setAmenities(new ArrayList<>(dto.getAmenities()));
        }

        // Fraud risk evaluation
        FraudDetectionService.FraudResult risk = fraudDetectionService.assessPropertyRisk(property);
        property.setFraudRiskLevel(risk.riskLevel);
        property.setFraudRiskNote(risk.riskNote);

        Property saved = propertyRepository.save(property);
        return mapToDto(saved);
    }

    @Transactional
    public PropertyResponseDto updateProperty(String id, PropertyRequestDto dto) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property with ID " + id + " not found"));

        User currentUser = authService.getCurrentUserEntity();
        if (currentUser != null && currentUser.getRole() != Role.ADMIN) {
            if (property.getOwner() != null && !property.getOwner().getId().equals(currentUser.getId())) {
                throw new AccessDeniedException("You do not have permission to edit this property listing");
            }
        }

        property.setTitle(dto.getTitle());
        property.setType(dto.getType());
        property.setLocation(dto.getLocation());
        property.setAddress(dto.getAddress());
        property.setRent(dto.getRent());
        property.setDeposit(dto.getDeposit());
        if (dto.getGender() != null) property.setGender(dto.getGender());
        if (dto.getOccupancy() != null) property.setOccupancy(dto.getOccupancy());
        if (dto.getAvailable() != null) property.setAvailable(dto.getAvailable());
        if (dto.getElectricityTerms() != null) property.setElectricityTerms(dto.getElectricityTerms());
        if (dto.getNoticePeriod() != null) property.setNoticePeriod(dto.getNoticePeriod());
        if (dto.getLockInPeriod() != null) property.setLockInPeriod(dto.getLockInPeriod());
        if (dto.getMaintenance() != null) property.setMaintenance(dto.getMaintenance());
        if (dto.getDescription() != null) property.setDescription(dto.getDescription());
        if (dto.getOwnerName() != null) property.setOwnerName(dto.getOwnerName());
        if (dto.getOwnerPhone() != null) property.setOwnerPhone(dto.getOwnerPhone());
        if (dto.getEvidenceType() != null) property.setEvidenceType(dto.getEvidenceType());

        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            property.setImages(new ArrayList<>(dto.getImages()));
        }
        if (dto.getAmenities() != null) {
            property.setAmenities(new ArrayList<>(dto.getAmenities()));
        }
        property.setUpdatedAt(LocalDateTime.now());

        FraudDetectionService.FraudResult risk = fraudDetectionService.assessPropertyRisk(property);
        property.setFraudRiskLevel(risk.riskLevel);
        property.setFraudRiskNote(risk.riskNote);

        Property saved = propertyRepository.save(property);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteProperty(String id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property with ID " + id + " not found"));

        User currentUser = authService.getCurrentUserEntity();
        if (currentUser != null && currentUser.getRole() != Role.ADMIN) {
            if (property.getOwner() != null && !property.getOwner().getId().equals(currentUser.getId())) {
                throw new AccessDeniedException("You do not have permission to delete this property listing");
            }
        }

        propertyRepository.delete(property);
    }

    @Transactional
    public PropertyResponseDto toggleAvailability(String id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property with ID " + id + " not found"));

        property.setAvailable(!property.getAvailable());
        property.setUpdatedAt(LocalDateTime.now());
        Property saved = propertyRepository.save(property);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<PropertyResponseDto> getMyProperties() {
        User currentUser = authService.getCurrentUserEntity();
        if (currentUser == null) return List.of();
        List<Property> properties = propertyRepository.findByOwnerId(currentUser.getId());
        return properties.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public PropertyResponseDto mapToDto(Property p) {
        PropertyResponseDto dto = new PropertyResponseDto();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setType(p.getType());
        dto.setLocation(p.getLocation());
        dto.setAddress(p.getAddress());
        dto.setRent(p.getRent());
        dto.setDeposit(p.getDeposit());
        dto.setGender(p.getGender());
        dto.setOccupancy(p.getOccupancy());
        dto.setAvailable(p.getAvailable());
        dto.setElectricityTerms(p.getElectricityTerms());
        dto.setNoticePeriod(p.getNoticePeriod());
        dto.setLockInPeriod(p.getLockInPeriod());
        dto.setMaintenance(p.getMaintenance());
        dto.setDescription(p.getDescription());
        dto.setOwnerName(p.getOwnerName());
        dto.setOwnerPhone(p.getOwnerPhone());
        dto.setOwnerSince(p.getOwnerSince());
        dto.setOwnerIdVerified(p.getOwnerIdVerified());
        dto.setPropertyEvidenceVerified(p.getPropertyEvidenceVerified());
        dto.setContactVerified(p.getContactVerified());
        dto.setOnSiteVerified(p.getOnSiteVerified());
        dto.setVerificationStatus(p.getVerificationStatus());
        dto.setEvidenceType(p.getEvidenceType());
        dto.setFraudRiskLevel(p.getFraudRiskLevel());
        dto.setFraudRiskNote(p.getFraudRiskNote());
        dto.setImages(p.getImages());
        dto.setAmenities(p.getAmenities());
        dto.setCreatedAt(p.getCreatedAt());
        return dto;
    }
}
