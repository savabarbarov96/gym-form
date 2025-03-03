
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WeightInputStepProps {
  currentWeight: string | null;
  targetWeight: string | null;
  weightUnit: "kg" | "lbs";
  onCurrentWeightChange: (weight: string | null) => void;
  onTargetWeightChange: (weight: string | null) => void;
  onWeightUnitChange: (unit: "kg" | "lbs") => void;
}

const WeightInputStep = ({ 
  currentWeight, 
  targetWeight, 
  weightUnit, 
  onCurrentWeightChange, 
  onTargetWeightChange, 
  onWeightUnitChange
}: WeightInputStepProps) => {
  const [localCurrentWeight, setLocalCurrentWeight] = useState(currentWeight || "");
  const [localTargetWeight, setLocalTargetWeight] = useState(targetWeight || "");
  const [localWeightUnit, setLocalWeightUnit] = useState<"kg" | "lbs">(weightUnit);

  const handleCurrentWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalCurrentWeight(e.target.value);
    onCurrentWeightChange(e.target.value);
  };

  const handleTargetWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTargetWeight(e.target.value);
    onTargetWeightChange(e.target.value);
  };

  const handleUnitChange = (value: "kg" | "lbs") => {
    setLocalWeightUnit(value);
    onWeightUnitChange(value);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">What's your current and target weight?</h1>
      
      <div className="max-w-md mx-auto space-y-8">
        <div className="flex justify-center mb-6">
          <RadioGroup 
            value={localWeightUnit} 
            onValueChange={(value) => handleUnitChange(value as "kg" | "lbs")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kg" id="kg" className="text-orange" />
              <label htmlFor="kg" className="text-lg cursor-pointer">kg</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lbs" id="lbs" className="text-orange" />
              <label htmlFor="lbs" className="text-lg cursor-pointer">lbs</label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="current-weight" className="block text-lg font-medium text-left">
              Current weight ({localWeightUnit})
            </label>
            <Input
              id="current-weight"
              type="number"
              value={localCurrentWeight}
              onChange={handleCurrentWeightChange}
              className="w-full text-lg py-6"
              placeholder={`Enter your current weight in ${localWeightUnit}`}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="target-weight" className="block text-lg font-medium text-left">
              Target weight ({localWeightUnit})
            </label>
            <Input
              id="target-weight"
              type="number"
              value={localTargetWeight}
              onChange={handleTargetWeightChange}
              className="w-full text-lg py-6"
              placeholder={`Enter your target weight in ${localWeightUnit}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightInputStep;
