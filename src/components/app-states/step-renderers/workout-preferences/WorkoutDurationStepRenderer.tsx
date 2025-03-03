
import React from 'react';
import { FormData } from '@/types/survey';
import { WorkoutDurationStep } from '@/components/form-steps';

interface WorkoutDurationStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const WorkoutDurationStepRenderer = ({
  formData,
  setFormData
}: WorkoutDurationStepRendererProps) => {
  return (
    <WorkoutDurationStep
      selected={formData.workoutDuration}
      onSelect={(workoutDuration) => 
        setFormData(prev => ({ ...prev, workoutDuration }))
      }
    />
  );
};

export default WorkoutDurationStepRenderer;
