import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { AlertCircle, LineChart as ChartIcon, Info } from 'lucide-react';

export const HealthTrendsCard: React.FC = () => {
  const { vitals } = useApp();
  const [metric, setMetric] = useState<'bp' | 'glucose' | 'heartRate' | 'weight'>('bp');
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '3M' | '6M'>('30D');

  const chartData = vitals.map(v => ({
    date: v.date.replace(' 2026', ''),
    bpSystolic: v.bpSystolic,
    bpDiastolic: v.bpDiastolic,
    glucose: v.glucose,
    heartRate: v.heartRate,
    weight: v.weight
  })).reverse();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      {/* Header with Tabs & Time selector */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <ChartIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">HEALTH TRENDS</h3>
              <p className="text-xs text-slate-500 font-medium">Biometric progress visualization</p>
            </div>
          </div>

          {/* Timeframe selector */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-600">
            {(['7D', '30D', '3M', '6M'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  timeframe === tf ? 'bg-white text-teal-700 shadow-2xs font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-100 pb-3">
          {[
            { id: 'bp', label: 'Blood Pressure' },
            { id: 'glucose', label: 'Glucose' },
            { id: 'heartRate', label: 'Heart Rate' },
            { id: 'weight', label: 'Weight' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setMetric(t.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                metric === t.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Line Chart */}
      <div className="h-56 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#1e293b',
                borderRadius: '0.75rem',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '600'
              }}
            />
            {metric === 'bp' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="bpSystolic"
                  name="Systolic (mmHg)"
                  stroke="#0d9488"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0d9488' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="bpDiastolic"
                  name="Diastolic (mmHg)"
                  stroke="#0284c7"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#0284c7' }}
                />
              </>
            ) : metric === 'glucose' ? (
              <Line
                type="monotone"
                dataKey="glucose"
                name="Glucose (mg/dL)"
                stroke="#d97706"
                strokeWidth={3}
                dot={{ r: 4, fill: '#d97706' }}
                activeDot={{ r: 6 }}
              />
            ) : metric === 'heartRate' ? (
              <Line
                type="monotone"
                dataKey="heartRate"
                name="Heart Rate (BPM)"
                stroke="#e11d48"
                strokeWidth={3}
                dot={{ r: 4, fill: '#e11d48' }}
                activeDot={{ r: 6 }}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="weight"
                name="Weight (kg)"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4, fill: '#4f46e5' }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Health Trend Alert Box */}
      <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl mt-3 flex items-start gap-2.5 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-950">Health Trend Alert</p>
          <p className="text-[11px] text-amber-900/90 leading-tight">
            Your recent BP readings have been trending slightly higher than your recent recorded baseline.
          </p>
          <p className="text-[10px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Automated trend observation — not a diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
};
