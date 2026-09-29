import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Download, Share2, Building2, Lock, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

export const HealthIDPage: React.FC = () => {
  const { currentProfile, showToast } = useApp();
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    'Apollo Hospitals': true,
    'CARE Hospitals': true,
    'Yashoda Hospitals': true
  });

  const togglePermission = (orgName: string) => {
    setPermissions(prev => {
      const next = { ...prev, [orgName]: !prev[orgName] };
      showToast(`${!prev[orgName] ? 'Granted' : 'Revoked'} access for ${orgName}`, !prev[orgName] ? 'success' : 'info');
      return next;
    });
  };

  const qrValue = `CARECONNECT-ID:${currentProfile.healthId};PATIENT:${currentProfile.name};BLOOD:${currentProfile.bloodGroup};HOSPITALS:${currentProfile.connectedHospitals.join(',')}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Centered Digital Health ID Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-8 shadow-2xl border border-teal-500/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl tracking-tight text-white">CARECONNECT HEALTH ID</h2>
              <p className="text-xs text-teal-300 font-medium">Unified Cross-Organization Patient Card</p>
            </div>
          </div>

          <div className="bg-teal-500/20 text-teal-300 border border-teal-400/30 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            NATIONAL COMPLIANT
          </div>
        </div>

        {/* Main Card Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Patient Details */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-teal-500 shadow-md"
              />
              <div>
                <h3 className="text-2xl font-black text-white">{currentProfile.name}</h3>
                <p className="text-sm text-slate-300 font-semibold">
                  {currentProfile.gender} · {currentProfile.age} yrs
                </p>
                <div className="mt-2 inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-lg text-xs font-bold">
                  Blood Group: <span className="font-extrabold text-white">{currentProfile.bloodGroup}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 font-mono">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">CARECONNECT HEALTH ID NUMBER</p>
              <p className="text-xl font-extrabold text-teal-300 tracking-wider mt-0.5">
                {currentProfile.healthId}
              </p>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-4 rounded-2xl border-4 border-teal-500/40 text-center shadow-lg mx-auto">
            <QRCodeSVG
              value={qrValue}
              size={150}
              bgColor={"#ffffff"}
              fgColor={"#0d9488"}
              level={"H"}
              includeMargin={true}
            />
            <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wider">
              SCAN AT HOSPITAL DESK
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-wrap gap-3">
          <button
            onClick={() => showToast('✓ QR Code saved to device downloads!', 'success')}
            className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            Download QR
          </button>

          <button
            onClick={() => showToast('✓ Health ID shareable link copied to clipboard!', 'info')}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            Share Health ID
          </button>

          <button
            onClick={() => showToast('🔒 Security access permissions active.', 'info')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl text-xs flex items-center gap-2 transition-all border border-slate-700"
          >
            <Lock className="w-4 h-4 text-teal-400" />
            Manage Access
          </button>
        </div>
      </div>

      {/* Connected Healthcare Organizations Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">CONNECTED HEALTHCARE ORGANIZATIONS</h3>
            <p className="text-xs text-slate-500 font-medium">
              "Your records stay connected across participating healthcare organizations."
            </p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            3 Connected Networks
          </span>
        </div>

        <div className="space-y-3">
          {currentProfile.connectedHospitals.map(org => {
            const hasAccess = permissions[org] !== false;
            return (
              <div
                key={org}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{org}</h4>
                    <p className="text-xs text-slate-500">Full EHR Sync · Lab Diagnostic Data · Appointments</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${hasAccess ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {hasAccess ? 'Access Granted' : 'Access Paused'}
                  </span>

                  <button
                    onClick={() => togglePermission(org)}
                    className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {hasAccess ? (
                      <ToggleRight className="w-8 h-8 text-teal-600" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
