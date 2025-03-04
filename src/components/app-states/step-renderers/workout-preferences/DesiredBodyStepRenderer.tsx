
import React from 'react';
import { FormData } from '@/types/survey';
import { DesiredBodyStep } from '@/components/form-steps';

interface DesiredBodyStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const DesiredBodyStepRenderer = ({
  formData,
  setFormData
}: DesiredBodyStepRendererProps) => {
  return (
    <DesiredBodyStep
      selectedBody={formData.desiredBody}
      onSelect={(desiredBody) => 
        setFormData(prev => ({ ...prev, desiredBody }))
      }
    />
  );
};

export default DesiredBodyStepRenderer;
