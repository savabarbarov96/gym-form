
import React from "react";
import { cn } from "@/lib/utils";

interface BodySilhouetteProps {
  selectedAreas: string[];
  onAreaClick: (areaId: string) => void;
}

export const BodySilhouette: React.FC<BodySilhouetteProps> = ({ 
  selectedAreas, 
  onAreaClick 
}) => {
  return (
    <div className="relative w-64 h-[450px]">
      <svg viewBox="0 0 240 450" className="w-full h-full">
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Head (not selectable) */}
        <circle cx="120" cy="50" r="40" className="fill-muted-foreground/20 stroke-muted-foreground" />
        
        {/* Chest */}
        <path 
          d="M80,90 Q120,120 160,90 L160,150 Q120,170 80,150 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("chest") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("chest")}
        />
        
        {/* Belly */}
        <path 
          d="M80,150 Q120,170 160,150 L160,230 Q120,250 80,230 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("belly") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("belly")}
        />
        
        {/* Back (behind chest and belly) */}
        <path 
          d="M80,90 L80,230 Q120,250 160,230 L160,90 Q120,70 80,90 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground opacity-0",
            selectedAreas.includes("back") ? "fill-orange/60 filter-glow opacity-60" : "fill-muted-foreground/20 opacity-0"
          )}
          onClick={() => onAreaClick("back")}
        />
        
        {/* Arms (both) */}
        <path 
          d="M70,100 Q50,130 40,190 L60,200 Q70,150 80,120 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("arms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("arms")}
        />
        <path 
          d="M170,100 Q190,130 200,190 L180,200 Q170,150 160,120 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("arms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("arms")}
        />
        
        {/* Forearms (both) */}
        <path 
          d="M40,190 Q30,240 35,280 L55,275 Q55,240 60,200 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("forearms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("forearms")}
        />
        <path 
          d="M200,190 Q210,240 205,280 L185,275 Q185,240 180,200 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("forearms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("forearms")}
        />
        
        {/* Legs (both) */}
        <path 
          d="M80,230 Q90,240 100,350 L120,350 Q110,240 120,230 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("legs") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("legs")}
        />
        <path 
          d="M160,230 Q150,240 140,350 L120,350 Q130,240 120,230 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("legs") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("legs")}
        />
        
        {/* Calves (both) */}
        <path 
          d="M100,350 Q95,400 98,430 L117,430 Q115,390 120,350 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("calves") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("calves")}
        />
        <path 
          d="M140,350 Q145,400 142,430 L123,430 Q125,390 120,350 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground",
            selectedAreas.includes("calves") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("calves")}
        />
      </svg>
      
      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-muted-foreground">
        Click on a body part to select
      </div>
    </div>
  );
};
