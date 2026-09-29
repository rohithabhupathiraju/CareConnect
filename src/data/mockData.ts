import type {
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

export const MAYA_PROFILE: PatientProfile = {
  id: 'patient_maya',
  name: 'Maya Rao',
  age: 28,
  gender: 'Female',
  healthId: 'HID-2026-4821-9137',
  bloodGroup: 'O+',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  allergies: ['Penicillin'],
  conditions: ['Asthma'],
  emergencyContact: {
    name: 'Rahul Rao',
    relation: 'Brother',
    phone: '+91 98765 43210'
  },
  connectedHospitals: ['Apollo Hospitals', 'CARE Hospitals', 'Yashoda Hospitals']
};

export const ARJUN_PROFILE: PatientProfile = {
  id: 'patient_arjun',
  name: 'Arjun Verma',
  age: 32,
  gender: 'Male',
  healthId: 'HID-2026-1082-5541',
  bloodGroup: 'A+',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  allergies: ['Sulfa Drugs'],
  conditions: ['Mild Hypertension'],
  emergencyContact: {
    name: 'Neha Verma',
    relation: 'Spouse',
    phone: '+91 98112 34567'
  },
  connectedHospitals: ['Apollo Hospitals', 'Yashoda Hospitals']
};

export const AARAV_PROFILE: PatientProfile = {
  id: 'child_aarav',
  name: 'Aarav Rao',
  age: 8,
  gender: 'Child',
  healthId: 'HID-2026-9931-1029',
  bloodGroup: 'O+',
  avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80',
  allergies: ['Dust & Pollen'],
  conditions: ['Pediatric Asthma'],
  emergencyContact: {
    name: 'Maya Rao',
    relation: 'Mother',
    phone: '+91 98765 43210'
  },
  connectedHospitals: ['CARE Hospitals', 'Rainbow Children\'s Hospital']
};

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp_apollo',
    name: 'Apollo Hospitals',
    type: 'Super Specialty Hospital',
    distance: '2.4 km away',
    address: 'Road No. 72, Jubilee Hills, Hyderabad',
    rating: 4.5,
    reviewCount: 320,
    emergency247: true,
    phone: '+91 40 2360 7777',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80',
    departments: ['Cardiology', 'Gynecology', 'Pediatrics', 'Neurology', 'Oncology'],
    about: 'Apollo Hospitals Jubilee Hills is a premier 550-bed tertiary care hospital offering multi-specialty clinical excellence, state-of-the-art ICUs, and 24/7 trauma emergency care.',
    facilities: ['24/7 Emergency & Ambulance', 'Level-3 ICU', 'Robotic Surgery Suite', 'Diagnostic Radiology & PET-CT', 'Organ Transplant Center']
  },
  {
    id: 'hosp_care',
    name: 'CARE Hospitals',
    type: 'Multi-Specialty Care',
    distance: '3.1 km away',
    address: 'Road No. 1, Banjara Hills, Hyderabad',
    rating: 4.4,
    reviewCount: 215,
    emergency247: true,
    phone: '+91 40 6165 6565',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    departments: ['Cardiology', 'Orthopedics', 'Nephrology', 'General Medicine'],
    about: 'CARE Hospitals Banjara Hills is renowned for cardiac sciences, joint replacement, advanced dialysis units, and comprehensive patient-centric care.',
    facilities: ['Advanced Cath Lab', '24/7 Emergency Trauma', 'Dialysis Center', 'Comprehensive Rehabilitation', 'Full Pathology Lab']
  },
  {
    id: 'hosp_yashoda',
    name: 'Yashoda Hospitals',
    type: 'Super Specialty Hospital',
    distance: '4.2 km away',
    address: 'Raj Bhavan Road, Somajiguda, Hyderabad',
    rating: 4.6,
    reviewCount: 410,
    emergency247: true,
    phone: '+91 40 4567 4567',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    departments: ['Gynecology', 'Pediatrics', 'Pulmonology', 'Gastroenterology'],
    about: 'Yashoda Hospitals Somajiguda is a leading medical destination equipped with advanced LINAC radiation oncology, maternal-fetal medicine, and critical care units.',
    facilities: ['Advanced Cancer Institute', '24/7 Stroke & Trauma Response', 'High-Risk Obstetrics Unit', 'Modular OT Suites']
  },
  {
    id: 'hosp_sunshine',
    name: 'Sunshine Hospitals',
    type: 'Multi-Specialty Hospital',
    distance: '5.8 km away',
    address: 'Near ORR Junction, Gachibowli, Hyderabad',
    rating: 4.3,
    reviewCount: 180,
    emergency247: true,
    phone: '+91 40 4455 0000',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80',
    departments: ['Orthopedics', 'Neurology', 'Emergency Care', 'Spine Surgery'],
    about: 'Sunshine Hospitals Gachibowli excels in joint replacement, sports medicine, complex neurotrauma surgery, and round-the-clock critical care.',
    facilities: ['Joint Replacement Center', '24/7 Emergency ER', 'Advanced MRI 3T', 'Neuro ICU']
  },
  {
    id: 'hosp_continental',
    name: 'Continental Hospitals',
    type: 'Super Specialty Tertiary Care',
    distance: '6.5 km away',
    address: 'IT Financial District, Nanakramguda, Hyderabad',
    rating: 4.7,
    reviewCount: 520,
    emergency247: true,
    phone: '+91 40 6700 0000',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80',
    departments: ['Oncology', 'Cardiology', 'Gastroenterology', 'Urology'],
    about: 'Continental Hospitals is a JCI-accredited 750-bed green hospital providing world-class tertiary healthcare, organ transplants, and cancer care.',
    facilities: ['JCI Accredited Standards', 'Level 1 Trauma Center', 'Bone Marrow Transplant', 'Hybrid Cath Lab']
  },
  {
    id: 'hosp_rainbow',
    name: 'Rainbow Children\'s Hospital',
    type: 'Pediatric & Perinatal Super Specialty',
    distance: '3.8 km away',
    address: 'Opposite Cyber Towers, Kondapur, Hyderabad',
    rating: 4.8,
    reviewCount: 290,
    emergency247: true,
    phone: '+91 40 4488 5000',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    departments: ['Pediatrics', 'Neonatology', 'Child Surgery', 'Fetal Medicine'],
    about: 'India\'s leading children\'s hospital providing dedicated NICU, PICU, pediatric surgery, developmental pediatrics, and round-the-clock pediatric ER.',
    facilities: ['Level 3 NICU & PICU', '24/7 Pediatric Emergency', 'Child Development Center', 'Fetal Medicine Suite']
  }
];

