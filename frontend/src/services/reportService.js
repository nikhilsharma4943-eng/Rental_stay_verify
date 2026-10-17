import { request } from './api';

export const reportService = {
  async submitReport(reportData) {
    // reportData: { propertyId, reason, description, reporterEmail }
    return await request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData)
    });
  },

  async getAdminReports() {
    return await request('/admin/reports');
  },

  async updateReportStatus(id, statusData) {
    // statusData: { status: 'RESOLVED' | 'DISMISSED' | 'INVESTIGATING', notes }
    return await request(`/admin/reports/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(statusData)
    });
  }
};

export const visitService = {
  async requestVisit(visitData) {
    // visitData: { propertyId, preferredDate, preferredSlot, visitorName, visitorPhone, notes }
    return await request('/visits', {
      method: 'POST',
      body: JSON.stringify(visitData)
    });
  },

  async getMyVisits() {
    return await request('/visits/my-visits');
  },

  async getOwnerVisits() {
    return await request('/visits/owner-requests');
  },

  async updateVisitStatus(id, status) {
    return await request(`/visits/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }
};
