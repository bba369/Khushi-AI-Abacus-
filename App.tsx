
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Abacus from './components/Abacus';
import AIGuru from './components/AIGuru';
import Introduction from './components/Introduction';
import Partners from './components/Partners';
import RAGChatBot from './components/RAGChatBot';
import ProgressTracker from './components/ProgressTracker';
import TutorialOverlay from './components/TutorialOverlay';
import { PracticeCategory, AbacusState, Question, UserStats } from './types';
import { COLUMNS_CONFIG, QUESTION_BANK } from './constants';
import { sounds } from './services/soundService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('khushi_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [category, setCategory] = useState<PracticeCategory | ''>('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [checkStatus, setCheckStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [abacusState, setAbacusState] = useState<AbacusState>(() => {
    const initial: AbacusState = {};
    COLUMNS_CONFIG.forEach(c => initial[c.id] = { heaven: false, earth: 0 });
    return initial;
  });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  // Gamification State
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('khushi_stats');
    return saved ? JSON.parse(saved) : {
      level: 1,
      xp: 0,
      streak: 0,
      bestStreak: 0,
      totalCorrect: 0,
      totalAttempted: 0,
      badges: []
    };
  });

  useEffect(() => {
    localStorage.setItem('khushi_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('khushi_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check if first visit
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('khushi_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      localStorage.setItem('khushi_tutorial_seen', 'true');
    }
  }, []);

  const currentTotal = useMemo(() => {
    return COLUMNS_CONFIG.reduce((sum, config) => {
      const { heaven, earth } = abacusState[config.id];
      return sum + ((heaven ? 5 : 0) + earth) * config.multiplier;
    }, 0);
  }, [abacusState]);

  const resetAbacus = useCallback(() => {
    setIsShaking(true);
    sounds.playClack();
    setCheckStatus(null);
    setTimeout(() => {
      const fresh: AbacusState = {};
      COLUMNS_CONFIG.forEach(c => fresh[c.id] = { heaven: false, earth: 0 });
      setAbacusState(fresh);
      setFeedback({ type: null, message: '' });
      setIsShaking(false);
    }, 300);
  }, []);

  const nextQuestion = useCallback(() => {
    if (!category) return;
    const pool = QUESTION_BANK[category as PracticeCategory];
    const random = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(random);
    setCheckStatus(null);
    resetAbacus();
  }, [category, resetAbacus]);

  useEffect(() => {
    if (category) {
      nextQuestion();
    }
  }, [category, nextQuestion]);

  const handleSubmit = () => {
    if (!currentQuestion) return;
    
    const isCorrect = currentTotal === currentQuestion.ans;

    if (isCorrect) {
      sounds.playSuccess();
      setCheckStatus('correct');
      setFeedback({ type: 'success', message: '🎉 Brilliant! Your answer is correct!' });
      
      setStats(prev => {
        const newStreak = prev.streak + 1;
        const streakBonus = Math.floor(newStreak / 3) * 10;
        const addedXp = 50 + streakBonus;
        let newXp = prev.xp + addedXp;
        let newLevel = prev.level;
        
        const xpThreshold = prev.level * 500;
        if (newXp >= xpThreshold) {
          newLevel += 1;
          newXp -= xpThreshold;
        }

        return {
          ...prev,
          level: newLevel,
          xp: newXp,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          totalCorrect: prev.totalCorrect + 1,
          totalAttempted: prev.totalAttempted + 1
        };
      });
    } else {
      sounds.playError();
      setCheckStatus('incorrect');
      setFeedback({ type: 'error', message: '❌ Not quite. Check your beads and try again!' });
      setStats(prev => ({
        ...prev,
        streak: 0,
        totalAttempted: prev.totalAttempted + 1
      }));
    }

    // Clear visual feedback after 1.5 seconds
    setTimeout(() => setCheckStatus(null), 1500);
  };

  return (
    <div className={`min-h-screen ai-gradient-bg transition-colors duration-500 ${theme}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center">
        {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
        
        <div className="w-full flex justify-end mb-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-full glass border border-indigo-500/30 flex items-center justify-center text-xl hover:scale-110 active:scale-90 transition-all shadow-lg"
            title="Toggle Mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <header className="text-center mb-6 sm:mb-8 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 w-max">
            <span className="h-px w-4 sm:w-8 bg-indigo-500/50"></span>
            <span className="text-[8px] sm:text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">KHUSHI Foundation Initiative</span>
            <span className="h-px w-4 sm:w-8 bg-indigo-500/50"></span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent drop-shadow-sm mt-4">
            KHUSHI Abacus AI Guru
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-2 font-medium">
              The ancient art of Abacus meets modern Intelligence. Master mental math and earn rewards.
            </p>
            <button 
              onClick={() => setShowTutorial(true)}
              className="px-4 py-1 glass border-amber-500/30 text-amber-700 dark:text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/10 transition-colors"
            >
              Start Guided Tutorial
            </button>
          </div>
        </header>

        <ProgressTracker stats={stats} />

        <div className="w-full max-w-2xl mb-6 space-y-4">
          <div id="tutorial-category" className="flex flex-col gap-1 p-1">
            <label className="text-[10px] sm:text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest ml-1 text-center">Practice Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as PracticeCategory)}
              className="w-full bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-2 sm:p-3 rounded-xl text-sm sm:text-base font-bold focus:ring-2 focus:ring-amber-500 outline-none transition-all cursor-pointer text-center text-slate-800 dark:text-slate-200 shadow-sm"
            >
              <option value="">-- Select a Category --</option>
              <option value={PracticeCategory.DirectSingle}>1.1 Direct - Single Digit</option>
              <option value={PracticeCategory.DirectDouble}>1.2 Direct - Double Digit</option>
              <option value={PracticeCategory.DirectTriple}>1.3 Direct - Triple Digit</option>
              <option value={PracticeCategory.SmallFriends}>2. Small Friends (+/- 5)</option>
              <option value={PracticeCategory.BigFriends}>3. Big Friends (+/- 10)</option>
              <option value={PracticeCategory.Family}>4. Family Combinations</option>
            </select>
          </div>

          <div id="tutorial-question" className="min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
            {currentQuestion ? (
              <div className="w-full glass p-3 sm:p-4 rounded-2xl border-white/5 text-center space-y-1 animate-in zoom-in duration-300 relative">
                {stats.streak >= 3 && (
                  <div className="absolute -top-3 -right-3 bg-rose-500 text-white text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-1 rounded-full shadow-lg animate-bounce">
                    STREAK x{stats.streak} 🔥
                  </div>
                )}
                <h2 className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Problem to Solve</h2>
                <p className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">{currentQuestion.q}</p>
              </div>
            ) : (
              <div className="text-slate-500 dark:text-slate-600 italic text-sm font-medium">Select a category above to start...</div>
            )}
          </div>
        </div>

        <div className="mb-2 sm:mb-4 text-center animate-in slide-in-from-top-4 duration-500">
          <p className="text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest text-[8px] sm:text-[10px] mb-1">Live Value Readout</p>
          <div className="inline-block px-4 sm:px-6 py-1 bg-white/50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-full shadow-md">
            <div className="text-2xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 tabular-nums drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              {currentTotal}
            </div>
          </div>
        </div>

        <div id="tutorial-guru" className="w-full min-h-[60px] px-2 mb-4">
          {currentQuestion && (
            <AIGuru 
              question={currentQuestion.q}
              currentTotal={currentTotal}
              targetAnswer={currentQuestion.ans}
            />
          )}
        </div>

        <div className={`w-full max-w-4xl mb-6 relative transition-transform duration-100 ${isShaking ? 'animate-bounce' : ''}`}>
          <div id="tutorial-abacus" className="p-1 sm:p-2 relative">
            <Abacus 
              state={abacusState} 
              onUpdate={(id, state) => setAbacusState(prev => ({ ...prev, [id]: state }))} 
            />

            {/* CHECK FEEDBACK OVERLAY */}
            {checkStatus && (
              <div className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none">
                {checkStatus === 'correct' ? (
                  <div className="animate-celebrate bg-emerald-500/90 text-white rounded-full p-4 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.5)] flex flex-col items-center">
                    <span className="text-2xl sm:text-4xl mb-1">🌟</span>
                    <span className="text-sm sm:text-lg font-black uppercase tracking-tighter">Brilliant!</span>
                  </div>
                ) : (
                  <div className="animate-shake bg-rose-500/90 text-white rounded-full p-4 sm:p-6 shadow-[0_0_50px_rgba(244,63,94,0.5)] flex flex-col items-center">
                    <span className="text-2xl sm:text-4xl mb-1">❌</span>
                    <span className="text-sm sm:text-lg font-black uppercase tracking-tighter">Try Again!</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div id="tutorial-controls" className="max-w-4xl mx-auto mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 px-2 sm:px-4 p-2">
            <button 
              onClick={resetAbacus}
              className="flex items-center justify-center gap-2 py-2 sm:py-3 bg-gradient-to-b from-[#4a3a2a] to-[#2a1a0a] rounded-xl border border-[#1a0f05] shadow-lg hover:brightness-110 active:scale-95 transition-all text-amber-100"
            >
              <span className="text-sm sm:text-base">🧹</span>
              <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs">Clear</span>
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-black text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px] sm:text-xs"
            >
              <span className="text-sm sm:text-base">✅</span>
              <span>Check</span>
            </button>

            <button
              onClick={nextQuestion}
              className="flex items-center justify-center gap-2 py-2 sm:py-3 bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] sm:text-xs shadow-sm"
            >
              <span className="text-sm sm:text-base">⏭️</span>
              <span>Skip</span>
            </button>

            <button
              onClick={nextQuestion}
              className="flex items-center justify-center gap-2 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-black text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px] sm:text-xs"
            >
              <span className="text-sm sm:text-base">➡️</span>
              <span>Next</span>
            </button>
          </div>
        </div>

        <div className="min-h-[40px] sm:min-h-[50px] w-full flex justify-center mb-4 sm:mb-8 px-4">
          {feedback.message && (
            <div className={`
              w-full max-w-xl p-2 sm:p-3 rounded-xl text-center font-bold text-sm sm:text-base animate-in fade-in slide-in-from-bottom-2
              ${feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shadow-sm' : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 shadow-sm'}
            `}>
              {feedback.message}
              {feedback.type === 'success' && <div className="text-[8px] sm:text-[10px] mt-1 text-emerald-600 dark:text-emerald-500/80 tracking-widest uppercase">+50 XP EARNED</div>}
            </div>
          )}
        </div>

        <Introduction />

        <Partners />

        <footer className="mt-8 sm:mt-12 pt-6 pb-8 border-t border-slate-200 dark:border-white/5 w-full text-center px-4">
          <div className="flex flex-col items-center gap-1">
            <p className="text-slate-800 dark:text-slate-200 font-black text-sm sm:text-base">Powered by KHUSHI Foundation</p>
            <p className="text-slate-500 text-[10px] sm:text-xs font-medium">
              &copy; {new Date().getFullYear()} KHUSHI Abacus AI Guru. Your Journey to Mastery.
            </p>
          </div>
        </footer>

        <RAGChatBot />
      </div>
    </div>
  );
};

export default App;
