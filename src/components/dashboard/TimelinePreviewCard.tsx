import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, ArrowRight, HeartPulse, Pill, Calendar, Building2 } from 'lucide-react';

export const TimelinePreviewCard: React.FC = () => {
  const { timeline, setActiveTab } = useApp();

  const getEventBadge = (category: string) => {
    switch (category) {
      case 'Vitals':
        return { icon: HeartPulse, bg: 'bg-rose-50 text-rose-600 border-rose-200' };
      case 'Prescription':
        return { icon: Pill, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
      case 'Appointment':
        return { icon: Calendar, bg: 'bg-blue-50 text-blue-600 border-blue-200' };
      default:
        return { icon: Building2, bg: 'bg-teal-50 text-teal-600 border-teal-200' };
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">CONNECTED MEDICAL TIMELINE</h3>
            <p className="text-xs text-slate-500 font-medium">Real-time health activity sequence across hospitals</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('timeline')}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
        >
          View Full Timeline
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {timeline.slice(0, 4).map((item, idx) => {
          const badge = getEventBadge(item.category);
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab('timeline')}
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200/80 hover:border-teal-200 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                <span className={`p-1 rounded-md border text-[10px] font-bold flex items-center gap-1 ${badge.bg}`}>
                  <Icon className="w-3 h-3" />
                  {item.category}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 mt-2 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                {item.hospital}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
