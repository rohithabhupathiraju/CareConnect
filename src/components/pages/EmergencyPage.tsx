import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, QrCode, Phone, Info } from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const { currentProfile, setIsQRModalOpen, setQrModalType } = useApp();

  return (
    <div className="bg-gradient-to-br from-rose-950 via-rose-900 to-red-950 text-white p-6 md:p-8 rounded-3xl space-y-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-300 border border-rose-800 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-rose-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-xs text-rose-400 rounded-2xl border border-white/20 emergency-pulse">
            <AlertTriangle className="w-8 h-8 text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white tracking-tight">Emergency Profile</h2>
              <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                FIRST-RESPONDER READY
              </span>
            </div>
            <p className="text-xs text-rose-200 font-medium mt-1">
              Critical medical data instantly accessible via QR scan during trauma or emergency response.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setQrModalType('emergency');
            setIsQRModalOpen(true);
          }}
          className="bg-white text-rose-950 font-black py-3 px-5 rounded-2xl text-xs flex items-center gap-2 transition-all shadow-lg hover:bg-rose-100"
        >
          <QrCode className="w-5 h-5 text-rose-600" />
          GENERATE EMERGENCY QR
        </button>
      </div>

      {/* Main Large Emergency Profile Card */}
      <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/15 shadow-inner space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={currentProfile.avatar}
              alt={currentProfile.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-rose-500 shadow-md"
            />
            <div>
              <h3 className="text-2xl font-black text-white">{currentProfile.name}</h3>
              <p className="text-xs text-rose-200 font-semibold">{currentProfile.gender} · {currentProfile.age} yrs · Health ID: {currentProfile.healthId}</p>
              <div className="mt-2 inline-flex items-center gap-2 bg-rose-600 text-white px-3 py-1 rounded-lg text-xs font-black shadow-2xs">
                BLOOD GROUP: {currentProfile.bloodGroup}
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Allergies Box */}
          <div className="bg-rose-900/60 p-4 rounded-2xl border border-rose-700/60">
            <span className="text-[10px] font-extrabold uppercase text-rose-300 tracking-wider block mb-1">
              ⚠ KNOWN SEVERE ALLERGIES
            </span>
            <p className="text-lg font-black text-white">{currentProfile.allergies.join(', ')}</p>
            <p className="text-[10px] text-rose-200 mt-1">Anaphylaxis warning logged.</p>
          </div>

          {/* Medical Conditions */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-extrabold uppercase text-rose-300 tracking-wider block mb-1">
              CHRONIC MEDICAL CONDITIONS
            </span>
            <p className="text-lg font-black text-white">{currentProfile.conditions.join(', ')}</p>
            <p className="text-[10px] text-rose-200 mt-1">Respiratory precaution required.</p>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-extrabold uppercase text-rose-300 tracking-wider block mb-1">
              CURRENT ACTIVE MEDICINES
            </span>
            <p className="text-base font-extrabold text-white">Paracetamol 500 mg, Vitamin D3</p>
            <p className="text-[10px] text-rose-200 mt-1">Verified EHR list.</p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-5 rounded-2xl text-slate-900 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <Phone className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PRIMARY EMERGENCY CONTACT</span>
              <h4 className="font-extrabold text-base text-slate-900">{currentProfile.emergencyContact.name} ({currentProfile.emergencyContact.relation})</h4>
              <p className="text-sm font-mono font-bold text-rose-600">{currentProfile.emergencyContact.phone}</p>
            </div>
          </div>

          <a
            href={`tel:${currentProfile.emergencyContact.phone}`}
            className="bg-rose-600 hover:bg-rose-700 text-white font-black py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <Phone className="w-4 h-4" />
            CALL IMMEDIATELY
          </a>
        </div>
      </div>

      {/* Required Disclaimer */}
      <div className="pt-4 border-t border-rose-800/80 text-center text-xs text-rose-200 font-medium">
        <Info className="w-4 h-4 inline mr-1 text-rose-300" />
        "Only information explicitly selected by you is shared via emergency paramedic scans."
      </div>
    </div>
  );
};
