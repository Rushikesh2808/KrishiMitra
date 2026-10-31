import { Crop, Mandi, ForecastPoint, SellRecommendation, FarmerProfile } from '../types';

export const CURRENT_FARMER: FarmerProfile = {
  id: 'farmer-mh-001',
  fullName: 'Ramesh Patil',
  village: 'Niphad',
  taluka: 'Niphad',
  district: 'Nashik',
  state: 'Maharashtra',
  mobile: '+91 98220 45678',
  preferredLanguage: 'Marathi',
  defaultCrops: ['crop-soybean', 'crop-onion', 'crop-cotton'],
};

export const MOCK_CROPS: (Crop & {
  currentQuantityQuintals: number;
  samplePricePerQuintal: number;
  priceTrend: 'rising' | 'falling' | 'stable';
  trendPercent: number;
  bestMandiName: string;
  bestMandiDistanceKm: number;
  bestMandiNetPrice: number;
  lowestTransportMandiName: string;
  lowestTransportCostPerQuintal: number;
  advisory: SellRecommendation;
  forecastSummary: {
    min10DayPrice: number;
    max10DayPrice: number;
    projectedChangePercent: number;
  };
})[] = [
  {
    id: 'crop-soybean',
    name: 'Soybean',
    marathiName: 'सोयाबीन (JS-335)',
    category: 'Oilseeds',
    standardUnit: 'Quintal',
    icon: '🌱',
    typicalShelfLifeDays: 180,
    currentQuantityQuintals: 50,
    samplePricePerQuintal: 4850,
    priceTrend: 'rising',
    trendPercent: 2.8,
    bestMandiName: 'Lasalgaon APMC',
    bestMandiDistanceKm: 32,
    bestMandiNetPrice: 4680,
    lowestTransportMandiName: 'Pimpalgaon Baswant APMC',
    lowestTransportCostPerQuintal: 45,
    advisory: {
      cropId: 'crop-soybean',
      action: 'WAIT_SHORT_TERM',
      confidenceLevel: 'High',
      recommendedWindow: 'Nov 4 – Nov 7 (Hold 4-6 Days)',
      projectedNetGainPerQuintal: 230,
      riskFactor: 'Low',
      rationale:
        'Crushing plant demand in Vidarbha and Khandesh is accelerating. Lasalgaon arrivals are down 18%, projecting a ₹200-₹260/Qtl gain that comfortably outpaces storage cost (₹15/Qtl for 5 days).',
      storageFeasibilityNotice: 'Moisture content is optimal (<10%). Dry storage holding risk is minimal.',
    },
    forecastSummary: {
      min10DayPrice: 4850,
      max10DayPrice: 5120,
      projectedChangePercent: 5.5,
    },
  },
  {
    id: 'crop-onion',
    name: 'Red Onion (Kharif)',
    marathiName: 'लाल कांदा (खरीप)',
    category: 'Vegetables',
    standardUnit: 'Quintal',
    icon: '🧅',
    typicalShelfLifeDays: 25,
    currentQuantityQuintals: 75,
    samplePricePerQuintal: 2350,
    priceTrend: 'falling',
    trendPercent: -3.5,
    bestMandiName: 'Yeola APMC',
    bestMandiDistanceKm: 42,
    bestMandiNetPrice: 2210,
    lowestTransportMandiName: 'Lasalgaon APMC',
    lowestTransportCostPerQuintal: 40,
    advisory: {
      cropId: 'crop-onion',
      action: 'SELL_NOW',
      confidenceLevel: 'High',
      recommendedWindow: 'Within next 24-48 hours',
      projectedNetGainPerQuintal: -120,
      riskFactor: 'High',
      rationale:
        'Heavy Kharif fresh arrivals from Ahmednagar and Karnataka markets are starting. High humidity increases weight loss and spoilage risk (3-5% weight loss over 7 days). Immediate sale preserves net profit.',
      storageFeasibilityNotice: 'Kharif onions possess high moisture and do not store well. Sell immediately.',
    },
    forecastSummary: {
      min10DayPrice: 2050,
      max10DayPrice: 2380,
      projectedChangePercent: -8.5,
    },
  },
  {
    id: 'crop-cotton',
    name: 'Cotton (Kapus)',
    marathiName: 'कापूस (मध्यम धागा)',
    category: 'Commercial',
    standardUnit: 'Quintal',
    icon: '☁️',
    typicalShelfLifeDays: 240,
    currentQuantityQuintals: 30,
    samplePricePerQuintal: 7100,
    priceTrend: 'stable',
    trendPercent: 0.4,
    bestMandiName: 'Jalgaon Cotton Market',
    bestMandiDistanceKm: 145,
    bestMandiNetPrice: 6790,
    lowestTransportMandiName: 'Malegaon APMC',
    lowestTransportCostPerQuintal: 95,
    advisory: {
      cropId: 'crop-cotton',
      action: 'WAIT_HARVEST_PEAK',
      confidenceLevel: 'Medium',
      recommendedWindow: 'Mid November (Hold 12-15 Days)',
      projectedNetGainPerQuintal: 380,
      riskFactor: 'Moderate',
      rationale:
        'CCI (Cotton Corporation of India) procurement centers are scheduled to open operations next week at MSP (₹7,121). Private ginners are anticipated to increase bids to secure quality lots.',
      storageFeasibilityNotice: 'Store in moisture-proof sheds to prevent discoloration and weight changes.',
    },
    forecastSummary: {
      min10DayPrice: 7050,
      max10DayPrice: 7520,
      projectedChangePercent: 4.8,
    },
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Lasalgaon Mandi Soybean Rate Alert',
    message: 'Modal price rose by ₹85/Qtl today due to increased oil miller inquiries.',
    time: '2 hours ago',
    type: 'price_up',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Sahyadri Farmers FPO New Buying Bid',
    message: 'Offering ₹4,890/Qtl for 50+ Qtl Soybean with farmgate pickup in Niphad.',
    time: '4 hours ago',
    type: 'fpo_offer',
    read: false,
  },
];
