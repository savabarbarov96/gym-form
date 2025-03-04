
import React from 'react';
import { FormData } from '@/types/survey';
import {
  SugaryFoodsStep,
  WaterIntakeStep,
  TypicalDayStep,
  EnergyLevelsStep,
  SleepAmountStep
} from '@/components/form-steps';

interface LifestyleStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const LifestyleStepRenderer: React.FC<LifestyleStepRendererProps> = ({
  step,
  formData,
  setFormData
}) => {
  // This maps the global step number to the local step within this renderer
  const localStep = step - 20;
  
  switch (localStep) {
    case 1: // Step 21
      return (
        <SugaryFoodsStep
          selected={formData.sugaryFoods}
          onSelect={(sugaryFoods) => setFormData(prev => ({ ...prev, sugaryFoods }))}
        />
      );
    
    case 2: // Step 22
      return (
        <WaterIntakeStep
          value={formData.waterIntake || 1500}
          onChange={(waterIntake) => setFormData(prev => ({ ...prev, waterIntake }))}
        />
      );
    
    case 3: // Step 23
      return (
        <TypicalDayStep
          selected={formData.typicalDay}
          onSelect={(typicalDay) => setFormData(prev => ({ ...prev, typicalDay }))}
        />
      );
    
    case 4: // Step 24
      return (
        <EnergyLevelsStep
          value={formData.energyLevels}
          onChange={(energyLevels) => setFormData(prev => ({ ...prev, energyLevels }))}
        />
      );
    
    case 5: // Step 25
      return (
        <SleepAmountStep
          value={formData.sleepAmount}
          onChange={(sleepAmount) => setFormData(prev => ({ ...prev, sleepAmount }))}
        />
      );
      
    default:
      return null;
  }
};

export default LifestyleStepRenderer;
