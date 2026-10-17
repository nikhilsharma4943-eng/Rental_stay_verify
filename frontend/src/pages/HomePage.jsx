import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, AlertTriangle } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';

export function HomePage() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchLocation, setSearchLocation] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [maxRent, setMaxRent] = useState('');

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await propertyService.getProperties();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation.trim()) params.set('location', searchLocation.trim());
    if (filterType !== 'All') params.set('type', filterType);
    if (maxRent) params.set('maxRent', maxRent);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="sv-hero">
        <div className="sv-container sv-hero-content">
          <div className="sv-trust-pill">
            <ShieldCheck size={16} /> Student & Working Professional Rental Platform
          </div>
          <h1 className="sv-hero-title">Find Your Stay. Verify Before You Trust.</h1>
          <p className="sv-hero-desc">
            Discover PGs, hostels, rooms, and flats with transparent monthly rent, clear security deposits, 
            and administrator-reviewed owner & property verification.
          </p>

          {/* Hero Search Bar */}
          <form className="sv-search-box" onSubmit={handleHeroSearch}>
            <div className="sv-field-group">
              <label className="sv-label">Location / College / Area</label>
              <input
                type="text"
                className="sv-input"
                placeholder="e.g. North Campus, Koramangala, Kothrud..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>

            <div className="sv-field-group">
              <label className="sv-label">Property Type</label>
              <select
                className="sv-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="PG">PG (Paying Guest)</option>
                <option value="Hostel">Hostel</option>
                <option value="Room">Independent Room</option>
                <option value="Flat">Shared / Full Flat</option>
              </select>
            </div>

            <div className="sv-field-group">
              <label className="sv-label">Max Monthly Budget</label>
              <select
                className="sv-select"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
              >
                <option value="">Any Budget</option>
                <option value="8000">Up to ₹8,000 / mo</option>
                <option value="12000">Up to ₹12,000 / mo</option>
                <option value="18000">Up to ₹18,000 / mo</option>
                <option value="25000">Up to ₹25,000 / mo</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                type="submit"
                className="sv-btn sv-btn-primary sv-btn-lg sv-btn-full"
              >
                <Search size={17} /> Search Properties
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="sv-section">
        <div className="sv-container">
          <div className="sv-section-header">
            <div>
              <h2 className="sv-section-title">Featured Verified Accommodations</h2>
              <p className="sv-section-subtitle">
                Clear rent and deposit terms with owner identity and utility bill verification badges.
              </p>
            </div>
            <button
              type="button"
              className="sv-btn sv-btn-outline"
              onClick={() => navigate('/properties')}
            >
              View All Listings ({properties.length})
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span className="sv-loading-spinner"></span>
              <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Loading verified listings...</p>
            </div>
          ) : (
            <div className="sv-grid-3">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works in 3 Steps */}
      <section className="sv-section sv-section-grey">
        <div className="sv-container">
          <div className="sv-section-header">
            <div>
              <h2 className="sv-section-title">How StayVerify Works</h2>
              <p className="sv-section-subtitle">
                Three straightforward steps to find safe accommodation without middleman confusion.
              </p>
            </div>
          </div>

          <div className="sv-grid-3">
            <div className="sv-step-card">
              <div className="sv-step-num">1</div>
              <h3 className="sv-step-title">1. Search by Need & Budget</h3>
              <p className="sv-step-text">
                Filter PGs, hostels, rooms, and flats near your university or workplace. Compare exact monthly rent, security deposit, and notice periods upfront.
              </p>
            </div>

            <div className="sv-step-card">
              <div className="sv-step-num">2</div>
              <h3 className="sv-step-title">2. Check Verification</h3>
              <p className="sv-step-text">
                Look for the "Owner ID Verified" and "Property Evidence Reviewed" badges. We review utility bills and ownership deeds so fake listings are kept out.
              </p>
            </div>

            <div className="sv-step-card">
              <div className="sv-step-num">3</div>
              <h3 className="sv-step-title">3. Contact Owner & Visit</h3>
              <p className="sv-step-text">
                Connect directly with the verified property owner or schedule a visit to inspect the room in person before making any deposit payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Rental Safety Notice Section */}
      <section className="sv-section">
        <div className="sv-container">
          <div className="sv-safety-box">
            <AlertTriangle size={28} className="sv-safety-icon" />
            <div>
              <h3 className="sv-safety-title">Student Rental Safety Advisory: Verify Before You Pay</h3>
              <ul className="sv-safety-list">
                <li>
                  Always check that both <strong>Owner ID</strong> and <strong>Property Ownership Evidence</strong> badges are marked Verified on the listing page.
                </li>
                <li>
                  <strong>Never pay a "visiting card fee" or "gate pass charge"</strong> just to view a property. Genuine owners on StayVerify never charge for property visits.
                </li>
                <li>
                  Review the monthly rent, security deposit refund rules, electricity unit rates, and notice period clearly before transferring any token money.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
