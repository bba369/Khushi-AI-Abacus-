
import React from 'react';
import Bead from './Bead';
import { AbacusColumnState } from '../types';

interface AbacusColumnProps {
  id?: string;
  state: AbacusColumnState;
  label: string;
  onUpdate: (newState: AbacusColumnState) => void;
}

const AbacusColumn: React.FC<AbacusColumnProps> = ({ id, state, label, onUpdate }) => {
  const handleHeavenClick = () => {
    onUpdate({ ...state, heaven: !state.heaven });
  };

  const handleEarthClick = (beadIndex: number) => {
    const beadNumber = beadIndex + 1;
    let newEarthCount;
    if (state.earth >= beadNumber) {
      newEarthCount = beadNumber - 1;
    } else {
      newEarthCount = beadNumber;
    }
    onUpdate({ ...state, earth: newEarthCount });
  };

  const hasDot = label === '1s' || label === '1000s';

  return (
    <div id={id} className="flex flex-col items-center relative w-[76px] sm:w-[108px] h-[230px] sm:h-[300px]">
      {/* Heavy-duty Metallic Rod */}
      <div className="absolute top-0 bottom-0 left-1/2 w-4 sm:w-5 -translate-x-1/2 z-0 
        bg-gradient-to-r from-slate-900 via-slate-400 via-slate-200 via-slate-400 to-slate-900 
        shadow-[inset_0_0_12px_rgba(0,0,0,0.6),2px_0_8px_rgba(0,0,0,0.4)] 
        border-x border-black/40" />

      {/* Heaven Section (Upper) */}
      <div className="h-[3.8rem] sm:h-[5.2rem] w-full flex flex-col justify-start items-center pt-2 z-10">
        <Bead isHeaven active={state.heaven} onClick={handleHeavenClick} index={0} />
      </div>

      {/* Answer Bar (Beam) */}
      <div className="w-full h-3 sm:h-4 bg-gradient-to-b from-slate-700 via-slate-900 to-black z-20 shadow-[0_4px_10px_rgba(0,0,0,0.6)] border-y border-white/10 relative">
        {hasDot && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-100 shadow-[0_0_8px_rgba(255,255,255,0.9)] border border-slate-400"></div>
        )}
      </div>

      {/* Earth Section (Lower) - Compact stack with physics-ready spacing */}
      <div className="flex-1 w-full flex flex-col items-center justify-end pb-4 gap-0.5 sm:gap-1 z-10 relative">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-8 sm:h-11 flex items-center justify-center">
            <Bead 
              active={state.earth > i} 
              onClick={() => handleEarthClick(i)} 
              index={i}
            />
          </div>
        ))}
      </div>

      {/* Symmetrical Label */}
      <span className="absolute -bottom-8 sm:-bottom-10 text-[8px] sm:text-[10px] font-black text-slate-500 dark:text-white/30 tracking-[0.2em] uppercase whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export default AbacusColumn;
