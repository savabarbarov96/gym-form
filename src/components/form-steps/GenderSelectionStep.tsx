import React, { useEffect, useRef, useState } from 'react';
import { User, Users, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSurvey } from '@/contexts/SurveyContext';
import { motion, AnimatePresence } from 'framer-motion';

interface GenderSelectionStepProps {
  selectedGender: string | null;
  onSelect: (gender: string) => void;
  autoAdvance?: boolean;
}

const GenderSelectionStep: React.FC<GenderSelectionStepProps> = ({ 
  selectedGender, 
  onSelect,
  autoAdvance = true
}) => {
  const { handleNext } = useSurvey();
  const [isAdvancing, setIsAdvancing] = useState(false);
  const initialValueRef = useRef<string | null>(selectedGender);
  const timerRef = useRef<number | null>(null);
  
  const genderOptions = [
    { 
      id: 'male', 
      label: 'Мъж', 
      icon: User,
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
      description: 'План за мъже'
    },
    { 
      id: 'female', 
      label: 'Жена', 
      icon: Users,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
      description: 'План за жени'
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
  
  // Handle auto-advance logic
  useEffect(() => {
    // Skip if auto-advance is disabled or if we're already advancing
    if (!autoAdvance || isAdvancing) return;
    
    // Only advance if this is a new selection (not returning to a previous step)
    if (selectedGender !== null && initialValueRef.current === null) {
      console.log(`GenderSelectionStep: Selected ${selectedGender}, setting up auto-advance`);
      
      // Play the selection sound
      try {
        const audio = new Audio('/assets/sounds/click.mp3');
        audio.volume = 0.3;
        audio.play().catch(error => {
          console.log('Error playing sound:', error);
        });
      } catch (error) {
        console.log('Error creating audio instance:', error);
      }
      
      // Set advancing state to prevent multiple advances
      setIsAdvancing(true);
      
      // Set a timeout to advance after a delay
      timerRef.current = window.setTimeout(() => {
        console.log('GenderSelectionStep: Auto-advancing to next step');
        handleNext(true);
        timerRef.current = null;
      }, 1500);
    }
  }, [selectedGender, autoAdvance, handleNext, isAdvancing]);

  const handleSelectGender = (gender: string) => {
    // Don't allow changes if we're already in the process of advancing
    if (isAdvancing) {
      console.log('GenderSelectionStep: Already advancing, ignoring selection');
      return;
    }
    
    console.log('GenderSelectionStep: Selected gender:', gender);
    onSelect(gender);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent"
      >
        Какъв е Вашият пол?
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto"
      >
        Това ни помага да адаптираме Вашия план за фитнес и хранене според специфичните Ви нужди
      </motion.p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
        {genderOptions.map((option, index) => {
          const Icon = option.icon;
          const isSelected = selectedGender === option.id;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectGender(option.id)}
              className={cn(
                "rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all",
                isSelected ? "ring-4 ring-orange" : "hover:shadow-xl"
              )}
            >
              <div 
                className="h-48 bg-cover bg-center relative" 
                style={{ backgroundImage: `url(${option.image})` }}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute top-4 right-4">
                    <motion.div 
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        isSelected ? "bg-orange text-white" : "bg-white/90 text-orange"
                      )}
                      animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={24} />
                    </motion.div>
                  </div>
                </div>
                
                {isSelected && (
                  <motion.div 
                    className="absolute top-4 right-20 bg-orange text-white rounded-full p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <CheckCircle size={20} />
                    </motion.div>
                  </motion.div>
                )}
              </div>
              
              <div className="p-4 bg-card">
                <div className={cn(
                  "text-2xl font-bold mb-2",
                  isSelected ? "text-orange" : ""
                )}>
                  {option.label}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                <div className={cn(
                  "py-2 px-4 rounded-md text-sm font-medium transition-colors text-center",
                  isSelected 
                    ? "bg-orange text-white" 
                    : "bg-orange/10 text-orange"
                )}>
                  {isSelected ? "Избрано" : "Изберете"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
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

export default GenderSelectionStep;
