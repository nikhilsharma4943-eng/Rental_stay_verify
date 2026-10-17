package com.stayverify.repository;

import com.stayverify.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String> {

    List<Property> findByOwnerId(String ownerId);

    @Query("SELECT p FROM Property p WHERE " +
           "(:location IS NULL OR LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%')) OR LOWER(p.title) LIKE LOWER(CONCAT('%', :location, '%')) OR LOWER(p.address) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:type IS NULL OR p.type = :type) AND " +
           "(:minRent IS NULL OR p.rent >= :minRent) AND " +
           "(:maxRent IS NULL OR p.rent <= :maxRent) AND " +
           "(:verifiedOnly IS NULL OR :verifiedOnly = false OR (p.ownerIdVerified = true AND p.propertyEvidenceVerified = true)) AND " +
           "(:gender IS NULL OR :gender = 'All' OR p.gender = 'Any' OR p.gender = :gender) AND " +
           "(:availableOnly IS NULL OR :availableOnly = false OR p.available = true) " +
           "ORDER BY p.createdAt DESC")
    List<Property> searchProperties(
            @Param("location") String location,
            @Param("type") String type,
            @Param("minRent") BigDecimal minRent,
            @Param("maxRent") BigDecimal maxRent,
            @Param("verifiedOnly") Boolean verifiedOnly,
            @Param("gender") String gender,
            @Param("availableOnly") Boolean availableOnly
    );
}
