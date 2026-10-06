import { MaterialOption, ModelStats, QuoteCalculation } from '../types';

export function calculateQuote(
  stats: ModelStats,
  material: MaterialOption,
  selectedColor: string,
  quantity: number,
  infillPercent: number,
  layerHeightMm: number
): QuoteCalculation {
  const safeQty = Math.max(1, Math.min(500, quantity || 1));
  const safeVolume = Math.max(0.5, stats.volumeCm3);

  // Infill multiplier: perimeter shell takes ~25% of density, remaining 75% scaled by infill
  const effectiveVolumeCm3 = safeVolume * ((infillPercent / 100) * 0.7 + 0.3);

  // Material cost
  const rawMaterialCost = effectiveVolumeCm3 * material.basePricePerCm3 * (material.density / 1.15);

  // Print speed factor (thinner layer height = more layers = more time)
  // standard layer height is 0.2mm
  const resolutionMultiplier = 0.2 / Math.max(0.05, layerHeightMm);
  const estimatedHours = Math.max(0.4, (effectiveVolumeCm3 / 14) * Math.sqrt(resolutionMultiplier));

  // Machine operating cost (€1.25 / hr)
  const machineCost = estimatedHours * 1.25 * material.finishingMultiplier;

  // Single unit base production cost
  const setupFee = safeQty === 1 ? 4.5 : Math.max(2.0, 5.0 / safeQty);
  const singleUnitRaw = rawMaterialCost + machineCost + setupFee;

  // Quantity tier discounts
  let discountPercent = 0;
  if (safeQty >= 25) discountPercent = 35;
  else if (safeQty >= 10) discountPercent = 25;
  else if (safeQty >= 5) discountPercent = 15;
  else if (safeQty >= 2) discountPercent = 8;

  const unitPrice = Number((singleUnitRaw * (1 - discountPercent / 100)).toFixed(2));
  const subtotal = Number((unitPrice * safeQty).toFixed(2));
  const discountAmount = Number(((singleUnitRaw * safeQty) - subtotal).toFixed(2));

  const vatRate = 0.21; // 21% IVA España
  const vatAmount = Number((subtotal * vatRate).toFixed(2));
  const totalEstimatedPrice = Number((subtotal + vatAmount).toFixed(2));

  return {
    material,
    selectedColor,
    quantity: safeQty,
    infillPercent,
    layerHeightMm,
    unitPrice,
    subtotal,
    discountPercent,
    discountAmount,
    vatRate,
    vatAmount,
    totalEstimatedPrice,
    setupFee: Number(setupFee.toFixed(2))
  };
}
