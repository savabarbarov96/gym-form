
import { useState } from "react";
import { AppState } from "@/types/survey";
import { simulateLoading as simulateLoadingUtil } from "@/utils/loadingSimulation";

export const useSurveyAppState = () => {
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const simulateLoading = () => {
    simulateLoadingUtil(setAppState, setLoadingProgress);
  };

  return {
    appState,
    setAppState,
    loadingProgress,
    setLoadingProgress,
    simulateLoading
  };
};
