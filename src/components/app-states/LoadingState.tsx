
import React from "react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  loadingProgress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingProgress }) => {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-16"
      >
        <div className="text-2xl mb-12">Suggesting workout program</div>
        
        <div className="w-32 h-32 mx-auto relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="stroke-secondary" 
              strokeWidth="8" 
              fill="transparent" 
              r="46" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className="stroke-orange" 
              strokeWidth="8" 
              fill="transparent" 
              r="46" 
              cx="50" 
              cy="50" 
              strokeDasharray="289.03px" 
              strokeDashoffset={289.03 - (289.03 * loadingProgress) / 100} 
              strokeLinecap="round" 
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
            {loadingProgress}%
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingState;
