
import React, { createContext, useContext, useState } from "react";
import { submitToWebhook, FormData } from "@/components/WebhookService";
import { useToast } from "@/components/ui/use-toast";

type AppState = "form" | "loading" | "results";

interface SurveyContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  animationDirection: string;
  setAnimationDirection: React.Dispatch<React.SetStateAction<string>>;
  loadingProgress: number;
  setLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handleBack: () => void;
  handleGetPlan: () => void;
  simulateLoading: () => void;
  totalSteps: number;
}

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
  });
  
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const totalSteps = 11;
  
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };
  
  const simulateLoading = () => {
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

  const handleNext = () => {
    if (step === 1 && !formData.age) {
      toast({
        title: "Selection required",
        description: "Please select your age group to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !formData.bodyType) {
      toast({
        title: "Selection required",
        description: "Please select your body type to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 4 && !formData.fitnessGoal) {
      toast({
        title: "Selection required",
        description: "Please select your fitness goal to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 5 && !formData.desiredBody) {
      toast({
        title: "Selection required",
        description: "Please select your desired body to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 7 && !formData.bestShapeTime) {
      toast({
        title: "Selection required",
        description: "Please select when you were in your best shape to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 8 && !formData.weightChange) {
      toast({
        title: "Selection required",
        description: "Please select how your weight typically changes to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 9 && formData.activities.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one activity or 'None of the above' to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 11 && formData.healthConcerns.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select a health concern or 'None of the above' to continue",
        variant: "destructive",
      });
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
        simulateLoading();
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
        simulateLoading();
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
    simulateLoading,
    totalSteps
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};
