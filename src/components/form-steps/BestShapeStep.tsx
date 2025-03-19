import React, { useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BadgeCheck, Clock, CalendarClock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurvey } from "@/contexts/SurveyContext";
import { motion } from "framer-motion";

interface BestShapeStepProps {
  selected: string | null;
  onSelect: (time: string) => void;
  autoAdvance?: boolean;
}

const BestShapeStep = ({ 
  selected, 
  onSelect, 
  autoAdvance = true 
}: BestShapeStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selected);

  const options = [
    { 
      label: "Преди по-малко от година", 
      id: "less-than-year", 
      icon: BadgeCheck,
      description: "Поддържали сте добра форма наскоро"
    },
    { 
      label: "Преди 1-3 години", 
      id: "1-3-years", 
      icon: Clock,
      description: "Имали сте успехи във фитнеса в близкото минало"
    },
    { 
      label: "Преди повече от 3 години", 
      id: "more-than-3-years", 
      icon: CalendarClock,
      description: "Минало е доста време откакто сте били в най-добра форма"
    },
    { 
      label: "Никога", 
      id: "never", 
      icon: XCircle,
      description: "Все още не сте достигнали идеалното ниво на физическа форма"
    },
  ];

  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selected !== null && 
        initialValueRef.current === null) {
      
      // Debug log
      console.log('BestShapeStep: Selection made, preparing to auto-advance', selected);
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        console.log('BestShapeStep: Auto-advancing to next step');
        handleNext();
      }, 1000); // Slightly longer delay for better UX
      
      return () => {
        console.log('BestShapeStep: Cleaning up timer');
        clearTimeout(timer);
      };
    }
  }, [selected, autoAdvance, handleNext]);
  
  const handleSelectOption = (value: string) => {
    console.log('BestShapeStep: Option selected:', value);
    onSelect(value);
    
    // Play selection sound if available
    try {
      const audio = new Audio('/sounds/select.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio play error:', error);
    }
  };

  return (
    <div className="text-center">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Откога бяхте в най-добрата форма на живота си?
      </motion.h1>
      <motion.p 
        className="text-muted-foreground text-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Това ни помага да разберем Вашата фитнес история
      </motion.p>
      
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RadioGroup value={selected || ""} onValueChange={handleSelectOption}>
            {options.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div 
                  key={option.id} 
                  className={cn(
                    "flex items-center space-x-4 bg-card p-4 rounded-lg cursor-pointer transition-all duration-300 border border-transparent",
                    selected === option.id ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
                  )}
                  onClick={() => handleSelectOption(option.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="text-orange" />
                  <div className={cn(
                    "icon-container",
                    selected === option.id ? "bg-orange/20" : "bg-secondary"
                  )}>
                    <Icon className={cn(
                      "icon-sm",
                      selected === option.id ? "text-orange" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <label htmlFor={option.id} className="text-xl cursor-pointer font-medium">{option.label}</label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </RadioGroup>
        </motion.div>
      </div>
      
      {autoAdvance && selected !== null && initialValueRef.current === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-center"
        >
          <div className="px-4 py-2 bg-orange/10 rounded-full text-orange text-sm font-medium inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Преминаване към следващия въпрос...
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BestShapeStep;
