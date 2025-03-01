
import React from "react";
import { Slider } from "@/components/ui/slider";

interface GoalStepProps {
  value: number;
  onChange: (value: number) => void;
}

const GoalStep = ({ value, onChange }: GoalStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/949229f9-bb7a-407e-b06a-54cc9a26b481.png" 
          alt="Body visualization"
          className="max-h-[500px] object-contain"
        />
      </div>
      
      <div className="bg-card rounded-lg p-6 flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12">Choose your level of body fat</h1>
        
        <div className="mt-8">
          <div className="bg-secondary p-4 rounded-md text-center mb-4 text-lg font-medium">
            {value}%
          </div>
          
          <Slider
            defaultValue={[value]}
            max={40}
            min={5}
            step={1}
            onValueChange={(val) => onChange(val[0])}
            className="my-8"
          />
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>5-9%</span>
            <span>&gt;40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalStep;
