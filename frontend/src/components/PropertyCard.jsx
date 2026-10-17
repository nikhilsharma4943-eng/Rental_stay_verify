import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShieldAlert } from 'lucide-react';
import { VerificationBadge } from './VerificationBadge';

export function PropertyCard({ property }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const isOwnerIdVerified = property.ownerIdVerified === true;
  const isEvidenceVerified = property.propertyEvidenceVerified === true;
  const isFullyVerified = isOwnerIdVerified && isEvidenceVerified;

  const defaultImage = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80';
  const displayImage = (property.images && property.images.length > 0) ? property.images[0] : defaultImage;

  return (
    <div className="sv-card sv-property-card" onClick={handleCardClick}>
      <div className="sv-card-img-wrap">
        <img 
          src={displayImage} 
          alt={property.title} 
          className="sv-card-img"
          loading="lazy"
          onError={(e) => { e.target.src = defaultImage; }}
        />
        <span className="sv-type-tag">{property.type}</span>
        {!property.available && (
          <span className="sv-soldout-tag">Currently Full</span>
        )}
        {property.fraudRiskLevel === 'HIGH' && (
          <span className="sv-fraud-tag">
            <ShieldAlert size={12} /> High Price Discrepancy
          </span>
        )}
      </div>

      <div className="sv-card-body">
        {/* Verification Badges Row */}
        <div className="sv-badge-row">
          {isFullyVerified ? (
            <>
              <VerificationBadge type="ownerId" status="VERIFIED" />
              <VerificationBadge type="propertyEvidence" status="VERIFIED" />
              {property.onSiteVerified && (
                <VerificationBadge type="onSite" status="VERIFIED" />
              )}
            </>
          ) : isOwnerIdVerified ? (
            <>
              <VerificationBadge type="ownerId" status="VERIFIED" />
              <VerificationBadge type="propertyEvidence" status="UNDER_REVIEW" />
            </>
          ) : (
            <VerificationBadge type="propertyEvidence" status="UNDER_REVIEW" label="Evidence Under Review" />
          )}
        </div>

        <h3 className="sv-card-title">{property.title}</h3>
        
        <p className="sv-card-location">
          <MapPin size={14} className="sv-icon-muted" />
          <span>{property.location}</span>
          <span className="sv-dot">•</span>
          <span>{property.gender === 'Any' ? 'Co-ed / Any' : `${property.gender} Only`}</span>
        </p>

        {/* Rent & Deposit Box */}
        <div className="sv-price-box">
          <div>
            <span className="sv-price-label">Monthly Rent</span>
            <div className="sv-price-value">
              ₹{Number(property.rent).toLocaleString('en-IN')}
              <span className="sv-price-unit">/mo</span>
            </div>
          </div>
          <div className="sv-price-divider"></div>
          <div>
            <span className="sv-price-label">Security Deposit</span>
            <div className="sv-deposit-value">
              ₹{Number(property.deposit).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Key Amenities Preview */}
        <div className="sv-amenities-preview">
          {(property.amenities || []).slice(0, 3).map((item, idx) => (
            <span key={idx} className="sv-amenity-pill">{item}</span>
          ))}
          {(property.amenities || []).length > 3 && (
            <span className="sv-amenity-more">+{property.amenities.length - 3} more</span>
          )}
        </div>

        <button 
          type="button"
          className="sv-btn sv-btn-outline sv-btn-full"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          View Details & Verification
        </button>
      </div>
    </div>
  );
}
