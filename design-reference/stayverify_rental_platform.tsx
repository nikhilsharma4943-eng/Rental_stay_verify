import React, { useState, useMemo } from 'react';
import { 
  Search, ShieldCheck, CheckCircle2, MapPin, Home, Building2, 
  UserCheck, FileCheck, AlertTriangle, Phone, Calendar, Flag, 
  Plus, Edit3, Trash2, Eye, ChevronDown, ChevronUp, X, Menu, 
  Info, Lock, Check, Clock, HelpCircle, FolderTree, Upload
} from 'lucide-react';

// ==========================================
// 1. INITIAL MOCK DATA (Student & Professional Rentals)
// ==========================================
const INITIAL_PROPERTIES = [
  {
    id: 'prop-101',
    title: 'Sunrise Student PG & Residency',
    type: 'PG',
    location: 'North Campus, Delhi',
    address: 'House 42, Block B, Vijay Nagar, Near Delhi University North Campus',
    rent: 8500,
    deposit: 8500,
    gender: 'Boys',
    occupancy: 'Double Sharing',
    available: true,
    createdAt: '2026-10-12',
    amenities: ['Wi-Fi', 'Food / Mess', 'Power Backup', 'RO Water', 'Laundry', 'CCTV'],
    electricityTerms: 'Included up to 100 units/month, then ₹8/unit',
    noticePeriod: '1 Month',
    lockInPeriod: '3 Months',
    maintenance: '₹0 (Included in rent)',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 98112 34567',
    ownerSince: '2023',
    ownerIdVerified: true,
    propertyEvidenceVerified: true,
    verificationStatus: 'Verified', // 'Verified' | 'Under Review' | 'Action Required'
    evidenceType: 'Electricity Bill & Municipal Tax Receipt',
    description: 'Clean, quiet, and student-friendly PG located within 500m of main college gates. Home-cooked meals served 3 times a day. No hidden brokerage or registration charges.',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'prop-102',
    title: 'GreenView Working Women Hostel',
    type: 'Hostel',
    location: 'Koramangala, Bengaluru',
    address: '14th Main, 4th Block, Koramangala, Near Sony World Signal',
    rent: 11000,
    deposit: 20000,
    gender: 'Girls',
    occupancy: 'Single & Double',
    available: true,
    createdAt: '2026-10-15',
    amenities: ['Wi-Fi', 'AC', 'Food / Mess', 'Attached Washroom', '24x7 Security', 'Power Backup'],
    electricityTerms: 'Actuals as per sub-meter (₹7.5/unit)',
    noticePeriod: '1 Month',
    lockInPeriod: '1 Month',
    maintenance: '₹0 (Included in rent)',
    ownerName: 'Anita Nair',
    ownerPhone: '+91 98450 11223',
    ownerSince: '2022',
    ownerIdVerified: true,
    propertyEvidenceVerified: true,
    verificationStatus: 'Verified',
    evidenceType: 'Registered Sale Deed & BESCOM Utility Bill',
    description: 'Safe and well-maintained hostel designed for female students and IT professionals. Biometric entry, warden on premises, and hygienic kitchen facilities.',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c457?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'prop-103',
    title: 'Independent Single Room with Kitchenette',
    type: 'Room',
    location: 'Kothrud, Pune',
    address: 'Lane 3, Dahanukar Colony, Kothrud, Near MIT College',
    rent: 7000,
    deposit: 14000,
    gender: 'Any',
    occupancy: 'Single Occupancy',
    available: true,
    createdAt: '2026-10-16',
    amenities: ['Wi-Fi', 'Attached Washroom', 'Geyser', 'Two-Wheeler Parking'],
    electricityTerms: 'Separate meter (State board residential rates)',
    noticePeriod: '1 Month',
    lockInPeriod: 'None',
    maintenance: '₹300 / month for common area cleaning',
    ownerName: 'Vikram Kulkarni',
    ownerPhone: '+91 97654 88990',
    ownerSince: '2024',
    ownerIdVerified: true,
    propertyEvidenceVerified: true,
    verificationStatus: 'Verified',
    evidenceType: 'Property Index II & Electricity Bill',
    description: 'Peaceful independent room on the first floor of a residential bungalow. Ideal for students preparing for competitive exams or working individuals who prefer privacy.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'prop-104',
    title: '2 BHK Semi-Furnished Student Flat',
    type: 'Flat',
    location: 'Sector 62, Noida',
    address: 'Flat 304, Tower C, Rajat Vihar, Sector 62, Noida',
    rent: 18000,
    deposit: 36000,
    gender: 'Any',
    occupancy: 'Up to 3 Students / Working Professionals',
    available: true,
    createdAt: '2026-10-10',
    amenities: ['AC', 'Modular Kitchen', 'Power Backup', 'Attached Washroom', 'Parking', 'Lift'],
    electricityTerms: 'Prepaid society meter as per consumption',
    noticePeriod: '2 Months',
    lockInPeriod: '6 Months',
    maintenance: '₹1,200 / month (Paid directly to society office)',
    ownerName: 'Suresh Verma',
    ownerPhone: '+91 99100 55443',
    ownerSince: '2025',
    ownerIdVerified: true,
    propertyEvidenceVerified: true,
    verificationStatus: 'Verified',
    evidenceType: 'Allotment Letter & Society NOC',
    description: 'Spacious 2 BHK apartment walking distance from metro station, engineering colleges, and IT parks. Wardrobes, beds, geysers, and fans are already installed.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'prop-105',
    title: 'Scholar Nest Co-ed PG',
    type: 'PG',
    location: 'Viman Nagar, Pune',
    address: 'Plot 19, Sakore Nagar, Viman Nagar, Pune',
    rent: 9500,
    deposit: 9500,
    gender: 'Any',
    occupancy: 'Double Sharing',
    available: true,
    createdAt: '2026-10-17',
    amenities: ['Wi-Fi', 'Laundry', 'Power Backup', 'Attached Washroom'],
    electricityTerms: 'Included in monthly rent',
    noticePeriod: '1 Month',
    lockInPeriod: '1 Month',
    maintenance: '₹0',
    ownerName: 'Deepak Deshmukh',
    ownerPhone: '+91 98220 77665',
    ownerSince: '2026',
    ownerIdVerified: true,
    propertyEvidenceVerified: false,
    verificationStatus: 'Under Review',
    evidenceType: 'Owner ID Verified; Utility Bill under review',
    description: 'Newly renovated PG near college campus. Owner identity has been verified; property utility bill is currently undergoing routine administrator verification.',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'prop-106',
    title: 'Metro View 1 BHK Compact Flat',
    type: 'Flat',
    location: 'Andheri East, Mumbai',
    address: 'B-12, Shanti Niketan Society, Chakala, Andheri East',
    rent: 22000,
    deposit: 50000,
    gender: 'Any',
    occupancy: 'Up to 2 Occupants',
    available: false,
    createdAt: '2026-10-05',
    amenities: ['Wi-Fi', 'AC', 'Attached Washroom', '24x7 Security'],
    electricityTerms: 'As per monthly Adani electricity bill',
    noticePeriod: '1 Month',
    lockInPeriod: '6 Months',
    maintenance: 'Included in rent',
    ownerName: 'Mehul Parekh',
    ownerPhone: '+91 98201 33445',
    ownerSince: '2023',
    ownerIdVerified: true,
    propertyEvidenceVerified: true,
    verificationStatus: 'Verified',
    evidenceType: 'Society Share Certificate & Electricity Bill',
    description: 'Well-ventilated 1 BHK just 5 minutes walk from Chakala Metro Station. Direct owner listing with zero brokerage.',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80'
    ]
  }
];

