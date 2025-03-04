
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
        Body Mass Index (BMI) is a value derived from your height and weight. 
        It helps us tailor workout plans that are appropriate for your body composition.
      </p>
    </motion.div>
  );
};
