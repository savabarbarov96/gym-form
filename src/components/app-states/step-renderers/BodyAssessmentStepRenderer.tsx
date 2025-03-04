
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
  // Adjust for the correct step range (step - 6)
  // Step 6 should map to localStep 0
  const localStep = step - 6;
  
  console.log("Body Assessment Step Renderer", { step, localStep, formData });
  
  switch (localStep) {
    case 0: // Changed from case 1 to case 0
      return <HeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 1: // Changed from case 2 to case 1
      return <WeightInputStepRenderer formData={formData} setFormData={setFormData} />;
    case 2: // Changed from case 3 to case 2
      return (
        <div className="best-shape-container">
          <BestShapeStep
            selected={formData.bestShapeTime}
            onSelect={(bestShapeTime) => setFormData({...formData, bestShapeTime})}
          />
        </div>
      );
    case 3: // Changed from case 4 to case 3
      return <WeightChangeStepRenderer formData={formData} setFormData={setFormData} />;
    case 4: // Changed from case 5 to case 4
      return <ProgressGraphStepRenderer formData={formData} />;
    case 5: // Changed from case 6 to case 5
      return <HormoneGraphStepRenderer handleNext={handleNext} />;
    case 6: // Changed from case 7 to case 6
      return <HealthConcernsStepRenderer formData={formData} setFormData={setFormData} />;
    default:
      console.log("No matching case for localStep:", localStep);
      return null;
  }
};

export default BodyAssessmentStepRenderer;
