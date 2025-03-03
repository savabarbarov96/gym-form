import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/hooks/use-toast";
import type { Toast } from "@/components/ui/toast";

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

export const validateProblemAreasStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.problemAreas || formData.problemAreas.length === 0) {
    toast({
      title: "Missing information",
      description: "Please select at least one problem area or 'None of the above'",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateBestShapeStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.bestShapeTime) {
    toast({
      title: "Selection required",
      description: "Please select when you were in your best shape",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWeightChangeStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.weightChange) {
    toast({
      title: "Selection required",
      description: "Please select how your weight typically changes",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateActivitiesStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.activities || formData.activities.length === 0) {
    toast({
      title: "Selection required",
      description: "Please select at least one activity you enjoy",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateProgressGraphStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  // This property doesn't exist in FormData, so we'll skip validation for now
  // Add proper validation once we know what property to check
  return true;
};

export const validateHeightInputStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.height) {
    toast({
      title: "Height required",
      description: "Please enter your height",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateWeightInputStep = (formData: FormData, toast: (props: Toast) => void): boolean => {
  if (!formData.currentWeight) {
    toast({
      title: "Weight required",
      description: "Please enter your weight",
      variant: "destructive",
    });
    return false;
  }
  return true;
};
