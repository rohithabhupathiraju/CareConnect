import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flower2, Lock, Calendar, Info, Sparkles } from 'lucide-react';

export const WomensHealthPage: React.FC = () => {
  const { currentProfile, showToast } = useApp();
  const [selectedFlow, setSelectedFlow] = useState<string>('Medium');
  const [selectedSpotting, setSelectedSpotting] = useState<string>('Red');

  const dates = Array.from({ length: 14 }, (_, i) => 20 + i); // 20 to 33 Sept

  return (
    <div className="bg-slate-950 text-slate-100 p-6 md:p-8 rounded-3xl space-y-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-300 border border-slate-800 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-950 text-rose-400 rounded-2xl border border-rose-900/60">
            <Flower2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white tracking-tight">Women's Health & Cycle Tracker</h2>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Private 🔒
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Encrypted reproductive cycle tracking for {currentProfile.name}.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-xs text-slate-400 font-mono">
          Last Period: <span className="font-bold text-rose-400">04 Sept 2026</span>
        </div>
      </div>

      {/* Cycle Progress Ring Card */}
      <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 text-center max-w-xl mx-auto shadow-inner relative overflow-hidden">
        <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
          {/* Circular SVG Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-slate-800 stroke-current"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-teal-500 stroke-current"
              strokeWidth="8"
              strokeDasharray="264"
              strokeDashoffset="75"
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Info */}
          <div className="absolute text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Today, 26 September</p>
            <p className="text-3xl font-black text-white my-1">8 Days</p>
            <p className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">Until Next Period</p>
            <p className="text-[10px] text-slate-500 mt-1 font-semibold">Luteal Phase (Day 23)</p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-slate-850 rounded-xl border border-slate-800 text-xs text-slate-300">
          <p className="font-bold text-white mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            About the Luteal Phase:
          </p>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Progesterone levels rise during the luteal phase to prepare the uterine lining. You may experience mild energy shifts.
          </p>
        </div>
      </div>

      {/* Calendar Strip */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-400" />
            September 2026 Cycle Calendar
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Cycle Length: 28 Days</span>
        </div>

        <div className="flex gap-2 overflow-x-auto py-2">
          {dates.map(d => {
            const isPeriod = d >= 4 && d <= 8;
            const isToday = d === 26;
            const isPredicted = d >= 31 || d === 30;

            return (
              <div
                key={d}
                onClick={() => showToast(`Logged cycle data for Sept ${d}`, 'info')}
                className={`flex-1 min-w-[50px] p-3 rounded-2xl text-center border cursor-pointer transition-all ${
                  isToday
                    ? 'bg-slate-800 border-2 border-teal-400 text-white font-black scale-105'
                    : isPeriod
                    ? 'bg-rose-950 border-rose-700 text-rose-200'
                    : isPredicted
                    ? 'bg-teal-950/60 border-teal-800 text-teal-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <p className="text-[10px] font-bold uppercase text-slate-500">Sept</p>
                <p className="text-base font-extrabold my-0.5">{d}</p>
                <div className="flex justify-center">
                  {isPeriod ? (
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  ) : isPredicted ? (
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  ) : isToday ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-transparent"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Symptom & Flow Logging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flow Selector */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Flow Intensity Log</h4>
          <div className="grid grid-cols-2 gap-2">
            {['Light', 'Medium', 'Heavy', 'Super Heavy'].map(f => (
              <button
                key={f}
                onClick={() => setSelectedFlow(f)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedFlow === f
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Spotting Selector */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Spotting Log</h4>
          <div className="grid grid-cols-2 gap-2">
            {['Red Spotting', 'Brown Spotting', 'None'].map(s => (
              <button
                key={s}
                onClick={() => setSelectedSpotting(s)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedSpotting === s
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500 font-medium">
        <Info className="w-4 h-4 inline mr-1 text-slate-400" />
        "Predictions are estimates based on logged data."
      </div>
    </div>
  );
};
