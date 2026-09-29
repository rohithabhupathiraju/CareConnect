import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, Building2, Stethoscope, ArrowRight } from 'lucide-react';

export const HeroActions: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Record Vitals */}
      <div
        onClick={() => setActiveTab('vitals')}
        className="bg-gradient-to-br from-teal-600 to-teal-700 text-white p-5 rounded-2xl shadow-lg shadow-teal-600/15 border border-teal-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
            <HeartPulse className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
            DAILY LOG
          </span>
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-white mb-1 tracking-tight">Record Vitals</h3>
          <p className="text-xs text-teal-100/90 font-medium mb-4">
            Track your latest blood pressure, glucose & heart rate.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Record Vitals</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Card 2: Find a Hospital */}
      <div
        onClick={() => setActiveTab('hospitals')}
        className="bg-gradient-to-br from-cyan-700 to-blue-800 text-white p-5 rounded-2xl shadow-lg shadow-cyan-700/15 border border-cyan-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
            NETWORK
          </span>
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-white mb-1 tracking-tight">Find a Hospital</h3>
          <p className="text-xs text-cyan-100/90 font-medium mb-4">
            Discover connected healthcare facilities & diagnostic labs near you.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Find Hospitals</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Card 3: Find a Doctor */}
      <div
        onClick={() => setActiveTab('doctors')}
        className="bg-gradient-to-br from-indigo-700 to-slate-900 text-white p-5 rounded-2xl shadow-lg shadow-indigo-700/15 border border-indigo-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
            <Stethoscope className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
            BOOKING
          </span>
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-white mb-1 tracking-tight">Find a Doctor</h3>
          <p className="text-xs text-indigo-100/90 font-medium mb-4">
            Find specialists, check live availability, and book appointments.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Find Doctor</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
