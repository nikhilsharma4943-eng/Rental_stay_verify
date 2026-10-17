import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredUser());
  const [token, setToken] = useState(() => localStorage.getItem('stayverify_token'));
  const [loading, setLoading] = useState(true);

  // Modal state
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' | 'signup'
    role: 'TENANT' // 'TENANT' | 'OWNER'
  });

  useEffect(() => {
    async function initUser() {
      if (token) {
        try {
          const freshUser = await authService.getCurrentUser();
          if (freshUser) {
            setUser(freshUser);
            localStorage.setItem('stayverify_user', JSON.stringify(freshUser));
          }
        } catch {
          // Token might have expired or backend unreachable
        }
      }
      setLoading(false);
    }
    initUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    setUser(res.user);
    setToken(res.token);
    setAuthModal({ ...authModal, isOpen: false });
    return res.user;
  };

  const signup = async (userData) => {
    const res = await authService.register(userData);
    setUser(res.user);
    setToken(res.token);
    setAuthModal({ ...authModal, isOpen: false });
    return res.user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const openLogin = (role = 'TENANT') => {
    setAuthModal({ isOpen: true, mode: 'login', role });
  };

  const openSignup = (role = 'TENANT') => {
    setAuthModal({ isOpen: true, mode: 'signup', role });
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isOwner: user?.role === 'OWNER' || user?.role === 'ADMIN',
    isAdmin: user?.role === 'ADMIN',
    login,
    signup,
    logout,
    authModal,
    openLogin,
    openSignup,
    closeAuthModal,
    setAuthModal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
