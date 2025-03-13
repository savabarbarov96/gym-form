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
    { label: "Качвам тегло бързо, но губя бавно", id: "gain-fast-lose-slow" },
    { label: "Качвам и губя тегло лесно", id: "gain-lose-easily" },
    { label: "Трудно качвам тегло или мускули", id: "struggle-gain" },
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
        className="text-4xl sm:text-5xl font-bold mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Как обикновено се променя Вашето тегло?
      </motion.h1>
      
      <motion.div 
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <RadioGroup value={selected || ""} onValueChange={handleSelectOption}>
          {options.map((option, index) => (
            <motion.div 
              key={option.id} 
              variants={itemVariants}
              className="mb-4"
            >
              <div 
                className={`flex items-center space-x-2 bg-card p-5 rounded-lg border-2 transition-all duration-300 ${
                  selected === option.id 
                    ? 'border-orange bg-orange/5 shadow-lg transform scale-[1.02]' 
                    : 'border-transparent hover:border-orange/30 hover:bg-card/80'
                }`}
                onClick={() => handleSelectOption(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} className="text-orange" />
                <label htmlFor={option.id} className="text-xl cursor-pointer flex-1 text-left">{option.label}</label>
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
