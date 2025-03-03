

import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateOutOfBreathStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.outOfBreath === null) {
    toast({
      title: "Self-Assessment Required",
      description: "Please rate how much you relate to the statement about being out of breath",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateFallingBackStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.fallingBack === null) {
    toast({
      title: "Self-Assessment Required",
      description: "Please rate how much you relate to the statement about falling back into habits",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateMotivationLevelStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.motivationLevel === null) {
    toast({
      title: "Self-Assessment Required",
      description: "Please rate how much you relate to the statement about motivation",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateDietConsistencyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.dietConsistency === null) {
    toast({
      title: "Self-Assessment Required",
      description: "Please rate how much you relate to the statement about diet consistency",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validatePersonalInfoStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.personalInfo.name) {
    toast({
      title: "Name Required",
      description: "Please enter your name to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (!formData.personalInfo.dob) {
    toast({
      title: "Date of Birth Required",
      description: "Please enter your date of birth to continue",
      variant: "destructive",
    });
    return false;
  }
  
  const today = new Date();
  const birthDate = new Date(formData.personalInfo.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 10 || age > 80) {
    toast({
      title: "Invalid Age",
      description: "Your age must be between 10 and 80 years",
      variant: "destructive",
    });
    return false;
  }
  
  if (!formData.personalInfo.email) {
    toast({
      title: "Email Required",
      description: "Please enter your email address to continue",
      variant: "destructive",
    });
    return false;
  }
  
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

export const validateFinalStepsStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  console.log(`Validating final steps step ${step}`);
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 26:
      return validateOutOfBreathStep(formData, toast);
    case 27:
      return validateFallingBackStep(formData, toast);
    case 28:
      return validateMotivationLevelStep(formData, toast);
    case 29:
      return validateDietConsistencyStep(formData, toast);
    case 30:
      return validatePersonalInfoStep(formData, toast);
    default:
      console.log(`No specific validation for final steps step ${step}`);
      return true;
  }
};
