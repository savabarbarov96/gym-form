import React, { createContext, useContext, useState } from "react";
import { submitToWebhook } from "@/components/WebhookService";
import { useToast } from "@/components/ui/use-toast";
import { AppState, FormData, SurveyContextType } from "@/types/survey";
import { validateStep } from "@/utils/surveyValidation";
import { simulateLoading } from "@/utils/loadingSimulation";

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState("next");
  const [formData, setFormData] = useState<FormData>({
    age: null,
    bodyType: null,
    goal: 20,
    fitnessGoal: null,
    desiredBody: null,
    problemAreas: [],
    bestShapeTime: null,
    weightChange: null,
    activities: [],
    healthConcerns: [],
    workoutLocation: null,
    workoutIntensity: null,
    workoutFrequency: null,
    workoutDuration: null,
    height: null,
    currentWeight: null,
    targetWeight: null,
    weightUnit: "kg",
    exercisePreferences: {},
  });
  
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const totalSteps = 19; // Updated total steps to include the two new steps
  
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };
  
  const handleSimulateLoading = () => {
    simulateLoading(setAppState, setLoadingProgress);
  };

  const handleNext = () => {
    // Validate current step
    if (!validateStep(step, formData, toast)) {
      return;
    }
    
    if (step < totalSteps) {
      setAnimationDirection("next");
      setStep(prev => prev + 1);
    } else {
      toast({
        title: "Processing your plan",
        description: "We're creating your personalized fitness plan",
      });
      
      console.log("Form submitted:", formData);
      
      submitToWebhook(formData).then(() => {
        handleSimulateLoading();
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setAnimationDirection("back");
      setStep(prev => prev - 1);
    }
  };
  
  const handleGetPlan = () => {
    toast({
      title: "Creating your plan",
      description: "We're generating your personalized workout plan",
    });
    
    document.querySelector('.results-container')?.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(20px)' }
      ],
      { duration: 300, easing: 'ease-out' }
    );
    
    setAppState("loading");
    setLoadingProgress(0);
    
    submitToWebhook(formData).then((success) => {
      if (success) {
        handleSimulateLoading();
      } else {
        toast({
          title: "Error",
          description: "There was an error generating your plan",
          variant: "destructive",
        });
        setAppState("results");
      }
    });
  };

  const value = {
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
    handleGetPlan,
    simulateLoading: handleSimulateLoading,
    totalSteps,
    setFormData
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};
