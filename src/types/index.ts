export type MaterialType = 'pla' | 'resin' | 'nylon' | 'recyclable';

export interface MaterialOption {
  id: MaterialType;
  name: string;
  category: string;
  tagline: string;
  description: string;
  density: number; // g/cm3
  basePricePerCm3: number; // € per cm3 of printed volume
  finishingMultiplier: number;
  tensileStrength: string;
  heatResistance: string;
  accuracy: string;
  recommendedFor: string[];
  colors: { name: string; hex: string; preview: string }[];
}

export interface ModelStats {
  filename: string;
  dimensions: {
    x: number; // in mm
    y: number; // in mm
    z: number; // in mm
  };
  volumeCm3: number; // calculated volume in cm3
  triangleCount: number;
  weightGrams: number;
  estimatedPrintTimeHours: number;
}

export interface QuoteCalculation {
  material: MaterialOption;
  selectedColor: string;
  quantity: number;
  infillPercent: number;
  layerHeightMm: number;
  unitPrice: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  vatRate: number; // 21% Spain IVA
  vatAmount: number;
  totalEstimatedPrice: number;
  setupFee: number;
}

export interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  notes: string;
  acceptTerms: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'milo' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: { label: string; actionId: string }[];
}
