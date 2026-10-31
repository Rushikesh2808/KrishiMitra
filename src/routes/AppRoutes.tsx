import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { CropSelectionPage } from '../modules/crop-selection/CropSelectionPage';
import { MarketComparisonPage } from '../modules/market-comparison/MarketComparisonPage';
import { PriceForecastPage } from '../modules/price-forecast/PriceForecastPage';
import { SellRecommendationsPage } from '../modules/sell-recommendations/SellRecommendationsPage';
import { NetEarningsPage } from '../modules/net-earnings/NetEarningsPage';
import { FpoMarketplacePage } from '../modules/fpo-marketplace/FpoMarketplacePage';
import { BuyerNegotiationsPage } from '../modules/buyer-negotiations/BuyerNegotiationsPage';
import { ProfilePage } from '../modules/profile/ProfilePage';
import { SettingsPage } from '../modules/settings/SettingsPage';
import { NotFoundPage } from '../modules/common/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="crop-selection" element={<CropSelectionPage />} />
        <Route path="market-comparison" element={<MarketComparisonPage />} />
        <Route path="price-forecast" element={<PriceForecastPage />} />
        <Route path="sell-recommendations" element={<SellRecommendationsPage />} />
        <Route path="net-earnings" element={<NetEarningsPage />} />
        <Route path="fpo-marketplace" element={<FpoMarketplacePage />} />
        <Route path="buyer-negotiations" element={<BuyerNegotiationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
