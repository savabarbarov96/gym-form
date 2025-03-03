
import React from 'react';
import { FormData } from '@/types/survey';
import { 
  WorkoutLocationStep,
  WorkoutIntensityStep,
  WorkoutFrequencyStep,
  WorkoutDurationStep,
  ActivitiesStep,
  ExercisePreferencesStep,
  ProblemAreasStep,
  FitnessGoalStep
} from '@/components/form-steps';

interface WorkoutPreferencesStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const WorkoutPreferencesStepRenderer = ({
  step,
  formData,
  setFormData,
  handleNext
}: WorkoutPreferencesStepRendererProps) => {
  switch (step) {
    case 12:
      return (
        <FitnessGoalStep
          selectedGoal={formData.fitnessGoal}
          onSelect={(fitnessGoal) => 
            setFormData(prev => ({ ...prev, fitnessGoal }))
          }
        />
      );
    case 13:
      return (
        <ProblemAreasStep
          selectedAreas={formData.problemAreas}
          onSelectArea={(problemAreas) => 
            setFormData(prev => ({ ...prev, problemAreas }))
          }
        />
      );
    case 14:
      return (
        <ActivitiesStep
          selectedActivities={formData.activities}
          customActivity={formData.customActivity}
          onSelectionsChange={(activities) =>
            setFormData(prev => ({ ...prev, activities }))
          }
          onCustomActivityChange={(customActivity) =>
            setFormData(prev => ({ ...prev, customActivity }))
          }
        />
      );
    case 15:
      return (
        <WorkoutLocationStep
          selectedLocation={formData.workoutLocation}
          onSelect={(workoutLocation) => 
            setFormData(prev => ({ ...prev, workoutLocation }))
          }
        />
      );
    case 16:
      return (
        <WorkoutIntensityStep
          selectedIntensity={formData.workoutIntensity}
          onSelect={(workoutIntensity) => 
            setFormData(prev => ({ ...prev, workoutIntensity }))
          }
        />
      );
    case 17:
      return (
        <WorkoutFrequencyStep
          selected={formData.workoutFrequency}
          onSelect={(workoutFrequency) => 
            setFormData(prev => ({ ...prev, workoutFrequency }))
          }
        />
      );
    case 18:
      return (
        <WorkoutDurationStep
          selected={formData.workoutDuration}
          onSelect={(workoutDuration) => 
            setFormData(prev => ({ ...prev, workoutDuration }))
          }
        />
      );
    case 19:
      return (
        <ExercisePreferencesStep
          preferences={formData.exercisePreferences}
          onPreferenceChange={(exercisePreferences) => 
            setFormData(prev => ({ ...prev, exercisePreferences }))
          }
          onStepComplete={handleNext}
        />
      );
    default:
      return null;
  }
};

export default WorkoutPreferencesStepRenderer;
