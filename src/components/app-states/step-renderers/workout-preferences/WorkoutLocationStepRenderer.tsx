
import React from 'react';
import { FormData } from '@/types/survey';
import { WorkoutLocationStep } from '@/components/form-steps';

interface WorkoutLocationStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const WorkoutLocationStepRenderer = ({
  formData,
  setFormData
}: WorkoutLocationStepRendererProps) => {
  return (
    <WorkoutLocationStep
      selectedLocation={formData.workoutLocation}
      onSelect={(workoutLocation) => 
        setFormData(prev => ({ ...prev, workoutLocation }))
      }
    />
  );
};

export default WorkoutLocationStepRenderer;
