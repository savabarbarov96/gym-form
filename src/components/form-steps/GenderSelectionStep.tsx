import React from 'react';
import { User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenderSelectionStepProps {
  selectedGender: string | null;
  onSelect: (gender: string) => void;
}

const GenderSelectionStep: React.FC<GenderSelectionStepProps> = ({ 
  selectedGender, 
  onSelect 
}) => {
  const genderOptions = [
    { id: 'male', label: 'Мъж', icon: User },
    { id: 'female', label: 'Жена', icon: Users },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Какъв е Вашият пол?</h1>
      <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
        Това ни помага да адаптираме Вашия план за фитнес и хранене според специфичните Ви нужди
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mx-auto mb-8">
        {genderOptions.map(option => {
          const Icon = option.icon;
          const isSelected = selectedGender === option.id;
          
          return (
            <div
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex-1 p-8 rounded-xl transition-all cursor-pointer border-2",
                isSelected 
                  ? "border-orange bg-orange/10" 
                  : "border-border hover:border-orange/50 hover:bg-muted"
              )}
            >
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center transition-colors",
                  isSelected ? "bg-orange text-white" : "bg-secondary text-muted-foreground"
                )}>
                  <Icon size={48} />
                </div>
                <span className={cn(
                  "text-2xl font-medium",
                  isSelected ? "text-orange" : ""
                )}>
                  {option.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-lg text-muted-foreground">
        Изберете своя пол, за да продължите
      </div>
    </div>
  );
};

export default GenderSelectionStep;
