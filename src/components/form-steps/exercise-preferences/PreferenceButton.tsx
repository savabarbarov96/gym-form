import React from 'react';
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import { cn } from "@/lib/utils";

type Preference = "like" | "neutral" | "dislike" | null;
type PreferenceIcon = "like" | "neutral" | "dislike";

interface PreferenceButtonProps {
  type: PreferenceIcon;
  isSelected: boolean;
  onClick: () => void;
}

const PreferenceButton = ({ type, isSelected, onClick }: PreferenceButtonProps) => {
  const getIcon = () => {
    switch (type) {
      case "like":
        return <ThumbsUp className="w-8 h-8" />;
      case "neutral":
        return <Meh className="w-8 h-8" />;
      case "dislike":
        return <ThumbsDown className="w-8 h-8" />;
    }
  };

  const getBackgroundColor = () => {
    if (!isSelected) return "bg-secondary hover:bg-muted";
    
    switch (type) {
      case "like":
        return "bg-green-500";
      case "neutral":
        return "bg-blue-500";
      case "dislike":
        return "bg-red-500";
    }
  };

  const getAriaLabel = () => {
    switch (type) {
      case "like":
        return "харесвам";
      case "neutral":
        return "неутрално";
      case "dislike":
        return "не харесвам";
    }
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-4 rounded-full transition-all",
        getBackgroundColor()
      )}
      aria-label={getAriaLabel()}
    >
      {getIcon()}
    </button>
  );
};

export default PreferenceButton;
