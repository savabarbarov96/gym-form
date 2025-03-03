
import { validateBasicInfoStep } from './basicInfoValidation';
import { validateBodyAssessmentStep } from './bodyAssessmentValidation';
import { validateWorkoutPreferencesStep } from './workoutPreferencesValidation';
import { validateLifestyleStep } from './lifestyleValidation';
import { validateFinalStepsStep } from './finalStepsValidation';
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  // Basic info steps (1-5)
  if (step >= 1 && step <= 5) {
    return validateBasicInfoStep(step, formData, toast);
  }
  
  // Body assessment steps (6-11)
  if (step >= 6 && step <= 11) {
    return validateBodyAssessmentStep(step, formData, toast);
  }
  
  // Workout preferences steps (12-19)
  if (step >= 12 && step <= 19) {
    return validateWorkoutPreferencesStep(step, formData, toast);
  }
  
  // Lifestyle steps (20-24)
  if (step >= 20 && step <= 24) {
    return validateLifestyleStep(step, formData, toast);
  }
  
  // Final steps (25-29)
  if (step >= 25 && step <= 29) {
    return validateFinalStepsStep(step, formData, toast);
  }
  
  return true;
};

export * from './basicInfoValidation';
export * from './bodyAssessmentValidation';
export * from './workoutPreferencesValidation';
export * from './lifestyleValidation';
export * from './finalStepsValidation';
