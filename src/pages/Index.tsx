
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { ChevronRight } from "lucide-react";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  age: string | null;
  bodyType: string | null;
  goal: number;
}

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState("next");
  const [formData, setFormData] = useState<FormData>({
    age: null,
    bodyType: null,
    goal: 20,
  });

  // Update progress bar based on current step
  const progress = (step / 3) * 100;
  
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
        title: "Success!",
        description: "Your fitness profile has been created",
      });
      console.log("Form submitted:", formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setAnimationDirection("back");
      setStep(prev => prev - 1);
    }
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
      
      {/* Progress bar */}
      <div className="w-full progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
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
