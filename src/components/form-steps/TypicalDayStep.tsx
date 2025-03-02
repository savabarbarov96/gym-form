
import React from 'react';
import { cn } from '@/lib/utils';

interface TypicalDayStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const TypicalDayStep: React.FC<TypicalDayStepProps> = ({ selected, onSelect }) => {
  const options = [
    { value: 'sitting', label: 'I am sitting most of the time' },
    { value: 'moving', label: 'I am moving most of the time' },
    { value: 'standing', label: 'I am on my feet all day long but not moving much' },
    { value: 'active', label: 'I am on my feet and moving a lot' }
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">How would you describe your typical day?</h2>

      <div className="grid gap-4">
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "option-card p-6 hover:scale-[1.01]",
              selected === option.value && "selected"
            )}
            onClick={() => onSelect(option.value)}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg">{option.label}</span>
              <div className={cn(
                "w-5 h-5 rounded-full border-2",
                selected === option.value ? "border-orange bg-orange" : "border-muted-foreground"
              )} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypicalDayStep;
