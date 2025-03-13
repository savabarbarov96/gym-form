import { ToastParams } from "@/hooks/use-toast";
import { validateBasicInfoStep } from "./basicInfoValidation";
import { validateBodyAssessmentStep } from "./bodyAssessmentValidation";
import { validateWorkoutPreferencesStep } from "./workoutPreferencesValidation";
import { validateLifestyleStep } from "./lifestyleValidation";
import { validateFinalStepsStep } from "./finalStepsValidation";
import { FormData } from "@/types/survey";

// Track active validation errors to manage their lifecycle
const activeValidationErrors = new Map<number, string>();

// Flag to enable/disable strict validation
// When false, validation will show warnings but allow users to proceed
const STRICT_VALIDATION = false;

/**
 * Common validation function that delegates to the correct validation module
 * based on the current step number
 */
export const validateStep = (
  step: number, 
  formData: FormData, 
  toast: (props: ToastParams) => void
): boolean => {
  // Always clear previous errors for this step when validating again
  if (activeValidationErrors.has(step)) {
    activeValidationErrors.delete(step);
  }

  // Debug validation
  console.log(`Validating step ${step}`);
  
  // Initialize validation result
  let isValid = true;
  
  try {
    // Determine which validation module to use based on the step range
    if (step >= 1 && step <= 5) {
      isValid = validateBasicInfoStep(step, formData, toast);
      console.log(`Basic info validation result: ${isValid}`);
    }
    
    else if (step >= 6 && step <= 13) {
      isValid = validateBodyAssessmentStep(step, formData, toast);
      console.log(`Body assessment validation result: ${isValid}`);
    }
    
    else if (step >= 14 && step <= 21) {
      isValid = validateWorkoutPreferencesStep(step, formData, toast);
      console.log(`Workout preferences validation result: ${isValid}`);
    }
    
    else if (step >= 22 && step <= 26) {
      isValid = validateLifestyleStep(step, formData, toast);
      console.log(`Lifestyle validation result: ${isValid}`);
    }
    
    else if (step >= 27 && step <= 32) {
      isValid = validateFinalStepsStep(step, formData, toast);
      console.log(`Final steps validation result: ${isValid}`);
    }
    
    if (!isValid) {
      // If validation failed, store the error state for this step
      activeValidationErrors.set(step, `Validation failed for step ${step}`);
      
      // If not in strict mode, allow users to proceed despite validation errors
      if (!STRICT_VALIDATION) {
        console.log(`Validation failed for step ${step}, but proceeding due to non-strict mode`);
        return true;
      }
    }
    
    return isValid;
  } catch (error) {
    console.error(`Validation error in step ${step}:`, error);
    toast({
      title: "Грешка при валидация",
      description: "Възникна неочаквана грешка при валидацията",
      variant: "destructive",
    });
    
    // In non-strict mode, allow users to proceed despite errors
    return !STRICT_VALIDATION;
  }
};

// Function to clear all validation errors - useful when resetting the form
export const clearAllValidationErrors = () => {
  activeValidationErrors.clear();
};

// Function to clear validation errors for a specific step - useful when moving away from a step
export const clearValidationErrorForStep = (step: number) => {
  if (activeValidationErrors.has(step)) {
    activeValidationErrors.delete(step);
  }
};

// Function to check if a specific step has validation errors
export const hasValidationErrorForStep = (step: number): boolean => {
  return activeValidationErrors.has(step);
}; 