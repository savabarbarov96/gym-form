
import { Dispatch, SetStateAction } from "react";
import { AppState } from "@/types/survey";

export const simulateLoading = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  setLoadingProgress: Dispatch<SetStateAction<number>>
) => {
  setAppState("loading");
  setLoadingProgress(0);
  
  // Start a slow continuous loading animation right away
  // This will show progress even while waiting for the webhook
  const initialInterval = setInterval(() => {
    setLoadingProgress(prev => {
      // Only go up to 70% while waiting for webhook response
      if (prev < 70) {
        return prev + 0.5;
      }
      return prev;
    });
  }, 100);
  
  // After 25 seconds (or when webhook would typically respond),
  // complete the loading process more quickly
  setTimeout(() => {
    clearInterval(initialInterval);
    
    const finalInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(finalInterval);
          
          // Add a small delay before changing to the success state
          setTimeout(() => {
            setAppState("success");
          }, 500);
          
          return 100;
        }
        // Increase by larger increments to finish quickly
        return Math.min(prev + 2, 100);
      });
    }, 80);
  }, 25000);
};

// This function uses the webhook response to update the loading simulation
export const updateLoadingAfterWebhook = (
  success: boolean,
  setAppState: Dispatch<SetStateAction<AppState>>,
  setLoadingProgress: Dispatch<SetStateAction<number>>
) => {
  if (success) {
    // If webhook succeeded, complete the loading animation
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Add a small delay before changing to the success state
          setTimeout(() => {
            setAppState("success");
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
  }
};
