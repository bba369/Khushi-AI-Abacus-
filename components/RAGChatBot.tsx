
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';

const RAGChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Namaste! I'm the KHUSHI Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    if (!customMessage) setInput("");
    
    setMessages(prev => [...prev, { text: messageToSend, isBot: false }]);
    setIsLoading(true);

    const botRes = await getChatResponse(messageToSend);
    setMessages(prev => [...prev, { text: botRes || "Sorry, I couldn't process that.", isBot: true }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[85vw] sm:w-96 glass border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤓</span>
              <span className="font-bold text-sm sm:text-base">KHUSHI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">✕</button>
          </div>
          
          <div ref={scrollRef} className="h-80 sm:h-96 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 dark:bg-slate-900/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm ${
                  m.isBot 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-300 dark:border-transparent' 
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/20'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-200 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none animate-pulse text-xs text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-transparent">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-white/5 space-y-3">
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleSend("Can you help me with abacus rules?")}
                className="px-3 py-1.5 bg-violet-600/10 dark:bg-violet-600/20 border border-violet-500/30 rounded-full text-[10px] text-violet-600 dark:text-violet-300 hover:bg-violet-600/20 transition-colors uppercase font-black tracking-widest"
              >
                Ask AI Guru for Help
              </button>
              <button 
                onClick={() => handleSend("Tell me about KHUSHI Foundation")}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700/40 border border-slate-300 dark:border-white/10 rounded-full text-[10px] text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700/60 transition-colors uppercase font-black tracking-widest"
              >
                About Foundation
              </button>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full px-4 py-2 text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors text-slate-900 dark:text-slate-100"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 text-white"
              >
                🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center text-2xl sm:text-3xl floating border-2 border-white/20 active:scale-90 transition-all z-50 text-white"
      >
        💬
      </button>
    </div>
  );
};

export default RAGChatBot;
