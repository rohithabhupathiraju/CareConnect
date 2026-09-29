import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../../context/AppContext';
import { X, Download, Share2, ShieldCheck, AlertTriangle, Building2 } from 'lucide-react';

export const QRModal: React.FC = () => {
  const {
    isQRModalOpen,
    setIsQRModalOpen,
    qrModalType,
    currentProfile,
    showToast
  } = useApp();

  if (!isQRModalOpen) return null;

  const isEmergency = qrModalType === 'emergency';
  const qrValue = isEmergency
    ? `CARECONNECT-EMERGENCY:${currentProfile.healthId};NAME:${currentProfile.name};BLOOD:${currentProfile.bloodGroup};ALLERGIES:${currentProfile.allergies.join(',')};CONDITIONS:${currentProfile.conditions.join(',')};CONTACT:${currentProfile.emergencyContact.phone}`
    : `CARECONNECT-ID:${currentProfile.healthId};PATIENT:${currentProfile.name};BLOOD:${currentProfile.bloodGroup};HOSPITALS:Apollo,CARE,Yashoda`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
        {/* Header */}
        <div
          className={`p-5 flex items-center justify-between text-white ${
            isEmergency ? 'bg-gradient-to-r from-rose-600 to-red-700' : 'bg-gradient-to-r from-teal-600 to-cyan-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              {isEmergency ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">
                {isEmergency ? 'EMERGENCY PROFILE QR' : 'DIGITAL HEALTH ID CARD'}
              </h3>
              <p className="text-xs opacity-90 font-medium">
                {isEmergency ? 'First-Responder Instant Scan Access' : 'Connected Cross-Hospital Health Record'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsQRModalOpen(false)}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center">
          {/* Patient Card Preview */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-5 text-left relative overflow-hidden">
            <div className="flex items-center gap-3">
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-500 shadow-2xs"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{currentProfile.name}</h4>
                <p className="text-xs text-slate-500">
                  {currentProfile.gender} · {currentProfile.age} yrs · Blood Group: <span className="font-bold text-rose-600">{currentProfile.bloodGroup}</span>
                </p>
                <p className="text-xs font-mono font-bold text-teal-700 mt-1">
                  {currentProfile.healthId}
                </p>
              </div>
            </div>

            {isEmergency ? (
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-1">
                <p className="text-rose-600 font-bold">⚠ Allergies: {currentProfile.allergies.join(', ')}</p>
                <p className="text-slate-700 font-semibold">Conditions: {currentProfile.conditions.join(', ')}</p>
                <p className="text-slate-600">Emergency Contact: {currentProfile.emergencyContact.name} ({currentProfile.emergencyContact.phone})</p>
              </div>
            ) : (
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs">
                <p className="text-slate-500 font-medium mb-1">Connected Hospitals:</p>
                <div className="flex flex-wrap gap-1">
                  {currentProfile.connectedHospitals.map(h => (
                    <span key={h} className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-teal-600" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white border-2 border-dashed border-teal-200 rounded-2xl inline-block shadow-inner mb-4">
            <QRCodeSVG
              value={qrValue}
              size={180}
              bgColor={"#ffffff"}
              fgColor={isEmergency ? "#dc2626" : "#0d9488"}
              level={"H"}
              includeMargin={true}
            />
          </div>

          <p className="text-xs text-slate-500 font-medium mb-6">
            {isEmergency
              ? 'Scan this QR code during emergencies for instant verified medical profile access without password delays.'
              : 'Show this QR code at participating Apollo, CARE, or Yashoda hospital desks for instant record synchronization.'}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => showToast('✓ QR Code downloaded to device!', 'success')}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-600/20"
            >
              <Download className="w-4 h-4" />
              Download QR
            </button>

            <button
              onClick={() => showToast('✓ Secure Health ID link copied to clipboard!', 'info')}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-200"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              Share Health ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
