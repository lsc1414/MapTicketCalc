
import { Rarity, PresetAffix } from './types.ts';

export const TIER_MULTIPLIER = 5;
export const RARITY_MULTIPLIER = 10;
export const BASE_DROP_COUNT = 5;

export const RARITY_CONFIG: Rarity[] = [
  { 
    id: 0, 
    name: '普通 (Common)', 
    color: 'text-slate-400', 
    border: 'border-slate-600', 
    bg: 'bg-slate-800',
    glow: 'shadow-slate-500/10',
    score: 0 
  },
  { 
    id: 1, 
    name: '魔法 (Magic)', 
    color: 'text-blue-400', 
    border: 'border-blue-500', 
    bg: 'bg-blue-950', 
    glow: 'shadow-blue-500/20',
    score: 1 
  },
  { 
    id: 2, 
    name: '稀有 (Rare)', 
    color: 'text-yellow-400', 
    border: 'border-yellow-500', 
    bg: 'bg-yellow-950', 
    glow: 'shadow-yellow-500/20',
    score: 2 
  },
  { 
    id: 3, 
    name: '史诗 (Epic)', 
    color: 'text-purple-400', 
    border: 'border-purple-500', 
    bg: 'bg-purple-950', 
    glow: 'shadow-purple-500/20',
    score: 3 
  },
  { 
    id: 4, 
    name: '传说 (Legendary)', 
    color: 'text-orange-400', 
    border: 'border-orange-500', 
    bg: 'bg-orange-950', 
    glow: 'shadow-orange-500/30',
    score: 4 
  },
];

export const PRESET_AFFIXES: PresetAffix[] = [
  { name: '怪物强壮 (HP +30%)', value: 2, type: 'debuff' },
  { name: '怪物极速 (Spd +50%)', value: 3, type: 'debuff' },
  { name: '精英集结 (精英怪数量UP)', value: 3, type: 'debuff' },
  { name: '塔防强化 (塔攻击 +20%)', value: -2, type: 'buff' },
  { name: '初始资源 (金币 +500)', value: -1, type: 'buff' },
  { name: '幸运眷顾 (暴击率 +10%)', value: -3, type: 'buff' },
];
