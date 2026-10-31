export interface FpoMemberFarmer {
  id: string;
  name: string;
  village: string;
  taluka: string;
  mobile: string;
  landAcreage: number;
  primaryCrops: string[];
  totalBatchesSubmitted: number;
  joinDate: string;
}

export interface FpoProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  village: string;
  cropName: string;
  variety: string;
  quantityQuintals: number;
  expectedPricePerQuintal: number;
  moisturePercentage: number;
  harvestDate: string;
  status: 'Ready for Aggregation' | 'Pooled in Bulk Lot' | 'Sold';
  batchCode: string;
}

export interface FpoAggregatedLot {
  id: string;
  lotCode: string;
  cropName: string;
  variety: string;
  totalQuantityQuintals: number;
  contributingFarmersCount: number;
  targetPricePerQuintal: number;
  warehouseLocation: string;
  qualityGrade: 'Grade A (Export)' | 'Grade A (Commercial)' | 'Grade B';
  status: 'Open for Bids' | 'Bidding in Progress' | 'Contract Finalized';
  highestBidPrice: number;
  activeBiddersCount: number;
}

export interface BuyerRequirement {
  id: string;
  buyerName: string;
  buyerType: string;
  cropName: string;
  requiredQuantityQuintals: number;
  maxOfferedPricePerQuintal: number;
  preferredPickupLocation: string;
  deliveryTerms: 'Farmgate Pickup' | 'FPO Warehouse Delivery' | 'Mandi Delivery';
  qualityCriteria: string;
  status: 'Open' | 'Partially Fulfilled' | 'Closed';
  postedDate: string;
}

export interface BuyerSubmittedOffer {
  id: string;
  requirementId?: string;
  lotId?: string;
  sellerType: 'FPO' | 'Individual Farmer';
  sellerName: string;
  cropName: string;
  quantityQuintals: number;
  offeredPricePerQuintal: number;
  sellerCounterPrice?: number;
  paymentTerms: string;
  deliveryDate: string;
  status: 'Pending Review' | 'Counter Offer Received' | 'Accepted' | 'Declined';
}

export const MOCK_FPO_MEMBERS: FpoMemberFarmer[] = [
  {
    id: 'mem-01',
    name: 'Ramesh Patil',
    village: 'Niphad',
    taluka: 'Niphad',
    mobile: '98220 45678',
    landAcreage: 6.5,
    primaryCrops: ['Soybean', 'Red Onion'],
    totalBatchesSubmitted: 8,
    joinDate: 'March 2023',
  },
  {
    id: 'mem-02',
    name: 'Suresh More',
    village: 'Pimpalgaon',
    taluka: 'Niphad',
    mobile: '98501 99234',
    landAcreage: 8.0,
    primaryCrops: ['Soybean', 'Wheat'],
    totalBatchesSubmitted: 12,
    joinDate: 'January 2022',
  },
  {
    id: 'mem-03',
    name: 'Ganesh Jadhav',
    village: 'Dindori',
    taluka: 'Dindori',
    mobile: '94222 77112',
    landAcreage: 12.0,
    primaryCrops: ['Soybean', 'Cotton', 'Gram'],
    totalBatchesSubmitted: 15,
    joinDate: 'July 2021',
  },
  {
    id: 'mem-04',
    name: 'Bhaskar Wagh',
    village: 'Lasalgaon',
    taluka: 'Niphad',
    mobile: '98234 55678',
    landAcreage: 5.0,
    primaryCrops: ['Red Onion', 'Soybean'],
    totalBatchesSubmitted: 6,
    joinDate: 'September 2023',
  },
  {
    id: 'mem-05',
    name: 'Dnyaneshwar Shinde',
    village: 'Sinnar',
    taluka: 'Sinnar',
    mobile: '99210 33455',
    landAcreage: 7.5,
    primaryCrops: ['Wheat', 'Gram'],
    totalBatchesSubmitted: 9,
    joinDate: 'November 2022',
  },
];

export const MOCK_FARMER_LISTINGS: FpoProduceListing[] = [
  {
    id: 'list-01',
    farmerId: 'mem-01',
    farmerName: 'Ramesh Patil',
    village: 'Niphad',
    cropName: 'Soybean',
    variety: 'JS-335 (Yellow)',
    quantityQuintals: 50,
    expectedPricePerQuintal: 4850,
    moisturePercentage: 9.2,
    harvestDate: '24 Oct 2026',
    status: 'Ready for Aggregation',
    batchCode: 'LOT-SB-NP-01',
  },
  {
    id: 'list-02',
    farmerId: 'mem-02',
    farmerName: 'Suresh More',
    village: 'Pimpalgaon',
    cropName: 'Soybean',
    variety: 'JS-335 (Yellow)',
    quantityQuintals: 80,
    expectedPricePerQuintal: 4880,
    moisturePercentage: 9.0,
    harvestDate: '26 Oct 2026',
    status: 'Pooled in Bulk Lot',
    batchCode: 'LOT-SB-PG-02',
  },
  {
    id: 'list-03',
    farmerId: 'mem-03',
    farmerName: 'Ganesh Jadhav',
    village: 'Dindori',
    cropName: 'Soybean',
    variety: 'JS-9305',
    quantityQuintals: 120,
    expectedPricePerQuintal: 4900,
    moisturePercentage: 8.8,
    harvestDate: '28 Oct 2026',
    status: 'Pooled in Bulk Lot',
    batchCode: 'LOT-SB-DN-03',
  },
  {
    id: 'list-04',
    farmerId: 'mem-04',
    farmerName: 'Bhaskar Wagh',
    village: 'Lasalgaon',
    cropName: 'Red Onion',
    variety: 'Garwa / Kharif',
    quantityQuintals: 150,
    expectedPricePerQuintal: 2400,
    moisturePercentage: 12.5,
    harvestDate: '29 Oct 2026',
    status: 'Ready for Aggregation',
    batchCode: 'LOT-ON-LS-04',
  },
  {
    id: 'list-05',
    farmerId: 'mem-05',
    farmerName: 'Dnyaneshwar Shinde',
    village: 'Sinnar',
    cropName: 'Gram / Chana',
    variety: 'Vijay Bold',
    quantityQuintals: 90,
    expectedPricePerQuintal: 5500,
    moisturePercentage: 8.5,
    harvestDate: '22 Oct 2026',
    status: 'Ready for Aggregation',
    batchCode: 'LOT-CH-SN-05',
  },
];

