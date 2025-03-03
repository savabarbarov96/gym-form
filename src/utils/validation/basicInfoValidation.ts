import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/hooks/use-toast";
import type { Toast } from "@/components/ui/toast";

export const validateAgeStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.age) {
    toast({
      title: "Selection required",
      description: "Please select your age group to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateBodyTypeStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.bodyType) {
    toast({
      title: "Selection required",
      description: "Please select your body type to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateGoalStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.goal) {
    toast({
      title: "Selection required",
      description: "Please select your goal to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateFitnessGoalStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.fitnessGoal) {
    toast({
      title: "Selection required",
      description: "Please select your fitness goal to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateDesiredBodyStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.desiredBody) {
    toast({
      title: "Selection required",
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
  toast = toastFunction
): boolean => {
  if (step === 1) return validateAgeStep(formData, toast);
  if (step === 2) return validateBodyTypeStep(formData, toast);
  if (step === 3) return validateGoalStep(formData, toast);
  if (step === 4) return validateFitnessGoalStep(formData, toast);
  if (step === 5) return validateDesiredBodyStep(formData, toast);
  
  return true;
};
