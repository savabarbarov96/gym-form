
import { FormData } from "@/types/survey";
import type { ToastParams } from "@/hooks/use-toast";

export const validateWorkoutLocationStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutLocation) {
    toast({
      title: "Workout Location Required",
      description: "Please select where you will be working out to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWorkoutIntensityStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutIntensity) {
    toast({
      title: "Workout Intensity Required",
      description: "Please select your preferred workout intensity to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWorkoutFrequencyStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutFrequency) {
    toast({
      title: "Workout Frequency Required",
      description: "Please select how often you've worked out to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWorkoutDurationStep = (formData: FormData, toast: (props: ToastParams) => void): boolean => {
  if (!formData.workoutDuration) {
    toast({
      title: "Workout Duration Required",
      description: "Please select your preferred workout duration to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

// Exercise preferences are optional
export const validateExercisePreferencesStep = (): boolean => {
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
    case 13:
      // This is just a display step for fitness goal
      return true;
    case 14:
      // Problem areas can be empty
      return true;
    case 15:
      // Activities can be empty
      return true;
    case 16:
      return validateWorkoutLocationStep(formData, toast);
    case 17:
      return validateWorkoutIntensityStep(formData, toast);
    case 18:
      return validateWorkoutFrequencyStep(formData, toast);
    case 19:
      return validateWorkoutDurationStep(formData, toast);
    case 20:
      return validateExercisePreferencesStep();
    default:
      console.log(`No specific validation for workout preferences step ${step}`);
      return true;
  }
};
