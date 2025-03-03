
import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateHealthConcernsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // Health concerns are optional, but if a custom option is being added, it should not be empty
  if (formData.healthConcerns.length === 0 && formData.customHealthConcern === null) {
    // This is valid - user has no health concerns
    return true;
  }
  
  // If there's at least one health concern or a valid custom concern, it's valid
  if (formData.healthConcerns.length > 0 || (formData.customHealthConcern && formData.customHealthConcern.trim() !== '')) {
    return true;
  }
  
  toast({
    title: "Health Concerns Selection Required",
    description: "Please select at least one health concern or choose 'None of the above'",
    variant: "destructive",
  });
  
  return false;
};

export const validateProblemAreasStep = (): boolean => {
  // Problem areas are optional
  return true;
};

export const validateBestShapeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.bestShapeTime) {
    toast({
      title: "Best Shape Time Selection Required",
      description: "Please select when you were in your best shape",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWeightChangeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.weightChange) {
    toast({
      title: "Weight Change Pattern Required",
      description: "Please select how your weight typically changes",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateActivitiesStep = (): boolean => {
  // Activities are optional
  return true;
};

export const validateProgressGraphStep = (): boolean => {
  // This is an informational step
  return true;
};

export const validateHeightInputStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.height) {
    toast({
      title: "Height Required",
      description: "Please enter your height",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWeightInputStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.currentWeight) {
    toast({
      title: "Weight Required",
      description: "Please enter your weight",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

// Main validation function for this module
export const validateBodyAssessmentStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  console.log(`Validating body assessment step ${step}`);
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 6:
      return validateHeightInputStep(formData, toast);
    case 7:
      return validateWeightInputStep(formData, toast);
    case 8:
      return validateBestShapeStep(formData, toast);
    case 9:
      return validateWeightChangeStep(formData, toast);
    case 10:
      return validateProgressGraphStep();
    case 11:
      return true; // Hormone graph step doesn't need validation
    case 12:
      return validateHealthConcernsStep(formData, toast);
    default:
      console.log(`No specific validation for body assessment step ${step}`);
      return true;
  }
};
