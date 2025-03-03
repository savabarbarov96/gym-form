
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/hooks/use-toast";
import type { ToastParams } from "@/hooks/use-toast";

// Re-export all validation functions
export * from './basicInfoValidation';
export * from './bodyAssessmentValidation';
export * from './finalStepsValidation';
export * from './lifestyleValidation';
export * from './workoutPreferencesValidation';

// Main validation function that routes to the appropriate step validator
export const validateStep = (
  step: number, 
  formData: FormData, 
  toast: (props: ToastParams) => void = toastFunction
): boolean => {
  // Basic Info steps (1-5)
  if (step >= 1 && step <= 5) {
    const { validateBasicInfoStep } = require('./basicInfoValidation');
    return validateBasicInfoStep(step, formData, toast);
  }
  
  // Body Assessment steps (6-12)
  if (step >= 6 && step <= 12) {
    const { validateBodyAssessmentStep } = require('./bodyAssessmentValidation');
    return validateBodyAssessmentStep(step, formData, toast);
  }
  
  // Workout Preference steps (13-20)
  if (step >= 13 && step <= 20) {
    const { validateWorkoutPreferencesStep } = require('./workoutPreferencesValidation');
    return validateWorkoutPreferencesStep(step, formData, toast);
  }
  
  // Lifestyle steps (21-24)
  if (step >= 21 && step <= 24) {
    const { validateLifestyleStep } = require('./lifestyleValidation');
    return validateLifestyleStep(step, formData, toast);
  }
  
  // Final steps (25-29)
  if (step >= 25 && step <= 29) {
    const { validateFinalStepsStep } = require('./finalStepsValidation');
    return validateFinalStepsStep(step, formData, toast);
  }
  
  // If no validation is defined for the step, return true
  return true;
};
