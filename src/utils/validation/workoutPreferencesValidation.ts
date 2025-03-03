
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateWorkoutPreferencesStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  if (step === 13 && !formData.fitnessGoal) {
    toast({
      title: "Selection required",
      description: "Please select your fitness goal to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 14 && (!formData.problemAreas || formData.problemAreas.length === 0)) {
    toast({
      title: "Selection required",
      description: "Please select at least one problem area (or 'None of the above') to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 16 && !formData.workoutLocation) {
    toast({
      title: "Selection required",
      description: "Please select where you will be working out to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 17 && !formData.workoutIntensity) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout intensity to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 18 && !formData.workoutFrequency) {
    toast({
      title: "Selection required",
      description: "Please select how often you've worked out to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 19 && !formData.workoutDuration) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout duration to continue",
      variant: "destructive",
    });
    return false;
  }
  
  // No validation for exercise preferences, as it allows skipping
  
  return true;
};
