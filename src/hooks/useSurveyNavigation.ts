
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { validateStep } from "@/utils/surveyValidation";
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
    // Special case for self-assessment steps - don't validate if we already have a value
    const isSelfAssessmentStep = step >= 25 && step <= 27;
    const hasValue = isSelfAssessmentStep && 
      ((step === 25 && formData.selfAssessments.outOfBreath !== null) ||
       (step === 26 && formData.selfAssessments.fallingBack !== null) ||
       (step === 27 && formData.selfAssessments.motivationLevel !== null));

    // Skip validation for self-assessment steps if we already have a value
    if (hasValue || validateStep(step, formData, toast)) {
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
