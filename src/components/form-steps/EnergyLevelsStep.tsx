
import React from 'react';
import { cn } from '@/lib/utils';
import { ZapOff, BatteryLow, BatteryMedium, Battery, Zap } from 'lucide-react';

interface EnergyLevelsStepProps {
  value: number | null;
  onChange: (value: number) => void;
}

const EnergyLevelsStep: React.FC<EnergyLevelsStepProps> = ({ value, onChange }) => {
  const energyLevels = [
    { level: 1, icon: ZapOff, label: 'Very Low' },
    { level: 2, icon: BatteryLow, label: 'Low' },
    { level: 3, icon: BatteryMedium, label: 'Moderate' },
    { level: 4, icon: Battery, label: 'Good' },
    { level: 5, icon: Zap, label: 'Excellent', animationClass: 'animate-pulse' },
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">What are your average energy levels during the day?</h2>

      <div className="bg-card p-8 rounded-xl">
        <div className="grid grid-cols-5 gap-2">
          {energyLevels.map((energy) => {
            const Icon = energy.icon;
            return (
              <div
                key={energy.level}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-lg cursor-pointer transition-all",
                  value === energy.level ? 
                    energy.level === 5 ? "bg-green-500/20 ring-2 ring-green-500" : "bg-orange/20 ring-2 ring-orange" 
                    : "hover:bg-muted"
                )}
                onClick={() => onChange(energy.level)}
              >
                <Icon 
                  className={cn(
                    "w-8 h-8",
                    value === energy.level ? 
                      energy.level === 5 ? "text-green-500" : "text-orange" 
                      : "text-muted-foreground",
                    energy.level === 5 && energy.animationClass
                  )} 
                />
                <span className={cn(
                  "text-sm",
                  value === energy.level ? "text-foreground font-semibold" : "text-muted-foreground"
                )}>
                  {energy.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between text-sm text-muted-foreground">
          <span>Low Energy</span>
          <span>High Energy</span>
        </div>
      </div>
    </div>
  );
};

export default EnergyLevelsStep;
