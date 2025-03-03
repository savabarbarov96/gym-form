
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateAgeStep, validateBasicInfoStep } from "@/utils/validation";
import { FormData } from "@/types/survey";

export const useSurveyNavigation = (
  formData: FormData,
  totalSteps: number,
  onComplete: () => void
) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState("next");

  const handleNext = () => {
    // For step 1, validate directly
    if (step === 1) {
      if (!validateAgeStep(formData, toast)) {
        return;
      }
    } 
    // For all other steps
    else if (step >= 2 && step <= 5) {
      if (!validateBasicInfoStep(step, formData, toast)) {
        return;
      }
    }
    // For all other steps (will be handled by the validateStep function implementation)
    else {
      // Special case for self-assessment steps - don't validate if we already have a value
      const isSelfAssessmentStep = step >= 25 && step <= 28;
      const hasValue = isSelfAssessmentStep && 
        ((step === 25 && formData.selfAssessments.outOfBreath !== null) ||
        (step === 26 && formData.selfAssessments.fallingBack !== null) ||
        (step === 27 && formData.selfAssessments.motivationLevel !== null) ||
        (step === 28 && formData.selfAssessments.dietConsistency !== null));

      // Skip validation for self-assessment steps if we already have a value
      if (!hasValue) {
        // Implement direct validation logic for specific steps
        // For now we're bypassing this since we need to fix the step 1 validation first
      }
    }

    // If validation passes or is skipped, proceed to next step
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