export const INITIAL_VITALS: VitalReading[] = [
  {
    id: 'v1',
    timestamp: '2026-09-26T09:10:00Z',
    date: '26 Sept 2026',
    time: '09:10 AM',
    bpSystolic: 123,
    bpDiastolic: 83,
    heartRate: 72,
    glucose: 146,
    glucoseType: 'Post-meal',
    spO2: 98,
    weight: 55,
    temp: 98.4,
    height: 165
  },
  {
    id: 'v2',
    timestamp: '2026-09-23T08:30:00Z',
    date: '23 Sept 2026',
    time: '08:30 AM',
    bpSystolic: 125,
    bpDiastolic: 85,
    heartRate: 74,
    glucose: 152,
    glucoseType: 'Post-meal',
    spO2: 98,
    weight: 55.2,
    temp: 98.6,
    height: 165
  },
  {
    id: 'v3',
    timestamp: '2026-09-19T09:00:00Z',
    date: '19 Sept 2026',
    time: '09:00 AM',
    bpSystolic: 120,
    bpDiastolic: 80,
    heartRate: 70,
    glucose: 160,
    glucoseType: 'Post-meal',
    spO2: 99,
    weight: 55.5,
    temp: 98.2,
    height: 165
  },
  {
    id: 'v4',
    timestamp: '2026-09-12T08:45:00Z',
    date: '12 Sept 2026',
    time: '08:45 AM',
    bpSystolic: 118,
    bpDiastolic: 78,
    heartRate: 68,
    glucose: 168,
    glucoseType: 'Post-meal',
    spO2: 98,
    weight: 56.0,
    temp: 98.4,
    height: 165
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc_priya',
    name: 'Dr. Priya Sharma',
    specialty: 'Gynecologist & Obstetrician',
    hospital: 'Apollo Hospitals',
    experienceYears: 8,
    languages: ['English', 'Telugu', 'Hindi'],
    rating: 4.7,
    reviewCount: 124,
    fee: 800,
    availableToday: true,
    timeSlots: ['10:30 AM', '11:30 AM', '04:00 PM', '06:30 PM'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    about: 'Dr. Priya Sharma is a leading Gynecologist with 8+ years of expertise in women\'s reproductive wellness, preventive care, and high-risk pregnancy management.',
    education: 'MBBS, MD (Obstetrics & Gynecology) - Osmania Medical College'
  },
  {
    id: 'doc_rajesh',
    name: 'Dr. Rajesh Kulkarni',
    specialty: 'Cardiologist',
    hospital: 'CARE Hospitals',
    experienceYears: 14,
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.9,
    reviewCount: 210,
    fee: 1200,
    availableToday: true,
    timeSlots: ['11:00 AM', '02:30 PM', '05:00 PM'],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    about: 'Dr. Rajesh Kulkarni specializes in preventive cardiology, blood pressure optimization, and non-invasive interventional cardiology.',
    education: 'MBBS, DM (Cardiology) - AIIMS New Delhi'
  },
  {
    id: 'doc_ananya',
    name: 'Dr. Ananya Reddy',
    specialty: 'General Physician & Diabetologist',
    hospital: 'Yashoda Hospitals',
    experienceYears: 10,
    languages: ['Telugu', 'English', 'Hindi'],
    rating: 4.8,
    reviewCount: 185,
    fee: 700,
    availableToday: false,
    timeSlots: ['Tomorrow 09:30 AM', 'Tomorrow 02:00 PM'],
    avatar: 'https://images.unsplash.com/photo-1594824813566-78853b47e584?auto=format&fit=crop&w=300&q=80',
    about: 'Expert in adult medicine, metabolic disorders, lifestyle disease management, and preventive wellness checks.',
    education: 'MBBS, DNB (Internal Medicine)'
  },
  {
    id: 'doc_srinivas',
    name: 'Dr. Srinivas Rao',
    specialty: 'Pediatrician',
    hospital: 'Rainbow Children\'s Hospital',
    experienceYears: 12,
    languages: ['Telugu', 'English'],
    rating: 4.9,
    reviewCount: 160,
    fee: 750,
    availableToday: true,
    timeSlots: ['10:00 AM', '01:30 PM', '04:30 PM'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    about: 'Specialist in pediatric growth tracking, childhood immunizations, asthma management, and adolescent healthcare.',
    education: 'MBBS, MD (Pediatrics) - Gandhi Medical College'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_1',
    doctorId: 'doc_priya',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'Gynecologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    hospital: 'Apollo Hospitals',
    date: 'Tomorrow, 27 Sept 2026',
    time: '10:30 AM',
    fee: 800,
    status: 'Upcoming',
    type: 'In-Person',
    reason: 'Routine quarterly wellness review & prescription renewal.'
  },
  {
    id: 'apt_2',
    doctorId: 'doc_rajesh',
    doctorName: 'Dr. Rajesh Kulkarni',
    doctorSpecialty: 'Cardiologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    hospital: 'CARE Hospitals',
    date: '15 Sept 2026',
    time: '02:30 PM',
    fee: 1200,
    status: 'Completed',
    type: 'In-Person',
    reason: 'BP trend monitoring',
    review: {
      rating: 5,
      comment: 'Very empathetic doctor who explained my readings clearly without causing stress.',
      date: '15 Sept 2026'
    }
  }
];

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep_1',
    title: 'Complete Blood Count (CBC) & Hb',
    hospital: 'Apollo Hospitals',
    date: '20 Sept 2026',
    category: 'Pathology',
    reportedValue: 'Hemoglobin: 9.2 g/dL',
    referenceRange: '12.0 - 15.5 g/dL',
    hasAiExplanation: true,
    status: 'Attention Required',
    aiExplanation: {
      EN: 'Your recorded Hemoglobin value of 9.2 g/dL is below the standard reference range (12.0 - 15.5 g/dL). This mild drop may indicate lower red blood cell count or iron reserve levels.',
      TE: 'మీ హిమోగ్లోబిన్ పరిమాణం 9.2 g/dL నామమాత్రపు స్థాయి (12.0 - 15.5 g/dL) కంటే కాస్త తక్కువగా ఉంది. ఇది ఇనుము శాతం తక్కువగా ఉందనడానికి సంకేతం కావచ్చు.',
      HI: 'आपकी हीमोग्लोबिन मात्रा 9.2 g/dL सामान्य सीमा (12.0 - 15.5 g/dL) से कम है। यह आयरन की कमी या हल्की एनीमिया की ओर इशारा करता है।'
    },
    dietarySuggestions: {
      EN: [
        'Include iron-rich foods: Spinach, pomegranates, beetroot, and jaggery.',
        'Pair iron foods with Vitamin C (lemons, amla) for enhanced absorption.',
        'Avoid drinking tea or coffee immediately after meals.'
      ],
      TE: [
        'ఇనుము సమృద్ధిగా ఉండే పాలాకూర, దానిమ్మ, బీట్‌రూట్ మరియు బెల్లం తినండి.',
        'విటమిన్ సీ (నిమ్మకాయ, ఉసిరి) ని ఆహారంతో పాటించి గ్రహణశక్తిని పెంచండి.'
      ],
      HI: [
        'आयरन समृद्ध आहार जैसे पालक, अनार, चुकंदर और गुड़ लें।',
        'विटामिन सी (नींबू, आंवला) को भोजन के साथ मिलाकर खाएं।'
      ]
    },
    doctorAdvice: {
      EN: 'Share this report with Dr. Priya Sharma during your visit tomorrow. Do not self-prescribe heavy iron supplements without clinical dosage guidance.',
      TE: 'రేపటి అపాయింట్‌లో డాక్టర్ ప్రియా శర్మగారితో ఈ నివేదికను పంచుకోండి.',
      HI: 'कल की डॉक्टर मुलाकात के दौरान इस रिपोर्ट को डॉक्टर प्रिया शर्मा को अवश्य दिखाएं।'
    }
  },
  {
    id: 'rep_2',
    title: 'Pelvic & Abdominal Ultrasound',
    hospital: 'CARE Hospitals',
    date: '15 Sept 2026',
    category: 'Gynecology',
    reportedValue: 'Uterine morphology normal, clear ovaries bilaterally',
    referenceRange: 'Normal physiological status',
    hasAiExplanation: true,
    status: 'Optimal',
    aiExplanation: {
      EN: 'The ultrasound imaging shows clear organ structures with no fluid accumulation or cyst formation detected.',
      TE: 'ఆల్ట్రాసౌండ్ స్కాన్ పరిశీలనలో అవయవాల నిర్మాణం సంపూర్ణంగా మరియు ఆరోగ్యకరంగా ఉంది.',
      HI: 'अल्ट्रासाउंड स्कैन में सभी अंग पूरी तरह सामान्य पाए गए हैं।'
    },
    dietarySuggestions: {
      EN: ['Maintain consistent daily hydration (2.5L water)', 'Balanced fiber intake'],
      TE: ['ప్రతిరోజూ మంచినీరు తగినంత తాగండి.'],
      HI: ['प्रतिदिन पर्याप्त पानी पीएं।']
    },
    doctorAdvice: {
      EN: 'Routine annual follow-up recommended.',
      TE: 'సంవత్సరానికి ఒకసారి సాధారణ తనిఖీ సరిపోతుంది.',
      HI: 'सालाना जांच की सलाह दी जाती है।'
    }
  }
];

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med_1',
    name: 'Paracetamol',
    dosage: '500 mg',
    frequency: '2 times/day',
    duration: '3 days',
    timing: 'After food',
    prescribedBy: 'Dr. Priya Sharma',
    hospital: 'Apollo Hospitals',
    status: 'ACTIVE',
    startDate: '26 Sept 2026',
    scheduleTimes: [
      { id: 's1', time: '08:00 AM', label: 'Morning Dose', taken: true, snoozed: false },
      { id: 's2', time: '08:00 PM', label: 'Evening Dose', taken: false, snoozed: false }
    ]
  },
  {
    id: 'med_2',
    name: 'Vitamin D3 Cholecalciferol',
    dosage: '60,000 IU',
    frequency: 'Once weekly',
    duration: '8 weeks',
    timing: 'After food',
    prescribedBy: 'Dr. Rajesh Kulkarni',
    hospital: 'CARE Hospitals',
    status: 'ACTIVE',
    startDate: '15 Sept 2026',
    scheduleTimes: [
      { id: 's3', time: '02:00 PM', label: 'Afternoon Dose', taken: false, snoozed: true }
    ]
  }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl_1',
    date: 'Today, 26 Sept 2026',
    time: '09:32 AM',
    category: 'Appointment',
    hospital: 'Apollo Hospitals',
    doctor: 'Dr. Priya Sharma',
    title: 'Follow-up Scheduled',
    summary: 'Confirmed quarterly gynecology review for tomorrow at 10:30 AM.'
  },
  {
    id: 'tl_2',
    date: 'Today, 26 Sept 2026',
    time: '09:30 AM',
    category: 'Prescription',
    hospital: 'Apollo Hospitals',
    doctor: 'Dr. Priya Sharma',
    title: 'Medicine Reminder Created',
    summary: 'Configured automated reminder for Paracetamol 500mg twice daily after food.'
  },
  {
    id: 'tl_3',
    date: 'Today, 26 Sept 2026',
    time: '09:25 AM',
    category: 'Prescription',
    hospital: 'Apollo Hospitals',
    doctor: 'Dr. Priya Sharma',
    title: 'Prescription Added via OCR',
    summary: 'Scanned & verified handwritten prescription digitizing 2 medications.'
  },
  {
    id: 'tl_4',
    date: 'Today, 26 Sept 2026',
    time: '09:10 AM',
    category: 'Vitals',
    hospital: 'Home Log (CareConnect App)',
    title: 'Vitals Recorded',
    summary: 'BP: 123/83 mmHg, Heart Rate: 72 BPM, Glucose: 146 mg/dL (Post-meal).'
  },
  {
    id: 'tl_5',
    date: '20 Sept 2026',
    time: '04:15 PM',
    category: 'Report',
    hospital: 'Apollo Hospitals',
    title: 'Complete Blood Count (CBC) Sync',
    summary: 'Hemoglobin 9.2 g/dL logged. AI plain language explanation generated.'
  },
  {
    id: 'tl_6',
    date: '15 Sept 2026',
    time: '03:00 PM',
    category: 'Consultation',
    hospital: 'CARE Hospitals',
    doctor: 'Dr. Rajesh Kulkarni',
    title: 'Cardiology Consultation',
    summary: 'Discussed BP baseline and weight progress. Vitamin D3 prescribed.'
  },
  {
    id: 'tl_7',
    date: '15 June 2026',
    time: '11:00 AM',
    category: 'Blood Donation',
    hospital: 'CARE Hospitals Blood Bank',
    title: 'Blood Donation Completed',
    summary: 'Donated 1 Unit of O+ Whole Blood. Badge earned: Regular Donor 🩸.'
  }
];

