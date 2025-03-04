import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  BatteryLow, 
  BatteryMedium, 
  Battery, 
  Zap, 
  Sun, 
  Gauge,
  Sparkles
} from 'lucide-react';

interface EnergyLevelsStepProps {
  value: number | null;
  onChange: (value: number) => void;
}

const EnergyLevelsStep: React.FC<EnergyLevelsStepProps> = ({ value, onChange }) => {
  const energyLevels = [
    { 
      level: 1, 
      icon: BatteryLow, 
      label: 'Very Low', 
      description: 'Tired most of the day',
      color: 'bg-red-500/20',
      textColor: 'text-red-500',
      borderColor: 'border-red-500/70'
    },
    { 
      level: 2, 
      icon: BatteryMedium, 
      label: 'Low', 
      description: 'Energy dips frequently',
      color: 'bg-amber-500/20',
      textColor: 'text-amber-500',
      borderColor: 'border-amber-500/70'
    },
    { 
      level: 3, 
      icon: Battery, 
      label: 'Moderate', 
      description: 'Average energy levels',
      color: 'bg-blue-500/20',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500/70'
    },
    { 
      level: 4, 
      icon: Sun, 
      label: 'Good', 
      description: 'Energetic most of the day',
      color: 'bg-green-500/20',
      textColor: 'text-green-500',
      borderColor: 'border-green-500/70'
    },
    { 
      level: 5, 
      icon: Sparkles, 
      label: 'Excellent', 
      description: 'High energy throughout the day',
      color: 'bg-purple-500/20',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500/70',
      animationClass: 'animate-pulse'
    },
  ];

  return (
    <div className="max-w-3xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Energy Levels</h1>
        <p className="text-muted-foreground text-xl">
          How would you rate your average energy throughout the day?
        </p>
      </motion.div>

      <div className="relative mx-auto mb-8 px-4">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"></div>
        <Gauge className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
        {energyLevels.map((energy, index) => {
          const Icon = energy.icon;
          const isSelected = value === energy.level;
          
          return (
            <motion.div
              key={energy.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "flex flex-col items-center p-5 rounded-xl cursor-pointer transition-all transform hover:scale-105 hover:-translate-y-1 border-2",
                isSelected 
                  ? `${energy.color} ${energy.borderColor} shadow-lg` 
                  : "bg-card/50 border-transparent hover:bg-muted/50"
              )}
              onClick={() => onChange(energy.level)}
            >
              <div className={cn(
                "rounded-full p-3 mb-3 transition-all",
                isSelected ? energy.color : "bg-muted/50"
              )}>
                <Icon 
                  className={cn(
                    "w-8 h-8 transition-colors",
                    isSelected ? energy.textColor : "text-muted-foreground",
                    energy.level === 5 && isSelected && energy.animationClass
                  )} 
                />
              </div>
              
              <span className={cn(
                "text-lg font-semibold transition-colors",
                isSelected ? energy.textColor : "text-foreground"
              )}>
                {energy.label}
              </span>
              
              <span className="text-sm text-muted-foreground text-center mt-1">
                {energy.description}
              </span>
              
              {isSelected && (
                <motion.div 
                  className="w-3 h-3 rounded-full bg-foreground mt-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground"
      >
        <p>Your energy level insights help us recommend the optimal workout times and intensity for your personal schedule.</p>
      </motion.div>
    </div>
  );
};

export default EnergyLevelsStep;
