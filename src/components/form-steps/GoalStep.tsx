
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

  // Generate body parameters based on body fat percentage
  const bodyParams = useMemo(() => {
    // Base parameters
    const baseNeckWidth = 15;
    const baseShoulderWidth = 50;
    const baseChestWidth = 45;
    const baseWaistWidth = 35;
    const baseHipWidth = 40;
    const baseThighWidth = 18;
    
    // Calculate adjustment based on body fat
    const fatAdjustment = (value - 10) / 30; // Normalized from 10%-40% to 0-1
    const adjustmentFactor = Math.max(0, fatAdjustment);
    
    return {
      neckWidth: baseNeckWidth + (adjustmentFactor * 5),
      shoulderWidth: baseShoulderWidth + (adjustmentFactor * 10),
      chestWidth: baseChestWidth + (adjustmentFactor * 15),
      waistWidth: baseWaistWidth + (adjustmentFactor * 25),
      hipWidth: baseHipWidth + (adjustmentFactor * 20),
      thighWidth: baseThighWidth + (adjustmentFactor * 10),
      opacity: 0.7 + (adjustmentFactor * 0.3),
    };
  }, [value]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
          {/* Background gradient circles */}
          <div className="absolute inset-0 bg-orange/5 rounded-full"></div>
          <div className="absolute inset-[10%] bg-orange/10 rounded-full"></div>
          
          {/* Interactive human body visualization */}
          <div className={cn(
            "body-shape relative flex items-center justify-center",
            `fatness-level-${fatnessLevel}`
          )}>
            {/* Improved human body silhouette */}
            <svg viewBox="0 0 100 180" className="w-3/4 h-3/4">
              {/* Head */}
              <circle 
                cx="50" 
                cy="20" 
                r="15" 
                className="fill-orange/50 stroke-orange"
              />
              
              {/* Neck */}
              <rect 
                x={50 - bodyParams.neckWidth/2} 
                y="35" 
                width={bodyParams.neckWidth} 
                height="5" 
                className="fill-orange/50 stroke-orange"
              />
              
              {/* Shoulders */}
              <rect 
                x={50 - bodyParams.shoulderWidth/2} 
                y="40" 
                width={bodyParams.shoulderWidth} 
                height="5" 
                rx="2"
                className="fill-orange/50 stroke-orange"
              />
              
              {/* Arms */}
              <rect 
                x={50 - bodyParams.shoulderWidth/2} 
                y="45" 
                width="8" 
                height="40" 
                rx="4"
                className="fill-orange/50 stroke-orange"
              />
              <rect 
                x={50 + bodyParams.shoulderWidth/2 - 8} 
                y="45" 
                width="8" 
                height="40" 
                rx="4"
                className="fill-orange/50 stroke-orange"
              />
              
              {/* Torso */}
              <path 
                d={`
                  M${50 - bodyParams.chestWidth/2},45
                  L${50 - bodyParams.waistWidth/2},85
                  L${50 - bodyParams.hipWidth/2},105
                  L${50 + bodyParams.hipWidth/2},105
                  L${50 + bodyParams.waistWidth/2},85
                  L${50 + bodyParams.chestWidth/2},45
                  Z
                `}
                className="fill-orange/50 stroke-orange"
              />
              
              {/* Legs */}
              <rect 
                x={50 - bodyParams.hipWidth/2 + 5} 
                y="105" 
                width={bodyParams.thighWidth} 
                height="55" 
                rx="5"
                className="fill-orange/50 stroke-orange"
              />
              <rect 
                x={50 + bodyParams.hipWidth/2 - bodyParams.thighWidth - 5} 
                y="105" 
                width={bodyParams.thighWidth} 
                height="55" 
                rx="5"
                className="fill-orange/50 stroke-orange"
              />
              
              {/* Calves - only visible in lower body fat */}
              {value < 25 && (
                <>
                  <rect 
                    x={50 - bodyParams.hipWidth/2 + 7} 
                    y="160" 
                    width={bodyParams.thighWidth - 4} 
                    height="20" 
                    rx="3"
                    className="fill-orange/50 stroke-orange"
                  />
                  <rect 
                    x={50 + bodyParams.hipWidth/2 - bodyParams.thighWidth - 3} 
                    y="160" 
                    width={bodyParams.thighWidth - 4} 
                    height="20" 
                    rx="3"
                    className="fill-orange/50 stroke-orange"
                  />
                </>
              )}
              
              {/* Muscle definition lines - only visible in lower body fat */}
              {value < 15 && (
                <g className="stroke-orange/80 stroke-[0.5]">
                  {/* Abs */}
                  <line x1="45" y1="55" x2="55" y2="55" />
                  <line x1="45" y1="65" x2="55" y2="65" />
                  <line x1="45" y1="75" x2="55" y2="75" />
                  <line x1="50" y1="45" x2="50" y2="85" />
                  
                  {/* Pecs */}
                  <path d="M40,50 Q50,55 60,50" />
                  
                  {/* Biceps */}
                  <path d="M30,55 Q25,65 30,75" />
                  <path d="M70,55 Q75,65 70,75" />
                </g>
              )}
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
