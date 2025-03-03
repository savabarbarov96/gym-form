
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateStep, clearValidationErrorForStep } from "@/utils/validation";
import { FormData } from "@/types/survey";

export const useSurveyNavigation = (
  formData: FormData,
  totalSteps: number,
  onComplete: () => void
) => {
  const { toast, dismiss } = useToast();
  const [step, setStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState("next");
  
  // Clear validation errors when changing steps
  useEffect(() => {
    // Clear validation errors for the previous step when moving to a new step
    return () => {
      clearValidationErrorForStep(step);
    };
  }, [step]);

  const handleNext = () => {
    // Dismiss any existing toasts when attempting to navigate
    dismiss();
    
    // Validate the current step using our unified validation system
    if (!validateStep(step, formData, toast)) {
      console.log(`Validation failed for step ${step}`);
      return;
    }

    console.log(`Validation passed for step ${step}, proceeding to next step`);
    
    // If validation passes, proceed to next step
    if (step < totalSteps) {
      setAnimationDirection("next");
      setStep(prev => prev + 1);
    } else {
      toast({
        title: "Processing your plan",
        description: "We're creating your personalized fitness plan",
      });
      
      onComplete();
    }
  };

  const handleBack = () => {
    // Dismiss any existing toasts when navigating back
    dismiss();
    
    if (step > 1) {
      setAnimationDirection("back");
      setStep(prev => prev - 1);
    }
  };

  return {
    step,
    setStep,
    animationDirection,
    setAnimationDirection,
    handleNext,
    handleBack
  };
};
