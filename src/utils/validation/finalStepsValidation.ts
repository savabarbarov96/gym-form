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
  const { name, email } = formData.personalInfo;
  
  if (!name || !email) {
    toast({
      title: "Необходима е информация",
      description: "Моля, въведете вашето име и имейл",
      variant: "default",
    });
    return false;
  }
  
  // Basic email validation
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
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 27:
      return validateSelfAssessmentOutOfBreathStep(formData, toast);
    case 28:
      return validateSelfAssessmentFallingBackStep(formData, toast);
    case 29:
      return validateSelfAssessmentSuitableWorkoutsStep(formData, toast);
    case 30:
      return validateSelfAssessmentMotivationStep(formData, toast);
    case 31:
      return validatePersonalInfoStep(formData, toast);
    case 32:
      return validateStartCommitmentStep(formData, toast);
    default:
      console.log(`No specific validation for final steps step ${step}`);
      return true;
  }
}; 