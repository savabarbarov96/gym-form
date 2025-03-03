import { ToastParams } from "@/hooks/use-toast";
import { validateBasicInfoStep } from "./basicInfoValidation";
import { validateBodyAssessmentStep } from "./bodyAssessmentValidation";
import { validateWorkoutPreferencesStep } from "./workoutPreferencesValidation";
import { validateLifestyleStep } from "./lifestyleValidation";
import { validateFinalStepsStep } from "./finalStepsValidation";
import { FormData } from "@/types/survey";

/**
 * Common validation function that delegates to the correct validation module
 * based on the current step number
 */
export const validateStep = (
  step: number, 
  formData: FormData, 
  toast: (props: ToastParams) => void
): boolean => {
  // Keep track of validation result
  let isValid = true;
  
  // Determine which validation module to use based on the step range
  if (step >= 1 && step <= 5) {
    isValid = validateBasicInfoStep(step, formData, toast);
  }
  
  else if (step >= 6 && step <= 12) {
    isValid = validateBodyAssessmentStep(step, formData, toast);
  }
  
  else if (step >= 13 && step <= 20) {
    isValid = validateWorkoutPreferencesStep(step, formData, toast);
  }
  
  else if (step >= 21 && step <= 24) {
    isValid = validateLifestyleStep(step, formData, toast);
  }
  
  else if (step >= 25 && step <= 29) {
    isValid = validateFinalStepsStep(step, formData, toast);
  }
  
  return isValid;
};
