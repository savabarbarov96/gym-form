
import React from 'react';
import { FormData } from '@/types/survey';
import { FitnessGoalStep } from '@/components/form-steps';

interface FitnessGoalStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FitnessGoalStepRenderer = ({
  formData,
  setFormData
}: FitnessGoalStepRendererProps) => {
  return (
    <FitnessGoalStep
      selectedGoal={formData.fitnessGoal}
      onSelect={(fitnessGoal) => 
        setFormData(prev => ({ ...prev, fitnessGoal }))
      }
    />
  );
};

export default FitnessGoalStepRenderer;
