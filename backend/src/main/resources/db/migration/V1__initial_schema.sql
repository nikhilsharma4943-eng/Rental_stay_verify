-- V1__initial_schema.sql: Initial StayVerify Schema

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    rent NUMERIC(12, 2) NOT NULL,
    deposit NUMERIC(12, 2) NOT NULL,
    gender VARCHAR(30) NOT NULL DEFAULT 'Any',
    occupancy VARCHAR(100),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    electricity_terms VARCHAR(255),
    notice_period VARCHAR(100),
    lock_in_period VARCHAR(100),
    maintenance VARCHAR(200),
    description TEXT,
    owner_name VARCHAR(150) NOT NULL,
    owner_phone VARCHAR(30) NOT NULL,
    owner_since VARCHAR(10),
    owner_id_verified BOOLEAN NOT NULL DEFAULT FALSE,
    property_evidence_verified BOOLEAN NOT NULL DEFAULT FALSE,
    contact_verified BOOLEAN NOT NULL DEFAULT FALSE,
    on_site_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'UNDER_REVIEW',
    evidence_type VARCHAR(255),
    fraud_risk_level VARCHAR(30) DEFAULT 'LOW',
    fraud_risk_note VARCHAR(255),
    owner_id VARCHAR(36),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_property_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS property_images (
    id BIGSERIAL PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    CONSTRAINT fk_image_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS property_amenities (
    property_id VARCHAR(36) NOT NULL,
    amenity VARCHAR(100) NOT NULL,
    PRIMARY KEY (property_id, amenity),
    CONSTRAINT fk_amenity_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification_records (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL,
    owner_id VARCHAR(36) NOT NULL,
    verification_type VARCHAR(50) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_path VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'UNDER_REVIEW',
    reviewer_notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_verif_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    CONSTRAINT fk_verif_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS visit_requests (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL,
    visitor_id VARCHAR(36),
    visitor_name VARCHAR(150) NOT NULL,
    visitor_phone VARCHAR(30) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_slot VARCHAR(100) NOT NULL,
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_visit_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS listing_reports (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL,
    reporter_id VARCHAR(36),
    reporter_email VARCHAR(150),
    reason VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_report_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
