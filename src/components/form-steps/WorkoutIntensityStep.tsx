
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WorkoutIntensityStepProps {
  selectedIntensity: string | null;
  onSelect: (intensity: string) => void;
}

const WorkoutIntensityStep = ({ selectedIntensity, onSelect }: WorkoutIntensityStepProps) => {
  const intensities = [
    {
      id: "light",
      label: "Keep it light",
      description: "Lower intensity, suitable for beginners or recovery"
    },
    {
      id: "moderate",
      label: "Moderate",
      description: "Balanced intensity, suitable for most fitness levels"
    },
    {
      id: "heavy",
      label: "Heavy",
      description: "High intensity, challenging workouts for experienced users"
    },
    {
      id: "auto",
      label: "Let us decide",
      description: "We'll optimize based on your goals and fitness level"
    }
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Choose your preferred level of workouts</h1>
      <p className="text-xl mb-8">We'll adjust the intensity of your exercises accordingly</p>
      
      <div className="max-w-3xl mx-auto">
        <RadioGroup value={selectedIntensity || ""} onValueChange={onSelect} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {intensities.map((intensity) => (
            <div
              key={intensity.id}
              className={`option-card ${selectedIntensity === intensity.id ? 'selected' : ''}`}
              onClick={() => onSelect(intensity.id)}
            >
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={intensity.id} id={intensity.id} className="mt-1" />
                  <div>
                    <label htmlFor={intensity.id} className="text-xl font-medium block cursor-pointer">
                      {intensity.label}
                    </label>
                    <p className="text-muted-foreground mt-1">{intensity.description}</p>
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

export default WorkoutIntensityStep;
