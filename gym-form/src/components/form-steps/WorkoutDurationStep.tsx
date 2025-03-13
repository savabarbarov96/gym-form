import React, { useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { useSurvey } from '@/contexts/SurveyContext';
import { Clock, Timer, Hourglass, Sparkles } from "lucide-react";

interface WorkoutDurationStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
  autoAdvance?: boolean;
}

const WorkoutDurationStep: React.FC<WorkoutDurationStepProps> = ({ 
  selected, 
  onSelect,
  autoAdvance = true
}) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selected);
  
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

  const options = [
    { value: "short", label: "10-15 минути", icon: Timer, description: "Кратки, интензивни тренировки" },
    { value: "medium", label: "20-30 минути", icon: Clock, description: "Балансирани тренировки" },
    { value: "long", label: "30-40 минути", icon: Hourglass, description: "По-дълги, комплексни тренировки" },
    { value: "auto", label: "Оставете на нас", icon: Sparkles, description: "Оптимизирано според Вашите цели" }
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

  const handleChange = (value: string) => {
    onSelect(value);
    
    // Play selection sound
    const audio = new Audio('/sounds/select.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Колко дълги искате да бъдат Вашите тренировки?
      </motion.h1>
      
      <motion.div
        className="mt-8 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <RadioGroup value={selected || ""} onValueChange={handleChange} className="flex flex-col gap-4">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div 
                key={option.value}
                variants={itemVariants}
                className={`option-card p-5 rounded-lg border-2 transition-all duration-300 ${
                  selected === option.value 
                    ? 'border-orange bg-orange/5 shadow-lg transform scale-[1.02]' 
                    : 'border-transparent hover:border-orange/30 hover:bg-card/80'
                }`}
                onClick={() => handleChange(option.value)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${selected === option.value ? 'bg-orange/20' : 'bg-muted'}`}>
                    <Icon className={`h-6 w-6 ${selected === option.value ? 'text-orange' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <label htmlFor={option.value} className="font-medium text-lg cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">{option.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
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

export default WorkoutDurationStep;
