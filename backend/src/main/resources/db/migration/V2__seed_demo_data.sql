-- V2__seed_demo_data.sql: Demonstration seed data for StayVerify platform

-- Insert demo admin (Password: AdminPassword@123)
INSERT INTO users (id, name, email, password_hash, role, phone, created_at)
VALUES (
    'usr-admin-01',
    'StayVerify Administrator',
    'admin@stayverify.com',
    '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',
    'ADMIN',
    '+91 99999 00000',
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Insert demo owner (Rajesh Sharma, Password: Password@123)
INSERT INTO users (id, name, email, password_hash, role, phone, created_at)
VALUES (
    'usr-owner-01',
    'Rajesh Sharma',
    'rajesh.sharma@example.com',
    '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',
    'OWNER',
    '+91 98112 34567',
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Insert demo student (Aarav Gupta, Password: Password@123)
INSERT INTO users (id, name, email, password_hash, role, phone, created_at)
VALUES (
    'usr-tenant-01',
    'Aarav Gupta',
    'aarav.gupta@example.com',
    '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',
    'TENANT',
    '+91 98765 43210',
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;
