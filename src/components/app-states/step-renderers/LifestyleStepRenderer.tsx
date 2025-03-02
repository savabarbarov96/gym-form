
import React from 'react';
import { FormData } from '@/types/survey';
import {
  SugaryFoodsStep,
  WaterIntakeStep,
  TypicalDayStep,
  EnergyLevelsStep,
  SleepAmountStep
} from "@/components/form-steps";

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
  if (step === 20) {
    return (
      <SugaryFoodsStep
        selected={formData.sugaryFoods}
        onSelect={(sugaryFoods) => setFormData({...formData, sugaryFoods})}
      />
    );
  }
  
  if (step === 21) {
    return (
      <WaterIntakeStep
        value={formData.waterIntake}
        onChange={(waterIntake) => setFormData({...formData, waterIntake})}
      />
    );
  }
  
  if (step === 22) {
    return (
      <TypicalDayStep
        selected={formData.typicalDay}
        onSelect={(typicalDay) => setFormData({...formData, typicalDay})}
      />
    );
  }
  
  if (step === 23) {
    return (
      <EnergyLevelsStep
        value={formData.energyLevels}
        onChange={(energyLevels) => setFormData({...formData, energyLevels})}
      />
    );
  }
  
  if (step === 24) {
    return (
      <SleepAmountStep
        value={formData.sleepAmount}
        onChange={(sleepAmount) => setFormData({...formData, sleepAmount})}
      />
    );
  }
  
  return null;
};

export default LifestyleStepRenderer;
