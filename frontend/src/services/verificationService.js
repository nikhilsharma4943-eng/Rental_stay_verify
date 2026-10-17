import { request } from './api';

export const verificationService = {
  async submitEvidence(evidenceData) {
    return await request('/verifications/submit', {
      method: 'POST',
      body: JSON.stringify(evidenceData)
    });
  },

  async getMyVerificationRequests() {
    return await request('/verifications/my-requests');
  },

  async getAdminQueue() {
    return await request('/admin/verifications/queue');
  },

  async reviewVerification(id, reviewData) {
    // reviewData: { status: 'APPROVED' | 'REJECTED' | 'ACTION_REQUIRED', notes: string, badgesGranted: string[] }
    return await request(`/admin/verifications/${id}/review`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }
};
