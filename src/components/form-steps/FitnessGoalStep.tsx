
import React from "react";
import { Weight, Dumbbell, Target, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FitnessGoalStepProps {
  selectedGoal: string | null;
  onSelect: (goal: string) => void;
}

const FitnessGoalStep = ({ selectedGoal, onSelect }: FitnessGoalStepProps) => {
  const goals = [
    { 
      label: "Lose Weight", 
      id: "lose-weight", 
      icon: Weight,
      description: "Reduce body fat and improve body composition" 
    },
    { 
      label: "Gain Muscle Mass", 
      id: "gain-muscle", 
      icon: Dumbbell,
      description: "Build strength and increase muscle size" 
    },
    { 
      label: "Get Shredded", 
      id: "get-shredded", 
      icon: Target,
      description: "Achieve maximum definition and low body fat" 
    },
    { 
      label: "Boost Well-Being", 
      id: "boost-wellbeing", 
      icon: Heart,
      description: "Improve overall health and energy levels" 
    },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Choose your goal</h1>
      <p className="text-muted-foreground text-xl mb-8">What are you looking to achieve?</p>
      
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
