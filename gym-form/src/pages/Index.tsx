import React from "react";
import Logo from "@/components/Logo";
import { FormState, LoadingState, ResultsState, SuccessState } from "@/components/app-states";
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";
import { useParams } from "react-router-dom";

const SurveyHeader = () => {
  const { step } = useSurvey();
  return (
    <header className="p-4 flex justify-between items-center border-b border-border">
      <Logo />
      <div className="text-sm text-muted-foreground flex items-center">
        <span className="mr-2">Стъпка: {step}</span>
        <a
          href={`/${step}`}
          className="bg-muted px-2 py-1 rounded-md hover:bg-muted/80"
          title="Копирай директен URL към тази стъпка"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(`${window.location.origin}/${step}`);
            alert('URL копиран в клипборда!');
          }}
        >
          Копирай URL
        </a>
      </div>
    </header>
  );
};

const SurveyFooter = () => (
  <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
    <p>Препоръчваме Ви да се консултирате с Вашия лекар преди да започнете каквато и да е тренировъчна програма</p>
  </footer>
);

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
  );
};

const Index = () => {
  const { stepNumber } = useParams<{ stepNumber?: string }>();
  const initialStep = stepNumber ? parseInt(stepNumber, 10) : undefined;
  
  return (
    <SurveyProvider initialStep={initialStep}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <SurveyHeader />
        <SurveyContent />
        <SurveyFooter />
      </div>
    </SurveyProvider>
  );
};

export default Index;
