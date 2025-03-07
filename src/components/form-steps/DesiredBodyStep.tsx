
import React from "react";
import { ArrowDownRight, Activity, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface DesiredBodyStepProps {
  selectedBody: string | null;
  onSelect: (body: string) => void;
}

const DesiredBodyStep = ({ selectedBody, onSelect }: DesiredBodyStepProps) => {
  const bodyTypes = [
    { 
      label: "A few sizes smaller", 
      id: "smaller", 
      icon: ArrowDownRight,
      description: "Lose weight while maintaining your natural shape"
    },
    { 
      label: "Fit", 
      id: "fit", 
      icon: Activity,
      description: "Lean with improved muscle definition"
    },
    { 
      label: "Athletic", 
      id: "athletic", 
      icon: Dumbbell,
      description: "Well-developed muscles with low body fat"
    },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Choose the body you want</h1>
      <p className="text-muted-foreground text-xl mb-8">Select your ideal physique goal</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {bodyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className={cn(
                "option-card aspect-[3/4] card-hover-effect overflow-hidden",
                selectedBody === type.id ? 'selected' : ''
              )}
              onClick={() => onSelect(type.id)}
            >
              <div className="p-6 flex-1 flex flex-col relative">
                {selectedBody === type.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/20 to-transparent" />
                )}
                <div className="flex-1 flex items-center justify-center">
                  <div className={cn(
                    "icon-container rounded-full p-8 transition-all duration-300",
                    selectedBody === type.id ? "bg-orange/30 scale-110" : "bg-secondary"
                  )}>
                    <Icon className="w-24 h-24 text-orange" strokeWidth={selectedBody === type.id ? 2.5 : 1.5} />
                  </div>
                </div>
                <div className="mt-auto relative z-10">
                  <h3 className="text-xl font-semibold">{type.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default DesiredBodyStep;
