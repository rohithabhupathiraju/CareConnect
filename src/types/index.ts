export type PersonaRole = 'patient_maya' | 'patient_arjun' | 'child_aarav' | 'doctor_priya' | 'org_apollo';

export type Language = 'EN' | 'TE' | 'HI';

export type NavTab = 
  | 'dashboard'
  | 'vitals'
  | 'trends'
  | 'timeline'
  | 'health_id'
  | 'hospitals'
  | 'doctors'
  | 'appointments'
  | 'records'
  | 'medicines'
  | 'reports'
  | 'ocr_prescription'
  | 'ai_assistant'
  | 'blood_donation'
  | 'family_history'
  | 'womens_health'
  | 'vaccination'
  | 'emergency'
  | 'settings';

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Child';
  healthId: string;
  bloodGroup: string;
  avatar: string;
  allergies: string[];
  conditions: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  connectedHospitals: string[];
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  distance: string;
  address: string;
  rating: number;
  reviewCount: number;
  emergency247: boolean;
  phone: string;
  image: string;
  departments: string[];
  about: string;
  facilities: string[];
}

export interface VitalReading {
  id: string;
  timestamp: string; // ISO or formatted
  date: string;
  time: string;
  bpSystolic: number;
  bpDiastolic: number;
  heartRate: number;
  glucose: number;
  glucoseType: 'Fasting' | 'Post-meal' | 'Random';
  spO2: number;
  weight: number;
  temp: number;
  height: number;
  notes?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  hospital: string;
  date: string;
  time: string;
  fee: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  type: 'In-Person' | 'Video Call';
  reason?: string;
  review?: {
    rating: number;
    comment: string;
    date: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experienceYears: number;
  languages: string[];
  rating: number;
  reviewCount: number;
  fee: number;
  availableToday: boolean;
  timeSlots: string[];
  avatar: string;
  about: string;
  education: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  hospital: string;
  date: string;
  category: 'Cardiology' | 'Gynecology' | 'Pathology' | 'Radiology' | 'Dermatology' | 'Others';
  reportedValue: string;
  referenceRange: string;
  aiExplanation: {
    EN: string;
    TE: string;
    HI: string;
  };
  dietarySuggestions: {
    EN: string[];
    TE: string[];
    HI: string[];
  };
  doctorAdvice: {
    EN: string;
    TE: string;
    HI: string;
  };
  hasAiExplanation: boolean;
  status: 'Normal' | 'Attention Required' | 'Optimal';
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: 'Before food' | 'After food' | 'With food';
  prescribedBy: string;
  hospital: string;
  status: 'ACTIVE' | 'COMPLETED';
  startDate: string;
  scheduleTimes: {
    id: string;
    time: string;
    label: string;
    taken: boolean;
    snoozed: boolean;
  }[];
}

export interface ExtractedOCR {
  id: string;
  uploadDate: string;
  doctorName: string;
  hospital: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    timing: 'Before food' | 'After food' | 'With food';
  }[];
  rawText: string;
  verified: boolean;
  imageUrl: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  category: 'Consultation' | 'Vitals' | 'Report' | 'Prescription' | 'Appointment' | 'Vaccination' | 'Blood Donation' | 'Milestone';
  hospital: string;
  doctor?: string;
  title: string;
  summary: string;
  details?: string;
  iconType?: string;
}

export interface BloodRequest {
  id: string;
  bloodGroup: string;
  unitsNeeded: number;
  hospital: string;
  location: string;
  urgency: 'URGENT' | 'HIGH' | 'NORMAL';
  patientContact: string;
  helpersCount: number;
  status: 'OPEN' | 'FULFILLED';
  postedDate: string;
}

export interface FamilyHealthNode {
  id: string;
  relation: string;
  name: string;
  condition: string;
  ageOfOnset: string;
  notes: string;
  status: 'High Impact' | 'Moderate' | 'Observed';
}

export interface VaccineItem {
  id: string;
  name: string;
  dose: string;
  dueDate: string;
  status: 'COMPLETED' | 'UPCOMING' | 'OVERDUE';
  givenDate?: string;
  center?: string;
}

export interface AppNotification {
  id: string;
  type: 'medicine' | 'appointment' | 'alert' | 'blood' | 'vaccine' | 'milestone' | 'report';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