export const MOCK_AGGREGATED_LOTS: FpoAggregatedLot[] = [
  {
    id: 'agg-01',
    lotCode: 'SAHYADRI-BULK-SB-2026-A',
    cropName: 'Soybean',
    variety: 'Yellow JS-335 Grade A',
    totalQuantityQuintals: 500,
    contributingFarmersCount: 8,
    targetPricePerQuintal: 4950,
    warehouseLocation: 'Sahyadri Agri Warehouse, Dindori Road, Nashik',
    qualityGrade: 'Grade A (Export)',
    status: 'Bidding in Progress',
    highestBidPrice: 4910,
    activeBiddersCount: 4,
  },
  {
    id: 'agg-02',
    lotCode: 'SAHYADRI-BULK-ON-2026-B',
    cropName: 'Red Onion',
    variety: 'Nashik Garwa Kharif Medium Bold',
    totalQuantityQuintals: 800,
    contributingFarmersCount: 11,
    targetPricePerQuintal: 2450,
    warehouseLocation: 'Lasalgaon Cold Chain Facility',
    qualityGrade: 'Grade A (Commercial)',
    status: 'Open for Bids',
    highestBidPrice: 2420,
    activeBiddersCount: 3,
  },
  {
    id: 'agg-03',
    lotCode: 'SAHYADRI-BULK-CH-2026-C',
    cropName: 'Gram / Chana',
    variety: 'Vijay Bold Chana',
    totalQuantityQuintals: 350,
    contributingFarmersCount: 6,
    targetPricePerQuintal: 5580,
    warehouseLocation: 'Sahyadri Warehouse #2, Niphad',
    qualityGrade: 'Grade A (Export)',
    status: 'Contract Finalized',
    highestBidPrice: 5550,
    activeBiddersCount: 2,
  },
];

export const MOCK_BUYER_REQUIREMENTS: BuyerRequirement[] = [
  {
    id: 'req-01',
    buyerName: 'Khandesh Agro-Processing Mills',
    buyerType: 'Agri-Processor',
    cropName: 'Soybean',
    requiredQuantityQuintals: 600,
    maxOfferedPricePerQuintal: 4940,
    preferredPickupLocation: 'Nashik / Niphad / Dindori Cluster',
    deliveryTerms: 'FPO Warehouse Delivery',
    qualityCriteria: 'Moisture <10%, Foreign matter <2%, Oil content >18%',
    status: 'Open',
    postedDate: '30 Oct 2026',
  },
  {
    id: 'req-02',
    buyerName: 'Mahindra Agri Solutions Bulk Export',
    buyerType: 'Exporter',
    cropName: 'Red Onion',
    requiredQuantityQuintals: 1000,
    maxOfferedPricePerQuintal: 2480,
    preferredPickupLocation: 'Lasalgaon / Pimpalgaon Region',
    deliveryTerms: 'Farmgate Pickup',
    qualityCriteria: 'Size 45-55mm, Red skin intact, zero sprouting',
    status: 'Open',
    postedDate: '29 Oct 2026',
  },
  {
    id: 'req-03',
    buyerName: 'ITC Choupal Fresh Grains',
    buyerType: 'Retail Chain / Aggregator',
    cropName: 'Wheat',
    requiredQuantityQuintals: 400,
    maxOfferedPricePerQuintal: 2950,
    preferredPickupLocation: 'Nashik District',
    deliveryTerms: 'Mandi Delivery',
    qualityCriteria: 'Lokwan Sharbati Bold, Moisture <11%',
    status: 'Partially Fulfilled',
    postedDate: '27 Oct 2026',
  },
];

export const MOCK_BUYER_OFFERS: BuyerSubmittedOffer[] = [
  {
    id: 'off-01',
    requirementId: 'req-01',
    lotId: 'agg-01',
    sellerType: 'FPO',
    sellerName: 'Sahyadri Farmers Producer Co. Ltd.',
    cropName: 'Soybean',
    quantityQuintals: 500,
    offeredPricePerQuintal: 4920,
    sellerCounterPrice: 4950,
    paymentTerms: '50% on Loading, 50% within 48 hrs of Mill delivery',
    deliveryDate: '5 Nov 2026',
    status: 'Counter Offer Received',
  },
  {
    id: 'off-02',
    sellerType: 'Individual Farmer',
    sellerName: 'Ramesh Patil',
    cropName: 'Soybean',
    quantityQuintals: 50,
    offeredPricePerQuintal: 4890,
    paymentTerms: 'Immediate RTGS on Farmgate Pickup',
    deliveryDate: '3 Nov 2026',
    status: 'Pending Review',
  },
  {
    id: 'off-03',
    lotId: 'agg-03',
    sellerType: 'FPO',
    sellerName: 'Sahyadri Farmers Producer Co. Ltd.',
    cropName: 'Gram / Chana',
    quantityQuintals: 350,
    offeredPricePerQuintal: 5550,
    paymentTerms: '100% Escrow Bank Transfer',
    deliveryDate: '2 Nov 2026',
    status: 'Accepted',
  },
];
