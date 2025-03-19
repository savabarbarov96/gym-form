import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateHeightStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.height) {
    toast({
      title: "Необходима е информация",
      description: "Моля, въведете вашата височина",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateWeightStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.currentWeight) {
    toast({
      title: "Необходима е информация",
      description: "Моля, въведете вашето текущо тегло",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateBestShapeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.bestShapeTime) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете кога сте били в най-добра форма",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateWeightChangeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.weightChange) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете как обикновено се променя теглото ви",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateProgressGraphStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // This is an informational step, no validation needed
  return true;
};

export const validateHormoneGraphStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // This is an informational step, no validation needed
  return true;
};

export const validateHealthConcernsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // Health concerns can be empty if the user has no concerns
  return true;
};

export const validateAllergiesStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // Allergies can be empty if the user has no allergies
  return true;
};

export const validateBodyAssessmentStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  console.log(`Validating body assessment step ${step}`);
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 6:
      return validateHeightStep(formData, toast);
    case 7:
      return validateWeightStep(formData, toast);
    case 8:
      return validateBestShapeStep(formData, toast);
    case 9:
      return validateWeightChangeStep(formData, toast);
    case 10:
      return validateProgressGraphStep(formData, toast);
    case 11:
      return validateHormoneGraphStep(formData, toast);
    case 12:
      return validateHealthConcernsStep(formData, toast);
    case 13:
      return validateAllergiesStep(formData, toast);
    default:
      console.log(`No specific validation for body assessment step ${step}`);
      return true;
  }
}; 