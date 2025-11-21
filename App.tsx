import React, { useState, useMemo } from 'react';
import { RefreshCw, Layers } from 'lucide-react';
import { Affix, PresetAffix } from './types';
import { RARITY_CONFIG, TIER_MULTIPLIER, RARITY_MULTIPLIER, BASE_DROP_COUNT } from './constants';
import { ResultCard } from './components/ResultCard';
import { AffixManager } from './components/AffixManager';

export default function App() {
  // --- State ---
  const [tier, setTier] = useState(1);
  const [rarityId, setRarityId] = useState(0);
  const [activeAffixes, setActiveAffixes] = useState<Affix[]>([]);

  // --- Calculations ---
  const calculation = useMemo(() => {
    const tierScore = tier * TIER_MULTIPLIER;
    const rarityScore = RARITY_CONFIG[rarityId].score * RARITY_MULTIPLIER;
    
    const affixScore = activeAffixes.reduce((sum, affix) => sum + affix.value, 0);
    
    // Calculate Total Risk (Minimum 0)
    const totalRisk = Math.max(0, tierScore + rarityScore + affixScore);
    
    // Calculate Drops: Base + Sqrt(Risk * 2)
    const riskBonus = Math.sqrt(totalRisk * 2);
    const rawDropCount = BASE_DROP_COUNT + riskBonus;
    const finalDropCount = Math.ceil(rawDropCount);
    
    // Calculate Percentage
    const extraRatio = finalDropCount > 0 
      ? ((finalDropCount - BASE_DROP_COUNT) / finalDropCount) * 100 
      : 0;

    return {
      tierScore,
      rarityScore,
      affixScore,
      totalRisk,
      rawDropCount,
      finalDropCount,
      extraRatio
    };
  }, [tier, rarityId, activeAffixes]);

  // --- Handlers ---
  const addPresetAffix = (preset: PresetAffix) => {
    const newAffix: Affix = {
      id: Date.now(),
      name: preset.name,
      value: preset.value,
      type: preset.type
    };
    setActiveAffixes(prev => [...prev, newAffix]);
  };

  const addCustomAffix = (name: string, value: number) => {
    const newAffix: Affix = {
      id: Date.now(),
      name: name,
      value: value,
      type: value >= 0 ? 'debuff' : 'buff'
    };
    setActiveAffixes(prev => [...prev, newAffix]);
  };

  const removeAffix = (id: number) => {
    setActiveAffixes(prev => prev.filter(a => a.id !== id));
  };

  const reset = () => {
    setTier(1);
    setRarityId(0);
    setActiveAffixes([]);
  };

  const currentRarity = RARITY_CONFIG[rarityId];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 pb-12">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[0%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              异界门票属性计算器
            </h1>
            <p className="text-slate-400 text-sm mt-2 font-medium">Otherworld Map Attribute & Drop Rate Calculator</p>
          </div>
          <button 
            onClick={reset}
            className="self-start md:self-center flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-600 hover:text-white rounded-xl transition-all text-sm font-medium shadow-lg active:scale-95"
          >
            <RefreshCw size={16} /> 
            <span>重置全部 / Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Basic Attributes Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-transparent" />
              
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-emerald-400">
                <Layers size={20} /> 基础属性 (Basic Attributes)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tier Input */}
                <div className="space-y-3 group">
                  <label className="text-sm text-slate-400 flex justify-between font-medium group-hover:text-emerald-300 transition-colors">
                    <span>阶级 (Tier)</span>
                    <span className="text-emerald-400 font-mono bg-emerald-900/20 px-2 rounded">Risk +{calculation.tierScore}</span>
                  </label>
                  <div className="flex items-center gap-4 bg-slate-950/50 p-2 rounded-xl border border-slate-800">
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      value={tier} 
                      onChange={(e) => setTier(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={tier}
                      onChange={(e) => setTier(parseInt(e.target.value))}
                      className="w-16 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-center font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white"
                    />
                  </div>
                </div>

                {/* Rarity Input */}
                <div className="space-y-3 group">
                  <label className="text-sm text-slate-400 flex justify-between font-medium group-hover:text-emerald-300 transition-colors">
                    <span>稀有度 (Rarity)</span>
                    <span className="text-emerald-400 font-mono bg-emerald-900/20 px-2 rounded">Risk +{calculation.rarityScore}</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={rarityId}
                      onChange={(e) => setRarityId(parseInt(e.target.value))}
                      className={`w-full appearance-none bg-slate-950 border ${currentRarity.border} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all font-medium cursor-pointer hover:bg-slate-900`}
                      style={{ boxShadow: `0 0 10px ${currentRarity.color.replace('text-', '')}10` }}
                    >
                      {RARITY_CONFIG.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                    <div className={`absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none ${currentRarity.color}`}>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Affix Manager */}
            <AffixManager 
              activeAffixes={activeAffixes}
              affixScore={calculation.affixScore}
              onAddPreset={addPresetAffix}
              onAddCustom={addCustomAffix}
              onRemove={removeAffix}
            />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 h-fit">
            <ResultCard 
              calculation={calculation} 
              currentRarity={currentRarity}
              tier={tier}
            />

            {/* Info / Legend */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-sm text-slate-400 shadow-lg backdrop-blur-sm">
              <h3 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-xs">Rules & Logic</h3>
              <ul className="space-y-3 text-xs leading-relaxed">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>基础掉落为 <strong className="text-white font-mono">{BASE_DROP_COUNT}</strong> 次。</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-red-400">减益 (Debuff)</strong>: 怪物变强 = 风险升高 = 掉落增加。</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-emerald-400">增益 (Buff)</strong>: 玩家变强 = 风险降低 = 掉落减少。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}