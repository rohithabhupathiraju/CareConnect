import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Star,
  Building2,
  Calendar,
  CheckCircle2,
  X,
  ChevronRight
} from 'lucide-react';
import type { Doctor } from '../../types';

export const DoctorDiscoveryPage: React.FC = () => {
  const { doctors, bookNewAppointment } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('All');
  const [selectedDoc, setSelectedDoc] = useState<Doctor | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string>('10:30 AM');
  const [bookingDate, setBookingDate] = useState<string>('Tomorrow, 27 Sept 2026');
  const [bookingReason, setBookingReason] = useState<string>('Routine consultation & checkup');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const specialties = ['All', 'Gynecologist', 'Cardiologist', 'General Physician', 'Pediatrician'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = specialtyFilter === 'All' || doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
    return matchesSearch && matchesSpec;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;
    bookNewAppointment(selectedDoc.id, bookingDate, bookingSlot, bookingReason);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Search & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search doctors, specialties, or hospitals..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
          />
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2">Specialty:</span>
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                specialtyFilter === spec
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map(doc => (
          <div
            key={doc.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-md shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-extrabold text-base text-slate-900 truncate">{doc.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md text-xs font-bold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{doc.rating}</span>
                      <span className="text-[10px] text-slate-600">({doc.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-teal-700 mt-0.5">{doc.specialty}</p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.hospital}</span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700">{doc.experienceYears} yrs exp</span>
                  </div>
                </div>
              </div>

              {/* Time Slots Preview */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 mb-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Available Time Slots Today</span>
                  <span className="text-emerald-700 font-extrabold text-[10px] bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                    Instant Booking
                  </span>
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {doc.timeSlots.map(slot => (
                    <span
                      key={slot}
                      className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-2xs"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Consultation Fee</span>
                <span className="text-lg font-black text-slate-900">₹{doc.fee}</span>
              </div>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                View Profile & Book
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Profile & Booking Modal */}
      {selectedDoc && !isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 md:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                Clinical Specialist Profile
              </span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-6">
              <img
                src={selectedDoc.avatar}
                alt={selectedDoc.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500 shadow-md shrink-0"
              />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedDoc.name}</h3>
                <p className="text-xs font-bold text-teal-700">{selectedDoc.specialty}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">{selectedDoc.hospital} · {selectedDoc.experienceYears} Years Experience</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedDoc.education}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {selectedDoc.rating} ({selectedDoc.reviewCount} reviews)
                  </span>
                  <span className="text-xs text-slate-400 font-bold">Languages: {selectedDoc.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed mb-6">
              <p className="font-semibold text-slate-900 mb-1">About Doctor:</p>
              {selectedDoc.about}
            </div>

            {/* Booking Form */}
            <form onSubmit={handleConfirmBooking} className="space-y-4 bg-teal-50/50 p-5 rounded-2xl border border-teal-200">
              <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                BOOK CLINICAL CONSULTATION
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Date</label>
                  <select
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="Tomorrow, 27 Sept 2026">Tomorrow, 27 Sept 2026</option>
                    <option value="Monday, 28 Sept 2026">Monday, 28 Sept 2026</option>
                    <option value="Tuesday, 29 Sept 2026">Tuesday, 29 Sept 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Time Slot</label>
                  <select
                    value={bookingSlot}
                    onChange={e => setBookingSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  >
                    {selectedDoc.timeSlots.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Reason / Notes</label>
                <input
                  type="text"
                  value={bookingReason}
                  onChange={e => setBookingReason(e.target.value)}
                  placeholder="e.g. Routine wellness review"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Payable Fee</span>
                  <span className="text-xl font-black text-slate-900">₹{selectedDoc.fee}</span>
                </div>

                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3 px-6 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  CONFIRM APPOINTMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {isSuccessModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-black text-xl text-slate-900 mb-1">✓ Appointment Confirmed</h3>
            <p className="text-xs text-slate-600 font-medium mb-4">
              Your appointment with <span className="font-bold text-slate-900">{selectedDoc.name}</span> has been booked successfully.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5 mb-6">
              <p><span className="font-bold text-slate-700">Doctor:</span> {selectedDoc.name} ({selectedDoc.specialty})</p>
              <p><span className="font-bold text-slate-700">Hospital:</span> {selectedDoc.hospital}</p>
              <p><span className="font-bold text-slate-700">Date & Time:</span> {bookingDate} at {bookingSlot}</p>
              <p><span className="font-bold text-slate-700">Fee:</span> ₹{selectedDoc.fee}</p>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                setSelectedDoc(null);
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3 rounded-xl text-xs transition-all shadow-md"
            >
              Done & View Appointments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
