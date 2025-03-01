
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BestShapeStepProps {
  selected: string | null;
  onSelect: (time: string) => void;
}

const BestShapeStep = ({ selected, onSelect }: BestShapeStepProps) => {
  const options = [
    { label: "Less than a year ago", id: "less-than-year" },
    { label: "1-3 years ago", id: "1-3-years" },
    { label: "More than 3 years ago", id: "more-than-3-years" },
    { label: "Never", id: "never" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">How long ago were you in the best shape of your life?</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex">
            <div className="w-full pr-4">
              <RadioGroup value={selected || ""} onValueChange={onSelect}>
                {options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 mb-4 bg-card p-4 rounded-lg">
                    <RadioGroupItem value={option.id} id={option.id} className="text-orange" />
                    <label htmlFor={option.id} className="text-xl cursor-pointer flex-1">{option.label}</label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/af5f4a6f-fd68-4c86-8f45-d229d338e77e.png" 
                alt="Best shape visualization"
                className="h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestShapeStep;
