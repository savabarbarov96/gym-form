
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

interface ActivitiesStepProps {
  selectedActivities: string[];
  onSelectActivities: (activities: string[]) => void;
}

const ActivitiesStep = ({ selectedActivities, onSelectActivities }: ActivitiesStepProps) => {
  const activities = [
    { label: "Running", id: "running" },
    { label: "Cycling", id: "cycling" },
    { label: "Swimming", id: "swimming" },
    { label: "Walking", id: "walking" },
    { label: "Dancing", id: "dancing" },
    { label: "Pilates", id: "pilates" },
    { label: "Team sports", id: "teamsports" },
    { label: "Hiking", id: "hiking" },
  ];

  const toggleActivity = (id: string) => {
    // If "none" is clicked and not already selected
    if (id === "none" && !selectedActivities.includes("none")) {
      onSelectActivities(["none"]);
      return;
    }
    
    // If "none" is clicked and already selected, unselect it
    if (id === "none" && selectedActivities.includes("none")) {
      onSelectActivities([]);
      return;
    }
    
    // If a regular activity is clicked while "none" is selected, clear "none"
    if (id !== "none" && selectedActivities.includes("none")) {
      onSelectActivities([id]);
      return;
    }
    
    // Toggle the selected activity
    if (selectedActivities.includes(id)) {
      const newActivities = selectedActivities.filter(activity => activity !== id);
      onSelectActivities(newActivities);
    } else {
      onSelectActivities([...selectedActivities, id]);
    }
  };

  const isNoneSelected = selectedActivities.includes("none");

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Are any of these activities part of your life?</h1>
      
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/949229f9-bb7a-407e-b06a-54cc9a26b481.png"
            alt="Activities"
            className="max-h-[200px] object-contain"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer ${isNoneSelected ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => toggleActivity(activity.id)}
            >
              <Checkbox 
                id={activity.id}
                checked={selectedActivities.includes(activity.id)}
                onCheckedChange={() => toggleActivity(activity.id)}
                className="data-[state=checked]:bg-orange data-[state=checked]:text-white"
                disabled={isNoneSelected}
              />
              <label htmlFor={activity.id} className="text-xl cursor-pointer">{activity.label}</label>
            </div>
          ))}
          
          <div
            className="flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer col-span-full"
            onClick={() => toggleActivity("none")}
          >
            <div className={`w-5 h-5 rounded-full border border-orange flex items-center justify-center ${isNoneSelected ? "bg-orange" : ""}`}>
              {isNoneSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <label className="text-xl cursor-pointer">None of the above</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesStep;
