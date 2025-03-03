
import React, { useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface GoalStepProps {
  value: number;
  onChange: (value: number) => void;
  currentBodyFat?: number;
  onCurrentBodyFatChange?: (value: number) => void;
}

const GoalStep = ({ value, onChange, currentBodyFat = 25, onCurrentBodyFatChange }: GoalStepProps) => {
  // Calculate fatness level - ranges from 0 (5%) to 7 (40%)
  const fatnessLevel = useMemo(() => {
    const levels = [5, 10, 15, 20, 25, 30, 35, 40];
    const valueToUse = onCurrentBodyFatChange ? currentBodyFat : value;
    return levels.findIndex(level => valueToUse <= level);
  }, [value, currentBodyFat, onCurrentBodyFatChange]);

  // Generate body parameters based on body fat percentage
  const bodyParams = useMemo(() => {
    // Base parameters - improved proportions
    const baseNeckWidth = 12;
    const baseShoulderWidth = 40;
    const baseChestWidth = 36;
    const baseWaistWidth = 32;
    const baseHipWidth = 36;
    const baseThighWidth = 16;
    const baseArmLength = 35;
    
    // Calculate adjustment based on body fat - made more gradual
    const valueToUse = onCurrentBodyFatChange ? currentBodyFat : value;
    const fatAdjustment = (valueToUse - 10) / 30; // Normalized from 10%-40% to 0-1
    const adjustmentFactor = Math.max(0, fatAdjustment);
    
    return {
      neckWidth: baseNeckWidth + (adjustmentFactor * 3),
      shoulderWidth: baseShoulderWidth + (adjustmentFactor * 6),
      chestWidth: baseChestWidth + (adjustmentFactor * 10),
      waistWidth: baseWaistWidth + (adjustmentFactor * 18),
      hipWidth: baseHipWidth + (adjustmentFactor * 14),
      thighWidth: baseThighWidth + (adjustmentFactor * 7),
      armLength: baseArmLength,
      opacity: 0.7 + (adjustmentFactor * 0.3),
    };
  }, [value, currentBodyFat, onCurrentBodyFatChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
          {/* Background gradient circles */}
          <div className="absolute inset-0 bg-orange/5 rounded-full"></div>
          <div className="absolute inset-[10%] bg-orange/10 rounded-full"></div>
          
          {/* Interactive human body visualization */}
          <div className={cn(
            "body-shape relative flex items-center justify-center",
            `fatness-level-${fatnessLevel}`
          )}>
            {/* Improved human body silhouette with T-pose */}
            <svg viewBox="0 0 140 220" className="w-3/4 h-3/4">
              {/* Head */}
              <circle 
                cx="70" 
                cy="25" 
                r="18" 
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Neck - thinner and more natural */}
              <rect 
                x={70 - bodyParams.neckWidth/2} 
                y="42" 
                width={bodyParams.neckWidth} 
                height="8" 
                className="fill-orange/60 stroke-orange"
                rx="4"
              />
              
              {/* Shoulders */}
              <rect 
                x={70 - bodyParams.shoulderWidth/2} 
                y="50" 
                width={bodyParams.shoulderWidth} 
                height="6" 
                rx="3"
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Arms in T-pose - positioned more naturally */}
              <rect 
                x={70 - bodyParams.shoulderWidth/2 - bodyParams.armLength}
                y="48" 
                width={bodyParams.armLength} 
                height="10" 
                rx="5"
                className="fill-orange/60 stroke-orange"
              />
              <rect 
                x={70 + bodyParams.shoulderWidth/2}
                y="48" 
                width={bodyParams.armLength} 
                height="10" 
                rx="5"
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Torso - improved shape with curves */}
              <path 
                d={`
                  M${70 - bodyParams.chestWidth/2},55
                  C${70 - bodyParams.chestWidth/2},55 ${70 - bodyParams.waistWidth/2 - 5},85 ${70 - bodyParams.waistWidth/2},95
                  L${70 - bodyParams.hipWidth/2},115
                  L${70 + bodyParams.hipWidth/2},115
                  L${70 + bodyParams.waistWidth/2},95
                  C${70 + bodyParams.waistWidth/2 + 5},85 ${70 + bodyParams.chestWidth/2},55 ${70 + bodyParams.chestWidth/2},55
                  Z
                `}
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Legs - more anatomically correct */}
              <path
                d={`
                  M${70 - bodyParams.hipWidth/2 + 5},115
                  L${70 - bodyParams.thighWidth - 8},175
                  Q${70 - bodyParams.thighWidth - 10},195 ${70 - bodyParams.thighWidth + 6},205
                  L${70 - 5},205
                  L${70 - 5},115
                `}
                className="fill-orange/60 stroke-orange"
              />
              
              <path
                d={`
                  M${70 + bodyParams.hipWidth/2 - 5},115
                  L${70 + bodyParams.thighWidth + 8},175
                  Q${70 + bodyParams.thighWidth + 10},195 ${70 + bodyParams.thighWidth - 6},205
                  L${70 + 5},205
                  L${70 + 5},115
                `}
                className="fill-orange/60 stroke-orange"
              />
              
              {/* Muscle definition lines - only visible in lower body fat */}
              {(onCurrentBodyFatChange ? currentBodyFat : value) < 15 && (
                <g className="stroke-orange/90 stroke-[0.8]">
                  {/* Abs */}
                  <line x1="63" y1="65" x2="77" y2="65" />
                  <line x1="62" y1="75" x2="78" y2="75" />
                  <line x1="61" y1="85" x2="79" y2="85" />
                  <line x1="70" y1="55" x2="70" y2="95" />
                  
                  {/* Pecs */}
                  <path d="M60,60 Q70,65 80,60" />
                  
                  {/* Arm muscle definition */}
                  <path d="M30,53 Q25,53 20,53" />
                  <path d="M110,53 Q115,53 120,53" />
                  
                  {/* Leg muscle definition */}
                  <path d="M60,140 Q65,150 60,160" />
                  <path d="M80,140 Q75,150 80,160" />
                </g>
              )}
            </svg>
            
            {/* Body fat percentage label */}
            <div className="absolute bottom-0 text-lg font-bold text-orange">
              {onCurrentBodyFatChange ? currentBodyFat : value}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-6 flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Choose your body fat levels</h1>
        
        {onCurrentBodyFatChange && (
          <div className="mb-6">
            <label className="text-lg font-medium mb-2 block">Your current body fat:</label>
            <div className="bg-secondary p-4 rounded-md text-center mb-4 text-lg font-medium">
              {currentBodyFat}% Body Fat
            </div>
            
            <Slider
              defaultValue={[currentBodyFat]}
              max={40}
              min={5}
              step={1}
              onValueChange={(val) => onCurrentBodyFatChange(val[0])}
              className="my-4"
            />
            
            <div className="flex justify-between text-sm text-muted-foreground mb-6">
              <span>5%</span>
              <span>40%</span>
            </div>
          </div>
        )}
        
        <div className="mt-2">
          <label className="text-lg font-medium mb-2 block">Your target body fat:</label>
          <div className="bg-secondary p-4 rounded-md text-center mb-4 text-lg font-medium">
            {value}% Body Fat
          </div>
          
          <Slider
            defaultValue={[value]}
            max={40}
            min={5}
            step={1}
            onValueChange={(val) => onChange(val[0])}
            className="my-4"
          />
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>5% (Competition)</span>
            <span>40% (Obese)</span>
          </div>
          
          <div className="mt-6 p-4 rounded-md bg-muted">
            <h3 className="font-medium text-lg mb-2">Your target: {value}% body fat</h3>
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
