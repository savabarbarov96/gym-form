
import React from 'react';
import { FormData } from '@/types/survey';
import { WorkoutFrequencyStep } from '@/components/form-steps';

interface WorkoutFrequencyStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const WorkoutFrequencyStepRenderer = ({
  formData,
  setFormData
}: WorkoutFrequencyStepRendererProps) => {
  return (
    <WorkoutFrequencyStep
      selected={formData.workoutFrequency}
      onSelect={(workoutFrequency) => 
        setFormData(prev => ({ ...prev, workoutFrequency }))
      }
    />
  );
};

export default WorkoutFrequencyStepRenderer;
