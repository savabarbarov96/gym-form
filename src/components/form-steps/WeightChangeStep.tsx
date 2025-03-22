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
  autoAdvance = true 
}: WeightChangeStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selected);
  
  const options = [
    { 
      label: "Бързо качвам тегло, но трудно отслабвам", 
      id: "gain-fast-lose-slow",
      description: "Вашият метаболизъм задържа калории ефективно, което може да е индикация за ендоморфен тип тяло",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      )
    },
    { 
      label: "Теглото ми се променя сравнително лесно", 
      id: "gain-lose-easily",
      description: "Вашият метаболизъм е балансиран - имате характеристики на мезоморфен тип тяло",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
          <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
          <path d="M8 9h8" />
          <path d="M8 15h8" />
          <path d="M12 6v12" />
        </svg>
      )
    },
    { 
      label: "Трудно качвам тегло или мускулна маса", 
      id: "struggle-gain",
      description: "Висок метаболизъм - типично за ектоморфен тип тяло, изразходващо калории бързо",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
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
                <div className={`flex items-center justify-center w-14 h-14 rounded-full shadow-sm mr-5 ${
                  selected === option.id 
                    ? 'bg-white' 
                    : 'bg-gray-50'
                }`}>
                  {option.icon}
                </div>
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
