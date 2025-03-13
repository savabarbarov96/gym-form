import React, { useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSurvey } from '@/contexts/SurveyContext';

interface WorkoutIntensityStepProps {
  selectedIntensity: string | null;
  onSelect: (intensity: string) => void;
  autoAdvance?: boolean;
}

const WorkoutIntensityStep = ({ 
  selectedIntensity, 
  onSelect, 
  autoAdvance = true 
}: WorkoutIntensityStepProps) => {
  const { handleNext } = useSurvey();
  const initialValueRef = useRef<string | null>(selectedIntensity);
  
  const intensities = [
    {
      id: "light",
      label: "Леко натоварване",
      description: "По-ниска интензивност, подходяща за начинаещи или възстановяване"
    },
    {
      id: "moderate",
      label: "Умерено натоварване",
      description: "Балансирана интензивност, подходяща за повечето нива на физическа подготовка"
    },
    {
      id: "heavy",
      label: "Тежко натоварване",
      description: "Висока интензивност, предизвикателни тренировки за опитни потребители"
    },
    {
      id: "auto",
      label: "Оставете на нас",
      description: "Ще оптимизираме според Вашите цели и ниво на физическа подготовка"
    }
  ];
  
  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && 
        selectedIntensity !== null && 
        initialValueRef.current === null) {
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        handleNext();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedIntensity, autoAdvance, handleNext]);
  
  const handleSelectIntensity = (intensity: string) => {
    onSelect(intensity);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Изберете предпочитаното ниво на тренировки</h1>
      <p className="text-xl mb-8">Ще коригираме интензивността на упражненията съответно</p>
      
      <div className="max-w-3xl mx-auto">
        <RadioGroup 
          value={selectedIntensity || ""} 
          onValueChange={handleSelectIntensity} 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {intensities.map((intensity) => (
            <div
              key={intensity.id}
              className={`option-card ${selectedIntensity === intensity.id ? 'selected' : ''}`}
              onClick={() => handleSelectIntensity(intensity.id)}
            >
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={intensity.id} id={intensity.id} className="mt-1" />
                  <div>
                    <label htmlFor={intensity.id} className="text-xl font-medium block cursor-pointer">
                      {intensity.label}
                    </label>
                    <p className="text-muted-foreground mt-1">{intensity.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        {autoAdvance && selectedIntensity !== null && initialValueRef.current === null && (
          <p className="text-sm text-muted-foreground mt-6 animate-pulse">
            Преминаване към следващия въпрос...
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkoutIntensityStep;
