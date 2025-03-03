
import React from 'react';
import { FormData } from '@/types/survey';
import {
  SelfAssessmentStep,
  PersonalInfoStep
} from "@/components/form-steps";

interface FinalStepsRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FinalStepsRenderer: React.FC<FinalStepsRendererProps> = ({
  step,
  formData,
  setFormData
}) => {
  // Adjust step numbers to match validation logic (start from 26)
  if (step === 26) {
    return (
      <SelfAssessmentStep 
        assessmentKey="outOfBreath"
        question="I am often out of breath when I climb the stairs"
        value={formData.selfAssessments.outOfBreath}
        onChange={(value) => setFormData({
          ...formData, 
          selfAssessments: {...formData.selfAssessments, outOfBreath: value}
        })}
      />
    );
  }
  
  if (step === 27) {
    return (
      <SelfAssessmentStep 
        assessmentKey="fallingBack"
        question="I keep falling back into bad exercise habits"
        value={formData.selfAssessments.fallingBack}
        onChange={(value) => setFormData({
          ...formData, 
          selfAssessments: {...formData.selfAssessments, fallingBack: value}
        })}
      />
    );
  }
  
  if (step === 28) {
    return (
      <SelfAssessmentStep 
        assessmentKey="motivationLevel"
        question="I find it hard to stay motivated with exercise"
        value={formData.selfAssessments.motivationLevel}
        onChange={(value) => setFormData({
          ...formData, 
          selfAssessments: {...formData.selfAssessments, motivationLevel: value}
        })}
      />
    );
  }
  
  if (step === 29) {
    return (
      <SelfAssessmentStep 
        assessmentKey="dietConsistency"
        question="I find it difficult to stay consistent with my diet"
        value={formData.selfAssessments.dietConsistency}
        onChange={(value) => setFormData({
          ...formData, 
          selfAssessments: {...formData.selfAssessments, dietConsistency: value}
        })}
      />
    );
  }
  
  if (step === 30) {
    return (
      <PersonalInfoStep
        personalInfo={formData.personalInfo}
        onChange={(personalInfo) => setFormData({
          ...formData,
          personalInfo
        })}
      />
    );
  }
  
  return null;
};

export default FinalStepsRenderer;
