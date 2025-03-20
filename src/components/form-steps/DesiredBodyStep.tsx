import React, { useEffect, useRef } from "react";
import { ArrowDownRight, Activity, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurvey } from '@/contexts/SurveyContext';
import { motion } from "framer-motion";

interface DesiredBodyStepProps {
  selectedBody: string | null;
  onSelect: (body: string) => void;
  autoAdvance?: boolean;
}

const DesiredBodyStep = ({ 
  selectedBody, 
  onSelect,
  autoAdvance = true
}: DesiredBodyStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selectedBody);
  
  const bodyTypes = [
    { 
      label: "Няколко размера по-малко", 
      id: "smaller", 
      icon: ArrowDownRight,
      description: "Отслабване, запазвайки естествената си форма"
    },
    { 
      label: "Стегнато", 
      id: "fit", 
      icon: Activity,
      description: "Слабо тяло с подобрена мускулна дефиниция"
    },
    { 
      label: "Атлетично", 
      id: "athletic", 
      icon: Dumbbell,
      description: "Добре развити мускули с ниско телесно тегло"
    },
  ];
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selectedBody !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedBody, autoAdvance, handleNext]);
  
  const handleSelectBody = (body: string) => {
    onSelect(body);
    
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
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="text-center px-4 sm:px-6 py-4 sm:py-6 max-w-[100vw] overflow-x-hidden">
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Изберете тялото, което искате
      </motion.h1>
      
      <motion.p 
        className="text-muted-foreground text-base sm:text-lg md:text-xl mb-5 sm:mb-8 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Изберете Вашата идеална физическа цел
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {bodyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <motion.div
              key={type.id}
              variants={itemVariants}
              className={cn(
                "option-card card-hover-effect overflow-hidden rounded-xl border-2 transition-all duration-300 flex flex-col",
                selectedBody === type.id 
                  ? 'border-orange shadow-lg transform scale-[1.02]' 
                  : 'border-transparent hover:border-orange/30',
                "aspect-auto sm:aspect-[3/4]"
              )}
              onClick={() => handleSelectBody(type.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col relative">
                {selectedBody === type.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-orange/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className="flex-1 flex items-center justify-center py-3 sm:py-4">
                  <div className={cn(
                    "icon-container rounded-full p-4 sm:p-6 md:p-8 transition-all duration-300",
                    selectedBody === type.id ? "bg-orange/30 scale-110" : "bg-secondary"
                  )}>
                    <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-orange" strokeWidth={selectedBody === type.id ? 2.5 : 1.5} />
                  </div>
                </div>
                <div className="mt-auto relative z-10">
                  <h3 className="text-lg sm:text-xl font-semibold">{type.label}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{type.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
      
      {autoAdvance && selectedBody !== null && initialValueRef.current === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 sm:mt-8 flex justify-center"
        >
          <div className="px-3 sm:px-4 py-2 bg-orange/10 rounded-full text-orange text-xs sm:text-sm font-medium inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

export default DesiredBodyStep;
