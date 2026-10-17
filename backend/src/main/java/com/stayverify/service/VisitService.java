package com.stayverify.service;

import com.stayverify.dto.VisitRequestDto;
import com.stayverify.entity.Property;
import com.stayverify.entity.User;
import com.stayverify.entity.VisitRequest;
import com.stayverify.exception.ResourceNotFoundException;
import com.stayverify.repository.PropertyRepository;
import com.stayverify.repository.VisitRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class VisitService {

    private final VisitRequestRepository visitRequestRepository;
    private final PropertyRepository propertyRepository;
    private final AuthService authService;

    public VisitService(VisitRequestRepository visitRequestRepository,
                        PropertyRepository propertyRepository,
                        AuthService authService) {
        this.visitRequestRepository = visitRequestRepository;
        this.propertyRepository = propertyRepository;
        this.authService = authService;
    }

    @Transactional
    public VisitRequest requestVisit(VisitRequestDto dto) {
        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found: " + dto.getPropertyId()));

        User currentUser = authService.getCurrentUserEntity();

        VisitRequest request = new VisitRequest();
        request.setId("vis-" + UUID.randomUUID().toString().substring(0, 8));
        request.setProperty(property);
        request.setVisitorId(currentUser != null ? currentUser.getId() : null);
        request.setVisitorName(dto.getVisitorName());
        request.setVisitorPhone(dto.getVisitorPhone());
        request.setPreferredDate(dto.getPreferredDate());
        request.setPreferredSlot(dto.getPreferredSlot());
        request.setNotes(dto.getNotes());
        request.setStatus("PENDING");

        return visitRequestRepository.save(request);
    }

    @Transactional(readOnly = true)
    public List<VisitRequest> getMyVisits() {
        User currentUser = authService.getCurrentUserEntity();
        if (currentUser == null) return List.of();
        return visitRequestRepository.findByVisitorId(currentUser.getId());
    }

    @Transactional(readOnly = true)
    public List<VisitRequest> getPropertyVisits(String propertyId) {
        return visitRequestRepository.findByPropertyId(propertyId);
    }

    @Transactional
    public VisitRequest updateStatus(String id, String status) {
        VisitRequest request = visitRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit request not found: " + id));
        request.setStatus(status);
        return visitRequestRepository.save(request);
    }
}