const ALL_AMENITIES = [
  'Wi-Fi',
  'AC',
  'Food / Mess',
  'Attached Washroom',
  'Laundry',
  'Power Backup'
];

// ==========================================
// 2. REUSABLE PROPERTY CARD COMPONENT
// ==========================================
function PropertyCard({ property, onSelectProperty }) {
  const isFullyVerified = property.ownerIdVerified && property.propertyEvidenceVerified;

  return (
    <div className="sv-card sv-property-card" onClick={() => onSelectProperty(property.id)}>
      <div className="sv-card-img-wrap">
        <img src={property.images[0]} alt={property.title} className="sv-card-img" />
        <span className="sv-type-tag">{property.type}</span>
        {!property.available && (
          <span className="sv-soldout-tag">Currently Full</span>
        )}
      </div>

      <div className="sv-card-body">
        {/* Verification Badges Row */}
        <div className="sv-badge-row">
          {isFullyVerified ? (
            <>
              <span className="sv-badge sv-badge-verified" title="Government ID checked by admin">
                <UserCheck size={13} /> Owner ID Verified
              </span>
              <span className="sv-badge sv-badge-verified" title="Ownership deed or utility bill verified">
                <FileCheck size={13} /> Evidence Reviewed
              </span>
            </>
          ) : (
            <span className="sv-badge sv-badge-pending" title="Documents are being reviewed by admin">
              <Clock size={13} /> Evidence Under Review
            </span>
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
            <div className="sv-price-value">₹{property.rent.toLocaleString('en-IN')}<span className="sv-price-unit">/mo</span></div>
          </div>
          <div className="sv-price-divider"></div>
          <div>
            <span className="sv-price-label">Security Deposit</span>
            <div className="sv-deposit-value">₹{property.deposit.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Key Amenities Preview */}
        <div className="sv-amenities-preview">
          {property.amenities.slice(0, 3).map((item, idx) => (
            <span key={idx} className="sv-amenity-pill">{item}</span>
          ))}
          {property.amenities.length > 3 && (
            <span className="sv-amenity-more">+{property.amenities.length - 3} more</span>
          )}
        </div>

        <button 
          type="button"
          className="sv-btn sv-btn-outline sv-btn-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProperty(property.id);
          }}
        >
          View Details & Verification
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  // Navigation & Page State: 'home' | 'find' | 'details' | 'owner'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState('prop-101');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Properties State
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);

  // User Auth Simulation State
  const [currentUser, setCurrentUser] = useState(null); // null or { name, email, role }
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login', role: 'student' });

  // Info / Action Modals on Details & Footer
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'visit' | 'report' | 'structure' | 'safety' | 'about'
  const [modalFeedback, setModalFeedback] = useState('');

  // Search & Filter States (shared between Homepage hero search & Find Properties page)
  const [searchLocation, setSearchLocation] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filterGender, setFilterGender] = useState('All');
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Owner Section State
  const [ownerTab, setOwnerTab] = useState('listings'); // 'listings' | 'form'
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [ownerForm, setOwnerForm] = useState({
    title: '',
    type: 'PG',
    location: '',
    address: '',
    rent: '',
    deposit: '',
    gender: 'Any',
    occupancy: 'Double Sharing',
    available: true,
    amenities: ['Wi-Fi', 'Power Backup'],
    electricityTerms: 'Included in rent',
    noticePeriod: '1 Month',
    lockInPeriod: '1 Month',
    maintenance: '₹0 (Included in rent)',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 98112 34567',
    evidenceType: 'Electricity Bill & Ownership Deed',
    idFileName: '',
    evidenceFileName: '',
    imageUrl: '',
    description: ''
  });
  const [ownerMessage, setOwnerMessage] = useState('');

  // Active Property for Details Page
  const selectedProperty = useMemo(() => {
    return properties.find((p) => p.id === selectedPropertyId) || properties[0];
  }, [properties, selectedPropertyId]);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Navigate to Property Details
  const handleOpenProperty = (id) => {
    setSelectedPropertyId(id);
    setActivePhotoIndex(0);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate between main pages
  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted Properties for Find Properties Page
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        if (searchLocation.trim() !== '') {
          const q = searchLocation.toLowerCase();
          const matchLoc = prop.location.toLowerCase().includes(q);
          const matchTitle = prop.title.toLowerCase().includes(q);
          const matchAddr = prop.address.toLowerCase().includes(q);
          if (!matchLoc && !matchTitle && !matchAddr) return false;
        }
        if (filterType !== 'All' && prop.type !== filterType) return false;
        if (minRent !== '' && prop.rent < Number(minRent)) return false;
        if (maxRent !== '' && prop.rent > Number(maxRent)) return false;
        if (verifiedOnly && !(prop.ownerIdVerified && prop.propertyEvidenceVerified)) return false;
        if (filterGender !== 'All' && prop.gender !== 'Any' && prop.gender !== filterGender) return false;
        if (filterAvailableOnly && !prop.available) return false;
        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every((a) => prop.amenities.includes(a));
          if (!hasAll) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rent-low') return a.rent - b.rent;
        if (sortBy === 'rent-high') return b.rent - a.rent;
        return new Date(b.createdAt) - new Date(a.createdAt);
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

  // Toggle Amenity in Filter
  const toggleFilterAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
    );
  };

  // Reset all search filters
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
  };

  // Owner Form Handlers
  const handleStartAddProperty = () => {
    setEditingPropertyId(null);
    setOwnerForm({
      title: '',
      type: 'PG',
      location: '',
      address: '',
      rent: '',
      deposit: '',
      gender: 'Any',
      occupancy: 'Single / Double Sharing',
      available: true,
      amenities: ['Wi-Fi', 'Power Backup'],
      electricityTerms: 'As per sub-meter reading',
      noticePeriod: '1 Month',
      lockInPeriod: '1 Month',
      maintenance: '₹0 (Included in rent)',
      ownerName: currentUser?.name || 'Rajesh Sharma',
      ownerPhone: '+91 98112 34567',
      evidenceType: 'Electricity Bill & Ownership Deed',
      idFileName: 'Aadhaar_Card_Masked.pdf',
      evidenceFileName: 'Electricity_Bill_Oct2026.pdf',
      imageUrl: '',
      description: ''
    });
    setOwnerTab('form');
  };

  const handleEditProperty = (prop) => {
    setEditingPropertyId(prop.id);
    setOwnerForm({
      title: prop.title,
      type: prop.type,
      location: prop.location,
      address: prop.address,
      rent: String(prop.rent),
      deposit: String(prop.deposit),
      gender: prop.gender,
      occupancy: prop.occupancy,
      available: prop.available,
      amenities: prop.amenities,
      electricityTerms: prop.electricityTerms,
      noticePeriod: prop.noticePeriod,
      lockInPeriod: prop.lockInPeriod,
      maintenance: prop.maintenance,
      ownerName: prop.ownerName,
      ownerPhone: prop.ownerPhone,
      evidenceType: prop.evidenceType,
      idFileName: 'Verified_ID_On_File.pdf',
      evidenceFileName: 'Property_Bill_On_File.pdf',
      imageUrl: prop.images[0] || '',
      description: prop.description
    });
    setOwnerTab('form');
  };

  const handleDeleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setOwnerMessage('Listing removed from platform.');
    setTimeout(() => setOwnerMessage(''), 3500);
  };

  const handleToggleAvailability = (id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );
  };

  const handleOwnerAmenityToggle = (amenity) => {
    setOwnerForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleOwnerFormSubmit = (e) => {
    e.preventDefault();
    const defaultImg = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80';
    
    if (editingPropertyId) {
      setProperties((prev) =>
        prev.map((item) =>
          item.id === editingPropertyId
            ? {
                ...item,
                title: ownerForm.title,
                type: ownerForm.type,
                location: ownerForm.location,
                address: ownerForm.address,
                rent: Number(ownerForm.rent) || 0,
                deposit: Number(ownerForm.deposit) || 0,
                gender: ownerForm.gender,
                occupancy: ownerForm.occupancy,
                available: ownerForm.available,
                amenities: ownerForm.amenities,
                electricityTerms: ownerForm.electricityTerms,
                noticePeriod: ownerForm.noticePeriod,
                lockInPeriod: ownerForm.lockInPeriod,
                maintenance: ownerForm.maintenance,
                ownerName: ownerForm.ownerName,
                ownerPhone: ownerForm.ownerPhone,
                evidenceType: ownerForm.evidenceType,
                description: ownerForm.description,
                images: ownerForm.imageUrl.trim() ? [ownerForm.imageUrl.trim()] : item.images
              }
            : item
        )
      );
      setOwnerMessage('Property details updated successfully.');
    } else {
      const newProperty = {
        id: `prop-${Date.now()}`,
        title: ownerForm.title,
        type: ownerForm.type,
        location: ownerForm.location,
        address: ownerForm.address,
        rent: Number(ownerForm.rent) || 6000,
        deposit: Number(ownerForm.deposit) || 6000,
        gender: ownerForm.gender,
        occupancy: ownerForm.occupancy,
        available: ownerForm.available,
        createdAt: new Date().toISOString().split('T')[0],
        amenities: ownerForm.amenities,
        electricityTerms: ownerForm.electricityTerms,
        noticePeriod: ownerForm.noticePeriod,
        lockInPeriod: ownerForm.lockInPeriod,
        maintenance: ownerForm.maintenance,
        ownerName: ownerForm.ownerName || 'Property Owner',
        ownerPhone: ownerForm.ownerPhone || '+91 98000 00000',
        ownerSince: '2026',
        ownerIdVerified: true,
        propertyEvidenceVerified: false,
        verificationStatus: 'Under Review',
        evidenceType: `${ownerForm.evidenceType} (Submitted for Admin Check)`,
        description: ownerForm.description || 'Clean student accommodation with transparent rental terms.',
        images: [ownerForm.imageUrl.trim() || defaultImg]
      };
      setProperties((prev) => [newProperty, ...prev]);
      setOwnerMessage('Property submitted! Identity & ownership evidence sent for administrator review.');
    }

    setOwnerTab('listings');
    setEditingPropertyId(null);
    setTimeout(() => setOwnerMessage(''), 5000);
  };

  return (
    <div className="sv-app">
      {/* ==========================================
          PLAIN CSS STYLESHEET (Clean, Beginner-Friendly)
          ========================================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --bg-white: #FFFFFF;
          --bg-grey: #F8FAFC;
          --bg-grey-alt: #F3F4F6;
          --text-dark: #111827;
          --text-muted: #4B5563;
          --text-light: #6B7280;
          --accent-blue: #2563EB;
          --accent-blue-hover: #1D4ED8;
          --accent-blue-light: #EFF6FF;
          --border-color: #E5E7EB;
          --green-text: #15803D;
          --green-bg: #F0FDF4;
          --green-border: #BBF7D0;
          --amber-text: #B45309;
          --amber-bg: #FFFBEB;
          --amber-border: #FDE68A;
          --red-text: #B91C1C;
          --red-bg: #FEF2F2;
          --radius-sm: 6px;
          --radius-md: 8px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .sv-app {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: var(--bg-white);
          color: var(--text-dark);
          line-height: 1.5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .sv-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
        }

        /* Navigation Bar */
        .sv-navbar {
          background-color: var(--bg-white);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .sv-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        .sv-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 20px;
          color: var(--text-dark);
          cursor: pointer;
          text-decoration: none;
        }

        .sv-logo-icon {
          background-color: var(--accent-blue);
          color: #FFFFFF;
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sv-nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sv-nav-link {
          background: none;
          border: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .sv-nav-link:hover {
          color: var(--text-dark);
          background-color: var(--bg-grey-alt);
        }

        .sv-nav-link.active {
          color: var(--accent-blue);
          background-color: var(--accent-blue-light);
          font-weight: 600;
        }

        .sv-nav-auth {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sv-mobile-toggle {
          display: none;
          background: none;
          border: 1px solid var(--border-color);
          padding: 6px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          color: var(--text-dark);
        }

        /* Buttons */
        .sv-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          padding: 9px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
        }

        .sv-btn-primary {
          background-color: var(--accent-blue);
          color: #FFFFFF;
        }

        .sv-btn-primary:hover {
          background-color: var(--accent-blue-hover);
        }

        .sv-btn-outline {
          background-color: var(--bg-white);
          color: var(--text-dark);
          border-color: var(--border-color);
        }

        .sv-btn-outline:hover {
          background-color: var(--bg-grey-alt);
        }

        .sv-btn-blue-outline {
          background-color: var(--accent-blue-light);
          color: var(--accent-blue);
          border-color: #BFDBFE;
        }

        .sv-btn-blue-outline:hover {
          background-color: #DBEAFE;
        }

        .sv-btn-danger-outline {
          background-color: var(--bg-white);
          color: var(--red-text);
          border-color: #FECACA;
        }

        .sv-btn-danger-outline:hover {
          background-color: var(--red-bg);
        }

        .sv-btn-full {
          width: 100%;
        }

        .sv-btn-lg {
          padding: 12px 22px;
          font-size: 15px;
          font-weight: 600;
        }

        /* Sections & Layout */
        .sv-section {
          padding: 56px 0;
        }

        .sv-section-grey {
          background-color: var(--bg-grey);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .sv-section-header {
          margin-bottom: 28px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .sv-section-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .sv-section-subtitle {
          font-size: 15px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Hero Section */
        .sv-hero {
          background-color: var(--bg-grey);
          border-bottom: 1px solid var(--border-color);
          padding: 60px 0;
        }

        .sv-hero-content {
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }

        .sv-trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: var(--accent-blue-light);
          color: var(--accent-blue);
          border: 1px solid #BFDBFE;
          font-size: 13px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 99px;
          margin-bottom: 18px;
        }

        .sv-hero-title {
          font-size: 36px;
          font-weight: 700;
          color: var(--text-dark);
          line-height: 1.25;
          margin-bottom: 14px;
        }

        .sv-hero-desc {
          font-size: 16px;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        /* Search Bar Box */
        .sv-search-box {
          background-color: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr auto;
          gap: 12px;
          text-align: left;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .sv-field-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .sv-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-dark);
        }

        .sv-input, .sv-select, .sv-textarea {
          font-family: inherit;
          font-size: 14px;
          color: var(--text-dark);
          background-color: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 9px 12px;
          width: 100%;
          outline: none;
        }

        .sv-input:focus, .sv-select:focus, .sv-textarea:focus {
          border-color: var(--accent-blue);
        }

        /* Cards & Property Grid */
        .sv-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .sv-card {
          background-color: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .sv-property-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: border-color 0.15s ease;
        }

        .sv-property-card:hover {
          border-color: var(--accent-blue);
        }

        .sv-card-img-wrap {
          position: relative;
          height: 190px;
          background-color: var(--bg-grey-alt);
          border-bottom: 1px solid var(--border-color);
        }

        .sv-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .sv-type-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(17, 24, 39, 0.85);
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 4px;
        }

        .sv-soldout-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--red-text);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .sv-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .sv-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 10px;
        }

        .sv-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .sv-badge-verified {
          background-color: var(--green-bg);
          color: var(--green-text);
          border: 1px solid var(--green-border);
        }

        .sv-badge-pending {
          background-color: var(--amber-bg);
          color: var(--amber-text);
          border: 1px solid var(--amber-border);
        }

        .sv-card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 6px;
        }

        .sv-card-location {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 14px;
        }

        .sv-dot {
          color: var(--text-light);
        }

        .sv-price-box {
          background-color: var(--bg-grey);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .sv-price-divider {
          width: 1px;
          height: 28px;
          background-color: var(--border-color);
        }

        .sv-price-label {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
        }

        .sv-price-value {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .sv-price-unit {
          font-size: 12px;
          font-weight: 400;
          color: var(--text-muted);
        }

        .sv-deposit-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dark);
        }

        .sv-amenities-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
          margin-top: auto;
        }

        .sv-amenity-pill {
          font-size: 12px;
          color: var(--text-muted);
          background-color: var(--bg-grey-alt);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .sv-amenity-more {
          font-size: 12px;
          color: var(--text-light);
          padding: 2px 4px;
        }

        /* How It Works Steps */
        .sv-step-card {
          background-color: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
        }

        .sv-step-num {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background-color: var(--accent-blue-light);
          color: var(--accent-blue);
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .sv-step-title {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .sv-step-text {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* Safety Banner */
        .sv-safety-box {
          background-color: var(--amber-bg);
          border: 1px solid var(--amber-border);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .sv-safety-icon {
          color: var(--amber-text);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .sv-safety-title {
          font-size: 16px;
          font-weight: 700;
          color: #92400E;
          margin-bottom: 6px;
        }

        .sv-safety-list {
          font-size: 14px;
          color: #78350F;
          padding-left: 18px;
          display: grid;
          gap: 4px;
        }

        /* Filter Panel on Find Properties Page */
        .sv-filter-panel {
          background-color: var(--bg-grey);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 24px;
        }

        .sv-filter-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr auto;
          gap: 12px;
          align-items: flex-end;
        }

        .sv-filter-advanced {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 20px;
        }

        .sv-checkbox-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 6px;
        }

        .sv-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-dark);
          cursor: pointer;
          user-select: none;
        }

        .sv-results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Property Details Layout */
        .sv-details-grid {
          display: grid;
          grid-template-columns: 1.85fr 1.15fr;
          gap: 28px;
          align-items: start;
        }

        .sv-gallery-main {
          width: 100%;
          height: 360px;
          object-fit: cover;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: var(--bg-grey-alt);
        }

        .sv-gallery-thumbs {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .sv-thumb {
          width: 84px;
          height: 60px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          border: 2px solid transparent;
          cursor: pointer;
          opacity: 0.75;
        }

        .sv-thumb.active {
          border-color: var(--accent-blue);
          opacity: 1;
        }

        .sv-info-block {
          background-color: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 22px;
          margin-top: 20px;
        }

        .sv-info-block-title {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }

        .sv-terms-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .sv-term-item {
          background-color: var(--bg-grey);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 12px;
        }

        .sv-term-label {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .sv-term-val {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-dark);
        }

        .sv-verification-card {
          background-color: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 22px;
        }

        .sv-verify-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-grey);
          border: 1px solid var(--border-color);
          margin-bottom: 12px;
        }

        .sv-privacy-note {
          font-size: 12px;
          color: var(--text-muted);
          background-color: var(--bg-grey-alt);
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
        }

        /* Owner Dashboard */
        .sv-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
        }

        .sv-tab {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 10px 16px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
        }

        .sv-tab.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }

        .sv-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .sv-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .sv-table th {
          background-color: var(--bg-grey);
          padding: 12px 16px;
          font-weight: 600;
          font-size: 12px;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border-color);
        }

        .sv-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        /* Modals */
        .sv-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(17, 24, 39, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
        }

        .sv-modal {
          background-color: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          max-width: 500px;
          width: 100%;
          padding: 24px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .sv-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }

        /* Footer */
        .sv-footer {
          margin-top: auto;
          background-color: var(--bg-grey);
          border-top: 1px solid var(--border-color);
          padding: 40px 0 28px;
          font-size: 14px;
          color: var(--text-muted);
        }

        .sv-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .sv-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .sv-footer-link {
          background: none;
          border: none;
          font-family: inherit;
          font-size: 14px;
          color: var(--text-muted);
          cursor: pointer;
        }

        .sv-footer-link:hover {
          color: var(--accent-blue);
          text-decoration: underline;
        }

        /* Responsive Breakpoints */
        @media (max-width: 920px) {
          .sv-grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
          .sv-search-box, .sv-filter-grid {
            grid-template-columns: 1fr 1fr;
          }
          .sv-filter-advanced {
            grid-template-columns: 1fr;
          }
          .sv-details-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 680px) {
          .sv-nav-links, .sv-nav-auth {
            display: none;
          }
          .sv-mobile-toggle {
            display: inline-flex;
          }
          .sv-grid-3 {
            grid-template-columns: 1fr;
          }
          .sv-search-box, .sv-filter-grid, .sv-terms-grid {
            grid-template-columns: 1fr;
          }
          .sv-hero-title {
            font-size: 28px;
          }
          .sv-gallery-main {
            height: 240px;
          }
        }
      `}</style>

      {/* ==========================================
          1. NAVIGATION BAR
          ========================================== */}
      <header className="sv-navbar">
        <div className="sv-container sv-nav-inner">
          <div className="sv-logo" onClick={() => navigateTo('home')}>
            <div className="sv-logo-icon">
              <ShieldCheck size={20} />
            </div>
            <span>StayVerify</span>
          </div>

          <nav className="sv-nav-links">
            <button
              type="button"
              className={`sv-nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`sv-nav-link ${currentPage === 'find' ? 'active' : ''}`}
              onClick={() => navigateTo('find')}
            >
              Find Properties
            </button>
            <button
              type="button"
              className={`sv-nav-link ${currentPage === 'owner' ? 'active' : ''}`}
              onClick={() => navigateTo('owner')}
            >
              List Your Property
            </button>
          </nav>

          <div className="sv-nav-auth">
            <button
              type="button"
              className="sv-btn sv-btn-outline"
              onClick={() => setActiveModal('structure')}
              title="View React Project Folder Structure"
            >
              <FolderTree size={15} /> Project Guide
            </button>

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>
                  Hi, {currentUser.name} ({currentUser.role})
                </span>
                <button
                  type="button"
                  className="sv-btn sv-btn-outline"
                  onClick={() => setCurrentUser(null)}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="sv-btn sv-btn-outline"
                  onClick={() => setAuthModal({ open: true, mode: 'login', role: 'student' })}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="sv-btn sv-btn-primary"
                  onClick={() => setAuthModal({ open: true, mode: 'signup', role: 'student' })}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="sv-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', background: '#FFF', display: 'grid', gap: '10px' }}>
            <button type="button" className="sv-btn sv-btn-outline sv-btn-full" onClick={() => navigateTo('home')}>Home</button>
            <button type="button" className="sv-btn sv-btn-outline sv-btn-full" onClick={() => navigateTo('find')}>Find Properties</button>
            <button type="button" className="sv-btn sv-btn-outline sv-btn-full" onClick={() => navigateTo('owner')}>List Your Property</button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal({ open: true, mode: 'login', role: 'student' });
                }}
              >
                Login
              </button>
              <button
                type="button"
                className="sv-btn sv-btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal({ open: true, mode: 'signup', role: 'student' });
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          2. HOMEPAGE VIEW
          ========================================== */}
      {currentPage === 'home' && (
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
              <div className="sv-search-box">
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
                    type="button"
                    className="sv-btn sv-btn-primary sv-btn-lg sv-btn-full"
                    onClick={() => navigateTo('find')}
                  >
                    <Search size={17} /> Search Properties
                  </button>
                </div>
              </div>
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
                  onClick={() => navigateTo('find')}
                >
                  View All Listings ({properties.length})
                </button>
              </div>

              <div className="sv-grid-3">
                {properties.slice(0, 3).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelectProperty={handleOpenProperty}
                  />
                ))}
              </div>
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
                    <li>Always check that both <strong>Owner ID</strong> and <strong>Property Ownership Evidence</strong> badges are marked Verified on the listing page.</li>
                    <li><strong>Never pay a "visiting card fee" or "gate pass charge"</strong> just to view a property. Genuine owners on StayVerify never charge for property visits.</li>
                    <li>Review the monthly rent, security deposit refund rules, electricity unit rates, and notice period clearly before transferring any token money.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==========================================
          3. FIND PROPERTIES PAGE
          ========================================== */}
      {currentPage === 'find' && (
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

            {/* Straightforward Filter Bar */}
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

              {/* Collapsible More Filters (Gender, Amenities, Availability) */}
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
            {filteredProperties.length === 0 ? (
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
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelectProperty={handleOpenProperty}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* ==========================================
          4. PROPERTY DETAILS PAGE
          ========================================== */}
      {currentPage === 'details' && selectedProperty && (
        <main className="sv-section">
          <div className="sv-container">
            <div style={{ marginBottom: '18px' }}>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                onClick={() => navigateTo('find')}
              >
                ← Back to Property Listings
              </button>
            </div>

            <div className="sv-details-grid">
              {/* LEFT COLUMN: Photos, Rental Breakdown, Room Info, Amenities */}
              <div>
                <img
                  src={selectedProperty.images[activePhotoIndex] || selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="sv-gallery-main"
                />
                {selectedProperty.images.length > 1 && (
                  <div className="sv-gallery-thumbs">
                    {selectedProperty.images.map((imgUrl, index) => (
                      <img
                        key={index}
                        src={imgUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className={`sv-thumb ${activePhotoIndex === index ? 'active' : ''}`}
                        onClick={() => setActivePhotoIndex(index)}
                      />
                    ))}
                  </div>
                )}

                {/* Title & Location Block */}
                <div className="sv-info-block">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <span className="sv-badge" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
                      {selectedProperty.type}
                    </span>
                    <span className={`sv-badge ${selectedProperty.available ? 'sv-badge-verified' : 'sv-badge-pending'}`}>
                      {selectedProperty.available ? 'Available for Move-in' : 'Currently Full'}
                    </span>
                    <span className="sv-badge" style={{ background: 'var(--bg-grey-alt)', color: 'var(--text-dark)' }}>
                      {selectedProperty.gender === 'Any' ? 'Co-ed / Any Gender' : `${selectedProperty.gender} Only`}
                    </span>
                  </div>

                  <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
                    {selectedProperty.title}
                  </h1>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} /> {selectedProperty.address}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--text-dark)', marginTop: '14px' }}>
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Transparent Rental Breakdown */}
                <div className="sv-info-block">
                  <h2 className="sv-info-block-title">Transparent Rent & Terms Breakdown</h2>
                  <div className="sv-terms-grid">
                    <div className="sv-term-item">
                      <div className="sv-term-label">Monthly Rent</div>
                      <div className="sv-term-val" style={{ color: 'var(--accent-blue)', fontSize: '18px' }}>
                        ₹{selectedProperty.rent.toLocaleString('en-IN')} / month
                      </div>
                    </div>
                    <div className="sv-term-item">
                      <div className="sv-term-label">Security Deposit (Refundable)</div>
                      <div className="sv-term-val" style={{ fontSize: '18px' }}>
                        ₹{selectedProperty.deposit.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="sv-term-item">
                      <div className="sv-term-label">Room Type & Occupancy</div>
                      <div className="sv-term-val">{selectedProperty.occupancy}</div>
                    </div>
                    <div className="sv-term-item">
                      <div className="sv-term-label">Electricity Charges</div>
                      <div className="sv-term-val">{selectedProperty.electricityTerms}</div>
                    </div>
                    <div className="sv-term-item">
                      <div className="sv-term-label">Minimum Lock-in Period</div>
                      <div className="sv-term-val">{selectedProperty.lockInPeriod}</div>
                    </div>
                    <div className="sv-term-item">
                      <div className="sv-term-label">Notice Period Before Leaving</div>
                      <div className="sv-term-val">{selectedProperty.noticePeriod}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                    <strong>Extra Maintenance / Hidden Charges:</strong> {selectedProperty.maintenance}
                  </p>
                </div>

                {/* Facilities & Amenities */}
                <div className="sv-info-block">
                  <h2 className="sv-info-block-title">Available Facilities & Amenities</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px' }}>
                    {selectedProperty.amenities.map((amenity, idx) => (
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

              {/* RIGHT COLUMN: Owner Verification Status, Property Evidence, Action Buttons */}
              <div className="sv-verification-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <ShieldCheck size={22} style={{ color: 'var(--accent-blue)' }} />
                  <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Verification & Owner Details</h2>
                </div>

                {/* Owner Details Box */}
                <div style={{ marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Listed By Property Owner</div>
                  <div style={{ fontSize: '17px', fontWeight: 600, marginTop: '2px' }}>{selectedProperty.ownerName}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Active on StayVerify since {selectedProperty.ownerSince}
                  </div>
                </div>

                {/* Check 1: Owner Identity */}
                <div className="sv-verify-item">
                  <UserCheck
                    size={20}
                    style={{ color: selectedProperty.ownerIdVerified ? 'var(--green-text)' : 'var(--amber-text)', flexShrink: 0, marginTop: '2px' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>
                      Owner Identity Status:{' '}
                      <span style={{ color: selectedProperty.ownerIdVerified ? 'var(--green-text)' : 'var(--amber-text)' }}>
                        {selectedProperty.ownerIdVerified ? 'Verified' : 'Pending'}
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
                    style={{ color: selectedProperty.propertyEvidenceVerified ? 'var(--green-text)' : 'var(--amber-text)', flexShrink: 0, marginTop: '2px' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>
                      Property Evidence Review:{' '}
                      <span style={{ color: selectedProperty.propertyEvidenceVerified ? 'var(--green-text)' : 'var(--amber-text)' }}>
                        {selectedProperty.propertyEvidenceVerified ? 'Reviewed & Approved' : 'Under Admin Review'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Document Checked: <strong>{selectedProperty.evidenceType}</strong>
                    </div>
                  </div>
                </div>

                {/* Explicit Privacy Notice (Mandatory Requirement) */}
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
                    onClick={() => {
                      setModalFeedback('');
                      setActiveModal('contact');
                    }}
                  >
                    <Phone size={17} /> Contact Owner
                  </button>

                  <button
                    type="button"
                    className="sv-btn sv-btn-blue-outline sv-btn-lg sv-btn-full"
                    onClick={() => {
                      setModalFeedback('');
                      setActiveModal('visit');
                    }}
                  >
                    <Calendar size={17} /> Request a Visit
                  </button>

                  <button
                    type="button"
                    className="sv-btn sv-btn-danger-outline sv-btn-full"
                    style={{ marginTop: '6px' }}
                    onClick={() => {
                      setModalFeedback('');
                      setActiveModal('report');
                    }}
                  >
                    <Flag size={15} /> Report Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          5. OWNER SECTION (List & Manage Properties)
          ========================================== */}
      {currentPage === 'owner' && (
        <main className="sv-section">
          <div className="sv-container">
            <div className="sv-section-header">
              <div>
                <h1 className="sv-section-title">Property Owner Portal</h1>
                <p className="sv-section-subtitle">
                  List your PG, hostel, room, or flat, submit verification evidence for administrator review, and manage availability.
                </p>
              </div>
              <button
                type="button"
                className="sv-btn sv-btn-primary"
                onClick={handleStartAddProperty}
              >
                <Plus size={16} /> Add New Property
              </button>
            </div>

            {ownerMessage && (
              <div
                style={{
                  background: 'var(--green-bg)',
                  border: '1px solid var(--green-border)',
                  color: 'var(--green-text)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '20px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {ownerMessage}
              </div>
            )}

            {/* Owner Portal Tabs */}
            <div className="sv-tabs">
              <button
                type="button"
                className={`sv-tab ${ownerTab === 'listings' ? 'active' : ''}`}
                onClick={() => setOwnerTab('listings')}
              >
                My Properties & Verification Status ({properties.length})
              </button>
              <button
                type="button"
                className={`sv-tab ${ownerTab === 'form' ? 'active' : ''}`}
                onClick={handleStartAddProperty}
              >
                {editingPropertyId ? 'Edit Property Details' : '+ Add New Property & Evidence'}
              </button>
            </div>

            {/* TAB 1: OWNER LISTINGS & VERIFICATION TRACKER */}
            {ownerTab === 'listings' && (
              <div className="sv-table-wrap">
                <table className="sv-table">
                  <thead>
                    <tr>
                      <th>Property Title & Location</th>
                      <th>Type</th>
                      <th>Rent & Deposit</th>
                      <th>Verification Request Status</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((prop) => (
                      <tr key={prop.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{prop.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{prop.location}</div>
                        </td>
                        <td>{prop.type}</td>
                        <td>
                          <div>₹{prop.rent.toLocaleString('en-IN')}/mo</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            Deposit: ₹{prop.deposit.toLocaleString('en-IN')}
                          </div>
                        </td>
                        <td>
                          {prop.ownerIdVerified && prop.propertyEvidenceVerified ? (
                            <span className="sv-badge sv-badge-verified">
                              <CheckCircle2 size={13} /> Approved (ID & Property Verified)
                            </span>
                          ) : (
                            <span className="sv-badge sv-badge-pending">
                              <Clock size={13} /> Under Admin Review
                            </span>
                          )}
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {prop.evidenceType}
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="sv-btn sv-btn-outline"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleToggleAvailability(prop.id)}
                          >
                            {prop.available ? '🟢 Available (Click to Mark Full)' : '🔴 Full (Click to Re-open)'}
                          </button>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              className="sv-btn sv-btn-outline"
                              style={{ padding: '6px 10px' }}
                              onClick={() => handleOpenProperty(prop.id)}
                              title="Preview Listing"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              type="button"
                              className="sv-btn sv-btn-outline"
                              style={{ padding: '6px 10px' }}
                              onClick={() => handleEditProperty(prop)}
                              title="Edit Property"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              className="sv-btn sv-btn-danger-outline"
                              style={{ padding: '6px 10px' }}
                              onClick={() => handleDeleteProperty(prop.id)}
                              title="Delete Listing"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: ADD / EDIT PROPERTY & EVIDENCE SUBMISSION FORM */}
            {ownerTab === 'form' && (
              <form className="sv-card" style={{ padding: '24px' }} onSubmit={handleOwnerFormSubmit}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '18px' }}>
                  {editingPropertyId ? 'Update Property Listing' : 'Add a New Rental Property'}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div className="sv-field-group">
                    <label className="sv-label">Property Name / Title *</label>
                    <input
                      type="text"
                      required
                      className="sv-input"
                      placeholder="e.g. Comfort Student PG"
                      value={ownerForm.title}
                      onChange={(e) => setOwnerForm({ ...ownerForm, title: e.target.value })}
                    />
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">Property Category *</label>
                    <select
                      className="sv-select"
                      value={ownerForm.type}
                      onChange={(e) => setOwnerForm({ ...ownerForm, type: e.target.value })}
                    >
                      <option value="PG">PG (Paying Guest)</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Room">Independent Room</option>
                      <option value="Flat">Flat / Apartment</option>
                    </select>
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">City & Locality *</label>
                    <input
                      type="text"
                      required
                      className="sv-input"
                      placeholder="e.g. Kothrud, Pune"
                      value={ownerForm.location}
                      onChange={(e) => setOwnerForm({ ...ownerForm, location: e.target.value })}
                    />
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">Monthly Rent (₹) *</label>
                    <input
                      type="number"
                      required
                      className="sv-input"
                      placeholder="e.g. 8500"
                      value={ownerForm.rent}
                      onChange={(e) => setOwnerForm({ ...ownerForm, rent: e.target.value })}
                    />
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">Security Deposit (₹) *</label>
                    <input
                      type="number"
                      required
                      className="sv-input"
                      placeholder="e.g. 8500"
                      value={ownerForm.deposit}
                      onChange={(e) => setOwnerForm({ ...ownerForm, deposit: e.target.value })}
                    />
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">Gender Preference</label>
                    <select
                      className="sv-select"
                      value={ownerForm.gender}
                      onChange={(e) => setOwnerForm({ ...ownerForm, gender: e.target.value })}
                    >
                      <option value="Any">Co-ed / Any</option>
                      <option value="Boys">Boys Only</option>
                      <option value="Girls">Girls Only</option>
                    </select>
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">Room Occupancy Details</label>
                    <input
                      type="text"
                      className="sv-input"
                      placeholder="e.g. Single or Double Sharing"
                      value={ownerForm.occupancy}
                      onChange={(e) => setOwnerForm({ ...ownerForm, occupancy: e.target.value })}
                    />
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">Electricity Terms</label>
                    <input
                      type="text"
                      className="sv-input"
                      placeholder="e.g. Included in rent / ₹8 per unit"
                      value={ownerForm.electricityTerms}
                      onChange={(e) => setOwnerForm({ ...ownerForm, electricityTerms: e.target.value })}
                    />
                  </div>

                  <div className="sv-field-group">
                    <label className="sv-label">Notice Period</label>
                    <input
                      type="text"
                      className="sv-input"
                      placeholder="e.g. 1 Month"
                      value={ownerForm.noticePeriod}
                      onChange={(e) => setOwnerForm({ ...ownerForm, noticePeriod: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sv-field-group" style={{ marginBottom: '16px' }}>
                  <label className="sv-label">Full Street Address *</label>
                  <input
                    type="text"
                    required
                    className="sv-input"
                    placeholder="House/Flat No, Street, Landmark, City, PIN"
                    value={ownerForm.address}
                    onChange={(e) => setOwnerForm({ ...ownerForm, address: e.target.value })}
                  />
                </div>

                <div className="sv-field-group" style={{ marginBottom: '16px' }}>
                  <label className="sv-label">Available Amenities (Select all that apply)</label>
                  <div className="sv-checkbox-row" style={{ marginTop: '8px' }}>
                    {ALL_AMENITIES.map((amenity) => (
                      <label key={amenity} className="sv-checkbox-label">
                        <input
                          type="checkbox"
                          checked={ownerForm.amenities.includes(amenity)}
                          onChange={() => handleOwnerAmenityToggle(amenity)}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sv-field-group" style={{ marginBottom: '16px' }}>
                  <label className="sv-label">Property Photo URL (Optional — default student room image used if blank)</label>
                  <input
                    type="url"
                    className="sv-input"
                    placeholder="https://images.unsplash.com/..."
                    value={ownerForm.imageUrl}
                    onChange={(e) => setOwnerForm({ ...ownerForm, imageUrl: e.target.value })}
                  />
                </div>

                <div className="sv-field-group" style={{ marginBottom: '22px' }}>
                  <label className="sv-label">Description & House Rules</label>
                  <textarea
                    rows={3}
                    className="sv-textarea"
                    placeholder="Mention distance from nearby colleges, gate timings, food timings, etc."
                    value={ownerForm.description}
                    onChange={(e) => setOwnerForm({ ...ownerForm, description: e.target.value })}
                  />
                </div>

                {/* Dedicated Identity & Property Evidence Submission Section */}
                <div
                  style={{
                    background: 'var(--bg-grey)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px',
                    marginBottom: '20px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--accent-blue)' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: 700 }}>
                      Identity & Property Evidence Submission (For Administrator Review)
                    </h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    To protect students from rental fraud, please submit your government ID and a recent utility bill or ownership document. 
                    <strong> These documents are strictly reviewed by administrators and are never shown publicly.</strong>
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                    <div className="sv-field-group">
                      <label className="sv-label">Owner Full Name *</label>
                      <input
                        type="text"
                        required
                        className="sv-input"
                        value={ownerForm.ownerName}
                        onChange={(e) => setOwnerForm({ ...ownerForm, ownerName: e.target.value })}
                      />
                    </div>
                    <div className="sv-field-group">
                      <label className="sv-label">Owner Contact Number *</label>
                      <input
                        type="text"
                        required
                        className="sv-input"
                        value={ownerForm.ownerPhone}
                        onChange={(e) => setOwnerForm({ ...ownerForm, ownerPhone: e.target.value })}
                      />
                    </div>
                    <div className="sv-field-group">
                      <label className="sv-label">Property Evidence Document Type</label>
                      <select
                        className="sv-select"
                        value={ownerForm.evidenceType}
                        onChange={(e) => setOwnerForm({ ...ownerForm, evidenceType: e.target.value })}
                      >
                        <option value="Electricity Bill & Ownership Deed">Electricity Bill & Ownership Deed</option>
                        <option value="Municipal Property Tax Receipt">Municipal Property Tax Receipt</option>
                        <option value="Registered Society Share Certificate">Registered Society Share Certificate</option>
                      </select>
                    </div>
                    <div className="sv-field-group">
                      <label className="sv-label">Upload Proof Document (Simulated)</label>
                      <input
                        type="file"
                        className="sv-input"
                        onChange={(e) =>
                          setOwnerForm({
                            ...ownerForm,
                            evidenceFileName: e.target.files?.[0]?.name || 'Property_Document.pdf'
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="sv-btn sv-btn-primary sv-btn-lg">
                    {editingPropertyId ? 'Save Changes' : 'Submit Listing & Verification Documents'}
                  </button>
                  <button
                    type="button"
                    className="sv-btn sv-btn-outline sv-btn-lg"
                    onClick={() => setOwnerTab('listings')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      )}

      {/* ==========================================
          6. FOOTER
          ========================================== */}
      <footer className="sv-footer">
        <div className="sv-container">
          <div className="sv-footer-inner">
            <div>
              <div className="sv-logo" style={{ fontSize: '18px', marginBottom: '4px' }}>
                <div className="sv-logo-icon" style={{ width: '28px', height: '28px' }}>
                  <ShieldCheck size={16} />
                </div>
                <span>StayVerify</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Find Your Stay. Verify Before You Trust.
              </p>
            </div>

            <div className="sv-footer-links">
              <button type="button" className="sv-footer-link" onClick={() => setActiveModal('about')}>About</button>
              <button type="button" className="sv-footer-link" onClick={() => setActiveModal('safety')}>Safety Guidelines</button>
              <button type="button" className="sv-footer-link" onClick={() => setActiveModal('about')}>Privacy Policy</button>
              <button type="button" className="sv-footer-link" onClick={() => setActiveModal('about')}>Terms of Use</button>
              <button type="button" className="sv-footer-link" onClick={() => setActiveModal('structure')}>React Folder Structure</button>
            </div>
          </div>

          <div style={{ paddingTop: '20px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span>© 2026 StayVerify Student & Professional Housing Platform.</span>
            <span>Zero Brokerage • Verified Owners • Transparent Rental Terms</span>
          </div>
        </div>
      </footer>

      {/* ==========================================
          7. MODALS (Contact, Visit, Report, Auth, Info)
          ========================================== */}
      {activeModal && (
        <div className="sv-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sv-modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                {activeModal === 'contact' && `Contact Owner: ${selectedProperty.ownerName}`}
                {activeModal === 'visit' && 'Request an In-Person Property Visit'}
                {activeModal === 'report' && 'Report Inaccurate or Suspicious Listing'}
                {activeModal === 'safety' && 'Student Rental Safety Guidelines'}
                {activeModal === 'about' && 'About StayVerify & Privacy Policy'}
                {activeModal === 'structure' && 'Beginner-Friendly React Project Structure'}
              </h3>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                style={{ padding: '4px 8px' }}
                onClick={() => setActiveModal(null)}
              >
                <X size={16} />
              </button>
            </div>

            {/* Contact Owner Modal */}
            {activeModal === 'contact' && (
              <div>
                <div className="sv-verify-item" style={{ marginBottom: '16px' }}>
                  <Phone size={18} style={{ color: 'var(--accent-blue)' }} />
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Direct Verified Owner Phone</div>
                    <div style={{ fontSize: '17px', fontWeight: 700 }}>{selectedProperty.ownerPhone}</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Reminder: Discuss monthly rent (₹{selectedProperty.rent.toLocaleString('en-IN')}), deposit (₹{selectedProperty.deposit.toLocaleString('en-IN')}), and schedule a visit before making any payment.
                </p>
                {modalFeedback ? (
                  <div style={{ color: 'var(--green-text)', fontWeight: 600, fontSize: '14px' }}>{modalFeedback}</div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModalFeedback('Your inquiry has been sent to the owner!');
                    }}
                    style={{ display: 'grid', gap: '12px' }}
                  >
                    <input type="text" required className="sv-input" placeholder="Your Full Name" />
                    <input type="tel" required className="sv-input" placeholder="Your Mobile Number" />
                    <textarea rows={3} required className="sv-textarea" defaultValue={`Hi ${selectedProperty.ownerName}, I am interested in ${selectedProperty.title}. Is it currently available?`} />
                    <button type="submit" className="sv-btn sv-btn-primary sv-btn-full">Send Message to Owner</button>
                  </form>
                )}
              </div>
            )}

            {/* Schedule a Visit Modal */}
            {activeModal === 'visit' && (
              <div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Select a convenient date and time to visit <strong>{selectedProperty.title}</strong> in person. Property visits are 100% free.
                </p>
                {modalFeedback ? (
                  <div style={{ color: 'var(--green-text)', fontWeight: 600, fontSize: '14px' }}>{modalFeedback}</div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModalFeedback('Visit request sent! The owner will confirm your slot via SMS/WhatsApp.');
                    }}
                    style={{ display: 'grid', gap: '12px' }}
                  >
                    <div className="sv-field-group">
                      <label className="sv-label">Preferred Visit Date</label>
                      <input type="date" required className="sv-input" />
                    </div>
                    <div className="sv-field-group">
                      <label className="sv-label">Preferred Time Slot</label>
                      <select className="sv-select">
                        <option>Morning (10:00 AM - 1:00 PM)</option>
                        <option>Afternoon (2:00 PM - 5:00 PM)</option>
                        <option>Evening (5:00 PM - 7:30 PM)</option>
                      </select>
                    </div>
                    <input type="text" required className="sv-input" placeholder="Your Name & Phone Number" />
                    <button type="submit" className="sv-btn sv-btn-primary sv-btn-full">Confirm Visit Request</button>
                  </form>
                )}
              </div>
            )}

            {/* Report Listing Modal */}
            {activeModal === 'report' && (
              <div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Help keep StayVerify safe. If an owner asks for a visiting fee or if the property details are misleading, report it immediately.
                </p>
                {modalFeedback ? (
                  <div style={{ color: 'var(--green-text)', fontWeight: 600, fontSize: '14px' }}>{modalFeedback}</div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModalFeedback('Thank you. Our verification team has received your report and will investigate.');
                    }}
                    style={{ display: 'grid', gap: '12px' }}
                  >
                    <select className="sv-select" required>
                      <option value="">Select Reason for Reporting</option>
                      <option>Owner demanded money/gate pass before showing room</option>
                      <option>Rent or deposit is different from what is listed</option>
                      <option>Photos do not match the actual property</option>
                      <option>Broker posing as property owner</option>
                    </select>
                    <textarea rows={3} required className="sv-textarea" placeholder="Please share brief details so our admin can review..." />
                    <button type="submit" className="sv-btn sv-btn-danger-outline sv-btn-full">Submit Report to Admin</button>
                  </form>
                )}
              </div>
            )}

            {/* Safety Guidelines Modal */}
            {activeModal === 'safety' && (
              <div style={{ fontSize: '14px', color: 'var(--text-dark)', display: 'grid', gap: '10px' }}>
                <p><strong>1. Check Both Verification Badges:</strong> Verify that both the Owner ID and Property Evidence badges are green before contacting.</p>
                <p><strong>2. Never Pay Visiting Charges:</strong> Scammers often ask for ₹500–₹2,000 for a "visiting card" or "gate entry pass". Never pay to see a property.</p>
                <p><strong>3. Visit in Person or via Live Video Call:</strong> Always inspect the room, water supply, and locality before paying a security deposit.</p>
                <p><strong>4. Get Written Rental Terms:</strong> Ensure lock-in period, notice period, and deposit refund timeline are written in your rental agreement or receipt.</p>
              </div>
            )}

            {/* About & Privacy Modal */}
            {activeModal === 'about' && (
              <div style={{ fontSize: '14px', color: 'var(--text-dark)', display: 'grid', gap: '10px' }}>
                <p><strong>Our Mission:</strong> StayVerify is built for college students and working professionals to find genuine PGs, hostels, rooms, and flats without falling victim to fake rental listings.</p>
                <p><strong>Strict Document Privacy:</strong> When property owners upload government identity cards or electricity bills for verification, those files are reviewed solely by authorized administrators and are never displayed publicly to visitors.</p>
              </div>
            )}

            {/* Beginner-Friendly React Folder Structure Guide */}
            {activeModal === 'structure' && (
              <div style={{ fontSize: '13px', color: 'var(--text-dark)' }}>
                <p style={{ marginBottom: '10px', color: 'var(--text-muted)' }}>
                  To run this project locally in VS Code with Vite or Create React App, organize the components into this clean, beginner-friendly folder structure:
                </p>
                <pre
                  style={{
                    background: 'var(--bg-grey)',
                    border: '1px solid var(--border-color)',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    overflowX: 'auto',
                    lineHeight: 1.5
                  }}
                >{`stayverify-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Footer.jsx          # Simple footer links
│   │   ├── PropertyCard.jsx    # Reusable listing card
│   │   └── VerificationBadge.jsx
│   ├── pages/
│   │   ├── HomePage.jsx        # Hero, Search, Featured, 3 Steps
│   │   ├── FindProperties.jsx  # Filters, Sort, Listing Grid
│   │   ├── PropertyDetails.jsx # Photos, Terms, Trust Card
│   │   └── OwnerDashboard.jsx  # Add Property & Evidence Form
│   ├── data/
│   │   └── mockProperties.js   # Sample student PG/Flat data
│   ├── App.css                 # Plain CSS stylesheet
│   ├── App.jsx                 # Main state & page switching
│   └── main.jsx                # React entry point
└── package.json`}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          8. LOGIN / SIGN UP MODAL
          ========================================== */}
      {authModal.open && (
        <div className="sv-modal-backdrop" onClick={() => setAuthModal({ ...authModal, open: false })}>
          <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sv-modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
                {authModal.mode === 'login' ? 'Login to StayVerify' : 'Create an Account'}
              </h3>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                style={{ padding: '4px 8px' }}
                onClick={() => setAuthModal({ ...authModal, open: false })}
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') || (authModal.role === 'owner' ? 'Rajesh Sharma' : 'Aarav Gupta');
                setCurrentUser({
                  name,
                  role: authModal.role === 'owner' ? 'Owner' : 'Student'
                });
                setAuthModal({ ...authModal, open: false });
                if (authModal.role === 'owner') {
                  navigateTo('owner');
                }
              }}
              style={{ display: 'grid', gap: '14px' }}
            >
              <div className="sv-field-group">
                <label className="sv-label">I am a:</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    className={`sv-btn ${authModal.role === 'student' ? 'sv-btn-primary' : 'sv-btn-outline'}`}
                    onClick={() => setAuthModal({ ...authModal, role: 'student' })}
                  >
                    Student / Tenant
                  </button>
                  <button
                    type="button"
                    className={`sv-btn ${authModal.role === 'owner' ? 'sv-btn-primary' : 'sv-btn-outline'}`}
                    onClick={() => setAuthModal({ ...authModal, role: 'owner' })}
                  >
                    Property Owner
                  </button>
                </div>
              </div>

              {authModal.mode === 'signup' && (
                <div className="sv-field-group">
                  <label className="sv-label">Full Name</label>
                  <input name="name" type="text" required className="sv-input" placeholder="Enter your full name" />
                </div>
              )}

              <div className="sv-field-group">
                <label className="sv-label">Email Address</label>
                <input name="email" type="email" required className="sv-input" placeholder="you@example.com" />
              </div>

              <div className="sv-field-group">
                <label className="sv-label">Password</label>
                <input name="password" type="password" required className="sv-input" placeholder="••••••••" />
              </div>

              <button type="submit" className="sv-btn sv-btn-primary sv-btn-lg sv-btn-full">
                {authModal.mode === 'login' ? 'Login' : 'Create Account'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                {authModal.mode === 'login' ? (
                  <>
                    New to StayVerify?{' '}
                    <button
                      type="button"
                      className="sv-footer-link"
                      style={{ color: 'var(--accent-blue)', fontWeight: 600 }}
                      onClick={() => setAuthModal({ ...authModal, mode: 'signup' })}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="sv-footer-link"
                      style={{ color: 'var(--accent-blue)', fontWeight: 600 }}
                      onClick={() => setAuthModal({ ...authModal, mode: 'login' })}
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
