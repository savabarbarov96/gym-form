
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { HeightInfoTooltip } from "./HeightInfoTooltip";

export const HeightInputHeader: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <>
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What's your height?
      </motion.h1>
      
      <div className="relative inline-block">
        <motion.button
          type="button"
          onClick={() => setShowInfo(!showInfo)}
          className="text-muted-foreground mb-8 flex items-center mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Info size={16} className="mr-1" />
          <span>This information helps us calculate your BMI</span>
        </motion.button>
        
        {showInfo && <HeightInfoTooltip />}
      </div>
    </>
  );
};
