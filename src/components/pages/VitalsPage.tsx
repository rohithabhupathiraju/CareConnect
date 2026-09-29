import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, ArrowRight, CheckCircle2, History } from 'lucide-react';

export const VitalsPage: React.FC = () => {
  const { vitals, recordVital, setActiveTab } = useApp();
  const latest = vitals[0] || {
    bpSystolic: 123,
    bpDiastolic: 83,
    heartRate: 72,
    glucose: 146,
    glucoseType: 'Post-meal',
    spO2: 98,
    weight: 55,
    temp: 98.4,
    height: 165
  };

  const [bpSystolic, setBpSystolic] = useState<number>(latest.bpSystolic);
  const [bpDiastolic, setBpDiastolic] = useState<number>(latest.bpDiastolic);
  const [heartRate, setHeartRate] = useState<number>(latest.heartRate);
  const [glucose, setGlucose] = useState<number>(latest.glucose);
  const [glucoseType, setGlucoseType] = useState<'Fasting' | 'Post-meal' | 'Random'>(latest.glucoseType);
  const [spO2, setSpO2] = useState<number>(latest.spO2);
  const [weight, setWeight] = useState<number>(latest.weight);
  const [temp, setTemp] = useState<number>(latest.temp);
  const [height, setHeight] = useState<number>(latest.height);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateNow = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    recordVital({
      date: dateNow,
      time: timeNow,
      bpSystolic: Number(bpSystolic),
      bpDiastolic: Number(bpDiastolic),
      heartRate: Number(heartRate),
      glucose: Number(glucose),
      glucoseType,
      spO2: Number(spO2),
      weight: Number(weight),
      temp: Number(temp),
      height: Number(height)
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: Record Vitals */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">Record Vitals Log</h3>
              <p className="text-xs text-slate-500 font-medium">
                Enter your current health measurements. Values sync immediately with Trends & Timeline.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Blood Pressure Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Blood Pressure (mmHg)</span>
                <span className="text-teal-600 normal-case font-semibold text-[11px]">Normal Target: ~120/80</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    value={bpSystolic}
                    onChange={e => setBpSystolic(Number(e.target.value))}
                    placeholder="Systolic (120)"
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Systolic (Upper)</span>
                </div>
                <div>
                  <input
                    type="number"
                    value={bpDiastolic}
                    onChange={e => setBpDiastolic(Number(e.target.value))}
                    placeholder="Diastolic (80)"
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Diastolic (Lower)</span>
                </div>
              </div>
            </div>

            {/* Blood Glucose */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Blood Glucose (mg/dL)</span>
                <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-600">
                  {(['Fasting', 'Post-meal', 'Random'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setGlucoseType(t)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        glucoseType === t ? 'bg-teal-600 text-white shadow-2xs font-extrabold' : 'hover:text-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </label>
              <input
                type="number"
                value={glucose}
                onChange={e => setGlucose(Number(e.target.value))}
                placeholder="Glucose reading"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            {/* Heart Rate & SpO2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Heart Rate (BPM)
                </label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={e => setHeartRate(Number(e.target.value))}
                  placeholder="72"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  SpO2 Oxygen (%)
                </label>
                <input
                  type="number"
                  value={spO2}
                  onChange={e => setSpO2(Number(e.target.value))}
                  placeholder="98"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Weight, Temp, Height Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                  placeholder="55.0"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Temperature (°F)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={temp}
                  onChange={e => setTemp(Number(e.target.value))}
                  placeholder="98.4"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  placeholder="165"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-600/20 active:scale-[0.99]"
              >
                <CheckCircle2 className="w-5 h-5" />
                SAVE VITALS & SYNC RECORDS
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Live Latest Vitals Card & Recent History */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-5 rounded-2xl shadow-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-teal-300">LATEST RECORDED VITALS</h4>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-bold">
                {latest.time}
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-300">Blood Pressure</span>
                <span className="text-lg font-black text-white">{latest.bpSystolic}/{latest.bpDiastolic} <span className="text-xs text-teal-300">mmHg</span></span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-300">Glucose ({latest.glucoseType})</span>
                <span className="text-lg font-black text-amber-300">{latest.glucose} <span className="text-xs text-slate-300">mg/dL</span></span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-300">Heart Rate</span>
                <span className="text-lg font-black text-rose-400">{latest.heartRate} <span className="text-xs text-slate-300">BPM</span></span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-300">SpO2 Level</span>
                <span className="text-lg font-black text-emerald-400">{latest.spO2}%</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('trends')}
              className="mt-4 w-full bg-white/15 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
              View Analytics Trends
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Previous History List */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-xs">
              <History className="w-4 h-4 text-teal-600" />
              <span>Vitals Log History</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {vitals.slice(0, 4).map(v => (
                <div key={v.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{v.date}</p>
                    <p className="text-[10px] text-slate-400">{v.time} · {v.glucoseType}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-slate-900">{v.bpSystolic}/{v.bpDiastolic} mmHg</p>
                    <p className="text-[10px] text-teal-700 font-semibold">{v.glucose} mg/dL</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
