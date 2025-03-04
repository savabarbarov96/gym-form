import { FormData } from "@/types/survey";
import { ToastParams } from "@/hooks/use-toast";

export const validateWorkoutPreferencesStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  // This translates the global step number to a local step within workout preferences
  // Step 14-21 globally = Step 1-8 locally
  const localStep = step - 13;
  
  console.log(`Validating workout preferences step ${localStep} (global step ${step})`);
  
  switch (localStep) {
    // Step 14: Problem Areas (no validation needed, can be empty)
    case 1:
      // Problem areas are optional, validation always passes
      return true;
    
    // Step 15: Activities (no validation needed)
    case 2:
      return true;
    
    // Step 16: Workout Location
    case 3:
      if (!formData.workoutLocation) {
        toast({
          title: "Selection Required",
          description: "Please select where you'll be working out",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 17: Workout Intensity
    case 4:
      if (!formData.workoutIntensity) {
        toast({
          title: "Selection Required",
          description: "Please select your preferred workout intensity",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 18: Workout Frequency
    case 5:
      if (!formData.workoutFrequency) {
        toast({
          title: "Selection Required",
          description: "Please select how often you can work out",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 19: Workout Duration
    case 6:
      if (!formData.workoutDuration) {
        toast({
          title: "Selection Required",
          description: "Please select how long you can work out per session",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 20: Exercise Preferences
    case 7:
      // Exercise preferences are optional
      return true;
      
    // Step 21: Desired Body
    case 8:
      if (!formData.desiredBody) {
        toast({
          title: "Selection Required",
          description: "Please select your desired body type",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    default:
      console.warn(`No validation defined for workout preferences step ${localStep}`);
      return true;
  }
};
