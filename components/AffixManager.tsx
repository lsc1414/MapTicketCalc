
import React, { useState } from 'react';
import { Plus, Trash2, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { Affix, PresetAffix } from '../types.ts';
import { PRESET_AFFIXES } from '../constants.ts';

interface AffixManagerProps {
  activeAffixes: Affix[];
  affixScore: number;
  onAddPreset: (preset: PresetAffix) => void;
  onAddCustom: (name: string, value: number) => void;
  onRemove: (id: number) => void;
}

export const AffixManager: React.FC<AffixManagerProps> = ({ 
  activeAffixes, 
  affixScore, 
  onAddPreset, 
  onAddCustom, 
  onRemove 
}) => {
  const [customName, setCustomName] = useState('');
  const [customValue, setCustomValue] = useState<string>('1');
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to show only top 4 items unless expanded
  const visibleAffixes = isExpanded ? activeAffixes : activeAffixes.slice(0, 4);
  const hiddenCount = activeAffixes.length - visibleAffixes.length;

  const handleCustomSubmit = () => {
    if (!customName) return;
    const val = parseInt(customValue);
    if (isNaN(val)) return;
    
    onAddCustom(customName, val);
    setCustomName('');
    setCustomValue('1');
    // Optional: Auto-expand if user adds many items, but keeping it collapsed keeps UI clean
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-400">
          <ShieldAlert size={20} /> 词条修正 (Affixes)
        </h2>
        <span className={`font-mono font-bold px-3 py-1 rounded-full text-sm ${affixScore >= 0 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
          Risk {affixScore >= 0 ? '+' : ''}{affixScore}
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="mb-8">
        <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-bold">快速添加预设 / Quick Add</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_AFFIXES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onAddPreset(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all active:scale-95 ${
                preset.type === 'debuff' 
                  ? 'border-red-900/30 bg-red-950/10 text-red-400 hover:bg-red-900/20 hover:border-red-500/50' 
                  : 'border-emerald-900/30 bg-emerald-950/10 text-emerald-400 hover:bg-emerald-900/20 hover:border-emerald-500/50'
              }`}
            >
              {preset.name} <span className="opacity-75 ml-1">{preset.value > 0 ? '+' : ''}{preset.value}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Input */}
      <div className="flex gap-2 mb-6 p-1 bg-slate-950 rounded-xl border border-slate-800 focus-within:border-emerald-500/50 transition-colors">
        <input
          type="text"
          placeholder="自定义词条名称..."
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="flex-1 bg-transparent text-sm px-3 focus:outline-none text-slate-200 placeholder-slate-600"
          onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
        />
        <div className="flex items-center border-l border-slate-800 pl-2">
           <span className="text-slate-500 text-xs mr-1">Val:</span>
           <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="w-12 bg-transparent text-sm text-center font-mono focus:outline-none text-white"
            onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
          />
        </div>
        <button 
          onClick={handleCustomSubmit}
          disabled={!customName}
          className="bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white px-3 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-emerald-400"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Active List Header */}
      <div className="flex justify-between items-end mb-2 px-1">
        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">已生效词条 / Active List</p>
        <span className="text-xs text-slate-600">{activeAffixes.length} items</span>
      </div>

      {/* List Container */}
      <div className="space-y-2 bg-slate-950/50 rounded-xl p-2 min-h-[100px]">
        {activeAffixes.length === 0 && (
          <div className="h-24 flex flex-col items-center justify-center text-slate-600 text-sm border-2 border-dashed border-slate-800/50 rounded-lg">
            <span className="italic">暂无词条</span>
            <span className="text-xs opacity-50 mt-1">Add affixes above</span>
          </div>
        )}
        
        {visibleAffixes.map((affix) => (
          <div key={affix.id} className="group flex justify-between items-center bg-slate-800/40 px-3 py-2.5 rounded-lg border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${affix.value >= 0 ? 'bg-red-500 text-red-500' : 'bg-emerald-500 text-emerald-500'}`} />
              <span className="text-sm text-slate-300 font-medium">{affix.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-mono text-sm font-bold ${affix.value >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {affix.value > 0 ? '+' : ''}{affix.value}
              </span>
              <button 
                onClick={() => onRemove(affix.id)} 
                className="text-slate-600 hover:text-red-400 p-1 rounded-md hover:bg-slate-700/50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Toggle */}
      {activeAffixes.length > 4 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-400 hover:bg-slate-800/50 rounded-lg transition-all"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={14} /> 收起列表 (Collapse)
            </>
          ) : (
            <>
              <ChevronDown size={14} /> 查看全部 ({hiddenCount} 更多)
            </>
          )}
        </button>
      )}
    </div>
  );
};
