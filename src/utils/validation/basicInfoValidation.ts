
import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateAgeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.age) {
    toast({
      title: "Age Selection Required",
      description: "Please select your age group to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateBodyTypeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.bodyType) {
    toast({
      title: "Body Type Selection Required",
      description: "Please select your body type to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateGoalStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.goal) {
    toast({
      title: "Goal Selection Required",
      description: "Please select your goal to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateFitnessGoalStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.fitnessGoal) {
    toast({
      title: "Fitness Goal Selection Required",
      description: "Please select your fitness goal to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateDesiredBodyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.desiredBody) {
    toast({
      title: "Desired Body Selection Required",
      description: "Please select your desired body to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateBasicInfoStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  console.log(`Validating basic info step ${step}`);
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 1:
      return validateAgeStep(formData, toast);
    case 2:
      return validateBodyTypeStep(formData, toast);
    case 3:
      return validateGoalStep(formData, toast);
    case 4:
      return validateFitnessGoalStep(formData, toast);
    case 5:
      return validateDesiredBodyStep(formData, toast);
    default:
      console.log(`No specific validation for basic info step ${step}`);
      return true;
  }
};
