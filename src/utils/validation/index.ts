
import { ToastParams } from "@/hooks/use-toast";
import { validateStep as validateBasicInfoStep } from "./basicInfoValidation";
import { validateStep as validateBodyAssessmentStep } from "./bodyAssessmentValidation";
import { validateStep as validateWorkoutPreferencesStep } from "./workoutPreferencesValidation";
import { validateStep as validateLifestyleStep } from "./lifestyleValidation";
import { validateStep as validateFinalStepsStep } from "./finalStepsValidation";
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
  // Determine which validation module to use based on the step range
  if (step >= 1 && step <= 5) {
    return validateBasicInfoStep(step, formData, toast);
  }
  
  if (step >= 6 && step <= 12) {
    return validateBodyAssessmentStep(step, formData, toast);
  }
  
  if (step >= 13 && step <= 20) {
    return validateWorkoutPreferencesStep(step, formData, toast);
  }
  
  if (step >= 21 && step <= 24) {
    return validateLifestyleStep(step, formData, toast);
  }
  
  if (step >= 25 && step <= 29) {
    return validateFinalStepsStep(step, formData, toast);
  }
  
  // Default to true if no validation is needed for this step
  return true;
};
