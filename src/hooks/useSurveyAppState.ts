import { useState } from "react";
import { AppState } from "@/types/survey";

export const useSurveyAppState = () => {
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Modified to take exactly 90 seconds to complete
  const simulateLoading = (): Promise<void> => {
    return new Promise((resolve) => {
      setAppState("loading");
      setLoadingProgress(0);
      
      // Calculate how often we need to increment to reach 100% in 90 seconds
      // 90 seconds = 90000ms
      // If we want 100 increments (0-100%), each increment should happen every 900ms
      const totalTimeMs = 90000; // 90 seconds in milliseconds
      const incrementsTotal = 100; // Total number of increments
      const incrementDelay = totalTimeMs / incrementsTotal; // Time between increments
      
      const loadingInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(loadingInterval);
            
            // Add a small delay before resolving the promise
            setTimeout(() => {
              resolve();
            }, 500);
            
            return 100;
          }
          
          // Increase by 1% each time
          return prev + 1;
        });
      }, incrementDelay);
    });
  };

  return {
    appState,
    setAppState,
    loadingProgress,
    setLoadingProgress,
    simulateLoading
  };
};
