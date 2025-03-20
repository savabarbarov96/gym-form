import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSurvey } from '@/contexts/SurveyContext';
import { motion } from 'framer-motion';

interface AgeSelectionStepProps {
  selectedAge: string | null;
  onSelect: (age: string) => void;
  autoAdvance?: boolean;
}

const AgeSelectionStep: React.FC<AgeSelectionStepProps> = ({ 
  selectedAge, 
  onSelect, 
  autoAdvance = true 
}) => {
  const { handleNext } = useSurvey();
  const [isAdvancing, setIsAdvancing] = useState(false);
  const initialValueRef = useRef<string | null>(selectedAge);
  const timerRef = useRef<number | null>(null);
  
  const ageGroups = [
    { 
      label: "18-29", 
      id: "18-29", 
      color: "from-orange-600 to-orange-300",
      secondaryColor: "from-orange-500/20 to-orange-300/20",
      description: "Висока енергия и метаболизъм",
    },
    { 
      label: "30-39", 
      id: "30-39", 
      color: "from-orange-500 to-orange-200",
      secondaryColor: "from-orange-400/20 to-orange-200/20",
      description: "Фокус върху сила и издръжливост",
    },
    { 
      label: "40-49", 
      id: "40-49", 
      color: "from-orange-400 to-yellow-300",
      secondaryColor: "from-orange-300/20 to-yellow-200/20",
      description: "Баланс между здраве и фитнес",
    },
    { 
      label: "50+", 
      id: "50+", 
      color: "from-orange-300 to-yellow-200",
      secondaryColor: "from-orange-200/20 to-yellow-100/20",
      description: "Гъвкавост и жизненост",
    },
  ];
  
  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selectedAge !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext(true); // Pass true to indicate this is auto-next
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedAge, autoAdvance, handleNext]);

  const handleSelectAge = (age: string) => {
    // Don't allow changes if we're already in the process of advancing
    if (isAdvancing) {
      console.log('AgeSelectionStep: Already advancing, ignoring selection');
      return;
    }
    
    console.log('AgeSelectionStep: Option selected:', age);
    onSelect(age);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center max-w-3xl mx-auto"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent"
      >
        ИЗГРАДЕТЕ ПЕРФЕКТНОТО ТЯЛО
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl mb-12 text-muted-foreground"
      >
        СЪОБРАЗЕНО С ВАШАТА ВЪЗРАСТ И ТИП ТЯЛО
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 p-6 bg-card rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Изберете вашата възрастова група</h2>
        <p className="text-muted-foreground mb-6">Вашият план ще бъде персонализиран според физиологичните нужди на вашата възраст</p>
        
        <div className="space-y-4">
          {ageGroups.map((age, index) => {
            const isSelected = selectedAge === age.id;
            
            return (
              <motion.div
                key={age.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleSelectAge(age.id)}
                className={cn(
                  "relative p-1 rounded-xl cursor-pointer overflow-hidden transition-all duration-300",
                  isSelected 
                    ? "bg-gradient-to-r " + age.color
                    : "bg-gradient-to-r " + age.secondaryColor + " hover:shadow-md"
                )}
              >
                <div className={cn(
                  "bg-background rounded-lg p-4 flex items-center justify-between",
                  isSelected ? "bg-opacity-10" : "bg-opacity-90"
                )}>
                  <div className="flex items-center">
                    <motion.div 
                      className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-full mr-4 font-bold text-xl",
                        isSelected ? "bg-white text-orange-600" : "bg-muted text-muted-foreground"
                      )}
                      animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.div>
                    
                    <div className="text-left">
                      <div className={cn(
                        "text-xl font-bold",
                        isSelected ? "text-white" : "text-foreground"
                      )}>
                        {age.label} години
                      </div>
                      <div className={cn(
                        "text-sm",
                        isSelected ? "text-white/90" : "text-muted-foreground"
                      )}>
                        {age.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "h-6 w-6 rounded-full ml-2 flex items-center justify-center transition-all",
                    isSelected 
                      ? "bg-white scale-100" 
                      : "bg-muted scale-75"
                  )}>
                    <motion.div 
                      animate={isSelected ? { scale: 1 } : { scale: 0 }}
                      className="h-3 w-3 rounded-full bg-orange"
                    />
                  </div>
                </div>
                
                {isSelected && (
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rounded-full" />
                    <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-white/10 rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {isAdvancing && (
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
  );
};

export default AgeSelectionStep;
