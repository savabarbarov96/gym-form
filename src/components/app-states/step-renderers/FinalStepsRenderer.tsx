
import React from 'react';
import { FormData } from '@/types/survey';
import {
  SelfAssessmentStep,
  PersonalInfoStep,
  StartCommitmentStep
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
  if (step === 25) {
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
  
  if (step === 26) {
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
  
  if (step === 27) {
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
  
  if (step === 28) {
    return (
      <PersonalInfoStep
        name={formData.personalInfo.name}
        dob={formData.personalInfo.dob}
        email={formData.personalInfo.email}
        emailConsent={formData.personalInfo.emailConsent}
        onChangeName={(name) => setFormData({
          ...formData,
          personalInfo: {...formData.personalInfo, name}
        })}
        onChangeDob={(dob) => setFormData({
          ...formData,
          personalInfo: {...formData.personalInfo, dob}
        })}
        onChangeEmail={(email) => setFormData({
          ...formData,
          personalInfo: {...formData.personalInfo, email}
        })}
        onChangeConsent={(emailConsent) => setFormData({
          ...formData,
          personalInfo: {...formData.personalInfo, emailConsent}
        })}
      />
    );
  }
  
  if (step === 29) {
    return (
      <StartCommitmentStep
        value={formData.startCommitment}
        onChange={(startCommitment) => setFormData({...formData, startCommitment})}
      />
    );
  }
  
  return null;
};

export default FinalStepsRenderer;
