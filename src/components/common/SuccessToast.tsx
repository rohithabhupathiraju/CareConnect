import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const SuccessToast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border ${
          toast.type === 'success'
            ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
            : toast.type === 'info'
            ? 'bg-slate-900 text-teal-200 border-slate-700'
            : 'bg-amber-900 text-amber-100 border-amber-700'
        }`}
      >
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-5 h-5 text-teal-400 shrink-0" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        )}
        <p className="text-xs font-semibold leading-normal">{toast.message}</p>
      </div>
    </div>
  );
};
