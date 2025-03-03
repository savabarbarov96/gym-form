import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/hooks/use-toast";
import type { Toast } from "@/components/ui/toast";

export const validateSugaryFoodsStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.sugaryFoods) {
    toast({
      title: "Selection required",
      description: "Please select how often you consume sugary foods or beverages",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWaterIntakeStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.waterIntake) {
    toast({
      title: "Selection required",
      description: "Please select your daily water intake",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateTypicalDayStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.typicalDay) {
    toast({
      title: "Selection required",
      description: "Please select how you would describe your typical day",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateEnergyLevelsStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.energyLevels) {
    toast({
      title: "Selection required",
      description: "Please rate your average energy levels during the day",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateSleepAmountStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (formData.sleepAmount === null) {
    toast({
      title: "Sleep amount required",
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
  toast = toastFunction
): boolean => {
  if (step === 18) return validateSugaryFoodsStep(formData, toast);
  if (step === 19) return validateWaterIntakeStep(formData, toast);
  if (step === 20) return validateTypicalDayStep(formData, toast);
  if (step === 21) return validateEnergyLevelsStep(formData, toast);
  if (step === 22) return validateSleepAmountStep(formData, toast);
  
  return true;
};
