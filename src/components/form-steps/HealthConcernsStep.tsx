
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Check, Bone, Footprints, PanelTop, PanelBottom, ShieldCheck, Plus, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthConcernsStepProps {
  selectedConcerns: string[];
  onSelectConcerns: (concerns: string[]) => void;
}

const HealthConcernsStep = ({ selectedConcerns, onSelectConcerns }: HealthConcernsStepProps) => {
  const [customConcern, setCustomConcern] = useState("");
  const [customConcerns, setCustomConcerns] = useState<string[]>([]);

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

  const addCustomConcern = () => {
    if (customConcern.trim() === "") return;
    
    const concernId = `custom-${customConcern.trim().toLowerCase().replace(/\s+/g, '-')}`;
    
    // Add to custom concerns list for rendering
    setCustomConcerns([...customConcerns, customConcern.trim()]);
    
    // Add to selected concerns
    if (!selectedConcerns.includes(concernId) && !selectedConcerns.includes("none")) {
      onSelectConcerns([...selectedConcerns, concernId]);
    }
    
    setCustomConcern("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addCustomConcern();
    }
  };

  const isNoneSelected = selectedConcerns.includes("none");

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Do you have pain in any body parts?</h1>
      <p className="text-xl mb-8 text-muted-foreground">We will adjust the plan to protect these areas</p>
      
      <div className="max-w-3xl mx-auto">
        <div className="relative p-4 mb-8 bg-orange/10 rounded-lg border border-orange/30">
          <AlertCircle className="absolute top-4 left-4 text-orange h-6 w-6" />
          <p className="pl-10 text-left">Identifying pain areas helps us create a customized workout plan that prevents injuries and focuses on safe exercise options for your specific needs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {concerns.map((concern) => {
            const Icon = concern.icon;
            return (
              <div
                key={concern.id}
                className={cn(
                  "flex items-center gap-4 bg-card p-5 rounded-lg cursor-pointer border-2 border-transparent transition-all",
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
                <label htmlFor={concern.id} className="text-xl cursor-pointer flex-1">{concern.label}</label>
              </div>
            );
          })}
        </div>

        {/* Custom concerns */}
        {customConcerns.length > 0 && (
          <div className="mt-4 mb-8">
            <h3 className="text-lg font-medium mb-4 text-left">Your specific pain areas:</h3>
            <div className="grid grid-cols-1 gap-4">
              {customConcerns.map((concern, index) => {
                const concernId = `custom-${concern.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 bg-card p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all",
                      isNoneSelected ? "opacity-50 pointer-events-none" : "",
                      selectedConcerns.includes(concernId) ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
                    )}
                    onClick={() => toggleConcern(concernId)}
                  >
                    <Checkbox 
                      id={concernId}
                      checked={selectedConcerns.includes(concernId)}
                      onCheckedChange={() => toggleConcern(concernId)}
                      className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
                      disabled={isNoneSelected}
                    />
                    <AlertCircle className={cn(
                      "h-5 w-5", 
                      selectedConcerns.includes(concernId) ? "text-orange" : "text-muted-foreground"
                    )} />
                    <label htmlFor={concernId} className="flex-1 text-left cursor-pointer">{concern}</label>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Add custom concern */}
        <div className={cn(
          "mb-8 bg-card p-5 rounded-lg border-2 border-dashed border-muted-foreground/30",
          isNoneSelected ? "opacity-50 pointer-events-none" : ""
        )}>
          <h3 className="text-lg font-medium mb-2 text-left">Specify any other pain areas</h3>
          <div className="flex gap-2">
            <Input
              value={customConcern}
              onChange={e => setCustomConcern(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="E.g., shoulder, wrist, hip..."
              className="flex-1"
              disabled={isNoneSelected}
            />
            <button
              onClick={addCustomConcern}
              disabled={customConcern.trim() === "" || isNoneSelected}
              className={cn(
                "flex items-center justify-center p-2 rounded-md",
                customConcern.trim() === "" ? "bg-muted text-muted-foreground" : "bg-orange text-white"
              )}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div
            className={cn(
              "flex items-center gap-4 bg-card p-5 rounded-lg cursor-pointer border-2 border-transparent transition-all",
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
            <label className="text-xl cursor-pointer">No pain or injuries</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthConcernsStep;
