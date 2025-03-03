
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Bone, Footprints, PanelTop, PanelBottom, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthConcernsStepProps {
  selectedConcerns: string[];
  onSelectConcerns: (concerns: string[]) => void;
}

const HealthConcernsStep = ({ selectedConcerns, onSelectConcerns }: HealthConcernsStepProps) => {
  const concerns = [
    { label: "Joints", id: "joints", icon: Bone },
    { label: "Knees", id: "knees", icon: Footprints },
    { label: "Back", id: "back", icon: PanelTop },
    { label: "Lower back", id: "lowerback", icon: PanelBottom },
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
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Do you struggle with any of the following?</h1>
      <p className="text-xl mb-8 text-muted-foreground">We will adjust the plan to protect these areas</p>
      
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {concerns.map((concern) => {
            const Icon = concern.icon;
            return (
              <div
                key={concern.id}
                className={cn(
                  "flex items-center gap-4 bg-card p-5 rounded-lg cursor-pointer border border-transparent transition-all",
                  isNoneSelected ? "opacity-50 pointer-events-none" : "",
                  selectedConcerns.includes(concern.id) ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
                )}
                onClick={() => toggleConcern(concern.id)}
              >
                <Checkbox 
                  id={concern.id}
                  checked={selectedConcerns.includes(concern.id)}
                  onCheckedChange={() => toggleConcern(concern.id)}
                  className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
                  disabled={isNoneSelected}
                />
                <div className={cn(
                  "icon-container",
                  selectedConcerns.includes(concern.id) ? "bg-orange/20" : "bg-secondary"
                )}>
                  <Icon className={cn(
                    "icon-sm",
                    selectedConcerns.includes(concern.id) ? "text-orange" : "text-muted-foreground"
                  )} />
                </div>
                <label htmlFor={concern.id} className="text-xl cursor-pointer">{concern.label}</label>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border pt-4">
          <div
            className={cn(
              "flex items-center gap-4 bg-card p-5 rounded-lg cursor-pointer border border-transparent transition-all",
              isNoneSelected ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
            )}
            onClick={() => toggleConcern("none")}
          >
            <div className={cn(
              "w-5 h-5 rounded-full border flex items-center justify-center",
              isNoneSelected ? "border-orange bg-orange" : "border-muted-foreground"
            )}>
              {isNoneSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <ShieldCheck className={cn(
              "icon-sm",
              isNoneSelected ? "text-orange" : "text-muted-foreground"
            )} />
            <label className="text-xl cursor-pointer">None of the above</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthConcernsStep;
