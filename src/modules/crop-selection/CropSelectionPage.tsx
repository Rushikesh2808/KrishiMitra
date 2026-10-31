import React from 'react';
import { Wheat, Plus } from 'lucide-react';

export const CropSelectionPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Crops & Produce Selection</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Select or update your harvested crops to customize price forecasts and mandi comparisons.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-agri-700 hover:bg-agri-800 text-white text-xs font-semibold shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Harvest</span>
        </button>
      </div>

      <div className="bg-white rounded-xl p-8 border border-dashed border-slate-300 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-agri-50 text-agri-700 flex items-center justify-center mx-auto">
          <Wheat className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-800">Crop Selection Module Ready</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Foundational routing and data contracts established. Will feature Maharashtra key cash crops (Soybean, Onion, Cotton, Chana, Tur) with shelf-life metrics.
        </p>
      </div>
    </div>
  );
};

