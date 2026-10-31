import React from 'react';
import { Store } from 'lucide-react';

export const MarketComparisonPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">APMC Market Comparison</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Compare modal prices, arrival volumes, transit costs, and actual in-hand net realization across Maharashtra Mandis.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 border border-dashed border-slate-300 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-agri-700 flex items-center justify-center mx-auto">
          <Store className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-800">Mandi Comparison Module Ready</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Foundational routing and data contracts established. Will evaluate Lasalgaon, Nashik, Vashi, Pune, and Latur APMCs with freight-adjusted net pricing.
        </p>
      </div>
    </div>
  );
};
