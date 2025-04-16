import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateSugaryFoodsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.sugaryFoods) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете колко често консумирате сладки храни или напитки",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateWaterIntakeStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.waterIntake === null) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете вашия дневен прием на вода",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateTypicalDayStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.typicalDay) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете как бихте описали типичния си ден",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateEnergyLevelsStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.energyLevels === null) {
    toast({
      title: "Необходима е оценка",
      description: "Моля, оценете средните си нива на енергия през деня",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateSleepAmountStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (formData.sleepAmount === null) {
    toast({
      title: "Необходим е избор",
      description: "Моля, посочете колко сън обикновено получавате",
      variant: "default",
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
    case 23:
      return validateSugaryFoodsStep(formData, toast);
    case 24:
      return validateWaterIntakeStep(formData, toast);
    case 25:
      return validateTypicalDayStep(formData, toast);
    case 26:
      return validateEnergyLevelsStep(formData, toast);
    case 27:
      return validateSleepAmountStep(formData, toast);
    default:
      console.log(`No specific validation for lifestyle step ${step}`);
      return true;
  }
}; 