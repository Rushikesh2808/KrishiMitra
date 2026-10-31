import React from 'react';
import { Compass } from 'lucide-react';

export const SellRecommendationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Sell Now vs Wait Recommendations</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Smart advisory comparing immediate market sale versus holding costs and storage risks.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 border border-dashed border-slate-300 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-800">Sell vs Wait Decision Engine Ready</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Advisory engine calculates storage decay, daily holding costs, and forecasted gain to recommend precise selling windows.
        </p>
      </div>
    </div>
  );
};

