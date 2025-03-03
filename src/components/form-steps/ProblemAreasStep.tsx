
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Shirt, Dumbbell, Sandwich, BookOpen, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemAreasStepProps {
  selectedAreas: string[];
  onSelectArea: (areas: string[]) => void;
}

const ProblemAreasStep = ({ selectedAreas, onSelectArea }: ProblemAreasStepProps) => {
  const problemAreas = [
    { label: "Weak chest", id: "weak-chest", icon: Shirt },
    { label: "Slim arms", id: "slim-arms", icon: Dumbbell },
    { label: "Beer belly", id: "beer-belly", icon: Sandwich },
    { label: "Slim legs", id: "slim-legs", icon: BookOpen },
  ];

  const toggleArea = (id: string) => {
    if (selectedAreas.includes(id)) {
      onSelectArea(selectedAreas.filter(area => area !== id));
    } else {
      onSelectArea([...selectedAreas, id]);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Select problem areas</h1>
      <p className="text-muted-foreground text-xl mb-8">We'll focus on these areas in your program</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {problemAreas.map((area) => {
          const Icon = area.icon;
          return (
            <div
              key={area.id}
              className={cn(
                "flex items-center gap-4 bg-card p-5 rounded-lg cursor-pointer border border-transparent transition-all", 
                selectedAreas.includes(area.id) ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
              )}
              onClick={() => toggleArea(area.id)}
            >
              <Checkbox 
                id={area.id}
                checked={selectedAreas.includes(area.id)}
                onCheckedChange={() => toggleArea(area.id)}
                className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
              />
              <div className={cn(
                "icon-container",
                selectedAreas.includes(area.id) ? "bg-orange/20" : "bg-secondary"
              )}>
                <Icon className={cn(
                  "icon-sm",
                  selectedAreas.includes(area.id) ? "text-orange" : "text-muted-foreground"
                )} />
              </div>
              <label htmlFor={area.id} className="text-xl cursor-pointer flex-1">{area.label}</label>
            </div>
          )
        })}
      </div>
      
      <div className="max-w-3xl mx-auto mt-8">
        <div
          className={cn(
            "flex items-center gap-4 bg-card p-5 rounded-lg cursor-pointer border border-transparent transition-all",
            selectedAreas.includes("none") ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
          )}
          onClick={() => onSelectArea(["none"])}
        >
          <div className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center",
            selectedAreas.includes("none") ? "border-orange bg-orange" : "border-muted-foreground"
          )}>
            {selectedAreas.includes("none") && <Check className="w-4 h-4 text-white" />}
          </div>
          <label className="text-xl cursor-pointer">None of the above</label>
        </div>
      </div>
    </div>
  );
};

export default ProblemAreasStep;
