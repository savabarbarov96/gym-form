import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Building2, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkoutLocationStepProps {
  selectedLocation: string | null;
  onSelect: (location: string) => void;
}

const WorkoutLocationStep = ({ selectedLocation, onSelect }: WorkoutLocationStepProps) => {
  const locations = [
    {
      id: "home",
      label: "Вкъщи",
      description: "Тренировка вкъщи с минимално оборудване",
      icon: Home
    },
    {
      id: "gym",
      label: "Фитнес",
      description: "Пълен достъп до фитнес оборудване",
      icon: Building2
    },
    {
      id: "mixed",
      label: "Смесено",
      description: "Комбинация от тренировки вкъщи и във фитнес",
      icon: Repeat
    }
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Къде ще тренирате?</h1>
      <p className="text-xl mb-8 text-muted-foreground">Ще персонализираме Вашия план според наличното оборудване</p>
      
      <div className="max-w-3xl mx-auto">
        <RadioGroup value={selectedLocation || ""} onValueChange={onSelect} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location) => {
            const Icon = location.icon;
            return (
              <div
                key={location.id}
                className={cn(
                  "option-card card-hover-effect",
                  selectedLocation === location.id ? 'selected' : ''
                )}
                onClick={() => onSelect(location.id)}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-6 flex justify-center">
                    <div className={cn(
                      "rounded-full p-6 transition-all",
                      selectedLocation === location.id ? "bg-orange/20" : "bg-secondary"
                    )}>
                      <Icon className={cn(
                        "w-16 h-16",
                        selectedLocation === location.id ? "text-orange" : "text-muted-foreground"
                      )} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mt-auto">
                    <RadioGroupItem value={location.id} id={location.id} className="mt-1" />
                    <div>
                      <label htmlFor={location.id} className="text-xl font-medium block cursor-pointer">
                        {location.label}
                      </label>
                      <p className="text-sm text-muted-foreground">{location.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default WorkoutLocationStep;
