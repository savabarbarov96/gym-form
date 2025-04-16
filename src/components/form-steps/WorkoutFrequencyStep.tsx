import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSurvey } from '@/contexts/SurveyContext';
import { CalendarDays } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface WorkoutFrequencyStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
  autoAdvance?: boolean;
}

const WorkoutFrequencyStep: React.FC<WorkoutFrequencyStepProps> = ({ 
  selected, 
  onSelect,
  autoAdvance = false
}) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selected);
  const [sliderValue, setSliderValue] = useState<number>(
    selected ? getNumberFromFrequency(selected) : 3
  );
  
  // Convert frequency string to number for slider
  function getNumberFromFrequency(freq: string): number {
    switch(freq) {
      case '1-2-times': return 2;
      case '3-times': return 3;
      case 'more-than-3': return 5;
      default: return 3;
    }
  }
  
  // Convert slider number to frequency string
  function getFrequencyFromNumber(num: number): string {
    if (num <= 2) return '1-2-times';
    if (num === 3) return '3-times';
    return 'more-than-3';
  }
  
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

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue(newValue);
    const frequencyValue = getFrequencyFromNumber(newValue);
    onSelect(frequencyValue);
    
    // Play selection sound
    const audio = new Audio('/assets/sounds/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  // Get descriptive text based on slider value
  const getFrequencyDescription = (value: number): string => {
    switch(value) {
      case 1: return "Веднъж седмично";
      case 2: return "Два пъти седмично";
      case 3: return "Три пъти седмично";
      case 4: return "Четири пъти седмично";
      case 5: return "Пет пъти седмично";
      case 6: return "Шест пъти седмично";
      case 7: return "Всеки ден";
      default: return "Три пъти седмично";
    }
  };

  // Get recommendation text based on value
  const getRecommendation = (value: number): string => {
    if (value <= 2) return "Добра начална честота за начинаещи";
    if (value <= 4) return "Идеален баланс за повечето хора";
    return "Подходящо за напреднали спортисти";
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Колко дни седмично можете да отделите за тренировки?
      </motion.h1>
      
      <motion.div
        className="mt-12 space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-card/50 p-6 rounded-xl shadow-lg border border-border"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <CalendarDays className="w-8 h-8 text-orange" />
            <h2 className="text-2xl font-semibold">{sliderValue} {sliderValue === 1 ? "ден" : "дни"} седмично</h2>
          </div>
          
          <div className="mb-10 px-6">
            <Slider 
              defaultValue={[sliderValue]} 
              max={7} 
              min={1} 
              step={1} 
              onValueChange={handleSliderChange}
              className="my-5"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-medium mb-2 text-orange">
              {getFrequencyDescription(sliderValue)}
            </div>
            <p className="text-sm text-muted-foreground">
              {getRecommendation(sliderValue)}
            </p>
          </div>
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
      </motion.div>
    </div>
  );
};

export default WorkoutFrequencyStep; 