import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  BatteryLow, 
  BatteryMedium, 
  Battery, 
  Zap, 
  Sun, 
  Gauge,
  Sparkles
} from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';

interface EnergyLevelsStepProps {
  value: number | null;
  onChange: (value: number) => void;
  autoAdvance?: boolean;
}

const EnergyLevelsStep: React.FC<EnergyLevelsStepProps> = ({ 
  value, 
  onChange,
  autoAdvance = true
}) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<number | null>(value);

  const energyLevels = [
    { 
      level: 1, 
      icon: BatteryLow, 
      label: 'Много ниско', 
      description: 'Постоянно се чувствам уморен/а',
      color: 'bg-red-500/20',
      textColor: 'text-red-500',
      borderColor: 'border-red-500/70'
    },
    { 
      level: 2, 
      icon: BatteryMedium, 
      label: 'Ниско', 
      description: 'Енергията ми често спада',
      color: 'bg-amber-500/20',
      textColor: 'text-amber-500',
      borderColor: 'border-amber-500/70'
    },
    { 
      level: 3, 
      icon: Battery, 
      label: 'Средно', 
      description: 'Обикновено нива на енергия',
      color: 'bg-blue-500/20',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500/70'
    },
    { 
      level: 4, 
      icon: Sun, 
      label: 'Добро', 
      description: 'Енергичен/на през по-голямата част от деня',
      color: 'bg-green-500/20',
      textColor: 'text-green-500',
      borderColor: 'border-green-500/70'
    },
    { 
      level: 5, 
      icon: Sparkles, 
      label: 'Отлично', 
      description: 'Висока енергия през целия ден',
      color: 'bg-purple-500/20',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500/70',
      animationClass: 'animate-pulse'
    },
  ];

  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        value !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [value, autoAdvance, handleNext]);
  
  const handleSelectOption = (level: number) => {
    onChange(level);
    
    // Play selection sound
    const audio = new Audio('/sounds/select.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Нива на енергия</h1>
        <p className="text-muted-foreground text-xl">
          Как бихте оценили своята средна енергия през деня?
        </p>
      </motion.div>

      <div className="relative mx-auto mb-8 px-4">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"></div>
        <Gauge className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
        {energyLevels.map((energy, index) => {
          const Icon = energy.icon;
          const isSelected = value === energy.level;
          
          return (
            <motion.div
              key={energy.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "flex flex-col items-center p-5 rounded-xl cursor-pointer transition-all transform hover:scale-105 hover:-translate-y-1 border-2",
                isSelected 
                  ? `${energy.color} ${energy.borderColor} shadow-lg` 
                  : "bg-card/50 border-transparent hover:bg-muted/50"
              )}
              onClick={() => handleSelectOption(energy.level)}
            >
              <div className={cn(
                "rounded-full p-3 mb-3 transition-all",
                isSelected ? energy.color : "bg-muted/50"
              )}>
                <Icon 
                  className={cn(
                    "w-8 h-8 transition-colors",
                    isSelected ? energy.textColor : "text-muted-foreground",
                    energy.level === 5 && isSelected && energy.animationClass
                  )} 
                />
              </div>
              
              <span className={cn(
                "text-lg font-semibold transition-colors",
                isSelected ? energy.textColor : "text-foreground"
              )}>
                {energy.label}
              </span>
              
              <span className="text-sm text-muted-foreground text-center mt-1">
                {energy.description}
              </span>
              
              {isSelected && (
                <motion.div 
                  className="w-3 h-3 rounded-full bg-foreground mt-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground"
      >
        <p>Познаването на нивата ви на енергия ни помага да препоръчаме оптимално време и интензивност на тренировките според вашия личен график.</p>
      </motion.div>
      
      {autoAdvance && value !== null && initialValueRef.current === null && (
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

export default EnergyLevelsStep;
