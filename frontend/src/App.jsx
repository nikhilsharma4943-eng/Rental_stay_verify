import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FindProperties } from './pages/FindProperties';
import { PropertyDetails } from './pages/PropertyDetails';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthModal, SafetyModal, AboutModal, ProjectGuideModal } from './components/Modals';

export default function App() {
  const [modalType, setModalType] = useState(null); // 'safety' | 'about' | 'structure'

  return (
    <div className="sv-app">
      <Navbar onOpenProjectGuide={() => setModalType('structure')} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<FindProperties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer onOpenModal={(type) => setModalType(type)} />

      {/* Global Modals */}
      <AuthModal />
      {modalType === 'safety' && <SafetyModal onClose={() => setModalType(null)} />}
      {modalType === 'about' && <AboutModal onClose={() => setModalType(null)} />}
      {modalType === 'structure' && <ProjectGuideModal onClose={() => setModalType(null)} />}
    </div>
  );
}
