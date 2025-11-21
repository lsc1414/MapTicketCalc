export interface Rarity {
  id: number;
  name: string;
  color: string;
  border: string;
  bg: string;
  glow: string;
  score: number;
}

export interface Affix {
  id: number;
  name: string;
  value: number;
  type: 'buff' | 'debuff';
}

export interface CalculationResult {
  tierScore: number;
  rarityScore: number;
  affixScore: number;
  totalRisk: number;
  rawDropCount: number;
  finalDropCount: number;
  extraRatio: number;
}

export interface PresetAffix {
  name: string;
  value: number;
  type: 'buff' | 'debuff';
}