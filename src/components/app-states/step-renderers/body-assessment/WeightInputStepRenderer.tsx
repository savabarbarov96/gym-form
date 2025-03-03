
import React from 'react';
import { FormData } from '@/types/survey';
import { WeightInputStep } from '@/components/form-steps';

interface WeightInputStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const WeightInputStepRenderer = ({
  formData,
  setFormData
}: WeightInputStepRendererProps) => {
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
};

export default WeightInputStepRenderer;
