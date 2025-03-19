import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  step?: number;
  totalSteps?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  step = 0, 
  totalSteps = 32 
}) => {
  const [prevProgress, setPrevProgress] = useState(progress);

  // Steps to show in the progress bar (will be dynamically calculated)
  const stepMarkers = Array.from({ length: 5 }, (_, i) => {
    const position = Math.floor((i + 1) * (totalSteps / 6));
    return position;
  });

  // Calculate if a step marker is active or completed
  const isStepActive = (markerStep: number) => {
    return step >= markerStep;
  };

  useEffect(() => {
    // Store previous progress for animation
    setPrevProgress(progress);
  }, [progress]);

  return (
    <div className="w-full mb-6 px-4 sm:px-6">
      {/* Top progress bar */}
      <div className="relative w-full h-2 bg-secondary/30 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-hover to-orange rounded-full"
          initial={{ width: `${prevProgress}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1]
          }}
        />
        
        {/* Step markers */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-[2%]">
          {stepMarkers.map((markerStep, index) => (
            <div 
              key={index}
              className="relative"
            >
              <motion.div 
                className={cn(
                  "w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 shadow-md flex items-center justify-center z-10",
                  isStepActive(markerStep)
                    ? "border-orange bg-orange/20" 
                    : "border-secondary-foreground/30 bg-secondary/50"
                )}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ 
                  scale: isStepActive(markerStep) ? 1 : 0.8,
                  opacity: isStepActive(markerStep) ? 1 : 0.6
                }}
                transition={{ duration: 0.3 }}
              >
                {isStepActive(markerStep) && (
                  <motion.div 
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      delay: 0.1
                    }}
                  />
                )}
              </motion.div>
              
              {/* Step label (visible on larger screens) */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
                <motion.span 
                  className={cn(
                    "text-xs whitespace-nowrap",
                    isStepActive(markerStep) 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  )}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: isStepActive(markerStep) ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  Стъпка {markerStep}
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current step indicator (visible on all screens) */}
      <div className="flex justify-between mt-5">
        <motion.div 
          className="text-sm font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          key={step} // Re-trigger animation when step changes
          transition={{ duration: 0.3 }}
        >
          Стъпка {step} от {totalSteps}
        </motion.div>
        <motion.div 
          className="text-sm font-medium text-orange"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          key={`${progress}-pct`} // Re-trigger animation when progress changes
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