export const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'br_1',
    bloodGroup: 'O+',
    unitsNeeded: 2,
    hospital: 'Apollo Hospitals',
    location: 'Banjara Hills, Hyderabad',
    urgency: 'URGENT',
    patientContact: '+91 98490 12345',
    helpersCount: 4,
    status: 'OPEN',
    postedDate: 'Today, 11:30 AM'
  },
  {
    id: 'br_2',
    bloodGroup: 'A+',
    unitsNeeded: 1,
    hospital: 'Yashoda Hospitals',
    location: 'Secunderabad, Hyderabad',
    urgency: 'HIGH',
    patientContact: '+91 97011 88990',
    helpersCount: 2,
    status: 'OPEN',
    postedDate: 'Yesterday'
  }
];

export const INITIAL_FAMILY_NODES: FamilyHealthNode[] = [
  {
    id: 'fn_1',
    relation: 'Paternal Grandfather',
    name: 'Rameshwar Rao',
    condition: 'Hypertension & CAD',
    ageOfOnset: 'Age 58',
    notes: 'Managed with ACE inhibitors.',
    status: 'High Impact'
  },
  {
    id: 'fn_2',
    relation: 'Father',
    name: 'Kishore Rao',
    condition: 'Type 2 Diabetes Mellitus',
    ageOfOnset: 'Age 48',
    notes: 'Fasting glucose monitored quarterly.',
    status: 'High Impact'
  },
  {
    id: 'fn_3',
    relation: 'Maternal Aunt',
    name: 'Sunita Reddy',
    condition: 'Hypothyroidism',
    ageOfOnset: 'Age 35',
    notes: 'Thyroxine supplement 50mcg daily.',
    status: 'Moderate'
  },
  {
    id: 'fn_4',
    relation: 'Maya Rao (You)',
    name: 'Maya Rao',
    condition: 'Normal Health Baseline',
    ageOfOnset: 'Present',
    notes: 'Improving glucose trends & stable vitals.',
    status: 'Observed'
  }
];

