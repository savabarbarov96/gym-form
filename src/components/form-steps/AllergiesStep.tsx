
import React, { useState } from "react";
import { Apple, Egg, Fish, Wheat, X, Milk, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AllergiesStepProps {
  selectedAllergies: string[];
  onSelect: (allergies: string[]) => void;
  customAllergy?: string | null;
  onCustomAllergyChange?: (customAllergy: string | null) => void;
}

const AllergiesStep = ({ 
  selectedAllergies, 
  onSelect,
  customAllergy = null,
  onCustomAllergyChange = () => {} 
}: AllergiesStepProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState(customAllergy || "");

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
      icon: Milk,
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
      label: "Add Custom", 
      id: "custom", 
      icon: Plus,
      description: "Specify your own allergy" 
    },
  ];

  const toggleAllergy = (id: string) => {
    if (id === "custom") {
      setShowCustomInput(true);
      return;
    }

    if (selectedAllergies.includes(id)) {
      onSelect(selectedAllergies.filter(item => item !== id));
    } else {
      onSelect([...selectedAllergies, id]);
    }
  };

  const handleSaveCustomAllergy = () => {
    if (customInput.trim()) {
      onCustomAllergyChange(customInput.trim());
      setShowCustomInput(false);
    }
  };

  const handleCancelCustomAllergy = () => {
    setCustomInput("");
    setShowCustomInput(false);
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
                isSelected ? 'selected' : '',
                allergy.id === "custom" && showCustomInput ? 'hidden' : ''
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
      
      {showCustomInput && (
        <div className="mt-6 p-6 border border-border rounded-xl max-w-xl mx-auto">
          <h3 className="text-lg font-medium mb-3">Add Custom Allergy</h3>
          <Input
            type="text"
            placeholder="Enter your specific allergy"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="mb-4"
          />
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={handleCancelCustomAllergy}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustomAllergy}>
              Save
            </Button>
          </div>
        </div>
      )}
      
      {customAllergy && (
        <div className="mt-6 bg-card border border-border p-4 rounded-xl max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-orange/20 p-2 rounded-full">
                <Plus className="text-orange" size={18} />
              </div>
              <span className="font-medium">{customAllergy}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onCustomAllergyChange(null)}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}
      
      {selectedAllergies.length === 0 && !customAllergy && !showCustomInput && (
        <div className="mt-8 text-lg text-muted-foreground">
          No allergies? Great! Just continue to the next step.
        </div>
      )}
    </div>
  );
};

export default AllergiesStep;
