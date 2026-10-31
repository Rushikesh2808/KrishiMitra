import React from 'react';
import { WelcomeSection } from './components/WelcomeSection';
import { MarketSnapshotSection } from './components/MarketSnapshotSection';
import { NetEarningsSection } from './components/NetEarningsSection';
import { SellingAdvisorySection } from './components/SellingAdvisorySection';
import { QuickAccessSection } from './components/QuickAccessSection';
import { NotificationDrawer } from './components/NotificationDrawer';
import { MOCK_CROPS } from '../../data/mockData';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [selectedCropId, setSelectedCropId] = React.useState<string>('crop-soybean');
  const [quantities, setQuantities] = React.useState<Record<string, number>>({
    'crop-soybean': 50,
    'crop-onion': 75,
    'crop-cotton': 30,
  });
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [refreshToast, setRefreshToast] = React.useState<string | null>(null);

  // Active crop metadata
  const activeCrop = MOCK_CROPS.find((c) => c.id === selectedCropId) || MOCK_CROPS[0];
  const currentQuantity = quantities[selectedCropId] ?? 50;

  const handleQuantityChange = (newQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [selectedCropId]: newQty,
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshToast('Latest APMC spot rates & arrival queues refreshed.');
      setTimeout(() => setRefreshToast(null), 3500);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification for manual refresh */}
      {refreshToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{refreshToast}</span>
        </div>
      )}

      {/* 1. Welcome Section & Crop Selection */}
      <WelcomeSection
        selectedCropId={selectedCropId}
        onSelectCrop={(id) => setSelectedCropId(id)}
        quantity={currentQuantity}
        onQuantityChange={handleQuantityChange}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      {/* 2. Today's Market Snapshot */}
      <MarketSnapshotSection
        cropName={activeCrop.name}
        marathiName={activeCrop.marathiName}
        samplePricePerQuintal={activeCrop.samplePricePerQuintal}
        priceTrend={activeCrop.priceTrend}
        trendPercent={activeCrop.trendPercent}
        bestMandiName={activeCrop.bestMandiName}
        bestMandiDistanceKm={activeCrop.bestMandiDistanceKm}
        bestMandiNetPrice={activeCrop.bestMandiNetPrice}
        lowestTransportMandiName={activeCrop.lowestTransportMandiName}
        lowestTransportCostPerQuintal={activeCrop.lowestTransportCostPerQuintal}
      />

      {/* 3. Net Earnings Overview & 4. Selling Advisory in Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Transparent Net Earnings Breakdown */}
        <NetEarningsSection
          cropId={activeCrop.id}
          cropName={activeCrop.name}
          quantityQuintals={currentQuantity}
          expectedPricePerQuintal={activeCrop.samplePricePerQuintal}
          distanceKm={activeCrop.bestMandiDistanceKm}
        />

        {/* Sell Now vs Wait Advisory */}
        <SellingAdvisorySection
          cropName={activeCrop.name}
          advisory={activeCrop.advisory}
          minPrice={activeCrop.forecastSummary.min10DayPrice}
          maxPrice={activeCrop.forecastSummary.max10DayPrice}
        />
      </div>

      {/* 5. Quick Access to All Modules */}
      <QuickAccessSection />
    </div>
  );
};
