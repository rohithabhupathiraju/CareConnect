import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import type {
  PersonaRole,
  Language,
  NavTab,
  PatientProfile,
  VitalReading,
  Appointment,
  Doctor,
  Hospital,
  MedicalReport,
  Medicine,
  ExtractedOCR,
  TimelineEvent,
  BloodRequest,
  FamilyHealthNode,
  VaccineItem,
  AppNotification
} from '../types';

import {
  MAYA_PROFILE,
  ARJUN_PROFILE,
  AARAV_PROFILE,
  INITIAL_VITALS,
  INITIAL_DOCTORS,
  INITIAL_HOSPITALS,
  INITIAL_APPOINTMENTS,
  INITIAL_REPORTS,
  INITIAL_MEDICINES,
  INITIAL_TIMELINE,
  INITIAL_BLOOD_REQUESTS,
  INITIAL_FAMILY_NODES,
  INITIAL_CHILD_VACCINES,
  INITIAL_NOTIFICATIONS,
  INITIAL_OCR_PREVIEW
} from '../data/mockData';

interface AppContextType {
  persona: PersonaRole;
  setPersona: (role: PersonaRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Current active patient profile
  currentProfile: PatientProfile;
  
  // States
  vitals: VitalReading[];
  doctors: Doctor[];
  hospitals: Hospital[];
  appointments: Appointment[];
  reports: MedicalReport[];
  medicines: Medicine[];
  timeline: TimelineEvent[];
  bloodRequests: BloodRequest[];
  familyNodes: FamilyHealthNode[];
  childVaccines: VaccineItem[];
  notifications: AppNotification[];
  ocrPrescription: ExtractedOCR;
  
  // Modals & UI states
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doc: Doctor | null) => void;
  selectedReport: MedicalReport | null;
  setSelectedReport: (rep: MedicalReport | null) => void;
  bookingDoctor: Doctor | null;
  setBookingDoctor: (doc: Doctor | null) => void;
  isQRModalOpen: boolean;
  setIsQRModalOpen: (open: boolean) => void;
  qrModalType: 'health_id' | 'emergency';
  setQrModalType: (type: 'health_id' | 'emergency') => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Connected Action functions
  recordVital: (vital: Omit<VitalReading, 'id' | 'timestamp'>) => void;
  bookNewAppointment: (doctorId: string, date: string, time: string, reason?: string) => void;
  verifyAndSaveOCR: (meds: any[]) => void;
  markMedicineTaken: (medId: string, schedId: string) => void;
  snoozeMedicine: (medId: string, schedId: string) => void;
  helpBloodDonation: (requestId: string) => void;
  createNewBloodRequest: (bloodGroup: string, units: number, hospital: string, location: string) => void;
  submitReview: (appointmentId: string, doctorId: string, rating: number, comment: string) => void;
  triggerProgressConfetti: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<PersonaRole>('patient_maya');
  const [language, setLanguage] = useState<Language>('EN');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [vitals, setVitals] = useState<VitalReading[]>(INITIAL_VITALS);
  const [doctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [hospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [reports] = useState<MedicalReport[]>(INITIAL_REPORTS);
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(INITIAL_BLOOD_REQUESTS);
  const [familyNodes] = useState<FamilyHealthNode[]>(INITIAL_FAMILY_NODES);
  const [childVaccines] = useState<VaccineItem[]>(INITIAL_CHILD_VACCINES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [ocrPrescription, setOcrPrescription] = useState<ExtractedOCR>(INITIAL_OCR_PREVIEW);

  // Modals
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [qrModalType, setQrModalType] = useState<'health_id' | 'emergency'>('health_id');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const getCurrentProfile = (): PatientProfile => {
    switch (persona) {
      case 'patient_arjun':
        return ARJUN_PROFILE;
      case 'child_aarav':
        return AARAV_PROFILE;
      case 'patient_maya':
      default:
        return MAYA_PROFILE;
    }
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const setPersona = (newPersona: PersonaRole) => {
    setPersonaState(newPersona);
    if (newPersona === 'child_aarav' && (activeTab === 'womens_health' || activeTab === 'blood_donation')) {
      setActiveTab('dashboard');
    }
    showToast(`Switched persona to ${newPersona === 'patient_maya' ? 'Maya (Female Patient)' : newPersona === 'patient_arjun' ? 'Arjun (Male Patient)' : newPersona === 'child_aarav' ? 'Aarav (Child Patient)' : newPersona === 'doctor_priya' ? 'Dr. Priya (Doctor)' : 'Apollo Hospitals (Org Admin)'}`, 'info');
  };

  const triggerProgressConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect executed');
    }
  };

  // Connected Actions
  const recordVital = (vital: Omit<VitalReading, 'id' | 'timestamp'>) => {
    const newId = `v_${Date.now()}`;
    const timestamp = new Date().toISOString();
    const newVital: VitalReading = {
      ...vital,
      id: newId,
      timestamp
    };

    setVitals(prev => [newVital, ...prev]);

    // Create Timeline Entry
    const newTimelineItem: TimelineEvent = {
      id: `tl_${Date.now()}`,
      date: 'Today, Just Now',
      time: vital.time,
      category: 'Vitals',
      hospital: 'Home Log (CareConnect App)',
      title: 'Vitals Recorded',
      summary: `BP: ${vital.bpSystolic}/${vital.bpDiastolic} mmHg, Heart Rate: ${vital.heartRate} BPM, Glucose: ${vital.glucose} mg/dL (${vital.glucoseType}).`
    };
    setTimeline(prev => [newTimelineItem, ...prev]);

    // Add notification
    const newNotif: AppNotification = {
      id: `n_${Date.now()}`,
      type: 'alert',
      title: '❤️ Vitals Logged',
      message: `BP ${vital.bpSystolic}/${vital.bpDiastolic}, Glucose ${vital.glucose} mg/dL logged successfully.`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast('✓ Vitals recorded successfully! Dashboard and Trends updated.', 'success');
  };

  const bookNewAppointment = (doctorId: string, date: string, time: string, reason?: string) => {
    const doctor = doctors.find(d => d.id === doctorId) || INITIAL_DOCTORS[0];
    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorAvatar: doctor.avatar,
      hospital: doctor.hospital,
      date,
      time,
      fee: doctor.fee,
      status: 'Upcoming',
      type: 'In-Person',
      reason: reason || 'Consultation & Review'
    };

    setAppointments(prev => [newApt, ...prev]);

    // Add Timeline Event
    const newTimelineItem: TimelineEvent = {
      id: `tl_${Date.now()}`,
      date: 'Today, Just Now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Appointment',
      hospital: doctor.hospital,
      doctor: doctor.name,
      title: 'Appointment Booked',
      summary: `Booked consultation with ${doctor.name} for ${date} at ${time}.`
    };
    setTimeline(prev => [newTimelineItem, ...prev]);

    showToast(`✓ Appointment confirmed with ${doctor.name} for ${date}!`, 'success');
  };

  const verifyAndSaveOCR = (meds: any[]) => {
    setOcrPrescription(prev => ({ ...prev, verified: true }));

    // Create new medicine items
    const newMeds: Medicine[] = meds.map((m, idx) => ({
      id: `med_ocr_${Date.now()}_${idx}`,
      name: m.name,
      dosage: m.dosage,
      frequency: m.frequency,
      duration: m.duration,
      timing: m.timing || 'After food',
      prescribedBy: ocrPrescription.doctorName,
      hospital: ocrPrescription.hospital,
      status: 'ACTIVE',
      startDate: 'Today, 26 Sept 2026',
      scheduleTimes: [
        { id: `s_ocr_${idx}_1`, time: '08:00 AM', label: 'Morning Dose', taken: false, snoozed: false },
        { id: `s_ocr_${idx}_2`, time: '08:00 PM', label: 'Evening Dose', taken: false, snoozed: false }
      ]
    }));

    setMedicines(prev => [...newMeds, ...prev]);

    // Add Timeline Entry
    const newTimelineItem: TimelineEvent = {
      id: `tl_ocr_${Date.now()}`,
      date: 'Today, Just Now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Prescription',
      hospital: ocrPrescription.hospital,
      doctor: ocrPrescription.doctorName,
      title: 'Prescription Digitized & Verified',
      summary: `Verified handwritten prescription. Added ${meds.length} active medicine reminders.`
    };
    setTimeline(prev => [newTimelineItem, ...prev]);

    showToast('✓ Prescription verified and added to active medicines & reminders!', 'success');
  };

  const markMedicineTaken = (medId: string, schedId: string) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medId) {
        return {
          ...m,
          scheduleTimes: m.scheduleTimes.map(st => st.id === schedId ? { ...st, taken: true, snoozed: false } : st)
        };
      }
      return m;
    }));
    triggerProgressConfetti();
    showToast('🎉 Medicine dose marked as taken! Keep up the great health routine!', 'success');
  };

  const snoozeMedicine = (medId: string, schedId: string) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medId) {
        return {
          ...m,
          scheduleTimes: m.scheduleTimes.map(st => st.id === schedId ? { ...st, snoozed: true } : st)
        };
      }
      return m;
    }));
    showToast('⏰ Reminder snoozed for 30 minutes.', 'info');
  };

  const helpBloodDonation = (requestId: string) => {
    setBloodRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return { ...r, helpersCount: r.helpersCount + 1 };
      }
      return r;
    }));

    const newTimelineItem: TimelineEvent = {
      id: `tl_blood_${Date.now()}`,
      date: 'Today, Just Now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Blood Donation',
      hospital: 'Apollo Hospitals',
      title: 'Blood Donor Commitment',
      summary: 'Pledged to respond to urgent O+ Blood request at Apollo Hospitals Banjara Hills.'
    };
    setTimeline(prev => [newTimelineItem, ...prev]);

    triggerProgressConfetti();
    showToast('❤️ Thank you! Your donor response has been communicated to the hospital.', 'success');
  };

  const createNewBloodRequest = (bloodGroup: string, units: number, hospital: string, location: string) => {
    const newReq: BloodRequest = {
      id: `br_${Date.now()}`,
      bloodGroup,
      unitsNeeded: units,
      hospital,
      location,
      urgency: 'URGENT',
      patientContact: '+91 98490 99999',
      helpersCount: 0,
      status: 'OPEN',
      postedDate: 'Just now'
    };
    setBloodRequests(prev => [newReq, ...prev]);
    showToast(`🩸 Blood request for ${units} unit(s) of ${bloodGroup} posted successfully!`, 'success');
  };

  const submitReview = (appointmentId: string, _doctorId: string, rating: number, comment: string) => {
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return {
          ...a,
          review: { rating, comment, date }
        };
      }
      return a;
    }));
    showToast('⭐ Thank you for rating your consultation!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        currentProfile: getCurrentProfile(),
        vitals,
        doctors,
        hospitals,
        appointments,
        reports,
        medicines,
        timeline,
        bloodRequests,
        familyNodes,
        childVaccines,
        notifications,
        ocrPrescription,
        selectedDoctor,
        setSelectedDoctor,
        selectedReport,
        setSelectedReport,
        bookingDoctor,
        setBookingDoctor,
        isQRModalOpen,
        setIsQRModalOpen,
        qrModalType,
        setQrModalType,
        isNotificationsOpen,
        setIsNotificationsOpen,
        toast,
        showToast,
        recordVital,
        bookNewAppointment,
        verifyAndSaveOCR,
        markMedicineTaken,
        snoozeMedicine,
        helpBloodDonation,
        createNewBloodRequest,
        submitReview,
        triggerProgressConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
