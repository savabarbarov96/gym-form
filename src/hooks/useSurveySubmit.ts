
import { useToast } from "@/components/ui/use-toast";
import { FormData } from "@/types/survey";
import { submitToWebhook } from "@/components/WebhookService";

export const useSurveySubmit = (setAppState: (state: any) => void, setLoadingProgress: (progress: number) => void) => {
  const { toast } = useToast();

  const handleGetPlan = (formData: FormData, simulateLoading: () => void) => {
    toast({
      title: "Creating your plan",
      description: "We're generating your personalized workout plan",
    });
    
    document.querySelector('.results-container')?.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(20px)' }
      ],
      { duration: 300, easing: 'ease-out' }
    );
    
    setAppState("loading");
    setLoadingProgress(0);
    
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

  // Submit to webhook and trigger loading simulation
  const submitSurvey = (formData: FormData, simulateLoading: () => void) => {
    console.log("Form submitted:", formData);
    
    submitToWebhook(formData).then(() => {
      simulateLoading();
    });
  };

  return {
    handleGetPlan,
    submitSurvey
  };
};
