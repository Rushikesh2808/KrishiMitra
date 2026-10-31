import React from 'react';
import { Bell, Globe, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Notifications & Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure price drop/rise alerts, mandi radius, and language display.
        </p>
      </div>

      <div className="bg-white rounded-xl divide-y divide-slate-100 border border-slate-200 shadow-card max-w-xl">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-agri-700" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Language / भाषा</p>
              <p className="text-xs text-slate-500">English / मराठी / हिंदी</p>
            </div>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-700">
            Marathi (मराठी)
          </span>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-agri-700" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Mandi Price Spike Alerts</p>
              <p className="text-xs text-slate-500">Instant SMS/App notification on ₹100+ rise</p>
            </div>
          </div>
          <span className="text-xs font-medium text-agri-700 bg-agri-50 px-2 py-1 rounded">
            Enabled
          </span>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-agri-700" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Seva First Challenge Mode</p>
              <p className="text-xs text-slate-500">Demonstration data & benchmarks</p>
            </div>
          </div>
          <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">
            Prototype Active
          </span>
        </div>
      </div>
    </div>
  );
};
