
import React from 'react';
import { sounds } from '../services/soundService';

interface BeadProps {
  isHeaven?: boolean;
  active: boolean;
  onClick: () => void;
  index: number; // Required for staggered animation
}

const Bead: React.FC<BeadProps> = ({ isHeaven = false, active, onClick, index }) => {
  // Heaven moves DOWN to hit the bar exactly
  const heavenTranslation = active ? 'translate-y-[1.1rem] sm:translate-y-[1.6rem]' : 'translate-y-0';
  
  // Earth moves UP to hit the bar exactly - carefully calibrated to prevent overlap
  const earthTranslation = active ? '-translate-y-[1.7rem] sm:-translate-y-[2.4rem]' : 'translate-y-0';

  // Stagger effect: higher beads move slightly earlier when moving up, later when moving down
  // This simulates the physical push/pull of a stack of beads
  const delay = !isHeaven ? (active ? (4 - index) * 15 : index * 15) : 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClack();
    onClick();
  };

  // Hexagonal shape for the bead
  const beadShape = {
    clipPath: 'polygon(22% 0%, 78% 0%, 100% 50%, 78% 100%, 22% 100%, 0% 50%)',
  };

  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ 
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))',
      }}
    >
      <button
        onClick={handleClick}
        className={`
          relative w-14 h-8 sm:w-20 h-11 cursor-pointer outline-none transition-all duration-[250ms] z-10
          ${isHeaven ? heavenTranslation : earthTranslation}
          ${active ? 'scale-[1.03]' : 'scale-100'}
          group
          border-[1.5px] border-black/90
        `}
        aria-label={`${isHeaven ? 'Heaven' : 'Earth'} bead ${index}`}
        style={{
          ...beadShape,
          transitionTimingFunction: 'cubic-bezier(0.2, 1.2, 0.5, 1)',
          transitionDelay: `${delay}ms`
        }}
      >
        {/* Bead Material & Gradients */}
        <div className={`
          absolute inset-0 transition-colors duration-500
          ${active 
            ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4)]' 
            : 'bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900 shadow-[inset_0_2px_5px_rgba(255,255,255,0.1)]'}
        `}>
          {/* Top highlight for 3D look - intensity changes on active */}
          <div className={`absolute top-0 left-0 right-0 h-1/2 bg-white/20 transition-opacity duration-300 ${active ? 'opacity-40' : 'opacity-20'}`}></div>
          
          {/* Internal Rim Detail */}
          <div className="absolute inset-[2px] opacity-25 border border-white/20" style={beadShape}></div>

          {/* Active Surface Reflection */}
          {active && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)] animate-pulse-slow"></div>
          )}

          {/* Bottom shadow within bead */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-black/40 opacity-50"></div>
        </div>
        
        {/* Interaction Highlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-200"></div>
      </button>
    </div>
  );
};

export default Bead;
