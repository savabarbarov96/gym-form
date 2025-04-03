import React, { useState, useEffect } from "react";
import TestimonialSlider from "@/components/TestimonialSlider";
import { FormState, LoadingState, ResultsState, SuccessState } from "@/components/app-states";
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import { preloadImages, getBackgroundPaths, detectBackgroundCount, getSafeBackgroundPath } from "@/utils/imagePreloader";
import LogoPlaceholder from "@/components/LogoPlaceholder";

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
        const paths = getBackgroundPaths();
        setBackgroundPaths(paths);
        
        await preloadImages(paths);
        console.log('Background images preloaded successfully:', paths);
        
        // Set initial random indexes (make sure they're different)
        if (count > 1) {
          const leftIndex = Math.floor(Math.random() * count);
          let rightIndex;
          do {
            rightIndex = Math.floor(Math.random() * count);
          } while (rightIndex === leftIndex);
          
          setCurrentBgIndex(leftIndex);
          setNextBgIndex(rightIndex);
        } else {
          setCurrentBgIndex(0);
          setNextBgIndex(0);
        }
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
      // Generate two new different random indexes
      if (totalBackgrounds > 1) {
        let newLeftIndex, newRightIndex;
        
        // Select a new left index different from both current ones
        do {
          newLeftIndex = Math.floor(Math.random() * totalBackgrounds);
        } while ((newLeftIndex === currentBgIndex || newLeftIndex === nextBgIndex) && totalBackgrounds > 2);
        
        // Select a new right index different from the new left one and current ones if possible
        do {
          newRightIndex = Math.floor(Math.random() * totalBackgrounds);
        } while (newRightIndex === newLeftIndex && totalBackgrounds > 1);
        
        setCurrentBgIndex(newLeftIndex);
        setNextBgIndex(newRightIndex);
        console.log(`Rotating to random backgrounds: left=${newLeftIndex}, right=${newRightIndex} of ${totalBackgrounds} total`);
      }
    };
    
    const intervalId = setInterval(rotateBackground, intervalMs);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [totalBackgrounds, intervalMs, isLoading, currentBgIndex, nextBgIndex, backgroundPaths]);
  
  return { currentBgIndex, nextBgIndex, isLoading, totalBackgrounds, backgroundPaths };
};

const SurveyHeader = () => {
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);

  return (
    <header className="py-3 px-4 sm:px-6 md:px-8 border-b border-border/50 bg-zinc-900 z-10 relative shadow-md flex justify-between items-center">
      {/* Logo container */}
      <div className="flex items-start">
        <LogoPlaceholder className="h-14 w-auto" />
      </div>
      
      {/* Testimonials button */}
      <button
        onClick={() => setIsTestimonialsOpen(true)}
        className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-all duration-200 transform hover:scale-105"
      >
        <MessageSquareQuote size={20} className="mr-2" />
        Мнения на клиенти
      </button>
      
      <TestimonialSlider 
        isOpen={isTestimonialsOpen} 
        onClose={() => setIsTestimonialsOpen(false)}
        autoScrollInterval={10000}
      />
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
  
  // Track transitions for animation effects
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [opacity, setOpacity] = useState(isLoading ? 0 : 1);
  
  // Handle initial loading state
  useEffect(() => {
    if (!isLoading && backgroundPaths.length > 0) {
      // Fade in the backgrounds when they're ready
      setTimeout(() => setOpacity(1), 300);
    }
  }, [isLoading, backgroundPaths]);
  
  // Log the current background image path whenever it changes
  useEffect(() => {
    if (backgroundPaths.length > 0 && !isLoading) {
      const leftImagePath = backgroundPaths[currentBgIndex];
      const rightImagePath = backgroundPaths[nextBgIndex];
      console.log(`Current backgrounds: left=${leftImagePath}, right=${rightImagePath}`);
      
      // Sophisticated transition animation sequence
      const fadeOut = async () => {
        // Begin transition
        setIsTransitioning(true);
        
        // First fade out slightly
        setOpacity(0.6);
        
        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Fade back in
        setOpacity(1);
        
        // Complete transition after fade in
        setTimeout(() => setIsTransitioning(false), 700);
      };
      
      fadeOut();
      
      // Clean up any pending timeouts
      return () => {
        setIsTransitioning(false);
        setOpacity(1);
      };
    }
  }, [currentBgIndex, nextBgIndex, totalBackgrounds, backgroundPaths, isLoading]);
  
  // Get current image path safely with fallback to a known good background
  const getCurrentImagePath = (index: number) => {
    if (backgroundPaths.length === 0) return getSafeBackgroundPath();
    
    const path = backgroundPaths[index % backgroundPaths.length];
    // Return fallback if path is undefined or empty
    return path && path.trim() !== '' ? path : getSafeBackgroundPath();
  };
  
  return (
    <SurveyProvider initialStep={initialStep}>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative">
        {/* Background images with overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          {/* Loading overlay - visible only during initial load */}
          {isLoading && (
            <div className="absolute inset-0 bg-black z-30 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white text-lg">Зареждане на фона...</p>
              </div>
            </div>
          )}
        
          {/* Background images container - responsive for mobile/desktop */}
          <div className="flex h-full w-full">
            {/* Left image - full width on mobile, half width on desktop */}
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              <img 
                src={getCurrentImagePath(currentBgIndex)}
                alt="Background" 
                className="w-full h-full object-cover"
                style={{ 
                  transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
                  opacity: opacity,
                  filter: isTransitioning ? 'brightness(1.1)' : 'brightness(1.2)',
                  transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), filter 1.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              />
            </div>
            
            {/* Right image - hidden on mobile, visible on desktop */}
            <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden">
              <img 
                src={getCurrentImagePath(nextBgIndex)}
                alt="Background Right" 
                className="w-full h-full object-cover"
                style={{ 
                  transform: isTransitioning ? 'scale(1.02)' : 'scale(1)', 
                  opacity: opacity,
                  filter: isTransitioning ? 'brightness(1.1) hue-rotate(10deg)' : 'brightness(1.2) hue-rotate(15deg)',
                  transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), filter 1.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              />
            </div>
          </div>
          
          {/* Lighter dark overlay with gradients - slightly lighter */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-slate-900/65 mix-blend-multiply z-[2]"></div>
          
          {/* Animated gradient overlay - smoother transition */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-blue-900/20 mix-blend-overlay"
            animate={{ 
              opacity: [0.4, 0.6, 0.4],
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
            }}
            transition={{ 
              duration: 25, // Even slower for smoother effect
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "mirror" // Smoother repeat type
            }}
          ></motion.div>
          
          {/* Light beams effect - improved smoothness */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }} // Lower opacity for subtlety
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <motion.div 
              className="absolute -inset-full h-[500%] w-[500%] bg-gradient-radial from-white/5 to-transparent opacity-20"
              animate={{ 
                rotate: 360,
                scale: [1, 1.03, 1] // Reduced scale for subtler effect
              }}
              transition={{ 
                rotate: { duration: 40, repeat: Infinity, ease: "linear" }, // Even slower rotation
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" } // Smoother scaling
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
