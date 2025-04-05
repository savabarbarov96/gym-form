import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSurvey } from '@/contexts/SurveyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, HelpCircle, Info } from 'lucide-react';

interface SelfAssessmentStepProps {
  question?: string;
  assessmentKey?: 'outOfBreath' | 'fallingBack' | 'suitableWorkouts' | 'motivationLevel' | 'dietConsistency';
  value: number | null;
  onChange: (value: number) => void;
  type?: string;
  onValidate?: () => boolean;
  autoAdvance?: boolean;
}

const SelfAssessmentStep: React.FC<SelfAssessmentStepProps> = ({ 
  question, 
  assessmentKey,
  value, 
  onChange,
  type,
  onValidate,
  autoAdvance = true
}) => {
  const { handleNext } = useSurvey();
  const { toast, dismiss } = useToast();
  const [isAdvancing, setIsAdvancing] = useState(false);
  const initialValueRef = useRef<number | null>(value);
  const timerRef = useRef<number | null>(null);
  const advanceAttemptedRef = useRef(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  // Clean up the timeout when the component unmounts
  useEffect(() => {
    console.log('SelfAssessmentStep mounted with initial value:', initialValueRef.current);
    return () => {
      console.log('SelfAssessmentStep unmounting, cleaning up timer');
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  
  // Handle auto-advance logic
  useEffect(() => {
    // Skip if auto-advance is disabled or if we're already advancing
    if (!autoAdvance || isAdvancing) return;

    // Only advance if this is a new selection (not returning to a previous step)
    // and we haven't already attempted to advance
    if (value !== null && initialValueRef.current === null && !advanceAttemptedRef.current) {
      console.log(`SelfAssessmentStep: Selected ${value}, setting up auto-advance`);
      
      // Mark that we've attempted to advance to prevent loops
      advanceAttemptedRef.current = true;
      
      // Play the selection sound
      try {
        const audio = new Audio('/assets/sounds/click.mp3');
        audio.volume = 0.3;
        audio.play().catch(error => {
          console.log('Error playing sound:', error);
        });
      } catch (error) {
        console.log('Error creating audio instance:', error);
      }
      
      // Set advancing state to prevent multiple advances
      setIsAdvancing(true);
      
      // Set a timeout to advance after a delay
      timerRef.current = window.setTimeout(() => {
        // If there's a validation function, check if we can advance
        let canAdvance = true;
        
        if (onValidate) {
          console.log('SelfAssessmentStep: Validating before advancing');
          canAdvance = onValidate();
          console.log('SelfAssessmentStep: Validation result:', canAdvance);
        }
        
        if (canAdvance) {
          console.log('SelfAssessmentStep: Advancing to next step');
          // Pass true to indicate this is auto-next (should show errors if validation fails)
          handleNext(true);
        } else {
          console.log('SelfAssessmentStep: Validation failed, not advancing');
          // Reset advancing state but keep advanceAttemptedRef true to prevent loops
          setIsAdvancing(false);
        }
        
        timerRef.current = null;
      }, 1500);
    }
  }, [value, autoAdvance, onValidate, handleNext, isAdvancing]);
  
  // Determine question text based on the type or assessmentKey
  const getQuestionText = () => {
    if (question) return question;
    
    switch (type || assessmentKey) {
      case 'outOfBreath':
        return "Често ми липсва въздух, когато се качвам по стълби";
      case 'fallingBack':
        return "Непрекъснато се връщам към лошите си навици за упражнения";
      case 'suitableWorkouts':
        return "Трудно ми е да намеря тренировки, подходящи за моето ниво на физическа подготовка";
      case 'motivationLevel':
        return "Трудно ми е да остана мотивиран/а с тренировките";
      case 'dietConsistency':
        return "Имам проблеми с поддържането на постоянна диета";
      default:
        return "";
    }
  };

  // Updated rating system with clearer context
  const ratings = [
    { 
      value: 1, 
      label: 'Изобщо не съм съгласен', 
      shortLabel: 'Изобщо не', 
      color: 'bg-green-500/90 backdrop-blur-sm border border-green-400/30',
      hoverColor: 'hover:bg-green-400/20 hover:border-green-400/50',
      description: 'Не се отнася за мен изобщо'
    },
    { 
      value: 2, 
      label: 'По-скоро не съм съгласен', 
      shortLabel: 'Леко', 
      color: 'bg-teal-500/90 backdrop-blur-sm border border-teal-400/30',
      hoverColor: 'hover:bg-teal-400/20 hover:border-teal-400/50',
      description: 'Отнася се за мен в много редки случаи'
    },
    { 
      value: 3, 
      label: 'Нито съгласен, нито несъгласен', 
      shortLabel: 'Умерено', 
      color: 'bg-blue-500/90 backdrop-blur-sm border border-blue-400/30',
      hoverColor: 'hover:bg-blue-400/20 hover:border-blue-400/50',
      description: 'Отнася се за мен в някои случаи'
    },
    { 
      value: 4, 
      label: 'По-скоро съм съгласен', 
      shortLabel: 'Много', 
      color: 'bg-purple-500/90 backdrop-blur-sm border border-purple-400/30',
      hoverColor: 'hover:bg-purple-400/20 hover:border-purple-400/50',
      description: 'Отнася се за мен в повечето случаи'
    },
    { 
      value: 5, 
      label: 'Напълно съм съгласен', 
      shortLabel: 'Изключително', 
      color: 'bg-orange/90 backdrop-blur-sm border border-orange/30',
      hoverColor: 'hover:bg-orange/20 hover:border-orange/50',
      description: 'Отнася се за мен напълно и постоянно'
    }
  ];

  const handleOptionSelect = (selectedValue: number) => {
    // Don't allow changes if we're already in the process of advancing
    if (isAdvancing) {
      console.log('SelfAssessmentStep: Already advancing, ignoring selection');
      return;
    }
    
    // If selecting a new value, reset the advance attempt tracking
    if (value !== selectedValue) {
      advanceAttemptedRef.current = false;
    }
    
    // Clear any existing toasts
    dismiss();
    
    // Update the selected value
    console.log('SelfAssessmentStep: Selected option:', selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4">
      <div className="flex items-center justify-center mb-4 gap-2">
        <div className="text-sm font-medium text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
          Самооценка
        </div>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="text-gray-400 hover:text-orange-500 focus:outline-none transition-colors"
          aria-label={showHelp ? "Скрий помощ" : "Покажи помощ"}
        >
          <HelpCircle size={16} />
        </button>
      </div>
      
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-orange-50 text-orange-800 text-sm rounded-lg p-4 mb-4 overflow-hidden"
          >
            <div className="flex gap-2 mb-2">
              <Info size={16} className="flex-shrink-0 mt-0.5" />
              <p className="font-medium">Моля, прочетете твърдението и изберете доколко сте съгласни с него:</p>
            </div>
            <ul className="ml-6 space-y-1 list-disc text-orange-700">
              <li>1 = Изобщо не съм съгласен/а</li>
              <li>5 = Напълно съм съгласен/а</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold text-center mb-4"
      >
        Доколко сте съгласни с това твърдение?
      </motion.h2>
      
      <motion.div 
        className="text-lg text-center p-5 mb-6 bg-card/30 backdrop-blur-md rounded-xl shadow-md border border-border/50 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          Твърдение
        </div>
        <span className="text-foreground font-medium leading-relaxed">{getQuestionText()}</span>
      </motion.div>

      {/* Rating Scale Context - Small devices */}
      <div className="flex justify-between text-xs text-gray-500 px-1 mb-2 sm:hidden">
        <span>Не съм съгласен</span>
        <span>Съгласен съм</span>
      </div>

      {/* Rating buttons - Mobile optimized */}
      <motion.div 
        className="relative mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Mobile View - Horizontal Slider Style */}
        <div className="flex flex-col sm:hidden">
          <div className="flex justify-between items-center mb-4 relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10 rounded-full"></div>
            
            {ratings.map((rating) => (
              <div key={rating.value} className="flex flex-col items-center">
                <button
                  onClick={() => handleOptionSelect(rating.value)}
                  disabled={isAdvancing}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-sm shadow-sm",
                    value === rating.value
                      ? `${rating.color} text-white` 
                      : "bg-card/30 border-2 border-border/50 text-foreground hover:border-border"
                  )}
                  aria-label={rating.label}
                >
                  <span className="text-lg font-bold">{rating.value}</span>
                  {value === rating.value && (
                    <CheckCircle className="absolute top-0 right-0 w-4 h-4" />
                  )}
                </button>
                
                <span className="text-xs mt-2 text-gray-500">{rating.shortLabel}</span>
              </div>
            ))}
          </div>
          
          {/* Mobile rating descriptions */}
          {value !== null && (
            <div className="text-xs text-center text-foreground mt-2 p-2 bg-background/70 backdrop-blur-sm rounded-lg border border-border/30">
              <p><strong>{ratings.find(r => r.value === value)?.label}:</strong> {ratings.find(r => r.value === value)?.description}</p>
            </div>
          )}
        </div>
        
        {/* Desktop View - Card Grid */}
        <div className="hidden sm:grid sm:grid-cols-5 sm:gap-4">
          {ratings.map((rating, index) => (
            <motion.button
              key={rating.value}
              onClick={() => handleOptionSelect(rating.value)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative p-5 rounded-xl transition-all flex flex-col items-center justify-center h-full backdrop-blur-sm",
                value === rating.value 
                  ? `${rating.color} text-white shadow-lg` 
                  : `bg-card/30 border border-border/50 ${rating.hoverColor} shadow-sm`
              )}
              disabled={isAdvancing}
            >
              {value === rating.value && (
                <motion.div 
                  className="absolute top-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring" }}
                >
                  <CheckCircle className="w-5 h-5" />
                </motion.div>
              )}
              
              <span className={cn(
                "text-3xl font-bold mb-1",
                value === rating.value ? "text-white" : "text-foreground"
              )}>
                {rating.value}
              </span>
              
              <span className={cn(
                "text-sm font-medium mb-1 text-center",
                value === rating.value ? "text-white" : "text-foreground"
              )}>
                {rating.shortLabel}
              </span>
              
              <span className={cn(
                "text-xs text-center",
                value === rating.value ? "text-white/80" : "text-foreground/80"
              )}>
                {rating.label}
              </span>
              
              <span className={cn(
                "text-[10px] text-center mt-1 max-w-[90%]",
                value === rating.value ? "text-white/70" : "text-foreground/70"
              )}>
                {rating.description}
              </span>
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence>
          {value !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 text-center"
            >
              <div className="bg-orange/10 backdrop-blur-sm rounded-xl p-4 inline-block min-w-64 mx-auto border border-orange/20">
                <p className="text-base text-foreground">
                  Избрахте: <span className="font-semibold">{ratings.find(r => r.value === value)?.label}</span>
                </p>
                {isAdvancing && (
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600">
                    <svg className="animate-spin h-4 w-4 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Преминаване към следващия въпрос...
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!autoAdvance && (
          <p className="text-center text-gray-500 text-sm mt-8">
            Изберете своя отговор и кликнете "Продължи", за да продължите
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SelfAssessmentStep;
