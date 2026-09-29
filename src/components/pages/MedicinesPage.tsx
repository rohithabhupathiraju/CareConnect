import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, Clock, Check, Bell, Building2, Plus } from 'lucide-react';

export const MedicinesPage: React.FC = () => {
  const { medicines, markMedicineTaken, snoozeMedicine, setActiveTab, showToast } = useApp();
  const [tab, setTab] = useState<'Current' | 'Past' | 'Reminders'>('Current');

  const filteredMeds = medicines.filter(m =>
    tab === 'Past' ? m.status === 'COMPLETED' : m.status === 'ACTIVE'
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header & Digitization Shortcut */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">ACTIVE MEDICINES & REMINDERS</h3>
            <p className="text-xs text-slate-500 font-medium">Track prescribed dosages and dose reminders</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('ocr_prescription')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          Digitize New Prescription (OCR)
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-2">
        {(['Current', 'Past', 'Reminders'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === t
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t} Medicines
          </button>
        ))}
      </div>

      {/* Medicines List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMeds.map(med => (
          <div
            key={med.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase">
                  {med.status}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Since {med.startDate}</span>
              </div>

              <h3 className="font-black text-lg text-slate-900">💊 {med.name}</h3>
              <p className="text-xs font-extrabold text-teal-700 mt-0.5">{med.dosage} · {med.frequency}</p>

              <div className="mt-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 text-xs space-y-1.5">
                <p className="text-slate-700"><span className="font-bold text-slate-900">Timing:</span> {med.timing}</p>
                <p className="text-slate-700"><span className="font-bold text-slate-900">Duration:</span> {med.duration}</p>
                <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-2">
                  <Building2 className="w-3.5 h-3.5" />
                  Prescribed by {med.prescribedBy} ({med.hospital})
                </p>
              </div>

              {/* Schedule list */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Daily Dose Times</p>
                <div className="space-y-2">
                  {med.scheduleTimes.map(st => (
                    <div key={st.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg text-xs">
                      <span className="font-mono font-bold text-slate-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        {st.time} ({st.label})
                      </span>

                      {st.taken ? (
                        <span className="text-emerald-700 font-extrabold text-[10px] bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          TAKEN
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => markMedicineTaken(med.id, st.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-md"
                          >
                            Mark Taken
                          </button>
                          <button
                            onClick={() => snoozeMedicine(med.id, st.id)}
                            className="bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded-md"
                          >
                            Snooze
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => showToast('🔔 Daily reminder active for ' + med.name, 'info')}
                className="bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all border border-teal-200"
              >
                <Bell className="w-3.5 h-3.5 text-teal-600" />
                Set Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
