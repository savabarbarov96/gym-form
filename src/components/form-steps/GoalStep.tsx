
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
    // Base parameters - adjusted to look less squished
    const baseNeckWidth = 16;
    const baseShoulderWidth = 55;
    const baseChestWidth = 48;
    const baseWaistWidth = 38;
    const baseHipWidth = 43;
    const baseThighWidth = 20;
    
    // Calculate adjustment based on body fat - made more gradual
    const fatAdjustment = (value - 10) / 30; // Normalized from 10%-40% to 0-1
    const adjustmentFactor = Math.max(0, fatAdjustment);
    
    return {
      neckWidth: baseNeckWidth + (adjustmentFactor * 4),
      shoulderWidth: baseShoulderWidth + (adjustmentFactor * 8),
      chestWidth: baseChestWidth + (adjustmentFactor * 12),
      waistWidth: baseWaistWidth + (adjustmentFactor * 20),
      hipWidth: baseHipWidth + (adjustmentFactor * 16),
      thighWidth: baseThighWidth + (adjustmentFactor * 8),
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
            <svg viewBox="0 0 120 220" className="w-3/4 h-3/4">
              {/* Head */}
              <circle 
                cx="60" 
                cy="25" 
                r="18" 
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Neck */}
              <rect 
                x={60 - bodyParams.neckWidth/2} 
                y="42" 
                width={bodyParams.neckWidth} 
                height="8" 
                className="fill-orange/60 stroke-orange"
                rx="4"
              />
              
              {/* Shoulders */}
              <rect 
                x={60 - bodyParams.shoulderWidth/2} 
                y="50" 
                width={bodyParams.shoulderWidth} 
                height="8" 
                rx="4"
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Arms */}
              <rect 
                x={60 - bodyParams.shoulderWidth/2 - 4} 
                y="55" 
                width="10" 
                height="55" 
                rx="5"
                className="fill-orange/60 stroke-orange"
              />
              <rect 
                x={60 + bodyParams.shoulderWidth/2 - 6} 
                y="55" 
                width="10" 
                height="55" 
                rx="5"
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Torso - improved shape with curves */}
              <path 
                d={`
                  M${60 - bodyParams.chestWidth/2},53
                  C${60 - bodyParams.chestWidth/2},53 ${60 - bodyParams.waistWidth/2 - 5},85 ${60 - bodyParams.waistWidth/2},95
                  L${60 - bodyParams.hipWidth/2},115
                  L${60 + bodyParams.hipWidth/2},115
                  L${60 + bodyParams.waistWidth/2},95
                  C${60 + bodyParams.waistWidth/2 + 5},85 ${60 + bodyParams.chestWidth/2},53 ${60 + bodyParams.chestWidth/2},53
                  Z
                `}
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Legs - more tapered */}
              <path
                d={`
                  M${60 - bodyParams.hipWidth/2 + 5},115
                  L${60 - bodyParams.thighWidth - 4},180
                  L${60 - bodyParams.thighWidth},205
                  L${60 - bodyParams.thighWidth + 10},205
                  L${60 - bodyParams.thighWidth + 14},180
                  L${60 - bodyParams.hipWidth/2 + bodyParams.thighWidth},115
                  Z
                `}
                className="fill-orange/60 stroke-orange"
              />
              
              <path
                d={`
                  M${60 + bodyParams.hipWidth/2 - 5},115
                  L${60 + bodyParams.thighWidth + 4},180
                  L${60 + bodyParams.thighWidth},205
                  L${60 + bodyParams.thighWidth - 10},205
                  L${60 + bodyParams.thighWidth - 14},180
                  L${60 + bodyParams.hipWidth/2 - bodyParams.thighWidth},115
                  Z
                `}
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Muscle definition lines - only visible in lower body fat */}
              {value < 15 && (
                <g className="stroke-orange/90 stroke-[0.8]">
                  {/* Abs */}
                  <line x1="53" y1="65" x2="67" y2="65" />
                  <line x1="52" y1="75" x2="68" y2="75" />
                  <line x1="51" y1="85" x2="69" y2="85" />
                  <line x1="60" y1="55" x2="60" y2="95" />
                  
                  {/* Pecs */}
                  <path d="M50,60 Q60,65 70,60" />
                  
                  {/* Biceps */}
                  <path d="M36,65 Q32,80 36,90" />
                  <path d="M84,65 Q88,80 84,90" />
                  
                  {/* Leg muscle definition */}
                  <path d="M50,140 Q55,150 50,160" />
                  <path d="M70,140 Q65,150 70,160" />
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
