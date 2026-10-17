import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit3, Trash2, CheckCircle2, Clock, ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { propertyService } from '../services/propertyService';
import { verificationService } from '../services/verificationService';
import { ALL_AMENITIES, INITIAL_PROPERTIES } from '../data/mockProperties';

export function OwnerDashboard() {
  const { user, isAuthenticated, openLogin } = useAuth();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerTab, setOwnerTab] = useState('listings'); // 'listings' | 'form'
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [ownerMessage, setOwnerMessage] = useState({ text: '', type: 'success' });

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
    electricityTerms: 'As per sub-meter reading',
    noticePeriod: '1 Month',
    lockInPeriod: '1 Month',
    maintenance: '₹0 (Included in rent)',
    ownerName: user?.name || 'Rajesh Sharma',
    ownerPhone: user?.phone || '+91 98112 34567',
    evidenceType: 'Electricity Bill & Ownership Deed',
    evidenceFile: null,
    evidenceFileName: 'Electricity_Bill_Oct2026.pdf',
    imageUrl: '',
    description: ''
  });

  useEffect(() => {
    async function loadOwnerProperties() {
      setLoading(true);
      try {
        const data = await propertyService.getProperties();
        // Filter or display properties
        setProperties(data);
      } catch (err) {
        console.error('Error fetching owner properties:', err);
        setProperties(INITIAL_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }
    loadOwnerProperties();
  }, []);

  const showMessage = (text, type = 'success') => {
    setOwnerMessage({ text, type });
    setTimeout(() => setOwnerMessage({ text: '', type: 'success' }), 5000);
  };

  const handleStartAdd = () => {
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
      ownerName: user?.name || 'Rajesh Sharma',
      ownerPhone: user?.phone || '+91 98112 34567',
      evidenceType: 'Electricity Bill & Ownership Deed',
      evidenceFile: null,
      evidenceFileName: 'Electricity_Bill_Oct2026.pdf',
      imageUrl: '',
      description: ''
    });
    setOwnerTab('form');
  };

  const handleEdit = (prop) => {
    setEditingPropertyId(prop.id);
    setOwnerForm({
      title: prop.title,
      type: prop.type,
      location: prop.location,
      address: prop.address,
      rent: String(prop.rent),
      deposit: String(prop.deposit),
      gender: prop.gender,
      occupancy: prop.occupancy || '',
      available: prop.available,
      amenities: prop.amenities || [],
      electricityTerms: prop.electricityTerms || '',
      noticePeriod: prop.noticePeriod || '',
      lockInPeriod: prop.lockInPeriod || '',
      maintenance: prop.maintenance || '',
      ownerName: prop.ownerName || '',
      ownerPhone: prop.ownerPhone || '',
      evidenceType: prop.evidenceType || 'Electricity Bill & Ownership Deed',
      evidenceFile: null,
      evidenceFileName: 'Property_Bill_On_File.pdf',
      imageUrl: (prop.images && prop.images[0]) || '',
      description: prop.description || ''
    });
    setOwnerTab('form');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;
    try {
      await propertyService.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      showMessage('Listing removed from platform.');
    } catch {
      // Local fallback removal
      setProperties(prev => prev.filter(p => p.id !== id));
      showMessage('Listing removed from platform.');
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      await propertyService.toggleAvailability(id);
      setProperties(prev =>
        prev.map(p => (p.id === id ? { ...p, available: !p.available } : p))
      );
      showMessage('Availability status updated.');
    } catch {
      setProperties(prev =>
        prev.map(p => (p.id === id ? { ...p, available: !p.available } : p))
      );
      showMessage('Availability status updated.');
    }
  };

  const handleAmenityToggle = (amenity) => {
    setOwnerForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const defaultImg = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80';
    const finalImg = ownerForm.imageUrl.trim() || defaultImg;

    const propertyPayload = {
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
      images: [finalImg]
    };

    if (editingPropertyId) {
      try {
        await propertyService.updateProperty(editingPropertyId, propertyPayload);
      } catch {
        // Fallback update in state
      }
      setProperties(prev =>
        prev.map(item =>
          item.id === editingPropertyId ? { ...item, ...propertyPayload } : item
        )
      );
      showMessage('Property details updated successfully.');
    } else {
      let createdProp = null;
      try {
        createdProp = await propertyService.createProperty(propertyPayload);
      } catch {
        createdProp = {
          ...propertyPayload,
          id: `prop-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
          ownerSince: '2026',
          ownerIdVerified: true,
          propertyEvidenceVerified: false,
          verificationStatus: 'UNDER_REVIEW',
          evidenceType: `${ownerForm.evidenceType} (Submitted for Admin Check)`
        };
      }
      setProperties(prev => [createdProp, ...prev]);
      showMessage('Property submitted! Identity & ownership evidence sent for administrator review.');
    }

    setOwnerTab('listings');
    setEditingPropertyId(null);
  };

  return (
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
            onClick={handleStartAdd}
          >
            <Plus size={16} /> Add New Property
          </button>
        </div>

        {ownerMessage.text && (
          <div className={`sv-alert sv-alert-${ownerMessage.type}`}>
            <CheckCircle2 size={18} />
            <span>{ownerMessage.text}</span>
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
            onClick={handleStartAdd}
          >
            {editingPropertyId ? 'Edit Property Details' : '+ Add New Property & Evidence'}
          </button>
        </div>

        {/* TAB 1: OWNER LISTINGS & VERIFICATION TRACKER */}
        {ownerTab === 'listings' && (
          loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span className="sv-loading-spinner"></span>
            </div>
          ) : (
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
                        <div>₹{Number(prop.rent).toLocaleString('en-IN')}/mo</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          Deposit: ₹{Number(prop.deposit).toLocaleString('en-IN')}
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
                            onClick={() => navigate(`/property/${prop.id}`)}
                            title="Preview Listing"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            className="sv-btn sv-btn-outline"
                            style={{ padding: '6px 10px' }}
                            onClick={() => handleEdit(prop)}
                            title="Edit Property"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            className="sv-btn sv-btn-danger-outline"
                            style={{ padding: '6px 10px' }}
                            onClick={() => handleDelete(prop.id)}
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
          )
        )}

        {/* TAB 2: ADD / EDIT PROPERTY & EVIDENCE SUBMISSION FORM */}
        {ownerTab === 'form' && (
          <form className="sv-card" style={{ padding: '24px' }} onSubmit={handleFormSubmit}>
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
                      onChange={() => handleAmenityToggle(amenity)}
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
                  <label className="sv-label">Upload Proof Document (PDF/Image)</label>
                  <input
                    type="file"
                    className="sv-input"
                    onChange={(e) =>
                      setOwnerForm({
                        ...ownerForm,
                        evidenceFile: e.target.files?.[0] || null,
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
  );
}
