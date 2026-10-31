import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MOCK_FPO_MEMBERS,
  MOCK_FARMER_LISTINGS,
  MOCK_AGGREGATED_LOTS,
  MOCK_BUYER_REQUIREMENTS,
  MOCK_BUYER_OFFERS,
  FpoAggregatedLot,
  BuyerSubmittedOffer
} from '../../data/fpoBuyerMockData';
import { formatINR } from '../../utils/currency';
import {
  Users,
  Layers,
  Building2,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Phone,
  Handshake,
  Plus,
  ArrowRight,
  ShieldCheck,
  Search,
  Check,
  X
} from 'lucide-react';

export const FpoDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'aggregation' | 'farmers' | 'negotiations' | 'buyer_reqs'>('aggregation');
  const [offers, setOffers] = useState<BuyerSubmittedOffer[]>(MOCK_BUYER_OFFERS);
  const [lots, setLots] = useState<FpoAggregatedLot[]>(MOCK_AGGREGATED_LOTS);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Counter-offer modal state
  const [counterModalOfferId, setCounterModalOfferId] = useState<string | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<number>(4950);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleAcceptOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'Accepted' as const } : o))
    );
    showToast('Offer accepted! Sales contract generated for buyer.');
  };

  const handleDeclineOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'Declined' as const } : o))
    );
    showToast('Offer declined.');
  };

  const handleSendCounter = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? {
              ...o,
              sellerCounterPrice: counterPriceInput,
              status: 'Counter Offer Received' as const,
            }
          : o
      )
    );
    setCounterModalOfferId(null);
    showToast(`Counter-offer of ₹${counterPriceInput}/Qtl sent to buyer.`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Counter Offer Modal */}
      {counterModalOfferId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              Propose Counter-Offer to Buyer
            </h3>
            <p className="text-xs text-slate-500">
              Enter your FPO's minimum acceptable price per quintal.
            </p>
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Counter Price (₹ / Qtl)
              </label>
              <input
                type="number"
                value={counterPriceInput}
                onChange={(e) => setCounterPriceInput(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-xl font-bold text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-600"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setCounterModalOfferId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSendCounter(counterModalOfferId)}
                className="px-4 py-2 text-xs font-bold bg-agri-700 hover:bg-agri-800 text-white rounded-xl"
              >
                Submit Counter-Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FPO Hero Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-agri-800 to-agri-900 rounded-2xl p-5 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-200 text-xs font-semibold mb-2 border border-emerald-600/40">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>FPO Hub • Farmer Producer Organization Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {currentUser?.organizationName || 'Sahyadri Farmers Producer Co. Ltd.'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1">
              Authorized Head: <strong className="text-white">{currentUser?.fullName}</strong> • Cluster: {currentUser?.operatingLocation || 'Nashik & Dindori'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 text-center sm:text-right border border-white/10 shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider block">
              FPO Reg Code
            </span>
            <span className="font-mono text-xs font-bold text-white">
              {currentUser?.registrationNumber || 'MH/NSK/FPO/2019/8842'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Member Farmers</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-900">142</div>
          <span className="text-[10px] text-slate-400">Verified landholders</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Aggregated Stock</span>
            <Layers className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-blue-800">1,650 Qtl</div>
          <span className="text-[10px] text-slate-400">Across 3 bulk lots</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Active Buyer Inquiries</span>
            <Building2 className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-amber-800">4 Bids</div>
          <span className="text-[10px] text-slate-400">Institutional buyers</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Total Pooled GMV</span>
            <TrendingUp className="w-4 h-4 text-agri-700" />
          </div>
          <div className="text-2xl font-black text-agri-900">₹81.2 L</div>
          <span className="text-[10px] text-slate-400">Current warehouse valuation</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('aggregation')}
          className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'aggregation'
              ? 'bg-agri-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Bulk Aggregation & Lots ({lots.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('negotiations')}
          className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'negotiations'
              ? 'bg-agri-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Buyer Bids & Negotiations ({offers.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('farmers')}
          className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'farmers'
              ? 'bg-agri-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Member Farmer Directory ({MOCK_FPO_MEMBERS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('buyer_reqs')}
          className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'buyer_reqs'
              ? 'bg-agri-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Posted Buyer Requirements ({MOCK_BUYER_REQUIREMENTS.length})
        </button>
      </div>

      {/* TAB 1: BULK AGGREGATION & LOTS */}
      {activeTab === 'aggregation' && (
        <div className="space-y-6">
          {/* Aggregated Lots */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-slate-900">
              Active Bulk Aggregated Produce Lots
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lots.map((lot) => (
                <div
                  key={lot.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{lot.lotCode}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          lot.status === 'Contract Finalized'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {lot.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900">
                      {lot.cropName} ({lot.variety})
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lot.qualityGrade}
                    </p>

                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Pooled Volume:</span>
                        <span className="font-bold text-slate-900">{lot.totalQuantityQuintals} Qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Farmers Contributing:</span>
                        <span className="font-semibold">{lot.contributingFarmersCount} farmers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Bulk Price:</span>
                        <span className="font-bold text-agri-800">{formatINR(lot.targetPricePerQuintal)}/Qtl</span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Top Active Bid:</span>
                        <span>{formatINR(lot.highestBidPrice)}/Qtl</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span>{lot.activeBiddersCount} buyers bidding</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('negotiations')}
                      className="text-xs font-bold text-agri-700 hover:text-agri-800"
                    >
                      View Bids ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Member Farmer Individual Produce Intake */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              Individual Member Produce Intake (Ready to Pool)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b">
                    <th className="py-2.5 px-3">Batch Code</th>
                    <th className="py-2.5 px-3">Farmer</th>
                    <th className="py-2.5 px-3">Village</th>
                    <th className="py-2.5 px-3">Crop / Variety</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Moisture</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_FARMER_LISTINGS.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{item.batchCode}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{item.farmerName}</td>
                      <td className="py-2.5 px-3 text-slate-600">{item.village}</td>
                      <td className="py-2.5 px-3 text-slate-800">{item.cropName} ({item.variety})</td>
                      <td className="py-2.5 px-3 font-bold text-agri-800">{item.quantityQuintals} Qtl</td>
                      <td className="py-2.5 px-3 text-slate-600">{item.moisturePercentage}%</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BUYER BIDS & NEGOTIATION CONSOLE */}
      {activeTab === 'negotiations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Institutional Buyer Offers & Negotiation Tracker
            </h3>
            <span className="text-xs text-slate-500">Live negotiation room</span>
          </div>

          <div className="space-y-3">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-base text-slate-900">{offer.cropName}</span>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                      {offer.quantityQuintals} Quintals
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        offer.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : offer.status === 'Declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {offer.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Source: <strong className="text-slate-800">{offer.sellerName}</strong> ({offer.sellerType}) • Delivery:{' '}
                    {offer.deliveryDate}
                  </p>

                  <div className="text-xs text-slate-500 flex flex-wrap gap-4 pt-1">
                    <span>
                      Offered Price: <strong className="text-slate-900 font-bold">{formatINR(offer.offeredPricePerQuintal)}/Qtl</strong>
                    </span>
                    {offer.sellerCounterPrice && (
                      <span>
                        Your Counter: <strong className="text-agri-800 font-bold">{formatINR(offer.sellerCounterPrice)}/Qtl</strong>
                      </span>
                    )}
                    <span>Payment: {offer.paymentTerms}</span>
                  </div>
                </div>

                {/* Actions */}
                {offer.status !== 'Accepted' && offer.status !== 'Declined' && (
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setCounterModalOfferId(offer.id)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                    >
                      Counter
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeclineOffer(offer.id)}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="px-4 py-2 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                    >
                      Accept Bid
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MEMBER FARMERS */}
      {activeTab === 'farmers' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Registered Member Farmers Directory ({MOCK_FPO_MEMBERS.length} Profiled)
            </h3>
            <span className="text-xs text-agri-700 font-semibold">e-KYC & Land Verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MOCK_FPO_MEMBERS.map((m) => (
              <div key={m.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{m.name}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {m.village}, Taluka {m.taluka} • Land: {m.landAcreage} Acres
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {m.primaryCrops.map((c) => (
                      <span key={c} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>Joined {m.joinDate}</span>
                  <div className="font-bold text-slate-700 mt-1">
                    {m.totalBatchesSubmitted} Batches Pooled
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: POSTED BUYER REQUIREMENTS */}
      {activeTab === 'buyer_reqs' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            Open Procurement Requirements Posted by Commercial Buyers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_BUYER_REQUIREMENTS.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">
                    {req.buyerType}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{req.buyerName}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Needs: <strong className="text-slate-900">{req.requiredQuantityQuintals} Qtl {req.cropName}</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Budget:</span>
                    <span className="font-bold text-agri-800">{formatINR(req.maxOfferedPricePerQuintal)}/Qtl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery:</span>
                    <span>{req.deliveryTerms}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 pt-1">
                    Quality: {req.qualityCriteria}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast(`Proposal sent to ${req.buyerName} for bulk lot allocation.`)}
                  className="w-full py-2 bg-agri-700 hover:bg-agri-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Submit FPO Bulk Bid
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
