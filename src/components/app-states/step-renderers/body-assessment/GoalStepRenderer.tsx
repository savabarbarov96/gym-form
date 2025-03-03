
import React from 'react';
import { FormData } from '@/types/survey';
import { GoalStep } from '@/components/form-steps';

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
      value={formData.goal}
      currentBodyFat={formData.currentBodyFat}
      onChange={(goal) => setFormData(prev => ({ ...prev, goal }))}
      onCurrentBodyFatChange={(currentBodyFat) => 
        setFormData(prev => ({ ...prev, currentBodyFat }))
      }
    />
  );
};

export default GoalStepRenderer;
