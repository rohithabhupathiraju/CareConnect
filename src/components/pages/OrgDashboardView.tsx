import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Stethoscope, Calendar, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const OrgDashboardView: React.FC = () => {
  const { bloodRequests, doctors } = useApp();

  const appointmentData = [
    { day: 'Mon', count: 120 },
    { day: 'Tue', count: 135 },
    { day: 'Wed', count: 150 },
    { day: 'Thu', count: 142 },
    { day: 'Fri', count: 160 },
    { day: 'Sat', count: 110 },
    { day: 'Sun', count: 85 }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white p-6 rounded-3xl shadow-xl border border-indigo-900 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 flex items-center justify-center font-black">
            <Building2 className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Apollo Hospitals Admin Portal</h1>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                ORGANIZATION DASHBOARD
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Banjara Hills, Hyderabad · Integrated CareConnect EHR Node
            </p>
          </div>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-xs text-slate-200 font-mono">
          EHR Node Status: <span className="font-bold text-emerald-400">100% ONLINE</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Total Doctors Onboarding</p>
          <p className="text-3xl font-black text-slate-900 my-1">48</p>
          <p className="text-[10px] text-teal-700 font-semibold">Across 14 Specialties</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Today's Total Appointments</p>
          <p className="text-3xl font-black text-slate-900 my-1">142</p>
          <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% vs last week
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Completed Consultations</p>
          <p className="text-3xl font-black text-slate-900 my-1">98</p>
          <p className="text-[10px] text-indigo-700 font-semibold">96% Satisfaction Rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Open Blood Requests</p>
          <p className="text-3xl font-black text-rose-600 my-1">{bloodRequests.length}</p>
          <p className="text-[10px] text-rose-700 font-semibold">Active Donor Network Sync</p>
        </div>
      </div>

      {/* Analytics Chart & Doctors Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              APPOINTMENTS THIS WEEK
            </h3>
            <span className="text-xs font-bold text-slate-500">Weekly Volume Trend</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#ffffff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doctor Availability List */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              ACTIVE ON-DUTY DOCTORS
            </h3>

            <div className="space-y-3">
              {doctors.map(doc => (
                <div key={doc.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center gap-3">
                  <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-xl object-cover border border-teal-500" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{doc.name}</h4>
                    <p className="text-[10px] text-teal-700 font-semibold">{doc.specialty}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Available
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
