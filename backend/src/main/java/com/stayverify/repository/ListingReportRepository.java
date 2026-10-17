package com.stayverify.repository;

import com.stayverify.entity.ListingReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingReportRepository extends JpaRepository<ListingReport, String> {
    List<ListingReport> findByPropertyId(String propertyId);
    List<ListingReport> findByStatus(String status);
}
