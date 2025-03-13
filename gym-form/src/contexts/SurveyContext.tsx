import React, { createContext, useContext } from "react";
import { SurveyContextType } from "@/types/survey";
import { 
  useSurveyForm, 
  useSurveyNavigation, 
  useSurveyAppState, 
  useSurveyQuotes,
  useSurveySubmit
} from "@/hooks";

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};

interface SurveyProviderProps {
  children: React.ReactNode;
  initialStep?: number;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children, initialStep }) => {
  // Updated to 32 steps with correct flow (including AllergiesStep)
  const totalSteps = 32;
  
  // Use our custom hooks
  const { formData, setFormData, updateFormData } = useSurveyForm();
  const { appState, setAppState, loadingProgress, setLoadingProgress, simulateLoading } = useSurveyAppState();
  const { generateQuote } = useSurveyQuotes();
  const { handleGetPlan } = useSurveySubmit(setAppState, setLoadingProgress);
  
  // Initialize navigation with form completion handler
  const handleSurveyComplete = () => {
    setAppState("loading");
    simulateLoading().then(() => {
      setAppState("results");
    });
  };
  
  const { 
    step, 
    setStep, 
    animationDirection, 
    setAnimationDirection, 
    handleNext, 
    handleBack 
  } = useSurveyNavigation(formData, totalSteps, handleSurveyComplete, initialStep);

  // Combine all our hook values into the context value
  const value: SurveyContextType = {
    formData,
    updateFormData,
    appState,
    setAppState,
    step,
    setStep,
    animationDirection,
    setAnimationDirection,
    loadingProgress,
    setLoadingProgress,
    handleNext,
    handleBack,
    handleGetPlan: () => handleGetPlan(formData),
    simulateLoading,
    totalSteps,
    setFormData,
    generateQuote
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};
