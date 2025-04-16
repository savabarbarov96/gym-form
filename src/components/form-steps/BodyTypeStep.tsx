import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSurvey } from '@/contexts/SurveyContext';
import { BodyTypeIllustration } from "@/components/body-type-illustration";

interface BodyTypeStepProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
  autoAdvance?: boolean;
}

const BodyTypeStep = ({ 
  selectedType, 
  onSelect, 
  autoAdvance = false 
}: BodyTypeStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selectedType);
  
  const bodyTypes = [
    { 
      label: "Ектоморф", 
      id: "ectomorph",
      description: "Слабо телосложение, тънки кости, бърз метаболизъм, трудно качване на мускулна маса"
    },
    { 
      label: "Мезоморф", 
      id: "mesomorph",
      description: "Атлетично телосложение, широки рамене, лесно качване на мускулна маса, нисък процент мазнини"
    },
    { 
      label: "Ендоморф", 
      id: "endomorph",
      description: "По-едро телосложение, бавен метаболизъм, лесно качване на тегло, силна мускулна база"
    },
  ];
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selectedType !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedType, autoAdvance, handleNext]);

  const handleSelectType = (type: string) => {
    onSelect(type);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent">
        Изберете своя тип тяло
      </h1>
      <p className="text-muted-foreground text-xl mb-12">
        Изберете опцията, която най-добре описва сегашното Ви тяло
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {bodyTypes.map((type) => (
          <div
            key={type.id}
            className={cn(
              "relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl",
              selectedType === type.id 
                ? 'ring-4 ring-orange shadow-lg shadow-orange/20 scale-[1.02]' 
                : 'ring-1 ring-border hover:ring-orange/50'
            )}
            onClick={() => handleSelectType(type.id)}
          >
            <div className="flex flex-col items-center">
              <BodyTypeIllustration
                type={type.id as "ectomorph" | "mesomorph" | "endomorph"}
                className={cn(
                  "w-full h-80 transition-transform duration-300",
                  selectedType === type.id 
                    ? "scale-105"
                    : "scale-100 hover:scale-[1.02]"
                )}
              />
              <div className="p-6 text-center bg-card">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent">
                  {type.label}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {type.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {autoAdvance && selectedType !== null && initialValueRef.current === null && (
        <p className="text-sm text-muted-foreground mt-8 animate-pulse">
          Преминаване към следващия въпрос...
        </p>
      )}
    </div>
  );
};

export default BodyTypeStep;