export const INITIAL_CHILD_VACCINES: VaccineItem[] = [
  {
    id: 'vac_1',
    name: 'MMR (Measles, Mumps, Rubella)',
    dose: 'Dose 1',
    dueDate: '12 Jan 2026',
    status: 'COMPLETED',
    givenDate: '12 Jan 2026',
    center: 'Rainbow Children\'s Hospital'
  },
  {
    id: 'vac_2',
    name: 'Polio Oral Vaccine (OPV)',
    dose: 'Dose 3',
    dueDate: '15 Mar 2026',
    status: 'COMPLETED',
    givenDate: '15 Mar 2026',
    center: 'CARE Hospitals'
  },
  {
    id: 'vac_3',
    name: 'DPT Booster',
    dose: 'Dose 2',
    dueDate: '15 Oct 2026',
    status: 'UPCOMING',
    center: 'Rainbow Children\'s Hospital'
  },
  {
    id: 'vac_4',
    name: 'Annual Influenza Vaccine',
    dose: '2026 Dose',
    dueDate: '01 Sept 2026',
    status: 'OVERDUE',
    center: 'Apollo Hospitals'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'medicine',
    title: '💊 Medicine Reminder',
    message: 'Time to take Paracetamol 500 mg after evening meal (08:00 PM).',
    timestamp: '10 mins ago',
    read: false
  },
  {
    id: 'n2',
    type: 'appointment',
    title: '📅 Appointment Tomorrow',
    message: 'Your visit with Dr. Priya Sharma at Apollo Hospitals is scheduled for 10:30 AM.',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'n3',
    type: 'alert',
    title: '⚠ Health Trend Alert',
    message: 'Your recent BP readings have been trending slightly higher than baseline.',
    timestamp: '3 hours ago',
    read: true
  },
  {
    id: 'n4',
    type: 'blood',
    title: '🩸 Urgent Blood Needed Nearby',
    message: 'Apollo Hospitals Banjara Hills requested 2 Units of O+ Blood.',
    timestamp: '4 hours ago',
    read: false
  },
  {
    id: 'n5',
    type: 'milestone',
    title: '🎉 Health Improvement Milestone',
    message: 'Your recent glucose readings show a 7.5% improving trend!',
    timestamp: '1 day ago',
    read: true
  }
];

export const INITIAL_OCR_PREVIEW: ExtractedOCR = {
  id: 'ocr_sample_1',
  uploadDate: 'Today, 09:25 AM',
  doctorName: 'Dr. Priya Sharma',
  hospital: 'Apollo Hospitals',
  medications: [
    {
      name: 'Paracetamol',
      dosage: '500 mg',
      frequency: 'Twice daily',
      duration: '3 days',
      timing: 'After food'
    },
    {
      name: 'Pantoprazole',
      dosage: '40 mg',
      frequency: 'Once daily',
      duration: '5 days',
      timing: 'Before food'
    }
  ],
  rawText: 'Dr. Priya Sharma — Apollo Hospitals\nRx:\n1. Paracetamol 500 mg — 1 tab BD x 3 days (After food)\n2. Pantoprazole 40 mg — 1 tab OD x 5 days (Before food)\nFollow up after 7 days.',
  verified: false,
  imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
};
