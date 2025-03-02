
import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, CalendarCheck, XCircle } from 'lucide-react';

interface StartCommitmentStepProps {
  value?: string | null;
  onChange?: (value: string) => void;
  selected?: string | null;
  onSelect?: (value: string) => void;
}

const StartCommitmentStep: React.FC<StartCommitmentStepProps> = ({ 
  value, 
  onChange, 
  selected, 
  onSelect 
}) => {
  // Use either value/onChange or selected/onSelect props
  const currentValue = selected || value;
  const handleChange = (newValue: string) => {
    if (onSelect) {
      onSelect(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
  };

  const options = [
    { 
      value: 'today', 
      label: 'I will start my workout today!', 
      icon: CalendarCheck, 
      description: 'Great choice! Starting today puts you on the fast track to results.' 
    },
    { 
      value: 'tomorrow', 
      label: 'I will start my first workout tomorrow!', 
      icon: Calendar, 
      description: 'Perfect! Taking a day to prepare sets you up for success.' 
    },
    { 
      value: 'notReady', 
      label: 'I am not ready to make the commitment', 
      icon: XCircle, 
      description: 'No problem. Your plan will be ready when you are.' 
    },
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-center mb-2">Almost ready!</h2>
      <p className="text-muted-foreground text-center mb-8">When are you going to start your fitness journey?</p>

      <div className="grid gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.value}
              className={cn(
                "option-card p-6 hover:scale-[1.01] cursor-pointer",
                currentValue === option.value && "selected"
              )}
              onClick={() => handleChange(option.value)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "h-6 w-6",
                    currentValue === option.value ? "text-orange" : "text-muted-foreground"
                  )} />
                  <div>
                    <div className="text-lg font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2",
                  currentValue === option.value ? "border-orange bg-orange" : "border-muted-foreground"
                )} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StartCommitmentStep;
