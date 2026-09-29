import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Building2,
  Stethoscope,
  HeartPulse,
  Pill,
  Calendar,
  Droplet,
  Award,
  Filter,
  X,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import type { TimelineEvent } from '../../types';

export const MedicalTimelinePage: React.FC = () => {
  const { timeline, currentProfile, setIsQRModalOpen, setQrModalType } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const categories = ['All', 'Consultation', 'Vitals', 'Report', 'Prescription', 'Appointment', 'Blood Donation'];

  const filteredEvents = filterCategory === 'All'
    ? timeline
    : timeline.filter(t => t.category === filterCategory);

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'Consultation':
        return { bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: Stethoscope };
      case 'Vitals':
        return { bg: 'bg-rose-100 text-rose-800 border-rose-200', icon: HeartPulse };
      case 'Report':
        return { bg: 'bg-purple-100 text-purple-800 border-purple-200', icon: FileText };
      case 'Prescription':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Pill };
      case 'Appointment':
        return { bg: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: Calendar };
      case 'Blood Donation':
        return { bg: 'bg-red-100 text-red-800 border-red-200', icon: Droplet };
      default:
        return { bg: 'bg-teal-100 text-teal-800 border-teal-200', icon: Award };
    }
  };

  const getHospitalBadge = (hospital: string) => {
    if (hospital.includes('Apollo')) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (hospital.includes('CARE')) return 'bg-cyan-100 text-cyan-900 border-cyan-300';
    if (hospital.includes('Yashoda')) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    return 'bg-slate-100 text-slate-800 border-slate-300';
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner: One Health ID Cross-Hospital */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 text-white p-6 rounded-3xl shadow-xl border border-teal-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              ONE HEALTH ID CONNECTED ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2">
            Medical Timeline
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Records connected from multiple healthcare organizations using <span className="font-mono font-bold text-teal-300">{currentProfile.healthId}</span>.
          </p>
        </div>

        {/* Participating Hospital Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {currentProfile.connectedHospitals.map(h => (
            <div key={h} className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold text-teal-100">
              <Building2 className="w-4 h-4 text-teal-400" />
              {h}
            </div>
          ))}

          <button
            onClick={() => {
              setQrModalType('health_id');
              setIsQRModalOpen(true);
            }}
            className="p-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl transition-all shadow-md"
            title="View Health ID QR"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-teal-600" />
          <span>Filter Timeline:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Vertical Renderer */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-2xs relative">
        {/* Centered Line */}
        <div className="absolute left-8 md:left-1/2 top-10 bottom-10 w-0.5 bg-slate-200 -translate-x-1/2 hidden sm:block"></div>

        <div className="space-y-8 relative">
          {filteredEvents.map((item, idx) => {
            const badge = getBadgeStyle(item.category);
            const Icon = badge.icon;
            const hospitalBadgeClass = getHospitalBadge(item.hospital);
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 group`}
              >
                {/* Content Box */}
                <div className="w-full sm:w-[calc(50%-2rem)]">
                  <div
                    onClick={() => setSelectedEvent(item)}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-teal-50/40 border border-slate-200/80 hover:border-teal-300 transition-all cursor-pointer shadow-2xs group-hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-400">{item.time} · {item.date}</span>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold flex items-center gap-1 ${badge.bg}`}>
                        <Icon className="w-3 h-3" />
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-extrabold flex items-center gap-1 ${hospitalBadgeClass}`}>
                        <Building2 className="w-3 h-3" />
                        {item.hospital}
                      </span>

                      {item.doctor && (
                        <span className="text-[11px] font-semibold text-slate-500">
                          {item.doctor}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Node Center Badge */}
                <div className="w-10 h-10 rounded-full bg-white border-4 border-teal-500 text-teal-600 flex items-center justify-center shadow-md shrink-0 z-10 hidden sm:flex">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Empty side filler */}
                <div className="hidden sm:block w-[calc(50%-2rem)]"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold">
                {selectedEvent.category} Event Detail
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <h3 className="font-extrabold text-lg text-slate-900 mb-1">{selectedEvent.title}</h3>
            <p className="text-xs text-slate-400 font-medium mb-4">{selectedEvent.date} · {selectedEvent.time}</p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 mb-4">
              <p><span className="font-bold text-slate-700">Hospital:</span> {selectedEvent.hospital}</p>
              {selectedEvent.doctor && <p><span className="font-bold text-slate-700">Doctor:</span> {selectedEvent.doctor}</p>}
              <p><span className="font-bold text-slate-700">Summary:</span> {selectedEvent.summary}</p>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors"
            >
              Close Event Detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
