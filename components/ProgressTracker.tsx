
import React from 'react';
import { UserStats } from '../types';

interface ProgressTrackerProps {
  stats: UserStats;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ stats }) => {
  const xpForNextLevel = stats.level * 500;
  const progressPercent = (stats.xp / xpForNextLevel) * 100;
  const accuracy = stats.totalAttempted > 0 
    ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) 
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in zoom-in duration-500">
      {/* Level & XP Card */}
      <div className="glass p-4 rounded-2xl border-amber-500/20 flex flex-col justify-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-5xl">🏆</span>
        </div>
        <div className="flex justify-between items-end mb-1">
          <div>
            <p className="text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest">Abacus Rank</p>
            <h3 className="text-xl font-black text-slate-800 dark:text-white">Level {stats.level}</h3>
          </div>
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{stats.xp} / {xpForNextLevel} XP</p>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(251,191,36,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Streak Card */}
      <div className="glass p-4 rounded-2xl border-rose-500/20 flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${stats.streak > 0 ? 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-110' : 'bg-slate-200 dark:bg-slate-800'}`}>
          {stats.streak > 2 ? '🔥' : '⭐'}
        </div>
        <div>
          <p className="text-[10px] font-black text-rose-600 dark:text-rose-500 uppercase tracking-widest">Current Streak</p>
          <h3 className="text-xl font-black text-slate-800 dark:text-white">{stats.streak}</h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Best: {stats.bestStreak}</p>
        </div>
      </div>

      {/* Accuracy Card */}
      <div className="glass p-4 rounded-2xl border-emerald-500/20 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-xl border border-emerald-500/30">
          🎯
        </div>
        <div>
          <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Success Rate</p>
          <h3 className="text-xl font-black text-slate-800 dark:text-white">{accuracy}%</h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{stats.totalCorrect} / {stats.totalAttempted} Correct</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
