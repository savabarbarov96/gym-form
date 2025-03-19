import React from 'react';
import { FormData } from '@/types/survey';
import { TraditionalFoodsStep } from '@/components/form-steps';

interface TraditionalFoodsStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const TraditionalFoodsStepRenderer = ({
  formData,
  setFormData
}: TraditionalFoodsStepRendererProps) => {
  return (
    <TraditionalFoodsStep
      selectedFoods={formData.traditionalFoods}
      onSelect={(traditionalFoods) => 
        setFormData(prev => ({ ...prev, traditionalFoods }))
      }
      customFood={formData.customTraditionalFood}
      onCustomFoodChange={(customTraditionalFood) => 
        setFormData(prev => ({ ...prev, customTraditionalFood }))
      }
    />
  );
};

export default TraditionalFoodsStepRenderer; 