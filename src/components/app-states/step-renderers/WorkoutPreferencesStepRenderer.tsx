
import React from 'react';
import { FormData } from '@/types/survey';
import {
  ProblemAreasStep,
  ActivitiesStep,
  WorkoutLocationStep,
  WorkoutIntensityStep,
  WorkoutFrequencyStep,
  WorkoutDurationStep,
  ExercisePreferencesStep,
  DesiredBodyStep
} from '@/components/form-steps';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  // This maps the global step number to the local step within this renderer
  const localStep = step - 12;
  
  switch (localStep) {
    case 1: // Step 13
      return (
        <ProblemAreasStep
          selectedAreas={formData.problemAreas}
          onSelectArea={(problemAreas) => setFormData(prev => ({ ...prev, problemAreas }))}
        />
      );
    
    case 2: // Step 14
      return (
        <ActivitiesStep
          selectedActivities={formData.activities}
          customActivity={formData.customActivity}
          onSelectionsChange={(activities) => setFormData(prev => ({ ...prev, activities }))}
          onCustomActivityChange={(customActivity) => setFormData(prev => ({ ...prev, customActivity }))}
        />
      );
    
    case 3: // Step 15
      return (
        <WorkoutLocationStep
          selectedLocation={formData.workoutLocation}
          onSelect={(workoutLocation) => setFormData(prev => ({ ...prev, workoutLocation }))}
        />
      );
    
    case 4: // Step 16
      return (
        <WorkoutIntensityStep
          selectedIntensity={formData.workoutIntensity}
          onSelect={(workoutIntensity) => setFormData(prev => ({ ...prev, workoutIntensity }))}
        />
      );
    
    case 5: // Step 17
      return (
        <WorkoutFrequencyStep
          selected={formData.workoutFrequency}
          onSelect={(workoutFrequency) => setFormData(prev => ({ ...prev, workoutFrequency }))}
        />
      );
    
    case 6: // Step 18
      return (
        <WorkoutDurationStep
          selected={formData.workoutDuration}
          onSelect={(workoutDuration) => setFormData(prev => ({ ...prev, workoutDuration }))}
        />
      );
    
    case 7: // Step 19
      return (
        <ExercisePreferencesStep
          preferences={formData.exercisePreferences}
          onPreferenceChange={(exercisePreferences) => {
            setFormData(prev => ({ ...prev, exercisePreferences }));
            handleNext();
          }}
        />
      );
    
    case 8: // Step 20
      return (
        <DesiredBodyStep
          selectedBody={formData.desiredBody}
          onSelect={(desiredBody) => setFormData(prev => ({ ...prev, desiredBody }))}
        />
      );
      
    default:
      return null;
  }
};

export default WorkoutPreferencesStepRenderer;
