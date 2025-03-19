import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/types/survey";
import { submitToWebhook, submitToMealPlanWebhook, submitToWorkoutPlanWebhook } from "@/components/WebhookService";
import { updateLoadingAfterWebhook } from "@/utils/loadingSimulation";
import { saveUserData } from "@/lib/supabase";

export const useSurveySubmit = (
  setAppState: (state: any) => void, 
  setLoadingProgress: (progress: number) => void
) => {
  const { toast } = useToast();

  // Common function to handle data saving and loading UI
  const handleCommonSubmit = async (formData: FormData, description: string) => {
    toast({
      title: "Creating your plan",
      description: description,
    });
    
    // Add animation for transitioning out the results container
    document.querySelector('.results-container')?.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(20px)' }
      ],
      { duration: 300, easing: 'ease-out' }
    );
    
    // Start loading state - this begins the 120-second loading animation
    setAppState("loading");
    setLoadingProgress(0);
    
    // Save user data to Supabase
    if (formData.personalInfo?.name && formData.personalInfo?.email) {
      try {
        const result = await saveUserData(
          formData.personalInfo.name,
          formData.personalInfo.email,
          formData
        );
        
        if (result.success) {
          console.log("User data saved to Supabase successfully");
        } else {
          console.error("Failed to save user data to Supabase:", result.message);
        }
      } catch (error) {
        console.error("Error saving user data to Supabase:", error);
        // Continue with webhook submission even if Supabase save fails
      }
    } else {
      console.warn("Missing name or email, skipping Supabase save");
    }
  };

  // Function for combined plan (both meal and workout)
  const handleGetPlan = async (formData: FormData) => {
    await handleCommonSubmit(formData, "Създаваме вашия персонализиран план за хранене и тренировка");
    
    // Send POST request immediately after starting the loading state
    // This doesn't wait for the loading to complete - they happen in parallel
    try {
      submitToWebhook(formData)
        .then(success => {
          if (!success) {
            console.error("Failed to submit to webhook");
            // We'll let the loading continue anyway
          }
        });
      
      // Wait for loading to complete (120 seconds) and then transition to success
      setTimeout(() => {
        setAppState("success");
      }, 120500); // 120 seconds + 500ms buffer
    } catch (error) {
      console.error("Error during plan submission:", error);
      // Even if there's an error, we continue with the UI flow
      setTimeout(() => {
        setAppState("success");
      }, 120500);
    }
  };

  // Function for meal plan only
  const handleGetMealPlan = async (formData: FormData) => {
    await handleCommonSubmit(formData, "Създаваме вашия персонализиран план за хранене");
    
    // Send POST request immediately
    try {
      submitToMealPlanWebhook(formData)
        .then(success => {
          if (!success) {
            console.error("Failed to submit to meal plan webhook");
            // We'll let the loading continue anyway
          }
        });
      
      // Wait for loading to complete (120 seconds) and then transition to success
      setTimeout(() => {
        setAppState("success");
      }, 120500); // 120 seconds + 500ms buffer
    } catch (error) {
      console.error("Error during meal plan submission:", error);
      // Even if there's an error, we continue with the UI flow
      setTimeout(() => {
        setAppState("success");
      }, 120500);
    }
  };

  // Function for workout plan only
  const handleGetWorkoutPlan = async (formData: FormData) => {
    await handleCommonSubmit(formData, "Създаваме вашия персонализиран тренировъчен план");
    
    // Send POST request immediately
    try {
      submitToWorkoutPlanWebhook(formData)
        .then(success => {
          if (!success) {
            console.error("Failed to submit to workout plan webhook");
            // We'll let the loading continue anyway
          }
        });
      
      // Wait for loading to complete (120 seconds) and then transition to success
      setTimeout(() => {
        setAppState("success");
      }, 120500); // 120 seconds + 500ms buffer
    } catch (error) {
      console.error("Error during workout plan submission:", error);
      // Even if there's an error, we continue with the UI flow
      setTimeout(() => {
        setAppState("success");
      }, 120500);
    }
  };

  return {
    handleGetPlan,
    handleGetMealPlan,
    handleGetWorkoutPlan
  };
};
