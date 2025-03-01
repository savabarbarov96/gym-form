
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
    // If "none" is clicked and not already selected
    if (id === "none" && !selectedConcerns.includes("none")) {
      onSelectConcerns(["none"]);
      return;
    }
    
    // If "none" is clicked and already selected, unselect it
    if (id === "none" && selectedConcerns.includes("none")) {
      onSelectConcerns([]);
      return;
    }
    
    // If a regular concern is clicked while "none" is selected, clear "none"
    if (id !== "none" && selectedConcerns.includes("none")) {
      onSelectConcerns([id]);
      return;
    }
    
    // Toggle the selected concern
    if (selectedConcerns.includes(id)) {
      const newConcerns = selectedConcerns.filter(concern => concern !== id);
      onSelectConcerns(newConcerns);
    } else {
      onSelectConcerns([...selectedConcerns, id]);
    }
  };

  const isNoneSelected = selectedConcerns.includes("none");

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Do you struggle with any of the following?</h1>
      <p className="text-xl mb-8">We will adjust the plan to protect this body part from further damage</p>
      
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png"
            alt="Health concerns"
            className="max-h-[200px] object-contain"
          />
        </div>
        <div className="space-y-4">
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
    </div>
  );
};

export default HealthConcernsStep;
