
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/types/survey";
import { submitToWebhook } from "@/components/WebhookService";
import { updateLoadingAfterWebhook } from "@/utils/loadingSimulation";

export const useSurveySubmit = (
  setAppState: (state: any) => void, 
  setLoadingProgress: (progress: number) => void
) => {
  const { toast } = useToast();

  const handleGetPlan = async (formData: FormData) => {
    toast({
      title: "Creating your plan",
      description: "We're generating your personalized workout plan",
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
    setLoadingProgress(0);
    
    // Send to webhook while showing loading animation
    const success = await submitToWebhook(formData);
    
    // Update loading animation based on webhook response
    await updateLoadingAfterWebhook(success, setAppState, setLoadingProgress);
  };

  return {
    handleGetPlan
  };
};
