import React from 'react';
import { X, Bell, TrendingUp, Handshake, CheckCircle2 } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../../data/mockData';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = React.useState(MOCK_NOTIFICATIONS);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-agri-800 text-white">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-agri-200" />
            <h3 className="font-bold text-base">Market Alerts & Updates</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-agri-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Recent alerts ({notifications.length})</span>
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-agri-700 hover:text-agri-800 font-semibold"
            >
              Mark all as read
            </button>
          </div>

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.read
                  ? 'bg-slate-50/70 border-slate-200 text-slate-600'
                  : 'bg-agri-50/50 border-agri-200 shadow-xs'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    n.type === 'price_up'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {n.type === 'price_up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <Handshake className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
            <span className="font-semibold block mb-0.5">Alerts Delivery:</span>
            Alerts are calibrated according to local Maharashtra APMC arrival timings (typically 9:00 AM to 2:00 PM).
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
