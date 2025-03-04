import { FormData } from "@/types/survey";
import { ToastParams } from "@/hooks/use-toast";

export const validateWorkoutPreferencesStep = (
  step: number,
  formData: FormData,
  toast: (props: ToastParams) => void
): boolean => {
  // This translates the global step number to a local step within workout preferences
  // Adjusted for new Traditional Foods step
  // Step 15-22 globally = Step 0-7 locally
  const localStep = step - 15;
  
  console.log(`Validating workout preferences step ${localStep} (global step ${step})`);
  
  switch (localStep) {
    // Step 15: Problem Areas (no validation needed, can be empty)
    case 0:
      // Problem areas are optional, validation always passes
      return true;
    
    // Step 16: Activities (no validation needed)
    case 1:
      return true;
    
    // Step 17: Workout Location
    case 2:
      if (!formData.workoutLocation) {
        toast({
          title: "Selection Required",
          description: "Please select where you'll be working out",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 18: Workout Intensity
    case 3:
      if (!formData.workoutIntensity) {
        toast({
          title: "Selection Required",
          description: "Please select your preferred workout intensity",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 19: Workout Frequency
    case 4:
      if (!formData.workoutFrequency) {
        toast({
          title: "Selection Required",
          description: "Please select how often you can work out",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 20: Workout Duration
    case 5:
      if (!formData.workoutDuration) {
        toast({
          title: "Selection Required",
          description: "Please select how long you can work out per session",
          variant: "destructive",
        });
        return false;
      }
      return true;
    
    // Step 21: Exercise Preferences
    case 6:
      // Exercise preferences are optional
      return true;
      
    // Step 22: Desired Body
    case 7:
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
      console.warn(`No validation defined for workout preferences step ${localStep} (global step ${step})`);
      return true;
  }
};
