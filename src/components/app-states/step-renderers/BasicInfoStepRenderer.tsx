
import React from 'react';
import { FormData } from '@/types/survey';
import {
  AgeSelectionStep,
  BodyTypeStep,
  GoalStep,
  FitnessGoalStep,
  DesiredBodyStep
} from "@/components/form-steps";

interface BasicInfoStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BasicInfoStepRenderer: React.FC<BasicInfoStepRendererProps> = ({
  step,
  formData,
  setFormData
}) => {
  if (step === 1) {
    return (
      <AgeSelectionStep 
        selectedAge={formData.age}
        onSelect={(age) => setFormData({...formData, age})}
      />
    );
  }
  
  if (step === 2) {
    return (
      <BodyTypeStep 
        selectedType={formData.bodyType}
        onSelect={(bodyType) => setFormData({...formData, bodyType})}
      />
    );
  }
  
  if (step === 3) {
    return (
      <GoalStep 
        value={formData.goal} 
        onChange={(goal) => setFormData({...formData, goal})}
      />
    );
  }

  if (step === 4) {
    return (
      <FitnessGoalStep 
        selectedGoal={formData.fitnessGoal}
        onSelect={(fitnessGoal) => setFormData({...formData, fitnessGoal})}
      />
    );
  }

  if (step === 5) {
    return (
      <DesiredBodyStep 
        selectedBody={formData.desiredBody}
        onSelect={(desiredBody) => setFormData({...formData, desiredBody})}
      />
    );
  }
  
  return null;
};

export default BasicInfoStepRenderer;
