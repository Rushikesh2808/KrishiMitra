import { NetEarningsInput, NetEarningsResult } from '../types';

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
