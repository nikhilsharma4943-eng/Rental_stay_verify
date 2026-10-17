import { request } from './api';
import { INITIAL_PROPERTIES } from '../data/mockProperties';

export const propertyService = {
  async getProperties(params = {}) {
    const query = new URLSearchParams();
    if (params.location) query.append('location', params.location);
    if (params.type && params.type !== 'All') query.append('type', params.type);
    if (params.minRent) query.append('minRent', params.minRent);
    if (params.maxRent) query.append('maxRent', params.maxRent);
    if (params.verifiedOnly) query.append('verifiedOnly', 'true');
    if (params.gender && params.gender !== 'All') query.append('gender', params.gender);
    if (params.availableOnly) query.append('availableOnly', 'true');
    if (params.sortBy) query.append('sortBy', params.sortBy);

    try {
      const qs = query.toString();
      const res = await request(`/properties${qs ? `?${qs}` : ''}`);
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.content)) return res.content;
      return res || INITIAL_PROPERTIES;
    } catch (err) {
      console.warn('Backend unavailable, falling back to local dataset:', err.message);
      // Fallback filtering on mock data
      return INITIAL_PROPERTIES;
    }
  },

  async getPropertyById(id) {
    try {
      return await request(`/properties/${id}`);
    } catch (err) {
      console.warn(`Could not fetch property ${id} from backend:`, err.message);
      const found = INITIAL_PROPERTIES.find(p => p.id === id);
      if (found) return found;
      throw err;
    }
  },

  async createProperty(propertyData) {
    return await request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData)
    });
  },

  async updateProperty(id, propertyData) {
    return await request(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData)
    });
  },

  async deleteProperty(id) {
    return await request(`/properties/${id}`, {
      method: 'DELETE'
    });
  },

  async toggleAvailability(id) {
    return await request(`/properties/${id}/toggle-availability`, {
      method: 'PATCH'
    });
  },

  async getMyProperties() {
    try {
      return await request('/properties/my-listings');
    } catch (err) {
      console.warn('Could not fetch owner listings:', err.message);
      return [];
    }
  }
};
