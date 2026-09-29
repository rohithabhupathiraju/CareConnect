import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Building2, ChevronRight } from 'lucide-react';

export const UpcomingAppointmentCard: React.FC = () => {
  const { appointments, setActiveTab, setSelectedDoctor, doctors, showToast } = useApp();
  const nextApt = appointments.find(a => a.status === 'Upcoming') || appointments[0];
  const doctorObj = doctors.find(d => d.name === nextApt?.doctorName);

  if (!nextApt) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">UPCOMING APPOINTMENT</h3>
              <p className="text-xs text-slate-500 font-medium">Next scheduled clinical consultation</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            CONFIRMED
          </span>
        </div>

        {/* Doctor Details Box */}
        <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 p-4 rounded-xl border border-slate-200/80 mb-4">
          <div className="flex items-start gap-3.5">
            <img
              src={nextApt.doctorAvatar}
              alt={nextApt.doctorName}
              className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-extrabold text-slate-900 text-base leading-tight truncate">
                {nextApt.doctorName}
              </h4>
              <p className="text-xs font-bold text-teal-700">{nextApt.doctorSpecialty}</p>
              
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{nextApt.hospital}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200/80 text-xs">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Date</p>
                <p className="font-bold text-slate-900 text-xs truncate">{nextApt.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Time Slot</p>
                <p className="font-bold text-slate-900 text-xs truncate">{nextApt.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 pt-2">
        <button
          onClick={() => {
            if (doctorObj) setSelectedDoctor(doctorObj);
            setActiveTab('appointments');
          }}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          View Appointment
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => showToast('📅 Reschedule request initiated with hospital desk.', 'info')}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-all border border-slate-200"
        >
          Reschedule
        </button>
      </div>
    </div>
  );
};
