
import { Dispatch, SetStateAction } from "react";
import { AppState } from "@/types/survey";

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
