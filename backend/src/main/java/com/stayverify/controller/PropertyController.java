package com.stayverify.controller;

import com.stayverify.dto.PropertyRequestDto;
import com.stayverify.dto.PropertyResponseDto;
import com.stayverify.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponseDto>> searchProperties(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) BigDecimal minRent,
            @RequestParam(required = false) BigDecimal maxRent,
            @RequestParam(required = false) Boolean verifiedOnly,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Boolean availableOnly
    ) {
        return ResponseEntity.ok(propertyService.searchProperties(
                location, type, minRent, maxRent, verifiedOnly, gender, availableOnly
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponseDto> getPropertyById(@PathVariable String id) {
        return ResponseEntity.ok(propertyService.getPropertyById(id));
    }

    @PostMapping
    public ResponseEntity<PropertyResponseDto> createProperty(@Valid @RequestBody PropertyRequestDto dto) {
        return new ResponseEntity<>(propertyService.createProperty(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyResponseDto> updateProperty(
            @PathVariable String id,
            @Valid @RequestBody PropertyRequestDto dto
    ) {
        return ResponseEntity.ok(propertyService.updateProperty(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable String id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle-availability")
    public ResponseEntity<PropertyResponseDto> toggleAvailability(@PathVariable String id) {
        return ResponseEntity.ok(propertyService.toggleAvailability(id));
    }

    @GetMapping("/my-listings")
    public ResponseEntity<List<PropertyResponseDto>> getMyProperties() {
        return ResponseEntity.ok(propertyService.getMyProperties());
    }
}
