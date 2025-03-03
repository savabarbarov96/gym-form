
import { useToast } from "@/components/ui/use-toast";
import { FormData } from "@/types/survey";
import { submitToWebhook } from "@/components/WebhookService";

export const useSurveySubmit = (setAppState: (state: any) => void, setLoadingProgress: (progress: number) => void) => {
  const { toast } = useToast();

  const handleGetPlan = (formData: FormData) => {
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
    
    // Only send to webhook on "Get my personalized plan" click
    submitToWebhook(formData).then((success) => {
      if (success) {
        simulateLoading();
      } else {
        toast({
          title: "Error",
          description: "There was an error generating your plan",
          variant: "destructive",
        });
        setAppState("results");
      }
    });
  };

  // Simulate loading process
  const simulateLoading = () => {
    const increment = 100 / 40;
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += increment;
      setLoadingProgress(Math.min(Math.round(currentProgress), 100));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        // After loading completes, move to plan state
        setTimeout(() => {
          setAppState("plan");
        }, 500);
      }
    }, 200);
  };

  return {
    handleGetPlan
  };
};
