import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroActions } from '../dashboard/HeroActions';
import { HealthSummaryRow } from '../dashboard/HealthSummaryRow';
import { HealthTrendsCard } from '../dashboard/HealthTrendsCard';
import { UpcomingAppointmentCard } from '../dashboard/UpcomingAppointmentCard';
import { YourProgressCard } from '../dashboard/YourProgressCard';
import { TodaysMedicinesCard } from '../dashboard/TodaysMedicinesCard';
import { TimelinePreviewCard } from '../dashboard/TimelinePreviewCard';
import { QrCode, ShieldCheck } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { currentProfile, setIsQRModalOpen, setQrModalType } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner with Health ID */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-6 rounded-3xl shadow-xl border border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-white">
                Good morning, {currentProfile.name.split(' ')[0]} 👋
              </h1>
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-400" />
                VERIFIED PATIENT
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium mt-1">
              "Here's your connected health overview for today."
            </p>
          </div>
        </div>

        {/* Top-Right Health ID Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setQrModalType('health_id');
              setIsQRModalOpen(true);
            }}
            className="bg-teal-600/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-xl border border-teal-400/40 flex items-center gap-2.5 transition-all shadow-md group"
          >
            <QrCode className="w-5 h-5 text-teal-300 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="text-[9px] uppercase font-bold text-teal-200 leading-none">ONE HEALTH ID</p>
              <p className="text-sm font-mono font-extrabold text-white leading-tight">
                {currentProfile.healthId}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Top 3 Action Cards */}
      <HeroActions />

      {/* Health Overview Horizontal Summary Cards */}
      <HealthSummaryRow />

      {/* Main Grid: 2-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Large Card: Health Trends */}
        <div className="lg:col-span-2">
          <HealthTrendsCard />
        </div>

        {/* Right Card: Upcoming Appointment */}
        <div>
          <UpcomingAppointmentCard />
        </div>
      </div>

      {/* Second Row Grid: Progress & Medicines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <YourProgressCard />
        <TodaysMedicinesCard />
      </div>

      {/* Bottom Timeline Preview */}
      <TimelinePreviewCard />
    </div>
  );
};
