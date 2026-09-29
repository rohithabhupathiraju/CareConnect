import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  HeartPulse,
  LineChart,
  Building2,
  Stethoscope,
  Calendar,
  FileText,
  Pill,
  FileSpreadsheet,
  Bot,
  Droplet,
  Users,
  Flower2,
  Syringe,
  AlertTriangle,
  QrCode,
  Settings,
  ChevronRight,
  ShieldCheck,
  Scan
} from 'lucide-react';
import type { NavTab } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    persona,
    activeTab,
    setActiveTab,
    currentProfile,
    setIsQRModalOpen,
    setQrModalType
  } = useApp();

  const isDoctorOrOrg = persona === 'doctor_priya' || persona === 'org_apollo';
  const isChild = persona === 'child_aarav';
  const isMale = persona === 'patient_arjun';

  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard, category: 'main' },
    { id: 'vitals' as NavTab, label: 'Record Vitals', icon: HeartPulse, category: 'health' },
    { id: 'trends' as NavTab, label: 'Health Trends', icon: LineChart, category: 'health' },
    { id: 'timeline' as NavTab, label: 'Medical Timeline', icon: FileText, category: 'health' },
    { id: 'hospitals' as NavTab, label: 'Nearby Hospitals', icon: Building2, category: 'care' },
    { id: 'doctors' as NavTab, label: 'Find Doctors', icon: Stethoscope, category: 'care' },
    { id: 'appointments' as NavTab, label: 'Appointments', icon: Calendar, category: 'care' },
    { id: 'reports' as NavTab, label: 'Medical Reports', icon: FileSpreadsheet, category: 'records' },
    { id: 'ocr_prescription' as NavTab, label: 'Digitize Prescription', icon: Scan, category: 'records' },
    { id: 'medicines' as NavTab, label: 'Medicines', icon: Pill, category: 'records' },
    { id: 'ai_assistant' as NavTab, label: 'AI Assistant', icon: Bot, category: 'tools' },
    { id: 'family_history' as NavTab, label: 'Family History', icon: Users, category: 'wellness' },
    ...(!isChild && !isMale ? [{ id: 'womens_health' as NavTab, label: "Women's Health", icon: Flower2, category: 'wellness' }] : []),
    ...(!isChild ? [{ id: 'blood_donation' as NavTab, label: 'Blood Donation', icon: Droplet, category: 'wellness' }] : []),
    ...(isChild || persona === 'patient_maya' ? [{ id: 'vaccination' as NavTab, label: 'Vaccination Tracker', icon: Syringe, category: 'wellness' }] : []),
    { id: 'emergency' as NavTab, label: 'Emergency Profile', icon: AlertTriangle, category: 'emergency' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-[calc(100vh-37px)] sticky top-[37px] z-30 select-none shadow-xs">
      {/* Top Header & Logo */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="font-extrabold text-lg text-slate-900 tracking-tight">CARECONNECT</h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[10px] font-medium text-slate-600 tracking-tight leading-none mt-0.5">
              "Your health. Your records. Your care."
            </p>
          </div>
        </div>

        {/* Health ID Badge Pill */}
        {!isDoctorOrOrg && (
          <button
            onClick={() => {
              setQrModalType('health_id');
              setIsQRModalOpen(true);
            }}
            className="mt-3.5 w-full bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/80 hover:border-teal-300 p-2 rounded-lg flex items-center justify-between text-left transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-teal-600 text-white group-hover:scale-105 transition-transform">
                <QrCode className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700 leading-tight">
                  HEALTH ID
                </p>
                <p className="text-xs font-mono font-bold text-slate-800 leading-none">
                  {currentProfile.healthId}
                </p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-teal-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isEmergency = item.id === 'emergency';
          const isWomens = item.id === 'womens_health';

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-xs transition-all text-left group ${
                isEmergency && isActive
                  ? 'bg-rose-600 text-white shadow-sm font-semibold'
                  : isEmergency
                  ? 'text-rose-600 hover:bg-rose-50 border border-rose-100 font-semibold'
                  : isWomens && isActive
                  ? 'bg-slate-900 text-amber-300 font-semibold shadow-sm'
                  : isActive
                  ? 'bg-teal-50 text-teal-700 font-semibold border-l-4 border-teal-600 pl-2'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive
                    ? isEmergency
                      ? 'text-white'
                      : isWomens
                      ? 'text-amber-400'
                      : 'text-teal-600'
                    : isEmergency
                    ? 'text-rose-600'
                    : 'text-slate-600'
                }`}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {item.id === 'womens_health' && (
                <span className="text-[10px] bg-slate-800 text-amber-300 px-1.5 py-0.2 rounded font-bold">🔒</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Profile Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={
                isDoctorOrOrg
                  ? persona === 'doctor_priya'
                    ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80'
                    : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&q=80'
                  : currentProfile.avatar
              }
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-teal-500 shadow-2xs"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">
                {isDoctorOrOrg
                  ? persona === 'doctor_priya'
                    ? 'Dr. Priya Sharma'
                    : 'Apollo Hospitals'
                  : currentProfile.name}
              </p>
              <p className="text-[10px] text-slate-600 truncate">
                {isDoctorOrOrg
                  ? persona === 'doctor_priya'
                    ? 'Gynecologist'
                    : 'Org Administrator'
                  : `${currentProfile.gender} · ${currentProfile.age} yrs`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            title="Settings"
            className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
