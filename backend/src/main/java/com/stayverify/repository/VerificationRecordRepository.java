package com.stayverify.repository;

import com.stayverify.entity.VerificationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerificationRecordRepository extends JpaRepository<VerificationRecord, String> {
    List<VerificationRecord> findByPropertyId(String propertyId);
    List<VerificationRecord> findByOwnerId(String ownerId);
    List<VerificationRecord> findByStatus(String status);
}
