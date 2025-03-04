
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
  
  // Date of birth validation - simplify to just check if it exists
  if (!formData.personalInfo.dob) {
    toast({
      title: "Date of Birth Required",
      description: "Please enter your date of birth",
      variant: "destructive",
    });
    return false;
  }
  
  // Log the date for debugging
  console.log("DoB validation check:", formData.personalInfo.dob);
  
  // Simplify validation - just check if it's a valid date string
  try {
    const dobDate = new Date(formData.personalInfo.dob);
    
    // Check if date is valid - just make sure it parses to a valid date
    if (isNaN(dobDate.getTime())) {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid date of birth",
        variant: "destructive",
      });
      return false;
    }
  } catch (error) {
    toast({
      title: "Invalid Date Format",
      description: "Please enter a valid date of birth",
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
