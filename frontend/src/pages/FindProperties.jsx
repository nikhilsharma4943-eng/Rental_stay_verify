import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { ALL_AMENITIES } from '../data/mockProperties';

export function FindProperties() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state initialized from URL params if present
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '');
  const [filterType, setFilterType] = useState(searchParams.get('type') || 'All');
  const [minRent, setMinRent] = useState(searchParams.get('minRent') || '');
  const [maxRent, setMaxRent] = useState(searchParams.get('maxRent') || '');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verifiedOnly') === 'true');
  const [filterGender, setFilterGender] = useState('All');
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const data = await propertyService.getProperties({
          location: searchLocation,
          type: filterType,
          minRent,
          maxRent,
          verifiedOnly,
          gender: filterGender,
          availableOnly: filterAvailableOnly,
          sortBy
        });
        setProperties(data);
      } catch (err) {
        console.error('Error loading properties:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const toggleFilterAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setSearchLocation('');
    setFilterType('All');
    setMinRent('');
    setMaxRent('');
    setVerifiedOnly(false);
    setFilterGender('All');
    setFilterAvailableOnly(false);
    setSelectedAmenities([]);
    setSortBy('newest');
    setSearchParams({});
  };

  // Client-side filtering and sorting for instant responsiveness
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        if (searchLocation.trim() !== '') {
          const q = searchLocation.toLowerCase();
          const matchLoc = (prop.location || '').toLowerCase().includes(q);
          const matchTitle = (prop.title || '').toLowerCase().includes(q);
          const matchAddr = (prop.address || '').toLowerCase().includes(q);
          if (!matchLoc && !matchTitle && !matchAddr) return false;
        }
        if (filterType !== 'All' && prop.type !== filterType) return false;
        if (minRent !== '' && Number(prop.rent) < Number(minRent)) return false;
        if (maxRent !== '' && Number(prop.rent) > Number(maxRent)) return false;
        if (verifiedOnly && !(prop.ownerIdVerified && prop.propertyEvidenceVerified)) return false;
        if (filterGender !== 'All' && prop.gender !== 'Any' && prop.gender !== filterGender) return false;
        if (filterAvailableOnly && !prop.available) return false;
        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every((a) => (prop.amenities || []).includes(a));
          if (!hasAll) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rent-low') return Number(a.rent) - Number(b.rent);
        if (sortBy === 'rent-high') return Number(b.rent) - Number(a.rent);
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [
    properties,
    searchLocation,
    filterType,
    minRent,
    maxRent,
    verifiedOnly,
    filterGender,
    filterAvailableOnly,
    selectedAmenities,
    sortBy
  ]);

  return (
    <main className="sv-section">
      <div className="sv-container">
        <div className="sv-section-header">
          <div>
            <h1 className="sv-section-title">Find Verified Properties</h1>
            <p className="sv-section-subtitle">
              Browse student PGs, hostels, independent rooms, and shared flats with transparent pricing.
            </p>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="sv-filter-panel">
          <div className="sv-filter-grid">
            <div className="sv-field-group">
              <label className="sv-label">Search by Location or Landmark</label>
              <input
                type="text"
                className="sv-input"
                placeholder="City, locality, or college name..."
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
                <option value="All">All Types (PG, Hostel, Room, Flat)</option>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Room">Room</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="sv-field-group">
              <label className="sv-label">Min & Max Monthly Rent (₹)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <input
                  type="number"
                  className="sv-input"
                  placeholder="Min ₹"
                  value={minRent}
                  onChange={(e) => setMinRent(e.target.value)}
                />
                <input
                  type="number"
                  className="sv-input"
                  placeholder="Max ₹"
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                />
              </div>
            </div>

            <div className="sv-field-group">
              <label className="sv-label">Verification Status</label>
              <select
                className="sv-select"
                value={verifiedOnly ? 'verified' : 'all'}
                onChange={(e) => setVerifiedOnly(e.target.value === 'verified')}
              >
                <option value="all">All Listings</option>
                <option value="verified">Fully Verified Only</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                More Filters {showAdvancedFilters ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Collapsible Advanced Filters */}
          {showAdvancedFilters && (
            <div className="sv-filter-advanced">
              <div className="sv-field-group">
                <label className="sv-label">Gender Preference</label>
                <select
                  className="sv-select"
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                >
                  <option value="All">Any / Co-ed</option>
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                </select>
              </div>

              <div className="sv-field-group">
                <label className="sv-label">Required Amenities</label>
                <div className="sv-checkbox-row">
                  {ALL_AMENITIES.map((amenity) => (
                    <label key={amenity} className="sv-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleFilterAmenity(amenity)}
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>

              <div className="sv-field-group">
                <label className="sv-label">Availability</label>
                <div className="sv-checkbox-row">
                  <label className="sv-checkbox-label">
                    <input
                      type="checkbox"
                      checked={filterAvailableOnly}
                      onChange={(e) => setFilterAvailableOnly(e.target.checked)}
                    />
                    Show Immediately Available Only
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Counter & Sorting */}
        <div className="sv-results-bar">
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredProperties.length}</strong> matching properties
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label className="sv-label" style={{ margin: 0 }}>Sort By:</label>
            <select
              className="sv-select"
              style={{ width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Listings</option>
              <option value="rent-low">Rent: Low to High</option>
              <option value="rent-high">Rent: High to Low</option>
            </select>
          </div>
        </div>

        {/* Property Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <span className="sv-loading-spinner"></span>
            <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Filtering properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="sv-card" style={{ padding: '48px 20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No properties match your current filters</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Try broadening your budget range or clearing some amenity filters.
            </p>
            <button type="button" className="sv-btn sv-btn-primary" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="sv-grid-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
