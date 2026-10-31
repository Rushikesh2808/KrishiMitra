import React from 'react';
import { Users } from 'lucide-react';

export const FpoMarketplacePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">FPO & Bulk Buyer Marketplace</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Connect with Farmer Producer Organizations (FPOs), food processors, and verified institutional buyers.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 border border-dashed border-slate-300 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-800">FPO Marketplace Module Ready</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Enables direct bids, bulk farmgate pickups, and negotiation channels without middlemen commissions.
        </p>
      </div>
    </div>
  );
};
