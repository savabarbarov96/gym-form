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
  // Adjusted for the new Traditional Foods step (shifting everything by 1 more)
  const localStep = step - 27;
  
  const handleSelfAssessmentChange = (key: keyof FormData['selfAssessments'], value: number | null) => {
    console.log(`Setting ${key} to:`, value);
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
    console.log("Setting start commitment to:", value);
    setFormData(prev => ({
      ...prev,
      startCommitment: value
    }));
  };

  // Validation wrapper functions for each self-assessment step
  const validateOutOfBreath = () => {
    console.log(`Validating outOfBreath step with value: ${formData.selfAssessments.outOfBreath} (global step: ${step})`);
    return validateFinalStepsStep(step, formData, toast);
  };

  const validateFallingBack = () => {
    console.log(`Validating fallingBack step with value: ${formData.selfAssessments.fallingBack} (global step: ${step})`);
    return validateFinalStepsStep(step, formData, toast);
  };

  const validateMotivation = () => {
    console.log(`Validating motivationLevel step with value: ${formData.selfAssessments.motivationLevel} (global step: ${step})`);
    return validateFinalStepsStep(step, formData, toast);
  };

  const validateDietConsistency = () => {
    console.log(`Validating dietConsistency step with value: ${formData.selfAssessments.dietConsistency} (global step: ${step})`);
    return validateFinalStepsStep(step, formData, toast);
  };
  
  // Map the local step to the appropriate component
  switch (localStep) {
    case 1: // Step 28
      return (
        <SelfAssessmentStep 
          question="Лесно оставам без дъх, когато правя упражнения"
          value={formData.selfAssessments.outOfBreath}
          onChange={(value) => handleSelfAssessmentChange('outOfBreath', value)}
          onValidate={validateOutOfBreath}
        />
      );
    
    case 2: // Step 29 
      return (
        <SelfAssessmentStep
          question="Опитвал/а съм да вляза във форма и преди, но непрекъснато се връщам към стари навици"
          value={formData.selfAssessments.fallingBack}
          onChange={(value) => handleSelfAssessmentChange('fallingBack', value)}
          onValidate={validateFallingBack}
        />
      );
    
    case 3: // Step 30
      return (
        <SelfAssessmentStep
          question="Понякога ми е трудно да намеря мотивация за тренировки"
          value={formData.selfAssessments.motivationLevel}
          onChange={(value) => handleSelfAssessmentChange('motivationLevel', value)}
          onValidate={validateMotivation}
        />
      );
    
    case 4: // Step 31
      return (
        <SelfAssessmentStep
          question="Трудно ми е да поддържам постоянство в здравословното хранене"
          value={formData.selfAssessments.dietConsistency}
          onChange={(value) => handleSelfAssessmentChange('dietConsistency', value)}
          onValidate={validateDietConsistency}
        />
      );
    
    case 5: // Step 32
      return (
        <PersonalInfoStep
          personalInfo={formData.personalInfo}
          onChange={handlePersonalInfoChange}
        />
      );
      
    case 6: // Step 33
      return (
        <StartCommitmentStep
          selected={formData.startCommitment}
          onSelect={handleStartCommitmentChange}
        />
      );
      
    default:
      console.log("No matching component for final step:", localStep);
      return null;
  }
};

export default FinalStepsRenderer;
