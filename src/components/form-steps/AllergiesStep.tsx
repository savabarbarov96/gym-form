
import React from "react";
import { Apple, Cheese, Egg, Fish, Wheat, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AllergiesStepProps {
  selectedAllergies: string[];
  onSelect: (allergies: string[]) => void;
}

const AllergiesStep = ({ selectedAllergies, onSelect }: AllergiesStepProps) => {
  const allergies = [
    { 
      label: "Gluten", 
      id: "gluten", 
      icon: Wheat,
      description: "Wheat, barley, rye products" 
    },
    { 
      label: "Dairy", 
      id: "dairy", 
      icon: Cheese,
      description: "Milk, cheese, yogurt" 
    },
    { 
      label: "Eggs", 
      id: "eggs", 
      icon: Egg,
      description: "Eggs and egg-based products" 
    },
    { 
      label: "Fish/Shellfish", 
      id: "fish", 
      icon: Fish,
      description: "Seafood allergies" 
    },
    { 
      label: "Nuts", 
      id: "nuts", 
      icon: Apple,
      description: "Tree nuts and peanuts" 
    },
    { 
      label: "Other", 
      id: "other", 
      icon: X,
      description: "Any other food allergies" 
    },
  ];

  const toggleAllergy = (id: string) => {
    if (selectedAllergies.includes(id)) {
      onSelect(selectedAllergies.filter(item => item !== id));
    } else {
      onSelect([...selectedAllergies, id]);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Do you have any allergies?</h1>
      <p className="text-muted-foreground text-xl mb-8">Select any that apply to customize your nutrition plan</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {allergies.map((allergy) => {
          const Icon = allergy.icon;
          const isSelected = selectedAllergies.includes(allergy.id);
          return (
            <div
              key={allergy.id}
              className={cn(
                "option-card card-hover-effect p-8",
                isSelected ? 'selected' : ''
              )}
              onClick={() => toggleAllergy(allergy.id)}
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "icon-container transition-all",
                  isSelected ? "bg-orange/30" : "bg-secondary"
                )}>
                  <Icon className={cn(
                    "icon-md",
                    isSelected ? "text-orange" : "text-muted-foreground"
                  )} />
                </div>
                <div className="text-left">
                  <h3 className={cn(
                    "text-xl font-medium mb-1",
                    isSelected ? "text-orange" : ""
                  )}>
                    {allergy.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{allergy.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {selectedAllergies.length === 0 && (
        <div className="mt-8 text-lg text-muted-foreground">
          No allergies? Great! Just continue to the next step.
        </div>
      )}
    </div>
  );
};

export default AllergiesStep;
