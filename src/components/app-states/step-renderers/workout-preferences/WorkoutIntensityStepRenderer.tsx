
import React from 'react';
import { FormData } from '@/types/survey';
import { WorkoutIntensityStep } from '@/components/form-steps';

interface WorkoutIntensityStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const WorkoutIntensityStepRenderer = ({
  formData,
  setFormData
}: WorkoutIntensityStepRendererProps) => {
  return (
    <WorkoutIntensityStep
      selectedIntensity={formData.workoutIntensity}
      onSelect={(workoutIntensity) => 
        setFormData(prev => ({ ...prev, workoutIntensity }))
      }
    />
  );
};

export default WorkoutIntensityStepRenderer;
