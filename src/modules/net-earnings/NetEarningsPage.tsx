import React from 'react';
import { Calculator } from 'lucide-react';

export const NetEarningsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Net Earnings Calculator</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Compute your true net revenue after transparent deductions for freight, loading, storage, and APMC cess.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 border border-dashed border-slate-300 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
          <Calculator className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-800">Net Earnings Formula Engine Ready</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Formula: <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono text-[11px]">Net Earnings = Revenue - Transport - Storage - Expenses</code>. Interactive sliders and expense breakdowns ready for implementation.
        </p>
      </div>
    </div>
  );
};
