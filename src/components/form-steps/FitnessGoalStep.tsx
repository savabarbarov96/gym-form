import React from "react";
import { Weight, Dumbbell, Target, Heart, Clock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface FitnessGoalStepProps {
  selectedGoal: string | null;
  onSelect: (goal: string) => void;
}

const FitnessGoalStep = ({ selectedGoal, onSelect }: FitnessGoalStepProps) => {
  const goals = [
    { 
      label: "Отслабване", 
      id: "lose-weight", 
      icon: Weight,
      description: "Намаляване на телесните мазнини и подобряване на телесната композиция" 
    },
    { 
      label: "Натрупване на мускулна маса", 
      id: "gain-muscle", 
      icon: Dumbbell,
      description: "Изграждане на сила и увеличаване на мускулния обем" 
    },
    { 
      label: "Постигане на релеф", 
      id: "get-shredded", 
      icon: Target,
      description: "Постигане на максимална дефиниция и ниско съдържание на мазнини" 
    },
    { 
      label: "Подобряване на благосъстоянието", 
      id: "boost-wellbeing", 
      icon: Heart,
      description: "Подобряване на цялостното здраве и нивата на енергия" 
    },
    { 
      label: "Дълголетие и здраве", 
      id: "longevity-health", 
      icon: Clock,
      description: "Фокус върху превенция на болести, анти-ейджинг и дългосрочна жизненост" 
    },
    { 
      label: "Подобряване на издръжливостта", 
      id: "improve-endurance", 
      icon: Activity,
      description: "Увеличаване на аеробния капацитет, издръжливостта и цялостната кондиция" 
    },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Изберете Вашата цел</h1>
      <p className="text-muted-foreground text-xl mb-8">Какво искате да постигнете?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div
              key={goal.id}
              className={cn(
                "option-card card-hover-effect p-8",
                selectedGoal === goal.id ? 'selected' : ''
              )}
              onClick={() => onSelect(goal.id)}
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "icon-container transition-all",
                  selectedGoal === goal.id ? "bg-orange/30" : "bg-secondary"
                )}>
                  <Icon className={cn(
                    "icon-md",
                    selectedGoal === goal.id ? "text-orange" : "text-muted-foreground"
                  )} />
                </div>
                <div className="text-left">
                  <h3 className={cn(
                    "text-xl font-medium mb-1",
                    selectedGoal === goal.id ? "text-orange" : ""
                  )}>
                    {goal.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default FitnessGoalStep;
