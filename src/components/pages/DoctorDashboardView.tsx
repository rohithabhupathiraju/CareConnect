import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Clock,
  X,
  FileText,
  HeartPulse,
  Pill,
  Calendar,
  Droplet,
  ChevronRight
} from 'lucide-react';
import type { PatientProfile } from '../../types';
import { MAYA_PROFILE, ARJUN_PROFILE, AARAV_PROFILE } from '../../data/mockData';

export const DoctorDashboardView: React.FC = () => {
  const { showToast } = useApp();
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);
  const [clinicalNote, setClinicalNote] = useState<string>('');

  const patientQueue = [
    { profile: MAYA_PROFILE, time: '10:30 AM', type: 'In-Person', reason: 'Routine gynecology review', status: 'Waiting in Lobby' },
    { profile: ARJUN_PROFILE, time: '11:30 AM', type: 'In-Person', reason: 'BP monitoring & hypertension follow-up', status: 'Scheduled' },
    { profile: AARAV_PROFILE, time: '04:00 PM', type: 'In-Person', reason: 'Pediatric asthma check & vaccine review', status: 'Scheduled' }
  ];

  const handleSaveClinicalNotes = () => {
    if (!clinicalNote.trim()) return;
    showToast('✓ Clinical note saved to patient EHR!', 'success');
    setClinicalNote('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white p-6 rounded-3xl shadow-xl border border-emerald-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
            alt="Dr. Priya"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Good morning, Dr. Priya 👋</h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                CLINICAL PORTAL ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Gynecologist & Obstetrician · Apollo Hospitals Banjara Hills
            </p>
          </div>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-xs text-slate-200 font-mono">
          Reg No: <span className="font-bold text-emerald-300">AP-68492</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Today's Appointments</p>
          <p className="text-2xl font-black text-slate-900 my-1">8 Patients</p>
          <p className="text-[10px] text-emerald-700 font-semibold">3 Waiting in Lobby</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Pending Reports</p>
          <p className="text-2xl font-black text-slate-900 my-1">2 Lab Reports</p>
          <p className="text-[10px] text-amber-700 font-semibold">CBC Hemoglobin Alert</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Follow-ups This Week</p>
          <p className="text-2xl font-black text-slate-900 my-1">12 Consultations</p>
          <p className="text-[10px] text-teal-700 font-semibold">On Track</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Open Blood Requests</p>
          <p className="text-2xl font-black text-rose-600 my-1">2 Urgent</p>
          <p className="text-[10px] text-rose-700 font-semibold">O+ Blood Needed</p>
        </div>
      </div>

      {/* Main Table: Today's Patient Queue */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            TODAY'S PATIENT CONSULTATION QUEUE
          </h3>
          <span className="text-xs font-bold text-slate-500">Apollo Hospitals Desk</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {patientQueue.map((item, idx) => (
            <div
              key={idx}
              className="py-4 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50 p-3 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.profile.avatar}
                  alt={item.profile.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500 shadow-2xs"
                />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{item.profile.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.profile.gender} · {item.profile.age} yrs · <span className="font-mono text-emerald-700 font-bold">{item.profile.healthId}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 italic">"{item.reason}"</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {item.time}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${item.status === 'Waiting in Lobby' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'}`}>
                    {item.status}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPatient(item.profile)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-4 rounded-xl text-xs flex items-center gap-1 transition-all shadow-sm"
                >
                  Open Patient Profile
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient EHR Profile Drawer Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 md:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                Unified Clinical EHR Profile
              </span>
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Patient Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedPatient.avatar}
                alt={selectedPatient.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
              />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedPatient.name}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedPatient.gender} · {selectedPatient.age} yrs · Blood Group: <span className="font-bold text-rose-600">{selectedPatient.bloodGroup}</span>
                </p>
                <p className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
                  {selectedPatient.healthId}
                </p>
              </div>
            </div>

            {/* Vitals Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs mb-6">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider">RECORDS SUMMARY</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <p className="text-[10px] text-slate-400">BP Systolic/Dia</p>
                  <p className="font-black text-slate-900 text-sm">123/83 mmHg</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <p className="text-[10px] text-slate-400">Glucose (Post-meal)</p>
                  <p className="font-black text-amber-700 text-sm">146 mg/dL</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <p className="text-[10px] text-slate-400">Hemoglobin</p>
                  <p className="font-black text-rose-600 text-sm">9.2 g/dL</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <p className="text-[10px] text-slate-400">Active Meds</p>
                  <p className="font-black text-emerald-700 text-sm">2 Medicines</p>
                </div>
              </div>
            </div>

            {/* Doctor Clinical Actions */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">DOCTOR CLINICAL ACTIONS</h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => showToast('❤️ Record Vitals opened for doctor input', 'info')}
                  className="p-3 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold rounded-xl border border-teal-200 flex items-center gap-2"
                >
                  <HeartPulse className="w-4 h-4 text-teal-600" />
                  Record Vitals
                </button>

                <button
                  onClick={() => showToast('📄 Upload Lab Report tool triggered', 'info')}
                  className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold rounded-xl border border-blue-200 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  Upload Report
                </button>

                <button
                  onClick={() => showToast('💊 Prescription Generator opened', 'info')}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200 flex items-center gap-2"
                >
                  <Pill className="w-4 h-4 text-emerald-600" />
                  Create Prescription
                </button>

                <button
                  onClick={() => showToast('📅 Follow-up scheduled for 2 weeks', 'info')}
                  className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold rounded-xl border border-indigo-200 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Schedule Follow-up
                </button>

                <button
                  onClick={() => showToast('🩸 Emergency Blood Request form opened', 'info')}
                  className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold rounded-xl border border-rose-200 flex items-center gap-2"
                >
                  <Droplet className="w-4 h-4 text-rose-600" />
                  Request Blood
                </button>
              </div>

              {/* Add Clinical Note Form */}
              <div className="pt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Add Clinical Note</label>
                <textarea
                  rows={3}
                  value={clinicalNote}
                  onChange={e => setClinicalNote(e.target.value)}
                  placeholder="Record consultation observations, physical findings, or prescription notes..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
                <button
                  onClick={handleSaveClinicalNotes}
                  className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-4 rounded-xl text-xs shadow-md"
                >
                  Save Note to EHR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
