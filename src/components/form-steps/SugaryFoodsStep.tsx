import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Info, Cookie, CakeSlice, Coffee } from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';
import { motion } from 'framer-motion';

interface SugaryFoodsStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
  autoAdvance?: boolean;
}

const SugaryFoodsStep: React.FC<SugaryFoodsStepProps> = ({ 
  selected, 
  onSelect,
  autoAdvance = false
}) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selected);
  
  const options = [
    { value: 'never', label: 'Почти никога', icon: Coffee, description: 'Рядко или никога не консумирам сладки храни' },
    { value: 'weekly', label: '1-2 пъти седмично', icon: Cookie, description: 'Умерена консумация на сладки храни' },
    { value: 'daily', label: 'Почти всеки ден', icon: CakeSlice, description: 'Редовна консумация на сладки храни' }
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
    <div className="max-w-2xl mx-auto w-full">
      <motion.h2 
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Колко често консумирате сладки храни или напитки?
      </motion.h2>
      
      <motion.div 
        className="mb-6 p-4 bg-secondary rounded-lg flex items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Info className="min-w-5 h-5 mt-0.5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Въз основа на приема Ви, ще се опитаме да включим нискокалорични заместители на сладкото във Вашия план, за да помогнем с желанията за сладко.
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.value}
              variants={itemVariants}
              className={cn(
                "option-card p-6 border-2 rounded-lg transition-all duration-300",
                selected === option.value 
                  ? "border-orange bg-orange/5 shadow-lg transform scale-[1.02]" 
                  : "border-transparent hover:border-orange/30 hover:bg-card/80"
              )}
              onClick={() => handleSelectOption(option.value)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    selected === option.value ? "bg-orange/20" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      selected === option.value ? "text-orange" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <span className="text-lg font-medium">{option.label}</span>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 transition-colors",
                  selected === option.value ? "border-orange bg-orange" : "border-muted-foreground"
                )} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
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

export default SugaryFoodsStep;
