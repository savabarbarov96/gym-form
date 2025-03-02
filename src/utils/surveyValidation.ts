
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateStep = (
  step: number, 
  formData: FormData, 
  toast: typeof toastFunction
): boolean => {
  if (step === 1 && !formData.age) {
    toast({
      title: "Selection required",
      description: "Please select your age group to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 2 && !formData.bodyType) {
    toast({
      title: "Selection required",
      description: "Please select your body type to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 4 && !formData.fitnessGoal) {
    toast({
      title: "Selection required",
      description: "Please select your fitness goal to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 5 && !formData.desiredBody) {
    toast({
      title: "Selection required",
      description: "Please select your desired body to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 7 && !formData.bestShapeTime) {
    toast({
      title: "Selection required",
      description: "Please select when you were in your best shape to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 8 && !formData.weightChange) {
    toast({
      title: "Selection required",
      description: "Please select how your weight typically changes to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 9 && formData.activities.length === 0) {
    toast({
      title: "Selection required",
      description: "Please select at least one activity or 'None of the above' to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 11 && formData.healthConcerns.length === 0) {
    toast({
      title: "Selection required",
      description: "Please select a health concern or 'None of the above' to continue",
      variant: "destructive",
    });
    return false;
  }
  
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
  
  return true;
};
