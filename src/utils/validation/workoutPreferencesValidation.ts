import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateProblemAreasStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // This step is optional, so always return true
  return true;
};

export const validateActivitiesStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // This step is optional, so always return true
  return true;
};

export const validateWorkoutLocationStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutLocation) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете къде ще тренирате",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateWorkoutIntensityStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutIntensity) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете предпочитаната интензивност на тренировката",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateWorkoutFrequencyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutFrequency) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете колко често можете да тренирате",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateWorkoutDurationStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutDuration) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете колко дълго можете да тренирате",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateExercisePreferencesStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  // This step is handled by its own UI with a Continue button, so we don't need to validate here
  return true;
};

export const validateDesiredBodyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.desiredBody) {
    toast({
      title: "Необходим е избор",
      description: "Моля, изберете желаното тяло",
      variant: "default",
    });
    return false;
  }
  return true;
};

export const validateWorkoutPreferencesStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  console.log(`Validating workout preferences step ${step}`);
  
  // Map the global step numbers to the specific validation functions
  switch (step) {
    case 14:
      return validateProblemAreasStep(formData, toast);
    case 15:
      return validateActivitiesStep(formData, toast);
    case 16:
      return validateWorkoutLocationStep(formData, toast);
    case 17:
      return validateWorkoutIntensityStep(formData, toast);
    case 18:
      return validateWorkoutFrequencyStep(formData, toast);
    case 19:
      return validateWorkoutDurationStep(formData, toast);
    case 20:
      return validateExercisePreferencesStep(formData, toast);
    case 21:
      return validateDesiredBodyStep(formData, toast);
    default:
      console.log(`No specific validation for workout preferences step ${step}`);
      return true;
  }
}; 