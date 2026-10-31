import React from 'react';
import { Handshake } from 'lucide-react';

export const BuyerNegotiationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Buyer Offers & Negotiations</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Review counter-offers, accept bids, or propose minimum farmgate prices.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 border border-dashed border-slate-300 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
          <Handshake className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-800">Negotiations Engine Ready</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Facilitates counter-offer tracking, payment guarantee terms, and collection agreements.
        </p>
      </div>
    </div>
  );
};

