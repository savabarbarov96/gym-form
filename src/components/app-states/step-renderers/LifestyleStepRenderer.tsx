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
  // Adjusted for the Traditional Foods step
  const localStep = step - 23;
  
  console.log(`LifestyleStepRenderer: Global Step ${step}, Local Step ${localStep}`);
  
  switch (localStep) {
    case 0: // Step 23
      return (
        <SugaryFoodsStep
          selected={formData.sugaryFoods}
          onSelect={(sugaryFoods) => setFormData(prev => ({ ...prev, sugaryFoods }))}
        />
      );
    
    case 1: // Step 24
      return (
        <WaterIntakeStep
          value={formData.waterIntake || 1500}
          onChange={(waterIntake) => setFormData(prev => ({ ...prev, waterIntake }))}
        />
      );
    
    case 2: // Step 25
      return (
        <TypicalDayStep
          selected={formData.typicalDay}
          onSelect={(typicalDay) => setFormData(prev => ({ ...prev, typicalDay }))}
        />
      );
    
    case 3: // Step 26
      return (
        <EnergyLevelsStep
          value={formData.energyLevels}
          onChange={(energyLevels) => setFormData(prev => ({ ...prev, energyLevels }))}
        />
      );
    
    case 4: // Step 27
      return (
        <SleepAmountStep
          value={formData.sleepAmount}
          onChange={(sleepAmount) => setFormData(prev => ({ ...prev, sleepAmount }))}
        />
      );
      
    default:
      console.warn(`LifestyleStepRenderer: No component for local step ${localStep}`);
      return null;
  }
};

export default LifestyleStepRenderer;
