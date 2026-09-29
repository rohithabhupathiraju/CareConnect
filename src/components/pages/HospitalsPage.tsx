import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  MapPin,
  Phone,
  Star,
  ShieldAlert,
  Search,
  Navigation,
  X,
  ExternalLink,
  CheckCircle2,
  Stethoscope,
  Info,
  Compass
} from 'lucide-react';
import type { Hospital } from '../../types';

export const HospitalsPage: React.FC = () => {
  const { hospitals, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');
  
  // Modal states
  const [detailModalHospital, setDetailModalHospital] = useState<Hospital | null>(null);
  const [mapsModalHospital, setMapsModalHospital] = useState<Hospital | null>(null);
  const [callModalHospital, setCallModalHospital] = useState<Hospital | null>(null);

  // Available specialties for quick filtering
  const specialties = ['ALL', 'Cardiology', 'Gynecology', 'Pediatrics', 'Orthopedics', 'Nephrology', 'Pulmonology', 'Oncology'];

  // Search filtering logic (Name, Department/Specialty, and Locality/Address)
  const filteredHospitals = hospitals.filter(hosp => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      q === '' ||
      hosp.name.toLowerCase().includes(q) ||
      hosp.address.toLowerCase().includes(q) ||
      hosp.type.toLowerCase().includes(q) ||
      hosp.departments.some(dep => dep.toLowerCase().includes(q));

    const matchesSpecialty =
      selectedSpecialty === 'ALL' ||
      hosp.departments.some(dep => dep.toLowerCase() === selectedSpecialty.toLowerCase());

    return matchesQuery && matchesSpecialty;
  });

  const handleStartCall = (hosp: Hospital) => {
    setCallModalHospital(hosp);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Banner / Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-teal-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              EMERGENCY NETWORK & TIED-UP HOSPITALS
            </span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              DEMO DATA
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Nearby Hospitals
          </h1>
          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
            Locate 24/7 emergency centers, super-specialty hospitals, and connected diagnostic labs near your location with direct bed availability and route assistance.
          </p>
        </div>

        {/* Location Indicator Badge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl shrink-0 flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 border border-teal-400/30">
            <MapPin className="w-5 h-5 text-teal-300 animate-bounce" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-teal-200 tracking-wider">Current Location</p>
            <p className="text-xs font-bold text-white">Jubilee Hills, Hyderabad</p>
            <p className="text-[10px] text-slate-300">Coverage Radius: <span className="font-semibold text-teal-300">Within 10 km</span></p>
          </div>
        </div>
      </div>

      {/* Large Search Bar & Filter Chips */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hospital name, department (Cardiology, Gynecology...), or locality..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Filter Specialty:
          </span>
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedSpecialty === spec
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {spec === 'ALL' ? 'All Specialties' : spec}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map(hosp => (
          <div
            key={hosp.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-teal-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Image Banner with Badges */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={hosp.image}
                alt={hosp.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20"></div>

              {/* DEMO DATA Badge (Top Left) */}
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                DEMO DATA
              </span>

              {/* Emergency 24/7 Badge (Top Right) */}
              {hosp.emergency247 && (
                <span className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white border border-emerald-400/40 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Emergency 24/7
                </span>
              )}

              {/* Hospital Name & Type Overlay at Bottom of Image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-lg font-extrabold tracking-tight drop-shadow-sm text-white leading-snug">
                  {hosp.name}
                </h3>
                <p className="text-xs text-teal-200 font-medium drop-shadow-xs">
                  {hosp.type}
                </p>
              </div>
            </div>

            {/* Card Content Details */}
            <div className="p-5 flex-1 space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Rating & Distance Bar */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{hosp.rating}</span>
                    </div>
                    <span className="text-slate-600 font-medium">({hosp.reviewCount} reviews)</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">DEMO</span>
                  </div>

                  <div className="flex items-center gap-1 text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                    <Navigation className="w-3 h-3 text-teal-600" />
                    <span>{hosp.distance}</span>
                  </div>
                </div>

                {/* Address & Phone */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-700 line-clamp-2">{hosp.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-800 font-semibold">{hosp.phone}</span>
                  </div>
                </div>

                {/* Department Tags */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Specialties & Departments:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {hosp.departments.slice(0, 4).map((dep, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {dep}
                      </span>
                    ))}
                    {hosp.departments.length > 4 && (
                      <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2 py-1 rounded-lg">
                        +{hosp.departments.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 3 Action Buttons */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDetailModalHospital(hosp)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-2 rounded-xl text-[11px] flex items-center justify-center gap-1 transition-all shadow-2xs"
                >
                  <Info className="w-3.5 h-3.5 text-slate-300" />
                  <span>VIEW DETAILS</span>
                </button>

                <button
                  onClick={() => setMapsModalHospital(hosp)}
                  className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold py-2.5 px-2 rounded-xl text-[11px] flex items-center justify-center gap-1 transition-all"
                >
                  <Compass className="w-3.5 h-3.5 text-teal-600" />
                  <span>MAPS</span>
                </button>

                <button
                  onClick={() => handleStartCall(hosp)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-2 rounded-xl text-[11px] flex items-center justify-center gap-1 transition-all shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-slate-800 text-base">No hospitals match your search</h3>
          <p className="text-xs text-slate-500">Try searching for a different keyword like "Cardiology", "Apollo", or "Jubilee Hills".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedSpecialty('ALL'); }}
            className="bg-teal-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
          >
            Reset Search
          </button>
        </div>
      )}

      {/* ==================== MODAL 1: VIEW DETAILS ==================== */}
      {detailModalHospital && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 overflow-hidden space-y-0">
            {/* Header Image */}
            <div className="relative h-56 bg-slate-900">
              <img
                src={detailModalHospital.image}
                alt={detailModalHospital.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <button
                onClick={() => setDetailModalHospital(null)}
                className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                  DEMO HOSPITAL PROFILE
                </span>
                <h2 className="text-2xl font-black text-white">{detailModalHospital.name}</h2>
                <p className="text-xs text-teal-300 font-medium">{detailModalHospital.type} · {detailModalHospital.distance}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Rating</p>
                  <p className="font-extrabold text-slate-900 flex items-center gap-1">
                    ⭐ {detailModalHospital.rating} <span className="text-slate-400 font-normal">({detailModalHospital.reviewCount})</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Emergency</p>
                  <p className="font-extrabold text-emerald-600 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> 24/7 Active
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Distance</p>
                  <p className="font-extrabold text-slate-900">{detailModalHospital.distance}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Bed Status</p>
                  <p className="font-extrabold text-teal-700">Beds Available</p>
                </div>
              </div>

              {/* About */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-teal-600" />
                  About Hospital
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {detailModalHospital.about}
                </p>
              </div>

              {/* Facilities */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Facilities & ICUs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detailModalHospital.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address & Phone */}
              <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-100 text-xs space-y-1.5">
                <p className="font-bold text-teal-900">📍 Address & Contact Information</p>
                <p className="text-slate-700">{detailModalHospital.address}</p>
                <p className="text-slate-900 font-mono font-bold">Phone: {detailModalHospital.phone}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setDetailModalHospital(null);
                    setActiveTab('doctors');
                  }}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Stethoscope className="w-4 h-4" />
                  Find Doctors at {detailModalHospital.name}
                </button>
                <button
                  onClick={() => {
                    setDetailModalHospital(null);
                    handleStartCall(detailModalHospital);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call Emergency Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: MAPS & DIRECTIONS ==================== */}
      {mapsModalHospital && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden space-y-0">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Route Directions & Map</h3>
                  <p className="text-xs text-slate-300">To {mapsModalHospital.name} ({mapsModalHospital.distance})</p>
                </div>
              </div>
              <button
                onClick={() => setMapsModalHospital(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Map View Container */}
            <div className="relative h-64 bg-slate-800 overflow-hidden flex items-center justify-center">
              {/* Map grid background graphic */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Simulated Map Polyline Route */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 80 180 Q 200 80, 380 140 T 550 90"
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="5"
                  strokeDasharray="8 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Start Pin */}
              <div className="absolute left-16 bottom-12 flex flex-col items-center">
                <span className="bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-md border border-slate-700">
                  Your Location
                </span>
                <MapPin className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
              </div>

              {/* Hospital Destination Pin */}
              <div className="absolute right-20 top-16 flex flex-col items-center">
                <span className="bg-teal-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-md border border-teal-400">
                  {mapsModalHospital.name}
                </span>
                <Building2 className="w-8 h-8 text-rose-500 animate-bounce" />
              </div>

              {/* Map Info Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-white flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-teal-300">ESTIMATED DRIVE TIME: ~7 MINS</p>
                  <p className="text-[11px] text-slate-300">Fastest route via Road No. 36 (2.4 km)</p>
                </div>
                <span className="bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 rounded text-[10px]">
                  LIGHT TRAFFIC
                </span>
              </div>
            </div>

            {/* Navigation Steps */}
            <div className="p-5 space-y-3 bg-white">
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Turn-by-Turn Navigation Steps:</h4>
              <div className="space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[10px]">1</span>
                  <span>Head East from Jubilee Hills Checkpost toward Road No. 36</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[10px]">2</span>
                  <span>Turn right at Apollo Health City Gate 1 (Emergency Entrance)</span>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => setMapsModalHospital(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs"
                >
                  Close Map
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(mapsModalHospital.name + ' ' + mapsModalHospital.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL 3: CALL DIALER ==================== */}
      {callModalHospital && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-950 text-white rounded-3xl max-w-sm w-full p-6 text-center space-y-6 shadow-2xl border border-slate-800">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
              <Phone className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                DEMO PHONE CALL
              </span>
              <h3 className="text-xl font-extrabold text-white mt-2">{callModalHospital.name}</h3>
              <p className="text-sm font-mono text-emerald-400 font-bold mt-1">{callModalHospital.phone}</p>
              <p className="text-xs text-slate-400 mt-2">Emergency Desk & Casualty Response Connected</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              <p className="font-bold text-white">🟢 Simulated Call Active</p>
              <p className="text-[11px] text-slate-400">In a live system, this triggers direct telephony dialer.</p>
            </div>

            <button
              onClick={() => {
                setCallModalHospital(null);
              }}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all"
            >
              END CALL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
