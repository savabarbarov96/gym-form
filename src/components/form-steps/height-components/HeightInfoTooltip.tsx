import React from "react";
import { motion } from "framer-motion";

export const HeightInfoTooltip: React.FC = () => {
  return (
    <motion.div 
      className="absolute z-10 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg w-72 text-left"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <p className="text-sm">
        Индексът на телесната маса (BMI) е стойност, получена от Вашата височина и тегло. 
        Това ни помага да изготвим тренировъчни планове, които са подходящи за Вашата телесна композиция.
      </p>
    </motion.div>
  );
};
