
import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  // Updated exercises list as requested
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
          <motion.div
            key={currentExercise}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="bg-card p-8 rounded-xl shadow-lg mb-8 h-56 flex items-center justify-center">
              <h2 className="text-3xl font-bold">{currentExercise}</h2>
            </div>

            <div className="flex justify-center gap-8">
              <button 
                onClick={() => handlePreference(currentExercise, "dislike")}
                className={`p-4 rounded-full transition-all ${localPreferences[currentExercise] === "dislike" ? "bg-red-500" : "bg-secondary hover:bg-muted"}`}
                aria-label="Dislike"
              >
                <ThumbsDown className="w-8 h-8" />
              </button>
              
              <button 
                onClick={() => handlePreference(currentExercise, "neutral")}
                className={`p-4 rounded-full transition-all ${localPreferences[currentExercise] === "neutral" ? "bg-blue-500" : "bg-secondary hover:bg-muted"}`}
                aria-label="Neutral"
              >
                <Meh className="w-8 h-8" />
              </button>
              
              <button 
                onClick={() => handlePreference(currentExercise, "like")}
                className={`p-4 rounded-full transition-all ${localPreferences[currentExercise] === "like" ? "bg-green-500" : "bg-secondary hover:bg-muted"}`}
                aria-label="Like"
              >
                <ThumbsUp className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center mt-6">
          {exercises.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentExerciseIndex ? "bg-orange" : "bg-muted"
              }`}
            />
          ))}
        </div>
        
        <p className="mt-6 text-muted-foreground">
          {isLastExercise ? 
            "Press Continue to proceed" : 
            `${currentExerciseIndex + 1} of ${exercises.length}`
          }
        </p>
      </div>
    </div>
  );
};

export default ExercisePreferencesStep;
