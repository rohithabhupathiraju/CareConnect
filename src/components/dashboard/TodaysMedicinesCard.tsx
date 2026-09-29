import React from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, Clock, Check, ArrowRight } from 'lucide-react';

export const TodaysMedicinesCard: React.FC = () => {
  const { medicines, markMedicineTaken, snoozeMedicine, setActiveTab, showToast } = useApp();

  const allDoses = medicines.flatMap(m =>
    m.scheduleTimes.map(st => ({
      medId: m.id,
      medName: m.name,
      dosage: m.dosage,
      timing: m.timing,
      prescribedBy: m.prescribedBy,
      schedId: st.id,
      time: st.time,
      label: st.label,
      taken: st.taken,
      snoozed: st.snoozed
    }))
  );

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">TODAY'S MEDICINES</h3>
              <p className="text-xs text-slate-500 font-medium">Prescribed daily dose schedule</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('medicines')}
            className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
          >
            All Medicines
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Medicines Schedule List */}
        <div className="space-y-2.5">
          {allDoses.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                item.taken
                  ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900'
                  : item.snoozed
                  ? 'bg-amber-50/50 border-amber-200/80 text-amber-900'
                  : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold font-mono text-center shrink-0 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-teal-600 mx-auto mb-0.5" />
                  {item.time}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-xs truncate">💊 {item.medName}</span>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                      {item.dosage}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {item.timing} · Prescribed by {item.prescribedBy}
                  </p>
                </div>
              </div>

              {/* Status / Actions */}
              <div>
                {item.taken ? (
                  <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    TAKEN
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => markMedicineTaken(item.medId, item.schedId)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-xs transition-colors shadow-2xs"
                    >
                      Taken
                    </button>
                    <button
                      onClick={() => snoozeMedicine(item.medId, item.schedId)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-2 py-1 rounded-lg text-xs transition-colors"
                      title="Snooze 30 mins"
                    >
                      Snooze
                    </button>
                    <button
                      onClick={() => showToast('Dose skipped.', 'info')}
                      className="text-[11px] text-slate-400 hover:text-slate-600 font-semibold px-1"
                    >
                      Skip
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 text-center border-t border-slate-100 mt-3">
        <p className="text-[11px] text-slate-500 font-medium">
          Automated dose notifications active via CareConnect App Sync.
        </p>
      </div>
    </div>
  );
};
