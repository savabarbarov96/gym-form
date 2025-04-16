import React, { useState, useEffect } from 'react';
import { LoadingState } from './';
import SuccessState from './SuccessState';

const SuccessWithLoading: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading process
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      // Calculate parameters for a ~90 second loading time
      // For 90 seconds with average increment of ~0.3% we need:
      // 100% / 0.3% = ~333 increments
      // 90 seconds / 333 increments = ~270ms per increment
      
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          // Much smaller increments to stretch out the loading time
          // Vary the increments to make it look more natural
          let increment;
          
          if (prev < 30) {
            // Start a bit faster (first 30%)
            increment = 0.4;
          } else if (prev < 60) {
            // Middle section (30-60%)
            increment = 0.3;
          } else if (prev < 85) {
            // Slow down (60-85%)
            increment = 0.25;
          } else if (prev < 95) {
            // Even slower (85-95%)
            increment = 0.2;
          } else {
            // Very slow at the end (95-100%)
            increment = 0.1;
          }
          
          // Add small random variation to make it look more natural
          increment += Math.random() * 0.1;
          
          const nextProgress = Math.min(prev + increment, 100);
          
          // When we reach 100, set loading to complete after a small delay
          if (nextProgress === 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 1000); // Short delay at 100% before showing success
          }
          
          return nextProgress;
        });
      }, 270); // Update every 270ms for approximately 90 seconds total
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  // Show the appropriate component based on loading state with improved styling
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="w-full max-w-4xl">
        {isLoading ? <LoadingState loadingProgress={loadingProgress} /> : <SuccessState />}
      </div>
    </div>
  );
};

export default SuccessWithLoading; 