import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import { cn } from "@/lib/utils";

type Preference = "like" | "neutral" | "dislike" | null;

interface ExerciseCardProps {
  exercise: string;
  preference: Preference;
  onPreferenceChange: (preference: Preference) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  preference, 
  onPreferenceChange 
}) => {
  // Map of exercise names to their image URLs
  const exerciseImages: Record<string, string> = {
    "Кардио": "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop",
    "Разтягане": "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=2070&auto=format&fit=crop",
    "Вдигане на тежести": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop",
    "Набирания": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=2076&auto=format&fit=crop",
    "Туризъм": "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
    "Катерене": "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2103&auto=format&fit=crop",
    "Пилатес": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    "Йога": "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop",
  };

  const getPreferenceColor = (type: Preference) => {
    if (preference !== type) return "bg-secondary hover:bg-muted text-muted-foreground";
    
    switch (type) {
      case "like":
        return "bg-green-500 text-white";
      case "neutral":
        return "bg-blue-500 text-white";
      case "dislike":
        return "bg-red-500 text-white";
      default:
        return "bg-secondary hover:bg-muted text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto bg-card rounded-xl shadow-lg overflow-hidden"
    >
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${exerciseImages[exercise] || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop'})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white text-2xl font-bold p-4">{exercise}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-lg mb-6 text-center">Как се чувствате спрямо това упражнение?</p>
        
        <div className="flex justify-between gap-4">
          <button 
            onClick={() => onPreferenceChange("like")}
            className={cn(
              "flex-1 py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-2",
              getPreferenceColor("like")
            )}
          >
            <ThumbsUp className="w-6 h-6" />
            <span>Харесвам</span>
          </button>
          
          <button 
            onClick={() => onPreferenceChange("neutral")}
            className={cn(
              "flex-1 py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-2",
              getPreferenceColor("neutral")
            )}
          >
            <Meh className="w-6 h-6" />
            <span>Неутрално</span>
          </button>
          
          <button 
            onClick={() => onPreferenceChange("dislike")}
            className={cn(
              "flex-1 py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-2",
              getPreferenceColor("dislike")
            )}
          >
            <ThumbsDown className="w-6 h-6" />
            <span>Не харесвам</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseCard; 