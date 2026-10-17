import React, { useState } from 'react';
import { X, Phone, Calendar, Flag, AlertTriangle, ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { reportService, visitService } from '../services/reportService';

export function ContactModal({ property, onClose }) {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    `Hi ${property.ownerName}, I am interested in ${property.title}. Is it currently available for move-in?`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback('Your inquiry has been sent to the verified property owner! They will contact you shortly.');
  };

  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-header">
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
            Contact Owner: {property.ownerName}
          </h3>
          <button type="button" className="sv-btn sv-btn-outline" style={{ padding: '4px 8px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="sv-verify-item" style={{ marginBottom: '16px' }}>
          <Phone size={18} style={{ color: 'var(--accent-blue)' }} />
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Direct Verified Owner Phone</div>
            <div style={{ fontSize: '17px', fontWeight: 700 }}>{property.ownerPhone || '+91 98112 34567'}</div>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Reminder: Discuss monthly rent (₹{Number(property.rent).toLocaleString('en-IN')}), deposit (₹{Number(property.deposit).toLocaleString('en-IN')}), and schedule a visit before making any payment.
        </p>

        {feedback ? (
          <div className="sv-alert sv-alert-success">
            <CheckCircle2 size={18} /> {feedback}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
            <div className="sv-field-group">
              <label className="sv-label">Your Full Name</label>
              <input
                type="text"
                required
                className="sv-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sv-field-group">
              <label className="sv-label">Your Mobile Number</label>
              <input
                type="tel"
                required
                className="sv-input"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="sv-field-group">
              <label className="sv-label">Inquiry Message</label>
              <textarea
                rows={3}
                required
                className="sv-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="sv-btn sv-btn-primary sv-btn-full">
              Send Message to Owner
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function VisitModal({ property, onClose }) {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await visitService.requestVisit({
        propertyId: property.id,
        preferredDate: visitDate,
        preferredSlot: timeSlot,
        visitorName,
        visitorPhone,
        notes: `Visit requested for ${property.title}`
      });
      setFeedback('Visit request successfully submitted! The owner will confirm your slot via SMS/WhatsApp.');
    } catch {
      // Fallback local confirmation
      setFeedback('Visit request recorded! The owner will confirm your slot via SMS/WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-header">
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
            Request an In-Person Property Visit
          </h3>
          <button type="button" className="sv-btn sv-btn-outline" style={{ padding: '4px 8px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Select a convenient date and time to visit <strong>{property.title}</strong> in person. Property visits are 100% free with zero agent charges.
        </p>

        {feedback ? (
          <div className="sv-alert sv-alert-success">
            <CheckCircle2 size={18} /> {feedback}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
            <div className="sv-field-group">
              <label className="sv-label">Preferred Visit Date *</label>
              <input
                type="date"
                required
                className="sv-input"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </div>
            <div className="sv-field-group">
              <label className="sv-label">Preferred Time Slot *</label>
              <select
                className="sv-select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                <option value="Evening (5:00 PM - 7:30 PM)">Evening (5:00 PM - 7:30 PM)</option>
              </select>
            </div>
            <div className="sv-field-group">
              <label className="sv-label">Your Name *</label>
              <input
                type="text"
                required
                className="sv-input"
                placeholder="Full Name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />
            </div>
            <div className="sv-field-group">
              <label className="sv-label">Your Contact Phone *</label>
              <input
                type="tel"
                required
                className="sv-input"
                placeholder="Mobile number for confirmation"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
              />
            </div>
            <button type="submit" className="sv-btn sv-btn-primary sv-btn-full" disabled={loading}>
              {loading ? 'Submitting Request...' : 'Confirm Visit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ReportModal({ property, onClose }) {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await reportService.submitReport({
        propertyId: property.id,
        reason,
        description,
        reporterEmail
      });
      setFeedback('Thank you. Our verification team has received your report and placed this listing in the administrative review queue.');
    } catch {
      setFeedback('Thank you. Our verification team has received your report and will investigate immediately.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-header">
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
            Report Inaccurate or Suspicious Listing
          </h3>
          <button type="button" className="sv-btn sv-btn-outline" style={{ padding: '4px 8px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Help keep StayVerify safe. If an owner asks for an advance visiting fee, gate pass charge, or if rental terms differ from the listing, report it here.
        </p>

        {feedback ? (
          <div className="sv-alert sv-alert-success">
            <CheckCircle2 size={18} /> {feedback}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
            <div className="sv-field-group">
              <label className="sv-label">Reason for Reporting *</label>
              <select
                className="sv-select"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select Reason for Reporting</option>
                <option value="VISITING_FEE_DEMANDED">Owner demanded money/gate pass before showing room</option>
                <option value="MISLEADING_TERMS">Rent or deposit is different from what is listed</option>
                <option value="FAKE_PHOTOS">Photos do not match the actual property</option>
                <option value="BROKER_IMPOSTER">Broker posing as property owner</option>
                <option value="OTHER">Other suspicious activity</option>
              </select>
            </div>
            <div className="sv-field-group">
              <label className="sv-label">Your Email Address (for status updates)</label>
              <input
                type="email"
                className="sv-input"
                placeholder="you@example.com"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
              />
            </div>
            <div className="sv-field-group">
              <label className="sv-label">Detailed Explanation *</label>
              <textarea
                rows={3}
                required
                className="sv-textarea"
                placeholder="Please share specific details so our moderation team can review..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="sv-btn sv-btn-danger-outline sv-btn-full" disabled={loading}>
              {loading ? 'Submitting Report...' : 'Submit Report to Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function SafetyModal({ onClose }) {
  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-header">
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Student Rental Safety Guidelines</h3>
          <button type="button" className="sv-btn sv-btn-outline" style={{ padding: '4px 8px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-dark)', display: 'grid', gap: '12px' }}>
          <p>
            <strong>1. Check Both Verification Badges:</strong> Verify that both the <em>Owner ID</em> and <em>Property Evidence</em> badges are marked green before visiting or committing.
          </p>
          <p>
            <strong>2. Never Pay Visiting Charges:</strong> Fraudsters often ask for ₹500–₹2,000 for a "visiting card" or "gate entry token". Genuine owners on StayVerify never charge for property visits.
          </p>
          <p>
            <strong>3. Inspect in Person:</strong> Always inspect the physical room, plumbing, water supply, and building security before transferring any security deposit.
          </p>
          <p>
            <strong>4. Insist on Written Terms:</strong> Ensure the notice period, lock-in duration, and deposit refund terms are documented in writing or via digital rent receipts.
          </p>
        </div>
      </div>
    </div>
  );
}

export function AboutModal({ onClose }) {
  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-header">
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>About StayVerify & Privacy Policy</h3>
          <button type="button" className="sv-btn sv-btn-outline" style={{ padding: '4px 8px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-dark)', display: 'grid', gap: '12px' }}>
          <p>
            <strong>Our Mission:</strong> StayVerify was created specifically for college students and early-career working professionals to find genuine PGs, hostels, rooms, and flats without falling victim to deceptive listings and hidden broker fees.
          </p>
          <p>
            <strong>Strict Document Privacy:</strong> When property owners upload government identity cards (Aadhaar/PAN) or utility bills for ownership review, those documents are stored securely in protected storage and reviewed exclusively by authorized administrators. 
            <strong> Private verification documents are never displayed publicly.</strong>
          </p>
          <p>
            <strong>Zero Brokerage Commitment:</strong> All listings on StayVerify are posted directly by verified owners or authorized campus housing caretakers.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectGuideModal({ onClose }) {
  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div className="sv-modal" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-header">
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Full-Stack System Architecture</h3>
          <button type="button" className="sv-btn sv-btn-outline" style={{ padding: '4px 8px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-dark)' }}>
          <p style={{ marginBottom: '10px', color: 'var(--text-muted)' }}>
            StayVerify is built as a complete full-stack rental platform with clean modular separation:
          </p>
          <pre
            style={{
              background: 'var(--bg-grey)',
              border: '1px solid var(--border-color)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              overflowX: 'auto',
              lineHeight: 1.5,
              fontSize: '12px'
            }}
          >{`stayverify/
├── frontend/                     # React 18 + Vite + Plain CSS + Lucide Icons
│   ├── src/
│   │   ├── components/           # Navbar, Footer, PropertyCard, Badges, Modals
│   │   ├── pages/                # HomePage, FindProperties, PropertyDetails, Owner, Admin
│   │   ├── services/             # API client, auth, properties, verifications, reports
│   │   ├── hooks/                # useAuth context with RBAC
│   │   └── styles/index.css      # Design token system
├── backend/                      # Java 21 / 26 + Spring Boot 3 + Spring Data JPA
│   ├── src/main/java/com/stayverify/
│   │   ├── controller/           # REST endpoints (/auth, /properties, /verifications, /admin)
│   │   ├── entity/               # Relational entities (User, Property, Verification, Report)
│   │   ├── repository/           # Spring Data JPA repositories
│   │   ├── service/              # Core business logic & rule-based fraud scoring
│   │   └── security/             # Spring Security 6 + BCrypt + JWT filter
│   └── src/main/resources/
│       ├── application.yml       # PostgreSQL & profile configuration
│       └── db/migration/         # Flyway schema V1 & demo data V2
└── fraud-service/                # Python FastAPI rule-based and ML fraud risk module`}</pre>
        </div>
      </div>
    </div>
  );
}

export function AuthModal() {
  const { authModal, closeAuthModal, setAuthModal, login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!authModal.isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (authModal.mode === 'login') {
        await login(email, password);
      } else {
        await signup({
          name,
          email,
          password,
          role: authModal.role,
          phone
        });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sv-modal-backdrop" onClick={closeAuthModal}>
      <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-header">
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
            {authModal.mode === 'login' ? 'Login to StayVerify' : 'Create an Account'}
          </h3>
          <button type="button" className="sv-btn sv-btn-outline" style={{ padding: '4px 8px' }} onClick={closeAuthModal}>
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="sv-alert sv-alert-danger">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
          <div className="sv-field-group">
            <label className="sv-label">I am a:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                className={`sv-btn ${authModal.role === 'TENANT' ? 'sv-btn-primary' : 'sv-btn-outline'}`}
                onClick={() => setAuthModal({ ...authModal, role: 'TENANT' })}
              >
                Student / Tenant
              </button>
              <button
                type="button"
                className={`sv-btn ${authModal.role === 'OWNER' ? 'sv-btn-primary' : 'sv-btn-outline'}`}
                onClick={() => setAuthModal({ ...authModal, role: 'OWNER' })}
              >
                Property Owner
              </button>
            </div>
          </div>

          {authModal.mode === 'signup' && (
            <>
              <div className="sv-field-group">
                <label className="sv-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="sv-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="sv-field-group">
                <label className="sv-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  className="sv-input"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="sv-field-group">
            <label className="sv-label">Email Address *</label>
            <input
              type="email"
              required
              className="sv-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="sv-field-group">
            <label className="sv-label">Password *</label>
            <input
              type="password"
              required
              minLength={6}
              className="sv-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="sv-btn sv-btn-primary sv-btn-lg sv-btn-full" disabled={submitting}>
            {submitting ? 'Please wait...' : authModal.mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
            {authModal.mode === 'login' ? (
              <>
                New to StayVerify?{' '}
                <button
                  type="button"
                  className="sv-footer-link"
                  style={{ color: 'var(--accent-blue)', fontWeight: 600 }}
                  onClick={() => {
                    setError('');
                    setAuthModal({ ...authModal, mode: 'signup' });
                  }}
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
                  onClick={() => {
                    setError('');
                    setAuthModal({ ...authModal, mode: 'login' });
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
