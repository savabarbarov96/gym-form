import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PricingOptions } from './PricingOptions';
import { ChefHat, Heart, Dumbbell, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ResultsStateProps {
  onRestart: () => void;
}

export const ResultsState: React.FC<ResultsStateProps> = ({ onRestart }) => {
  const navigate = useNavigate();
  const [showPricing, setShowPricing] = useState(false);
  
  const getRecommendations = () => {
    setShowPricing(true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full max-w-4xl mx-auto py-8 px-4 rounded-2xl"
    >
      {/* Results display */}
      {!showPricing ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-orange to-orange-600 rounded-full mb-4">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Получете Вашия персонализиран план</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              Въз основа на отговорите Ви, можем да създадем персонализиран план, специално за Вашите цели и предпочитания.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-orange/5 p-5 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-orange/10 rounded-full mb-3">
                <ChefHat className="h-6 w-6 text-orange" />
              </div>
              <h3 className="font-semibold mb-2">Хранителен режим</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Персонализиран хранителен план, съобразен с Вашите цели и предпочитания.</p>
            </div>
            
            <div className="bg-orange/5 p-5 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-orange/10 rounded-full mb-3">
                <Dumbbell className="h-6 w-6 text-orange" />
              </div>
              <h3 className="font-semibold mb-2">Тренировъчен план</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Тренировъчна програма, съобразена с Вашите цели, опит и наличното оборудване.</p>
            </div>
            
            <div className="bg-orange/5 p-5 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-orange/10 rounded-full mb-3">
                <Heart className="h-6 w-6 text-orange" />
              </div>
              <h3 className="font-semibold mb-2">Проследяване на прогреса</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Насоки за оптимални резултати и начини за проследяване на Вашия прогрес.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              variant="default"
              className="bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange shadow-lg"
              size="lg"
              onClick={getRecommendations}
            >
              Получете Вашия план
            </Button>
            
            <Button
              variant="outline"
              className="border-orange text-orange hover:text-orange-600 hover:border-orange-600"
              size="lg"
              onClick={onRestart}
            >
              Започнете отначало
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="relative">
          <div className="absolute right-4 top-2 z-10">
            <button 
              onClick={() => setShowPricing(false)}
              className="rounded-full p-2 bg-white/80 shadow-md hover:bg-gray-100/90 transition-colors text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <PricingOptions />
        </div>
      )}
    </motion.div>
  );
}; 