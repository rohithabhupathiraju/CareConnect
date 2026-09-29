import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scan, Upload, Camera, AlertTriangle, CheckCircle2, Edit2, FileText, Sparkles } from 'lucide-react';

export const OCRPrescriptionPage: React.FC = () => {
  const { ocrPrescription, verifyAndSaveOCR, setActiveTab } = useApp();
  const [isUploaded, setIsUploaded] = useState<boolean>(true); // default loaded with sample
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const meds = ocrPrescription.medications;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsUploaded(true);
    }, 1500);
  };

  const handleVerify = () => {
    verifyAndSaveOCR(meds);
    setActiveTab('medicines');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Inject Google Font for Authentic Doctor Cursive Handwriting */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kalam:wght@400;700&display=swap');
      `}</style>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-teal-950 text-white p-6 rounded-3xl shadow-xl border border-cyan-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            AI-POWERED HANDWRITTEN OCR DIGITIZER
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2">
            Digitize Prescription
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Upload paper doctor prescriptions to automatically extract medicine schedules, dosages, and reminders.
          </p>
        </div>

        <button
          onClick={handleSimulateScan}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
        >
          <Scan className="w-4 h-4" />
          {isScanning ? 'Scanning Prescription...' : 'Re-Scan Sample Prescription'}
        </button>
      </div>

      {/* Main Grid: Left Prescription Image Viewer, Right Extracted OCR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Prescription Upload / Image Viewer */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-teal-600" />
              PRESCRIPTION IMAGE
            </h3>
            <span className="text-[10px] font-bold text-slate-400">Scanned Paper Prescription</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-teal-300 bg-slate-100 p-2 min-h-[440px] flex items-center justify-center">
            {isScanning ? (
              <div className="text-center space-y-3 p-8">
                <Scan className="w-12 h-12 text-teal-600 animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-700">AI Medical Vision OCR processing handwriting...</p>
              </div>
            ) : isUploaded ? (
              /* Photographed / Scanned Handwritten Doctor Prescription Paper Sheet */
              <div className="relative w-full bg-[#faf7f2] rounded-xl border border-amber-950/20 shadow-md p-4 sm:p-5 flex flex-col justify-between overflow-hidden font-sans select-none text-slate-900 min-h-[430px]">
                {/* Paper red margin line & top gradient shadow */}
                <div className="absolute top-0 left-7 bottom-0 w-px bg-red-300/40 pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700/20 via-amber-500/10 to-transparent pointer-events-none"></div>

                {/* Letterhead Header: Hospital & Doctor details */}
                <div className="border-b-2 border-teal-800/80 pb-2.5 flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-2xs">
                      ✚
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-teal-950 tracking-tight leading-none uppercase">
                        APOLLO HOSPITALS
                      </h4>
                      <p className="text-[9px] sm:text-[10px] text-teal-900/80 font-semibold mt-0.5">
                        Jubilee Hills, Road No. 72, Hyderabad - 500033
                      </p>
                      <p className="text-[8px] sm:text-[9px] text-slate-600 font-medium">
                        Reg. No: AP-68492 · Ph: +91 40 2360 7777
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-extrabold text-xs text-slate-900">Dr. Priya Sharma</p>
                    <p className="text-[9px] text-teal-800 font-bold">MD (Obstetrics & Gynecology)</p>
                    <p className="text-[8px] text-slate-500">Senior Consultant</p>
                  </div>
                </div>

                {/* Patient Details Metadata Bar */}
                <div className="py-1.5 px-2 bg-amber-100/50 rounded-lg border border-amber-200/60 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-slate-800 font-semibold my-1.5">
                  <div>
                    <span className="text-slate-500 font-normal">Patient Name: </span>
                    <span className="font-extrabold text-slate-900">Maya Rao</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-normal">Age/Sex: </span>
                    <span className="font-extrabold text-slate-900">28 / F</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-normal">Date: </span>
                    <span className="font-extrabold text-slate-900">26/09/2026</span>
                  </div>
                </div>

                {/* Classic Rx Symbol */}
                <div className="flex items-center justify-between my-0.5">
                  <span className="font-serif italic font-extrabold text-2xl text-blue-900 select-none">
                    ℞
                  </span>
                  <span className="text-[9px] font-bold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded border border-amber-300/80 uppercase">
                    Scanned Doctor Prescription
                  </span>
                </div>

                {/* Handwritten Prescription Content in Fountain Pen Ink style */}
                <div className="flex-1 space-y-3.5 pl-3 pt-0.5 text-blue-900">
                  {/* Handwritten Medicine 1 */}
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-lg sm:text-xl font-extrabold text-blue-950 tracking-wide"
                        style={{ fontFamily: "'Caveat', 'Kalam', cursive, sans-serif" }}
                      >
                        1. Tab. Paracetamol 500 mg
                      </span>
                    </div>
                    <p
                      className="text-base sm:text-lg font-bold text-blue-800 pl-4 leading-tight"
                      style={{ fontFamily: "'Caveat', 'Kalam', cursive, sans-serif" }}
                    >
                      1 tab  BD  x  3 days  (After food)
                    </p>
                  </div>

                  {/* Handwritten Medicine 2 */}
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-lg sm:text-xl font-extrabold text-blue-950 tracking-wide"
                        style={{ fontFamily: "'Caveat', 'Kalam', cursive, sans-serif" }}
                      >
                        2. Tab. Pantoprazole 40 mg
                      </span>
                    </div>
                    <p
                      className="text-base sm:text-lg font-bold text-blue-800 pl-4 leading-tight"
                      style={{ fontFamily: "'Caveat', 'Kalam', cursive, sans-serif" }}
                    >
                      1 tab  OD  x  5 days  (Before food)
                    </p>
                  </div>

                  {/* Doctor Notes */}
                  <p
                    className="text-sm sm:text-base text-blue-900/90 italic pl-4 pt-1"
                    style={{ fontFamily: "'Caveat', 'Kalam', cursive, sans-serif" }}
                  >
                    Adv: Rest well, take plenty of warm fluids. Follow up after 7 days.
                  </p>
                </div>

                {/* Doctor Seal Rubber Stamp & Signature Footer */}
                <div className="border-t border-slate-300/80 pt-2 flex items-end justify-between text-xs">
                  {/* Hospital Rubber Stamp Simulation */}
                  <div className="border-2 border-blue-800/60 rounded-md p-1 rotate-[-3deg] bg-blue-50/40 text-center select-none max-w-[160px]">
                    <p className="text-[7px] font-black uppercase text-blue-900 tracking-tighter">
                      APOLLO HOSPITALS · HYDERABAD
                    </p>
                    <p className="text-[9px] font-extrabold text-blue-950 leading-tight">Dr. Priya Sharma</p>
                    <p className="text-[7px] text-blue-800 font-bold">REG NO: AP-68492</p>
                  </div>

                  {/* Doctor Cursive Signature */}
                  <div className="text-right">
                    <div
                      className="text-xl sm:text-2xl font-bold text-blue-900 leading-none select-none pr-1"
                      style={{ fontFamily: "'Caveat', 'Kalam', cursive, sans-serif" }}
                    >
                      Priya Sharma
                    </div>
                    <p className="text-[8px] sm:text-[9px] font-bold text-slate-600 border-t border-slate-400 pt-0.5 mt-0.5">
                      Doctor Signature & Seal
                    </p>
                  </div>
                </div>

                {/* Laser scan line animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/20 to-transparent pointer-events-none border-b-2 border-teal-400 animate-pulse"></div>
              </div>
            ) : (
              <div className="text-center p-6 space-y-3">
                <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700">Drag & Drop prescription here or click to upload</p>
                <button
                  onClick={handleSimulateScan}
                  className="bg-teal-600 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-sm"
                >
                  Upload Image / Take Photo
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center text-xs text-slate-500">
            <span>Prescription Date: Today, 09:25 AM</span>
            <span className="font-bold text-teal-700">Apollo Hospitals</span>
          </div>
        </div>

        {/* RIGHT: Extracted Text & Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                EXTRACTED OCR TEXT & MEDICATIONS
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded">
                AI Confidence: 96%
              </span>
            </div>

            {/* Prescribing Doctor Header */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-4 text-xs font-semibold text-slate-800">
              <p className="text-[10px] text-slate-400 uppercase font-bold">PRESCRIBING CLINICIAN</p>
              <p className="text-sm font-extrabold text-slate-900">{ocrPrescription.doctorName}</p>
              <p className="text-slate-500">{ocrPrescription.hospital}</p>
            </div>

            {/* Extracted Medications List */}
            <div className="space-y-3 mb-4">
              {meds.map((m, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm">💊 {m.name}</span>
                    <span className="bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded text-[10px]">
                      {m.dosage}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">
                    Frequency: <span className="font-bold text-slate-900">{m.frequency}</span> · Duration: <span className="font-bold text-slate-900">{m.duration}</span>
                  </p>
                  <p className="text-slate-500 text-[11px]">Timing: {m.timing}</p>
                </div>
              ))}
            </div>

            {/* Warning Banner */}
            <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">⚠ Clinical Verification Requirement</p>
                <p className="text-[11px] text-amber-900/90 leading-tight">
                  Please verify the extracted medicine names and dosage frequency with your physical doctor prescription sheet before saving.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3">
            <button
              onClick={() => setIsUploaded(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200"
            >
              <Edit2 className="w-4 h-4" />
              EDIT
            </button>

            <button
              onClick={handleVerify}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-5 h-5" />
              VERIFY & SAVE TO MEDICINES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
