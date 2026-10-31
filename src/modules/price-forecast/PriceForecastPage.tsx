import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export const PriceForecastPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">10-Day Crop Price Forecast</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Estimated price trends with confidence intervals and weather/arrival indicators.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-2.5 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Transparency Standard:</span> Forecast models present probabilistic ranges based on historical arrivals and seasonal trends. Price forecasts are informational estimates to guide planning, not guaranteed returns.
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 border border-dashed border-slate-300 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-800">10-Day Forecast Visualizer Ready</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Ready for Recharts integration showing 10-day predicted price trajectory, confidence intervals, and daily arrival signals.
        </p>
      </div>
    </div>
  );
};

