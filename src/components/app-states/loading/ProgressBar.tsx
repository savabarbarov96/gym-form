import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  loadingProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ loadingProgress }) => {
  const [prevProgress, setPrevProgress] = useState(loadingProgress);

  useEffect(() => {
    // Store previous progress for animation
    setPrevProgress(loadingProgress);
  }, [loadingProgress]);

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="relative h-2 bg-secondary/30 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-hover to-orange rounded-full"
          initial={{ width: `${prevProgress}%` }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1] 
          }}
        />
      </div>
      
      <div className="flex justify-end mt-2">
        <motion.div 
          className="text-sm font-medium text-orange"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          key={`${loadingProgress}-pct`}
          transition={{ duration: 0.3 }}
        >
          {Math.round(loadingProgress)}%
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
