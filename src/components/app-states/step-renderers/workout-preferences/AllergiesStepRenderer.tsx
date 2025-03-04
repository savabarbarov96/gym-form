
import React from 'react';
import { FormData } from '@/types/survey';
import { AllergiesStep } from '@/components/form-steps';

interface AllergiesStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const AllergiesStepRenderer = ({
  formData,
  setFormData
}: AllergiesStepRendererProps) => {
  return (
    <AllergiesStep
      selectedAllergies={formData.allergies}
      onSelect={(allergies) => 
        setFormData(prev => ({ ...prev, allergies }))
      }
    />
  );
};

export default AllergiesStepRenderer;
