
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/hooks/use-toast";
import type { ToastParams } from "@/hooks/use-toast";

export const validateOutOfBreathStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.outOfBreath === null) {
    toast({
      title: "Selection required",
      description: "Please rate how much you relate to the statement",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateFallingBackStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.fallingBack === null) {
    toast({
      title: "Selection required",
      description: "Please rate how much you relate to the statement",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateSuitableWorkoutsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.suitableWorkouts === null) {
    toast({
      title: "Selection required",
      description: "Please rate how much you relate to the statement",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateMotivationLevelStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.motivationLevel === null) {
    toast({
      title: "Selection required",
      description: "Please rate how much you relate to the statement",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateDietConsistencyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.selfAssessments.dietConsistency === null) {
    toast({
      title: "Selection required",
      description: "Please rate how much you relate to the statement",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validatePersonalInfoStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.personalInfo.name) {
    toast({
      title: "Name required",
      description: "Please enter your name to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (!formData.personalInfo.dob) {
    toast({
      title: "Date of birth required",
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
      title: "Invalid age",
      description: "Your age must be between 10 and 80 years",
      variant: "destructive",
    });
    return false;
  }
  
  if (!formData.personalInfo.email) {
    toast({
      title: "Email required",
      description: "Please enter your email address to continue",
      variant: "destructive",
    });
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.personalInfo.email)) {
    toast({
      title: "Invalid email",
      description: "Please enter a valid email address",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};

export const validateStartCommitmentStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // Start commitment is optional, so always return true
  return true;
};

export const validateFinalStepsStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  if (step === 23) return validateOutOfBreathStep(formData, toast);
  if (step === 24) return validateFallingBackStep(formData, toast);
  if (step === 25) return validateSuitableWorkoutsStep(formData, toast);
  if (step === 26) return validateMotivationLevelStep(formData, toast);
  if (step === 27) return validateDietConsistencyStep(formData, toast);
  if (step === 28) return validatePersonalInfoStep(formData, toast);
  if (step === 29) return validateStartCommitmentStep(formData, toast);
  
  return true;
};
