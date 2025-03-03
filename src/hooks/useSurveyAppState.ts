
import { useState } from "react";
import { AppState } from "@/types/survey";

export const useSurveyAppState = () => {
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Modified to return a Promise that resolves when loading is complete
  const simulateLoading = (): Promise<void> => {
    return new Promise((resolve) => {
      setAppState("loading");
      setLoadingProgress(0);
      
      // Start a slow continuous loading animation right away
      const initialInterval = setInterval(() => {
        setLoadingProgress(prev => {
          // Only go up to 70% while waiting for webhook response
          if (prev < 70) {
            return prev + 0.5;
          }
          return prev;
        });
      }, 100);
      
      // After 3 seconds (or when webhook would typically respond),
      // complete the loading process more quickly
      setTimeout(() => {
        clearInterval(initialInterval);
        
        const finalInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 100) {
              clearInterval(finalInterval);
              
              // Add a small delay before resolving the promise
              setTimeout(() => {
                resolve();
              }, 500);
              
              return 100;
            }
            // Increase by larger increments to finish quickly
            return Math.min(prev + 2, 100);
          });
        }, 80);
      }, 3000); // Reduced from 25000 for better user experience
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
