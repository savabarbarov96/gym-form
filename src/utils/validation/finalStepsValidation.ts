import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

// Validate the "Out of Breath" self-assessment step
const validateOutOfBreathStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.outOfBreath === null) {
    toast({
      title: "Self Assessment Required",
      description: "Please indicate how much you agree with the statement",
      variant: "destructive",
    });
    return false;
  }
  console.log("outOfBreath validation passed with value:", formData.selfAssessments.outOfBreath);
  return true;
};

// Validate the "Falling Back" self-assessment step
const validateFallingBackStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.fallingBack === null) {
    toast({
      title: "Self Assessment Required",
      description: "Please indicate how much you agree with the statement",
      variant: "destructive",
    });
    return false;
  }
  console.log("fallingBack validation passed with value:", formData.selfAssessments.fallingBack);
  return true;
};

// Validate the "Motivation Level" self-assessment step
const validateMotivationLevelStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.motivationLevel === null) {
    toast({
      title: "Self Assessment Required",
      description: "Please indicate how much you agree with the statement",
      variant: "destructive",
    });
    return false;
  }
  console.log("motivationLevel validation passed with value:", formData.selfAssessments.motivationLevel);
  return true;
};

// Validate the "Diet Consistency" self-assessment step
const validateDietConsistencyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.dietConsistency === null) {
    toast({
      title: "Self Assessment Required",
      description: "Please indicate how much you agree with the statement",
      variant: "destructive",
    });
    return false;
  }
  console.log("dietConsistency validation passed with value:", formData.selfAssessments.dietConsistency);
  return true;
};

// Validate the personal info step
const validatePersonalInfoStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // Name validation
  if (!formData.personalInfo.name) {
    toast({
      title: "Name Required",
      description: "Please enter your name",
      variant: "destructive",
    });
    return false;
  }
  
  // Email validation
  if (!formData.personalInfo.email) {
    toast({
      title: "Email Required",
      description: "Please enter your email address",
      variant: "destructive",
    });
    return false;
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.personalInfo.email)) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email address",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};

// Validate the start commitment step
const validateStartCommitmentStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.startCommitment) {
    toast({
      title: "Selection Required",
      description: "Please select when you want to start",
      variant: "destructive",
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
  console.log("Validating final step:", step);
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 28:
      return validateOutOfBreathStep(formData, toast);
    case 29:
      return validateFallingBackStep(formData, toast);
    case 30:
      return validateMotivationLevelStep(formData, toast);
    case 31:
      return validateDietConsistencyStep(formData, toast);
    case 32:
      return validatePersonalInfoStep(formData, toast);
    case 33:
      return validateStartCommitmentStep(formData, toast);
    default:
      console.log(`No specific validation for final steps step ${step}`);
      return true;
  }
};
