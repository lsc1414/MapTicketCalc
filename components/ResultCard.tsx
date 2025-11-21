
import React from 'react';
import { TrendingUp, Diamond } from 'lucide-react';
import { Rarity, CalculationResult } from '../types.ts';
import { TIER_MULTIPLIER, RARITY_MULTIPLIER, BASE_DROP_COUNT } from '../constants.ts';

interface ResultCardProps {
  calculation: CalculationResult;
  currentRarity: Rarity;
  tier: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ calculation, currentRarity, tier }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 p-6 md:p-8 shadow-2xl transition-all duration-500 ${currentRarity.border} ${currentRarity.bg} ${currentRarity.glow}`}>
      {/* Decorative Background Icon */}
      <div className="absolute top-[-20px] right-[-20px] opacity-10 pointer-events-none rotate-12">
        <Diamond size={160} />
      </div>
      
      <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${currentRarity.color}`}>
        <TrendingUp size={28} /> 计算结果预览
      </h2>

      {/* Total Risk Meter */}
      <div className="mb-10 relative z-10">
        <div className="flex justify-between items-end mb-2">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">总风险值 (Total Risk)</p>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-black text-white tracking-tighter leading-none drop-shadow-lg">
              {calculation.totalRisk}
            </span>
            <span className="text-slate-400 text-sm font-medium">pts</span>
          </div>
        </div>
        
        <div className="w-full bg-black/40 h-4 mt-2 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-600 transition-all duration-700 ease-out relative"
            style={{ width: `${Math.min(calculation.totalRisk, 100)}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/50 box-shadow-[0_0_10px_white]" />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono uppercase">
          <span>Safe Zone</span>
          <span>Extreme Danger (100+)</span>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-black/40 rounded-xl p-5 backdrop-blur-md border border-white/5">
          <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">最终掉落数量</p>
          <p className="text-4xl font-bold text-white">{calculation.finalDropCount}</p>
          <p className="text-xs text-slate-500 mt-1 font-mono">Raw: {calculation.rawDropCount.toFixed(2)}</p>
        </div>
        <div className="bg-black/40 rounded-xl p-5 backdrop-blur-md border border-emerald-500/20">
          <p className="text-emerald-400 text-[10px] uppercase tracking-wider mb-1">额外收益占比</p>
          <p className="text-4xl font-bold text-emerald-400">+{calculation.extraRatio.toFixed(1)}%</p>
          <p className="text-xs text-slate-500 mt-1">对比基础</p>
        </div>
      </div>

      {/* Formula Breakdown */}
      <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 font-mono space-y-2 relative z-10">
        <p className="font-bold text-slate-300 uppercase tracking-wider mb-2">Calculation Logic</p>
        <div className="flex justify-between">
           <span>Base Risk:</span>
           <span>({tier} × {TIER_MULTIPLIER}) + ({currentRarity.score} × {RARITY_MULTIPLIER}) = {calculation.tierScore + calculation.rarityScore}</span>
        </div>
        <div className="flex justify-between">
           <span>Affix Mod:</span>
           <span className={calculation.affixScore >= 0 ? 'text-red-400' : 'text-emerald-400'}>
             {calculation.affixScore >= 0 ? '+' : ''}{calculation.affixScore}
           </span>
        </div>
        <div className="flex justify-between border-t border-dashed border-white/10 pt-2 mt-2">
           <span>Formula:</span>
           <span>Ceil({BASE_DROP_COUNT} + √({calculation.totalRisk} × 2))</span>
        </div>
      </div>
    </div>
  );
};
