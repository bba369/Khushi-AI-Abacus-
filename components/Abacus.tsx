
import React from 'react';
import AbacusColumn from './AbacusColumn';
import { COLUMNS_CONFIG } from '../constants';
import { AbacusState, AbacusColumnState } from '../types';

interface AbacusProps {
  state: AbacusState;
  onUpdate: (columnId: string, columnState: AbacusColumnState) => void;
}

const Abacus: React.FC<AbacusProps> = ({ state, onUpdate }) => {
  return (
    <div className="relative group max-w-5xl mx-auto w-full flex justify-center px-2">
      {/* Dynamic ambient glow */}
      <div className="absolute -inset-4 sm:-inset-10 bg-black/60 blur-[30px] sm:blur-[60px] rounded-full opacity-40 pointer-events-none"></div>
      
      {/* Main Frame */}
      <div id="tutorial-abacus-frame" className="relative p-2.5 sm:p-5 rounded-3xl flex justify-center gap-0 overflow-x-hidden 
        bg-gradient-to-br from-[#4d3428] via-[#261914] to-[#4d3428]
        border-[8px] sm:border-[12px] border-[#261914]
        shadow-[
          inset_0_2px_15px_rgba(255,255,255,0.1),
          inset_0_-8px_20px_rgba(0,0,0,0.7),
          0_20px_50px_rgba(0,0,0,0.8)
        ]">
        
        {/* Inner Tray */}
        <div className="relative flex justify-center gap-0 px-2 sm:px-6 py-2 bg-[#050505] rounded-xl shadow-[inset_0_20px_50px_rgba(0,0,0,1)] border border-white/5 overflow-hidden">
          
          {/* Internal Accent Lighting */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.06)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]"></div>

          {COLUMNS_CONFIG.map((col) => (
            <AbacusColumn
              key={col.id}
              id={`column-${col.id}`}
              label={col.label}
              state={state[col.id]}
              onUpdate={(newState) => onUpdate(col.id, newState)}
            />
          ))}
        </div>

        {/* Precise Tutorial Coordinate Markers - Adjusted for New Dimensions */}
        <div id="tutorial-abacus-beam" className="absolute top-[60px] sm:top-[82px] left-0 right-0 h-3 sm:h-4 pointer-events-none opacity-0" />
        <div id="tutorial-abacus-heaven" className="absolute top-0 left-0 right-0 h-[60px] sm:h-[82px] pointer-events-none opacity-0" />
        <div id="tutorial-abacus-earth" className="absolute top-[64px] sm:top-[88px] bottom-0 left-0 right-0 pointer-events-none opacity-0" />

        {/* Side Polish Trim */}
        <div className="absolute top-0 bottom-0 left-[10px] sm:left-[15px] w-[0.5px] bg-white/5"></div>
        <div className="absolute top-0 bottom-0 right-[10px] sm:right-[15px] w-[0.5px] bg-white/5"></div>
      </div>
      
      {/* Corner Pins */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-900 shadow-inner opacity-80 border border-black/40"></div>
      <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-900 shadow-inner opacity-80 border border-black/40"></div>
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-900 shadow-inner opacity-80 border border-black/40"></div>
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-900 shadow-inner opacity-80 border border-black/40"></div>
    </div>
  );
};

export default Abacus;
