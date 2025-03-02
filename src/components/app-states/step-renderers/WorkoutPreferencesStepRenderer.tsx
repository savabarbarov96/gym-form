
import React from 'react';
import { FormData } from '@/types/survey';
import {
  WorkoutLocationStep,
  WorkoutIntensityStep,
  WorkoutFrequencyStep,
  WorkoutDurationStep,
  HormoneGraphStep,
  HeightInputStep,
  WeightInputStep,
  ExercisePreferencesStep
} from "@/components/form-steps";

interface WorkoutPreferencesStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const WorkoutPreferencesStepRenderer: React.FC<WorkoutPreferencesStepRendererProps> = ({
  step,
  formData,
  setFormData,
  handleNext
}) => {
  if (step === 12) {
    return (
      <WorkoutLocationStep
        selectedLocation={formData.workoutLocation}
        onSelect={(workoutLocation) => setFormData({...formData, workoutLocation})}
      />
    );
  }

  if (step === 13) {
    return (
      <WorkoutIntensityStep
        selectedIntensity={formData.workoutIntensity}
        onSelect={(workoutIntensity) => setFormData({...formData, workoutIntensity})}
      />
    );
  }
  
  if (step === 14) {
    return (
      <WorkoutFrequencyStep
        selected={formData.workoutFrequency}
        onSelect={(workoutFrequency) => setFormData({...formData, workoutFrequency})}
      />
    );
  }
  
  if (step === 15) {
    return (
      <WorkoutDurationStep
        selected={formData.workoutDuration}
        onSelect={(workoutDuration) => setFormData({...formData, workoutDuration})}
      />
    );
  }
  
  if (step === 16) {
    return (
      <HormoneGraphStep
        onNext={handleNext}
      />
    );
  }
  
  if (step === 17) {
    return (
      <HeightInputStep
        value={formData.height}
        onChange={(height) => setFormData({...formData, height})}
      />
    );
  }
  
  if (step === 18) {
    return (
      <WeightInputStep
        currentWeight={formData.currentWeight}
        targetWeight={formData.targetWeight}
        weightUnit={formData.weightUnit || "kg"}
        onWeightChange={({ currentWeight, targetWeight, weightUnit }) => 
          setFormData({...formData, currentWeight, targetWeight, weightUnit})}
      />
    );
  }
  
  if (step === 19) {
    return (
      <ExercisePreferencesStep
        preferences={formData.exercisePreferences || {}}
        onPreferenceChange={(exercisePreferences) => 
          setFormData({...formData, exercisePreferences})}
        onStepComplete={handleNext}
      />
    );
  }
  
  return null;
};

export default WorkoutPreferencesStepRenderer;
