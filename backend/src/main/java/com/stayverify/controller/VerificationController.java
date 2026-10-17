package com.stayverify.controller;

import com.stayverify.dto.VerificationSubmissionDto;
import com.stayverify.entity.VerificationRecord;
import com.stayverify.service.VerificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/verifications")
public class VerificationController {

    private final VerificationService verificationService;

    public VerificationController(VerificationService verificationService) {
        this.verificationService = verificationService;
    }

    @PostMapping("/submit")
    public ResponseEntity<VerificationRecord> submitEvidence(@Valid @RequestBody VerificationSubmissionDto dto) {
        return new ResponseEntity<>(verificationService.submitEvidence(dto), HttpStatus.CREATED);
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<VerificationRecord>> getMyRequests() {
        return ResponseEntity.ok(verificationService.getMyVerificationRequests());
    }
}
