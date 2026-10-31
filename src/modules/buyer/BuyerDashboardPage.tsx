import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MOCK_AGGREGATED_LOTS,
  MOCK_FARMER_LISTINGS,
  MOCK_BUYER_REQUIREMENTS,
  MOCK_BUYER_OFFERS,
  BuyerRequirement,
  BuyerSubmittedOffer
} from '../../data/fpoBuyerMockData';
import { formatINR } from '../../utils/currency';
import {
  Building2,
  Search,
  Plus,
  ShoppingCart,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Filter,
  Layers,
  ArrowRight,
  Handshake,
  Check,
  X,
  Wheat
} from 'lucide-react';

export const BuyerDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'marketplace' | 'requirements' | 'my_offers'>('marketplace');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Buyer requirements state
  const [requirements, setRequirements] = useState<BuyerRequirement[]>(MOCK_BUYER_REQUIREMENTS);
  const [offers, setOffers] = useState<BuyerSubmittedOffer[]>(MOCK_BUYER_OFFERS);

  // New Requirement Modal
  const [showNewReqModal, setShowNewReqModal] = useState(false);
  const [reqCrop, setReqCrop] = useState('Soybean');
  const [reqQty, setReqQty] = useState(500);
  const [reqMaxPrice, setReqMaxPrice] = useState(4920);
  const [reqDelivery, setReqDelivery] = useState<'Farmgate Pickup' | 'FPO Warehouse Delivery' | 'Mandi Delivery'>('FPO Warehouse Delivery');
  const [reqQuality, setReqQuality] = useState('Moisture <10%, Clean Grade A');

  // Bid submission modal
  const [bidModalLot, setBidModalLot] = useState<{ id: string; name: string; seller: string; qty: number; basePrice: number } | null>(null);
  const [bidPriceInput, setBidPriceInput] = useState<number>(4900);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: BuyerRequirement = {
      id: `req-${Date.now()}`,
      buyerName: currentUser?.businessName || 'Khandesh Agro-Processing',
      buyerType: currentUser?.buyerType || 'Agri-Processor',
      cropName: reqCrop,
      requiredQuantityQuintals: reqQty,
      maxOfferedPricePerQuintal: reqMaxPrice,
      preferredPickupLocation: 'Nashik / Niphad Cluster',
      deliveryTerms: reqDelivery,
      qualityCriteria: reqQuality,
      status: 'Open',
      postedDate: 'Today',
    };
    setRequirements([newReq, ...requirements]);
    setShowNewReqModal(false);
    showToast('New procurement requirement published to FPOs and farmers!');
  };

  const handleSubmitBid = () => {
    if (!bidModalLot) return;
    const newOffer: BuyerSubmittedOffer = {
      id: `off-${Date.now()}`,
      sellerType: 'FPO',
      sellerName: bidModalLot.seller,
      cropName: bidModalLot.name,
      quantityQuintals: bidModalLot.qty,
      offeredPricePerQuintal: bidPriceInput,
      paymentTerms: 'Immediate RTGS / Escrow on Delivery',
      deliveryDate: 'Within 5 Days',
      status: 'Pending Review',
    };
    setOffers([newOffer, ...offers]);
    setBidModalLot(null);
    showToast(`Bid of ₹${bidPriceInput}/Qtl submitted to ${bidModalLot.seller}!`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* New Requirement Modal */}
      {showNewReqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              Post Procurement Requirement for Farmers & FPOs
            </h3>
            <form onSubmit={handleCreateRequirement} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 uppercase block mb-1">Crop</label>
                <select
                  value={reqCrop}
                  onChange={(e) => setReqCrop(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl font-semibold bg-white"
                >
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Red Onion">Red Onion (कांदा)</option>
                  <option value="Cotton">Cotton (कापूस)</option>
                  <option value="Wheat">Wheat (गहू)</option>
                  <option value="Gram">Gram / Chana (हरभरा)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 uppercase block mb-1">Quantity Needed (Qtl)</label>
                  <input
                    type="number"
                    min="10"
                    value={reqQty}
                    onChange={(e) => setReqQty(parseInt(e.target.value) || 10)}
                    className="w-full px-3 py-2 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 uppercase block mb-1">Max Target Price (₹/Qtl)</label>
                  <input
                    type="number"
                    min="100"
                    value={reqMaxPrice}
                    onChange={(e) => setReqMaxPrice(parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-2 border rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase block mb-1">Delivery Terms</label>
                <select
                  value={reqDelivery}
                  onChange={(e) => setReqDelivery(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl font-semibold bg-white"
                >
                  <option value="FPO Warehouse Delivery">FPO Warehouse Delivery</option>
                  <option value="Farmgate Pickup">Farmgate Pickup</option>
                  <option value="Mandi Delivery">APMC Mandi Delivery</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase block mb-1">Quality Specifications</label>
                <input
                  type="text"
                  value={reqQuality}
                  onChange={(e) => setReqQuality(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl font-semibold"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewReqModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl cursor-pointer"
                >
                  Publish Requirement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {bidModalLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              Submit Direct Purchase Offer
            </h3>
            <p className="text-xs text-slate-500">
              Offering for {bidModalLot.qty} Qtl of {bidModalLot.name} from {bidModalLot.seller}.
            </p>
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Your Price Bid (₹ / Quintal)
              </label>
              <input
                type="number"
                value={bidPriceInput}
                onChange={(e) => setBidPriceInput(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-xl font-bold text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Total Contract Value: {formatINR(bidPriceInput * bidModalLot.qty)}
              </span>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setBidModalLot(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitBid}
                className="px-4 py-2 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl"
              >
                Submit Purchase Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 rounded-2xl p-5 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-200 text-xs font-semibold mb-2 border border-blue-600/40">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Commercial Buyer & Processor Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {currentUser?.businessName || 'Khandesh Agro-Processing & Exports'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Contact: <strong className="text-white">{currentUser?.fullName}</strong> ({currentUser?.buyerType || 'Agri-Processor'}) • Hub: {currentUser?.operatingLocation || 'Jalgaon & Nashik'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowNewReqModal(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Requirement</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('marketplace')}
          className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'marketplace'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Available Produce Marketplace
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('requirements')}
          className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'requirements'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          My Posted Requirements ({requirements.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('my_offers')}
          className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'my_offers'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          My Submitted Offers & Negotiations ({offers.length})
        </button>
      </div>

      {/* TAB 1: PRODUCE MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="space-y-4">
          {/* Search & Crop Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 text-xs font-bold">
              <span className="text-slate-400 mr-2 text-[11px]">Crop:</span>
              {['All', 'Soybean', 'Red Onion', 'Cotton', 'Wheat', 'Gram'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCropFilter(c)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedCropFilter === c
                      ? 'bg-blue-700 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search FPO or farmer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Section: FPO Aggregated Bulk Lots */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-700" />
              <span>Aggregated FPO Bulk Lots (Direct Commercial Contracts)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_AGGREGATED_LOTS.filter((l) =>
                selectedCropFilter === 'All' ? true : l.cropName.includes(selectedCropFilter)
              ).map((lot) => (
                <div key={lot.id} className="bg-white rounded-2xl p-4 border border-blue-200 shadow-card space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-[10px] text-blue-700 font-bold">FPO Aggregated</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {lot.qualityGrade}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900">{lot.cropName}</h4>
                    <p className="text-xs text-slate-500">{lot.variety}</p>

                    <div className="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Available Volume:</span>
                        <span className="font-bold text-slate-900">{lot.totalQuantityQuintals} Qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Seller:</span>
                        <span className="font-semibold text-slate-700">Sahyadri Farmers FPO</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Asking Price:</span>
                        <span className="font-bold text-agri-800">{formatINR(lot.targetPricePerQuintal)}/Qtl</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setBidModalLot({
                        id: lot.id,
                        name: lot.cropName,
                        seller: 'Sahyadri Farmers FPO',
                        qty: lot.totalQuantityQuintals,
                        basePrice: lot.targetPricePerQuintal,
                      });
                      setBidPriceInput(lot.targetPricePerQuintal - 30);
                    }}
                    className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Submit Bulk Purchase Offer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Individual Verified Farmer Lots */}
          <div className="space-y-3 pt-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
              <Wheat className="w-5 h-5 text-agri-700" />
              <span>Verified Farmgate Farmer Listings</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_FARMER_LISTINGS.filter((f) =>
                selectedCropFilter === 'All' ? true : f.cropName.includes(selectedCropFilter)
              ).map((f) => (
                <div key={f.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[10px] text-slate-400 font-bold">{f.batchCode}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                        Farmgate Pickup
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900">{f.cropName} ({f.variety})</h4>
                    <p className="text-xs text-slate-500">
                      Farmer: <strong className="text-slate-800">{f.farmerName}</strong> ({f.village})
                    </p>

                    <div className="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Available Load:</span>
                        <span className="font-bold text-slate-900">{f.quantityQuintals} Qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Moisture:</span>
                        <span className="font-semibold text-slate-700">{f.moisturePercentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Farmer Asking Price:</span>
                        <span className="font-bold text-agri-800">{formatINR(f.expectedPricePerQuintal)}/Qtl</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setBidModalLot({
                        id: f.id,
                        name: f.cropName,
                        seller: f.farmerName,
                        qty: f.quantityQuintals,
                        basePrice: f.expectedPricePerQuintal,
                      });
                      setBidPriceInput(f.expectedPricePerQuintal);
                    }}
                    className="w-full py-2 bg-agri-700 hover:bg-agri-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Bid Directly on Farmer Batch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY POSTED REQUIREMENTS */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Procurement Orders Broadcasted to FPOs & Farmers
            </h3>
            <button
              type="button"
              onClick={() => setShowNewReqModal(true)}
              className="px-3 py-1.5 bg-blue-700 text-white text-xs font-bold rounded-xl"
            >
              + Post New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{req.cropName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Target: <strong>{req.requiredQuantityQuintals} Qtl</strong> @ Max <strong>{formatINR(req.maxOfferedPricePerQuintal)}/Qtl</strong>
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                  Terms: {req.deliveryTerms} • Quality: {req.qualityCriteria}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MY OFFERS & NEGOTIATIONS */}
      {activeTab === 'my_offers' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            Purchase Offers & Negotiation Contract Tracker
          </h3>

          <div className="space-y-3">
            {offers.map((offer) => (
              <div key={offer.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">{offer.cropName}</span>
                    <span className="text-xs font-bold text-slate-700">{offer.quantityQuintals} Qtl</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        offer.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {offer.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Seller: <strong className="text-slate-800">{offer.sellerName}</strong> • Offered: {formatINR(offer.offeredPricePerQuintal)}/Qtl
                    {offer.sellerCounterPrice && (
                      <span className="text-rose-700 font-bold ml-2">
                        Seller Countered: {formatINR(offer.sellerCounterPrice)}/Qtl
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="font-bold text-slate-900">{formatINR(offer.offeredPricePerQuintal * offer.quantityQuintals)}</span>
                  <div className="text-[10px] text-slate-400">{offer.deliveryDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
