
import { Dispatch, SetStateAction } from "react";
import { AppState } from "@/types/survey";

export const simulateLoading = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  setLoadingProgress: Dispatch<SetStateAction<number>>
): Promise<void> => {
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
    
    // After 3 seconds (for better UX), complete the loading process more quickly
    setTimeout(() => {
      clearInterval(initialInterval);
      
      const finalInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(finalInterval);
            
            // Add a small delay before changing to the success state
            setTimeout(() => {
              setAppState("success");
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

// This function uses the webhook response to update the loading simulation
export const updateLoadingAfterWebhook = (
  success: boolean,
  setAppState: Dispatch<SetStateAction<AppState>>,
  setLoadingProgress: Dispatch<SetStateAction<number>>
): Promise<void> => {
  return new Promise((resolve) => {
    if (success) {
      // If webhook succeeded, complete the loading animation
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // Add a small delay before changing to the success state
            setTimeout(() => {
              setAppState("success");
              resolve();
            }, 500);
            
            return 100;
          }
          // Finish the loading quickly now that we have a response
          return Math.min(prev + 3, 100);
        });
      }, 50);
    } else {
      // If webhook failed, show error
      setAppState("results");
      resolve();
    }
  });
};
