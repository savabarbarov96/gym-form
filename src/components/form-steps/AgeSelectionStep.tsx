
import React from "react";
import { Baby, User, Users, Clock } from "lucide-react";

interface AgeSelectionStepProps {
  selectedAge: string | null;
  onSelect: (age: string) => void;
}

const AgeSelectionStep = ({ selectedAge, onSelect }: AgeSelectionStepProps) => {
  const ageGroups = [
    { label: "18-29", id: "18-29", icon: Baby, color: "#FF6B35" },
    { label: "30-39", id: "30-39", icon: User, color: "#FF6B35" },
    { label: "40-49", id: "40-49", icon: Users, color: "#FF6B35" },
    { label: "50+", id: "50+", icon: Clock, color: "#FF6B35" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2">BUILD YOUR PERFECT BODY</h1>
      <p className="text-xl mb-12 text-muted-foreground">ACCORDING TO YOUR AGE AND BODY TYPE</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ageGroups.map((age) => {
          const IconComponent = age.icon;
          return (
            <div
              key={age.id}
              className={`option-card aspect-[3/4] rounded-lg shadow-md border-2 transition-all ${
                selectedAge === age.id 
                  ? 'border-orange bg-orange/10' 
                  : 'border-border hover:border-orange/50 hover:bg-orange/5'
              }`}
              onClick={() => onSelect(age.id)}
            >
              <div className="p-6 flex-1 flex flex-col justify-between h-full cursor-pointer">
                <div className="flex-1 flex items-center justify-center">
                  <div className="aspect-square rounded-full bg-orange/10 p-8 flex items-center justify-center">
                    <IconComponent size={80} color={age.color} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="mt-auto bg-orange text-white p-3 rounded-md font-medium">
                  Age: {age.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgeSelectionStep;
