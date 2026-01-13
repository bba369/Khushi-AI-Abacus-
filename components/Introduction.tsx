
import React, { useState } from 'react';
import { ABACUS_HISTORY, ABACUS_BENEFITS, KHUSHI_KNOWLEDGE } from '../constants';

type Tab = 'basics' | 'history' | 'benefits' | 'nepali' | 'foundation';

const Introduction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'basics':
        return (
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="glass p-4 rounded-xl border-indigo-500/20">
              <h3 className="text-indigo-600 dark:text-indigo-400 font-bold mb-1 flex items-center gap-2 text-sm">🎛️ Structure (संरचना)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Heaven beads (Top) represent 5. Earth beads (Bottom) represent 1 each. The horizontal bar is the "answer bar".</p>
            </div>
            <div className="glass p-4 rounded-xl border-rose-500/20">
              <h3 className="text-rose-600 dark:text-rose-400 font-bold mb-1 flex items-center gap-2 text-sm">💎 Values (मान)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Beads only count when pushed toward the center bar. Clear space means zero.</p>
            </div>
            <div className="glass p-4 rounded-xl border-emerald-500/20">
              <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-1 flex items-center gap-2 text-sm">📊 Columns (स्तम्भहरू)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Columns move from Units (Right) to Tens, Hundreds, and so on (Left).</p>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="mt-2 glass p-4 rounded-xl border-amber-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-amber-600 dark:text-amber-400 font-bold mb-2 flex items-center gap-2 text-sm">🏺 एबाकसको इतिहास (History of Abacus)</h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="border-l-4 border-amber-500/50 pl-4">{ABACUS_HISTORY.origin}</p>
              <p className="border-l-4 border-amber-500/50 pl-4">{ABACUS_HISTORY.significance}</p>
            </div>
          </div>
        );
      case 'benefits':
        return (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {ABACUS_BENEFITS.map((benefit, i) => (
              <div key={i} className="glass p-4 rounded-xl border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-1 flex items-center gap-2 text-sm">{benefit.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        );
      case 'nepali':
        return (
          <div className="mt-2 glass p-4 rounded-xl border-sky-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-sky-600 dark:text-sky-400 font-bold mb-2 flex items-center gap-2 text-sm">🏔️ नेपालमा एबाकस (Abacus in Nepal)</h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-xl italic border-l-4 border-sky-500 shadow-inner">
                "नेपालमा एबाकस तालिमले विद्यार्थीहरूको मानसिक विकासमा ठूलो सहयोग पुर्याएको छ। यसले एकाग्रता र आत्मविश्वास बढाउँछ।"
                <p className="mt-1 text-[10px] text-slate-500 text-right font-bold">— KHUSHI Foundation</p>
              </div>
              <p className="text-xs sm:text-sm">{ABACUS_HISTORY.nepaliContext}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                <div className="p-2 bg-slate-200 dark:bg-white/5 rounded-lg text-center border border-slate-300 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                  <div className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Abacus</div>
                  <div className="text-xs">एबाकस</div>
                </div>
                <div className="p-2 bg-slate-200 dark:bg-white/5 rounded-lg text-center border border-slate-300 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                  <div className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Math</div>
                  <div className="text-xs">गणित</div>
                </div>
                <div className="p-2 bg-slate-200 dark:bg-white/5 rounded-lg text-center border border-slate-300 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                  <div className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Memory</div>
                  <div className="text-xs">स्मरण शक्ति</div>
                </div>
                <div className="p-2 bg-slate-200 dark:bg-white/5 rounded-lg text-center border border-slate-300 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                  <div className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Focus</div>
                  <div className="text-xs">एकाग्रता</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'foundation':
        return (
          <div className="mt-2 glass p-4 rounded-xl border-violet-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-violet-600 dark:text-violet-400 font-bold mb-2 flex items-center gap-2 text-base sm:text-lg">🤓 About KHUSHI Foundation</h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="bg-violet-100 dark:bg-violet-500/10 p-4 rounded-2xl border border-violet-200 dark:border-violet-500/20 shadow-lg">
                <p className="text-violet-800 dark:text-slate-200 font-semibold mb-1 italic text-xs">"Dedicated to social impact, education, and community empowerment in Nepal."</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">KHUSHI Foundation is the driving force behind this AI Guru initiative, integrating ancient wisdom with modern technology to foster cognitive growth in children across Nepal.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-slate-100 dark:bg-black/30 rounded-xl border border-slate-200 dark:border-white/5">
                  <h4 className="text-violet-600 dark:text-violet-400 font-bold text-[10px] uppercase tracking-widest mb-1">Our Mission</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">To bridge education gaps by providing high-quality tools for mental arithmetic and emotional well-being.</p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-black/30 rounded-xl border border-slate-200 dark:border-white/5">
                  <h4 className="text-violet-600 dark:text-violet-400 font-bold text-[10px] uppercase tracking-widest mb-1">Abacus integration</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Integrating Soroban abacus into schools to enhance brain development and mathematical visualization.</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-violet-600 dark:text-violet-400 font-bold text-[10px] uppercase tracking-widest mb-2 text-center">Ecosystem Impact</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] border border-slate-200 dark:border-white/5 text-center text-slate-600 dark:text-slate-300">Social Impact</div>
                  <div className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] border border-slate-200 dark:border-white/5 text-center text-slate-600 dark:text-slate-300">Education</div>
                  <div className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] border border-slate-200 dark:border-white/5 text-center text-slate-600 dark:text-slate-300">Entrepreneurship</div>
                  <div className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] border border-slate-200 dark:border-white/5 text-center text-slate-600 dark:text-slate-300">Technology</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => setActiveTab(activeTab === 'basics' ? null : 'basics')}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'basics' ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'glass border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-500/20'}`}
        >
          📖 Basics
        </button>
        <button
          onClick={() => setActiveTab(activeTab === 'benefits' ? null : 'benefits')}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'benefits' ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]' : 'glass border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:border-emerald-500/20'}`}
        >
          🌟 Benefits
        </button>
        <button
          onClick={() => setActiveTab(activeTab === 'history' ? null : 'history')}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'history' ? 'bg-amber-600 border-amber-400 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]' : 'glass border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-white hover:border-amber-500/20'}`}
        >
          🏺 History (इतिहास)
        </button>
        <button
          onClick={() => setActiveTab(activeTab === 'nepali' ? null : 'nepali')}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'nepali' ? 'bg-sky-600 border-sky-400 text-white shadow-[0_0_15px_rgba(2,132,199,0.4)]' : 'glass border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:border-sky-500/20'}`}
        >
          🏔️ Nepali Info
        </button>
        <button
          onClick={() => setActiveTab(activeTab === 'foundation' ? null : 'foundation')}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'foundation' ? 'bg-violet-600 border-violet-400 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]' : 'glass border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white hover:border-violet-500/20'}`}
        >
          🤓 Foundation
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Introduction;
