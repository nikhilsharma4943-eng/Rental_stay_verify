package com.stayverify.config;

import com.stayverify.entity.*;
import com.stayverify.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final VerificationRecordRepository verificationRecordRepository;
    private final ListingReportRepository listingReportRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default-email:admin@stayverify.com}")
    private String adminEmail;

    @Value("${admin.default-password:AdminPassword@123}")
    private String adminPassword;

    @Value("${admin.default-name:StayVerify Administrator}")
    private String adminName;

    public DataInitializer(UserRepository userRepository,
                           PropertyRepository propertyRepository,
                           VerificationRecordRepository verificationRecordRepository,
                           ListingReportRepository listingReportRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.verificationRecordRepository = verificationRecordRepository;
        this.listingReportRepository = listingReportRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Seed Admin User
        User adminUser = userRepository.findByEmail(adminEmail).orElseGet(() -> {
            User admin = new User(
                    "usr-admin-01",
                    adminName,
                    adminEmail,
                    passwordEncoder.encode(adminPassword),
                    Role.ADMIN,
                    "+91 99999 00000"
            );
            return userRepository.save(admin);
        });

        // 2. Seed Default Owner User
        User ownerUser = userRepository.findByEmail("rajesh.sharma@example.com").orElseGet(() -> {
            User owner = new User(
                    "usr-owner-01",
                    "Rajesh Sharma",
                    "rajesh.sharma@example.com",
                    passwordEncoder.encode("Password@123"),
                    Role.OWNER,
                    "+91 98112 34567"
            );
            return userRepository.save(owner);
        });

        // 3. Seed Default Tenant User
        userRepository.findByEmail("aarav.gupta@example.com").orElseGet(() -> {
            User tenant = new User(
                    "usr-tenant-01",
                    "Aarav Gupta",
                    "aarav.gupta@example.com",
                    passwordEncoder.encode("Password@123"),
                    Role.TENANT,
                    "+91 98765 43210"
            );
            return userRepository.save(tenant);
        });

        // 4. Seed Properties from Reference Prototype if none exist
        if (propertyRepository.count() == 0) {
            seedProperties(ownerUser);
        }
    }

    private void seedProperties(User owner) {
        // Prop 101: Sunrise Student PG
        Property p1 = new Property();
        p1.setId("prop-101");
        p1.setTitle("Sunrise Student PG & Residency");
        p1.setType("PG");
        p1.setLocation("North Campus, Delhi");
        p1.setAddress("House 42, Block B, Vijay Nagar, Near Delhi University North Campus");
        p1.setRent(new BigDecimal("8500"));
        p1.setDeposit(new BigDecimal("8500"));
        p1.setGender("Boys");
        p1.setOccupancy("Double Sharing");
        p1.setAvailable(true);
        p1.setAmenities(Arrays.asList("Wi-Fi", "Food / Mess", "Power Backup", "RO Water", "Laundry", "CCTV"));
        p1.setElectricityTerms("Included up to 100 units/month, then ₹8/unit");
        p1.setNoticePeriod("1 Month");
        p1.setLockInPeriod("3 Months");
        p1.setMaintenance("₹0 (Included in rent)");
        p1.setOwnerName("Rajesh Sharma");
        p1.setOwnerPhone("+91 98112 34567");
        p1.setOwnerSince("2023");
        p1.setOwnerIdVerified(true);
        p1.setPropertyEvidenceVerified(true);
        p1.setContactVerified(true);
        p1.setOnSiteVerified(false);
        p1.setVerificationStatus("VERIFIED");
        p1.setEvidenceType("Electricity Bill & Municipal Tax Receipt");
        p1.setDescription("Clean, quiet, and student-friendly PG located within 500m of main college gates. Home-cooked meals served 3 times a day. No hidden brokerage or registration charges.");
        p1.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80"
        ));
        p1.setFraudRiskLevel("LOW");
        p1.setFraudRiskNote("Normal market pricing; owner ID & property ownership verified.");
        p1.setOwner(owner);
        propertyRepository.save(p1);

        // Prop 102: GreenView Working Women Hostel
        Property p2 = new Property();
        p2.setId("prop-102");
        p2.setTitle("GreenView Working Women Hostel");
        p2.setType("Hostel");
        p2.setLocation("Koramangala, Bengaluru");
        p2.setAddress("14th Main, 4th Block, Koramangala, Near Sony World Signal");
        p2.setRent(new BigDecimal("11000"));
        p2.setDeposit(new BigDecimal("20000"));
        p2.setGender("Girls");
        p2.setOccupancy("Single & Double");
        p2.setAvailable(true);
        p2.setAmenities(Arrays.asList("Wi-Fi", "AC", "Food / Mess", "Attached Washroom", "24x7 Security", "Power Backup"));
        p2.setElectricityTerms("Actuals as per sub-meter (₹7.5/unit)");
        p2.setNoticePeriod("1 Month");
        p2.setLockInPeriod("1 Month");
        p2.setMaintenance("₹0 (Included in rent)");
        p2.setOwnerName("Anita Nair");
        p2.setOwnerPhone("+91 98450 11223");
        p2.setOwnerSince("2022");
        p2.setOwnerIdVerified(true);
        p2.setPropertyEvidenceVerified(true);
        p2.setContactVerified(true);
        p2.setOnSiteVerified(true);
        p2.setVerificationStatus("VERIFIED");
        p2.setEvidenceType("Registered Sale Deed & BESCOM Utility Bill");
        p2.setDescription("Safe and well-maintained hostel designed for female students and IT professionals. Biometric entry, warden on premises, and hygienic kitchen facilities.");
        p2.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1540518614846-7ede433c457?auto=format&fit=crop&w=900&q=80"
        ));
        p2.setFraudRiskLevel("LOW");
        p2.setFraudRiskNote("On-site inspected; physical documents checked.");
        p2.setOwner(owner);
        propertyRepository.save(p2);

        // Prop 103: Independent Single Room
        Property p3 = new Property();
        p3.setId("prop-103");
        p3.setTitle("Independent Single Room with Kitchenette");
        p3.setType("Room");
        p3.setLocation("Kothrud, Pune");
        p3.setAddress("Lane 3, Dahanukar Colony, Kothrud, Near MIT College");
        p3.setRent(new BigDecimal("7000"));
        p3.setDeposit(new BigDecimal("14000"));
        p3.setGender("Any");
        p3.setOccupancy("Single Occupancy");
        p3.setAvailable(true);
        p3.setAmenities(Arrays.asList("Wi-Fi", "Attached Washroom", "Geyser", "Two-Wheeler Parking"));
        p3.setElectricityTerms("Separate meter (State board residential rates)");
        p3.setNoticePeriod("1 Month");
        p3.setLockInPeriod("None");
        p3.setMaintenance("₹300 / month for common area cleaning");
        p3.setOwnerName("Vikram Kulkarni");
        p3.setOwnerPhone("+91 97654 88990");
        p3.setOwnerSince("2024");
        p3.setOwnerIdVerified(true);
        p3.setPropertyEvidenceVerified(true);
        p3.setContactVerified(true);
        p3.setOnSiteVerified(false);
        p3.setVerificationStatus("VERIFIED");
        p3.setEvidenceType("Property Index II & Electricity Bill");
        p3.setDescription("Peaceful independent room on the first floor of a residential bungalow. Ideal for students preparing for competitive exams or working individuals who prefer privacy.");
        p3.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
        ));
        p3.setFraudRiskLevel("LOW");
        p3.setFraudRiskNote("Authentic local property records confirmed.");
        p3.setOwner(owner);
        propertyRepository.save(p3);

        // Prop 104: 2 BHK Semi-Furnished Student Flat
        Property p4 = new Property();
        p4.setId("prop-104");
        p4.setTitle("2 BHK Semi-Furnished Student Flat");
        p4.setType("Flat");
        p4.setLocation("Sector 62, Noida");
        p4.setAddress("Flat 304, Tower C, Rajat Vihar, Sector 62, Noida");
        p4.setRent(new BigDecimal("18000"));
        p4.setDeposit(new BigDecimal("36000"));
        p4.setGender("Any");
        p4.setOccupancy("Up to 3 Students / Working Professionals");
        p4.setAvailable(true);
        p4.setAmenities(Arrays.asList("AC", "Modular Kitchen", "Power Backup", "Attached Washroom", "Parking", "Lift"));
        p4.setElectricityTerms("Prepaid society meter as per consumption");
        p4.setNoticePeriod("2 Months");
        p4.setLockInPeriod("6 Months");
        p4.setMaintenance("₹1,200 / month (Paid directly to society office)");
        p4.setOwnerName("Suresh Verma");
        p4.setOwnerPhone("+91 99100 55443");
        p4.setOwnerSince("2025");
        p4.setOwnerIdVerified(true);
        p4.setPropertyEvidenceVerified(true);
        p4.setContactVerified(true);
        p4.setOnSiteVerified(false);
        p4.setVerificationStatus("VERIFIED");
        p4.setEvidenceType("Allotment Letter & Society NOC");
        p4.setDescription("Spacious 2 BHK apartment walking distance from metro station, engineering colleges, and IT parks. Wardrobes, beds, geysers, and fans are already installed.");
        p4.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80"
        ));
        p4.setFraudRiskLevel("LOW");
        p4.setFraudRiskNote("Direct society allotment verified.");
        p4.setOwner(owner);
        propertyRepository.save(p4);

        // Prop 105: Scholar Nest Co-ed PG (Under Review example)
        Property p5 = new Property();
        p5.setId("prop-105");
        p5.setTitle("Scholar Nest Co-ed PG");
        p5.setType("PG");
        p5.setLocation("Viman Nagar, Pune");
        p5.setAddress("Plot 19, Sakore Nagar, Viman Nagar, Pune");
        p5.setRent(new BigDecimal("9500"));
        p5.setDeposit(new BigDecimal("9500"));
        p5.setGender("Any");
        p5.setOccupancy("Double Sharing");
        p5.setAvailable(true);
        p5.setAmenities(Arrays.asList("Wi-Fi", "Laundry", "Power Backup", "Attached Washroom"));
        p5.setElectricityTerms("Included in monthly rent");
        p5.setNoticePeriod("1 Month");
        p5.setLockInPeriod("1 Month");
        p5.setMaintenance("₹0");
        p5.setOwnerName("Deepak Deshmukh");
        p5.setOwnerPhone("+91 98220 77665");
        p5.setOwnerSince("2026");
        p5.setOwnerIdVerified(true);
        p5.setPropertyEvidenceVerified(false);
        p5.setContactVerified(true);
        p5.setOnSiteVerified(false);
        p5.setVerificationStatus("UNDER_REVIEW");
        p5.setEvidenceType("Owner ID Verified; Utility Bill under review");
        p5.setDescription("Newly renovated PG near college campus. Owner identity has been verified; property utility bill is currently undergoing routine administrator verification.");
        p5.setImages(List.of("https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80"));
        p5.setFraudRiskLevel("MODERATE");
        p5.setFraudRiskNote("Utility bill pending administrator review before full badge issue.");
        p5.setOwner(owner);
        propertyRepository.save(p5);

        // Prop 106: Metro View 1 BHK Compact Flat (Sold out example)
        Property p6 = new Property();
        p6.setId("prop-106");
        p6.setTitle("Metro View 1 BHK Compact Flat");
        p6.setType("Flat");
        p6.setLocation("Andheri East, Mumbai");
        p6.setAddress("B-12, Shanti Niketan Society, Chakala, Andheri East");
        p6.setRent(new BigDecimal("22000"));
        p6.setDeposit(new BigDecimal("50000"));
        p6.setGender("Any");
        p6.setOccupancy("Up to 2 Occupants");
        p6.setAvailable(false);
        p6.setAmenities(Arrays.asList("Wi-Fi", "AC", "Attached Washroom", "24x7 Security"));
        p6.setElectricityTerms("As per monthly Adani electricity bill");
        p6.setNoticePeriod("1 Month");
        p6.setLockInPeriod("6 Months");
        p6.setMaintenance("Included in rent");
        p6.setOwnerName("Mehul Parekh");
        p6.setOwnerPhone("+91 98201 33445");
        p6.setOwnerSince("2023");
        p6.setOwnerIdVerified(true);
        p6.setPropertyEvidenceVerified(true);
        p6.setContactVerified(true);
        p6.setOnSiteVerified(false);
        p6.setVerificationStatus("VERIFIED");
        p6.setEvidenceType("Society Share Certificate & Electricity Bill");
        p6.setDescription("Well-ventilated 1 BHK just 5 minutes walk from Chakala Metro Station. Direct owner listing with zero brokerage.");
        p6.setImages(List.of("https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80"));
        p6.setFraudRiskLevel("LOW");
        p6.setFraudRiskNote("Verified ownership certificate.");
        p6.setOwner(owner);
        propertyRepository.save(p6);

        // Seed demo verification request for prop-105
        VerificationRecord v1 = new VerificationRecord();
        v1.setId("ver-001");
        v1.setProperty(p5);
        v1.setOwner(owner);
        v1.setVerificationType("PROPERTY_EVIDENCE");
        v1.setDocumentType("Electricity Bill (MSEDCL Oct 2026)");
        v1.setDocumentPath("secure_storage/msedcl_viman_nagar.pdf");
        v1.setStatus("UNDER_REVIEW");
        v1.setReviewerNotes("Submitted for ownership address validation.");
        verificationRecordRepository.save(v1);

        // Seed demo scam report for admin queue
        ListingReport rep1 = new ListingReport();
        rep1.setId("rep-001");
        rep1.setProperty(p5);
        rep1.setReporterEmail("student.rahul@example.com");
        rep1.setReason("VISITING_FEE_DEMANDED");
        rep1.setDescription("Caretaker requested ₹300 via UPI for a gate pass before showing the room.");
        rep1.setStatus("PENDING");
        listingReportRepository.save(rep1);
    }
}
