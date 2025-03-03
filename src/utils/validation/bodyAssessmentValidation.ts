import { FormData } from "@/types/survey";
import { Toast } from "@/components/ui/use-toast";

export const validateHealthConcernsStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  // Health concerns are optional, but if a custom option is being added, it should not be empty
  if (formData.healthConcerns.length === 0 && formData.customHealthConcern === null) {
    // This is valid - user has no health concerns
    return true;
  }
  
  // If there's at least one health concern or a valid custom concern, it's valid
  if (formData.healthConcerns.length > 0 || (formData.customHealthConcern && formData.customHealthConcern.trim() !== '')) {
    return true;
  }
  
  toast({
    title: "Missing information",
    description: "Please select at least one health concern or choose 'None of the above'",
    variant: "destructive",
  });
  
  return false;
};

// Export other existing validation functions
export { 
  validateProblemAreasStep,
  validateBestShapeStep,
  validateWeightChangeStep,
  validateActivitiesStep,
  validateProgressGraphStep,
  validateHeightInputStep,
  validateWeightInputStep,
} from '@/utils/validation';
