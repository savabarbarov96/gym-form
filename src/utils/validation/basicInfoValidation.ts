import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateGenderStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.gender) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете вашия пол",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateAgeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.age) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете вашата възрастова група",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateBodyTypeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.bodyType) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете вашия тип тяло",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateGoalStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // Goal step has default values, so it's always valid
  return true;
};

export const validateFitnessGoalStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.fitnessGoal) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете вашата фитнес цел",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateDesiredBodyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.desiredBody) {
    toast({
      title: "Необходим е избор на желано тяло",
      description: "Моля, изберете вашето желано тяло, за да продължите",
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
      return validateGenderStep(formData, toast);
    case 2:
      return validateAgeStep(formData, toast);
    case 3:
      return validateBodyTypeStep(formData, toast);
    case 4:
      return validateGoalStep(formData, toast);
    case 5:
      return validateFitnessGoalStep(formData, toast);
    case 6:
      return validateDesiredBodyStep(formData, toast);
    default:
      console.log(`No specific validation for basic info step ${step}`);
      return true;
  }
}; 