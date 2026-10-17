package com.stayverify.controller;

import com.stayverify.dto.VisitRequestDto;
import com.stayverify.entity.VisitRequest;
import com.stayverify.service.VisitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @PostMapping
    public ResponseEntity<VisitRequest> requestVisit(@Valid @RequestBody VisitRequestDto dto) {
        return new ResponseEntity<>(visitService.requestVisit(dto), HttpStatus.CREATED);
    }

    @GetMapping("/my-visits")
    public ResponseEntity<List<VisitRequest>> getMyVisits() {
        return ResponseEntity.ok(visitService.getMyVisits());
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<VisitRequest>> getPropertyVisits(@PathVariable String propertyId) {
        return ResponseEntity.ok(visitService.getPropertyVisits(propertyId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<VisitRequest> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body
    ) {
        String status = body.getOrDefault("status", "CONFIRMED");
        return ResponseEntity.ok(visitService.updateStatus(id, status));
    }
}
