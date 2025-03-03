
import React from "react";
import ThreeJSAgeModel from "@/components/ThreeJSAgeModel";

interface AgeSelectionStepProps {
  selectedAge: string | null;
  onSelect: (age: string) => void;
}

const AgeSelectionStep = ({ selectedAge, onSelect }: AgeSelectionStepProps) => {
  const ageGroups = [
    { label: "18-29", id: "18-29" },
    { label: "30-39", id: "30-39" },
    { label: "40-49", id: "40-49" },
    { label: "50+", id: "50+" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2">BUILD YOUR PERFECT BODY</h1>
      <p className="text-xl mb-12 text-muted-foreground">ACCORDING TO YOUR AGE AND BODY TYPE</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ageGroups.map((age) => (
          <div
            key={age.id}
            className={`option-card aspect-[3/4] ${selectedAge === age.id ? 'selected' : ''}`}
            onClick={() => onSelect(age.id)}
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <ThreeJSAgeModel ageGroup={age.id} />
              </div>
              <div className="mt-auto bg-orange text-white p-3 rounded-md font-medium">
                Age: {age.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeSelectionStep;
