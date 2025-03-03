
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateBasicInfoStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
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
  
  return true;
};
