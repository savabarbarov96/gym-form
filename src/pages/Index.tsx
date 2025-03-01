import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, ArrowRight, CheckSquare, Check } from "lucide-react";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
  });
  
  const [appState, setAppState] = useState<AppState>("form");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const totalSteps = 9;
  
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
    
    const exitAnimation = {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    };
    
    document.querySelector('.results-container')?.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(20px)' }
      ],
      { duration: 300, easing: 'ease-out' }
    );
    
    setTimeout(() => {
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
    }, 300);
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

const FitnessGoalStep = ({ 
  selectedGoal, 
  onSelect 
}: { 
  selectedGoal: string | null, 
  onSelect: (goal: string) => void 
}) => {
  const goals = [
    { label: "Lose Weight", id: "lose-weight", image: "/lovable-uploads/4ebaaf49-4ba0-41fb-b5f4-abd901f7548c.png" },
    { label: "Gain Muscle Mass", id: "gain-muscle", image: "/lovable-uploads/8c1d1175-e256-43d0-b73e-9366eee65eb8.png" },
    { label: "Get Shredded", id: "get-shredded", image: "/lovable-uploads/aa15a6ef-769e-45dc-8fb2-87815f0041b3.png" },
    { label: "Boost Well-Being", id: "boost-wellbeing", image: "/lovable-uploads/a7e78718-1e2c-457a-a7e2-b4811e5a72aa.png" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Choose your goal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`option-card aspect-[3/2] ${selectedGoal === goal.id ? 'selected' : ''}`}
            onClick={() => onSelect(goal.id)}
          >
            <div className="p-4 flex-1 flex flex-col relative">
              <div className="flex-1 flex items-center">
                <div className="font-medium text-xl flex items-center">
                  {goal.label}
                </div>
                <img 
                  src={goal.image} 
                  alt={`${goal.label} goal`}
                  className="h-full object-contain absolute right-0 top-0 bottom-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DesiredBodyStep = ({ 
  selectedBody, 
  onSelect 
}: { 
  selectedBody: string | null, 
  onSelect: (body: string) => void 
}) => {
  const bodyTypes = [
    { label: "A few sizes smaller", id: "smaller", image: "/lovable-uploads/40fb59b5-9510-4b7b-bb48-eec384b61f02.png" },
    { label: "Fit", id: "fit", image: "/lovable-uploads/949229f9-bb7a-407e-b06a-54cc9a26b481.png" },
    { label: "Athletic", id: "athletic", image: "/lovable-uploads/6a426793-a78f-42c3-9449-6deaf13b0f41.png" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Choose the body you want</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {bodyTypes.map((type) => (
          <div
            key={type.id}
            className={`option-card aspect-[3/4] ${selectedBody === type.id ? 'selected' : ''}`}
            onClick={() => onSelect(type.id)}
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src={type.image} 
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

const ProblemAreasStep = ({ 
  selectedAreas,
  onSelectArea
}: { 
  selectedAreas: string[], 
  onSelectArea: (areas: string[]) => void 
}) => {
  const problemAreas = [
    { label: "Weak chest", id: "weak-chest", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
    { label: "Slim arms", id: "slim-arms", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
    { label: "Beer belly", id: "beer-belly", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
    { label: "Slim legs", id: "slim-legs", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
  ];

  const toggleArea = (id: string) => {
    if (selectedAreas.includes(id)) {
      onSelectArea(selectedAreas.filter(area => area !== id));
    } else {
      onSelectArea([...selectedAreas, id]);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Select problem areas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {problemAreas.map((area) => (
          <div
            key={area.id}
            className="flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer"
            onClick={() => toggleArea(area.id)}
          >
            <Checkbox 
              id={area.id}
              checked={selectedAreas.includes(area.id)}
              onCheckedChange={() => toggleArea(area.id)}
              className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
            />
            <div className="flex-1 flex items-center">
              <label htmlFor={area.id} className="text-xl cursor-pointer flex-1">{area.label}</label>
              <img 
                src={area.image} 
                alt={area.label}
                className="h-32 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BestShapeStep = ({
  selected,
  onSelect
}: {
  selected: string | null,
  onSelect: (time: string) => void
}) => {
  const options = [
    { label: "Less than a year ago", id: "less-than-year" },
    { label: "1-3 years ago", id: "1-3-years" },
    { label: "More than 3 years ago", id: "more-than-3-years" },
    { label: "Never", id: "never" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">How long ago were you in the best shape of your life?</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex">
            <div className="w-full pr-4">
              <RadioGroup value={selected || ""} onValueChange={onSelect}>
                {options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 mb-4 bg-card p-4 rounded-lg">
                    <RadioGroupItem value={option.id} id={option.id} className="text-orange" />
                    <label htmlFor={option.id} className="text-xl cursor-pointer flex-1">{option.label}</label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/af5f4a6f-fd68-4c86-8f45-d229d338e77e.png" 
                alt="Best shape visualization"
                className="h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeightChangeStep = ({
  selected,
  onSelect
}: {
  selected: string | null,
  onSelect: (type: string) => void
}) => {
  const options = [
    { label: "I gain weight fast but lose slowly", id: "gain-fast-lose-slow" },
    { label: "I gain and lose weight easily", id: "gain-lose-easily" },
    { label: "I struggle to gain weight or muscle", id: "struggle-gain" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">How does your weight typically change?</h1>
      
      <div className="max-w-2xl mx-auto">
        <RadioGroup value={selected || ""} onValueChange={onSelect}>
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 mb-4 bg-card p-4 rounded-lg">
              <RadioGroupItem value={option.id} id={option.id} className="text-orange" />
              <label htmlFor={option.id} className="text-xl cursor-pointer">{option.label}</label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

const ActivitiesStep = ({
  selectedActivities,
  onSelectActivities
}: {
  selectedActivities: string[],
  onSelectActivities: (activities: string[]) => void
}) => {
  const activities = [
    { label: "Walking outside", id: "walking-outside", emoji: "🚶" },
    { label: "Morning exercise", id: "morning-exercise", emoji: "🌅" },
    { label: "Walking my pet", id: "walking-pet", emoji: "🐕" },
    { label: "Climbing stairs frequently", id: "climbing-stairs", emoji: "🪜" },
    { label: "Spend time with my child", id: "child-time", emoji: "👶" },
    { label: "Household affairs", id: "household", emoji: "🔧" },
  ];

  const toggleActivity = (id: string) => {
    if (id === "none") {
      onSelectActivities(["none"]);
      return;
    }
    
    if (selectedActivities.includes("none")) {
      onSelectActivities([id]);
      return;
    }
    
    if (selectedActivities.includes(id)) {
      const newActivities = selectedActivities.filter(activity => activity !== id);
      onSelectActivities(newActivities.length === 0 ? ["none"] : newActivities);
    } else {
      onSelectActivities([...selectedActivities, id]);
    }
  };

  const isNoneSelected = selectedActivities.includes("none");

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Are any of these activities part of your life?</h1>
      
      <div className="max-w-2xl mx-auto space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer ${isNoneSelected ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() => toggleActivity(activity.id)}
          >
            <Checkbox 
              id={activity.id}
              checked={selectedActivities.includes(activity.id)}
              onCheckedChange={() => toggleActivity(activity.id)}
              className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
              disabled={isNoneSelected}
            />
            <label htmlFor={activity.id} className="text-xl cursor-pointer">
              {activity.label} <span className="ml-2">{activity.emoji}</span>
            </label>
          </div>
        ))}

        <div className="border-t border-border pt-4 mt-4">
          <div
            className="flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer"
            onClick={() => toggleActivity("none")}
          >
            <div className={`w-5 h-5 rounded-full border border-orange flex items-center justify-center ${isNoneSelected ? "bg-orange" : ""}`}>
              {isNoneSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <label className="text-xl cursor-pointer">None of the above</label>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressGraph = () => {
  const progressData = [
    { month: 'Month 1', progress: 10 },
    { month: 'Month 2', progress: 25 },
    { month: 'Month 3', progress: 45 },
    { month: 'Month 4', progress: 60 },
    { month: 'Month 5', progress: 80 },
    { month: 'Month 6', progress: 100 },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={progressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--orange)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--orange)" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#222', 
              borderColor: '#333',
              color: '#fff' 
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="progress" 
            stroke="var(--orange)" 
            fillOpacity={1} 
            fill="url(#progressGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Index;
