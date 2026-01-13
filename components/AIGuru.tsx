
import React, { useState } from 'react';
import { getAIHint } from '../services/geminiService';
import { AIResponse } from '../types';

interface AIGuruProps {
  question: string;
  currentTotal: number;
  targetAnswer: number;
}

const AIGuru: React.FC<AIGuruProps> = ({ question, currentTotal, targetAnswer }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const askGuru = async () => {
    setLoading(true);
    const data = await getAIHint(question, currentTotal, targetAnswer);
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-2 flex flex-col items-center gap-2">
      <button
        onClick={askGuru}
        disabled={loading}
        className="group relative flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full font-bold shadow-lg hover:shadow-violet-500/30 transition-all disabled:opacity-50 text-sm sm:text-base text-white"
      >
        <span className="text-lg">✨</span>
        {loading ? 'Consulting KHUSHI...' : 'Ask AI Guru for Help'}
      </button>

      {response && (
        <div className="w-full glass p-4 rounded-2xl border-indigo-500/30 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 text-xl floating shadow-lg text-white">
              🤓
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-violet-600 dark:text-violet-400 font-bold text-[10px] uppercase tracking-wider">KHUSHI AI Guru says:</p>
              <p className="text-slate-800 dark:text-slate-100 italic leading-relaxed text-xs sm:text-sm font-medium">"{response.hint}"</p>
              <p className="text-indigo-600 dark:text-indigo-300 font-bold text-xs">{response.cheer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGuru;
