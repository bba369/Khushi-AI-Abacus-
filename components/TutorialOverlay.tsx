
import React, { useState, useEffect, useCallback } from 'react';

interface TutorialStep {
  targetId: string;
  title: string;
  description: string;
  nepali?: string;
  position: 'top' | 'bottom';
}

interface TutorialOverlayProps {
  onClose: () => void;
}

const steps: TutorialStep[] = [
  {
    targetId: 'tutorial-abacus-frame',
    title: 'Meet the Soroban',
    description: 'This is the Japanese Abacus, or Soroban. It is a powerful computer for your mind!',
    nepali: 'यो जापानी एबाकस (Soroban) हो, जुन मानसिक गणनाको लागि शक्तिशाली छ।',
    position: 'bottom'
  },
  {
    targetId: 'tutorial-abacus-beam',
    title: 'The Answer Bar',
    description: 'This horizontal beam is the "Answer Bar". Beads only have value when they are moved to touch this bar.',
    nepali: 'यो तेर्सो रेखा "उत्तर रेखा" हो। यसलाई छुने गेडाहरूको मात्र मान हुन्छ।',
    position: 'bottom'
  },
  {
    targetId: 'tutorial-abacus-heaven',
    title: 'Heaven Section',
    description: 'The beads above the bar are "Heaven" beads. Each one has a value of 5.',
    nepali: 'माथिल्लो खण्डका गेडाहरूको मान ५ हुन्छ।',
    position: 'bottom'
  },
  {
    targetId: 'tutorial-abacus-earth',
    title: 'Earth Section',
    description: 'The beads below the bar are "Earth" beads. Each one has a value of 1.',
    nepali: 'तल्लो खण्डका गेडाहरूको मान १ हुन्छ।',
    position: 'top'
  },
  {
    targetId: 'column-units',
    title: 'Units Column',
    description: 'The rightmost rod represents single digits (1, 2, 3...).',
    nepali: 'दायाँतर्फको पहिलो स्तम्भले एकाइ (Units) जनाउँछ।',
    position: 'top'
  },
  {
    targetId: 'column-tens',
    title: 'Tens Column',
    description: 'The second rod represents tens (10, 20, 30...).',
    nepali: 'दोस्रो स्तम्भले दहाई (Tens) जनाउँछ।',
    position: 'top'
  },
  {
    targetId: 'column-hundreds',
    title: 'Hundreds Column',
    description: 'The third rod represents hundreds (100, 200, 300...).',
    nepali: 'तेस्रो स्तम्भले सय (Hundreds) जनाउँछ।',
    position: 'top'
  },
  {
    targetId: 'column-thousands',
    title: 'Thousands Column',
    description: 'The fourth rod represents thousands (1000, 2000, 3000...).',
    nepali: 'चौथो स्तम्भले हजार (Thousands) जनाउँछ।',
    position: 'top'
  },
  {
    targetId: 'column-ten-thousands',
    title: 'Ten Thousands Column',
    description: 'The fifth rod represents ten thousands (10000, 20000...).',
    nepali: 'पाँचौं स्तम्भले दश हजार (Ten Thousands) जनाउँछ।',
    position: 'top'
  },
  {
    targetId: 'tutorial-category',
    title: 'Choose Your Practice',
    description: 'Select a level to start. We recommend starting with Direct Single Digits.',
    nepali: 'सुरु गर्नको लागि एउटा श्रेणी रोज्नुहोस्।',
    position: 'bottom'
  },
  {
    targetId: 'tutorial-question',
    title: 'Solve the Problem',
    description: 'The math problem will appear here. Set the beads on the abacus to match the answer.',
    nepali: 'गणितको समस्या यहाँ देखा पर्नेछ।',
    position: 'bottom'
  },
  {
    targetId: 'tutorial-controls',
    title: 'Action Buttons',
    description: 'Clear resets the board. Check validates your answer. Next gives you a new challenge.',
    nepali: 'बोर्ड रिसेट गर्न Clear, जाँच गर्न Check र अर्कोको लागि Next थिच्नुहोस्।',
    position: 'top'
  },
  {
    targetId: 'tutorial-guru',
    title: 'AI Guru Help',
    description: 'Stuck? Click here to get a hint from the AI Guru based on proper abacus rules!',
    nepali: 'अलमलमा पर्नुभयो? AI गुरुसँग मद्दत माग्नुहोस्।',
    position: 'top'
  }
];

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const step = steps[currentStep];

  const updateCoords = useCallback(() => {
    const el = document.getElementById(step.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      // Delay scroll to avoid interfering with clip-path transition
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  }, [step.targetId]);

  useEffect(() => {
    updateCoords();
    const timer = setTimeout(updateCoords, 500);
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
    };
  }, [updateCoords]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-950/90 pointer-events-auto transition-all duration-500" 
        style={{
          clipPath: coords ? `polygon(
            0% 0%, 0% 100%, 
            ${coords.left}px 100%, 
            ${coords.left}px ${coords.top}px, 
            ${coords.left + coords.width}px ${coords.top}px, 
            ${coords.left + coords.width}px ${coords.top + coords.height}px, 
            ${coords.left}px ${coords.top + coords.height}px, 
            ${coords.left}px 100%, 
            100% 100%, 100% 0%
          )` : 'none'
        }} 
        onClick={onClose} 
      />

      {coords && (
        <div 
          className="fixed pointer-events-auto w-[280px] sm:w-[340px] glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-amber-500/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out z-[101]"
          style={{
            top: step.position === 'bottom' ? Math.min(window.innerHeight - 250, coords.top + coords.height + 16) : Math.max(16, coords.top - 240),
            left: Math.max(10, Math.min(window.innerWidth - 290, coords.left + coords.width / 2 - 140)),
          }}
        >
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <span className="px-2 sm:px-3 py-1 bg-amber-500/20 text-amber-500 text-[8px] sm:text-[10px] font-black rounded-full uppercase tracking-widest">
              Lesson {currentStep + 1} / {steps.length}
            </span>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Skip</button>
          </div>
          
          <h3 className="text-lg sm:text-xl font-black text-white mb-1 sm:mb-2">{step.title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2 sm:mb-3">{step.description}</p>
          {step.nepali && (
            <div className="bg-amber-500/5 p-2 sm:p-3 rounded-xl border-l-2 border-amber-500/40 mb-4 sm:mb-5">
              <p className="text-[9px] sm:text-[11px] text-amber-400 font-medium italic">
                {step.nepali}
              </p>
            </div>
          )}

          <div className="flex gap-2 sm:gap-3">
            {currentStep > 0 && (
              <button 
                onClick={handleBack}
                className="flex-1 py-2 sm:py-3 bg-slate-800 rounded-xl font-bold text-xs sm:text-sm text-slate-300 hover:bg-slate-700 transition-all"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-[2] py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-black text-xs sm:text-sm text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              {currentStep === steps.length - 1 ? 'Start!' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialOverlay;
