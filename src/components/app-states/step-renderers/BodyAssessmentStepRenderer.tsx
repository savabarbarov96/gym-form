
import React from 'react';
import { FormData } from '@/types/survey';
import {
  HeightInputStepRenderer,
  WeightInputStepRenderer,
  GoalStepRenderer,
  ProgressGraphStepRenderer,
  HormoneGraphStepRenderer,
  HealthConcernsStepRenderer
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
  switch (step) {
    case 6:
      return <HeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 7:
      return <WeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 8:
      return <GoalStepRenderer formData={formData} setFormData={setFormData} />;
    case 9:
      return <ProgressGraphStepRenderer formData={formData} />;
    case 10:
      return <HormoneGraphStepRenderer handleNext={handleNext} />;
    case 11:
      return <HealthConcernsStepRenderer formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};

export default BodyAssessmentStepRenderer;
