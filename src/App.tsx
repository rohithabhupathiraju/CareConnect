import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoModeBanner } from './components/common/DemoModeBanner';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { QRModal } from './components/common/QRModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { SuccessToast } from './components/common/SuccessToast';

// Pages
import { PatientDashboard } from './components/pages/PatientDashboard';
import { VitalsPage } from './components/pages/VitalsPage';
import { MedicalTimelinePage } from './components/pages/MedicalTimelinePage';
import { HealthIDPage } from './components/pages/HealthIDPage';
import { HospitalsPage } from './components/pages/HospitalsPage';
import { DoctorDiscoveryPage } from './components/pages/DoctorDiscoveryPage';
import { AppointmentsPage } from './components/pages/AppointmentsPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { OCRPrescriptionPage } from './components/pages/OCRPrescriptionPage';
import { MedicinesPage } from './components/pages/MedicinesPage';
import { AIAssistantPage } from './components/pages/AIAssistantPage';
import { WomensHealthPage } from './components/pages/WomensHealthPage';
import { BloodDonationPage } from './components/pages/BloodDonationPage';
import { FamilyHistoryPage } from './components/pages/FamilyHistoryPage';
import { VaccinationTrackerPage } from './components/pages/VaccinationTrackerPage';
import { EmergencyPage } from './components/pages/EmergencyPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { DoctorDashboardView } from './components/pages/DoctorDashboardView';
import { OrgDashboardView } from './components/pages/OrgDashboardView';

const MainContent: React.FC = () => {
  const { persona, activeTab } = useApp();

  // If Doctor persona
  if (persona === 'doctor_priya' && activeTab === 'dashboard') {
    return <DoctorDashboardView />;
  }

  // If Org Admin persona
  if (persona === 'org_apollo' && activeTab === 'dashboard') {
    return <OrgDashboardView />;
  }

  // Patient Nav views
  switch (activeTab) {
    case 'dashboard':
      return <PatientDashboard />;
    case 'vitals':
      return <VitalsPage />;
    case 'trends':
      return <PatientDashboard />;
    case 'timeline':
      return <MedicalTimelinePage />;
    case 'health_id':
      return <HealthIDPage />;
    case 'hospitals':
      return <HospitalsPage />;
    case 'doctors':
      return <DoctorDiscoveryPage />;
    case 'appointments':
      return <AppointmentsPage />;
    case 'reports':
    case 'records':
      return <ReportsPage />;
    case 'ocr_prescription':
      return <OCRPrescriptionPage />;
    case 'medicines':
      return <MedicinesPage />;
    case 'ai_assistant':
      return <AIAssistantPage />;
    case 'womens_health':
      return <WomensHealthPage />;
    case 'blood_donation':
      return <BloodDonationPage />;
    case 'family_history':
      return <FamilyHistoryPage />;
    case 'vaccination':
      return <VaccinationTrackerPage />;
    case 'emergency':
      return <EmergencyPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <PatientDashboard />;
  }
};

const AppLayout: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Floating / Sticky Demo Mode Banner */}
      <DemoModeBanner />

      {/* Main App Layout Grid */}
      <div className="flex flex-1 relative">
        {/* Fixed Left Navigation Sidebar */}
        <Sidebar />

        {/* Right Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          {/* Top Header Toolbar */}
          <TopHeader />

          {/* Interactive Notifications Overlay Drawer */}
          <NotificationDrawer />

          {/* Main View Container */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
            <MainContent />
          </main>
        </div>
      </div>

      {/* Floating Bottom-Right "🤖 Ask CareConnect AI" Assistant Trigger Button */}
      {activeTab !== 'ai_assistant' && (
        <button
          onClick={() => setActiveTab('ai_assistant')}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold px-4 py-3 rounded-full shadow-2xl shadow-teal-700/40 border border-teal-400/40 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
        >
          <span className="text-xl group-hover:rotate-12 transition-transform">🤖</span>
          <span className="text-xs md:text-sm font-extrabold tracking-wide drop-shadow-xs">Ask CareConnect AI</span>
        </button>
      )}

      {/* Global Modals & Feedback Toasts */}
      <QRModal />
      <SuccessToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
