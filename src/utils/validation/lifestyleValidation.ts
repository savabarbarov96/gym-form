
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateLifestyleStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  if (step === 20 && !formData.sugaryFoods) {
    toast({
      title: "Selection required",
      description: "Please select how often you consume sugary foods or beverages",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 22 && !formData.typicalDay) {
    toast({
      title: "Selection required",
      description: "Please select how you would describe your typical day",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 23 && !formData.energyLevels) {
    toast({
      title: "Selection required",
      description: "Please rate your average energy levels during the day",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 24 && formData.sleepAmount === null) {
    toast({
      title: "Sleep amount required",
      description: "Please indicate how much sleep you usually get",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};
