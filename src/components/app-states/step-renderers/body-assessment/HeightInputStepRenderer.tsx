
import React from 'react';
import { FormData } from '@/types/survey';
import { HeightInputStep } from '@/components/form-steps';

interface HeightInputStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const HeightInputStepRenderer = ({
  formData,
  setFormData
}: HeightInputStepRendererProps) => {
  return (
    <HeightInputStep
      value={formData.height}
      onChange={(height) => setFormData(prev => ({ ...prev, height }))}
    />
  );
};

export default HeightInputStepRenderer;
