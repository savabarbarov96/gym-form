
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
        className="mb-8"
      >
        <div className="text-3xl font-bold mb-12">Creating Your Workout Program</div>
        
        <div className="w-60 h-60 mx-auto relative mb-12">
          {/* Animated dumbbell icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="relative"
              animate={{ 
                rotate: 360 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear"
              }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((degree, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    rotate: degree,
                    transformOrigin: "0 -40px",
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity
                  }}
                >
                  <div 
                    className="w-8 h-8 bg-orange rounded-full -translate-x-1/2 -translate-y-1/2"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Pulsing center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-orange to-orange-600 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Text in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-2xl font-bold text-white">
              {loadingProgress}%
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto relative h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-orange"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
        </div>
        
        <div className="text-muted-foreground mt-8 text-lg">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tailoring your personalized workout plan...
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingState;
