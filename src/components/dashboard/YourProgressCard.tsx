import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, TrendingDown, CheckCircle2 } from 'lucide-react';

export const YourProgressCard: React.FC = () => {
  const { triggerProgressConfetti, showToast } = useApp();

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-teal-500/5 to-emerald-500/10 p-5 rounded-2xl border border-teal-200/80 shadow-2xs flex flex-col justify-between h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Sparkles className="w-28 h-28 text-teal-700" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎉</span>
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">YOUR PROGRESS</h3>
          </div>
          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
            <TrendingDown className="w-3 h-3" />
            IMPROVING TREND
          </span>
        </div>

        <p className="text-xs font-bold text-slate-800 leading-snug mb-4">
          "Your recent glucose readings show a steady, health-improving trend over the past 14 days."
        </p>

        {/* Comparison Row */}
        <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-teal-100 flex items-center justify-between gap-4 mb-4 shadow-2xs">
          <div className="text-center flex-1 border-r border-slate-200 pr-2">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Previous Week</p>
            <p className="text-lg font-black text-slate-600">168 <span className="text-xs font-medium">mg/dL</span></p>
          </div>

          <div className="text-center flex-1 pl-2">
            <p className="text-[10px] text-teal-700 font-bold uppercase">Current Week</p>
            <p className="text-2xl font-black text-emerald-600">146 <span className="text-xs font-bold">mg/dL</span></p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2">
        <p className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Goal: Maintain &lt;140 mg/dL
        </p>

        <button
          onClick={() => {
            triggerProgressConfetti();
            showToast('🎉 Celebration effect triggered! Great job maintaining your health routines!', 'success');
          }}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          Celebrate Milestone
        </button>
      </div>
    </div>
  );
};
