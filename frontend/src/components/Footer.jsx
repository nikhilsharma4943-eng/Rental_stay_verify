import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer({ onOpenModal }) {
  return (
    <footer className="sv-footer">
      <div className="sv-container">
        <div className="sv-footer-inner">
          <div>
            <Link to="/" className="sv-logo" style={{ fontSize: '18px', marginBottom: '4px' }}>
              <div className="sv-logo-icon" style={{ width: '28px', height: '28px' }}>
                <ShieldCheck size={16} />
              </div>
              <span>StayVerify</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Find Your Stay. Verify Before You Trust.
            </p>
          </div>

          <div className="sv-footer-links">
            <button type="button" className="sv-footer-link" onClick={() => onOpenModal('about')}>
              About
            </button>
            <button type="button" className="sv-footer-link" onClick={() => onOpenModal('safety')}>
              Safety Guidelines
            </button>
            <button type="button" className="sv-footer-link" onClick={() => onOpenModal('about')}>
              Privacy Policy
            </button>
            <button type="button" className="sv-footer-link" onClick={() => onOpenModal('about')}>
              Terms of Use
            </button>
            <button type="button" className="sv-footer-link" onClick={() => onOpenModal('structure')}>
              System Architecture
            </button>
          </div>
        </div>

        <div style={{ paddingTop: '20px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <span>© 2026 StayVerify Student & Professional Housing Platform.</span>
          <span>Zero Brokerage • Verified Owners • Transparent Rental Terms</span>
        </div>
      </div>
    </footer>
  );
}
