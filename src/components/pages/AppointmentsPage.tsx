import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Building2, Star, X } from 'lucide-react';
import type { Appointment } from '../../types';

export const AppointmentsPage: React.FC = () => {
  const { appointments, submitReview } = useApp();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');
  const [reviewingApt, setReviewingApt] = useState<Appointment | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const filtered = appointments.filter(a =>
    activeTab === 'Upcoming' ? a.status === 'Upcoming' : a.status === 'Completed'
  );

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingApt) return;
    submitReview(reviewingApt.id, reviewingApt.doctorId, rating, comment);
    setReviewingApt(null);
    setComment('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-2">
        <button
          onClick={() => setActiveTab('Upcoming')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Upcoming'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Upcoming Appointments ({appointments.filter(a => a.status === 'Upcoming').length})
        </button>

        <button
          onClick={() => setActiveTab('Completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Completed'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Past Completed Consultations ({appointments.filter(a => a.status === 'Completed').length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            No {activeTab.toLowerCase()} appointments found.
          </div>
        ) : (
          filtered.map(apt => (
            <div
              key={apt.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={apt.doctorAvatar}
                  alt={apt.doctorName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900">{apt.doctorName}</h3>
                    <span className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold px-2 py-0.5 rounded">
                      {apt.doctorSpecialty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {apt.hospital}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {apt.date}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {apt.time}
                    </span>
                  </div>

                  {apt.reason && (
                    <p className="text-xs text-slate-500 mt-2 italic">"{apt.reason}"</p>
                  )}

                  {apt.review && (
                    <div className="mt-3 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-xs">
                      <div className="flex items-center gap-1 text-amber-900 font-bold mb-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>Your Rating: {apt.review.rating}/5</span>
                      </div>
                      <p className="text-amber-950 font-medium">{apt.review.comment}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {apt.status === 'Completed' && !apt.review && (
                  <button
                    onClick={() => setReviewingApt(apt)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Star className="w-4 h-4 fill-slate-950" />
                    Leave Review
                  </button>
                )}

                <div className="text-right pl-2 border-l border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Fee Paid</span>
                  <span className="text-base font-black text-slate-900">₹{apt.fee}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {reviewingApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">How was your visit?</h3>
              <button onClick={() => setReviewingApt(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Rate your completed consultation with <span className="font-bold text-slate-900">{reviewingApt.doctorName}</span>.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Star Selector */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        s <= rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Write your review</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Share feedback regarding doctor explanation, waiting time, or diagnosis clarity..."
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
                <span className="text-[10px] text-slate-600 block mt-1">Seeded & user reviews labeled: DEMO DATA</span>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl text-xs shadow-md transition-all"
              >
                Submit Doctor Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
