import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, UserCheck, Stethoscope, Building2, Baby, Sparkles } from 'lucide-react';
import type { PersonaRole } from '../../types';

export const DemoModeBanner: React.FC = () => {
  const { persona, setPersona } = useApp();

  const personas: { id: PersonaRole; label: string; sub: string; icon: any; color: string }[] = [
    {
      id: 'patient_maya',
      label: 'Maya Rao',
      sub: 'Female Patient (28y)',
      icon: User,
      color: 'bg-teal-600 text-white'
    },
    {
      id: 'patient_arjun',
      label: 'Arjun Verma',
      sub: 'Male Patient (32y)',
      icon: UserCheck,
      color: 'bg-blue-600 text-white'
    },
    {
      id: 'child_aarav',
      label: 'Aarav Rao',
      sub: 'Child Patient (8y)',
      icon: Baby,
      color: 'bg-amber-600 text-white'
    },
    {
      id: 'doctor_priya',
      label: 'Dr. Priya Sharma',
      sub: 'Doctor View',
      icon: Stethoscope,
      color: 'bg-emerald-700 text-white'
    },
    {
      id: 'org_apollo',
      label: 'Apollo Hospitals',
      sub: 'Org Admin',
      icon: Building2,
      color: 'bg-indigo-700 text-white'
    }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2 flex flex-wrap items-center justify-between text-xs sticky top-0 z-50 shadow-md">
      <div className="flex items-center space-x-2">
        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          DEMO MODE
        </span>
        <span className="text-slate-300 font-medium hidden sm:inline">
          Hackathon Persona Switcher:
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {personas.map(p => {
          const Icon = p.icon;
          const isActive = persona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setPersona(p.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                isActive
                  ? `${p.color} ring-2 ring-white/30 shadow-sm scale-105`
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{p.label}</span>
              <span className="text-[10px] opacity-75 hidden md:inline">({p.sub})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
