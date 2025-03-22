import React from "react";
import Logo from "@/components/Logo";
import { FormState, LoadingState, ResultsState, SuccessState } from "@/components/app-states";
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";
import { useParams } from "react-router-dom";
import { BackgroundSlider } from "@/components/BackgroundSlider";

const SurveyHeader = () => {
  const { step } = useSurvey();
  return (
    <header className="p-4 flex justify-between items-center border-b border-border bg-background/70 backdrop-blur-md z-10 relative">
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
    handleGetPlan,
    handleGetMealPlan,
    handleGetWorkoutPlan
  } = useSurvey();

  return (
    <main className="flex-1 overflow-x-hidden relative z-[1] pb-20">
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
        <ResultsState 
          handleGetPlan={handleGetPlan} 
          handleGetMealPlan={handleGetMealPlan} 
          handleGetWorkoutPlan={handleGetWorkoutPlan} 
        />
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
      <div className="min-h-screen bg-background text-foreground flex flex-col relative">
        {/* Using the new BackgroundSlider component */}
        <BackgroundSlider 
          interval={8000}          // 8 seconds between transitions
          transitionDuration={1200} // 1.2 seconds for transitions
          maxBackgrounds={40}
          initialLoadCount={4}
          batchSize={4}
        />
        
        <SurveyHeader />
        <SurveyContent />
      </div>
    </SurveyProvider>
  );
};

export default Index;
