import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BodySilhouette } from "@/components/BodySilhouette";
import { motion } from "framer-motion";

interface ProblemAreasStepProps {
  selectedAreas: string[];
  onSelectArea: (areas: string[]) => void;
  onStepComplete?: () => void;
}

const ProblemAreasStep = ({ selectedAreas, onSelectArea, onStepComplete }: ProblemAreasStepProps) => {
  const problemAreas = [
    { label: "Гърди", id: "chest" },
    { label: "Ръце", id: "arms" },
    { label: "Гръб", id: "back" },
    { label: "Корем", id: "belly" },
    { label: "Седалище", id: "glutes" },
    { label: "Предно Бедро", id: "frontThigh" },
    { label: "Задно Бедро", id: "backThigh" },
    { label: "Прасци", id: "calves" },
    { label: "Предмишници", id: "forearms" },
  ];

  // Track whether selection is coming from the silhouette
  const [isFromSilhouette, setIsFromSilhouette] = React.useState(false);

  const toggleArea = (id: string) => {
    if (id === "none") {
      onSelectArea(["none"]);
      return;
    }
    
    if (selectedAreas.includes("none")) {
      onSelectArea([id]);
      return;
    }

    // For BodySilhouette component clicks, select both thigh areas together
    if ((id === "frontThigh" || id === "backThigh") && isFromSilhouette) {
      const otherThighId = id === "frontThigh" ? "backThigh" : "frontThigh";
      const isSelected = selectedAreas.includes(id);
      
      if (isSelected) {
        onSelectArea(selectedAreas.filter(area => area !== id && area !== otherThighId));
      } else {
        const newAreas = [...selectedAreas.filter(area => area !== id && area !== otherThighId), id, otherThighId];
        onSelectArea(newAreas);
      }
      return;
    }

    if (selectedAreas.includes(id)) {
      onSelectArea(selectedAreas.filter(area => area !== id));
    } else {
      onSelectArea([...selectedAreas, id]);
    }
  };

  const handleSilhouetteClick = (id: string) => {
    setIsFromSilhouette(true);
    toggleArea(id);
    setIsFromSilhouette(false);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Изберете проблемни зони</h1>
      <p className="text-muted-foreground text-xl mb-8">Ще се фокусираме върху тези зони във Вашата програма</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div className="flex justify-center items-center">
          <BodySilhouette selectedAreas={selectedAreas} onAreaClick={handleSilhouetteClick} />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3">
            {problemAreas.map((area, index) => {
              const isSelected = selectedAreas.includes(area.id);
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden",
                    isSelected 
                      ? "bg-gradient-to-r from-orange/10 to-orange/20 border border-orange/50 shadow-md"
                      : "bg-card border border-transparent hover:border-muted-foreground/30 hover:shadow-sm"
                  )}
                  onClick={() => toggleArea(area.id)}
                >
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute left-0 top-0 w-1 h-full bg-orange"
                    />
                  )}
                  
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isSelected 
                      ? "border-orange bg-orange" 
                      : "border-muted-foreground/40 bg-transparent"
                  )}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  
                  <span className={cn(
                    "text-xl transition-colors duration-300",
                    isSelected ? "font-medium text-foreground" : "text-muted-foreground"
                  )}>
                    {area.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: problemAreas.length * 0.05 }}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden mt-4",
              selectedAreas.includes("none") 
                ? "bg-gradient-to-r from-orange/10 to-orange/20 border border-orange/50 shadow-md"
                : "bg-card border border-transparent hover:border-muted-foreground/30 hover:shadow-sm"
            )}
            onClick={() => onSelectArea(["none"])}
          >
            {selectedAreas.includes("none") && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute left-0 top-0 w-1 h-full bg-orange"
              />
            )}
            
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300",
              selectedAreas.includes("none") 
                ? "border-orange bg-orange" 
                : "border-muted-foreground/40 bg-transparent"
            )}>
              {selectedAreas.includes("none") && <Check className="w-4 h-4 text-white" />}
            </div>
            
            <span className={cn(
              "text-xl transition-colors duration-300",
              selectedAreas.includes("none") ? "font-medium text-foreground" : "text-muted-foreground"
            )}>
              Нито едно от изброените
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProblemAreasStep;
