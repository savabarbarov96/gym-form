import React from "react";
import Logo from "@/components/Logo";
import { FormState, LoadingState, ResultsState, SuccessState } from "@/components/app-states";
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

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
        {/* Background bodybuilder image with overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          {/* Static bodybuilder image */}
          <img 
            src="https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=1974&auto=format&fit=crop" 
            alt="Bodybuilder" 
            className="w-full h-full object-cover object-center"
          />
          
          {/* Dark overlay with gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-slate-900/90 mix-blend-multiply"></div>
          
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-blue-900/20 mix-blend-overlay"
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
            }}
            transition={{ 
              duration: 15, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          
          {/* Light beams effect */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div 
              className="absolute -inset-full h-[500%] w-[500%] bg-gradient-radial from-white/5 to-transparent opacity-30"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
              }}
              style={{ transformOrigin: "60% 30%" }}
            ></motion.div>
          </motion.div>
          
          {/* Mesh pattern overlay */}
          <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] bg-repeat opacity-10"></div>
        </div>
        
        <SurveyHeader />
        <SurveyContent />
      </div>
    </SurveyProvider>
  );
};

export default Index;
