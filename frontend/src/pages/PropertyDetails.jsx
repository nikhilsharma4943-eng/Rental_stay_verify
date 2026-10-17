import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ShieldCheck, CheckCircle2, UserCheck, FileCheck, Phone, Calendar, Flag, Lock, Clock, AlertTriangle } from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { ContactModal, VisitModal, ReportModal } from '../components/Modals';

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'visit' | 'report'

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      setError('');
      try {
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
        setActivePhotoIndex(0);
      } catch (err) {
        setError(err.message || 'Property listing not found.');
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <main className="sv-section">
        <div className="sv-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
          <span className="sv-loading-spinner"></span>
          <p style={{ marginTop: '14px', color: 'var(--text-muted)' }}>Loading verified property details...</p>
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="sv-section">
        <div className="sv-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Listing Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            {error || 'The property you are looking for does not exist or has been removed.'}
          </p>
          <button type="button" className="sv-btn sv-btn-primary" onClick={() => navigate('/properties')}>
            ← Back to Property Listings
          </button>
        </div>
      </main>
    );
  }

  const defaultImg = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80';
  const images = (property.images && property.images.length > 0) ? property.images : [defaultImg];
  const currentImage = images[activePhotoIndex] || images[0];

  const isOwnerIdVerified = property.ownerIdVerified === true;
  const isEvidenceVerified = property.propertyEvidenceVerified === true;

  return (
    <main className="sv-section">
      <div className="sv-container">
        <div style={{ marginBottom: '18px' }}>
          <button
            type="button"
            className="sv-btn sv-btn-outline"
            onClick={() => navigate('/properties')}
          >
            ← Back to Property Listings
          </button>
        </div>

        <div className="sv-details-grid">
          {/* LEFT COLUMN: Photos, Title, Breakdown, Facilities */}
          <div>
            <img
              src={currentImage}
              alt={property.title}
              className="sv-gallery-main"
              onError={(e) => { e.target.src = defaultImg; }}
            />
            {images.length > 1 && (
              <div className="sv-gallery-thumbs">
                {images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className={`sv-thumb ${activePhotoIndex === index ? 'active' : ''}`}
                    onClick={() => setActivePhotoIndex(index)}
                    onError={(e) => { e.target.src = defaultImg; }}
                  />
                ))}
              </div>
            )}

            {/* Title & Location Block */}
            <div className="sv-info-block">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <span className="sv-badge" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
                  {property.type}
                </span>
                <span className={`sv-badge ${property.available ? 'sv-badge-verified' : 'sv-badge-pending'}`}>
                  {property.available ? 'Available for Move-in' : 'Currently Full'}
                </span>
                <span className="sv-badge" style={{ background: 'var(--bg-grey-alt)', color: 'var(--text-dark)' }}>
                  {property.gender === 'Any' ? 'Co-ed / Any Gender' : `${property.gender} Only`}
                </span>
              </div>

              <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
                {property.title}
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} /> {property.address}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-dark)', marginTop: '14px', lineHeight: 1.6 }}>
                {property.description}
              </p>
            </div>

            {/* Transparent Rental Breakdown */}
            <div className="sv-info-block">
              <h2 className="sv-info-block-title">Transparent Rent & Terms Breakdown</h2>
              <div className="sv-terms-grid">
                <div className="sv-term-item">
                  <div className="sv-term-label">Monthly Rent</div>
                  <div className="sv-term-val" style={{ color: 'var(--accent-blue)', fontSize: '18px' }}>
                    ₹{Number(property.rent).toLocaleString('en-IN')} / month
                  </div>
                </div>
                <div className="sv-term-item">
                  <div className="sv-term-label">Security Deposit (Refundable)</div>
                  <div className="sv-term-val" style={{ fontSize: '18px' }}>
                    ₹{Number(property.deposit).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="sv-term-item">
                  <div className="sv-term-label">Room Type & Occupancy</div>
                  <div className="sv-term-val">{property.occupancy || 'Single / Double Sharing'}</div>
                </div>
                <div className="sv-term-item">
                  <div className="sv-term-label">Electricity Charges</div>
                  <div className="sv-term-val">{property.electricityTerms || 'As per meter reading'}</div>
                </div>
                <div className="sv-term-item">
                  <div className="sv-term-label">Minimum Lock-in Period</div>
                  <div className="sv-term-val">{property.lockInPeriod || 'None'}</div>
                </div>
                <div className="sv-term-item">
                  <div className="sv-term-label">Notice Period Before Leaving</div>
                  <div className="sv-term-val">{property.noticePeriod || '1 Month'}</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                <strong>Extra Maintenance / Hidden Charges:</strong> {property.maintenance || '₹0 (Included in rent)'}
              </p>
            </div>

            {/* Facilities & Amenities */}
            <div className="sv-info-block">
              <h2 className="sv-info-block-title">Available Facilities & Amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px' }}>
                {(property.amenities || []).map((amenity, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: 'var(--bg-grey)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px'
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--green-text)' }} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Owner Verification Card & Actions */}
          <div className="sv-verification-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldCheck size={22} style={{ color: 'var(--accent-blue)' }} />
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Verification & Owner Details</h2>
            </div>

            {/* Owner Details Box */}
            <div style={{ marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Listed By Property Owner</div>
              <div style={{ fontSize: '17px', fontWeight: 600, marginTop: '2px' }}>{property.ownerName}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Active on StayVerify since {property.ownerSince || '2025'}
              </div>
            </div>

            {/* Check 1: Owner Identity Status */}
            <div className="sv-verify-item">
              <UserCheck
                size={20}
                style={{
                  color: isOwnerIdVerified ? 'var(--green-text)' : 'var(--amber-text)',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>
                  Owner Identity Status:{' '}
                  <span style={{ color: isOwnerIdVerified ? 'var(--green-text)' : 'var(--amber-text)' }}>
                    {isOwnerIdVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Government photo ID matched with owner profile by administrator.
                </div>
              </div>
            </div>

            {/* Check 2: Property Evidence Review */}
            <div className="sv-verify-item">
              <FileCheck
                size={20}
                style={{
                  color: isEvidenceVerified ? 'var(--green-text)' : 'var(--amber-text)',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>
                  Property Evidence Review:{' '}
                  <span style={{ color: isEvidenceVerified ? 'var(--green-text)' : 'var(--amber-text)' }}>
                    {isEvidenceVerified ? 'Reviewed & Approved' : 'Under Admin Review'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Document Checked: <strong>{property.evidenceType || 'Electricity Bill & Ownership Deed'}</strong>
                </div>
              </div>
            </div>

            {/* Mandatory Privacy Note */}
            <div className="sv-privacy-note">
              <Lock size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                <strong>Privacy Protection:</strong> Private identity cards and ownership documents are strictly verified by platform administrators and are never displayed publicly.
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                className="sv-btn sv-btn-primary sv-btn-lg sv-btn-full"
                onClick={() => setActiveModal('contact')}
              >
                <Phone size={17} /> Contact Owner
              </button>

              <button
                type="button"
                className="sv-btn sv-btn-blue-outline sv-btn-lg sv-btn-full"
                onClick={() => setActiveModal('visit')}
              >
                <Calendar size={17} /> Request a Visit
              </button>

              <button
                type="button"
                className="sv-btn sv-btn-danger-outline sv-btn-full"
                style={{ marginTop: '6px' }}
                onClick={() => setActiveModal('report')}
              >
                <Flag size={15} /> Report Listing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modals */}
      {activeModal === 'contact' && (
        <ContactModal property={property} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'visit' && (
        <VisitModal property={property} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'report' && (
        <ReportModal property={property} onClose={() => setActiveModal(null)} />
      )}
    </main>
  );
}
