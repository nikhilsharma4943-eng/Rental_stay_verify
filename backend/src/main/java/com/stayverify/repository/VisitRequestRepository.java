package com.stayverify.repository;

import com.stayverify.entity.VisitRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitRequestRepository extends JpaRepository<VisitRequest, String> {
    List<VisitRequest> findByVisitorId(String visitorId);
    List<VisitRequest> findByPropertyId(String propertyId);
}
