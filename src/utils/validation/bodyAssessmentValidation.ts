
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateBodyAssessmentStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  // Step 6 is height
  if (step === 6 && !formData.height) {
    toast({
      title: "Selection required",
      description: "Please enter your height to continue",
      variant: "destructive",
    });
    return false;
  }
  
  // Step 7 is weight input
  if (step === 7) {
    if (!formData.currentWeight || !formData.targetWeight) {
      toast({
        title: "Required fields",
        description: "Please enter both your current and target weight",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }
  
  if (step === 8 && !formData.bestShapeTime) {
    toast({
      title: "Selection required",
      description: "Please select when you were in your best shape to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 9 && !formData.weightChange) {
    toast({
      title: "Selection required",
      description: "Please select how your weight typically changes to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 10 && formData.activities.length === 0) {
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
  
  return true;
};
