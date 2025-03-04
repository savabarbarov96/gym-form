import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BadgeCheck, Clock, CalendarClock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BestShapeStepProps {
  selected: string | null;
  onSelect: (time: string) => void;
}

const BestShapeStep = ({ selected, onSelect }: BestShapeStepProps) => {
  const options = [
    { 
      label: "Преди по-малко от година", 
      id: "less-than-year", 
      icon: BadgeCheck,
      description: "Поддържали сте добра форма наскоро"
    },
    { 
      label: "Преди 1-3 години", 
      id: "1-3-years", 
      icon: Clock,
      description: "Имали сте успехи във фитнеса в близкото минало"
    },
    { 
      label: "Преди повече от 3 години", 
      id: "more-than-3-years", 
      icon: CalendarClock,
      description: "Минало е доста време откакто сте били в най-добра форма"
    },
    { 
      label: "Никога", 
      id: "never", 
      icon: XCircle,
      description: "Все още не сте достигнали идеалното ниво на физическа форма"
    },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Откога бяхте в най-добрата форма на живота си?</h1>
      <p className="text-muted-foreground text-xl mb-8">Това ни помага да разберем Вашата фитнес история</p>
      
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <RadioGroup value={selected || ""} onValueChange={onSelect}>
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <div 
                  key={option.id} 
                  className={cn(
                    "flex items-center space-x-4 bg-card p-4 rounded-lg cursor-pointer transition-all duration-300 border border-transparent",
                    selected === option.id ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
                  )}
                  onClick={() => onSelect(option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="text-orange" />
                  <div className={cn(
                    "icon-container",
                    selected === option.id ? "bg-orange/20" : "bg-secondary"
                  )}>
                    <Icon className={cn(
                      "icon-sm",
                      selected === option.id ? "text-orange" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <label htmlFor={option.id} className="text-xl cursor-pointer font-medium">{option.label}</label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default BestShapeStep;
