
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WeightChangeStepProps {
  selected: string | null;
  onSelect: (type: string) => void;
}

const WeightChangeStep = ({ selected, onSelect }: WeightChangeStepProps) => {
  const options = [
    { label: "I gain weight fast but lose slowly", id: "gain-fast-lose-slow" },
    { label: "I gain and lose weight easily", id: "gain-lose-easily" },
    { label: "I struggle to gain weight or muscle", id: "struggle-gain" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">How does your weight typically change?</h1>
      
      <div className="max-w-2xl mx-auto">
        <RadioGroup value={selected || ""} onValueChange={onSelect}>
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 mb-4 bg-card p-4 rounded-lg">
              <RadioGroupItem value={option.id} id={option.id} className="text-orange" />
              <label htmlFor={option.id} className="text-xl cursor-pointer">{option.label}</label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default WeightChangeStep;
