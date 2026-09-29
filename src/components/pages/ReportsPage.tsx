import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Bot,
  CheckCircle2,
  X,
  Apple
} from 'lucide-react';
import type { MedicalReport, Language } from '../../types';

export const ReportsPage: React.FC = () => {
  const { reports, language: globalLang } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeReport, setActiveReport] = useState<MedicalReport | null>(null);
  const [reportLang, setReportLang] = useState<Language>(globalLang);

  const categories = ['All', 'Pathology', 'Gynecology', 'Cardiology', 'Radiology', 'Dermatology'];

  const filteredReports = selectedCategory === 'All'
    ? reports
    : reports.filter(r => r.category === selectedCategory);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Category Tabs Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <FileSpreadsheet className="w-4 h-4 text-teal-600" />
          <span>Report Category:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map(report => (
          <div
            key={report.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                  {report.category}
                </span>

                {report.hasAiExplanation && (
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    AI Explained
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                {report.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-2">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {report.hospital}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {report.date}
                </span>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Logged Finding</p>
                <p className="font-bold text-slate-800 mt-0.5">{report.reportedValue}</p>
                <p className="text-[11px] text-slate-500">Ref: {report.referenceRange}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${report.status === 'Attention Required' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                {report.status}
              </span>

              <button
                onClick={() => {
                  setActiveReport(report);
                  setReportLang(globalLang);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                View Report & AI Summary
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Report Detail Viewer Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 md:p-8 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900">{activeReport.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {activeReport.hospital} · {activeReport.date} · {activeReport.category}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveReport(null)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split View: Left Document Preview, Right AI Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT: Document Preview */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">OFFICIAL LAB PREVIEW</span>
                  <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    HID-2026-4821-9137
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">SECTION 1: REPORTED VALUE</span>
                    <span className="text-slate-900 font-extrabold text-base">{activeReport.reportedValue}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px]">SECTION 2: REFERENCE RANGE</span>
                    <span className="text-slate-700 font-bold">{activeReport.referenceRange}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px]">DIAGNOSTIC STATUS</span>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-extrabold ${activeReport.status === 'Attention Required' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                      {activeReport.status}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 text-xs text-teal-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    Verified Cross-Hospital Sync
                  </p>
                  <p className="text-[11px] text-teal-800 mt-0.5">
                    Record digital hash verified with {activeReport.hospital} diagnostic laboratory system.
                  </p>
                </div>
              </div>

              {/* RIGHT: AI SUMMARY */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 rounded-2xl border border-indigo-900/60 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-teal-400" />
                    <h4 className="font-extrabold text-sm text-teal-300">AI MEDICAL EXPLANATION</h4>
                  </div>

                  {/* Multilingual Selector */}
                  <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[10px] font-bold">
                    {(['EN', 'TE', 'HI'] as const).map(l => (
                      <button
                        key={l}
                        onClick={() => setReportLang(l)}
                        className={`px-2 py-0.5 rounded transition-all ${
                          reportLang === l ? 'bg-teal-500 text-slate-950 shadow-2xs font-black' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {l === 'EN' ? 'English' : l === 'TE' ? 'తెలుగు' : 'हिन्दी'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 3: AI Explanation */}
                <div>
                  <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block mb-1">
                    SECTION 3: PLAIN-LANGUAGE EXPLANATION
                  </span>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed bg-white/10 p-3.5 rounded-xl border border-white/10">
                    {activeReport.aiExplanation[reportLang] || activeReport.aiExplanation.EN}
                  </p>
                </div>

                {/* Section 4: Dietary Suggestions */}
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Apple className="w-3.5 h-3.5 text-amber-400" />
                    SECTION 4: GENERAL DIETARY SUGGESTIONS
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside bg-white/10 p-3 rounded-xl border border-white/10">
                    {(activeReport.dietarySuggestions[reportLang] || activeReport.dietarySuggestions.EN).map((sugg, i) => (
                      <li key={i} className="leading-snug">{sugg}</li>
                    ))}
                  </ul>
                </div>

                {/* Section 5: Discuss with Doctor */}
                <div>
                  <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block mb-1">
                    SECTION 5: DISCUSS WITH YOUR DOCTOR
                  </span>
                  <p className="text-xs text-teal-100 font-semibold bg-teal-500/20 p-3 rounded-xl border border-teal-500/30">
                    👨‍⚕️ {activeReport.doctorAdvice[reportLang] || activeReport.doctorAdvice.EN}
                  </p>
                </div>

                {/* AI Banner Badge */}
                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-extrabold border border-indigo-500/30">
                    AI GENERATED
                  </span>
                  <span className="italic">Plain language assistance — not a diagnosis.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
