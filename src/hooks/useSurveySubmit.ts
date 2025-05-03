import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/types/survey";
import { submitToWebhook, submitToMealPlanWebhook, submitToWorkoutPlanWebhook } from "@/components/WebhookService";
import { updateLoadingAfterWebhook } from "@/utils/loadingSimulation";
import { saveUserData } from "@/lib/supabase";

export const useSurveySubmit = (
  setAppState: (state: any) => void, 
  setLoadingProgress: (progress: number | ((prev: number) => number)) => void
) => {
  const { toast } = useToast();

  // Simulate a loading progress over 120 seconds
  const simulateProgressFor120Seconds = (): void => {
    // Reset progress and start at 1%
    setLoadingProgress(1);
    
    // Calculate timing for 120 seconds (120000ms)
    const totalTimeMs = 120000; // 120 seconds
    const maxProgressWithoutResponse = 95; // Only go to 95% without actual response
    const incrementsTotal = maxProgressWithoutResponse - 1; // Steps from 1% to 95%
    const incrementDelay = totalTimeMs / incrementsTotal; // Time between increments
    
    let currentProgress = 1; // Start at 1%
    
    // Create an interval that updates progress smoothly with an easing function
    const loadingInterval = setInterval(() => {
      // Use an easing function to make progress slower towards the end
      // This gives the impression that harder work is happening as progress approaches 95%
      const progressStep = 1 - 0.5 * (currentProgress / maxProgressWithoutResponse);
      currentProgress += progressStep;
      
      if (currentProgress >= maxProgressWithoutResponse) {
        clearInterval(loadingInterval);
        setLoadingProgress(maxProgressWithoutResponse);
        return;
      }
      
      // Update the loading progress
      setLoadingProgress(Math.min(currentProgress, maxProgressWithoutResponse));
    }, incrementDelay);
    
    // Safety cleanup - clear interval after 125 seconds just in case
    setTimeout(() => {
      clearInterval(loadingInterval);
      // Don't automatically set to 100% - this should happen only on success response
      // Instead, ensure we're at least at 95%
      setLoadingProgress(prev => Math.max(prev, maxProgressWithoutResponse));
    }, totalTimeMs + 5000);
  };

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
    
    // Start loading state
    setAppState("loading");
    
    // Begin the progress simulation immediately - this runs independently of the webhook call
    simulateProgressFor120Seconds();
    
    // Save user data to Supabase
    // Note: This is a preliminary save to capture form data
    // The complete form data with selected plan will be saved again
    // when the user selects and pays for a plan in payment-success.tsx
    if (formData.personalInfo?.name && formData.personalInfo?.email) {
      try {
        await saveUserData(
          formData.personalInfo.name,
          formData.personalInfo.email,
          formData
        );
        // Continue regardless of success/failure
      } catch (error) {
        // Continue with webhook submission even if Supabase save fails
      }
    }
  };

  // Function for combined plan (both meal and workout)
  const handleGetPlan = async (formData: FormData) => {
    await handleCommonSubmit(formData, "Създаваме вашия персонализиран план за хранене и тренировка");
    
    // Send POST request immediately after starting the loading state
    try {
      // Use try-catch with fetch directly to handle CORS errors better
      submitToWebhook(formData)
        .then(success => {
          if (success) {
            // On success, complete the loading bar
            setTimeout(() => {
              setLoadingProgress(100);
              setTimeout(() => setAppState("success"), 500); // Short delay after reaching 100%
            }, 500); // Small delay for visual effect
          }
          // We'll let the loading continue anyway even if not successful
        })
        .catch(() => {
          // Loading animation continues regardless of error
        });
      
      // Wait for loading to complete (120 seconds) and then transition to success
      // even if the webhook didn't respond or failed
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => setAppState("success"), 500);
      }, 120500); // 120 seconds + 500ms buffer
    } catch (error) {
      // Even if there's an error, we continue with the UI flow
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => setAppState("success"), 500);
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
          if (success) {
            // On success, complete the loading bar
            setTimeout(() => {
              setLoadingProgress(100);
              setTimeout(() => setAppState("success"), 500); // Short delay after reaching 100%
            }, 500); // Small delay for visual effect
          }
          // We'll let the loading continue anyway
        })
        .catch(() => {
          // Loading animation continues regardless of error
        });
      
      // Wait for loading to complete (120 seconds) and then transition to success
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => setAppState("success"), 500);
      }, 120500); // 120 seconds + 500ms buffer
    } catch (error) {
      // Even if there's an error, we continue with the UI flow
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => setAppState("success"), 500);
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
          if (success) {
            // On success, complete the loading bar
            setTimeout(() => {
              setLoadingProgress(100);
              setTimeout(() => setAppState("success"), 500); // Short delay after reaching 100%
            }, 500); // Small delay for visual effect
          }
          // We'll let the loading continue anyway
        })
        .catch(() => {
          // Loading animation continues regardless of error
        });
      
      // Wait for loading to complete (120 seconds) and then transition to success
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => setAppState("success"), 500);
      }, 120500); // 120 seconds + 500ms buffer
    } catch (error) {
      // Even if there's an error, we continue with the UI flow
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => setAppState("success"), 500);
      }, 120500);
    }
  };

  return {
    handleGetPlan,
    handleGetMealPlan,
    handleGetWorkoutPlan
  };
};
