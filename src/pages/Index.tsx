import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, ArrowRight, Check } from "lucide-react";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import {
  AgeSelectionStep,
  BodyTypeStep,
  GoalStep,
  FitnessGoalStep,
  DesiredBodyStep,
  ProblemAreasStep,
  BestShapeStep,
  WeightChangeStep,
  ActivitiesStep,
  ProgressGraphStep,
  HealthConcernsStep
} from "@/components/form-steps";

interface FormData {
  age: string | null;
  bodyType: string | null;
  goal: number;
  fitnessGoal: string | null;
  desiredBody: string | null;
  problemAreas: string[];
  bestShapeTime: string | null;
  weightChange: string | null;
  activities: string[];
  healthConcerns: string[];
}

type AppState = "form" | "loading" | "results";

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState("next");
  const [formData, setFormData] = useState<FormData>({
    age: null,
    bodyType: null,
    goal: 20,
    fitnessGoal: null,
    desiredBody: null,
    problemAreas: [],
    bestShapeTime: null,
    weightChange: null,
    activities: [],
    healthConcerns: [],
  });
  
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const totalSteps = 11; // Updated to include the two new steps
  
  const progress = (step / totalSteps) * 100;
  
  const submitToWebhook = async () => {
    try {
      const params = new URLSearchParams();
      if (formData.age) params.append('age', formData.age);
      if (formData.bodyType) params.append('bodyType', formData.bodyType);
      params.append('goal', formData.goal.toString());
      if (formData.fitnessGoal) params.append('fitnessGoal', formData.fitnessGoal);
      if (formData.desiredBody) params.append('desiredBody', formData.desiredBody);
      if (formData.problemAreas.length > 0) params.append('problemAreas', formData.problemAreas.join(','));
      if (formData.bestShapeTime) params.append('bestShapeTime', formData.bestShapeTime);
      if (formData.weightChange) params.append('weightChange', formData.weightChange);
      if (formData.activities.length > 0) params.append('activities', formData.activities.join(','));
      if (formData.healthConcerns.length > 0) params.append('healthConcerns', formData.healthConcerns.join(','));
      
      const webhookUrl = `https://sava.automationaid.eu/webhook/8ffb7f1e-6c6f-412c-8022-eef6957d78d4?${params.toString()}`;
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      
      return true;
    } catch (error) {
      console.error('Error submitting data:', error);
      return false;
    }
  };

  const simulateLoading = () => {
    setAppState("loading");
    setLoadingProgress(0);
    
    const increment = 100 / 40;
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += increment;
      setLoadingProgress(Math.min(Math.round(currentProgress), 100));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setAppState("results");
      }
    }, 200);
  };

  const handleNext = () => {
    if (step === 1 && !formData.age) {
      toast({
        title: "Selection required",
        description: "Please select your age group to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !formData.bodyType) {
      toast({
        title: "Selection required",
        description: "Please select your body type to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 4 && !formData.fitnessGoal) {
      toast({
        title: "Selection required",
        description: "Please select your fitness goal to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 5 && !formData.desiredBody) {
      toast({
        title: "Selection required",
        description: "Please select your desired body to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 7 && !formData.bestShapeTime) {
      toast({
        title: "Selection required",
        description: "Please select when you were in your best shape to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 8 && !formData.weightChange) {
      toast({
        title: "Selection required",
        description: "Please select how your weight typically changes to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 9 && formData.activities.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one activity or 'None of the above' to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 11 && formData.healthConcerns.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select a health concern or 'None of the above' to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step < totalSteps) {
      setAnimationDirection("next");
      setStep(prev => prev + 1);
    } else {
      toast({
        title: "Processing your plan",
        description: "We're creating your personalized fitness plan",
      });
      
      console.log("Form submitted:", formData);
      
      submitToWebhook().then(() => {
        simulateLoading();
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setAnimationDirection("back");
      setStep(prev => prev - 1);
    }
  };
  
  const handleGetPlan = () => {
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
    
    submitToWebhook().then((success) => {
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

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "next" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "next" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-4 flex justify-between items-center border-b border-border">
        <Logo />
        <div className="text-sm">BUILD YOUR PERFECT BODY</div>
      </header>
      
      {appState === "form" && (
        <div className="w-full progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {appState === "form" && (
          <>
            <AnimatePresence custom={animationDirection} mode="wait">
              <motion.div
                key={step}
                custom={animationDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full max-w-4xl mx-auto"
              >
                {step === 1 && (
                  <AgeSelectionStep 
                    selectedAge={formData.age}
                    onSelect={(age) => setFormData({...formData, age})}
                  />
                )}
                
                {step === 2 && (
                  <BodyTypeStep 
                    selectedType={formData.bodyType}
                    onSelect={(bodyType) => setFormData({...formData, bodyType})}
                  />
                )}
                
                {step === 3 && (
                  <GoalStep 
                    value={formData.goal} 
                    onChange={(goal) => setFormData({...formData, goal})}
                  />
                )}

                {step === 4 && (
                  <FitnessGoalStep 
                    selectedGoal={formData.fitnessGoal}
                    onSelect={(fitnessGoal) => setFormData({...formData, fitnessGoal})}
                  />
                )}

                {step === 5 && (
                  <DesiredBodyStep 
                    selectedBody={formData.desiredBody}
                    onSelect={(desiredBody) => setFormData({...formData, desiredBody})}
                  />
                )}

                {step === 6 && (
                  <ProblemAreasStep 
                    selectedAreas={formData.problemAreas}
                    onSelectArea={(areas) => setFormData({...formData, problemAreas: areas})}
                  />
                )}

                {step === 7 && (
                  <BestShapeStep 
                    selected={formData.bestShapeTime}
                    onSelect={(bestShapeTime) => setFormData({...formData, bestShapeTime})}
                  />
                )}

                {step === 8 && (
                  <WeightChangeStep 
                    selected={formData.weightChange}
                    onSelect={(weightChange) => setFormData({...formData, weightChange})}
                  />
                )}

                {step === 9 && (
                  <ActivitiesStep 
                    selectedActivities={formData.activities}
                    onSelectActivities={(activities) => setFormData({...formData, activities})}
                  />
                )}
                
                {step === 10 && (
                  <ProgressGraphStep 
                    goalValue={formData.goal}
                  />
                )}
                
                {step === 11 && (
                  <HealthConcernsStep 
                    selectedConcerns={formData.healthConcerns}
                    onSelectConcerns={(healthConcerns) => setFormData({...formData, healthConcerns})}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-8 flex gap-4 w-full max-w-4xl mx-auto">
              {step > 1 && (
                <button 
                  onClick={handleBack}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Back
                </button>
              )}
              <button 
                onClick={handleNext}
                className="px-6 py-3 bg-orange hover:bg-orange-hover text-white rounded-lg ml-auto flex items-center gap-2 transition-colors"
              >
                {step === totalSteps ? "Complete" : "Continue"}
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}

        {appState === "loading" && (
          <div className="w-full max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-16"
            >
              <div className="text-2xl mb-12">Suggesting workout program</div>
              
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="stroke-secondary" 
                    strokeWidth="8" 
                    fill="transparent" 
                    r="46" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="stroke-orange" 
                    strokeWidth="8" 
                    fill="transparent" 
                    r="46" 
                    cx="50" 
                    cy="50" 
                    strokeDasharray="289.03px" 
                    strokeDashoffset={289.03 - (289.03 * loadingProgress) / 100} 
                    strokeLinecap="round" 
                    style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                  {loadingProgress}%
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {appState === "results" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto results-container"
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-16">
                Personal summary based on your answers
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-card p-6 rounded-lg">
                  <img 
                    src="/lovable-uploads/40fb59b5-9510-4b7b-bb48-eec384b61f02.png"
                    alt="Current body" 
                    className="max-h-96 mx-auto"
                  />
                  <div className="mt-4 text-xl font-bold">Now</div>
                  
                  <div className="mt-6 text-left">
                    <div className="mb-4">
                      <div className="text-muted-foreground">Body fat</div>
                      <div className="text-orange text-xl font-semibold">20-24%</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-muted-foreground">Fitness age</div>
                      <div className="text-orange text-xl font-semibold">36</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground">Body muscles</div>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div 
                            key={i} 
                            className={`h-1 flex-1 ${i <= 2 ? 'bg-orange' : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-6 rounded-lg">
                  <img 
                    src="/lovable-uploads/6a426793-a78f-42c3-9449-6deaf13b0f41.png"
                    alt="Goal body" 
                    className="max-h-96 mx-auto"
                  />
                  <div className="mt-4 text-xl font-bold">6 months</div>
                  
                  <div className="mt-6 text-left">
                    <div className="mb-4">
                      <div className="text-muted-foreground">Body fat</div>
                      <div className="text-orange text-xl font-semibold">15-17%</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-muted-foreground">Fitness age</div>
                      <div className="text-orange text-xl font-semibold">32</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground">Body muscles</div>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div 
                            key={i} 
                            className={`h-1 flex-1 ${i <= 4 ? 'bg-orange' : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mb-16">
                *The image is not intended to represent the user. Results vary per person and are not guaranteed.
              </div>
              
              <motion.a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleGetPlan();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-white bg-orange hover:bg-orange-hover px-12 py-4 rounded-lg text-xl font-medium transition-colors"
              >
                Get my plan
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </main>
      
      <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>We recommend that you consult with your physician before beginning any exercise program</p>
      </footer>
    </div>
  );
};

export default Index;
