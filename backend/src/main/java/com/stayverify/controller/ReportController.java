package com.stayverify.controller;

import com.stayverify.dto.ListingReportDto;
import com.stayverify.entity.ListingReport;
import com.stayverify.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<ListingReport> submitReport(@Valid @RequestBody ListingReportDto dto) {
        return new ResponseEntity<>(reportService.submitReport(dto), HttpStatus.CREATED);
    }
}
