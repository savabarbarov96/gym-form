import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WeightChangeStepProps {
  selected: string | null;
  onSelect: (type: string) => void;
}

const WeightChangeStep = ({ selected, onSelect }: WeightChangeStepProps) => {
  const options = [
    { label: "Качвам тегло бързо, но губя бавно", id: "gain-fast-lose-slow" },
    { label: "Качвам и губя тегло лесно", id: "gain-lose-easily" },
    { label: "Трудно качвам тегло или мускули", id: "struggle-gain" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Как обикновено се променя Вашето тегло?</h1>
      
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
