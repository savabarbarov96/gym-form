import React from "react";
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
  HealthConcernsStep,
  WorkoutLocationStep,
  WorkoutIntensityStep,
  WorkoutFrequencyStep,
  WorkoutDurationStep,
  HormoneGraphStep,
  HeightInputStep,
  WeightInputStep,
  ExercisePreferencesStep,
  SugaryFoodsStep,
  WaterIntakeStep,
  TypicalDayStep,
  EnergyLevelsStep
} from "@/components/form-steps";
import { ChevronRight } from "lucide-react";

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
  workoutLocation: string | null;
  workoutIntensity: string | null;
  workoutFrequency: string | null;
  workoutDuration: string | null;
  height: string | null;
  currentWeight: string | null;
  targetWeight: string | null;
  weightUnit: "kg" | "lbs";
  exercisePreferences: {
    [key: string]: "like" | "neutral" | "dislike" | null;
  };
  sugaryFoods: string | null;
  waterIntake: number | null;
  typicalDay: string | null;
  energyLevels: number | null;
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
              onSelectArea={(problemAreas) => setFormData({...formData, problemAreas})}
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

          {step === 12 && (
            <WorkoutLocationStep
              selectedLocation={formData.workoutLocation}
              onSelect={(workoutLocation) => setFormData({...formData, workoutLocation})}
            />
          )}

          {step === 13 && (
            <WorkoutIntensityStep
              selectedIntensity={formData.workoutIntensity}
              onSelect={(workoutIntensity) => setFormData({...formData, workoutIntensity})}
            />
          )}
          
          {step === 14 && (
            <WorkoutFrequencyStep
              selected={formData.workoutFrequency}
              onSelect={(workoutFrequency) => setFormData({...formData, workoutFrequency})}
            />
          )}
          
          {step === 15 && (
            <WorkoutDurationStep
              selected={formData.workoutDuration}
              onSelect={(workoutDuration) => setFormData({...formData, workoutDuration})}
            />
          )}
          
          {step === 16 && (
            <HormoneGraphStep
              onNext={handleNext}
            />
          )}
          
          {step === 17 && (
            <HeightInputStep
              value={formData.height}
              onChange={(height) => setFormData({...formData, height})}
            />
          )}
          
          {step === 18 && (
            <WeightInputStep
              currentWeight={formData.currentWeight}
              targetWeight={formData.targetWeight}
              weightUnit={formData.weightUnit || "kg"}
              onWeightChange={({ currentWeight, targetWeight, weightUnit }) => 
                setFormData({...formData, currentWeight, targetWeight, weightUnit})}
            />
          )}
          
          {step === 19 && (
            <ExercisePreferencesStep
              preferences={formData.exercisePreferences || {}}
              onPreferenceChange={(exercisePreferences) => 
                setFormData({...formData, exercisePreferences})}
            />
          )}
          
          {step === 20 && (
            <SugaryFoodsStep
              selected={formData.sugaryFoods}
              onSelect={(sugaryFoods) => setFormData({...formData, sugaryFoods})}
            />
          )}
          
          {step === 21 && (
            <WaterIntakeStep
              value={formData.waterIntake}
              onChange={(waterIntake) => setFormData({...formData, waterIntake})}
            />
          )}
          
          {step === 22 && (
            <TypicalDayStep
              selected={formData.typicalDay}
              onSelect={(typicalDay) => setFormData({...formData, typicalDay})}
            />
          )}
          
          {step === 23 && (
            <EnergyLevelsStep
              value={formData.energyLevels}
              onChange={(energyLevels) => setFormData({...formData, energyLevels})}
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
        {/* Don't show the continue button on the hormone graph step */}
        {step !== 16 && (
          <button 
            onClick={handleNext}
            className="px-6 py-3 bg-orange hover:bg-orange-hover text-white rounded-lg ml-auto flex items-center gap-2 transition-colors"
          >
            {step === totalSteps ? "Complete" : "Continue"}
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </>
  );
};

export default FormState;
