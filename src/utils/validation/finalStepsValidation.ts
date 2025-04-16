import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

// Validate the "Out of Breath" self-assessment step
export const validateSelfAssessmentOutOfBreathStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.outOfBreath === null) {
    toast({
      title: "Необходима е оценка",
      description: "Моля, оценете колко бързо се задъхвате",
      variant: "default",
    });
    return false;
  }
  return true;
};

// Validate the "Falling Back" self-assessment step
export const validateSelfAssessmentFallingBackStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.fallingBack === null) {
    toast({
      title: "Необходима е оценка",
      description: "Моля, оценете колко често се връщате към стари навици",
      variant: "default",
    });
    return false;
  }
  return true;
};

// Validate the "Motivation Level" self-assessment step
export const validateSelfAssessmentSuitableWorkoutsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.suitableWorkouts === null) {
    toast({
      title: "Необходима е оценка",
      description: "Моля, оценете колко трудно намирате подходящи тренировки",
      variant: "default",
    });
    return false;
  }
  return true;
};

// Validate the "Diet Consistency" self-assessment step
export const validateSelfAssessmentMotivationStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.motivationLevel === null) {
    toast({
      title: "Необходима е оценка",
      description: "Моля, оценете вашето ниво на мотивация",
      variant: "default",
    });
    return false;
  }
  return true;
};

// Validate the "Diet Consistency" self-assessment step
export const validateSelfAssessmentDietConsistencyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.dietConsistency === null) {
    toast({
      title: "Необходима е оценка",
      description: "Моля, оценете вашата последователност в диетата",
      variant: "default",
    });
    return false;
  }
  return true;
};

// Validate the personal info step
export const validatePersonalInfoStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  const { name, email } = formData.personalInfo || { name: null, email: null };
  
  // Require both name and email to be filled
  if (!name) {
    toast({
      title: "Необходима информация",
      description: "Моля, въведете Вашето име",
      variant: "default",
    });
    return false;
  }
  
  if (!email) {
    toast({
      title: "Необходима информация",
      description: "Моля, въведете имейл адрес",
      variant: "default",
    });
    return false;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast({
      title: "Невалиден имейл",
      description: "Моля, въведете валиден имейл адрес",
      variant: "default",
    });
    return false;
  }
  
  return true;
};

// Validate the start commitment step
export const validateStartCommitmentStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.startCommitment) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете кога искате да започнете",
      variant: "default",
    });
    return false;
  }
  return true;
};

// Main validation function for the final steps
export const validateFinalStepsStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  console.log(`Validating final steps step ${step}`);
  
  // Map the global step numbers (27-33) to the specific validation functions
  // The FinalStepsRenderer maps steps as follows:
  // 28 (localStep 1) -> Out of Breath
  // 29 (localStep 2) -> Falling Back
  // 30 (localStep 3) -> Motivation Level
  // 31 (localStep 4) -> Diet Consistency
  // 32 (localStep 5) -> Personal Info
  // 33 (localStep 6) -> Start Commitment
  switch (step) {
    case 28:
      return validateSelfAssessmentOutOfBreathStep(formData, toast);
    case 29:
      return validateSelfAssessmentFallingBackStep(formData, toast);
    case 30:
      return validateSelfAssessmentMotivationStep(formData, toast);
    case 31:
      return validateSelfAssessmentDietConsistencyStep(formData, toast);
    case 32:
      return validatePersonalInfoStep(formData, toast);
    case 33:
      return validateStartCommitmentStep(formData, toast);
    default:
      console.log(`No specific validation for final steps step ${step}`);
      return true;
  }
}; 