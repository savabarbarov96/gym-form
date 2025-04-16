import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, CalendarCheck, XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSurvey } from '@/contexts/SurveyContext';

interface StartCommitmentStepProps {
  value?: string | null;
  onChange?: (value: string) => void;
  selected?: string | null;
  onSelect?: (value: string) => void;
  autoAdvance?: boolean;
}

const StartCommitmentStep = ({ 
  value,
  onChange,
  selected,
  onSelect,
  autoAdvance = false
}: StartCommitmentStepProps) => {
  const { handleNext } = useSurvey();
  
  // Use either value/onChange or selected/onSelect props
  const currentValue = selected || value;
  const [localSelection, setLocalSelection] = useState(currentValue);
  const initialValueRef = useRef<string | null>(currentValue);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ensure the local state stays in sync with props
  useEffect(() => {
    setLocalSelection(currentValue);
  }, [currentValue]);

  // Implement auto-advance functionality
  useEffect(() => {
    if (autoAdvance && 
        localSelection !== null && 
        initialValueRef.current === null) {
      
      console.log('StartCommitmentStep: Selection made, preparing to auto-advance', localSelection);
      
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Short delay to allow the user to see their selection
      timerRef.current = setTimeout(() => {
        console.log('StartCommitmentStep: Auto-advancing to next step');
        handleNext(true);
      }, 1200);
      
      return () => {
        if (timerRef.current) {
          console.log('StartCommitmentStep: Cleaning up timer on unmount');
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [localSelection, autoAdvance, handleNext]);
  
  const handleChange = (newValue: string) => {
    setLocalSelection(newValue);
    
    if (onSelect) {
      onSelect(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
    
    // Debug
    console.log('StartCommitmentStep: Selection made:', newValue);
    
    // Play a sound when a selection is made
    try {
      const audio = new Audio('/assets/sounds/click.mp3');
      audio.volume = 0.3;
      audio.play().catch(error => {
        console.log('Error playing sound:', error);
      });
    } catch (error) {
      console.log('Error creating audio instance:', error);
    }
  };

  const options = [
    { 
      value: 'today', 
      label: 'Ще започна тренировката си днес!', 
      icon: CalendarCheck, 
      description: 'Чудесен избор! Започването днес Ви поставя на бързия път към резултати.' 
    },
    { 
      value: 'tomorrow', 
      label: 'Ще започна първата си тренировка утре!', 
      icon: Calendar, 
      description: 'Перфектно! Отделянето на ден за подготовка Ви настройва за успех.' 
    },
    { 
      value: 'notReady', 
      label: 'Не съм готов/а да поема ангажимент', 
      icon: XCircle, 
      description: 'Няма проблем. Вашият план ще бъде готов, когато Вие сте готови.' 
    },
  ];

  return (
    <div className="max-w-3xl mx-auto text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Кога искате да започнете?
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground mb-10 max-w-2xl mx-auto"
      >
        Вашият персонализиран план е почти готов! Нека разберем кога планирате да започнете.
      </motion.p>
      
      <div className="grid gap-6 md:grid-cols-3">
        {options.map((option, index) => {
          const IconComponent = option.icon;
          const isSelected = localSelection === option.value;
          
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              onClick={() => handleChange(option.value)}
              className={cn(
                "p-6 rounded-xl shadow-lg cursor-pointer transition-all relative overflow-hidden",
                isSelected 
                  ? "border-2 border-orange bg-orange/10" 
                  : "border border-border hover:border-orange/50 hover:bg-orange/5"
              )}
            >
              {isSelected && (
                <motion.div 
                  className="absolute top-4 right-4 text-orange"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring" }}
                >
                  <CheckCircle size={24} />
                </motion.div>
              )}
              
              <div className="mb-4 flex justify-center">
                <div className={cn(
                  "p-4 rounded-full",
                  isSelected ? "bg-orange text-white" : "bg-orange/10 text-orange"
                )}>
                  <IconComponent size={32} />
                </div>
              </div>
              
              <h3 className={cn(
                "text-xl font-semibold mb-2",
                isSelected ? "text-orange" : ""
              )}>
                {option.label}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </motion.div>
          );
        })}
      </div>
      
      {!localSelection && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-amber-600 dark:text-amber-400"
        >
          Моля, изберете опция за да продължите
        </motion.p>
      )}
      
      {autoAdvance && localSelection && initialValueRef.current === null && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Преминаване към финалната стъпка...
        </motion.p>
      )}
    </div>
  );
};

export default StartCommitmentStep;
