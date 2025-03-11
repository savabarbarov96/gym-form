import React, { useEffect, useRef } from "react";
import { Activity, Heart, Award, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurvey } from '@/contexts/SurveyContext';

interface AgeSelectionStepProps {
  selectedAge: string | null;
  onSelect: (age: string) => void;
  autoAdvance?: boolean;
}

const AgeSelectionStep = ({ 
  selectedAge, 
  onSelect, 
  autoAdvance = true 
}: AgeSelectionStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selectedAge);
  
  const ageGroups = [
    { 
      label: "18-29", 
      id: "18-29", 
      icon: Activity, 
      color: "#FF6B35",
      description: "Висока енергия и метаболизъм"
    },
    { 
      label: "30-39", 
      id: "30-39", 
      icon: Dumbbell, 
      color: "#FF6B35",
      description: "Фокус върху сила и издръжливост"
    },
    { 
      label: "40-49", 
      id: "40-49", 
      icon: Heart, 
      color: "#FF6B35",
      description: "Баланс между здраве и фитнес"
    },
    { 
      label: "50+", 
      id: "50+", 
      icon: Award, 
      color: "#FF6B35",
      description: "Гъвкавост и жизненост"
    },
  ];
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selectedAge !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedAge, autoAdvance, handleNext]);

  const handleSelectAge = (age: string) => {
    onSelect(age);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2">ИЗГРАДЕТЕ ПЕРФЕКТНОТО ТЯЛО</h1>
      <p className="text-xl mb-12 text-muted-foreground">СЪОБРАЗЕНО С ВАШАТА ВЪЗРАСТ И ТИП ТЯЛО</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ageGroups.map((age) => {
          const IconComponent = age.icon;
          return (
            <div
              key={age.id}
              className={`option-card aspect-[3/4] rounded-lg shadow-md border-2 transition-all cursor-pointer ${
                selectedAge === age.id 
                  ? 'border-orange bg-orange/10' 
                  : 'border-border hover:border-orange/50 hover:bg-orange/5'
              }`}
              onClick={() => handleSelectAge(age.id)}
            >
              <div className="p-6 flex-1 flex flex-col justify-between h-full">
                <div className="flex-1 flex items-center justify-center">
                  <div className="aspect-square rounded-full bg-orange/10 p-8 flex items-center justify-center">
                    <IconComponent size={80} color={age.color} strokeWidth={selectedAge === age.id ? 2.5 : 1.5} />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">{age.description}</p>
                </div>
                <div className="mt-auto bg-orange text-white p-3 rounded-md font-medium">
                  Възраст: {age.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {autoAdvance && selectedAge !== null && initialValueRef.current === null && (
        <p className="text-sm text-muted-foreground mt-6 animate-pulse">
          Преминаване към следващия въпрос...
        </p>
      )}
    </div>
  );
};

export default AgeSelectionStep;
