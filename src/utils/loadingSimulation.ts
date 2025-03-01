
import { Dispatch, SetStateAction } from "react";
import { AppState } from "@/types/survey";

export const simulateLoading = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  setLoadingProgress: Dispatch<SetStateAction<number>>
) => {
  setAppState("loading");
  setLoadingProgress(0);
  
  const increment = 100 / 40;
  let currentProgress = 0;
  
  const interval = setInterval(() => {
    currentProgress += increment;
    setLoadingProgress(Math.min(Math.round(currentProgress), 100));
    
    if (currentProgress >= 100) {
      clearInterval(interval);
      setAppState("results");
    }
  }, 200);
};
