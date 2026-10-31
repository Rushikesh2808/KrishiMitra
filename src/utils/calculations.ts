import { NetEarningsInput, NetEarningsResult, MandiComparisonEntry } from '../types';
import { MANDI_LIST, DISTANCE_MATRIX, CROP_MANDI_PRICES } from '../data/mockData';

/**
 * Transparent Net Earnings Calculation Formula:
 * Net Earnings = Expected Revenue - Transportation Cost - Storage Cost - Other Expenses
 */
export const calculateNetEarnings = (input: NetEarningsInput): NetEarningsResult => {
  const {
    quantityQuintals,
    expectedPricePerQuintal,
    distanceKm,
    transportRatePerKmPerQuintal,
    holdingDays,
    storageCostPerDayPerQuintal,
    mandiCessPercentage,
    loadingUnloadingCostPerQuintal,
    packagingCostPerQuintal,
  } = input;

  // 1. Gross Expected Revenue
  const expectedRevenue = quantityQuintals * expectedPricePerQuintal;

  // 2. Transportation Cost = Distance (km) * Rate per km per quintal * Quantity (Qtl)
  const transportationCost = distanceKm * transportRatePerKmPerQuintal * quantityQuintals;

  // 3. Storage Cost = Holding Days * Storage Rate per day per quintal * Quantity (Qtl)
  const storageCost = holdingDays * storageCostPerDayPerQuintal * quantityQuintals;

  // 4. Other Expenses
  // Mandi Cess = % of gross revenue
  const mandiCessCost = (expectedRevenue * mandiCessPercentage) / 100;
  // Handling (hamali/loading/unloading)
  const handlingCost = loadingUnloadingCostPerQuintal * quantityQuintals;
  // Packaging / gunny bags
  const packagingCost = packagingCostPerQuintal * quantityQuintals;
  const otherExpenses = mandiCessCost + handlingCost + packagingCost;

  // Total Expenses
  const totalExpenses = transportationCost + storageCost + otherExpenses;

  // Realized Net Earnings
  const netEarnings = expectedRevenue - totalExpenses;
  const netEarningsPerQuintal = quantityQuintals > 0 ? netEarnings / quantityQuintals : 0;

  return {
    expectedRevenue,
    transportationCost,
    storageCost,
    mandiCessCost,
    handlingCost,
    otherExpenses,
    totalExpenses,
    netEarnings,
    netEarningsPerQuintal,
  };
};

/**
 * Compute Mandi Comparison Entries across all APMCs for a given crop, quantity & farmer village
 */
export const computeMandiComparisons = (
  cropId: string,
  quantityQuintals: number,
  villageId: string
): MandiComparisonEntry[] => {
  const cropPrices = CROP_MANDI_PRICES[cropId] || CROP_MANDI_PRICES['crop-soybean'];
  const villageDistances = DISTANCE_MATRIX[villageId] || DISTANCE_MATRIX['v-niphad'];

  const rawEntries = MANDI_LIST.map((mandi) => {
    const distanceKm = villageDistances[mandi.id] ?? 50;
    const priceData = cropPrices[mandi.id] ?? { price: 4800, dailyArrivalsTons: 300 };
    const pricePerQuintal = priceData.price;

    // Gross Revenue = Market Price * Quantity
    const grossRevenue = pricePerQuintal * quantityQuintals;

    // Dynamic transport rate based on distance brackets (economies of haulage scale)
    let ratePerKmPerQuintal = 2.8;
    let tollCorrridorFee = 0;

    if (distanceKm > 100) {
      ratePerKmPerQuintal = 2.4;
    } else if (distanceKm > 40) {
      ratePerKmPerQuintal = 2.6;
    }

    // Vashi / Mumbai highway corridor toll & entry tax
    if (mandi.id === 'm-vashi') {
      tollCorrridorFee = 1500;
    }

    const transportationCost = Math.round(distanceKm * ratePerKmPerQuintal * quantityQuintals + tollCorrridorFee);

    // Other Expenses: Mandi Cess (1.05%), Hamali / Labor, Packaging
    const mandiCess = Math.round((grossRevenue * 1.05) / 100);

    // City mandis (Pune, Vashi) have regulated labor unions (Mathadi)
    let hamaliPerQuintal = 14;
    if (mandi.id === 'm-vashi') hamaliPerQuintal = 28;
    else if (mandi.id === 'm-pune') hamaliPerQuintal = 22;
    else if (mandi.id === 'm-nashik') hamaliPerQuintal = 18;

    const packagingCost = 12 * quantityQuintals;
    const hamaliAndPackaging = Math.round(hamaliPerQuintal * quantityQuintals + packagingCost);
    const otherExpenses = mandiCess + hamaliAndPackaging;

    const totalDeductions = transportationCost + otherExpenses;
    const netEarnings = grossRevenue - totalDeductions;
    const netEarningsPerQuintal = quantityQuintals > 0 ? Math.round(netEarnings / quantityQuintals) : 0;
    const realizationPercentage = grossRevenue > 0 ? Number(((netEarnings / grossRevenue) * 100).toFixed(1)) : 0;

    return {
      mandiId: mandi.id,
      mandiName: mandi.name,
      marathiMandiName: mandi.marathiName,
      district: mandi.district,
      distanceKm,
      pricePerQuintal,
      grossRevenue,
      transportationCost,
      otherExpenses,
      mandiCess,
      hamaliAndPackaging,
      totalDeductions,
      netEarnings,
      netEarningsPerQuintal,
      realizationPercentage,
      isHighestNet: false,
      isHighestGrossPrice: false,
      isLowestTransportCost: false,
    };
  });

  // Determine highest net, highest gross price, and lowest transport cost
  let maxNet = -Infinity;
  let maxGrossPrice = -Infinity;
  let minTransport = Infinity;

  rawEntries.forEach((entry) => {
    if (entry.netEarnings > maxNet) maxNet = entry.netEarnings;
    if (entry.pricePerQuintal > maxGrossPrice) maxGrossPrice = entry.pricePerQuintal;
    if (entry.transportationCost < minTransport) minTransport = entry.transportationCost;
  });

  return rawEntries.map((entry) => ({
    ...entry,
    isHighestNet: entry.netEarnings === maxNet,
    isHighestGrossPrice: entry.pricePerQuintal === maxGrossPrice,
    isLowestTransportCost: entry.transportationCost === minTransport,
  }));
};
