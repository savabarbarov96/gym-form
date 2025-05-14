import React, { useState, useEffect } from 'react';
import { LoadingState } from './';
import SuccessState from './SuccessState';

const SuccessWithLoading: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading process - optimized for approximately 45 second loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      // Optimized parameters for a ~45 second loading time
      // For 45 seconds with average increment of ~0.6% we need:
      // 100% / 0.6% = ~167 increments
      // 45 seconds / 167 increments = ~270ms per increment
      
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          // Larger increments adjusted for 45 second timing
          let increment;
          
          if (prev < 30) {
            // Start a bit faster (first 30%)
            increment = 0.8; // Adjusted for 45s
          } else if (prev < 60) {
            // Middle section (30-60%)
            increment = 0.6; // Adjusted for 45s
          } else if (prev < 85) {
            // Slow down (60-85%)
            increment = 0.5; // Adjusted for 45s
          } else if (prev < 95) {
            // Even slower (85-95%)
            increment = 0.4; // Adjusted for 45s
          } else {
            // Very slow at the end (95-100%)
            increment = 0.2; // Adjusted for 45s
          }
          
          // Add small random variation to make it look more natural
          increment += Math.random() * 0.2; // Slight variation
          
          const nextProgress = Math.min(prev + increment, 100);
          
          // When we reach 100, set loading to complete after a small delay
          if (nextProgress === 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 500); // Short delay at 100%
          }
          
          return nextProgress;
        });
      }, 135); // Adjusted to ~135ms for approximately 45 seconds total
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