
import React from 'react';
import { FormData } from '@/types/survey';
import {
  ProblemAreasStep,
  BestShapeStep,
  WeightChangeStep,
  ActivitiesStep,
  ProgressGraphStep,
  HealthConcernsStep
} from "@/components/form-steps";

interface BodyAssessmentStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const BodyAssessmentStepRenderer: React.FC<BodyAssessmentStepRendererProps> = ({
  step,
  formData,
  setFormData,
  handleNext
}) => {
  if (step === 6) {
    return (
      <ProblemAreasStep 
        selectedAreas={formData.problemAreas}
        onSelectArea={(problemAreas) => setFormData({...formData, problemAreas})}
      />
    );
  }

  if (step === 7) {
    return (
      <BestShapeStep 
        selected={formData.bestShapeTime}
        onSelect={(bestShapeTime) => setFormData({...formData, bestShapeTime})}
      />
    );
  }

  if (step === 8) {
    return (
      <WeightChangeStep 
        selected={formData.weightChange}
        onSelect={(weightChange) => setFormData({...formData, weightChange})}
      />
    );
  }

  if (step === 9) {
    return (
      <ActivitiesStep 
        selectedActivities={formData.activities}
        onSelectActivities={(activities) => setFormData({...formData, activities})}
      />
    );
  }
  
  if (step === 10) {
    return (
      <ProgressGraphStep 
        goalValue={formData.goal}
      />
    );
  }
  
  if (step === 11) {
    return (
      <HealthConcernsStep 
        selectedConcerns={formData.healthConcerns}
        onSelectConcerns={(healthConcerns) => setFormData({...formData, healthConcerns})}
      />
    );
  }
  
  return null;
};

export default BodyAssessmentStepRenderer;
