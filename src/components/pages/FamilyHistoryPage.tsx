import React from 'react';
import { Users, AlertCircle, Info, ChevronDown, Dna } from 'lucide-react';

export const FamilyHistoryPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-950 text-white p-6 rounded-3xl shadow-xl border border-indigo-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Dna className="w-3.5 h-3.5 text-indigo-300" />
              GENETICS & HEREDITARY TREE
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2">
            Family Health History
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            "Understand your family's recorded health history."
          </p>
        </div>
      </div>

      {/* Interactive Family Node Graph Tree */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-8">
        <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          MULTI-GENERATIONAL HEALTH PATTERN GRAPH
        </h3>

        {/* Tree Layout */}
        <div className="flex flex-col items-center space-y-6 relative max-w-2xl mx-auto">
          {/* Generation 1: Grandfather */}
          <div className="w-full max-w-sm bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-4 rounded-2xl border border-indigo-900 shadow-md text-center">
            <span className="text-[10px] font-bold uppercase text-indigo-300 tracking-wider">GENERATION 1 · PATERNAL GRANDFATHER</span>
            <h4 className="font-extrabold text-base text-white mt-0.5">Rameshwar Rao</h4>
            <div className="mt-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 py-1 px-3 rounded-lg text-xs font-bold inline-block">
              Condition: Hypertension & Coronary Artery Disease (Age 58)
            </div>
          </div>

          <ChevronDown className="w-6 h-6 text-indigo-400 animate-bounce" />

          {/* Generation 2: Father & Aunt Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400">GENERATION 2 · FATHER</span>
              <h4 className="font-bold text-sm text-slate-900 mt-0.5">Kishore Rao</h4>
              <div className="mt-2 bg-amber-100 text-amber-900 border border-amber-300 py-1 px-3 rounded-lg text-xs font-bold inline-block">
                Condition: Type 2 Diabetes Mellitus (Age 48)
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400">GENERATION 2 · MATERNAL AUNT</span>
              <h4 className="font-bold text-sm text-slate-900 mt-0.5">Sunita Reddy</h4>
              <div className="mt-2 bg-purple-100 text-purple-900 border border-purple-300 py-1 px-3 rounded-lg text-xs font-bold inline-block">
                Condition: Hypothyroidism (Age 35)
              </div>
            </div>
          </div>

          <ChevronDown className="w-6 h-6 text-teal-500" />

          {/* Generation 3: Maya (You) */}
          <div className="w-full max-w-sm bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-5 rounded-2xl shadow-xl border border-teal-400 text-center">
            <span className="text-[10px] font-bold uppercase text-teal-100 tracking-wider">GENERATION 3 · YOU</span>
            <h4 className="font-black text-lg text-white mt-0.5">Maya Rao</h4>
            <div className="mt-2 bg-white/20 text-white border border-white/30 py-1 px-3 rounded-lg text-xs font-bold inline-block">
              Status: Normal Baseline (Improving Glucose)
            </div>
          </div>
        </div>

        {/* Family Health Pattern Summary Box */}
        <div className="bg-indigo-50/80 border border-indigo-200 p-5 rounded-2xl text-xs text-indigo-950 space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-indigo-950">
              FAMILY HEALTH PATTERN SUMMARY
            </h4>
          </div>
          <p className="font-semibold text-slate-800 leading-relaxed">
            Cardiovascular conditions (Hypertension) and Metabolic disorders (Diabetes) are observed across paternal generations. Early quarterly vitals monitoring and balanced glucose nutrition are recommended.
          </p>
        </div>

        {/* Required Disclaimer */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
          <Info className="w-4 h-4 inline mr-1 text-slate-400" />
          "Some health conditions can run in families. Discuss your family history with your healthcare provider if you have concerns."
        </div>
      </div>
    </div>
  );
};
