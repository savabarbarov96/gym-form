
import React from 'react';
import { FormData } from '@/types/survey';
import { ProblemAreasStep } from '@/components/form-steps';

interface ProblemAreasStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const ProblemAreasStepRenderer = ({
  formData,
  setFormData,
  handleNext
}: ProblemAreasStepRendererProps) => {
  console.log("Rendering Problem Areas Step", { formData });
  
  return (
    <ProblemAreasStep
      selectedAreas={formData.problemAreas}
      onSelectArea={(problemAreas) => {
        console.log("Selected problem areas:", problemAreas);
        setFormData({...formData, problemAreas});
      }}
      onStepComplete={handleNext}
    />
  );
};

export default ProblemAreasStepRenderer;
