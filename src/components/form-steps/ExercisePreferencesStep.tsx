import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressIndicator, ExerciseCard } from "./exercise-preferences";
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
  // List of exercises - adding Pilates and Yoga
  const exercises = ["Кардио", "Разтягане", "Вдигане на тежести", "Набирания", "Туризъм", "Катерене", "Пилатес", "Йога"];
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [localPreferences, setLocalPreferences] = useState<{[key: string]: Preference}>(preferences || {});
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;
  const allExercisesRated = exercises.every(exercise => 
    localPreferences[exercise] !== undefined && 
    localPreferences[exercise] !== null
  );

  const handlePreference = (exercise: string, preference: Preference) => {
    if (isTransitioning) return;
    
    const updatedPreferences = {
      ...localPreferences,
      [exercise]: preference
    };
    
    setLocalPreferences(updatedPreferences);
    
    // Only update parent state but don't advance automatically
    onPreferenceChange(updatedPreferences);
    
    // Move to next exercise if not the last one
    if (currentExerciseIndex < exercises.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 400);
    }
  };
  
  const handleComplete = () => {
    if (onStepComplete) {
      onStepComplete();
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Как се чувствате спрямо тези упражнения?</h1>
      
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <ExerciseCard
            key={currentExercise}
            exercise={currentExercise}
            preference={localPreferences[currentExercise] || null}
            onPreferenceChange={(preference) => handlePreference(currentExercise, preference)}
          />
        </AnimatePresence>
        
        <ProgressIndicator
          totalSteps={exercises.length}
          currentStep={currentExerciseIndex}
          isLastStep={isLastExercise}
        />
        
        {isLastExercise && allExercisesRated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Button 
              onClick={handleComplete}
              className="mt-6 bg-orange hover:bg-orange/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
            >
              Продължи <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExercisePreferencesStep; 