import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Pill, Calendar, AlertTriangle, Droplet, Award, FileSpreadsheet } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    setActiveTab
  } = useApp();

  if (!isNotificationsOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-4 h-4 text-emerald-600" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'blood':
        return <Droplet className="w-4 h-4 text-rose-600" />;
      case 'milestone':
        return <Award className="w-4 h-4 text-teal-600" />;
      case 'report':
      default:
        return <FileSpreadsheet className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="absolute right-6 top-16 z-50 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
      <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-teal-400" />
          <h4 className="font-bold text-xs">Notifications & Reminders</h4>
        </div>
        <button
          onClick={() => setIsNotificationsOpen(false)}
          className="p-1 hover:bg-slate-800 rounded transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No active notifications.
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                setIsNotificationsOpen(false);
                if (n.type === 'medicine') setActiveTab('medicines');
                else if (n.type === 'appointment') setActiveTab('appointments');
                else if (n.type === 'alert') setActiveTab('trends');
                else if (n.type === 'blood') setActiveTab('blood_donation');
                else if (n.type === 'report') setActiveTab('reports');
              }}
              className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 items-start ${
                !n.read ? 'bg-teal-50/30' : ''
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="font-bold text-xs text-slate-900 truncate">{n.title}</h5>
                  <span className="text-[10px] text-slate-600 shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <span className="text-[10px] font-medium text-slate-600">
          Connected Real-time Patient Notifications
        </span>
      </div>
    </div>
  );
};
