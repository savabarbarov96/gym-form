
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
  // Ensure this step mapping matches the validation in bodyAssessmentValidation.ts
  switch (step) {
    case 6:
      return <HeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 7:
      return <WeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 8:
      return (
        <div className="best-shape-container">
          <BestShapeStep
            selected={formData.bestShapeTime}
            onSelect={(bestShapeTime) => setFormData({...formData, bestShapeTime})}
          />
        </div>
      );
    case 9:
      return <WeightChangeStepRenderer formData={formData} setFormData={setFormData} />;
    case 10:
      return <ProgressGraphStepRenderer formData={formData} />;
    case 11:
      return <HormoneGraphStepRenderer handleNext={handleNext} />;
    case 12:
      return <HealthConcernsStepRenderer formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};

// Import BestShapeStep directly here to avoid circular dependencies
import { BestShapeStep } from "@/components/form-steps";

export default BodyAssessmentStepRenderer;
