import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSurvey } from '@/contexts/SurveyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

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
          handleNext();
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

  const ratings = [
    { value: 1, label: 'Изобщо не', color: 'bg-green-500' },
    { value: 2, label: 'Леко', color: 'bg-teal-500' },
    { value: 3, label: 'Умерено', color: 'bg-blue-500' },
    { value: 4, label: 'Много', color: 'bg-purple-500' },
    { value: 5, label: 'Изключително', color: 'bg-orange' }
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
    <div className="max-w-3xl mx-auto w-full">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8"
      >
        Доколко се идентифицирате с това твърдение?
      </motion.h2>
      
      <motion.div 
        className="text-xl text-center p-8 mb-10 bg-gradient-to-br from-card to-background rounded-2xl shadow-lg border border-border relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange/10 text-orange px-4 py-1 rounded-full text-sm font-medium">
          Твърдение
        </div>
        <span className="text-orange font-medium leading-relaxed">{getQuestionText()}</span>
      </motion.div>

      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
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
                "relative p-6 rounded-xl transition-all flex flex-col items-center justify-center h-full",
                value === rating.value 
                  ? `${rating.color} text-white shadow-lg` 
                  : "bg-card border border-border hover:border-orange/50 shadow-md"
              )}
              disabled={isAdvancing}
            >
              {value === rating.value && (
                <motion.div 
                  className="absolute top-3 right-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring" }}
                >
                  <CheckCircle className="w-5 h-5" />
                </motion.div>
              )}
              
              <span className={cn(
                "text-4xl font-bold mb-2",
                value === rating.value ? "text-white" : "text-foreground"
              )}>
                {rating.value}
              </span>
              
              <span className={cn(
                "text-sm font-medium",
                value === rating.value ? "text-white" : "text-muted-foreground"
              )}>
                {rating.label}
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
              <div className="bg-muted/30 rounded-xl p-4 inline-block min-w-64 mx-auto">
                <p className="text-lg">
                  Избрахте: <span className="font-semibold text-orange">{ratings.find(r => r.value === value)?.label}</span>
                </p>
                {isAdvancing && (
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                    <svg className="animate-spin h-4 w-4 text-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          <p className="text-center text-muted-foreground text-sm mt-8">
            Изберете своя отговор и кликнете "Продължи", за да продължите
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SelfAssessmentStep;
