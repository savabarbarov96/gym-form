
import { FormData } from "@/types/survey";
import { toast as toastFunction, Toast as ToastProps } from "@/hooks/use-toast";

export const validateWorkoutLocationStep = (formData: FormData, toast: (props: ToastProps) => void): boolean => {
  if (!formData.workoutLocation) {
    toast({
      title: "Selection required",
      description: "Please select where you will be working out to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWorkoutIntensityStep = (formData: FormData, toast: (props: ToastProps) => void): boolean => {
  if (!formData.workoutIntensity) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout intensity to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWorkoutFrequencyStep = (formData: FormData, toast: (props: ToastProps) => void): boolean => {
  if (!formData.workoutFrequency) {
    toast({
      title: "Selection required",
      description: "Please select how often you've worked out to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWorkoutDurationStep = (formData: FormData, toast: (props: ToastProps) => void): boolean => {
  if (!formData.workoutDuration) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout duration to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateExercisePreferencesStep = (formData: FormData, toast: (props: ToastProps) => void): boolean => {
  // Exercise preferences are optional
  return true;
};

export const validateWorkoutPreferencesStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  if (step === 13) return validateWorkoutLocationStep(formData, toast);
  if (step === 14) return validateWorkoutIntensityStep(formData, toast);
  if (step === 15) return validateWorkoutFrequencyStep(formData, toast);
  if (step === 16) return validateWorkoutDurationStep(formData, toast);
  if (step === 17) return validateExercisePreferencesStep(formData, toast);
  
  return true;
};
