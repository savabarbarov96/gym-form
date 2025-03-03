
import React from 'react';
import { FormData } from '@/types/survey';
import { 
  GoalStep, 
  ProgressGraphStep,
  HormoneGraphStep,
  HeightInputStep,
  WeightInputStep,
  HealthConcernsStep
} from '@/components/form-steps';

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
      return (
        <HeightInputStep
          value={formData.height}
          onChange={(height) => setFormData(prev => ({ ...prev, height }))}
        />
      );
    case 7:
      return (
        <WeightInputStep
          currentWeight={formData.currentWeight}
          targetWeight={formData.targetWeight}
          weightUnit={formData.weightUnit}
          onCurrentWeightChange={(currentWeight) => 
            setFormData(prev => ({ ...prev, currentWeight }))
          }
          onTargetWeightChange={(targetWeight) => 
            setFormData(prev => ({ ...prev, targetWeight }))
          }
          onWeightUnitChange={(weightUnit) => 
            setFormData(prev => ({ ...prev, weightUnit }))
          }
        />
      );
    case 8:
      return (
        <GoalStep
          value={formData.goal}
          currentBodyFat={formData.currentBodyFat}
          onChange={(goal) => setFormData(prev => ({ ...prev, goal }))}
          onCurrentBodyFatChange={(currentBodyFat) => 
            setFormData(prev => ({ ...prev, currentBodyFat }))
          }
        />
      );
    case 9:
      return (
        <ProgressGraphStep 
          goalValue={formData.goal}
          currentBodyFat={formData.currentBodyFat}
        />
      );
    case 10:
      return (
        <HormoneGraphStep
          onNext={handleNext}
        />
      );
    case 11:
      return (
        <HealthConcernsStep
          selectedOptions={formData.healthConcerns}
          customOption={formData.customHealthConcern}
          onSelectionChange={(healthConcerns) => 
            setFormData(prev => ({ ...prev, healthConcerns }))
          }
          onCustomOptionChange={(customHealthConcern) => 
            setFormData(prev => ({ ...prev, customHealthConcern }))
          }
        />
      );
    default:
      return null;
  }
};

export default BodyAssessmentStepRenderer;
