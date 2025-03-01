import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

interface HealthConcernsStepProps {
  selectedConcerns: string[];
  onSelectConcerns: (concerns: string[]) => void;
}

const HealthConcernsStep = ({ selectedConcerns, onSelectConcerns }: HealthConcernsStepProps) => {
  const concerns = [
    { label: "Joints", id: "joints" },
    { label: "Knees", id: "knees" },
    { label: "Back", id: "back" },
    { label: "Lower back", id: "lowerback" },
  ];

  const toggleConcern = (id: string) => {
    if (id === "none") {
      onSelectConcerns(["none"]);
      return;
    }
    
    if (selectedConcerns.includes("none")) {
      onSelectConcerns([id]);
      return;
    }
    
    if (selectedConcerns.includes(id)) {
      const newConcerns = selectedConcerns.filter(concern => concern !== id);
      onSelectConcerns(newConcerns.length === 0 ? ["none"] : newConcerns);
    } else {
      onSelectConcerns([...selectedConcerns, id]);
    }
  };

  const isNoneSelected = selectedConcerns.includes("none");

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Do you struggle with any of the following?</h1>
      <p className="text-xl mb-8">We will adjust the plan to protect this body part from further damage</p>
      
      <div className="max-w-2xl mx-auto space-y-4">
        {concerns.map((concern) => (
          <div
            key={concern.id}
            className={`flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer ${isNoneSelected ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() => toggleConcern(concern.id)}
          >
            <Checkbox 
              id={concern.id}
              checked={selectedConcerns.includes(concern.id)}
              onCheckedChange={() => toggleConcern(concern.id)}
              className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
              disabled={isNoneSelected}
            />
            <label htmlFor={concern.id} className="text-xl cursor-pointer">{concern.label}</label>
          </div>
        ))}

        <div className="border-t border-border pt-4 mt-4">
          <div
            className="flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer"
            onClick={() => toggleConcern("none")}
          >
            <div className={`w-5 h-5 rounded-full border border-orange flex items-center justify-center ${isNoneSelected ? "bg-orange" : ""}`}>
              {isNoneSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <label className="text-xl cursor-pointer">None of the above</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthConcernsStep;
