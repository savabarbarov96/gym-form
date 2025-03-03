
import { FormData } from "@/types/survey";
import { toast as toastFunction, Toast as ToastProps } from "@/hooks/use-toast";

// Re-export all validation functions
export * from './basicInfoValidation';
export * from './bodyAssessmentValidation';
export * from './finalStepsValidation';
export * from './lifestyleValidation';
export * from './workoutPreferencesValidation';

// Main validation function that routes to the appropriate step validator
export const validateStep = (step: number, formData: FormData, toast: (props: ToastProps) => void): boolean => {
  // Basic Info steps (1-5)
  if (step >= 1 && step <= 5) {
    const { validateBasicInfoStep } = require('./basicInfoValidation');
    return validateBasicInfoStep(step, formData, toast);
  }
  
  // Body Assessment steps (6-12)
  if (step >= 6 && step <= 12) {
    // Import individual validation functions for body assessment steps
    const { 
      validateProblemAreasStep,
      validateBestShapeStep,
      validateWeightChangeStep,
      validateActivitiesStep,
      validateHealthConcernsStep,
      validateProgressGraphStep,
      validateHeightInputStep,
      validateWeightInputStep 
    } = require('./bodyAssessmentValidation');
    
    if (step === 6) return validateProblemAreasStep(formData, toast);
    if (step === 7) return validateBestShapeStep(formData, toast);
    if (step === 8) return validateWeightChangeStep(formData, toast);
    if (step === 9) return validateActivitiesStep(formData, toast);
    if (step === 10) return validateProgressGraphStep(formData, toast);
    if (step === 11) return validateHealthConcernsStep(formData, toast);
    if (step === 12) return validateHeightInputStep(formData, toast) && validateWeightInputStep(formData, toast);
  }
  
  // Workout Preference steps (13-17)
  if (step >= 13 && step <= 17) {
    const { validateWorkoutPreferencesStep } = require('./workoutPreferencesValidation');
    return validateWorkoutPreferencesStep(step, formData, toast);
  }
  
  // Lifestyle steps (18-22)
  if (step >= 18 && step <= 22) {
    const { validateLifestyleStep } = require('./lifestyleValidation');
    return validateLifestyleStep(step, formData, toast);
  }
  
  // Final steps (23-29)
  if (step >= 23 && step <= 29) {
    const { validateFinalStepsStep } = require('./finalStepsValidation');
    return validateFinalStepsStep(step, formData, toast);
  }
  
  // If no validation is defined for the step, return true
  return true;
};
