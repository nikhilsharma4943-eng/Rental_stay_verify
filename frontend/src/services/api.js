const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function request(endpoint, options = {}) {
  const token = localStorage.getItem('stayverify_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  // If body is FormData, let browser set boundary
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401) {
      // Clear token on unauthorized
      // localStorage.removeItem('stayverify_token');
      // localStorage.removeItem('stayverify_user');
    }

    const contentType = response.headers.get('content-type');
    let data = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMsg = (data && data.message) || (typeof data === 'string' && data) || response.statusText;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // Re-throw with consistent format
    throw err;
  }
}
