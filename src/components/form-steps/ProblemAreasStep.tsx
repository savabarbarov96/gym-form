
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Dumbbell, BoneIcon, HeartIcon, ThermometerSunIcon, Footprints, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { BodySilhouette } from "@/components/BodySilhouette";

interface ProblemAreasStepProps {
  selectedAreas: string[];
  onSelectArea: (areas: string[]) => void;
  onStepComplete?: () => void;
}

const ProblemAreasStep = ({ selectedAreas, onSelectArea, onStepComplete }: ProblemAreasStepProps) => {
  const problemAreas = [
    { label: "Chest", id: "chest", icon: HeartIcon },
    { label: "Arms", id: "arms", icon: Dumbbell },
    { label: "Back", id: "back", icon: UsersRound },
    { label: "Belly", id: "belly", icon: ThermometerSunIcon },
    { label: "Legs", id: "legs", icon: Footprints },
    { label: "Calves", id: "calves", icon: Footprints },
    { label: "Forearms", id: "forearms", icon: BoneIcon },
  ];

  const toggleArea = (id: string) => {
    if (id === "none") {
      onSelectArea(["none"]);
      return;
    }
    
    if (selectedAreas.includes("none")) {
      onSelectArea([id]);
      return;
    }

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div className="flex justify-center items-center">
          <BodySilhouette selectedAreas={selectedAreas} onAreaClick={toggleArea} />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3">
            {problemAreas.map((area) => {
              const Icon = area.icon;
              const isSelected = selectedAreas.includes(area.id);
              return (
                <div
                  key={area.id}
                  className={cn(
                    "flex items-center gap-4 bg-card p-4 rounded-lg cursor-pointer border border-transparent transition-all", 
                    isSelected ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
                  )}
                  onClick={() => toggleArea(area.id)}
                >
                  <Checkbox 
                    id={area.id}
                    checked={isSelected}
                    onCheckedChange={() => toggleArea(area.id)}
                    className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
                  />
                  <div className={cn(
                    "icon-container",
                    isSelected ? "bg-orange/20" : "bg-secondary"
                  )}>
                    <Icon className={cn(
                      "icon-sm",
                      isSelected ? "text-orange" : "text-muted-foreground"
                    )} />
                  </div>
                  <label htmlFor={area.id} className="text-xl cursor-pointer flex-1">{area.label}</label>
                </div>
              )
            })}
          </div>
          
          <div
            className={cn(
              "flex items-center gap-4 bg-card p-4 rounded-lg cursor-pointer border border-transparent transition-all mt-4",
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
    </div>
  );
};

export default ProblemAreasStep;
