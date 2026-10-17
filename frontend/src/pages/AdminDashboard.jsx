import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, FileCheck, UserCheck, ShieldAlert, Check } from 'lucide-react';
import { verificationService } from '../services/verificationService';
import { reportService } from '../services/reportService';
import { propertyService } from '../services/propertyService';
import { INITIAL_PROPERTIES } from '../data/mockProperties';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('verifications'); // 'verifications' | 'reports' | 'fraud'
  const [verifications, setVerifications] = useState([]);
  const [reports, setReports] = useState([]);
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Initial demonstration queue items
    setVerifications([
      {
        id: 'ver-001',
        propertyId: 'prop-105',
        propertyTitle: 'Scholar Nest Co-ed PG',
        ownerName: 'Deepak Deshmukh',
        documentType: 'Electricity Bill (MSEDCL)',
        submittedDate: '2026-10-17',
        status: 'UNDER_REVIEW',
        notes: 'Utility bill submitted. Address matches Viman Nagar location.'
      },
      {
        id: 'ver-002',
        propertyId: 'prop-101',
        propertyTitle: 'Sunrise Student PG & Residency',
        ownerName: 'Rajesh Sharma',
        documentType: 'Municipal Property Tax & Aadhar',
        submittedDate: '2026-10-12',
        status: 'VERIFIED',
        notes: 'Fully verified by Admin on 2026-10-12.'
      }
    ]);

    setReports([
      {
        id: 'rep-001',
        propertyId: 'prop-105',
        propertyTitle: 'Scholar Nest Co-ed PG',
        reason: 'VISITING_FEE_DEMANDED',
        description: 'Caretaker requested ₹300 via UPI for a gate pass before showing the room.',
        reporterEmail: 'student.rahul@example.com',
        reportedDate: '2026-10-17',
        status: 'PENDING'
      }
    ]);

    async function loadProps() {
      try {
        const data = await propertyService.getProperties();
        setProperties(data);
      } catch {
        setProperties(INITIAL_PROPERTIES);
      }
    }
    loadProps();
  }, []);

  const handleApproveVerification = (verId) => {
    setVerifications(prev =>
      prev.map(v => (v.id === verId ? { ...v, status: 'VERIFIED', notes: 'Approved by Administrator.' } : v))
    );
    setMessage('Verification approved. Verification badges granted to listing.');
    setTimeout(() => setMessage(''), 4000);
  };

  const handleRejectVerification = (verId) => {
    setVerifications(prev =>
      prev.map(v => (v.id === verId ? { ...v, status: 'REJECTED', notes: 'Document rejected. Clearer proof requested.' } : v))
    );
    setMessage('Verification rejected. Owner notified to provide clear document.');
    setTimeout(() => setMessage(''), 4000);
  };

  const handleResolveReport = (repId, resolution) => {
    setReports(prev =>
      prev.map(r => (r.id === repId ? { ...r, status: resolution } : r))
    );
    setMessage(`Report marked as ${resolution}.`);
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <main className="sv-section">
      <div className="sv-container">
        <div className="sv-section-header">
          <div>
            <div className="sv-trust-pill" style={{ background: '#FFFBEB', color: '#B45309', borderColor: '#FDE68A' }}>
              <ShieldAlert size={15} /> Administrative Moderation Console
            </div>
            <h1 className="sv-section-title">Moderation & Verification Queue</h1>
            <p className="sv-section-subtitle">
              Review owner identity submissions, examine property evidence documents, and investigate tenant scam reports.
            </p>
          </div>
        </div>

        {message && (
          <div className="sv-alert sv-alert-success">
            <CheckCircle2 size={18} />
            <span>{message}</span>
          </div>
        )}

        {/* Admin Tabs */}
        <div className="sv-tabs">
          <button
            type="button"
            className={`sv-tab ${activeTab === 'verifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('verifications')}
          >
            Verification Requests ({verifications.filter(v => v.status === 'UNDER_REVIEW').length} Pending)
          </button>
          <button
            type="button"
            className={`sv-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Scam & Listing Reports ({reports.filter(r => r.status === 'PENDING').length} Active)
          </button>
          <button
            type="button"
            className={`sv-tab ${activeTab === 'fraud' ? 'active' : ''}`}
            onClick={() => setActiveTab('fraud')}
          >
            Rule-Based Fraud Risk Alerts
          </button>
        </div>

        {/* TAB 1: VERIFICATIONS QUEUE */}
        {activeTab === 'verifications' && (
          <div className="sv-table-wrap">
            <table className="sv-table">
              <thead>
                <tr>
                  <th>Property & Owner</th>
                  <th>Submitted Document</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Review Decision</th>
                </tr>
              </thead>
              <tbody>
                {verifications.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{item.propertyTitle}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Owner: {item.ownerName}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileCheck size={16} style={{ color: 'var(--accent-blue)' }} />
                        <span>{item.documentType}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '2px' }}>
                        (Private administrative record)
                      </div>
                    </td>
                    <td>{item.submittedDate}</td>
                    <td>
                      {item.status === 'VERIFIED' ? (
                        <span className="sv-badge sv-badge-verified">Approved</span>
                      ) : item.status === 'REJECTED' ? (
                        <span className="sv-badge sv-badge-rejected">Rejected</span>
                      ) : (
                        <span className="sv-badge sv-badge-pending">Under Review</span>
                      )}
                    </td>
                    <td>
                      {item.status === 'UNDER_REVIEW' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            className="sv-btn sv-btn-outline"
                            style={{ padding: '6px 12px', color: 'var(--green-text)', borderColor: 'var(--green-border)' }}
                            onClick={() => handleApproveVerification(item.id)}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            type="button"
                            className="sv-btn sv-btn-danger-outline"
                            style={{ padding: '6px 12px' }}
                            onClick={() => handleRejectVerification(item.id)}
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.notes}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: REPORTS QUEUE */}
        {activeTab === 'reports' && (
          <div className="sv-table-wrap">
            <table className="sv-table">
              <thead>
                <tr>
                  <th>Reported Property</th>
                  <th>Reason Category</th>
                  <th>Tenant Complaint Details</th>
                  <th>Date</th>
                  <th>Moderation Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((rep) => (
                  <tr key={rep.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{rep.propertyTitle}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>By: {rep.reporterEmail}</div>
                    </td>
                    <td>
                      <span className="sv-badge sv-badge-rejected">
                        {rep.reason}
                      </span>
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-dark)' }}>{rep.description}</div>
                    </td>
                    <td>{rep.reportedDate}</td>
                    <td>
                      {rep.status === 'PENDING' ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="sv-btn sv-btn-outline"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleResolveReport(rep.id, 'DISMISSED')}
                          >
                            Dismiss
                          </button>
                          <button
                            type="button"
                            className="sv-btn sv-btn-danger-outline"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleResolveReport(rep.id, 'SUSPENDED')}
                          >
                            Suspend Listing
                          </button>
                        </div>
                      ) : (
                        <span className="sv-badge sv-badge-neutral">{rep.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: RULE-BASED FRAUD RISK ALERTS */}
        {activeTab === 'fraud' && (
          <div style={{ display: 'grid', gap: '16px' }}>
            <div className="sv-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <ShieldCheck size={20} style={{ color: 'var(--accent-blue)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>StayVerify Automated Risk Indicators</h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Our rule engine analyzes rental rates against median market figures for Delhi North Campus, Koramangala, Kothrud, and Noida.
                Listings with pricing &gt;40% below locality average or missing utility deed matches are surfaced here for inspection.
              </p>
            </div>

            <div className="sv-table-wrap">
              <table className="sv-table">
                <thead>
                  <tr>
                    <th>Property Title</th>
                    <th>Locality & Type</th>
                    <th>Listed Rent</th>
                    <th>Risk Factor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => {
                    const isLowRent = Number(p.rent) < 7500 && p.type === 'Flat';
                    const isPending = !p.propertyEvidenceVerified;
                    return (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{p.title}</td>
                        <td>{p.location} ({p.type})</td>
                        <td>₹{Number(p.rent).toLocaleString('en-IN')}/mo</td>
                        <td>
                          {isLowRent ? (
                            <span className="sv-badge sv-badge-rejected">Unusually Low Rent for 2BHK Flat</span>
                          ) : isPending ? (
                            <span className="sv-badge sv-badge-pending">Unverified Utility Bill</span>
                          ) : (
                            <span className="sv-badge sv-badge-verified">Low Risk (Standard Pricing)</span>
                          )}
                        </td>
                        <td>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {p.fraudRiskNote || 'Routine checks complete'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
