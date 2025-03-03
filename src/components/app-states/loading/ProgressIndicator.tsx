
import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  loadingProgress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ loadingProgress }) => {
  // Generate dynamic gradient based on progress
  const gradientId = useMemo(() => `progress-gradient-${Math.random().toString(36).substring(2, 9)}`, []);
  
  return (
    <div className="w-60 h-60 mx-auto relative mb-12">
      {/* Circular progress track */}
      <div className="absolute inset-0 rounded-full border-8 border-secondary opacity-30"></div>
      
      {/* Animated progress */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        
        <motion.circle
          cx="50%"
          cy="50%"
          r="46%"
          fill="none"
          strokeWidth="8"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: loadingProgress / 100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="drop-shadow-md"
        />
      </svg>
      
      {/* Inner pulse effect */}
      <motion.div 
        className="absolute inset-3 bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-full"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />
      
      {/* Percentage display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange to-orange-600"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {Math.round(loadingProgress)}%
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
