
import React from 'react';
import { FormData } from '@/types/survey';
import { ProblemAreasStep } from '@/components/form-steps';

interface ProblemAreasStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ProblemAreasStepRenderer = ({
  formData,
  setFormData
}: ProblemAreasStepRendererProps) => {
  return (
    <ProblemAreasStep
      selectedAreas={formData.problemAreas}
      onSelectArea={(problemAreas) => 
        setFormData(prev => ({ ...prev, problemAreas }))
      }
    />
  );
};

export default ProblemAreasStepRenderer;
