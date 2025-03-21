import React from "react";
import { Clock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface FitnessGoalStepProps {
  selectedGoal: string | null;
  onSelect: (goal: string) => void;
}

const FitnessGoalStep = ({ selectedGoal, onSelect }: FitnessGoalStepProps) => {
  const goals = [
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
      
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div
              key={goal.id}
              className={cn(
                "option-card card-hover-effect p-8 transition-all duration-300",
                selectedGoal === goal.id 
                  ? 'selected border-2 border-orange bg-orange/5 transform scale-[1.02]' 
                  : 'border-2 border-transparent hover:border-orange/30'
              )}
              onClick={() => onSelect(goal.id)}
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "icon-container transition-all p-4 rounded-full",
                  selectedGoal === goal.id ? "bg-orange/30" : "bg-secondary"
                )}>
                  <Icon className={cn(
                    "w-8 h-8",
                    selectedGoal === goal.id ? "text-orange" : "text-muted-foreground"
                  )} />
                </div>
                <div className="text-left flex-1">
                  <h3 className={cn(
                    "text-2xl font-medium mb-2",
                    selectedGoal === goal.id ? "text-orange" : ""
                  )}>
                    {goal.label}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{goal.description}</p>
                </div>
                {selectedGoal === goal.id && (
                  <div className="text-orange">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default FitnessGoalStep;
