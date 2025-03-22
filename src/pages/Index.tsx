import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { FormState, LoadingState, ResultsState, SuccessState } from "@/components/app-states";
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { preloadImages, getBackgroundPaths, detectBackgroundCount } from "@/utils/imagePreloader";

// Custom hook for background rotation
const useBackgroundRotation = (maxBackgrounds = 40, intervalMs = 10000) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBackgrounds, setTotalBackgrounds] = useState(5); // Default to 5 until detection completes
  const [backgroundPaths, setBackgroundPaths] = useState<string[]>([]);
  
  // First, detect how many background images are available
  useEffect(() => {
    const detectBackgrounds = async () => {
      setIsLoading(true);
      try {
        const result = await detectBackgroundCount(maxBackgrounds);
        const { count, extensions } = result;
        console.log(`Detected ${count} background images with various extensions`);
        setTotalBackgrounds(count);
        
        // Now preload the detected images with their correct extensions
        const paths = getBackgroundPaths(count, extensions);
        setBackgroundPaths(paths);
        
        await preloadImages(paths);
        console.log('Background images preloaded successfully:', paths);
        
        // Set initial random indexes
        setCurrentBgIndex(Math.floor(Math.random() * count));
        setNextBgIndex(Math.floor(Math.random() * count));
      } catch (error) {
        console.error("Failed during background detection or preloading:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    detectBackgrounds();
  }, [maxBackgrounds]);
  
  useEffect(() => {
    if (isLoading || backgroundPaths.length === 0) return; // Don't start rotation until images are loaded
    
    const rotateBackground = () => {
      // Save the current index as the previous
      setCurrentBgIndex(nextBgIndex);
      
      // Select a new random index different from the current one
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * totalBackgrounds);
      } while (newIndex === nextBgIndex && totalBackgrounds > 1);
      
      setNextBgIndex(newIndex);
      console.log(`Rotating to random background index: ${newIndex} of ${totalBackgrounds} total`);
    };
    
    const intervalId = setInterval(rotateBackground, intervalMs);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [totalBackgrounds, intervalMs, isLoading, nextBgIndex, backgroundPaths]);
  
  return { currentBgIndex, nextBgIndex, isLoading, totalBackgrounds, backgroundPaths };
};

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
  
  // Use the background rotation hook with dynamic background detection
  const { currentBgIndex, nextBgIndex, isLoading, totalBackgrounds, backgroundPaths } = useBackgroundRotation(40, 10000);
  
  // Log the current background image path whenever it changes
  useEffect(() => {
    if (backgroundPaths.length > 0) {
      const imagePath = backgroundPaths[currentBgIndex];
      console.log(`Current background image: ${imagePath} (${currentBgIndex + 1} of ${totalBackgrounds})`);
    }
  }, [currentBgIndex, totalBackgrounds, backgroundPaths]);
  
  // Get current image path safely
  const getCurrentImagePath = (index: number) => {
    if (backgroundPaths.length === 0) return '';
    return backgroundPaths[index % backgroundPaths.length];
  };
  
  return (
    <SurveyProvider initialStep={initialStep}>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative">
        {/* Background images with overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          {/* Side-by-side portrait background images */}
          <div className="flex h-full w-full">
            {/* Left image - with zoom out effect */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <img 
                src={getCurrentImagePath(currentBgIndex)}
                alt="Background Left" 
                className={`w-full h-full object-cover transition-all duration-2500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ 
                  transform: 'scale(0.8)', // Increased zoom out
                  filter: 'brightness(1.2)' // Make image lighter
                }}
              />
            </div>
            
            {/* Right image - using next random background */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <img 
                src={getCurrentImagePath(nextBgIndex)}
                alt="Background Right" 
                className={`w-full h-full object-cover transition-all duration-2500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ 
                  transform: 'scale(0.8)', // Increased zoom out
                  filter: 'brightness(1.2) hue-rotate(15deg)' // Lighter + hue
                }}
              />
            </div>
          </div>
          
          {/* Lighter dark overlay with gradients - slightly lighter */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-slate-900/65 mix-blend-multiply z-[2]"></div>
          
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
