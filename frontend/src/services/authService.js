import { request } from './api';

export const authService = {
  async register(userData) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (data.token) {
      localStorage.setItem('stayverify_token', data.token);
      localStorage.setItem('stayverify_user', JSON.stringify(data.user));
    }
    return data;
  },

  async login(credentials) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (data.token) {
      localStorage.setItem('stayverify_token', data.token);
      localStorage.setItem('stayverify_user', JSON.stringify(data.user));
    }
    return data;
  },

  async getCurrentUser() {
    try {
      return await request('/auth/me');
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('stayverify_token');
    localStorage.removeItem('stayverify_user');
  },

  getStoredUser() {
    const u = localStorage.getItem('stayverify_user');
    if (!u) return null;
    try {
      return JSON.parse(u);
    } catch {
      return null;
    }
  }
};
