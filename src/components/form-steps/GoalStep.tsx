
import React, { useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface GoalStepProps {
  value: number;
  onChange: (value: number) => void;
}

const GoalStep = ({ value, onChange }: GoalStepProps) => {
  // Calculate fatness level - ranges from 0 (5%) to 7 (40%)
  const fatnessLevel = useMemo(() => {
    const levels = [5, 10, 15, 20, 25, 30, 35, 40];
    return levels.findIndex(level => value <= level);
  }, [value]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
          {/* Background gradient circles */}
          <div className="absolute inset-0 bg-orange/5 rounded-full"></div>
          <div className="absolute inset-[10%] bg-orange/10 rounded-full"></div>
          
          {/* Interactive body visualization */}
          <div className={cn(
            "body-shape relative flex items-center justify-center",
            `fatness-level-${fatnessLevel}`
          )}>
            {/* Body silhouette */}
            <svg viewBox="0 0 200 300" className="w-3/4 h-3/4">
              {/* Head */}
              <circle cx="100" cy="40" r="30" className="fill-muted-foreground/20 stroke-muted-foreground" />
              
              {/* Body - changes with body fat % */}
              <ellipse 
                cx="100" 
                cy="150" 
                rx={50 + (fatnessLevel * 5)} 
                ry={80 + (fatnessLevel * 6)} 
                className="fill-orange/30 stroke-orange/60"
              />
              
              {/* Arms */}
              <path 
                d={`M${60 - (fatnessLevel * 3)},90 Q${40 - (fatnessLevel * 4)},130 ${45 - (fatnessLevel * 2)},180 L${65 - (fatnessLevel * 1)},180 Q${60 - (fatnessLevel * 1)},130 ${75 - (fatnessLevel * 2)},100 Z`}
                className="fill-muted-foreground/30 stroke-muted-foreground/60"
              />
              <path 
                d={`M${140 + (fatnessLevel * 3)},90 Q${160 + (fatnessLevel * 4)},130 ${155 + (fatnessLevel * 2)},180 L${135 + (fatnessLevel * 1)},180 Q${140 + (fatnessLevel * 1)},130 ${125 + (fatnessLevel * 2)},100 Z`}
                className="fill-muted-foreground/30 stroke-muted-foreground/60"
              />
              
              {/* Legs */}
              <path 
                d={`M${75 - (fatnessLevel * 1)},210 Q${70 - (fatnessLevel * 1)},250 ${75 - (fatnessLevel * 0.5)},290 L${95},290 Q${100},250 ${90 - (fatnessLevel * 2)},210 Z`}
                className="fill-muted-foreground/30 stroke-muted-foreground/60"
              />
              <path 
                d={`M${125 + (fatnessLevel * 1)},210 Q${130 + (fatnessLevel * 1)},250 ${125 + (fatnessLevel * 0.5)},290 L${105},290 Q${100},250 ${110 + (fatnessLevel * 2)},210 Z`}
                className="fill-muted-foreground/30 stroke-muted-foreground/60"
              />
            </svg>
            
            {/* Percentage overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-bold text-white mix-blend-difference">
                {value}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-6 flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12">Choose your target body fat</h1>
        
        <div className="mt-8">
          <div className="bg-secondary p-4 rounded-md text-center mb-4 text-lg font-medium">
            {value}% Body Fat
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
            <span>5% (Competition level)</span>
            <span>40% (Obese)</span>
          </div>
          
          <div className="mt-6 p-4 rounded-md bg-muted">
            <h3 className="font-medium text-lg mb-2">Current selection: {value}% body fat</h3>
            <p className="text-muted-foreground">
              {value <= 10 ? 
                "Essential fat levels. Extremely lean, visible muscle striations. Typically seen in bodybuilders during competition." :
                value <= 15 ?
                "Athletic build with visible abs and muscle definition. Fitness model physique." :
                value <= 20 ?
                "Fit appearance with some muscle definition. Healthy and athletic." :
                value <= 25 ?
                "Average build with less visible muscle definition. Healthy range for many people." :
                value <= 30 ?
                "Some excess fat storage, less muscle definition visible. Common starting point." :
                "Higher body fat levels. Focusing on consistent habits will help reduce this over time."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalStep;
