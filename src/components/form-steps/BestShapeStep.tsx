import React, { useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BadgeCheck, Clock, CalendarClock, XCircle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurvey } from "@/contexts/SurveyContext";
import { motion } from "framer-motion";

interface BestShapeStepProps {
  selected: string | null;
  onSelect: (time: string) => void;
  autoAdvance?: boolean;
}

const BestShapeStep = ({ 
  selected, 
  onSelect, 
  autoAdvance = true 
}: BestShapeStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selected);

  const options = [
    { 
      label: "В момента спортувам", 
      id: "currently-active", 
      icon: Activity,
      description: "Активно се занимавате със спорт в момента"
    },
    { 
      label: "По-малко от година", 
      id: "less-than-year", 
      icon: BadgeCheck,
      description: "Спортували сте активно през последната година"
    },
    { 
      label: "Между 1 и 3 години", 
      id: "1-3-years", 
      icon: Clock,
      description: "Имали сте активни периоди в последните няколко години"
    },
    { 
      label: "Повече от 3 години", 
      id: "more-than-3-years", 
      icon: CalendarClock,
      description: "Отдавна не сте се занимавали активно със спорт"
    },
    { 
      label: "Никога не съм спортувал/а активно", 
      id: "never", 
      icon: XCircle,
      description: "Започвате вашето фитнес пътуване от начало"
    },
  ];

  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selected !== null && 
        initialValueRef.current === null) {
      
      // Debug log
      console.log('BestShapeStep: Selection made, preparing to auto-advance', selected);
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        console.log('BestShapeStep: Auto-advancing to next step');
        handleNext(true);
      }, 1200); // Slightly longer delay for better UX
      
      return () => {
        console.log('BestShapeStep: Cleaning up timer');
        clearTimeout(timer);
      };
    }
  }, [selected, autoAdvance, handleNext]);
  
  const handleSelectOption = (value: string) => {
    console.log('BestShapeStep: Option selected:', value);
    onSelect(value);
    
    // Play selection sound if available
    try {
      const audio = new Audio('/sounds/select.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio play error:', error);
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="mb-20 relative pt-10">
        <motion.div 
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-orange rounded-full flex items-center justify-center shadow-lg ring-4 ring-orange/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Activity className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange to-orange"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          От колко време не си се занимавал/а активно с фитнес/ спортувал?
        </motion.h1>
        <motion.p 
          className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Вашата фитнес история ни помага да създадем персонализиран план, съобразен с вашето ниво на опит
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-950/70 dark:from-slate-900/70 dark:to-slate-950/70 -z-10 rounded-2xl opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div 
          className="grid grid-cols-1 gap-4 relative p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RadioGroup value={selected || ""} onValueChange={handleSelectOption}>
            {options.map((option, index) => {
              const Icon = option.icon;
              const isSelected = selected === option.id;
              
              return (
                <motion.div 
                  key={option.id} 
                  className={cn(
                    "option-card backdrop-blur-sm p-5 transition-all duration-300 rounded-xl cursor-pointer border relative overflow-hidden",
                    isSelected 
                      ? "border-orange bg-orange/5 transform scale-[1.02] shadow-lg" 
                      : "border-transparent hover:border-orange/30 bg-background/30 hover:bg-background/40"
                  )}
                  onClick={() => handleSelectOption(option.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSelected && (
                    <>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-orange/20 to-orange/10 z-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.div 
                        className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange to-orange"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                  
                  <div className="relative z-10 flex items-center space-x-4 w-full">
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id} 
                      className={cn(
                        "text-orange-500 border-2 transition-colors duration-300",
                        isSelected ? "border-orange-500" : "border-muted-foreground/30"
                      )}
                    />
                    
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                      isSelected 
                        ? "bg-orange text-white ring-4 ring-orange/20" 
                        : "bg-orange/10 text-orange"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <label htmlFor={option.id} className={cn(
                        "text-xl cursor-pointer font-medium transition-colors duration-300",
                        isSelected ? "text-orange" : "text-foreground"
                      )}>
                        {option.label}
                      </label>
                      <p className={cn(
                        "text-sm transition-colors duration-300",
                        isSelected ? "text-orange/80" : "text-muted-foreground"
                      )}>
                        {option.description}
                      </p>
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-8 h-8 bg-orange/10 rounded-full flex items-center justify-center mr-2 shadow-sm"
                      >
                        <BadgeCheck className="w-5 h-5 text-orange" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </RadioGroup>
        </motion.div>
      </div>
      
      {autoAdvance && selected !== null && initialValueRef.current === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <div className="px-6 py-2.5 bg-orange/10 text-orange text-sm font-medium inline-flex items-center shadow-sm rounded-full border border-orange/20">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

export default BestShapeStep;
