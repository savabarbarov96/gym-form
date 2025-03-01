
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

interface ActivitiesStepProps {
  selectedActivities: string[];
  onSelectActivities: (activities: string[]) => void;
}

const ActivitiesStep = ({ selectedActivities, onSelectActivities }: ActivitiesStepProps) => {
  const activities = [
    { label: "Walking outside", id: "walking-outside", emoji: "🚶" },
    { label: "Morning exercise", id: "morning-exercise", emoji: "🌅" },
    { label: "Walking my pet", id: "walking-pet", emoji: "🐕" },
    { label: "Climbing stairs frequently", id: "climbing-stairs", emoji: "🪜" },
    { label: "Spend time with my child", id: "child-time", emoji: "👶" },
    { label: "Household affairs", id: "household", emoji: "🔧" },
  ];

  const toggleActivity = (id: string) => {
    if (id === "none") {
      // When selecting "none", clear other selections
      onSelectActivities(["none"]);
      return;
    }
    
    // If "none" was selected and user selects another activity
    if (selectedActivities.includes("none")) {
      onSelectActivities([id]);
      return;
    }
    
    // Toggle the selected activity
    if (selectedActivities.includes(id)) {
      const newActivities = selectedActivities.filter(activity => activity !== id);
      onSelectActivities(newActivities.length === 0 ? [] : newActivities);
    } else {
      onSelectActivities([...selectedActivities, id]);
    }
  };

  const isNoneSelected = selectedActivities.includes("none");

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Are any of these activities part of your life?</h1>
      
      <div className="max-w-2xl mx-auto space-y-4">
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
            <label htmlFor={activity.id} className="text-xl cursor-pointer">
              {activity.label} <span className="ml-2">{activity.emoji}</span>
            </label>
          </div>
        ))}

        <div className="border-t border-border pt-4 mt-4">
          <div
            className="flex items-center gap-3 bg-card p-4 rounded-lg cursor-pointer"
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
