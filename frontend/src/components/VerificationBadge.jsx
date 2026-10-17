import React from 'react';
import { UserCheck, FileCheck, Phone, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export function VerificationBadge({ type, status = 'VERIFIED', label, tooltip }) {
  if (status === 'UNDER_REVIEW' || status === 'PENDING') {
    return (
      <span className="sv-badge sv-badge-pending" title={tooltip || 'Documents are under administrator review'}>
        <Clock size={13} /> {label || 'Evidence Under Review'}
      </span>
    );
  }

  if (status === 'REJECTED') {
    return (
      <span className="sv-badge sv-badge-rejected" title={tooltip || 'Verification requires additional evidence'}>
        <AlertTriangle size={13} /> {label || 'Action Required'}
      </span>
    );
  }

  switch (type) {
    case 'ownerId':
      return (
        <span className="sv-badge sv-badge-verified" title={tooltip || 'Government ID checked by admin'}>
          <UserCheck size={13} /> {label || 'Owner ID Verified'}
        </span>
      );
    case 'propertyEvidence':
      return (
        <span className="sv-badge sv-badge-verified" title={tooltip || 'Ownership deed or utility bill verified'}>
          <FileCheck size={13} /> {label || 'Evidence Reviewed'}
        </span>
      );
    case 'contact':
      return (
        <span className="sv-badge sv-badge-verified" title={tooltip || 'Owner phone number confirmed via OTP'}>
          <Phone size={13} /> {label || 'Contact Verified'}
        </span>
      );
    case 'onSite':
      return (
        <span className="sv-badge sv-badge-verified" title={tooltip || 'Physical premises inspected'}>
          <CheckCircle2 size={13} /> {label || 'On-Site Verified'}
        </span>
      );
    default:
      return (
        <span className="sv-badge sv-badge-verified" title={tooltip || 'Verified'}>
          <CheckCircle2 size={13} /> {label || 'Verified'}
        </span>
      );
  }
}
