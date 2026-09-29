import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Droplet, Award, HeartHandshake, Plus, MapPin } from 'lucide-react';

export const BloodDonationPage: React.FC = () => {
  const { currentProfile, bloodRequests, helpBloodDonation, createNewBloodRequest } = useApp();
  const [showRequestForm, setShowRequestForm] = useState<boolean>(false);
  const [bgGroup, setBgGroup] = useState<string>('O+');
  const [units, setUnits] = useState<number>(2);
  const [hosp, setHosp] = useState<string>('Apollo Hospitals');
  const [loc, setLoc] = useState<string>('Banjara Hills, Hyderabad');

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewBloodRequest(bgGroup, Number(units), hosp, loc);
    setShowRequestForm(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Profile Stats Card */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-rose-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 text-rose-400">
            <Droplet className="w-9 h-9 fill-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">Your Blood Group: {currentProfile.bloodGroup}</h2>
              <span className="bg-rose-500/30 text-rose-200 border border-rose-400/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase">
                <Award className="w-3.5 h-3.5 text-rose-300" />
                🩸 REGULAR DONOR
              </span>
            </div>
            <p className="text-xs text-rose-100 font-medium mt-1">
              Thank you for helping save lives in your local community network.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/15 text-xs text-center">
          <div>
            <p className="text-[10px] text-rose-200 font-bold uppercase">Total Donations</p>
            <p className="text-lg font-black text-white">3 Units</p>
          </div>
          <div className="h-8 w-px bg-rose-700/60"></div>
          <div>
            <p className="text-[10px] text-rose-200 font-bold uppercase">This Year</p>
            <p className="text-lg font-black text-white">2 Units</p>
          </div>
          <div className="h-8 w-px bg-rose-700/60"></div>
          <div>
            <p className="text-[10px] text-rose-200 font-bold uppercase">Last Donated</p>
            <p className="text-xs font-bold text-white">15 June 2026</p>
          </div>
        </div>
      </div>

      {/* Requests Header & Post Button */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
            BLOOD REQUESTS NEAR YOU
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              Urgent Network Matches
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">Matching O+ blood group requests in Hyderabad</p>
        </div>

        <button
          onClick={() => setShowRequestForm(!showRequestForm)}
          className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-600/20"
        >
          <Plus className="w-4 h-4" />
          REQUEST BLOOD FOR PATIENT
        </button>
      </div>

      {/* Post Blood Request Form Modal */}
      {showRequestForm && (
        <form onSubmit={handleRequestSubmit} className="bg-rose-50/80 p-6 rounded-3xl border border-rose-200 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <h4 className="font-extrabold text-sm text-rose-950 uppercase tracking-wider">Post Emergency Blood Request</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bgGroup}
                onChange={e => setBgGroup(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              >
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Units Needed</label>
              <input
                type="number"
                min={1}
                max={10}
                value={units}
                onChange={e => setUnits(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Name</label>
              <input
                type="text"
                value={hosp}
                onChange={e => setHosp(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={loc}
                onChange={e => setLoc(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowRequestForm(false)}
              className="bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-600 text-white text-xs font-extrabold px-6 py-2 rounded-xl shadow-md"
            >
              Post Request
            </button>
          </div>
        </form>
      )}

      {/* Blood Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bloodRequests.map(req => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  {req.urgency}
                </span>
                <span className="text-xs font-bold text-slate-400">{req.postedDate}</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 border-2 border-rose-300 flex flex-col items-center justify-center font-black shrink-0">
                  <span className="text-lg leading-none">{req.bloodGroup}</span>
                  <span className="text-[9px] font-bold text-rose-800 uppercase mt-0.5">{req.unitsNeeded} Units</span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{req.bloodGroup} Blood Needed</h4>
                  <p className="text-xs font-bold text-teal-700">{req.hospital}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {req.location}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs flex items-center justify-between">
                <span className="text-slate-600 font-medium">Pledged Donors Responded:</span>
                <span className="font-black text-rose-600">{req.helpersCount} Donors</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-semibold">Contact: {req.patientContact}</span>

              <button
                onClick={() => helpBloodDonation(req.id)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-600/20 active:scale-95"
              >
                <HeartHandshake className="w-4 h-4" />
                I CAN HELP
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
