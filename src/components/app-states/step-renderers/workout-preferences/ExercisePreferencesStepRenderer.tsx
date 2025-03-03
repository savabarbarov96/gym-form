
import React from 'react';
import { FormData } from '@/types/survey';
import { ExercisePreferencesStep } from '@/components/form-steps';

interface ExercisePreferencesStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const ExercisePreferencesStepRenderer = ({
  formData,
  setFormData,
  handleNext
}: ExercisePreferencesStepRendererProps) => {
  return (
    <ExercisePreferencesStep
      preferences={formData.exercisePreferences}
      onPreferenceChange={(exercisePreferences) => 
        setFormData(prev => ({ ...prev, exercisePreferences }))
      }
      onStepComplete={handleNext}
    />
  );
};

export default ExercisePreferencesStepRenderer;
