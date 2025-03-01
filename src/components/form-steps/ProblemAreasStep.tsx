
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ProblemAreasStepProps {
  selectedAreas: string[];
  onSelectArea: (areas: string[]) => void;
}

const ProblemAreasStep = ({ selectedAreas, onSelectArea }: ProblemAreasStepProps) => {
  const problemAreas = [
    { label: "Weak chest", id: "weak-chest", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
    { label: "Slim arms", id: "slim-arms", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
    { label: "Beer belly", id: "beer-belly", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
    { label: "Slim legs", id: "slim-legs", image: "/lovable-uploads/a9d4c688-e9fc-4930-90ba-a0931317e8c3.png" },
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
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Select problem areas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {problemAreas.map((area) => (
          <div
            key={area.id}
            className="flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer"
            onClick={() => toggleArea(area.id)}
          >
            <Checkbox 
              id={area.id}
              checked={selectedAreas.includes(area.id)}
              onCheckedChange={() => toggleArea(area.id)}
              className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
            />
            <div className="flex-1 flex items-center">
              <label htmlFor={area.id} className="text-xl cursor-pointer flex-1">{area.label}</label>
              <img 
                src={area.image} 
                alt={area.label}
                className="h-32 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemAreasStep;
