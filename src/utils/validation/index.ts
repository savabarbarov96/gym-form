
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
  
  // Body assessment steps (6-12)
  if (step >= 6 && step <= 12) {
    return validateBodyAssessmentStep(step, formData, toast);
  }
  
  // Workout preferences steps (13-20)
  if (step >= 13 && step <= 20) {
    return validateWorkoutPreferencesStep(step, formData, toast);
  }
  
  // Lifestyle steps (21-25)
  if (step >= 21 && step <= 25) {
    return validateLifestyleStep(step, formData, toast);
  }
  
  // Final steps (26-30)
  if (step >= 26 && step <= 30) {
    return validateFinalStepsStep(step, formData, toast);
  }
  
  return true;
};

export * from './basicInfoValidation';
export * from './bodyAssessmentValidation';
export * from './workoutPreferencesValidation';
export * from './lifestyleValidation';
export * from './finalStepsValidation';
