import React from 'react';
import { useApp } from '../../context/AppContext';
import { Syringe, CheckCircle2, Clock, AlertTriangle, Building2, MapPin } from 'lucide-react';

export const VaccinationTrackerPage: React.FC = () => {
  const { childVaccines, currentProfile } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-teal-900 text-white p-6 rounded-3xl shadow-xl border border-amber-500 flex items-center justify-between">
        <div>
          <span className="bg-white/20 text-white border border-white/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            CHILD IMMUNIZATION & VACCINE TRACKER
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2">
            Vaccination Tracker — {currentProfile.name}
          </h2>
          <p className="text-xs text-amber-100 font-medium mt-1">
            Official immunization records connected with Rainbow Children's & Apollo Hospitals.
          </p>
        </div>
      </div>

      {/* Vaccines Status Checklist */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-6">
        <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
          <Syringe className="w-5 h-5 text-amber-600" />
          IMMUNIZATION SCHEDULE CHECKLIST
        </h3>

        <div className="space-y-3">
          {childVaccines.map(vac => (
            <div
              key={vac.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                vac.status === 'COMPLETED'
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                  : vac.status === 'OVERDUE'
                  ? 'bg-rose-50/50 border-rose-200 text-rose-900'
                  : 'bg-amber-50/50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl text-white font-bold shrink-0 ${
                    vac.status === 'COMPLETED'
                      ? 'bg-emerald-600'
                      : vac.status === 'OVERDUE'
                      ? 'bg-rose-600'
                      : 'bg-amber-600'
                  }`}
                >
                  {vac.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : vac.status === 'OVERDUE' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{vac.name} ({vac.dose})</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Due Date: <span className="font-bold text-slate-800">{vac.dueDate}</span> {vac.givenDate ? `· Given on ${vac.givenDate}` : ''}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{vac.center}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                  vac.status === 'COMPLETED'
                    ? 'bg-emerald-600 text-white'
                    : vac.status === 'OVERDUE'
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-amber-500 text-slate-950'
                }`}
              >
                {vac.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Vaccination Centers */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            NEARBY VACCINATION CENTERS (DEMO DATA)
          </h3>
          <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded">
            HYDERABAD REGION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-slate-900 text-sm">Rainbow Children's Hospital</h4>
            <p className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Banjara Hills, Hyderabad · Open 24/7
            </p>
            <span className="text-teal-700 font-bold block pt-1">Pediatric Vaccine Desk Active</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-slate-900 text-sm">Apollo Hospitals Vaccine Clinic</h4>
            <p className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Jubilee Hills, Hyderabad · 09:00 AM - 06:00 PM
            </p>
            <span className="text-teal-700 font-bold block pt-1">Flu & Booster Doses Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
