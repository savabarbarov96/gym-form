
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
  console.log("Rendering HeightInputStepRenderer with value:", formData.height);
  
  const handleHeightChange = (height: string) => {
    console.log("Height changed to:", height);
    setFormData(prev => ({ ...prev, height }));
  };
  
  return (
    <HeightInputStep
      value={formData.height}
      onChange={handleHeightChange}
    />
  );
};

export default HeightInputStepRenderer;
