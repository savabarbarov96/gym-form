
import React from "react";
import Logo from "@/components/Logo";
import { FormState, LoadingState, ResultsState, SuccessState } from "@/components/app-states";
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";

const SurveyContent = () => {
  const { 
    appState, 
    formData, 
    step, 
    totalSteps,
    animationDirection,
    loadingProgress,
    setFormData,
    handleNext,
    handleBack,
    handleGetPlan
  } = useSurvey();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-4 flex justify-between items-center border-b border-border">
        <Logo />
        <div className="text-sm">BUILD YOUR PERFECT BODY</div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {appState === "form" && (
          <FormState
            step={step}
            totalSteps={totalSteps}
            animationDirection={animationDirection}
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {appState === "loading" && (
          <LoadingState loadingProgress={loadingProgress} />
        )}

        {appState === "results" && (
          <ResultsState handleGetPlan={handleGetPlan} />
        )}
        
        {appState === "success" && (
          <SuccessState />
        )}
      </main>
      
      <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>We recommend that you consult with your physician before beginning any exercise program</p>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <SurveyProvider>
      <SurveyContent />
    </SurveyProvider>
  );
};

export default Index;
