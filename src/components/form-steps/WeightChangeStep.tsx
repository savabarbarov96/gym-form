import React, { useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurvey } from '@/contexts/SurveyContext';
import { motion } from "framer-motion";

interface WeightChangeStepProps {
  selected: string | null;
  onSelect: (type: string) => void;
  autoAdvance?: boolean;
}

const WeightChangeStep = ({ 
  selected, 
  onSelect, 
  autoAdvance = false 
}: WeightChangeStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selected);
  
  const options = [
    { 
      label: "Бързо качвам тегло, но трудно отслабвам", 
      id: "gain-fast-lose-slow",
      description: "Вашият метаболизъм задържа калории ефективно, което може да е индикация за ендоморфен тип тяло"
    },
    { 
      label: "Теглото ми се променя сравнително лесно", 
      id: "gain-lose-easily",
      description: "Вашият метаболизъм е балансиран - имате характеристики на мезоморфен тип тяло"
    },
    { 
      label: "Трудно качвам тегло или мускулна маса", 
      id: "struggle-gain",
      description: "Висок метаболизъм - типично за ектоморфен тип тяло, изразходващо калории бързо"
    },
  ];
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selected !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selected, autoAdvance, handleNext]);
  
  const handleSelectOption = (value: string) => {
    onSelect(value);
    
    // Play selection sound
    const audio = new Audio('/sounds/select.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="text-center">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Как обикновено се променя Вашето тегло?
      </motion.h1>
      
      <motion.p
        className="text-muted-foreground mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Това ни помага да определим вашия метаболитен тип и да адаптираме тренировките
      </motion.p>
      
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <RadioGroup value={selected || ""} onValueChange={handleSelectOption}>
          {options.map((option, index) => (
            <motion.div 
              key={option.id} 
              variants={itemVariants}
              className="mb-6"
            >
              <div 
                className={`flex items-center p-6 rounded-xl border-2 transition-all duration-300 bg-card/80 backdrop-blur-sm ${
                  selected === option.id 
                    ? 'border-orange shadow-lg transform scale-[1.02] bg-card/95' 
                    : 'border-gray-200 hover:border-orange/30 hover:bg-card'
                }`}
                onClick={() => handleSelectOption(option.id)}
              >
                <div className="flex-1">
                  <label htmlFor={option.id} className="text-xl font-medium cursor-pointer block text-foreground">{option.label}</label>
                  <p className="text-muted-foreground text-sm mt-1">{option.description}</p>
                </div>
                <RadioGroupItem value={option.id} id={option.id} className="text-orange h-6 w-6" />
              </div>
            </motion.div>
          ))}
        </RadioGroup>
        
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
      </motion.div>
    </div>
  );
};

export default WeightChangeStep;
