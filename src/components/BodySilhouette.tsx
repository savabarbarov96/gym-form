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
  // Helper function to handle synchronized thigh selection
  const handleThighClick = (clickedThigh: string) => {
    const otherThigh = clickedThigh === "frontThigh" ? "backThigh" : "frontThigh";
    // Just toggle the clicked thigh and let the parent component handle the synchronization
    onAreaClick(clickedThigh);
    // If the parent doesn't handle synchronization, we'll do it here too
    if (!selectedAreas.includes(clickedThigh) && !selectedAreas.includes(otherThigh)) {
      onAreaClick(otherThigh);
    }
  };

  return (
    <div className="relative w-64 h-[450px]">
      <svg viewBox="0 0 240 450" className="w-full h-full">
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="100%" stopColor="#e0e0e0" />
          </linearGradient>
        </defs>
        
        {/* Head (not selectable) */}
        <circle cx="120" cy="50" r="40" className="fill-muted-foreground/20 stroke-muted-foreground stroke-[1.5]" />
        
        {/* Neck */}
        <path 
          d="M105,85 L105,95 Q120,100 135,95 L135,85" 
          className="fill-muted-foreground/20 stroke-muted-foreground stroke-[1.5]" 
        />
        
        {/* Chest */}
        <path 
          d="M80,90 Q120,120 160,90 L160,150 Q120,170 80,150 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("chest") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("chest")}
        />
        
        {/* Belly */}
        <path 
          d="M80,150 Q120,170 160,150 L160,230 Q120,250 80,230 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5] z-20",
            selectedAreas.includes("belly") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          style={{ pointerEvents: "auto" }}
          onClick={(e) => {
            e.stopPropagation();
            onAreaClick("belly");
          }}
        />
        
        {/* Back (behind chest and belly) */}
        <path 
          d="M80,90 L80,230 Q120,250 160,230 L160,90 Q120,70 80,90 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5] z-10",
            selectedAreas.includes("back") ? "fill-orange/60 filter-glow opacity-60" : "fill-muted-foreground/20 opacity-0"
          )}
          style={{ 
            pointerEvents: selectedAreas.includes("back") ? "auto" : "none"
          }}
          onClick={(e) => {
            e.stopPropagation();
            onAreaClick("back");
          }}
        />
        
        {/* Glutes */}
        <path 
          d="M80,230 Q120,260 160,230 L160,270 Q120,290 80,270 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("glutes") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("glutes")}
        />
        
        {/* Arms (both) */}
        <path 
          d="M70,100 Q50,130 40,190 L60,200 Q70,150 80,120 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("arms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("arms")}
        />
        <path 
          d="M170,100 Q190,130 200,190 L180,200 Q170,150 160,120 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("arms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("arms")}
        />
        
        {/* Forearms (both) */}
        <path 
          d="M40,190 Q30,240 35,280 L55,275 Q55,240 60,200 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("forearms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("forearms")}
        />
        <path 
          d="M200,190 Q210,240 205,280 L185,275 Q185,240 180,200 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("forearms") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("forearms")}
        />
        
        {/* Front Thigh (left leg) */}
        <path 
          d="M80,270 Q90,280 100,350 L120,350 Q110,280 120,270 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("frontThigh") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleThighClick("frontThigh");
          }}
        />
        
        {/* Front Thigh (right leg) */}
        <path 
          d="M160,270 Q150,280 140,350 L120,350 Q130,280 120,270 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("frontThigh") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleThighClick("frontThigh");
          }}
        />
        
        {/* Back Thigh (both legs, behind but visible when selected) */}
        <path 
          d="M80,270 Q90,300 100,350 L140,350 Q150,300 160,270 Q120,290 80,270 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5] opacity-0",
            selectedAreas.includes("backThigh") ? "fill-orange/60 filter-glow opacity-60" : "fill-muted-foreground/20 opacity-0"
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleThighClick("backThigh");
          }}
        />
        
        {/* Calves (both) */}
        <path 
          d="M100,350 Q95,400 98,430 L117,430 Q115,390 120,350 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("calves") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("calves")}
        />
        <path 
          d="M140,350 Q145,400 142,430 L123,430 Q125,390 120,350 Z" 
          className={cn(
            "cursor-pointer transition-colors hover:fill-orange/50 stroke-muted-foreground stroke-[1.5]",
            selectedAreas.includes("calves") ? "fill-orange/60 filter-glow" : "fill-muted-foreground/20"
          )}
          onClick={() => onAreaClick("calves")}
        />
        
        {/* Shoulders - for better definition */}
        <path 
          d="M80,90 Q70,85 60,95" 
          className="fill-none stroke-muted-foreground stroke-[1.5]" 
        />
        <path 
          d="M160,90 Q170,85 180,95" 
          className="fill-none stroke-muted-foreground stroke-[1.5]" 
        />
      </svg>
      
      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-muted-foreground">
        Кликнете върху част от тялото, за да изберете
      </div>
    </div>
  );
};
