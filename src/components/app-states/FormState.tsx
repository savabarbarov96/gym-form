
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight } from "lucide-react";
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

interface FormStateProps {
  step: number;
  totalSteps: number;
  animationDirection: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
  handleBack: () => void;
}

const FormState: React.FC<FormStateProps> = ({ 
  step, 
  totalSteps, 
  animationDirection, 
  formData, 
  setFormData, 
  handleNext, 
  handleBack 
}) => {
  const progress = (step / totalSteps) * 100;
  
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
    <>
      <div className="w-full progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
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
  );
};

export default FormState;
