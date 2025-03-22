import React, { useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurvey } from '@/contexts/SurveyContext';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Dumbbell, Feather, Gauge, Activity, CheckCircle2 } from "lucide-react";

interface WorkoutIntensityStepProps {
  selectedIntensity: string | null;
  onSelect: (intensity: string) => void;
  autoAdvance?: boolean;
}

const WorkoutIntensityStep = ({ 
  selectedIntensity, 
  onSelect, 
  autoAdvance = true 
}: WorkoutIntensityStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selectedIntensity);
  
  const intensities = [
    {
      id: "light",
      label: "Леко натоварване",
      description: "По-ниска интензивност, подходяща за начинаещи или възстановяване",
      icon: Feather,
      color: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-500"
    },
    {
      id: "moderate",
      label: "Умерено натоварване",
      description: "Балансирана интензивност, подходяща за повечето нива на физическа подготовка",
      icon: Gauge,
      color: "bg-green-500/10",
      borderColor: "border-green-500/30",
      iconColor: "text-green-500"
    },
    {
      id: "heavy",
      label: "Тежко натоварване",
      description: "Висока интензивност, предизвикателни тренировки за опитни потребители",
      icon: Dumbbell,
      color: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-500"
    },
    {
      id: "auto",
      label: "Оставете на нас",
      description: "Ще оптимизираме според Вашите цели и ниво на физическа подготовка",
      icon: Activity,
      color: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-500"
    }
  ];
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selectedIntensity !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedIntensity, autoAdvance, handleNext]);
  
  const handleSelectIntensity = (intensity: string) => {
    onSelect(intensity);
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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="text-center px-5 max-w-md mx-auto">
      {/* Step indicator and header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="inline-block bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
          Стъпка 18
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
          Изберете предпочитаното ниво на тренировки
        </h1>
        <p className="text-base text-gray-500 mt-3">
          Ще адаптираме интензивността според Вашия избор
        </p>
      </motion.div>
      
      {/* Options */}
      <RadioGroup 
        value={selectedIntensity || ""} 
        onValueChange={handleSelectIntensity}
        className="space-y-4"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {intensities.map((intensity) => (
            <motion.div
              key={intensity.id}
              variants={itemVariants}
              className={cn(
                "relative overflow-hidden rounded-xl shadow-sm border-2 transition-all duration-300 active:scale-[0.98] touch-manipulation",
                selectedIntensity === intensity.id 
                  ? `${intensity.borderColor} ${intensity.color} shadow-md` 
                  : "border-gray-500/10 bg-background/40 hover:border-gray-400/30 hover:shadow-md backdrop-blur-sm"
              )}
              onClick={() => handleSelectIntensity(intensity.id)}
            >
              <div className="p-5 sm:p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center",
                    selectedIntensity === intensity.id 
                      ? intensity.color 
                      : "bg-gray-500/10"
                  )}>
                    <intensity.icon 
                      className={cn(
                        "w-6 h-6 sm:w-7 sm:h-7",
                        selectedIntensity === intensity.id 
                          ? intensity.iconColor 
                          : "text-gray-400"
                      )} 
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow text-left">
                    <div className="flex justify-between">
                      <label 
                        htmlFor={intensity.id} 
                        className="text-lg font-medium block cursor-pointer"
                      >
                        {intensity.label}
                      </label>
                      
                      {/* Radio button */}
                      <div className="hidden sm:block">
                        <RadioGroupItem 
                          value={intensity.id} 
                          id={intensity.id} 
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      {intensity.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Selected indicator (mobile) */}
              {selectedIntensity === intensity.id && (
                <div className="absolute top-2 right-2 p-2 sm:hidden">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </RadioGroup>
      
      {/* Auto-advance indicator */}
      <AnimatePresence>
        {autoAdvance && selectedIntensity !== null && initialValueRef.current === null && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-gray-500 mt-6 flex items-center justify-center"
          >
            <span className="mr-2 inline-block w-4 h-4 rounded-full bg-orange-500 animate-pulse"></span>
            Преминаване към следващия въпрос...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkoutIntensityStep;
