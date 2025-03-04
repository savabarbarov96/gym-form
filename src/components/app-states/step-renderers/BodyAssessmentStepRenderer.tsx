import React from 'react';
import { FormData } from '@/types/survey';
import {
  HeightInputStepRenderer,
  WeightInputStepRenderer,
  GoalStepRenderer,
  ProgressGraphStepRenderer,
  HormoneGraphStepRenderer,
  HealthConcernsStepRenderer,
  WeightChangeStepRenderer,
  AllergiesStepRenderer
} from './body-assessment';
import { BestShapeStep } from "@/components/form-steps";

interface BodyAssessmentStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

// Helper function to create a step mapping for better readability
const getBodyAssessmentStep = (
  localStep: number,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  handleNext: () => void
) => {
  const stepMap = {
    0: <HeightInputStepRenderer formData={formData} setFormData={setFormData} />,
    1: <WeightInputStepRenderer formData={formData} setFormData={setFormData} />,
    2: (
      <div className="best-shape-container">
        <BestShapeStep
          selected={formData.bestShapeTime}
          onSelect={(bestShapeTime) => setFormData({...formData, bestShapeTime})}
        />
      </div>
    ),
    3: <WeightChangeStepRenderer formData={formData} setFormData={setFormData} />,
    4: <ProgressGraphStepRenderer formData={formData} />,
    5: <HormoneGraphStepRenderer handleNext={handleNext} formData={formData} />,
    6: <HealthConcernsStepRenderer formData={formData} setFormData={setFormData} />,
    7: <AllergiesStepRenderer formData={formData} setFormData={setFormData} />,
  };
  
  return stepMap[localStep as keyof typeof stepMap] || null;
};

const BodyAssessmentStepRenderer = ({
  step,
  formData,
  setFormData,
  handleNext
}: BodyAssessmentStepRendererProps) => {
  // Adjust for the correct step range (step - 6)
  const localStep = step - 6;
  
  console.log("Body Assessment Step Renderer", { step, localStep, formData });
  
  return getBodyAssessmentStep(localStep, formData, setFormData, handleNext);
};

export default BodyAssessmentStepRenderer;
