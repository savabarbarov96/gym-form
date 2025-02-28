
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  age: string | null;
  bodyType: string | null;
  goal: number;
}

// Define application states
type AppState = "form" | "loading" | "results";

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState("next");
  const [formData, setFormData] = useState<FormData>({
    age: null,
    bodyType: null,
    goal: 20,
  });
  
  // Add app state
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Update progress bar based on current step
  const progress = (step / 3) * 100;
  
  // Function to submit data to webhook
  const submitToWebhook = async () => {
    try {
      // Create query parameters
      const params = new URLSearchParams();
      if (formData.age) params.append('age', formData.age);
      if (formData.bodyType) params.append('bodyType', formData.bodyType);
      params.append('goal', formData.goal.toString());
      
      // Webhook URL with query parameters
      const webhookUrl = `https://sava.automationaid.eu/webhook/8ffb7f1e-6c6f-412c-8022-eef6957d78d4?${params.toString()}`;
      
      // Send the data
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

  // Function to handle loading simulation
  const simulateLoading = () => {
    setAppState("loading");
    setLoadingProgress(0);
    
    // Calculate increments for smooth progress
    const increment = 100 / 40; // 40 increments over 8 seconds
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += increment;
      setLoadingProgress(Math.min(Math.round(currentProgress), 100));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setAppState("results");
      }
    }, 200); // Update every 200ms
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
    
    if (step < 3) {
      setAnimationDirection("next");
      setStep(prev => prev + 1);
    } else {
      // Form completion action
      toast({
        title: "Processing your plan",
        description: "We're creating your personalized fitness plan",
      });
      
      // Log form data to console
      console.log("Form submitted:", formData);
      
      // Submit to webhook and start loading simulation
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
  
  // Handle get plan button click
  const handleGetPlan = () => {
    toast({
      title: "Plan requested",
      description: "Downloading your personalized plan",
    });
    
    // Submit data to webhook again
    submitToWebhook().then((success) => {
      if (success) {
        toast({
          title: "Success",
          description: "Your plan has been generated",
        });
      } else {
        toast({
          title: "Error",
          description: "There was an error generating your plan",
          variant: "destructive",
        });
      }
    });
  };
  
  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "next" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    }),
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
      
      {/* Progress bar only shown in form state */}
      {appState === "form" && (
        <div className="w-full progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Form State */}
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
                {step === 3 ? "Complete" : "Continue"}
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* Loading State */}
        {appState === "loading" && (
          <div className="w-full max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-16"
            >
              <div className="text-2xl mb-12">Suggesting workout program</div>
              
              {/* Loading circle */}
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

        {/* Results State */}
        {appState === "results" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-16">
                Personal summary based on your answers
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
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
              
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleGetPlan();
                }}
                className="inline-flex items-center gap-2 text-white bg-orange hover:bg-orange-hover px-12 py-4 rounded-lg text-xl font-medium transition-colors"
              >
                Get my plan
                <ArrowRight size={20} />
              </a>
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

// Age Selection Step Component
const AgeSelectionStep = ({ 
  selectedAge, 
  onSelect 
}: { 
  selectedAge: string | null, 
  onSelect: (age: string) => void 
}) => {
  const ageGroups = [
    { label: "18-29", id: "18-29" },
    { label: "30-39", id: "30-39" },
    { label: "40-49", id: "40-49" },
    { label: "50+", id: "50+" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2">BUILD YOUR PERFECT BODY</h1>
      <p className="text-xl mb-12 text-muted-foreground">ACCORDING TO YOUR AGE AND BODY TYPE</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ageGroups.map((age) => (
          <div
            key={age.id}
            className={`option-card aspect-[3/4] ${selectedAge === age.id ? 'selected' : ''}`}
            onClick={() => onSelect(age.id)}
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src={`/lovable-uploads/${age.id === "18-29" ? "82f8a303-b796-47ca-a21f-603d7e9c07ba.png" : 
                       age.id === "30-39" ? "949229f9-bb7a-407e-b06a-54cc9a26b481.png" : 
                       age.id === "40-49" ? "4da1e807-08a9-43e9-a569-7c2f5d6e9591.png" : 
                       "4da1e807-08a9-43e9-a569-7c2f5d6e9591.png"}`} 
                  alt={`Age ${age.label}`}
                  className="h-full object-contain"
                />
              </div>
              <div className="mt-auto bg-orange text-white p-3 rounded-md font-medium">
                Age: {age.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Body Type Step Component
const BodyTypeStep = ({ 
  selectedType, 
  onSelect 
}: { 
  selectedType: string | null, 
  onSelect: (type: string) => void 
}) => {
  const bodyTypes = [
    { label: "Slim", id: "slim" },
    { label: "Average", id: "average" },
    { label: "Heavy", id: "heavy" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Choose your body type</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {bodyTypes.map((type) => (
          <div
            key={type.id}
            className={`option-card aspect-[3/4] ${selectedType === type.id ? 'selected' : ''}`}
            onClick={() => onSelect(type.id)}
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src={`/lovable-uploads/${type.id === "slim" ? "82f8a303-b796-47ca-a21f-603d7e9c07ba.png" : 
                       type.id === "average" ? "949229f9-bb7a-407e-b06a-54cc9a26b481.png" : 
                       "4da1e807-08a9-43e9-a569-7c2f5d6e9591.png"}`} 
                  alt={`${type.label} body type`}
                  className="h-full object-contain"
                />
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-medium">{type.label}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Goal Step Component
const GoalStep = ({ 
  value, 
  onChange 
}: { 
  value: number, 
  onChange: (value: number) => void 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/949229f9-bb7a-407e-b06a-54cc9a26b481.png" 
          alt="Body visualization"
          className="max-h-[500px] object-contain"
        />
      </div>
      
      <div className="bg-card rounded-lg p-6 flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12">Choose your level of body fat</h1>
        
        <div className="mt-8">
          <div className="bg-secondary p-4 rounded-md text-center mb-4 text-lg font-medium">
            {value}%
          </div>
          
          <Slider
            defaultValue={[value]}
            max={40}
            min={5}
            step={1}
            onValueChange={(val) => onChange(val[0])}
            className="my-8"
          />
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>5-9%</span>
            <span>&gt;40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
