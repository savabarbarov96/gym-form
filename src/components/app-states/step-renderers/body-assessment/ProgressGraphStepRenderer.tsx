
import React from 'react';
import { FormData } from '@/types/survey';
import { ProgressGraphStep } from '@/components/form-steps';

interface ProgressGraphStepRendererProps {
  formData: FormData;
}

const ProgressGraphStepRenderer = ({
  formData
}: ProgressGraphStepRendererProps) => {
  return (
    <ProgressGraphStep 
      goalValue={formData.goal}
      currentBodyFat={formData.currentBodyFat}
    />
  );
};

export default ProgressGraphStepRenderer;
