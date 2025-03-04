
import React from 'react';
import { FormData } from '@/types/survey';
import {
  HeightInputStepRenderer,
  WeightInputStepRenderer,
  GoalStepRenderer,
  ProgressGraphStepRenderer,
  HormoneGraphStepRenderer,
  HealthConcernsStepRenderer,
  WeightChangeStepRenderer
} from './body-assessment';
import { BestShapeStep } from "@/components/form-steps";

interface BodyAssessmentStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const BodyAssessmentStepRenderer = ({
  step,
  formData,
  setFormData,
  handleNext
}: BodyAssessmentStepRendererProps) => {
  // Adjust for the new gender step (step + 1)
  const localStep = step - 6;
  
  switch (localStep) {
    case 1:
      return <HeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 2:
      return <WeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 3:
      return (
        <div className="best-shape-container">
          <BestShapeStep
            selected={formData.bestShapeTime}
            onSelect={(bestShapeTime) => setFormData({...formData, bestShapeTime})}
          />
        </div>
      );
    case 4:
      return <WeightChangeStepRenderer formData={formData} setFormData={setFormData} />;
    case 5:
      return <ProgressGraphStepRenderer formData={formData} />;
    case 6:
      return <HormoneGraphStepRenderer handleNext={handleNext} />;
    case 7:
      return <HealthConcernsStepRenderer formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};

export default BodyAssessmentStepRenderer;
