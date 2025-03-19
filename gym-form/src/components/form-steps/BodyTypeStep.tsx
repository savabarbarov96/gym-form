import React, { useEffect, useRef } from "react";
import { UserCircle2, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurvey } from '@/contexts/SurveyContext';

interface BodyTypeStepProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
  autoAdvance?: boolean;
}

const BodyTypeStep = ({ 
  selectedType, 
  onSelect, 
  autoAdvance = true 
}: BodyTypeStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selectedType);
  
  const bodyTypes = [
    { 
      label: "Слабо", 
      id: "slim", 
      icon: UserCircle2,
      description: "Малка структура с слабо телосложение"
    },
    { 
      label: "Средно", 
      id: "average", 
      icon: User,
      description: "Балансирани пропорции"
    },
    { 
      label: "Едро", 
      id: "heavy", 
      icon: Users,
      description: "По-голяма структура с повече маса"
    },
  ];
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selectedType !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedType, autoAdvance, handleNext]);

  const handleSelectType = (type: string) => {
    onSelect(type);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Изберете своя тип тяло</h1>
      <p className="text-muted-foreground text-xl mb-8">Изберете опцията, която най-добре описва сегашното Ви тяло</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {bodyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className={cn(
                "option-card aspect-[3/4] card-hover-effect",
                selectedType === type.id ? 'selected' : ''
              )}
              onClick={() => handleSelectType(type.id)}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <div className={cn(
                      "transition-all duration-300",
                      selectedType === type.id ? "scale-110" : ""
                    )}>
                      <Icon className="w-32 h-32 text-orange/80" strokeWidth={selectedType === type.id ? 2.5 : 1.5} />
                    </div>
                    {selectedType === type.id && (
                      <div className="absolute inset-0 bg-orange/10 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
                <div className="mt-auto">
                  <h3 className="text-xl font-semibold">{type.label}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {autoAdvance && selectedType !== null && initialValueRef.current === null && (
        <p className="text-sm text-muted-foreground mt-6 animate-pulse">
          Преминаване към следващия въпрос...
        </p>
      )}
    </div>
  );
};

export default BodyTypeStep;
