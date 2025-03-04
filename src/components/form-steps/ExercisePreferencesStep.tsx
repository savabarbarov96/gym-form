
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ExerciseCard, ProgressIndicator } from "./exercise-preferences";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Preference = "like" | "neutral" | "dislike" | null;

interface ExercisePreferencesStepProps {
  preferences: {[key: string]: Preference};
  onPreferenceChange: (preferences: {[key: string]: Preference}) => void;
  onStepComplete?: () => void;
}

const ExercisePreferencesStep = ({ 
  preferences, 
  onPreferenceChange,
  onStepComplete
}: ExercisePreferencesStepProps) => {
  // List of exercises - limiting to exactly 6
  const exercises = ["Cardio", "Stretching", "Lifting Weights", "Pull Ups", "Hiking", "Physical Labor"];
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [localPreferences, setLocalPreferences] = useState<{[key: string]: Preference}>(preferences || {});
  
  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;
  const allExercisesRated = exercises.every(exercise => 
    localPreferences[exercise] !== undefined && 
    localPreferences[exercise] !== null
  );

  const handlePreference = (exercise: string, preference: Preference) => {
    const updatedPreferences = {
      ...localPreferences,
      [exercise]: preference
    };
    
    setLocalPreferences(updatedPreferences);
    
    // Only update parent state but don't advance automatically
    onPreferenceChange(updatedPreferences);
    
    // Move to next exercise if not the last one
    if (currentExerciseIndex < exercises.length - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
      }, 300);
    }
  };
  
  const handleComplete = () => {
    if (onStepComplete) {
      onStepComplete();
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">How do you feel about these exercises?</h1>
      
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <ExerciseCard
            key={currentExercise}
            exercise={currentExercise}
            preference={localPreferences[currentExercise] || null}
            onPreferenceSelect={(preference) => handlePreference(currentExercise, preference)}
          />
        </AnimatePresence>
        
        <ProgressIndicator
          totalSteps={exercises.length}
          currentStep={currentExerciseIndex}
          isLastStep={isLastExercise}
        />
        
        {isLastExercise && allExercisesRated && (
          <Button 
            onClick={handleComplete}
            className="mt-6 bg-orange hover:bg-orange/90 text-white"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExercisePreferencesStep;
