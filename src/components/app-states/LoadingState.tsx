import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  loadingProgress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingProgress }) => {
  // For smooth animation of progress
  const [displayedProgress, setDisplayedProgress] = useState(0);
  // For additional loading messages
  const [loadingMessage, setLoadingMessage] = useState<string>('Анализираме Вашите отговори...');

  // Smooth out progress changes
  useEffect(() => {
    // Smoothly animate to the actual progress
    const animationDuration = 800; // ms
    const startTime = Date.now();
    const startProgress = displayedProgress;
    const endProgress = loadingProgress;
    
    const animateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Easing function for smooth progress
      const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
      const easedProgress = easeOutCubic(progress);
      
      const newProgress = startProgress + (endProgress - startProgress) * easedProgress;
      setDisplayedProgress(newProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);
  }, [loadingProgress]);

  // Change the loading message based on progress
  useEffect(() => {
    const messages = [
      { threshold: 0, message: 'Анализираме Вашите отговори...' },
      { threshold: 15, message: 'Изчисляваме Вашите нужди от калории...' },
      { threshold: 30, message: 'Съобразяваме хранителния режим с предпочитанията Ви...' },
      { threshold: 45, message: 'Създаваме персонализирани тренировки...' },
      { threshold: 60, message: 'Оптимизираме интензивността на упражненията...' },
      { threshold: 75, message: 'Съставяме Вашия седмичен план...' },
      { threshold: 85, message: 'Това е примерен текст за демонстрация...' },
      { threshold: 90, message: 'Генерираме Вашата персонализирана програма...' },
      { threshold: 98, message: 'Приключваме и подготвяме за изпращане...' }
    ];
    
    // Find the highest threshold that our progress has passed
    const relevantMessage = messages
      .filter(item => displayedProgress >= item.threshold)
      .pop();
      
    if (relevantMessage) {
      setLoadingMessage(relevantMessage.message);
    }
  }, [displayedProgress]);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Създаваме Вашата Тренировъчна Програма</h2>
        <p className="text-muted-foreground">
          Моля, изчакайте докато персонализираме вашия план. Готови сме след момент!
        </p>
      </motion.div>

      <div className="w-full mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>Прогрес</span>
          <span>{Math.round(displayedProgress)}%</span>
        </div>
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden relative">
          {/* Main progress bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange"
            initial={{ width: '0%' }}
            animate={{ width: `${displayedProgress}%` }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Animated pulse effect inside the progress bar */}
          {displayedProgress < 100 && (
            <motion.div 
              className="absolute top-0 h-full bg-white opacity-30 w-20"
              animate={{ 
                x: ['0%', '100%'],
                opacity: [0, 0.3, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut",
              }}
              style={{ 
                width: '20%',
                left: `-20%`
              }}
            />
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-muted-foreground"
      >
        <div className="flex items-center justify-center mb-4">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Моля, изчакайте...</span>
        </div>
        
        <motion.p 
          key={loadingMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium mb-3"
        >
          {loadingMessage}
        </motion.p>
        
        <p className="text-sm">
          Създаваме персонализирана програма, базирана на Вашите цели и предпочитания. Процесът ще приключи скоро.
        </p>
        
        {/* Visual elements to create a more "active" loading state */}
        <div className="mt-8 flex justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 mx-1 bg-orange rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingState;
