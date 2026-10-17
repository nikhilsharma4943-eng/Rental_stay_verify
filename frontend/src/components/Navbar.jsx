import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, FolderTree, Menu, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar({ onOpenProjectGuide }) {
  const { user, isAuthenticated, isAdmin, isOwner, logout, openLogin, openSignup } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sv-navbar">
      <div className="sv-container sv-nav-inner">
        <NavLink to="/" className="sv-logo">
          <div className="sv-logo-icon">
            <ShieldCheck size={20} />
          </div>
          <span>StayVerify</span>
        </NavLink>

        <nav className="sv-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `sv-nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) => `sv-nav-link ${isActive ? 'active' : ''}`}
          >
            Find Properties
          </NavLink>
          <NavLink
            to="/owner"
            className={({ isActive }) => `sv-nav-link ${isActive ? 'active' : ''}`}
          >
            List Your Property
          </NavLink>
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `sv-nav-link ${isActive ? 'active' : ''}`}
              style={{ color: '#B45309' }}
            >
              <ShieldAlert size={15} /> Admin Moderation
            </NavLink>
          )}
        </nav>

        <div className="sv-nav-auth">
          <button
            type="button"
            className="sv-btn sv-btn-outline"
            onClick={onOpenProjectGuide}
            title="View Full-Stack System Architecture & Local Setup"
          >
            <FolderTree size={15} /> Project Guide
          </button>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>
                Hi, {user.name} ({user.role === 'ADMIN' ? 'Admin' : user.role === 'OWNER' ? 'Owner' : 'Student'})
              </span>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="sv-btn sv-btn-outline"
                onClick={() => openLogin('TENANT')}
              >
                Login
              </button>
              <button
                type="button"
                className="sv-btn sv-btn-primary"
                onClick={() => openSignup('TENANT')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="sv-mobile-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', background: '#FFF', display: 'grid', gap: '10px' }}>
          <NavLink 
            to="/" 
            end
            className="sv-btn sv-btn-outline sv-btn-full" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/properties" 
            className="sv-btn sv-btn-outline sv-btn-full" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Find Properties
          </NavLink>
          <NavLink 
            to="/owner" 
            className="sv-btn sv-btn-outline sv-btn-full" 
            onClick={() => setMobileMenuOpen(false)}
          >
            List Your Property
          </NavLink>
          {isAdmin && (
            <NavLink 
              to="/admin" 
              className="sv-btn sv-btn-blue-outline sv-btn-full" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Moderation
            </NavLink>
          )}
          <button
            type="button"
            className="sv-btn sv-btn-outline sv-btn-full"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenProjectGuide();
            }}
          >
            <FolderTree size={15} /> Project Guide
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
            {isAuthenticated ? (
              <button
                type="button"
                className="sv-btn sv-btn-danger-outline sv-btn-full"
                style={{ gridColumn: 'span 2' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout ({user.name})
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="sv-btn sv-btn-outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLogin('TENANT');
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="sv-btn sv-btn-primary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSignup('TENANT');
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
