
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WorkoutLocationStepProps {
  selectedLocation: string | null;
  onSelect: (location: string) => void;
}

const WorkoutLocationStep = ({ selectedLocation, onSelect }: WorkoutLocationStepProps) => {
  const locations = [
    {
      id: "home",
      label: "Home",
      description: "Workout at home with minimal equipment",
      image: "/lovable-uploads/a7e78718-1e2c-457a-a7e2-b4811e5a72aa.png"
    },
    {
      id: "gym",
      label: "Gym",
      description: "Full access to gym equipment",
      image: "/lovable-uploads/af5f4a6f-fd68-4c86-8f45-d229d338e77e.png"
    },
    {
      id: "mixed",
      label: "Mixed",
      description: "Combination of home and gym workouts",
      image: "/lovable-uploads/aa15a6ef-769e-45dc-8fb2-87815f0041b3.png"
    }
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Where will you be working out?</h1>
      <p className="text-xl mb-8">We'll customize your plan based on available equipment</p>
      
      <div className="max-w-3xl mx-auto">
        <RadioGroup value={selectedLocation || ""} onValueChange={onSelect} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`option-card ${selectedLocation === location.id ? 'selected' : ''}`}
              onClick={() => onSelect(location.id)}
            >
              <div className="p-4">
                <div className="h-40 flex items-center justify-center mb-4">
                  <img 
                    src={location.image} 
                    alt={location.label} 
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <RadioGroupItem value={location.id} id={location.id} className="mt-1" />
                  <div>
                    <label htmlFor={location.id} className="text-xl font-medium block cursor-pointer">
                      {location.label}
                    </label>
                    <p className="text-sm text-muted-foreground">{location.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default WorkoutLocationStep;
