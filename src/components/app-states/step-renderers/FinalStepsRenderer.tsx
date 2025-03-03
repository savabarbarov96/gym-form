
import React from 'react';
import { FormData } from '@/types/survey';
import { SelfAssessmentStep, PersonalInfoStep, StartCommitmentStep } from '@/components/form-steps';
import { useToast } from '@/hooks/use-toast';
import { validateFinalStepsStep } from '@/utils/validation/finalStepsValidation';

interface FinalStepsRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FinalStepsRenderer: React.FC<FinalStepsRendererProps> = ({ step, formData, setFormData }) => {
  const { toast } = useToast();
  
  // This maps the global step number to the local step within this renderer
  const localStep = step - 25;
  
  const handleSelfAssessmentChange = (key: keyof FormData['selfAssessments'], value: number | null) => {
    setFormData(prev => ({
      ...prev,
      selfAssessments: {
        ...prev.selfAssessments,
        [key]: value
      }
    }));
  };
  
  const handlePersonalInfoChange = (personalInfo: FormData['personalInfo']) => {
    setFormData(prev => ({
      ...prev,
      personalInfo
    }));
  };
  
  const handleStartCommitmentChange = (value: string | null) => {
    setFormData(prev => ({
      ...prev,
      startCommitment: value
    }));
  };
  
  // Map the local step to the appropriate component
  switch (localStep) {
    case 1: // Step 26
      return (
        <SelfAssessmentStep 
          title="I get out of breath easily when exercising"
          value={formData.selfAssessments.outOfBreath}
          onChange={(value) => handleSelfAssessmentChange('outOfBreath', value)}
          onValidate={() => validateFinalStepsStep(step, formData, toast)}
        />
      );
    
    case 2: // Step 27 
      return (
        <SelfAssessmentStep
          title="I've tried to get in shape before but keep falling back into old habits"
          value={formData.selfAssessments.fallingBack}
          onChange={(value) => handleSelfAssessmentChange('fallingBack', value)}
          onValidate={() => validateFinalStepsStep(step, formData, toast)}
        />
      );
    
    case 3: // Step 28
      return (
        <SelfAssessmentStep
          title="I sometimes struggle to find the motivation to exercise"
          value={formData.selfAssessments.motivationLevel}
          onChange={(value) => handleSelfAssessmentChange('motivationLevel', value)}
          onValidate={() => validateFinalStepsStep(step, formData, toast)}
        />
      );
    
    case 4: // Step 29
      return (
        <SelfAssessmentStep
          title="I find it difficult to stay consistent with a healthy diet"
          value={formData.selfAssessments.dietConsistency}
          onChange={(value) => handleSelfAssessmentChange('dietConsistency', value)}
          onValidate={() => validateFinalStepsStep(step, formData, toast)}
        />
      );
    
    case 5: // Step 30
      return (
        <PersonalInfoStep
          personalInfo={formData.personalInfo}
          onChange={handlePersonalInfoChange}
        />
      );
      
    default:
      return null;
  }
};

export default FinalStepsRenderer;
