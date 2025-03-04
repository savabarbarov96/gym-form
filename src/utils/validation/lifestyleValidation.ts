
import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateSugaryFoodsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.sugaryFoods) {
    toast({
      title: "Sugary Foods Selection Required",
      description: "Please select how often you consume sugary foods or beverages",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWaterIntakeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.waterIntake === null) {
    toast({
      title: "Water Intake Required",
      description: "Please select your daily water intake",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateTypicalDayStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.typicalDay) {
    toast({
      title: "Daily Activity Selection Required",
      description: "Please select how you would describe your typical day",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateEnergyLevelsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.energyLevels === null) {
    toast({
      title: "Energy Level Rating Required",
      description: "Please rate your average energy levels during the day",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateSleepAmountStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.sleepAmount === null) {
    toast({
      title: "Sleep Amount Required",
      description: "Please indicate how much sleep you usually get",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateLifestyleStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  console.log(`Validating lifestyle step ${step}`);
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 22:
      return validateSugaryFoodsStep(formData, toast);
    case 23:
      return validateWaterIntakeStep(formData, toast);
    case 24:
      return validateTypicalDayStep(formData, toast);
    case 25:
      return validateEnergyLevelsStep(formData, toast);
    case 26:
      return validateSleepAmountStep(formData, toast);
    default:
      console.log(`No specific validation for lifestyle step ${step}`);
      return true;
  }
};
