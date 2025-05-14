import React from 'react';
import { FormData } from '@/types/survey';
import GoalStep from '@/components/form-steps/GoalStep';

interface GoalStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const GoalStepRenderer = ({
  formData,
  setFormData
}: GoalStepRendererProps) => {
  return (
    <GoalStep
      currentBodyFat={formData.currentBodyFat}
      onCurrentBodyFatChange={(currentBodyFat) => 
        setFormData(prev => ({ ...prev, currentBodyFat }))
      }
    />
  );
};

export default GoalStepRenderer;
