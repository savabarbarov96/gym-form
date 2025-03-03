
import React from 'react';
import { FormData } from '@/types/survey';
import { WeightChangeStep } from "@/components/form-steps";

interface WeightChangeStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const WeightChangeStepRenderer = ({ formData, setFormData }: WeightChangeStepRendererProps) => {
  return (
    <WeightChangeStep 
      selected={formData.weightChange}
      onSelect={(weightChange) => setFormData({...formData, weightChange})}
    />
  );
};

export default WeightChangeStepRenderer;
