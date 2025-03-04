
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ExerciseCard, ProgressIndicator } from "./exercise-preferences";

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

  // Handle auto-advancing to next step after rating last exercise
  useEffect(() => {
    // If this is the last exercise and it has a preference, auto-advance after a delay
    if (isLastExercise && 
        localPreferences[currentExercise] !== undefined && 
        localPreferences[currentExercise] !== null) {
      const timer = setTimeout(() => {
        if (onStepComplete) onStepComplete();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isLastExercise, localPreferences, currentExercise, onStepComplete]);

  const handlePreference = (exercise: string, preference: Preference) => {
    const updatedPreferences = {
      ...localPreferences,
      [exercise]: preference
    };
    
    setLocalPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
    
    // Move to next exercise if not the last one
    if (currentExerciseIndex < exercises.length - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
      }, 300);
    }
    // We don't need an else statement here as the useEffect will handle advancing to the next step
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
      </div>
    </div>
  );
};

export default ExercisePreferencesStep;
