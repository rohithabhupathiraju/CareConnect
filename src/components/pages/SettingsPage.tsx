import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Lock, Globe } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentProfile, language, setLanguage, showToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-3 bg-slate-100 text-slate-800 rounded-2xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">CareConnect Account Settings</h3>
            <p className="text-xs text-slate-500 font-medium">Manage security preferences, connected healthcare networks, and notification alerts.</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={currentProfile.avatar} alt={currentProfile.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500 shadow-2xs" />
            <div>
              <h4 className="font-bold text-slate-900 text-base">{currentProfile.name}</h4>
              <p className="text-xs text-slate-500">{currentProfile.gender} · {currentProfile.age} yrs · Health ID: <span className="font-mono font-bold text-teal-700">{currentProfile.healthId}</span></p>
            </div>
          </div>
          <button
            onClick={() => showToast('Profile details locked by ABDM verification.', 'info')}
            className="bg-white border border-slate-200 text-slate-700 font-bold px-3.5 py-1.5 rounded-xl text-xs"
          >
            Verified Identity
          </button>
        </div>

        {/* Language Selection */}
        <div className="space-y-3 pt-2">
          <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-600" />
            UI & AI Language Preference
          </h4>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'EN', label: 'English', sub: 'Standard' },
              { id: 'TE', label: 'తెలుగు', sub: 'Telugu Native' },
              { id: 'HI', label: 'हिन्दी', sub: 'Hindi Native' }
            ].map(l => (
              <button
                key={l.id}
                onClick={() => {
                  setLanguage(l.id as any);
                  showToast(`System language set to ${l.label}`, 'success');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  language === l.id
                    ? 'bg-teal-50 border-2 border-teal-600 text-teal-900 shadow-2xs font-extrabold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <p className="font-bold text-sm">{l.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{l.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Security & Access */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            Cross-Hospital Data Consent
          </h4>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900">Participating Hospital Encrypted Sharing</p>
              <p className="text-slate-500">Allow Apollo, CARE, and Yashoda Hospitals to sync lab & consultation records.</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full">
              ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
