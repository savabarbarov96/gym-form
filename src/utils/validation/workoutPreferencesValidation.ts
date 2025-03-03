
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateWorkoutPreferencesStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  if (step === 12 && !formData.workoutLocation) {
    toast({
      title: "Selection required",
      description: "Please select where you will be working out to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 13 && !formData.workoutIntensity) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout intensity to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 14 && !formData.workoutFrequency) {
    toast({
      title: "Selection required",
      description: "Please select how often you've worked out to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 15 && !formData.workoutDuration) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout duration to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 17 && !formData.height) {
    toast({
      title: "Selection required",
      description: "Please enter your height to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 18 && (!formData.currentWeight || !formData.targetWeight)) {
    toast({
      title: "Required fields",
      description: "Please enter both your current and target weight",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 19) {
    return true;
  }
  
  return true;
};
