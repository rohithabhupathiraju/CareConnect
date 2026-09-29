import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Heart, Activity as GlucoseIcon, Scale, Wind, TrendingUp, TrendingDown } from 'lucide-react';

export const HealthSummaryRow: React.FC = () => {
  const { vitals, setActiveTab } = useApp();
  const latest = vitals[0] || {
    bpSystolic: 123,
    bpDiastolic: 83,
    heartRate: 72,
    glucose: 146,
    weight: 55,
    spO2: 98
  };

  const cards = [
    {
      label: 'Blood Pressure',
      value: `${latest.bpSystolic} / ${latest.bpDiastolic}`,
      unit: 'mmHg',
      status: 'Normal',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      trend: '↑ 4% from last week',
      trendUp: true,
      icon: Activity,
      iconBg: 'bg-teal-50 text-teal-600'
    },
    {
      label: 'Heart Rate',
      value: `${latest.heartRate}`,
      unit: 'BPM',
      status: 'Resting Normal',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      trend: 'Optimal rhythm',
      trendUp: false,
      icon: Heart,
      iconBg: 'bg-rose-50 text-rose-600'
    },
    {
      label: 'Blood Glucose',
      value: `${latest.glucose}`,
      unit: 'mg/dL',
      status: 'Post-meal',
      statusColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      trend: '↓ 7.5% improving',
      trendUp: false,
      icon: GlucoseIcon,
      iconBg: 'bg-amber-50 text-amber-600'
    },
    {
      label: 'Weight',
      value: `${latest.weight}`,
      unit: 'kg',
      status: 'Stable',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
      trend: 'Maintain baseline',
      trendUp: false,
      icon: Scale,
      iconBg: 'bg-indigo-50 text-indigo-600'
    },
    {
      label: 'SpO2 Oxygen',
      value: `${latest.spO2}`,
      unit: '%',
      status: 'Optimal',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      trend: '100% saturation',
      trendUp: false,
      icon: Wind,
      iconBg: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-2">
          HEALTH OVERVIEW
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
            Real-time Sync
          </span>
        </h3>
        <button
          onClick={() => setActiveTab('vitals')}
          className="text-xs text-teal-700 font-bold hover:underline"
        >
          View All Vitals →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 truncate">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${card.iconBg} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1 my-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</span>
                <span className="text-xs font-bold text-slate-600">{card.unit}</span>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px]">
                <span className={`px-1.5 py-0.5 rounded border font-semibold ${card.statusColor}`}>
                  {card.status}
                </span>
                <span className="text-slate-600 font-semibold flex items-center gap-0.5">
                  {card.trendUp ? <TrendingUp className="w-3 h-3 text-amber-500" /> : <TrendingDown className="w-3 h-3 text-emerald-500" />}
                  {card.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
