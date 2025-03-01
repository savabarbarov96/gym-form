
import React from "react";

interface FitnessGoalStepProps {
  selectedGoal: string | null;
  onSelect: (goal: string) => void;
}

const FitnessGoalStep = ({ selectedGoal, onSelect }: FitnessGoalStepProps) => {
  const goals = [
    { label: "Lose Weight", id: "lose-weight", image: "/lovable-uploads/4ebaaf49-4ba0-41fb-b5f4-abd901f7548c.png" },
    { label: "Gain Muscle Mass", id: "gain-muscle", image: "/lovable-uploads/8c1d1175-e256-43d0-b73e-9366eee65eb8.png" },
    { label: "Get Shredded", id: "get-shredded", image: "/lovable-uploads/aa15a6ef-769e-45dc-8fb2-87815f0041b3.png" },
    { label: "Boost Well-Being", id: "boost-wellbeing", image: "/lovable-uploads/a7e78718-1e2c-457a-a7e2-b4811e5a72aa.png" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Choose your goal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`option-card aspect-[3/2] ${selectedGoal === goal.id ? 'selected' : ''}`}
            onClick={() => onSelect(goal.id)}
          >
            <div className="p-4 flex-1 flex flex-col relative">
              <div className="flex-1 flex items-center">
                <div className="font-medium text-xl flex items-center">
                  {goal.label}
                </div>
                <img 
                  src={goal.image} 
                  alt={`${goal.label} goal`}
                  className="h-full object-contain absolute right-0 top-0 bottom-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessGoalStep;
