
import React from 'react';
import { FormData } from '@/types/survey';
import { HealthConcernsStep } from '@/components/form-steps';

interface HealthConcernsStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const HealthConcernsStepRenderer = ({
  formData,
  setFormData
}: HealthConcernsStepRendererProps) => {
  return (
    <HealthConcernsStep
      selectedOptions={formData.healthConcerns}
      customOption={formData.customHealthConcern}
      onSelectionChange={(healthConcerns) => 
        setFormData(prev => ({ ...prev, healthConcerns }))
      }
      onCustomOptionChange={(customHealthConcern) => 
        setFormData(prev => ({ ...prev, customHealthConcern }))
      }
    />
  );
};

export default HealthConcernsStepRenderer;
