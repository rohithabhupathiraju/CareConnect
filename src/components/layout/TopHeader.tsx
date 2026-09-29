import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Globe,
  QrCode,
  ChevronDown
} from 'lucide-react';

export const TopHeader: React.FC = () => {
  const {
    persona,
    activeTab,
    language,
    setLanguage,
    searchQuery,
    setSearchQuery,
    currentProfile,
    notifications,
    setIsNotificationsOpen,
    isNotificationsOpen,
    setIsQRModalOpen,
    setQrModalType
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPageInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: persona === 'doctor_priya' ? 'Doctor Clinical Portal 👨‍⚕️' : persona === 'org_apollo' ? 'Organization Admin Dashboard 🏥' : `Good morning, ${currentProfile.name.split(' ')[0]} 👋`,
          subtitle: persona === 'doctor_priya' ? "Today's clinical schedule, patient queue, and action tools." : persona === 'org_apollo' ? "Hospital operations, appointments overview, and blood requests." : "Here's your connected health overview for today."
        };
      case 'vitals':
        return { title: 'Record Vitals', subtitle: 'Track your latest blood pressure, glucose, SpO2 & heart rate measurements.' };
      case 'trends':
        return { title: 'Health Trends & Analytics', subtitle: 'Biometric chart visualization and automated trend alerts.' };
      case 'timeline':
        return { title: 'Medical Timeline', subtitle: 'Your connected healthcare journey from multiple hospitals in one unified place.' };
      case 'health_id':
        return { title: 'Digital Health ID', subtitle: 'Unified cross-organization health profile (HID-2026-4821-9137).' };
      case 'doctors':
        return { title: 'Find a Doctor', subtitle: 'Discover trusted specialists, view real-time availability, and book appointments.' };
      case 'appointments':
        return { title: 'Appointments & Consultations', subtitle: 'Manage upcoming visits, past completed consultations, and doctor reviews.' };
      case 'reports':
        return { title: 'Medical Reports & Diagnostics', subtitle: 'View lab reports with plain-language AI medical summaries and dietary guidance.' };
      case 'ocr_prescription':
        return { title: 'Digitize Prescription (AI OCR)', subtitle: 'Upload handwritten prescriptions to extract medication names, doses, and schedules.' };
      case 'medicines':
        return { title: 'Medicines & Reminders', subtitle: 'Track active prescriptions, set daily dose notifications, and mark doses taken.' };
      case 'ai_assistant':
        return { title: 'CareConnect AI Health Assistant', subtitle: 'Ask multi-lingual questions about your verified health records.' };
      case 'blood_donation':
        return { title: 'Blood Donation Network', subtitle: 'Connect with local emergency blood requests and track your donor milestones.' };
      case 'family_history':
        return { title: 'Family Health History', subtitle: 'Interactive multi-generational pattern chart to understand hereditary risks.' };
      case 'womens_health':
        return { title: "Women's Health & Cycle Tracker 🔒", subtitle: 'Private cycle logging, symptom tracking, and luteal phase predictions.' };
      case 'vaccination':
        return { title: 'Vaccination Tracker', subtitle: 'Child immunization schedule, completed doses, and overdue reminders.' };
      case 'emergency':
        return { title: 'Emergency Profile & First-Responder QR 🚨', subtitle: 'Critical allergies, conditions, and emergency contact for instant paramedic access.' };
      case 'settings':
        return { title: 'Account Settings', subtitle: 'Manage access permissions, connected healthcare organizations, and notifications.' };
      default:
        return { title: 'CareConnect', subtitle: 'Your health. Your records. Your care.' };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-[37px] z-20 shadow-2xs">
      {/* Left Title & Subtitle */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          {title}
        </h2>
        <p className="text-xs text-slate-600 font-medium mt-0.5">{subtitle}</p>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search doctors, reports, vitals..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-56 pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all"
          />
        </div>

        {/* Health ID Quick Icon */}
        {persona.startsWith('patient') && (
          <button
            onClick={() => {
              setQrModalType('health_id');
              setIsQRModalOpen(true);
            }}
            title="View Health ID QR"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-xs font-bold hover:bg-teal-100 transition-colors shadow-2xs"
          >
            <QrCode className="w-4 h-4 text-teal-600" />
            <span className="hidden lg:inline font-mono">HID-2026</span>
          </button>
        )}

        {/* Language Selector */}
        <div className="relative group">
          <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer transition-colors border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'EN' ? 'English' : language === 'TE' ? 'తెలుగు' : 'हिन्दी'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg py-1 hidden group-hover:block z-50">
            <button
              onClick={() => setLanguage('EN')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-teal-50 flex items-center justify-between ${
                language === 'EN' ? 'text-teal-700 font-bold bg-teal-50/50' : 'text-slate-700'
              }`}
            >
              <span>English</span>
              {language === 'EN' && <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>}
            </button>
            <button
              onClick={() => setLanguage('TE')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-teal-50 flex items-center justify-between ${
                language === 'TE' ? 'text-teal-700 font-bold bg-teal-50/50' : 'text-slate-700'
              }`}
            >
              <span>తెలుగు (Telugu)</span>
              {language === 'TE' && <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>}
            </button>
            <button
              onClick={() => setLanguage('HI')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-teal-50 flex items-center justify-between ${
                language === 'HI' ? 'text-teal-700 font-bold bg-teal-50/50' : 'text-slate-700'
              }`}
            >
              <span>हिन्दी (Hindi)</span>
              {language === 'HI' && <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>}
            </button>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 relative transition-colors border border-slate-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={
              persona === 'doctor_priya'
                ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80'
                : persona === 'org_apollo'
                ? 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&q=80'
                : currentProfile.avatar
            }
            alt="User"
            className="w-8 h-8 rounded-full object-cover border-2 border-teal-500 shadow-2xs"
          />
          <div className="hidden xl:block">
            <p className="text-xs font-bold text-slate-800 leading-none">
              {persona === 'doctor_priya' ? 'Dr. Priya' : persona === 'org_apollo' ? 'Apollo Admin' : currentProfile.name}
            </p>
            <p className="text-[10px] text-slate-600 font-medium leading-none mt-1">
              {persona === 'doctor_priya' ? 'Clinical View' : persona === 'org_apollo' ? 'Apollo Org' : currentProfile.healthId}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
