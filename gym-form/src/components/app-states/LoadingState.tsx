import React from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  loadingProgress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingProgress }) => {
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
          Моля, изчакайте докато анализираме Вашите отговори и създадем персонализирана програма
        </p>
      </motion.div>

      <div className="w-full mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>Прогрес</span>
          <span>{Math.round(loadingProgress)}%</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange"
            initial={{ width: '0%' }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.5 }}
          />
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
        <p className="text-sm">
          Създаваме персонализирана програма, базирана на Вашите цели и предпочитания
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingState;
