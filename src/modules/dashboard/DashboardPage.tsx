import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  TrendingUp,
  Store,
  Calculator,
  Compass,
  Users,
  Wheat,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-agri-800 to-agri-900 rounded-2xl p-5 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-agri-700/80 text-agri-200 text-xs font-medium mb-2 border border-agri-600/40">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Seva First Innovation Challenge • Maharashtra</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Namaskar, Ramesh Patil 🌾
            </h1>
            <p className="text-agri-200 text-xs sm:text-sm mt-1 max-w-xl">
              Welcome to KrishiMitra. Maximize your <strong className="text-white">actual net earnings</strong> across Maharashtra APMCs with transparent transport, holding & market analysis.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-agri-700/60 pt-3 sm:pt-0">
            <span className="text-xs text-agri-300">Active Crop Focus</span>
            <span className="text-base font-bold text-amber-300">Soybean (सोयाबीन)</span>
            <span className="text-[11px] text-agri-300">50 Quintals Ready</span>
          </div>
        </div>
      </div>

      {/* Core Principle Notice Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-earth-200 shadow-card flex items-start space-x-3.5">
        <div className="p-2.5 rounded-xl bg-agri-50 text-agri-700 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-agri-900 font-semibold block mb-0.5">
            Why Net Earnings Matter More Than Gross Price:
          </strong>
          A distant mandi quoting ₹200 higher per quintal often leaves you with ₹150 less in hand once transport freight, loading, and mandi cess are subtracted. KrishiMitra calculates the net realization before you dispatch.
        </div>
      </div>

      {/* Module Navigation Grid */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
          <span>Advisory Modules</span>
          <span className="text-xs font-normal text-slate-500">Foundation Setup Ready</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <NavLink
            to="/market-comparison"
            className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-agri-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-agri-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-agri-800">
                APMC Market Comparison
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Compare Lasalgaon, Nashik, Vashi, and Pune mandis with live freight deductions.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-agri-700">
              <span>View Mandis</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </NavLink>

          {/* Card 2 */}
          <NavLink
            to="/price-forecast"
            className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-agri-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-800">
                10-Day Price Forecast
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Estimated price trajectories with confidence bands and transparent risk alerts.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-blue-700">
              <span>Explore Forecast</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </NavLink>

          {/* Card 3 */}
          <NavLink
            to="/sell-recommendations"
            className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-agri-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-amber-800">
                Sell Now vs Wait Decision
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Holding cost vs expected price rise analysis for optimal selling windows.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-700">
              <span>Check Recommendation</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </NavLink>

          {/* Card 4 */}
          <NavLink
            to="/net-earnings"
            className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-agri-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-purple-800">
                Net Earnings Calculator
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Break down freight, storage, hamali, and packaging to compute your in-hand profit.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-purple-700">
              <span>Open Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </NavLink>

          {/* Card 5 */}
          <NavLink
            to="/fpo-marketplace"
            className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-agri-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-teal-800">
                FPO & Bulk Buyers
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Direct buyer bids with farmgate pickup options to eliminate transit hassles.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-teal-700">
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </NavLink>

          {/* Card 6 */}
          <NavLink
            to="/crop-selection"
            className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-agri-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-earth-100 text-earth-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Wheat className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-earth-900">
                Crop & Harvest Portfolio
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Soybean, Onion, Cotton, Gram, and Wheat variety tracking and storage life.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-earth-800">
              <span>Manage Produce</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
