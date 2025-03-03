
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Running, Bike, Waves, Person, Music, Dumbbell, Users, Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivitiesStepProps {
  selectedActivities: string[];
  onSelectActivities: (activities: string[]) => void;
}

const ActivitiesStep = ({ selectedActivities, onSelectActivities }: ActivitiesStepProps) => {
  const activities = [
    { label: "Running", id: "running", icon: Running },
    { label: "Cycling", id: "cycling", icon: Bike },
    { label: "Swimming", id: "swimming", icon: Waves },
    { label: "Walking", id: "walking", icon: Person },
    { label: "Dancing", id: "dancing", icon: Music },
    { label: "Pilates", id: "pilates", icon: Dumbbell },
    { label: "Team sports", id: "teamsports", icon: Users },
    { label: "Hiking", id: "hiking", icon: Mountain },
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
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Are any of these activities part of your life?</h1>
      <p className="text-muted-foreground text-xl mb-8">Select all that apply to your regular routine</p>
      
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className={cn(
                  "flex flex-col items-center gap-3 bg-card p-5 rounded-lg cursor-pointer border border-transparent transition-all",
                  isNoneSelected ? "opacity-50 pointer-events-none" : "",
                  selectedActivities.includes(activity.id) ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
                )}
                onClick={() => toggleActivity(activity.id)}
              >
                <div className={cn(
                  "icon-container",
                  selectedActivities.includes(activity.id) ? "bg-orange/20" : "bg-secondary"
                )}>
                  <Icon className={cn(
                    "icon-sm",
                    selectedActivities.includes(activity.id) ? "text-orange" : "text-muted-foreground"
                  )} />
                </div>
                <label className="text-base cursor-pointer">{activity.label}</label>
                <Checkbox 
                  id={activity.id}
                  checked={selectedActivities.includes(activity.id)}
                  onCheckedChange={() => toggleActivity(activity.id)}
                  className="data-[state=checked]:bg-orange data-[state=checked]:text-white mt-auto"
                  disabled={isNoneSelected}
                />
              </div>
            );
          })}
        </div>
          
        <div className="mt-8">
          <div
            className={cn(
              "flex items-center gap-4 bg-card p-5 rounded-lg cursor-pointer border border-transparent transition-all",
              isNoneSelected ? "border-orange bg-orange/5" : "hover:border-muted-foreground/30"
            )}
            onClick={() => toggleActivity("none")}
          >
            <div className={cn(
              "w-5 h-5 rounded-full border flex items-center justify-center",
              isNoneSelected ? "border-orange bg-orange" : "border-muted-foreground"
            )}>
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
