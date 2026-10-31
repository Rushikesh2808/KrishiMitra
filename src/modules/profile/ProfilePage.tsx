import React from 'react';
import { User, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Farmer Registration & Profile</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage farm location, primary crops, vehicle access, and language preferences.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-card max-w-xl">
        <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-full bg-agri-100 text-agri-800 flex items-center justify-center font-bold text-lg border-2 border-agri-300">
            RP
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Ramesh Patil</h3>
            <p className="text-xs text-agri-700 font-medium flex items-center mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Verified Farmer • Nashik District
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <span>Niphad, Nashik, Maharashtra - 422303</span>
          </div>
          <div className="flex items-center text-slate-600">
            <Phone className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <span>+91 98220 XXXXX</span>
          </div>
        </div>
      </div>
    </div>
  );
};
