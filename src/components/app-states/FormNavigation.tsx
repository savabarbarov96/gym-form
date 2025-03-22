import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  handleNext: (isAutoNext?: boolean) => void;
  handleBack: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  handleNext,
  handleBack
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  // Monitor for input field focus to adjust navigation visibility
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        setIsInputFocused(true);
      }
    };
    
    const handleBlur = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        setIsInputFocused(false);
      }
    };
    
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
    
    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  // Add keyboard event listener for spacebar and enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the active element is not an input, textarea, or button
      const activeElement = document.activeElement;
      const isInputActive = 
        activeElement instanceof HTMLInputElement || 
        activeElement instanceof HTMLTextAreaElement || 
        activeElement instanceof HTMLButtonElement ||
        activeElement instanceof HTMLSelectElement;
      
      // Only trigger if not in an input field
      if (!isInputActive) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Play sound
          try {
            const audio = new Audio('/assets/sounds/click.mp3');
            audio.volume = 0.3;
            audio.play().catch(error => {
              console.log('Error playing button sound:', error);
            });
          } catch (error) {
            console.log('Error creating audio instance:', error);
          }
          // Navigate to next step (manual navigation)
          handleNext(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext]);

  const playClickSound = () => {
    try {
      const audio = new Audio('/assets/sounds/click.mp3');
      audio.volume = 0.3;
      audio.play().catch(error => {
        console.log('Error playing button sound:', error);
      });
    } catch (error) {
      console.log('Error creating audio instance:', error);
    }
  };

  // Doctor's recommendation text
  const DoctorsRecommendation = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-center text-xs text-muted-foreground mt-2 px-4"
    >
      <p className="text-[10px]">Консултирайте се с лекар преди започване на тренировки.</p>
    </motion.div>
  );

  return (
    <>
      {/* Floating action button for mobile when keyboard is open */}
      <AnimatePresence>
        {isInputFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="sm:hidden fixed bottom-8 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 8px 20px rgba(255, 71, 0, 0.3)" }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                playClickSound();
                handleNext(false);
                // Blur any active input to close keyboard
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-orange/95 to-orange-600/95 backdrop-blur-md text-white shadow-lg shadow-orange/30 flex items-center justify-center touch-manipulation active:shadow-inner"
              aria-label="Продължи"
            >
              <Check size={26} strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main navigation bar */}
      <motion.div 
        className={`fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pt-3 sm:py-4 bg-gradient-to-t from-background via-background to-transparent ${isInputFocused ? 'sm:flex hidden' : 'flex'} flex-col`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-4 w-full max-w-4xl mx-auto">
          {step > 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.2 } 
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 } 
              }}
            >
              <Button 
                onClick={() => {
                  playClickSound();
                  handleBack();
                }}
                variant="outline"
                className="w-full sm:w-auto h-[3.25rem] sm:h-14 px-6 sm:px-8 py-3 sm:py-4 border-2 border-border text-foreground rounded-2xl hover:bg-secondary hover:text-orange transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 sm:gap-3 font-medium text-sm sm:text-base bg-transparent backdrop-blur-sm touch-manipulation active:scale-[0.98] active:bg-background/30"
              >
                <ChevronLeft size={18} />
                <span className="relative -top-[1px]">Назад</span>
              </Button>
            </motion.div>
          )}
          <motion.div
            className="w-full sm:w-auto ml-auto"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(255, 71, 0, 0.3)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 } 
            }}
          >
            <Button 
              onClick={() => {
                playClickSound();
                handleNext(false);
              }}
              className="w-full sm:w-auto h-[3.25rem] sm:h-14 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange text-white rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm sm:text-base touch-manipulation active:shadow-inner active:scale-[0.98]"
              tabIndex={0}
              aria-label={step === totalSteps ? "Завърши" : "Продължи"}
            >
              <span className="relative -top-[1px]">{step === totalSteps ? "Завърши" : "Продължи"}</span>
              <ChevronRight size={18} />
            </Button>
          </motion.div>
        </div>
        
        {/* Doctor's recommendation below the buttons */}
        <DoctorsRecommendation />
        
        <div className="h-4 sm:h-2" />
      </motion.div>
    </>
  );
};

export default FormNavigation;
