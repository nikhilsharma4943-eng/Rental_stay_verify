package com.stayverify.service;

import com.stayverify.dto.VerificationReviewDto;
import com.stayverify.dto.VerificationSubmissionDto;
import com.stayverify.entity.Property;
import com.stayverify.entity.User;
import com.stayverify.entity.VerificationRecord;
import com.stayverify.exception.BadRequestException;
import com.stayverify.exception.ResourceNotFoundException;
import com.stayverify.repository.PropertyRepository;
import com.stayverify.repository.VerificationRecordRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class VerificationService {

    private final VerificationRecordRepository verificationRecordRepository;
    private final PropertyRepository propertyRepository;
    private final AuthService authService;

    public VerificationService(VerificationRecordRepository verificationRecordRepository,
                               PropertyRepository propertyRepository,
                               AuthService authService) {
        this.verificationRecordRepository = verificationRecordRepository;
        this.propertyRepository = propertyRepository;
        this.authService = authService;
    }

    @Transactional
    public VerificationRecord submitEvidence(VerificationSubmissionDto dto) {
        User currentUser = authService.getCurrentUserEntity();
        if (currentUser == null) {
            throw new AccessDeniedException("Authentication required to submit verification evidence");
        }

        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + dto.getPropertyId()));

        VerificationRecord record = new VerificationRecord();
        record.setId("ver-" + UUID.randomUUID().toString().substring(0, 8));
        record.setProperty(property);
        record.setOwner(currentUser);
        record.setVerificationType(dto.getVerificationType());
        record.setDocumentType(dto.getDocumentType());
        record.setDocumentPath(dto.getDocumentPath() != null ? dto.getDocumentPath() : "secure_storage/" + record.getId() + ".enc");
        record.setStatus("UNDER_REVIEW");
        record.setReviewerNotes("Submitted by owner for administrative evidence check.");

        // Update property review status
        property.setVerificationStatus("UNDER_REVIEW");
        property.setPropertyEvidenceVerified(false);
        property.setEvidenceType(dto.getDocumentType() + " (Under Admin Review)");
        propertyRepository.save(property);

        return verificationRecordRepository.save(record);
    }

    @Transactional(readOnly = true)
    public List<VerificationRecord> getMyVerificationRequests() {
        User currentUser = authService.getCurrentUserEntity();
        if (currentUser == null) return List.of();
        return verificationRecordRepository.findByOwnerId(currentUser.getId());
    }

    @Transactional(readOnly = true)
    public List<VerificationRecord> getAdminQueue() {
        return verificationRecordRepository.findAll();
    }

    @Transactional
    public VerificationRecord reviewEvidence(String id, VerificationReviewDto reviewDto) {
        VerificationRecord record = verificationRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Verification record not found: " + id));

        record.setStatus(reviewDto.getStatus());
        record.setReviewerNotes(reviewDto.getNotes());
        record.setReviewedAt(LocalDateTime.now());

        Property property = record.getProperty();
        if (property != null) {
            if ("VERIFIED".equalsIgnoreCase(reviewDto.getStatus())) {
                property.setOwnerIdVerified(true);
                property.setPropertyEvidenceVerified(true);
                property.setVerificationStatus("VERIFIED");
                property.setEvidenceType(record.getDocumentType() + " (Verified by Admin)");
            } else if ("REJECTED".equalsIgnoreCase(reviewDto.getStatus())) {
                property.setPropertyEvidenceVerified(false);
                property.setVerificationStatus("REJECTED");
            }
            propertyRepository.save(property);
        }

        return verificationRecordRepository.save(record);
    }
}
